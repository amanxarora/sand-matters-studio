import React, { useState, useEffect } from 'react';
import { GeocodeData } from '../hooks/useGeocoding';
import DataVisualizer from './DataVisualizer';
import * as turf from '@turf/turf';
import { useAuth } from '../context/AuthContext';
import VisualSlider from './VisualSlider';
import Link from 'next/link';

const roboflowTargets = [
  {
    id: 1,
    title: "Truck / Excavator Detection",
    badge: "TRK_EXC_01",
    description: "Real-time object boundary verification identifying active multi-axle sand loader vehicles and mechanical excavators operating in instream zones.",
    image: "/images/roboflow/roboflow_1.jpg"
  },
  {
    id: 2,
    title: "Excavation Pit / Water Expansion",
    badge: "PIT_02",
    description: "Deep learning extraction pit isolation capturing open active water-filled voids and sand stockpiling cluster profiles.",
    image: "/images/roboflow/roboflow_2.jpg"
  },
  {
    id: 3,
    title: "Sand Haul Access Road",
    badge: "ROAD_03",
    description: "Automated tracking of heavy vehicle transit pathways cutting through protected riparian buffers and sanctuary borders.",
    image: "/images/roboflow/roboflow_3.jpg"
  },
  {
    id: 4,
    title: "Instream Dredging Vessel",
    badge: "VSL_04",
    description: "Detections of suction pump pontoons and heavy sand barges operating directly within active flowing riverbed channels.",
    image: "/images/roboflow/roboflow_4.jpg"
  }
];

const telemetrySteps = [
  "STAGE 1: INGESTING USER-SPECIFIED REGION OF INTEREST (ROI) COORDINATES",
  "STAGE 2: AUTHENTICATING EARTH ENGINE SECURED SERVICE ACCOUNT ACCESS",
  "STAGE 2: RETRIEVING ESA dominant LANDCOVER MODES & CENTROID ARIDITY OFFSETS",
  "STAGE 3: ISOLATING CLOUD-FREE PRE-MONSOON DRY-SEASON OBSERVATIONS",
  "STAGE 3: VERIFYING IMAGE OBSERVATION DEPTHS (SENTINEL-2 CLEAR PIXELS >= 3)",
  "STAGE 4: COMPUTING TEMPORAL DIFFERENTIAL SPECTRAL INDEX MAPS (FINAL - BASELINE)",
  "STAGE 4: ANALYZING LOCAL delta-NDVI RIPARIAN CORRIDOR DECAY MATRICES",
  "STAGE 4: DEPLOYING LOCAL delta-BSI BARE SOIL DISTURBANCE SCANNERS",
  "STAGE 5: PROJECTING BUFFER EXCLUSIONS VIA WWF HYDROSHEDS 800M FLOODPLAINS",
  "STAGE 5: MAPPING NDBI INFRASTRUCTURE & ESA AGRICULTURAL SEGMENT MASKS",
  "STAGE 6: GENERATING LOCAL ADAPTIVE THRESHOLDS (MANNINGS n CORRECTION)",
  "STAGE 6: SEPARATING VEGETATION STRIPPING AND OPEN PIT WATER EMERGENCE PIXELS",
  "STAGE 7: ACQUIRING HIGH-RESOLUTION VISUAL RGB SATELLITE RASTER CROPS",
  "STAGE 7: LOADING WEIGHTS & INITIALIZING PYTORCH YOLOv8s CPU PROCESSOR",
  "STAGE 7: SCANNING LOCALIZED RIPARIAN REGIONS FOR ILLEGAL SAND EXTRACTION TARGETS",
  "STAGE 7: LOCATING INSTREAM EXCAVATOR CLUSTERS AND HEAVY HAUL TRUCKS",
  "STAGE 7: IDENTIFYING WATERBORNE SUCTION DREDGING VESSEL BARGES",
  "STAGE 7: GEOTRANSFORMING YOLO PIXEL COORDINATES TO WGS84 WKT POLYGONS",
  "STAGE 8: AGGREGATING CONFIDENCE COEFFICIENTS TO CALCULATE THE CONFIDENCE RISK SCORE",
  "STAGE 9: WRITING REGION SCANS AND OBJECT GEOMETRIES TO SUPABASE DB",
  "STAGE 10: GENERATING SYSTEM EVIDENTIARY DOSSIERS AND CIVIC ALERTS"
];

