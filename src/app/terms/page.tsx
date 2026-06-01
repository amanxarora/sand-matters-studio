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
            <div className={styles.heroTagline}>OPERATIONAL DISCLOSURE: LEGAL FRAMEWORK</div>
            <h1 className={styles.heroTitle}>Terms of Service &amp; Computational Disclaimers</h1>
            <p className={styles.heroSubtitle}>
              Establishing the operational parameters, geospatial metadata standards, and probabilistic limits of open-source environmental monitoring.
            </p>
          </div>

          {/* Section 1: Introduction */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 01 // OVERVIEW</div>
            <h2 className={styles.sectionTitle}>1. Platform Mission &amp; Scope of Use</h2>
            <p className={styles.sectionText}>
              Sand Matters Studio operates as a decentralized, open-source environmental telemetry node and collaborative research platform. By accessing the systems, dashboards, and spatial data layers hosted herein, you establish a connection to an active environmental monitoring network. This service is dedicated strictly to conservation research, civic environmental advocacy, journalistic investigation, and regulatory audit facilitation. Any exploitation of the platform's processed telemetry for commercial mineral sourcing, aggregate speculative trading, or extractive logistics optimization is strictly prohibited and constitutes a breach of these terms.
            </p>
          </div>

          {/* Section 2: Computational Disclaimers & Probabilistic Data Limitations */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 02 // SPECTRAL &amp; ALGORITHMIC DISCLOSURES</div>
            <h2 className={styles.sectionTitle}>2. Computational Disclaimers &amp; Probabilistic Data Limitations</h2>
            <p className={styles.sectionText}>
              All spectral visualizations, statistical charts, and automated detections provided by Sand Matters Studio are generated via computational analysis of publicly available satellite imagery and machine learning models. You explicitly acknowledge and agree to the following scientific and mathematical limitations:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Probabilistic Indicators:</span> All algorithm outputs represent statistical approximations, spatial probabilities, and reflectance anomalies. They do not constitute definitive legal proof of illegal mining activity.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Spectral Index Approximations:</span> Indices such as the Bare Soil Index (BSI), Normalized Difference Vegetation Index (NDVI), and Modified Normalized Difference Water Index (MNDWI) are calculated from raw satellite bands (Sentinel-2 L2A and Landsat 8-9 OLI). These indices are subject to atmospheric interference, cloud cover masking, seasonal hydrological fluctuations, and agricultural crop cycles which can trigger false positives.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>YOLOv8 Neural Network Limitations:</span> Our object detection engine is trained on specific visual anchors representing excavators, dredging barges, and sand stockpiles. A classification match (e.g., &quot;88% Excavator Match&quot;) is a statistical visual confidence score and does not guarantee the active presence, legal status, or unauthorized nature of the machinery.
              </li>
            </ul>
            <div className={styles.consoleLog}>
              <div className={styles.consoleHeader}>TELEMETRY_VALIDATION_THRESHOLD_LOCK</div>
              &gt; SENSOR SOURCE : Sentinel-2 MSI // Landsat 8-9 OLI<br />
              &gt; RESOLUTION    : 10-meter (Sentinel-2 Bands B2, B3, B4, B8) // 20-meter (B11 SWIR)<br />
              &gt; YOLOv8 LIMITS : Intersection-over-Union (IoU) Threshold = 0.45 // NMS Validation = 0.50<br />
              &gt; ORBITAL CYCLE : 5-Day (Sentinel-2 Constellation) // 8-to-16-Day (Landsat OLI)<br />
              &gt; INFERENCE CODE : STATISTICAL APPROXIMATION ONLY // DO NOT LEVERAGE WITHOUT FIELD VALIDATION
            </div>
          </div>

          {/* Section 3: Geospatial & Spatial Metadata Standards */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 03 // GEOSPATIAL PARAMETERS</div>
            <h2 className={styles.sectionTitle}>3. Spatial Metadata &amp; Geolocation Standards</h2>
            <p className={styles.sectionText}>
              To maintain the integrity of our collaborative database, all coordinates submitted to or derived from the Sand Matters Studio interface must comply with standardized spatial guidelines:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Coordinate Reference System (CRS):</span> All spatial coordinates must be referenced to the World Geodetic System 1984 (<span className={styles.boldText}>WGS 84 / EPSG:4326</span>) ellipsoid. Decimal degrees are calculated to six decimal places, restricting spatial tolerance to approximately &plusmn;0.11 meters at the equator.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Positional Uncertainty Margins:</span> Observers submitting ground-truth logs acknowledge that handheld consumer GNSS/GPS receivers possess horizontal accuracy limitations ranging from &plusmn;3 to &plusmn;15 meters depending on vegetative canopy blocking and atmospheric disturbance. Submissions must disclose the estimated positional error where possible.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Imagery Offsets:</span> Satellite raster grids mapped via MapLibre GL overlays may experience subtle orthorectification offsets (up to 12 meters) relative to real-world ground features. All measurements of riverbank erosion lines, stockpiles, and access channels are spatial estimations.
              </li>
            </ul>
          </div>

          {/* Section 4: Data Ownership, Open-Source Licensing, & Evidentiary Use */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 04 // DATA RIGHTS &amp; USE</div>
            <h2 className={styles.sectionTitle}>4. Data Ownership, Open-Source Licensing, &amp; Evidentiary Use</h2>
            <p className={styles.sectionText}>
              Sand Matters Studio advocates for transparent environmental governance. The platform is structured around reciprocal, open-source principles:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Civic Submissions:</span> When you upload specific coordinate markers, comment descriptions, or geotagged photographs, you retain your original copyright. However, by uploading, you grant Sand Matters Studio an irrevocable, perpetual, worldwide, non-exclusive, royalty-free, sub-licensable license to publish, map, translate, and synthesize these inputs into public environmental databases.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Platform Materials:</span> The custom YOLOv8 model weights, consolidated geospatial databases, and processed spectral layers are licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license. Commercial usage of this synthesized data is strictly prohibited without written consent.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Legal &amp; Evidentiary Packets:</span> Synthesized spatial packages compiled using our historical GEE reflectance tools are intended to serve as preliminary research dossiers. While they provide auditable timelines, they must be combined with physical ground-truth validation, certified legal affidavits, and formal environmental impact assessments before being presented in a court of law.
              </li>
            </ul>
          </div>

          {/* Section 5: Indemnification & Safe Harbor for Civic Defenders */}
          <div className={styles.section} style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--spacing-6)' }}>
            <div className={styles.sectionHeader} style={{ color: 'var(--color-accent)' }}>SECTION 05 // LIABILITY LIMITATION &amp; SAFE HARBOR</div>
            <h2 className={styles.sectionTitle}>5. Indemnification &amp; Safe Harbor for Civic Defenders</h2>
            <p className={styles.sectionText}>
              In no event shall Sand Matters Studio, its developers, academic partners (including the Institute for Advanced Architecture of Catalonia - IAAC), or allied non-governmental organizations (NGOs) be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, loss of use, data, or profits; regulatory fines; or civil litigation costs) however caused and on any theory of liability, whether in contract, strict liability, or tort arising in any way out of the use of this telemetry.
            </p>
            <p className={styles.sectionText}>
              The coordinates logged by platform users represent information collected in the interest of public environmental preservation. Contributors are protected under prevailing civic participation and whistleblower provisions in their respective jurisdictions. However, contributors are solely responsible for ensuring that physical ground validation checks do not breach local trespass laws or compromise personal physical safety.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
