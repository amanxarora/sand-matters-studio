'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@hyvilo/maplibre-gl-draw/dist/maplibre-gl-draw.css';
import MapboxDraw from '@hyvilo/maplibre-gl-draw';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import * as turf from '@turf/turf';
import styles from './Map.module.css';
import { useSites } from '../hooks/useSites';
import { useGeocoding, GeocodeData } from '../hooks/useGeocoding';
import { useTheme } from '../context/ThemeContext';
import Toolbar from './Toolbar';
import InfoPanel from './InfoPanel';
import FilterBar from './FilterBar';
import SiteDetailPanel from './SiteDetailPanel';

// Phase Two Cyber HUD Components
import WelcomeModal from './WelcomeModal';
import CommunityPanel from './CommunityPanel';
import Ledger from './Ledger';
import { supabase } from '../lib/supabaseClient';

// Corner crosshairs helper removed as per design revocation

const sanitizeGeoJSON = (geojson: any): any => {
  if (!geojson) return { type: 'FeatureCollection', features: [] };
  return JSON.parse(JSON.stringify(geojson));
};

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:8000' 
    : 'https://amanxar-sand-matters-backend.hf.space');

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  
  const { sites, loading: sitesLoading, refetch: refetchSites } = useSites();
  const { reverseGeocode, fetchRiversInROI, fetchNearbyPlaces, loading: geoLoading } = useGeocoding();
  const { theme } = useTheme();

  const fetchDetections = useCallback(async () => {
    if (!map.current) return;
    try {
      const bounds = map.current.getBounds();
      const minLng = bounds.getWest();
      const minLat = bounds.getSouth();
      const maxLng = bounds.getEast();
      const maxLat = bounds.getNorth();
      
      const response = await fetch(`${BACKEND_URL}/api/detections?min_lng=${minLng}&min_lat=${minLat}&max_lng=${maxLng}&max_lat=${maxLat}`);
      const data = await response.json();
      
      const source = map.current.getSource('yolo-detections') as maplibregl.GeoJSONSource;
      if (source) {
        source.setData(sanitizeGeoJSON(data));
      }
    } catch (e) {
      console.error("Failed to fetch YOLO detections:", e);
    }
  }, []);

  const fetchRegions = useCallback(async () => {
    const currentMap = map.current;
    if (!currentMap) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/pipeline/regions`);
      const data = await response.json();
      
      // Update interactive click regions
      const source = currentMap.getSource('analyzed-regions') as maplibregl.GeoJSONSource;
      if (source) {
        source.setData(sanitizeGeoJSON(data));
      }
    } catch (e) {
      console.error("Failed to fetch analyzed regions:", e);
    }
  }, []);

  const fetchAndRenderIsochrone = useCallback(async (coordinates: [number, number]) => {
    const url = `${BACKEND_URL}/api/isochrone`;
    
    const payload = {
      locations: [coordinates],
      range: [900], // 15-minute travelshed default (900s)
      range_type: 'time',
      profile: 'driving-car'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || `Isochrone API returned status: ${response.status}`);
      }

      const geojson = await response.json();
      setIsochroneData(geojson);
    } catch (err: any) {
      console.error('[ISOCHRONE ENGINE] Error rendering travelshed:', err);
      alert(`[Travelshed Engine] Failed to fetch travelshed isochrone:\n${err.message}\n\nPlease verify that your Hugging Face Space has "ORS_API_KEY" configured in Space Settings -> Secrets.`);
    }
  }, []);
  
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showYolo, setShowYolo] = useState(true);
  const [isochroneData, setIsochroneData] = useState<any | null>(null);
  const [showIsochrone, setShowIsochrone] = useState(false);

  const filteredFeatures = useMemo(() => {
    if (!sites || !sites.features) return [];
    if (!activeFilter) return sites.features;
    return sites.features.filter((f: any) => f.properties.status === activeFilter);
  }, [sites, activeFilter]);
  
  // State for Region of Interest details
  const [selectedRoi, setSelectedRoi] = useState<{
    geocode: GeocodeData | null;
    rivers: any | null;
    bbox: number[] | null;
    feature: any | null;
    nearbyPlaces: any[] | null;
    analyzed: boolean;
    loading?: boolean;
  } | null>(null);

  // State for coordinate click feature
  const [clickedCoords, setClickedCoords] = useState<{lng: number, lat: number} | null>(null);
  
  // State for E2E Pipeline processing
  const [analyzing, setAnalyzing] = useState(false);

  // State for Community Chat Integration (Phase Two)
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [activeRegionId, setActiveRegionId] = useState<number | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: theme === 'dark' ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json' : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [78.9629, 22.5937], // Center of India
      zoom: 4.5,
      minZoom: 3,
      maxBounds: [
        [68.1113787, 6.7535159], // Southwest coordinates of India
        [97.395561, 35.5087008]  // Northeast coordinates of India
      ]
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: false
      }
    });
    
    map.current.addControl(draw.current as unknown as maplibregl.IControl, 'top-left');

    // Add Search Bar
    const geocoderApi = {
      forwardGeocode: async (config: any) => {
        const features = [];
        try {
            const request = `https://nominatim.openstreetmap.org/search?q=${config.query}&format=geojson&polygon_geojson=1&addressdetails=1`;
            const response = await fetch(request);
            const geojson = await response.json();
            for (const feature of geojson.features) {
                const center = [
                    feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
                    feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
                ];
                const point = {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: center },
                    place_name: feature.properties.display_name,
                    properties: feature.properties,
                    text: feature.properties.display_name,
                    place_type: ['place'],
                    center: center
                };
                features.push(point);
            }
        } catch (e) {
            console.error("Failed to forwardGeocode", e);
        }
        return { type: 'FeatureCollection', features } as any;
      }
    };
    
    // Add Search Bar FIRST so it appears on top
    map.current.addControl(new MaplibreGeocoder(geocoderApi as any, { maplibregl: maplibregl }) as any, 'top-left');
    // Add Navigation SECOND so it appears below the search bar
    map.current.addControl(new maplibregl.NavigationControl(), 'top-left');

    map.current.on('load', async () => {
      if (!map.current) return;
      
      // Setup empty source for ROI rivers
      map.current.addSource('roi-rivers', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      
      map.current.addLayer({
        id: 'roi-rivers-layer',
        type: 'line',
        source: 'roi-rivers',
        paint: {
          'line-color': '#06b6d4', // Use HUD accent hex
          'line-width': 3
        }
      });

      // Setup global ESRI World Imagery satellite base layer
      map.current.addSource('esri-world-imagery', {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri'
      });

      // Get all layers in the base style to insert the satellite layer at the absolute bottom
      const styleLayers = map.current.getStyle().layers || [];
      const firstLayerId = styleLayers.length > 0 ? styleLayers[0].id : undefined;

      map.current.addLayer({
        id: 'esri-world-imagery-layer',
        type: 'raster',
        source: 'esri-world-imagery',
        paint: {
          'raster-opacity': 1.0
        }
      }, firstLayerId);

      // Hide all standard vector fill, background, and line layers, plus road labels, to let satellite image show through cleanly
      styleLayers.forEach(layer => {
        const isProtected = layer.id === 'analyzed-regions-layer' || 
                            layer.id === 'analyzed-regions-outline' ||
                            layer.id === 'roi-gee-raster-layer' || 
                            layer.id === 'roi-rivers-layer' || 
                            layer.id === 'yolo-detections-outline' ||
                            layer.id.includes('gl-draw');
        
        if (!isProtected) {
          const isRoadRelated = layer.id.includes('road') || 
                                layer.id.includes('highway') || 
                                layer.id.includes('street') || 
                                layer.id.includes('bridge') || 
                                layer.id.includes('tunnel') || 
                                layer.id.includes('rail') || 
                                layer.id.includes('transit') || 
                                layer.id.includes('route') || 
                                layer.id.includes('motorway') ||
                                layer.id.includes('way') ||
                                layer.id.includes('path') ||
                                layer.id.includes('link') ||
                                layer.id.includes('ferry');

          if (layer.type === 'fill' || layer.type === 'background' || layer.type === 'line' || isRoadRelated) {
            map.current?.setLayoutProperty(layer.id, 'visibility', 'none');
          }
        }
      });



      // Setup source for opaque GEE raster tile overlays (soil disturbance/chlorophyll clearance)
      map.current.addSource('roi-gee-raster', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      map.current.addLayer({
        id: 'roi-gee-raster-layer',
        type: 'fill',
        source: 'roi-gee-raster',
        paint: {
          'fill-color': '#f59e0b', // Warning Orange for bare soil hex
          'fill-opacity': 0.35,
          'fill-outline-color': '#06b6d4'
        }
      });

      // Register 'analyzed-regions' GeoJSON source and layers
      map.current.addSource('analyzed-regions', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      map.current.addLayer({
        id: 'analyzed-regions-layer',
        type: 'fill',
        source: 'analyzed-regions',
        paint: {
          'fill-color': [
            'step',
            ['get', 'risk_score'],
            'rgba(16, 185, 129, 0.45)', // Green (< 50, Low Risk)
            50, 'rgba(245, 158, 11, 0.45)', // Amber (50 - 79, Moderate Risk)
            80, 'rgba(239, 68, 68, 0.45)'  // Red (>= 80, High Risk)
          ]
        }
      });

      map.current.addLayer({
        id: 'analyzed-regions-outline',
        type: 'line',
        source: 'analyzed-regions',
        paint: {
          'line-color': [
            'step',
            ['get', 'risk_score'],
            '#10b981',  // Green (< 50, Low Risk)
            50, '#f59e0b', // Amber (50 - 79, Moderate Risk)
            80, '#ef4444'  // Red (>= 80, High Risk)
          ],
          'line-width': 2
        }
      });

      // Click event for analyzed regions
      map.current.on('click', 'analyzed-regions-layer', async (e) => {
        if (!map.current || !e.features || e.features.length === 0) return;
        const feature = e.features[0];
        const regionId = Number(feature.properties?.id || feature.id || 101);

        // Calculate centroid and bounding box
        const bbox = turf.bbox(feature) as [number, number, number, number];
        const centroid = turf.centroid(feature);
        const [lng, lat] = centroid.geometry.coordinates;

        setSelectedSiteId(null);
        // Set selectedRoi to a loading state: setSelectedRoi({ loading: true, geocode: null, rivers: null, bbox, feature, nearbyPlaces: null, analyzed: true })
        setSelectedRoi({
          loading: true,
          geocode: null,
          rivers: null,
          bbox,
          feature,
          nearbyPlaces: null,
          analyzed: true
        });

        // Automatically open the comments section on the left sidebar
        setIsCommunityOpen(true);
        setActiveRegionId(regionId);

        try {
          // Run reverseGeocode, fetchRiversInROI, and fetchNearbyPlaces concurrently
          const [geocodeResult, riversResult, nearbyPlacesResult] = await Promise.all([
            reverseGeocode(lng, lat),
            fetchRiversInROI(bbox),
            fetchNearbyPlaces(lng, lat)
          ]);

          // Update selectedRoi with the resolved data and properties
          setSelectedRoi({
            loading: false,
            geocode: geocodeResult,
            rivers: riversResult,
            nearbyPlaces: nearbyPlacesResult,
            bbox,
            feature,
            analyzed: true
          });

          // Update rivers on the map
          if (riversResult && map.current.getSource('roi-rivers')) {
            (map.current.getSource('roi-rivers') as maplibregl.GeoJSONSource).setData(sanitizeGeoJSON(riversResult));
          }
        } catch (err) {
          console.error("Error loading region telemetry:", err);
          setSelectedRoi(prev => prev ? { ...prev, loading: false } : null);
        }
      });

      // Change cursor to pointer on hover over analyzed-regions-layer
      map.current.on('mouseenter', 'analyzed-regions-layer', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'analyzed-regions-layer', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      // Setup YOLO detections source (kept empty, since the layers are deleted)
      map.current.addSource('yolo-detections', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        promoteId: 'id'
      });

      map.current.addLayer({
        id: 'yolo-detections-outline',
        type: 'line',
        source: 'yolo-detections',
        layout: {
          'visibility': showYolo ? 'visible' : 'none'
        },
        paint: {
          'line-color': [
            'match',
            ['get', 'class_name'],
            'pit', '#e11d48',       // Pinkish Red
            'truck', '#3b82f6',     // Electric Blue
            'haul_road', '#f59e0b', // Amber
            '#06b6d4'               // Default steel blue
          ],
          'line-width': 2.5,
          'line-dasharray': [2, 1] // Dashed line effect
        }
      });

      // Load initial detections inside viewport bounds
      fetchDetections();
      // Load analyzed regions
      fetchRegions();

      // Listen for panning/zooming to fetch viewport detections dynamically
      map.current.on('moveend', fetchDetections);
    });

    // Handle Draw events
    map.current.on('draw.create', async (e) => {
      const data = draw.current?.getAll();
      if (!data || data.features.length === 0) return;
      
      const feature = data.features[data.features.length - 1]; // get latest drawn
      
      // Calculate Bounding Box and Centroid
      const bbox = turf.bbox(feature) as [number, number, number, number];
      const centroid = turf.centroid(feature);
      const [lng, lat] = centroid.geometry.coordinates;
      
      setSelectedSiteId(null); // Deselect any clicked mining site
      setSelectedRoi({
        geocode: null,
        rivers: null,
        bbox: bbox,
        feature: feature,
        nearbyPlaces: null,
        analyzed: false,
        loading: true
      });
      
      // Fetch metadata concurrently
      const [geocodeResult, riversResult, nearbyPlacesResult] = await Promise.all([
        reverseGeocode(lng, lat),
        fetchRiversInROI(bbox),
        fetchNearbyPlaces(lng, lat),
        fetchAndRenderIsochrone([lng, lat])
      ]);
      
      setSelectedRoi({
        geocode: geocodeResult,
        rivers: riversResult,
        bbox: bbox,
        feature: feature,
        nearbyPlaces: nearbyPlacesResult,
        analyzed: false,
        loading: false
      });
      
      // Update rivers on the map
      if (riversResult && map.current?.getSource('roi-rivers')) {
        (map.current.getSource('roi-rivers') as maplibregl.GeoJSONSource).setData(sanitizeGeoJSON(riversResult));
      }
    });
    
    map.current.on('draw.delete', () => {
       setSelectedRoi(null);
       if (map.current?.getSource('roi-rivers')) {
         (map.current.getSource('roi-rivers') as maplibregl.GeoJSONSource).setData(sanitizeGeoJSON({ type: 'FeatureCollection', features: [] }));
       }
       if (map.current?.getSource('roi-isochrone')) {
         (map.current.getSource('roi-isochrone') as maplibregl.GeoJSONSource).setData(sanitizeGeoJSON({ type: 'FeatureCollection', features: [] }));
       }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;
    const source = map.current.getSource('roi-gee-raster') as maplibregl.GeoJSONSource;
    if (source) {
      if (selectedRoi && selectedRoi.feature) {
        source.setData(sanitizeGeoJSON(selectedRoi.feature));
      } else {
        source.setData(sanitizeGeoJSON({ type: 'FeatureCollection', features: [] }));
      }
    }

    // Toggle opacity of the drawn ROI visual polygon
    if (map.current.getLayer('roi-gee-raster-layer')) {
      if (selectedRoi && selectedRoi.analyzed) {
        map.current.setPaintProperty('roi-gee-raster-layer', 'fill-opacity', 0.0);
      } else {
        map.current.setPaintProperty('roi-gee-raster-layer', 'fill-opacity', 0.35);
      }
    }
  }, [selectedRoi]);

  useEffect(() => {
    if (!map.current) return;
    if (map.current.getLayer('yolo-detections-outline')) {
      map.current.setLayoutProperty(
        'yolo-detections-outline',
        'visibility',
        showYolo ? 'visible' : 'none'
      );
    }
  }, [showYolo]);

  useEffect(() => {
    if (!map.current) return;
    const source = map.current.getSource('roi-isochrone') as maplibregl.GeoJSONSource;
    if (showIsochrone && isochroneData) {
      if (source) {
        source.setData(sanitizeGeoJSON(isochroneData));
      } else {
        map.current.addSource('roi-isochrone', {
          type: 'geojson',
          data: sanitizeGeoJSON(isochroneData)
        });
        map.current.addLayer({
          id: 'roi-isochrone-layer',
          type: 'fill',
          source: 'roi-isochrone',
          layout: {},
          paint: {
            'fill-color': '#a35138',
            'fill-opacity': 0.12,
            'fill-outline-color': '#a35138'
          }
        }, 'gl-draw-polygon-fill-inactive.cold');
      }
    } else {
      if (source) {
        source.setData(sanitizeGeoJSON({ type: 'FeatureCollection', features: [] }));
      }
    }
  }, [showIsochrone, isochroneData]);

  // Dynamic WebGL point layers deprecated; system operates on map tiles exclusively


  const handleAnalyze = async (startYear: number, endYear: number, sensitivity: string) => {
    if (!selectedRoi?.bbox || !selectedRoi.feature) return;
    setAnalyzing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const response = await fetch(`${BACKEND_URL}/api/pipeline/analyze`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          bbox: selectedRoi.bbox,
          start_year: startYear,
          end_year: endYear,
          sensitivity
        })
      });

      if (!response.ok) {
        throw new Error("Failed to start pipeline analysis");
      }

      // Compute the centroid of the active drawn polygon to identify it in the regions database
      const drawCentroid = turf.centroid(selectedRoi.feature);

      // Start polling the backend /regions list every 5 seconds
      const startTime = Date.now();
      const pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/api/pipeline/regions`);
          if (!res.ok) return;
          const data = await res.json();

          // Find the newly saved region polygon containing our drawn centroid
          const newRegion = data.features?.find((f: any) => {
            if (f.geometry && f.geometry.type === 'Polygon') {
              try {
                return turf.booleanPointInPolygon(drawCentroid, f);
              } catch (e) {
                return false;
              }
            }
            return false;
          });

          const elapsed = Date.now() - startTime;
          if (newRegion) {
            clearInterval(pollInterval);
            setAnalyzing(false);

            // Update interactive click regions on map
            const source = map.current?.getSource('analyzed-regions') as maplibregl.GeoJSONSource;
            if (source) {
              source.setData(sanitizeGeoJSON(data));
            }
            
            refetchSites();
            fetchDetections();

            // Clear the raw drawing overlay so the colored DB layer renders cleanly underneath
            if (draw.current) {
              draw.current.deleteAll();
            }

            // Select the newly-saved database region with its permanent Supabase Storage properties
            setSelectedRoi({
              loading: false,
              geocode: selectedRoi.geocode,
              rivers: selectedRoi.rivers,
              nearbyPlaces: selectedRoi.nearbyPlaces,
              bbox: selectedRoi.bbox,
              feature: newRegion,
              analyzed: true
            });

            const regionId = Number(newRegion.properties?.id || 101);
            setActiveRegionId(regionId);
            setIsCommunityOpen(true);
          } else if (elapsed > 180000) { // 3 minutes timeout
            clearInterval(pollInterval);
            setAnalyzing(false);
            alert("The pipeline analysis is taking longer than usual. Please close this card and click the analyzed region on the map once it renders.");
          }
        } catch (pollErr) {
          console.error("Error polling regions during analysis:", pollErr);
        }
      }, 5000);

    } catch (e) {
      console.error("Error triggering pipeline:", e);
      setAnalyzing(false);
      alert("Failed to initiate pipeline. Please check backend status and secrets configurations.");
    }
  };

  const handleDownloadData = () => {
    if (!selectedRoi) return;
    const csvContent = "data:text/csv;charset=utf-8,Type,Name\nRegion," + (selectedRoi.geocode?.state || "Unknown");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "region_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateValidation = async (regionId: number, status: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const response = await fetch(`${BACKEND_URL}/api/pipeline/regions/${regionId}/validate`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ validation_status: status })
      });
      if (response.ok) {
        fetchRegions();
        setSelectedRoi(prev => {
          if (!prev || !prev.feature) return prev;
          const updatedFeature = { ...prev.feature };
          updatedFeature.properties = { ...updatedFeature.properties, validation_status: status };
          return { ...prev, feature: updatedFeature };
        });
      }
    } catch (e) {
      console.error("Failed to update validation status:", e);
    }
  };

  const drawPolygon = () => {
    if (draw.current) {
      draw.current.changeMode('draw_polygon');
    }
  };

  const deleteSelection = () => {
    if (draw.current) {
      draw.current.trash();
      setSelectedRoi(null);
      setActiveRegionId(null);
      setIsCommunityOpen(false);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
      <Toolbar 
        onDrawPolygon={drawPolygon} 
        onDelete={deleteSelection} 
        showYolo={showYolo} 
        onToggleYolo={() => setShowYolo(!showYolo)} 
        showIsochrone={showIsochrone}
        onToggleIsochrone={() => setShowIsochrone(!showIsochrone)}
      />
      
      <div style={{ flex: 1, position: 'relative' }}>
        {(sitesLoading || geoLoading) && <div className={styles.mapLoading}>Loading intelligence data...</div>}
        
        {/* Viewport Target brackets removed as per clean unobstructed design spec */}

        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        
        <SiteDetailPanel 
          siteId={selectedSiteId} 
          onClose={() => setSelectedSiteId(null)} 
        />
        
        {/* Slide-out asymmetrical Community Panel */}
        <CommunityPanel 
          regionId={activeRegionId} 
          isOpen={isCommunityOpen} 
          onClose={() => setIsCommunityOpen(false)} 
        />
      </div>

      <InfoPanel 
        roiData={selectedRoi}
        onAnalyze={handleAnalyze}
        isAnalyzing={analyzing}
        onCloseRoi={() => setSelectedRoi(null)}
        onDownloadData={handleDownloadData}
        allSites={sites}
        onOpenCommunity={() => setIsCommunityOpen(prev => !prev)}
        activeRegionId={activeRegionId}
        onUpdateValidation={handleUpdateValidation}
      />

      {/* Cyber-Tactical Gatekeeping & Profile Calibration Modals */}
      <WelcomeModal />
    </div>
  );
};

export default MapComponent;
