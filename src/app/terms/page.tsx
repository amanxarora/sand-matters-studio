'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function TermsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.heroTagline}>LEGAL &amp; COMPUTATIONAL FRAMEWORK</div>
            <h1 className={styles.heroTitle}>Sand Matters Studio</h1>
            <p className={styles.heroSubtitle}>
              Geospatial Platform for Sand Mining Oversight &amp; Environmental Hydrology
            </p>
            <div style={{ display: 'inline-block', marginTop: 'var(--spacing-3)', padding: 'var(--spacing-1) var(--spacing-3)', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
              &gt; DATA STREAM ONLINE
            </div>
          </div>

          {/* Section 0: Overview */}
          <div className={styles.section}>
            <p className={styles.sectionText}>
              Welcome to **Sand Matters Studio**, a professional-grade remote sensing and geospatial intelligence platform. This interface tracks and catalogues suspected sand mining extraction and environmental degradation across sensitive riverine and coastal zones.
            </p>
            <p className={styles.sectionText}>
              By integrating multi-spectral satellite imagery (Sentinel-2 and Landsat) with machine learning pipelines (YOLO object detection) and biophysical spectral indices (NDVI, BSI, MNDWI), Sand Matters Studio processes surface reflectance data into objective, verifiable spatial data. The platform empowers conservationists, researchers, and regulatory agencies with high-fidelity telemetry to monitor fragile morphology, document canopy loss, and support ecological conservation.
            </p>
          </div>

          {/* Section 1: Terms of Service & Data Rights */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 01: TERMS &amp; DATA RIGHTS</div>
            <h2 className={styles.sectionTitle}>1. Terms of Service &amp; Data Rights</h2>
            
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>1.1 Conservation &amp; Research Mandate:</span> The geospatial data, spatial indices, and machine learning inferences compiled on this platform are provided strictly for conservation advocacy, scientific research, and regulatory monitoring. Commercial exploitation of telemetry data or spatial assets is prohibited.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>1.2 Contributed Coordinates &amp; Public Mapping:</span> When you submit reports, coordinates, or ground-truth photo evidence to Sand Matters Studio, you retain intellectual property rights to your contributions. By submitting, you grant this project a perpetual, worldwide, royalty-free, non-exclusive license to aggregate, analyze, and display these datasets to map global extraction hotspots.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>1.3 Intellectual Property &amp; Scraping Policy:</span> The computational workflows, custom spectral layers, and trained computer vision model weights are the exclusive property of the Sand Matters Studio project. Systematic, automated scraping or extraction of platform coordinate databases without written permission violates these terms.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>1.4 Regulatory &amp; Legal Precaution:</span> Satellite observation is a probabilistic discipline. All spectral indices, machine learning predictions, and alert metrics represent mathematical estimations of ground conditions rather than definitive legal facts. Users are advised to perform independent, on-the-ground validation before initiating formal regulatory or administrative proceedings.
              </li>
            </ul>
          </div>

          {/* Section 2: Local Storage & Session Data Policy */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 02: LOCAL STORAGE &amp; COOKIES</div>
            <h2 className={styles.sectionTitle}>2. Local Storage &amp; Session Data Policy</h2>
            <p className={styles.sectionText}>
              To deliver a highly responsive and secure user interface, Sand Matters Studio stores essential telemetry states directly within your browser's local storage (localStorage) and cookies:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Active Session Preservation:</span> If you register or authenticate, secure, encrypted tokens are written to maintain your session.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Consent Persistence:</span> Your compliance and onboarding acknowledgements are stored locally to prevent redundant onboarding prompts.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Interface Preferences:</span> We cache active region filters, custom map coordinates of interest, and viewport boundaries to optimize queries and reduce server latency.
              </li>
            </ul>
          </div>

          {/* Section 3: Scientific & Technical Limitations */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 03: SCIENTIFIC INDICATORS</div>
            <h2 className={styles.sectionTitle}>3. Scientific &amp; Technical Limitations</h2>
            
            <div className={styles.consoleLog}>
              <div className={styles.consoleHeader}>ATTENTION NODE OPERATORS:</div>
              &gt; NDVI  : Measures chlorophyll density. Decreases suggest canopy clearance preceding active sand excavation.<br />
              &gt; BSI   : Highlights mineral and soil exposure. Sharp increases signal active excavation pits or stripped topsoil.<br />
              &gt; MNDWI : Delineates open water boundaries. Shifts reveal channel alterations from riverbed dredging.
            </div>
          </div>

          {/* Section 4: Platform Limitations */}
          <div className={styles.section} style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--spacing-6)' }}>
            <div className={styles.sectionHeader} style={{ color: 'var(--color-accent)' }}>SECTION 04: PLATFORM LIMITATIONS &amp; EXTRAPOLATIONS</div>
            <h2 className={styles.sectionTitle}>4. Probabilistic Thresholds &amp; Platform Limitations</h2>
            
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Spatial resolution ceiling:</span> Detection is constrained by Sentinel-2's 10-metre pixel floor. Sub-metric features — including individual vessels, portable equipment, and small-scale artisanal extraction infrastructure — fall below the threshold of spectral resolvability and cannot be reliably detected or classified.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Spectral indices are non-specific indicators:</span> NDVI decline, BSI elevation, and MNDWI shift are proxies for surface disturbance, not exclusive signatures of sand extraction. Agricultural tillage, drought-induced vegetation stress, natural channel migration, and construction activity produce spectrally equivalent responses and constitute a persistent source of false positive detection.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Monsoon-period observational gaps:</span> Dry-season compositing suppresses cloud contamination but compresses the analytical window to approximately four to five months per year in high-precipitation catchments. Extraction events initiated and concluded within a single inter-composite interval are not captured; seasonal and short-duration operations are systematically under-represented in platform outputs.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Object detection trained on a geographically constrained corpus:</span> The YOLOv8 classification model was calibrated on imagery from the Krishna and Dwarakeshwar pilot catchments. Precision and recall rates for all four object classes — barges, sorting sieves, stockpiles, and heavy machinery — are empirically uncharacterised outside these two systems. Outputs in unrepresented ecoregions should be treated as model extrapolations with unquantified uncertainty bounds.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Parametric generalisation beyond pilot geography is unvalidated:</span> Spectral thresholds and sensitivity coefficients were developed within the specific substrate, hydrological, and land cover conditions of the pilot sites. Application of these parameters to queries across the full extent of Indian river basins — spanning tropical humid, semi-arid, arid, and montane regimes — constitutes uncalibrated extrapolation without ecoregion-specific back-testing.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Absence of independent ground-truth verification:</span> No purpose-collected field validation — GPS-bounded surveys, UAV orthomosaic mapping, or systematic site photography — has been conducted against platform outputs. Accuracy characterisation derived from cross-referencing with documentation that itself incorporates satellite evidence does not constitute fully independent verification. All outputs should be understood as computational indicators warranting field corroboration, not as independently verified records of extraction activity.
              </li>
            </ul>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
