'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

const SATELLITE_BANDS = [
  { name: 'Band 2 - Blue', wavelength: '490 nm', resolution: '10 meters', use: 'Bare soil calculation (BSI), water depth delineation.' },
  { name: 'Band 3 - Green', wavelength: '560 nm', resolution: '10 meters', use: 'Modified Normalized Difference Water Index (MNDWI).' },
  { name: 'Band 4 - Red', wavelength: '665 nm', resolution: '10 meters', use: 'Normalized Difference Vegetation Index (NDVI), Bare Soil Index (BSI).' },
  { name: 'Band 8 - NIR (Near Infrared)', wavelength: '842 nm', resolution: '10 meters', use: 'Key index component for chlorophyll absorption delta (NDVI).' },
  { name: 'Band 11 - SWIR-1 (Shortwave IR)', wavelength: '1610 nm', resolution: '20 meters', use: 'Moisture evaluation, bank morphology shift mapping (MNDWI).' },
  { name: 'Band 12 - SWIR-2 (Shortwave IR)', wavelength: '2190 nm', resolution: '20 meters', use: 'Mineral/soil separation (BSI).' }
];

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState<'indices' | 'yolo'>('indices');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.heroTagline}>TECHNICAL CLEARANCE: LEVEL_4_METHODOLOGY</div>
            <h1 className={styles.heroTitle}>Earth Engine Science &amp; Neural Inference</h1>
            <p className={styles.heroSubtitle}>
              Understanding how multi-spectral orbital reflectance maps and deep computer vision models combine to expose sand excavation patterns.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.tabContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'indices' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('indices')}
            >
              ORBITAL SPECTRAL INDICES
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'yolo' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('yolo')}
            >
              YOLOv8 COMPUTER VISION
            </button>
          </div>

          {activeTab === 'indices' && (
            <div className="tab-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
              
              {/* Copernicus Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SENSOR CONSTALLATIONS</div>
                <h2 className={styles.sectionTitle}>Copernicus Sentinel-2 &amp; Landsat-9 Telemetry</h2>
                <p className={styles.sectionText}>
                  Remote sensing maps reflected electromagnetic radiation across discrete wavelengths. Sentinel-2's Multi-Spectral Instrument (MSI) captures 13 spectral bands, from visible light to shortwave infrared, permitting us to isolate ground transitions like vegetation thinning, open water shifts, and sand exposure.
                </p>
                
                {/* Bands Table */}
                <div style={{ overflowX: 'auto', margin: 'var(--spacing-4) 0', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-md)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--glass-border)' }}>
                        <th style={{ padding: '12px 16px', color: 'var(--color-accent)' }}>Bands Config</th>
                        <th style={{ padding: '12px 16px', color: 'var(--color-accent)' }}>Wavelength</th>
                        <th style={{ padding: '12px 16px', color: 'var(--color-accent)' }}>Resolution</th>
                        <th style={{ padding: '12px 16px', color: 'var(--color-accent)' }}>Primary Telemetry Application</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SATELLITE_BANDS.map((b, i) => (
                        <tr key={i} style={{ borderBottom: i === SATELLITE_BANDS.length - 1 ? 'none' : '1px solid var(--glass-border)' }}>
                          <td style={{ padding: '12px 16px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{b.name}</td>
                          <td style={{ padding: '12px 16px' }}>{b.wavelength}</td>
                          <td style={{ padding: '12px 16px' }}>{b.resolution}</td>
                          <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>{b.use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Spectral Formulas */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>MATHEMATICAL SYNTHESIS</div>
                <h2 className={styles.sectionTitle}>Calculated Biophysical Indices</h2>
                <div className={styles.grid}>
                  
                  {/* NDVI Card */}
                  <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>NDVI INDEX</span>
                      <span className={styles.cardIcon} style={{ margin: 0, width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}>VEG</span>
                    </div>
                    <h3 className={styles.cardTitle}>Normalized Difference Vegetation</h3>
                    <div style={{
                      backgroundColor: 'rgba(12, 15, 18, 0.9)',
                      border: '1px solid var(--glass-border)',
                      padding: '12px',
                      borderRadius: 'var(--border-radius-sm)',
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: 'var(--color-success)',
                      margin: '12px 0'
                    }}>
                      NDVI = (B8 - B4) / (B8 + B4)
                    </div>
                    <p className={styles.cardText}>
                      Measures chlorophyll absorption density. Dynamic NDVI drops signal rapid canopy clearance, typically corresponding to heavy machinery access roads and sand sorting spaces.
                    </p>
                  </div>

                  {/* BSI Card */}
                  <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>BSI INDEX</span>
                      <span className={styles.cardIcon} style={{ margin: 0, width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}>SOIL</span>
                    </div>
                    <h3 className={styles.cardTitle}>Bare Soil Index</h3>
                    <div style={{
                      backgroundColor: 'rgba(12, 15, 18, 0.9)',
                      border: '1px solid var(--glass-border)',
                      padding: '12px',
                      borderRadius: 'var(--border-radius-sm)',
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: 'var(--color-warning)',
                      margin: '12px 0'
                    }}>
                      BSI = ((B11 + B4) - (B8 + B2)) / ((B11 + B4) + (B8 + B2))
                    </div>
                    <p className={styles.cardText}>
                      Isolates mineral exposure by contrasting red/shortwave infrared channels against blue/near infrared. Sharp BSI spikes highlight stripped topsoil and active excavation quarries.
                    </p>
                  </div>

                  {/* MNDWI Card */}
                  <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>MNDWI INDEX</span>
                      <span className={styles.cardIcon} style={{ margin: 0, width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}>H2O</span>
                    </div>
                    <h3 className={styles.cardTitle}>Modified Water Index</h3>
                    <div style={{
                      backgroundColor: 'rgba(12, 15, 18, 0.9)',
                      border: '1px solid var(--glass-border)',
                      padding: '12px',
                      borderRadius: 'var(--border-radius-sm)',
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: 'var(--color-accent)',
                      margin: '12px 0'
                    }}>
                      MNDWI = (B3 - B11) / (B3 + B11)
                    </div>
                    <p className={styles.cardText}>
                      Maps open water boundaries by highlighting the Green/SWIR reflectance ratio. Channel shifts over time expose morphology modifications caused by dredging.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

          {activeTab === 'yolo' && (
            <div className="tab-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
              
              {/* YOLO Architecture Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>OBJECT DETECTION PIPELINE</div>
                <h2 className={styles.sectionTitle}>Ultralytics YOLOv8 Neural Architecture</h2>
                <p className={styles.sectionText}>
                  Orbital indexes map changes on the ground, but locating active machinery requires computer vision. We deploy a customized **YOLOv8 (You Only Look Once)** deep learning classifier trained over high-resolution aerial datasets exported via **Roboflow**.
                </p>
                <p className={styles.sectionText}>
                  The model processes 416x416 spatial raster grids in memory. By dividing each image into multi-scale convolutional bounding anchors, it extracts visual patterns for dredger barges, sorting sieves, sand stockpiles, and heavy haul trucks directly on localized pixels.
                </p>
              </div>

              {/* Console logs */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>YOLO LIVE PROCESSING LOG</div>
                <div className={styles.consoleLog}>
                  <div className={styles.consoleHeader}>COGNITIVE_SUB_SYSTEM_INFERENCE_ENGAGED</div>
                  &gt; LOADING WEIGHTS: YOLOv8 Object Detection Engine v2i.yolov8.sand-mining<br />
                  &gt; RESOLVING RASTER TILE COMPRESSION RATE: 416x416 spatial grids<br />
                  &gt; RUNNING BATCH MATRIX COMPILATION...<br />
                  &gt;&gt; TILE 001/064: Detected anchor class 'dredger_barge' at 89.4% confidence<br />
                  &gt;&gt; TILE 012/064: Detected anchor class 'haul_road' at 92.1% confidence<br />
                  &gt;&gt; TILE 028/064: Detected anchor class 'sand_stockpile' at 78.5% confidence<br />
                  &gt;&gt; TILE 043/064: Detected anchor class 'excavator' at 86.2% confidence<br />
                  &gt; SYNTHESIZING BOUNDING POLYGONS: 4 targets recorded.<br />
                  &gt; EXPORTING POSTGIS VECTOR GEOMETRIES: Coordinate mapping completed.<br />
                  INFERENCE SESSION LOCKED ORBITAL SYNC OK
                </div>
              </div>

              {/* Confidence parameters */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>MODEL BOUNDARIES</div>
                <h2 className={styles.sectionTitle}>Classification &amp; Evidentiary Thresholds</h2>
                <div className={styles.grid}>
                  <div className={styles.card}>
                    <h4 className={styles.cardTitle}>Confidence Scoring</h4>
                    <p className={styles.cardText}>
                      We enforce an inference filter boundary at **c &gt;= 75%** confidence. Detections below this threshold are marked as "Unverified Detections" to eliminate atmospheric interference (cloud shadows, dust) or similar river objects.
                    </p>
                  </div>
                  <div className={styles.card}>
                    <h4 className={styles.cardTitle}>Evidentiary Integrity</h4>
                    <p className={styles.cardText}>
                      A statistical YOLO match indicates physical resemblance but is not definitive legal proof. We combine ML results with multi-spectral index records (NDVI, BSI) to create robust spatial audit packages for legal advocacy.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
