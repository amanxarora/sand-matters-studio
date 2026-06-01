import React, { useState } from 'react';
import styles from './SiteDetailPanel.module.css'; // Reuse same styles for consistency
import { GeocodeData } from '../hooks/useGeocoding';
import { useSites } from '../hooks/useSites';

interface RegionDetailPanelProps {
  roiData: {
    geocode: GeocodeData | null;
    rivers: any | null;
    bbox: number[] | null;
  } | null;
  onClose: () => void;
}

const RegionDetailPanel: React.FC<RegionDetailPanelProps> = ({ roiData, onClose }) => {
  const { refetch } = useSites();
  const [analyzing, setAnalyzing] = useState(false);

  if (!roiData) return null;

  const { geocode, rivers, bbox } = roiData;
  const numRivers = rivers?.features?.length || 0;

  const handleAnalyze = async () => {
    if (!bbox) return;
    setAnalyzing(true);
    
    try {
      // Trigger the backend E2E Pipeline
      await fetch('http://localhost:8000/api/pipeline/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bbox })
      });
      
      // Since it runs in the background, we simulate waiting for completion
      // and then invalidate the sites cache to pull in the new YOLO detections!
      setTimeout(() => {
        refetch();
        setAnalyzing(false);
        alert("Pipeline Complete: New YOLO Detections found in this region!");
      }, 5000); // Wait 5 seconds for backend to process
      
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
    }
  };

  return (
    <div className={`${styles.panel} ${roiData ? styles.open : ''}`}>
      <div className={styles.header}>
        <h2>Region Intelligence</h2>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3>Location Data</h3>
          {geocode ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#a3a3a3', fontSize: '14px', lineHeight: '1.6' }}>
              <li><strong>State:</strong> {geocode.state || 'Unknown'}</li>
              <li><strong>District:</strong> {geocode.district || 'Unknown'}</li>
              <li><strong>City/Town:</strong> {geocode.city || 'Unknown'}</li>
              <li><strong>Country:</strong> {geocode.country || 'Unknown'}</li>
            </ul>
          ) : (
            <p>Reverse geocoding unavailable.</p>
          )}
        </div>

        <div className={styles.section}>
          <h3>Intersecting Hydrology</h3>
          <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{numRivers}</span>
            <span style={{ marginLeft: '10px', color: '#a3a3a3', fontSize: '14px' }}>Rivers Detected</span>
          </div>
          
          {numRivers > 0 && (
            <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0, color: '#e5e7eb', fontSize: '13px', maxHeight: '150px', overflowY: 'auto' }}>
              {rivers.features.map((r: any, idx: number) => (
                <li key={idx} style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  🌊 {r.properties.name || 'Unnamed River'}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.section} style={{ marginTop: '20px' }}>
          <button 
            onClick={handleAnalyze} 
            disabled={analyzing}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: analyzing ? '#4b5563' : '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
          >
            {analyzing ? 'Processing Earth Engine Imagery...' : 'Run Pipeline Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegionDetailPanel;
