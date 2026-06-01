import React, { useState } from 'react';
import { GeocodeData } from '../hooks/useGeocoding';
import DataVisualizer from './DataVisualizer';
import * as turf from '@turf/turf';

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
  const [startYear, setStartYear] = useState<number>(2025);
  const [endYear, setEndYear] = useState<number>(2026);
  const [sensitivity, setSensitivity] = useState<string>('medium');
  
  const renderDefaultState = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-2)' }}>
          Global Intelligence
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
          Welcome to the From Afar intelligence dashboard. Use the polygon tool on the left to select a region of interest in India and run our Earth Engine + YOLO pipeline to detect illegal sand mining.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Recent Global Activity
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <li style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-accent)' }}>User 3942</strong> ran analysis in <span style={{ color: 'var(--color-text-primary)' }}>Chhattisgarh</span>
            <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>12 minutes ago</div>
          </li>
          <li style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-accent)' }}>User 1024</strong> ran analysis in <span style={{ color: 'var(--color-text-primary)' }}>Madhya Pradesh</span>
            <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>1 hour ago</div>
          </li>
          <li style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-danger)' }}>7 New Sites</strong> confirmed via field report in <span style={{ color: 'var(--color-text-primary)' }}>Gujarat</span>
            <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>5 hours ago</div>
          </li>
        </ul>
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
            padding: 'var(--spacing-4)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--glass-border)',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: 'var(--color-success)',
            lineHeight: '1.6',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scan-loading {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
              @keyframes pulse-loading {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
            `}} />
            <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)', fontWeight: 'bold' }}>
              [GEOSPATIAL INGESTION TELEMETRY]
            </div>
            <div style={{ animation: 'pulse-loading 1.5s infinite' }}>&gt; INITIALIZING SPATIAL INGESTION PIPELINE...</div>
            <div style={{ animation: 'pulse-loading 1.5s infinite', animationDelay: '0.2s' }}>&gt; CAPTURING POLYGON VECTOR BOUNDS...</div>
            <div style={{ color: 'var(--color-warning)', animation: 'pulse-loading 1.5s infinite', animationDelay: '0.4s' }}>&gt; RESOLVING ADJACENT WATERWAY CHANNELS...</div>
            <div style={{ color: 'var(--color-warning)', animation: 'pulse-loading 1.5s infinite', animationDelay: '0.6s' }}>&gt; PARSING CLOSEST HUMAN SETTLEMENTS...</div>
            <div style={{ animation: 'pulse-loading 1.5s infinite', animationDelay: '0.8s' }}>&gt; DECODING NOMINATIM REVERSE GEO-REF...</div>
            
            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--spacing-2)', marginTop: 'var(--spacing-2)', color: 'var(--color-accent)' }}>
              STATUS: ACQUIRING TARGET REGION DATA...
            </div>
            
            {/* Cyber scanline overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(52, 211, 153, 0.4)',
              boxShadow: '0 0 8px var(--color-success)',
              animation: 'scan-loading 2.5s infinite linear'
            }} />
          </div>
        </div>
      );
    }

    const { geocode, rivers, feature, nearbyPlaces, analyzed } = roiData;
    const numRivers = rivers?.features?.length || 0;

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        
        {/* Header */}
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
            style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 'var(--spacing-1)' }}
          >
            ✕
          </button>
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

        {/* Analyst Profile Card */}
        <div style={{ 
          backgroundColor: 'var(--color-background)', 
          padding: 'var(--spacing-4)', 
          borderRadius: 'var(--border-radius-md)', 
          border: '1px solid var(--glass-border)',
          borderLeft: '4px solid var(--color-success)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-2)'
        }}>
          <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
            Analyst Profile Card
          </h3>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
            <strong>Ingested by:</strong> {properties.analyst_profession || 'Independent Analyst'}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
            LOCATION: {properties.analyst_city || 'New Delhi'}, {properties.analyst_country || 'India'}
          </div>
          {properties.analyst_intention && (
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: 'var(--spacing-1)' }}>
              "{properties.analyst_intention}"
            </div>
          )}
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

        {/* Roboflow Target Audit Feed Card */}
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
              .roboflow-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: var(--spacing-2);
                margin-top: var(--spacing-1);
              }
              .roboflow-img-wrapper {
                position: relative;
                overflow: hidden;
                border-radius: var(--border-radius-sm);
                border: 1px solid var(--glass-border);
                aspect-ratio: 4 / 3;
                background-color: var(--color-surface);
              }
              .roboflow-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
              }
              .roboflow-img-wrapper:hover .roboflow-img {
                transform: scale(1.15);
              }
              .roboflow-badge {
                position: absolute;
                bottom: 4px;
                right: 4px;
                background-color: rgba(27, 30, 34, 0.85);
                color: var(--color-success);
                font-family: monospace;
                font-size: 9px;
                padding: 2px 4px;
                border-radius: 2px;
                border: 1px solid var(--glass-border);
                pointer-events: none;
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
              <span>Roboflow Target Audit Feed</span>
              <span style={{ fontSize: '9px', color: 'var(--color-accent)', fontFamily: 'monospace' }}>[v2i.yolov8]</span>
            </h3>
            
            <div className="roboflow-grid">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="roboflow-img-wrapper">
                  <img 
                    src={`/images/roboflow/roboflow_${id}.jpg`} 
                    alt={`Target Audit Area ${id}`}
                    className="roboflow-img"
                    onError={(e) => {
                      // High-fidelity fallback SVG if physical copy doesn't exist
                      e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="75" viewBox="0 0 100 75" style="background:%231b1e22;"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%238e9cae" font-family="monospace" font-size="9">TARGET_${id}</text></svg>`;
                    }}
                  />
                  <div className="roboflow-badge">TRK_0{id}</div>
                </div>
              ))}
            </div>
            
            <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)', fontFamily: 'monospace', textAlign: 'right', marginTop: 'var(--spacing-1)' }}>
              SECURE DUAL-CHANNEL TELEMETRY ACTIVE
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginTop: 'auto' }}>
          
          {/* Pipeline Configuration Parameters */}
          <div style={{ 
            backgroundColor: 'var(--color-background)', 
            padding: 'var(--spacing-4)', 
            borderRadius: 'var(--border-radius-md)', 
            border: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)'
          }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', margin: 0 }}>
              Pipeline Parameters
            </h3>
            
            {/* Year Range Selects */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                <label style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Start Year
                </label>
                <select 
                  value={startYear} 
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    fontSize: 'var(--font-size-sm)',
                    outline: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'border-color 0.2s'
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => 2017 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                <label style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  End Year
                </label>
                <select 
                  value={endYear} 
                  onChange={(e) => setEndYear(Number(e.target.value))}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    fontSize: 'var(--font-size-sm)',
                    outline: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'border-color 0.2s'
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => 2017 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Validation Error */}
            {startYear > endYear && (
              <div style={{ 
                fontSize: '11px', 
                color: 'var(--color-danger)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                marginTop: '-4px'
              }}>
                ⚠️ Start Year must be &le; End Year
              </div>
            )}

            {/* Sensitivity Button-Group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
              <label style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pipeline Sensitivity
              </label>
              <div style={{ 
                display: 'flex', 
                backgroundColor: 'var(--color-surface)', 
                borderRadius: 'var(--border-radius-sm)', 
                border: '1px solid var(--glass-border)',
                padding: '2px'
              }}>
                {['low', 'medium', 'high'].map((level) => {
                  const isActive = sensitivity === level;
                  return (
                    <button
                      key={level}
                      type="button"
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
              transition: 'var(--transition-fast)'
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
                marginTop: 'var(--spacing-1)'
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
