'use client';

import React from 'react';
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

export default function MethodologyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.heroTitle} style={{ maxWidth: '900px', margin: '0 auto var(--spacing-4) auto' }}>
              Scientific Methodology &amp; 9-Stage Computational Pipeline
            </h1>
            <p className={styles.heroSubtitle} style={{ maxWidth: '850px' }}>
              An end-to-end analytical framework combining Google Earth Engine multi-spectral remote sensing, localized masking constraints, adaptive biophysical thresholds, parallel YOLOv8s object detection, and reference validation.
            </p>
          </div>

          {/* Section 1: User Input */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 01: USER INPUT &amp; RESOLUTION</div>
            <h2 className={styles.sectionTitle}>Stage 1. User Input</h2>
            <p className={styles.sectionText}>
              The pipeline begins with user configuration defining the geographical and temporal parameters for observation:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>User Input Parameters:</span> Location (drawn polygon, place name, or latitude/longitude coordinates), Date Range (start year to end year), and Sensitivity Threshold (Low / Medium / High).
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>System Resolution:</span> Google Earth Engine (GEE) dynamically queries the available imagery inventory for the specified river basin. The river name and catchment parameters map the user's sensitivity choice directly to a baseline sensitivity coefficient: <span style={{ fontFamily: 'monospace', color: 'var(--color-accent)' }}>n_base = 2.5 (Low) / 2.0 (Medium) / 1.5 (High)</span>.
              </li>
            </ul>
          </div>

          {/* Section 2: Landscape Context Assessment */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 02: LANDSCAPE CONTEXT ASSESSMENT</div>
            <h2 className={styles.sectionTitle}>Stage 2. Landscape Context Assessment</h2>
            <p className={styles.sectionText}>
              To prevent environmental variations from skewing thresholds, the pipeline evaluates localized landscape factors to calculate a context-adjusted sensitivity coefficient (<span style={{ fontFamily: 'monospace', color: 'var(--color-accent)' }}>n_adjusted</span>):
            </p>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Factor 1: Aridity</h4>
                <p className={styles.cardText}>
                  Queries the CGIAR Tier 1 Global Aridity Index to determine regional moisture baselines.
                </p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Factor 2: Baseline NDVI</h4>
                <p className={styles.cardText}>
                  Establishes baseline photosynthetic density to account for dense vegetation vs. sparse shrublands.
                </p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Factor 3: ESA WorldCover</h4>
                <p className={styles.cardText}>
                  Evaluates land cover types from the ESA WorldCover 2021 dataset to identify surrounding urban, forested, or riverine classes.
                </p>
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-4)',
              borderRadius: 'var(--border-radius-sm)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              color: 'var(--color-text-primary)',
              marginTop: 'var(--spacing-4)'
            }}>
              <strong style={{ color: 'var(--color-accent)' }}>CONTEXT ADJUSTMENT FORMULA:</strong><br />
              &gt; n_adjusted = n_base + aridity_adj + NDVI_adj + landcover_adj
            </div>
          </div>

          {/* Section 3: Imagery Acquisition and Preprocessing */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 03: IMAGERY ACQUISITION &amp; PREPROCESSING</div>
            <h2 className={styles.sectionTitle}>Stage 3. Imagery Acquisition and Preprocessing</h2>
            <p className={styles.sectionText}>
              Raw satellite data is acquired and heavily preprocessed inside Google Earth Engine to isolate clear, standardized land surface reflectance:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Cloud &amp; Shadow Masking:</span> Sentinel-2 QA60 bitmask bands or Landsat CFmask metadata are applied to strip cloud cover, atmospheric haze, and topography shadows.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Dry-Season Compositing:</span> The engine aggregates all observations captured during the localized pre-monsoon dry-season window (using a region-based monsoon calendar lookup) and computes a median reflectance composite.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Observation Depth Verification:</span> To guarantee signal integrity, the pipeline requires a minimum coverage depth of <span style={{ color: 'var(--color-warning)', fontWeight: 'bold' }}>at least 3 clear observations</span> per pixel. Pixels falling below this depth are flagged as low-confidence.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Scientific Rationale:</span> Restricting analysis to the pre-monsoon season suppresses ephemeral seasonal noise, captures stable sandbars, and avoids monsoon river swelling which mimics dredging-induced water emergence.
              </li>
            </ul>

            {/* Bands Table */}
            <div style={{ overflowX: 'auto', margin: 'var(--spacing-6) 0 0 0', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-md)' }}>
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

          {/* Section 4: Index Computation */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 04: BIOPHYSICAL INDEX COMPUTATION</div>
            <h2 className={styles.sectionTitle}>Stage 4. Index Computation</h2>
            <p className={styles.sectionText}>
              The pipeline projects raw reflectance bands into four mathematical indices to isolate vegetation cover, bare soil exposure, open water boundaries, and built-up structures:
            </p>
            <div className={styles.grid}>
              
              {/* NDVI Card */}
              <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>NDVI FORMULA</span>
                  <span className={styles.cardIcon} style={{ margin: 0, width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}>VEG</span>
                </div>
                <h3 className={styles.cardTitle}>Normalized Difference Vegetation Index</h3>
                <div style={{
                  backgroundColor: 'var(--color-surface)',
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
                  NDVI = (NIR - Red) / (NIR + Red)
                </div>
                <p className={styles.cardText}>
                  Isolates photosynthetic density. Decline reflects rapid canopy clearing preceding heavy vehicle corridors.
                </p>
              </div>

              {/* BSI Card */}
              <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>BSI FORMULA</span>
                  <span className={styles.cardIcon} style={{ margin: 0, width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}>SOIL</span>
                </div>
                <h3 className={styles.cardTitle}>Bare Soil Index</h3>
                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--glass-border)',
                  padding: '12px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  fontWeight: 'bold',
                  color: 'var(--color-warning)',
                  margin: '12px 0'
                }}>
                  BSI = ((SWIR + Red) - (NIR + Blue)) / ((SWIR + Red) + (NIR + Blue))
                </div>
                <p className={styles.cardText}>
                  Highlights exposed mineral/soil surfaces by contrasting SWIR and Red against NIR and Blue.
                </p>
              </div>

              {/* MNDWI Card */}
              <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>MNDWI FORMULA</span>
                  <span className={styles.cardIcon} style={{ margin: 0, width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}>H2O</span>
                </div>
                <h3 className={styles.cardTitle}>Modified Normalized Difference Water Index</h3>
                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--glass-border)',
                  padding: '12px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#0891b2',
                  margin: '12px 0'
                }}>
                  MNDWI = (Green - SWIR) / (Green + SWIR)
                </div>
                <p className={styles.cardText}>
                  Delineates open surface water by contrasting Green against SWIR, separating channels and wet excavation pits.
                </p>
              </div>

              {/* NDBI Card */}
              <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-3)' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>NDBI FORMULA</span>
                  <span className={styles.cardIcon} style={{ margin: 0, width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}>GRID</span>
                </div>
                <h3 className={styles.cardTitle}>Normalized Difference Built-Up Index</h3>
                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--glass-border)',
                  padding: '12px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: 'var(--color-text-secondary)',
                  margin: '12px 0'
                }}>
                  NDBI = (SWIR - NIR) / (SWIR + NIR)
                </div>
                <p className={styles.cardText}>
                  Maps urban built-up structures and artificial impervious surfaces (leveraged exclusively inside our exclusion masking pipeline).
                </p>
              </div>

            </div>

            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-4)',
              borderRadius: 'var(--border-radius-sm)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              color: 'var(--color-text-primary)',
              marginTop: 'var(--spacing-4)'
            }}>
              <strong style={{ color: 'var(--color-accent)' }}>TEMPORAL CHANGE MAP EQUATION:</strong><br />
              &gt; Change map = Final_year_composite - Baseline_year_composite
            </div>
          </div>

          {/* Section 5: Masking Pipeline */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 05: MASKING PIPELINE</div>
            <h2 className={styles.sectionTitle}>Stage 5. Masking Pipeline</h2>
            <p className={styles.sectionText}>
              To isolate raw sand mining signals from general agricultural soil changes, urbanization, or atmospheric shifts, the computed indices pass through a five-layer spatial masking filter:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>Mask 1 — Floodplain boundary (HydroSHEDS)</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  Utilizes a HydroSHEDS-derived river network buffer (500-meter default, adjustable up to 800 meters in braided channels). This limits analytical computation strictly to active riverbeds and immediate riparian zones.
                </p>
              </div>

              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>Mask 2 — Built-up exclusion (NDBI)</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  Pixels experiencing an NDBI increase greater than or equal to <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>+0.10</span> are removed. Since construction sites share high bare soil (BSI) signatures but exhibit built-up expansion (NDBI increase) which sand extraction does not, this isolates mining from urbanization.
                </p>
              </div>

              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>Mask 3 — Agriculture coarse filter (ESA WorldCover)</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  Cropland classification zones defined by the ESA WorldCover 2021 layer (cropland code 40) are masked out in the first pass. This acts as a coarse filter, though riparian crops immediate to riverbanks require temporal screening.
                </p>
              </div>

              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>Mask 4 — Temporal persistence filter</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  A pixel is preserved in the active dataset only if its bare soil elevation (BSI increase) or vegetation decline (NDVI decrease) persists across two or more consecutive pre-monsoon composite timeframes. Because seasonal farming returns to baseline health within 60–90 days, whereas physical sand quarries do not, this is our most critical filter for suppressing false positives.
                </p>
              </div>

              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>Mask 5 — Pit water confirmation (MNDWI)</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  Flagged vegetation/soil disturbance pixels are cross-referenced with local MNDWI changes. The emergence of persistent water in dry-land areas (filled excavation pits) dramatically increases the pipeline's confidence score and suppresses agricultural tillage noise.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Adaptive Threshold Calculation */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 06: ADAPTIVE THRESHOLD CALCULATION</div>
            <h2 className={styles.sectionTitle}>Stage 6. Adaptive Threshold Calculation</h2>
            <p className={styles.sectionText}>
              Rather than enforcing static global variables, the system computes local biophysical anomaly boundaries by adapting to local parameters:
            </p>
            
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-4)',
              borderRadius: 'var(--border-radius-sm)',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: '1.8',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: 'var(--spacing-4)'
            }}>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>&gt;</span> <strong style={{ color: 'var(--color-success)' }}>NDVI threshold = mean_NDVI_baseline - (n_adjusted x sd_NDVI_baseline)</strong></div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>&gt;</span> <strong style={{ color: 'var(--color-warning)' }}>BSI threshold = mean_BSI_baseline + (n_adjusted x sd_BSI_baseline)</strong></div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>&gt;</span> <strong style={{ color: '#0891b2' }}>MNDWI threshold = mean_MNDWI_baseline + (n_adjusted x sd_MNDWI_baseline)</strong></div>
            </div>

            <p className={styles.sectionText}>
              The mathematical detection logic separates pixel anomalies into two distinct biophysical arms:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>ARM 1 (Vegetation Stripping):</span> Triggered when a pixel exhibits simultaneous canopy decay and topsoil exposure: <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>NDVI_change &lt; threshold AND BSI_change &gt; threshold</span>.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>ARM 2 (Pit Water Emergence):</span> Triggered when instream excavation strikes subterranean water tables: <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>MNDWI_change &gt; threshold AND pixel was dry at baseline</span>.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Disturbance Pixel Trigger:</span> A pixel is classified as disturbed if it meets either criteria: <span style={{ fontFamily: 'monospace', color: 'var(--color-warning)' }}>Disturbance pixel = ARM 1 OR ARM 2</span>.
              </li>
            </ul>
          </div>

          {/* Section 7: YOLO Object Detection Layer */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 07: YOLO OBJECT DETECTION LAYER</div>
            <h2 className={styles.sectionTitle}>Stage 7. YOLO Object Detection Layer</h2>
            <p className={styles.sectionText}>
              In parallel to the spectral biophysical pipeline, our system runs a dedicated neural object detection layer to isolate physical machinery and extraction operations on the ground:
            </p>
            
            <div className={styles.grid}>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Ultralytics YOLOv8s</h4>
                <p className={styles.cardText}>
                  A small-footprint, fast convolutional network optimized for visual feature extraction from regional aerial coordinates.
                </p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Input Chip Sizing</h4>
                <p className={styles.cardText}>
                  Processes high-resolution spatial rasters in optimized <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>640 x 640 px</span> boundaries to isolate machinery.
                </p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Classification Classes</h4>
                <p className={styles.cardText}>
                  Trained to identify three specific targets: <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>pit</span> (excavations), <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>haul_road</span> (unauthorized transit roads), and <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>truck</span> (haul loaders).
                </p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Training Dataset</h4>
                <p className={styles.cardText}>
                  Calibrated on 88 custom-annotated satellite image chips exported via Roboflow across 4 pilot Indian river systems.
                </p>
              </div>
            </div>

            <p className={styles.sectionText} style={{ marginTop: 'var(--spacing-4)' }}>
              By merging GEE multi-spectral indices with YOLOv8s machine learning detections (Sentinel-2 or Google Earth higher-resolution bands), we produce cross-validated coordinates with verified physical anchors.
            </p>
          </div>

          {/* Section 8: Output Generation */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>STAGE 08: OUTPUT GENERATION</div>
            <h2 className={styles.sectionTitle}>Stage 8. Output Generation</h2>
            <p className={styles.sectionText}>
              Calculations and spatial bounding anomalies are rendered into actionable civic datasets:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Interactive Map Layer:</span> Displays flagged extraction zones colored by confidence levels (green / amber / red), overlaid with optional YOLO neural bounding boxes, river channels, and floodplain boundaries.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Downloadable PDF Evidentiary Report:</span> Compiles site coordinates, administrative location, local biophysical thresholds used, area statistics per confidence band, annual time-series charts, plain-language summaries, and scientific caveats (sensor resolution limits, cloud ratios, validation status).
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Raw Raster Datasets:</span> Academic and regulatory bodies can download raw GeoTIFF datasets for each spectral index change map, binary disturbance masks, and confidence score rasters for local GIS processing.
              </li>
            </ul>
          </div>

          {/* Section 9: Validation Flag */}
          <div className={styles.section} style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
            <div className={styles.sectionHeader} style={{ color: 'var(--color-accent)' }}>STAGE 09: SYSTEM VALIDATION FLAG</div>
            <h2 className={styles.sectionTitle}>Stage 9. Validation Flag</h2>
            <p className={styles.sectionText}>
              To bridge the gap between computational probability and actionable administrative recourse, each detected site carries a validation flag representing its empirical ground-truth status:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-success)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-success)', display: 'block', marginBottom: '4px' }}>✓ VALIDATED</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  The anomaly has been cross-checked and confirmed against an independent ground-truth reference (such as SANDRP reports, state forest division logs, field-photographs, or National Green Tribunal legal directives). For example, our Ken River analysis demonstrated an 83% spatial intersection match with SANDRP documented mining boundaries.
                </p>
              </div>

              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-background)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>⚙ UNVALIDATED</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  No independent historical reference or crowdsourced coordinates exist for the site. The detection represents computational GEE/YOLO model output only and is flagged for local field validation.
                </p>
              </div>

              <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-danger)', borderRadius: 'var(--border-radius-sm)' }}>
                <strong style={{ color: 'var(--color-danger)', display: 'block', marginBottom: '4px' }}>⚠️ CONFLICT</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  The computational output contradicts available field evidence or legal directories. This triggers a manual warden audit. E.g. A site is classified as negative (dry/stable) by satellite composite but local NGT court notices confirm ongoing waterbed dredging.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