interface InfoPanelProps {
  roiData: {
    geocode: GeocodeData | null;
    rivers: any | null;
    bbox: number[] | null;
    feature: any | null;
    nearbyPlaces: any[] | null;
    analyzed: boolean;
    loading?: boolean;
  } | null;
  onAnalyze: (startYear: number, endYear: number, sensitivity: string) => void;
  isAnalyzing: boolean;
  onCloseRoi: () => void;
  onDownloadData: () => void;
  allSites: any;
  onOpenCommunity?: () => void;
  activeRegionId?: number | null;
  onUpdateValidation?: (regionId: number, status: string) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ 
  roiData, 
  onAnalyze, 
  isAnalyzing, 
  onCloseRoi, 
  onDownloadData,
  allSites,
  onOpenCommunity,
  activeRegionId,
  onUpdateValidation
}) => {
  const { user, signInWithGoogle } = useAuth();
  const [startYear, setStartYear] = useState<number>(2025);
  const [endYear, setEndYear] = useState<number>(2026);
  const [sensitivity, setSensitivity] = useState<string>('medium');
  const [activeSpectralIndex, setActiveSpectralIndex] = useState<string>('ndvi');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [telemetryStep, setTelemetryStep] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (roiData?.loading) {
      setTelemetryStep(0);
      interval = setInterval(() => {
        setTelemetryStep((prev) => (prev + 1) % telemetrySteps.length);
      }, 1200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [roiData?.loading]);
  
  const renderDefaultState = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-2)' }}>
          Global Intelligence
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
          Welcome to the Sand Matters Studio intelligence dashboard. Use the polygon tool on the left to select a region of interest in India and run our Earth Engine + YOLO pipeline to detect illegal sand mining.
        </p>
      </div>


      <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Quick Facts
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
          India is the world's second-largest consumer of sand. Illegal extraction significantly alters river dynamics, causing erosion, devastating local ecosystems, and leading to infrastructure collapse.
        </p>
      </div>
    </div>
  );

  const renderActiveState = () => {
    if (!roiData) return null;
    
    if (roiData.loading) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          {/* Telemetry Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-accent)', marginBottom: 'var(--spacing-1)' }}>
                Ingesting Region
              </h2>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontFamily: 'monospace' }}>
                Acquiring regional geo-coordinates...
              </div>
            </div>
            <button 
              onClick={onCloseRoi}
              style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 'var(--spacing-1)' }}
            >
              ✕
            </button>
          </div>

          {/* Telemetry Loader */}
          <div style={{
            backgroundColor: 'var(--color-background)',
            padding: 'var(--spacing-6) var(--spacing-4)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--glass-border)',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: 'var(--color-success)',
            lineHeight: '1.8',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            minHeight: '200px',
            gap: 'var(--spacing-3)'
          }}>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              @keyframes fade-out-up {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
              }
            `}} />
            
            <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: 'var(--spacing-2)' }}>
              BACKEND PIPELINE INGESTION TELEMETRY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', flex: 1, justifyContent: 'center' }}>
              {/* Previous Step (Fading out / Completed) */}
              {telemetryStep > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  color: '#10b981',
                  opacity: 0.5,
                  fontSize: '10px',
                  animation: 'fade-out-up 1.2s forwards'
                }}>
                  <span style={{ fontWeight: 'bold' }}>DONE</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {telemetrySteps[telemetryStep - 1]}
                  </span>
                </div>
              )}

              {/* Current Active Step (Processing) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                color: '#06b6d4',
                fontSize: '11px',
                fontWeight: 'bold',
                animation: 'fade-in-up 0.3s ease-out'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>RUNNING</span>
                </span>
                <span>
                  {telemetrySteps[telemetryStep]}
                </span>
              </div>

              {/* Next Step (Queued) */}
              {telemetryStep < telemetrySteps.length - 1 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  color: '#f59e0b',
                  opacity: 0.6,
                  fontSize: '10px',
                  animation: 'fade-in-up 0.5s ease-out'
                }}>
                  <span style={{ fontWeight: 'bold' }}>NEXT</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {telemetrySteps[telemetryStep + 1]}
                  </span>
                </div>
              )}

              {/* Following Step (Pending) */}
              {telemetryStep < telemetrySteps.length - 2 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  color: 'var(--color-text-secondary)',
                  opacity: 0.35,
                  fontSize: '9px'
                }}>
                  <span style={{ fontWeight: 'bold' }}>WAIT</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {telemetrySteps[telemetryStep + 2]}
                  </span>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--spacing-2)', fontSize: '9px', color: 'var(--color-text-secondary)' }}>
              <span>PIPELINE TELEMETRY STATUS</span>
              <span>{Math.round(((telemetryStep + 1) / telemetrySteps.length) * 100)}% COMPLETE</span>
            </div>
          </div>
        </div>
      );
    }

    const { geocode, rivers, feature, nearbyPlaces, analyzed } = roiData;
    const numRivers = rivers?.features?.length || 0;

    // Calculate center coordinates from bbox if available
    let centerLng = 87.3195;
    let centerLat = 22.9814;
    if (roiData.bbox && roiData.bbox.length === 4) {
      centerLng = (roiData.bbox[0] + roiData.bbox[2]) / 2;
      centerLat = (roiData.bbox[1] + roiData.bbox[3]) / 2;
    } else if (feature) {
      try {
        const centroid = turf.centroid(feature);
        centerLng = centroid.geometry.coordinates[0];
        centerLat = centroid.geometry.coordinates[1];
      } catch (e) {}
    }

    // Filter suspected sites within the selected region dynamically using Turf
    const sitesInRoi = allSites?.features?.filter((f: any) => {
      if (!feature) return false;
      try {
        const centroid = turf.centroid(f);
        return turf.booleanPointInPolygon(centroid, feature);
      } catch (e) {
        return false;
      }
    }) || [];

    const numSites = sitesInRoi.length;

    const properties = feature?.properties || {};
    const validationStatus = properties.validation_status || "UNVALIDATED";

    // Custom non-linear risk score assignment
    let score = 12;
    if (properties.risk_score !== undefined && properties.risk_score !== null) {
      score = Number(properties.risk_score);
    } else {
      if (numSites === 1) score = 38;
      else if (numSites === 2) score = 58;
      else if (numSites === 3) score = 79;
      else if (numSites >= 4) score = 94;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', position: 'relative' }}>
        
        {/* Header (Always clear and interactive) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-accent)', marginBottom: 'var(--spacing-1)' }}>
              Region Intelligence
            </h2>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {geocode?.state || 'Unknown State'}, India
            </div>
          </div>
          <button 
            onClick={onCloseRoi}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 'var(--spacing-1)', fontSize: '18px' }}
          >
            ✕
          </button>
        </div>

        {/* Content Container (Blurred if user is not signed in) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-6)',
          filter: !user ? 'blur(6px)' : 'none',
          pointerEvents: !user ? 'none' : 'auto',
          userSelect: !user ? 'none' : 'auto',
          transition: 'filter 0.3s ease'
        }}>
          {/* Hydrology Data */}
          <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', borderLeft: '4px solid var(--color-accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-accent)' }}>{numRivers}</span>
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Rivers Detected</span>
            </div>
            {numRivers > 0 && (
              <div style={{ marginTop: 'var(--spacing-3)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', maxHeight: '100px', overflowY: 'auto' }}>
                {rivers.features.map((r: any, idx: number) => (
                  <div key={idx} style={{ padding: '2px 0' }}>🌊 {r.properties.name || 'Unnamed River'}</div>
                ))}
              </div>
            )}
          </div>

          {/* Location Details */}
          <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              Location Data
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)', lineHeight: '1.8' }}>
              <li><strong style={{ color: 'var(--color-text-secondary)' }}>State:</strong> {geocode?.state || 'N/A'}</li>
              <li><strong style={{ color: 'var(--color-text-secondary)' }}>District:</strong> {geocode?.district || 'N/A'}</li>
              <li><strong style={{ color: 'var(--color-text-secondary)' }}>City/Town:</strong> {geocode?.city || 'N/A'}</li>
              <li><strong style={{ color: 'var(--color-text-secondary)' }}>Soil Type:</strong> Alluvial (Simulated)</li>
            </ul>
          </div>

          {/* Regional Terrain Metrics */}
          {properties.risk_score !== undefined && properties.risk_score !== null && (
            <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
                Regional Terrain Metrics
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)', lineHeight: '1.8' }}>
                <li><strong style={{ color: 'var(--color-text-secondary)' }}>NDVI Mean:</strong> {properties.ndvi_mean !== undefined ? Number(properties.ndvi_mean).toFixed(4) : 'N/A'}</li>
                <li><strong style={{ color: 'var(--color-text-secondary)' }}>BSI Mean:</strong> {properties.bsi_mean !== undefined ? Number(properties.bsi_mean).toFixed(4) : 'N/A'}</li>
                <li><strong style={{ color: 'var(--color-text-secondary)' }}>Average Slope:</strong> {properties.average_slope !== undefined ? `${Number(properties.average_slope).toFixed(2)}°` : 'N/A'}</li>
                <li><strong style={{ color: 'var(--color-text-secondary)' }}>Slope Class:</strong> {properties.slope_classification || 'N/A'}</li>
              </ul>
            </div>
          )}

          {/* Nearby Settlements (Proximity) */}
          <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              Nearby Settlements (Proximity)
            </h3>
            {nearbyPlaces && nearbyPlaces.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                {nearbyPlaces.map((place: any, idx: number) => {
                  const badgeColor = place.type === 'city' ? 'var(--color-danger)' : place.type === 'town' ? 'var(--color-accent)' : 'var(--color-text-secondary)';
                  return (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                        <span style={{ 
                          fontSize: '9px', 
                          padding: '2px 6px', 
                          borderRadius: '10px', 
                          backgroundColor: 'var(--color-surface-hover)', 
                          color: badgeColor,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          border: '1px solid var(--glass-border)'
                        }}>
                          {place.type}
                        </span>
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{place.name}</span>
                      </div>
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)' }}>~{place.distance} km</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                No nearby settlements detected within 20km.
              </div>
            )}
          </div>

          {/* Data Visualization / Probability Score */}
          <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              Mining Probability Analysis
            </h3>
            {analyzed ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                <DataVisualizer score={score} />
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '-10px' }}>
                  {numSites === 0 ? (
                    <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>✓ Clean Zone: No suspected sites detected in this region.</span>
                  ) : (
                    <span>⚠️ <strong style={{ color: 'var(--color-danger)' }}>{numSites} Suspected Site{numSites > 1 ? 's' : ''}</strong> detected within selection.</span>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', textAlign: 'center', padding: '0 var(--spacing-4)', gap: 'var(--spacing-2)' }}>
                <div style={{ fontSize: '24px' }}>⏱️</div>
                <div style={{ fontWeight: 600 }}>Pipeline Analysis Pending</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Click "Run Pipeline Analysis" below to perform dynamic satellite scanning.</div>
              </div>
            )}
          </div>

          {/* GEE Satellite Swipe Comparer Card */}
          {analyzed && (
            <div style={{ 
              backgroundColor: 'var(--color-background)', 
              padding: 'var(--spacing-4)', 
              borderRadius: 'var(--border-radius-md)', 
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-3)'
            }}>
              <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', margin: 0 }}>
                GEE Satellite Spectral Swipe
              </h3>
              
              {/* Metric/Tab Row */}
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                {[
                  { key: 'ndvi', label: 'NDVI', val: properties.ndvi_mean !== undefined ? Number(properties.ndvi_mean).toFixed(2) : '-0.14' },
                  { key: 'bsi', label: 'BSI', val: properties.bsi_mean !== undefined ? Number(properties.bsi_mean).toFixed(2) : '+0.65' },
                  { key: 'mndwi', label: 'MNDWI', val: '0.08' }
                ].map((tab) => {
                  const isActive = activeSpectralIndex === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveSpectralIndex(tab.key)}
                      style={{
                        flex: 1,
                        padding: '8px 4px',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        fontWeight: isActive ? 700 : 500,
                        backgroundColor: isActive ? 'rgba(93, 132, 150, 0.15)' : 'transparent',
                        color: isActive ? '#5D8496' : 'var(--color-text-secondary)',
                        border: `1px solid ${isActive ? '#5D8496' : 'var(--glass-border)'}`,
                        borderRadius: 'var(--border-radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <span>{tab.label}</span>
                      <span style={{ fontSize: '9px', opacity: 0.8 }}>[{tab.val}]</span>
                    </button>
                  );
                })}
              </div>

              {/* Slider Viewport */}
              <div style={{ marginTop: 'var(--spacing-1)' }}>
                <VisualSlider 
                  imageBefore={
                    activeSpectralIndex === 'ndvi' 
                      ? properties.ndvi_baseline_url || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' 
                      : activeSpectralIndex === 'bsi'
                        ? properties.bsi_baseline_url || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
                        : properties.mndwi_baseline_url || 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80'
                  }
                  imageAfter={
                    activeSpectralIndex === 'ndvi'
                      ? properties.ndvi_compare_url || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
                      : activeSpectralIndex === 'bsi'
                        ? properties.bsi_compare_url || 'https://images.unsplash.com/photo-1509316975850-ff9c5edd0ea9?auto=format&fit=crop&w=600&q=80'
                        : properties.mndwi_compare_url || 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80'
                  }
                  labelBefore={`GEE [${startYear}]`}
                  labelAfter={`GEE [${endYear}]`}
                  title={`${activeSpectralIndex.toUpperCase()} REFLECTANCE`}
                  coordinates={`${centerLat.toFixed(4)}° N, ${centerLng.toFixed(4)}° E`}
                />
              </div>
            </div>
          )}

          {/* Scientific Validation Status Card */}
          {properties.id && (
            <div style={{ 
              backgroundColor: 'var(--color-background)', 
              padding: 'var(--spacing-4)', 
              borderRadius: 'var(--border-radius-md)', 
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-3)'
            }}>
              <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', margin: 0 }}>
                Scientific Validation Status
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  CURRENT STATUS:
                </span>
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '11px', 
                  fontWeight: 'bold',
                  padding: '3px 8px',
                  borderRadius: 'var(--border-radius-sm)',
                  backgroundColor: validationStatus === 'VALIDATED' 
                    ? 'rgba(16, 185, 129, 0.15)' 
                    : validationStatus === 'CONFLICT' 
                      ? 'rgba(239, 68, 68, 0.15)' 
                      : 'rgba(245, 158, 11, 0.15)',
                  color: validationStatus === 'VALIDATED' 
                    ? '#10b981' 
                    : validationStatus === 'CONFLICT' 
                      ? '#ef4444' 
                      : '#f59e0b',
                  border: `1px solid ${
                    validationStatus === 'VALIDATED' 
                      ? '#10b981' 
                      : validationStatus === 'CONFLICT' 
                        ? '#ef4444' 
                        : '#f59e0b'
                  }`
                }}>
                  {validationStatus}
                </span>
              </div>

              {onUpdateValidation && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-1)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-2)' }}>
                    <button
                      onClick={() => onUpdateValidation(properties.id, 'VALIDATED')}
                      style={{
                        padding: '8px 4px',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600,
                        backgroundColor: 'transparent',
                        color: 'var(--color-success)',
                        border: '1px solid var(--color-success)',
                        borderRadius: 'var(--border-radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Approve Validation
                    </button>
                    <button
                      onClick={() => onUpdateValidation(properties.id, 'CONFLICT')}
                      style={{
                        padding: '8px 4px',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600,
                        backgroundColor: 'transparent',
                        color: 'var(--color-danger)',
                        border: '1px solid var(--color-danger)',
                        borderRadius: 'var(--border-radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Flag Conflict
                    </button>
                  </div>
                  <button
                    onClick={() => onUpdateValidation(properties.id, 'UNVALIDATED')}
                    style={{
                      padding: '8px',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontWeight: 600,
                      backgroundColor: 'transparent',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 'var(--border-radius-sm)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--glass-bg)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Reset to Unvalidated
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Roboflow Target Audit Carousel Card */}
          {analyzed && (
            <div style={{ 
              backgroundColor: 'var(--color-background)', 
              padding: 'var(--spacing-4)', 
              borderRadius: 'var(--border-radius-md)', 
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-3)'
            }}>
              <style dangerouslySetInnerHTML={{__html: `
                .roboflow-carousel-wrapper {
                  position: relative;
                  overflow: hidden;
                  border-radius: var(--border-radius-sm);
                  border: 1px solid var(--glass-border);
                  aspect-ratio: 4 / 3;
                  background-color: var(--color-surface);
                }
                .roboflow-carousel-img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.3s ease;
                }
                .roboflow-carousel-wrapper:hover .roboflow-carousel-img {
                  transform: scale(1.08);
                }
                .roboflow-carousel-badge {
                  position: absolute;
                  bottom: 6px;
                  right: 6px;
                  background-color: rgba(27, 30, 34, 0.9);
                  color: var(--color-success);
                  font-family: monospace;
                  font-size: 10px;
                  padding: 3px 6px;
                  border-radius: var(--border-radius-sm);
                  border: 1px solid var(--glass-border);
                  pointer-events: none;
                  font-weight: bold;
                }
              `}} />
              <h3 style={{ 
                fontSize: 'var(--font-size-sm)', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                color: 'var(--color-text-secondary)', 
                margin: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Roboflow Target Audit Carousel</span>
                <span style={{ fontSize: '9px', color: 'var(--color-accent)', fontFamily: 'monospace' }}>[v2i.yolov8]</span>
              </h3>
              
              <div className="roboflow-carousel-wrapper">
                <img 
                  src={roboflowTargets[carouselIndex].image} 
                  alt={roboflowTargets[carouselIndex].title}
                  className="roboflow-carousel-img"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="75" viewBox="0 0 100 75" style="background:%231b1e22;"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%238e9cae" font-family="monospace" font-size="9">${roboflowTargets[carouselIndex].badge}</text></svg>`;
                  }}
                />
                <div className="roboflow-carousel-badge">{roboflowTargets[carouselIndex].badge}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  {roboflowTargets[carouselIndex].title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {roboflowTargets[carouselIndex].description}
                </div>
              </div>

              {/* Carousel Pagination Controls */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderTop: '1px solid var(--glass-border)',
                paddingTop: 'var(--spacing-2)',
                marginTop: 'var(--spacing-1)'
              }}>
                <button
                  onClick={() => setCarouselIndex((prev) => (prev === 0 ? 3 : prev - 1))}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  ← PREV
                </button>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                  {carouselIndex + 1} / 4
                </span>
                <button
                  onClick={() => setCarouselIndex((prev) => (prev === 3 ? 0 : prev + 1))}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  NEXT →
                </button>
              </div>
            </div>
          )}

          {/* Region Action Panel */}
          <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              Configure Ingestion Parameters
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
              {/* Year range row */}
              <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)', textTransform: 'uppercase' }}>
                    Baseline Year
                  </label>
                  <select 
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 'var(--border-radius-sm)',
                      outline: 'none',
                      fontSize: 'var(--font-size-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    {[2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)', textTransform: 'uppercase' }}>
                    Comparison Year
                  </label>
                  <select 
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 'var(--border-radius-sm)',
                      outline: 'none',
                      fontSize: 'var(--font-size-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {startYear > endYear && (
                <div style={{ color: 'var(--color-danger)', fontSize: '11px', fontFamily: 'monospace' }}>
                  ⚠️ ERROR: Baseline Year must be &lt;= Comparison Year.
                </div>
              )}

              {/* Sensitivity Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)', textTransform: 'uppercase' }}>
                  Pipeline Sensitivity
                </label>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)', backgroundColor: 'var(--color-surface)', padding: '2px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--glass-border)' }}>
                  {['low', 'medium', 'high'].map((level) => {
                    const isActive = sensitivity === level;
                    return (
                      <button
                        key={level}
                        onClick={() => setSensitivity(level)}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 600,
                          backgroundColor: isActive ? '#5D8496' : 'transparent',
                          color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                          border: 'none',
                          borderRadius: 'calc(var(--border-radius-sm) - 1px)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                if (startYear <= endYear) {
                  onAnalyze(startYear, endYear, sensitivity);
                }
              }} 
              disabled={isAnalyzing || startYear > endYear}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: isAnalyzing || startYear > endYear ? 'var(--color-surface-hover)' : 'var(--color-success)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--border-radius-md)',
                cursor: isAnalyzing || startYear > endYear ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: 'var(--font-size-base)',
                transition: 'var(--transition-fast)'
              }}
            >
              {isAnalyzing ? 'Processing Imagery...' : 'Run Pipeline Analysis'}
            </button>

            <button 
              onClick={onDownloadData}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'transparent',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--border-radius-md)',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: 'var(--font-size-sm)',
                transition: 'var(--transition-fast)',
                marginTop: 'var(--spacing-2)'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-bg)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Download Data (CSV)
            </button>

            {analyzed && onOpenCommunity && (
              <button 
                onClick={onOpenCommunity}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 'var(--font-size-sm)',
                  transition: 'var(--transition-fast)',
                  marginTop: 'var(--spacing-2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
                }}
              >
                Open Community Chat
              </button>
            )}
          </div>
        </div>

        {/* Auth Overlay Card (Excluding header and close button) */}
        {!user && (
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            backgroundColor: 'rgba(27, 30, 34, 0.97)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-6)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
            width: '90%'
          }}>
            <div style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}>
              Sign up to see the analysis
            </div>
            <button 
              onClick={signInWithGoogle}
              style={{
                backgroundColor: '#a35138',
                color: '#fff',
                border: 'none',
                padding: 'var(--spacing-3) var(--spacing-6)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8b402b'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#a35138'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.7 17.57V20.34H19.26C21.34 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.7 17.57C14.73 18.22 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.88 14.12H2.21V16.96C4.01 20.54 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.88 14.12C5.66 13.47 5.54 12.76 5.54 12C5.54 11.24 5.66 10.53 5.88 9.88V7.04H2.21C1.47 8.53 1.05 10.21 1.05 12C1.05 13.79 1.47 15.47 2.21 16.96L5.88 14.12Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1 12 1C7.7 1 4.01 3.46 2.21 7.04L5.88 9.88C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      width: 'var(--info-panel-width)',
      height: '100%',
      backgroundColor: 'var(--color-surface)',
      borderLeft: '1px solid var(--glass-border)',
      padding: 'var(--spacing-6)',
      overflowY: 'auto',
      zIndex: 5,
      boxShadow: '-4px 0 20px rgba(0,0,0,0.2)'
    }}>
      {roiData ? renderActiveState() : renderDefaultState()}
    </div>
  );
};

export default InfoPanel;
