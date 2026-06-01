import React, { useMemo } from 'react';
import styles from './SiteDetailPanel.module.css';
import { useSiteDetails } from '../hooks/useSites';
import TemporalSlider from './TemporalSlider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import VisualSlider from './VisualSlider';

interface SiteDetailPanelProps {
  siteId: string | null;
  onClose: () => void;
}

const SiteDetailPanel: React.FC<SiteDetailPanelProps> = ({ siteId, onClose }) => {
  const { details, loading, error } = useSiteDetails(siteId);

  const mockTimeSeriesData = useMemo(() => {
    if (!details || !details.metrics) return [];
    const baseNdvi = details.metrics.ndvi;
    const baseBsi = details.metrics.bsi;
    const baseMndwi = details.metrics.mndwi;
    
    return [
      { year: '1987', ndvi: Math.min(1, baseNdvi + 0.3), bsi: Math.max(0, baseBsi - 0.2), mndwi: Math.min(1, baseMndwi + 0.1) },
      { year: '1995', ndvi: Math.min(1, baseNdvi + 0.25), bsi: Math.max(0, baseBsi - 0.15), mndwi: Math.min(1, baseMndwi + 0.08) },
      { year: '2005', ndvi: Math.min(1, baseNdvi + 0.2), bsi: Math.max(0, baseBsi - 0.1), mndwi: Math.min(1, baseMndwi + 0.05) },
      { year: '2015', ndvi: Math.min(1, baseNdvi + 0.1), bsi: Math.max(0, baseBsi - 0.05), mndwi: Math.min(1, baseMndwi + 0.02) },
      { year: '2026', ndvi: baseNdvi, bsi: baseBsi, mndwi: baseMndwi },
    ];
  }, [details]);

  if (!siteId) return null;

  return (
    <div className={`${styles.panel} ${siteId ? styles.open : ''}`}>
      <div className={styles.header}>
        <h2>Site Intelligence</h2>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>

      {loading && <div className={styles.loading}>Loading details...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {details && !loading && !error && (
        <div className={styles.content}>
          {/* Visual Swiper Slider at the Top */}
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <VisualSlider 
              imageBefore={details.images?.['1987']} 
              imageAfter={details.images?.['2026']}
              labelBefore="SENTINEL-2 [1987]"
              labelAfter="SENTINEL-2 [2026]"
              title="HISTORICAL RETICLE SWIPE"
              coordinates={`${details.coordinates?.[1]?.toFixed(4) || '22.5937'}° N, ${details.coordinates?.[0]?.toFixed(4) || '78.9629'}° E`}
            />
          </div>

          <div className={styles.statusBadge}>
            {details.status}
          </div>
          
          <div className={styles.section}>
            <h3>Confidence Score</h3>
            <div className={styles.confidenceWrap}>
              <div 
                className={styles.confidenceBar} 
                style={{ width: `${details.confidence * 100}%` }}
              ></div>
            </div>
            <span className={styles.confidenceText}>
              {(details.confidence * 100).toFixed(1)}%
            </span>
          </div>

          <div className={styles.section}>
            <h3>Spectral Indices (Trend)</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart 
                  data={mockTimeSeriesData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="#a3a3a3" fontSize={10} />
                  <YAxis stroke="#a3a3a3" fontSize={10} domain={[0, 1]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10,10,10,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="ndvi" stroke="#10b981" dot={false} strokeWidth={2} name="NDVI" />
                  <Line type="monotone" dataKey="bsi" stroke="#f59e0b" dot={false} strokeWidth={2} name="BSI" />
                  <Line type="monotone" dataKey="mndwi" stroke="#0ea5e9" dot={false} strokeWidth={2} name="MNDWI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Historical Timeline</h3>
            {details.images && details.images['1987'] && details.images['2026'] ? (
              <TemporalSlider 
                imageBefore={details.images['1987']} 
                imageAfter={details.images['2026']} 
              />
            ) : (
              <div className={styles.placeholderTimeline}>
                <p>Imagery data unavailable</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteDetailPanel;
