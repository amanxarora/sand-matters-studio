'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.heroTagline}>OPERATIONAL CLASSIFICATION: PROJECT CONTEXT</div>
            <h1 className={styles.heroTitle}>Exposing Environmental Alterations From Afar</h1>
            <p className={styles.heroSubtitle}>
              Exposing the patterns of unauthorized sand extraction in fragile riverbeds through Google Earth Engine telemetry, machine learning models, and public advocacy.
            </p>
          </div>

          {/* Mission Description */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>THE MISSION</div>
            <h2 className={styles.sectionTitle}>Democratizing Environmental Oversight</h2>
            <p className={styles.sectionText}>
              Illegal river sand mining in India is widespread and heavily organized. Weak governance, inadequate physical surveillance, and powerful vested interests allow deep, destructive dredging to operate without public accountability. Traditional monitoring systems often fail to deliver sustained, actionable results due to lack of accessibility or systematic data transparency.
            </p>
            <p className={styles.sectionText}>
              <strong>From Afar</strong> is engineered to break this cycle. By providing objective, continuous, and verifiable spatial telemetry, we empower local communities, investigative journalists, policy advocates, and enforcement warden teams. We bridge the gap between space observation and community action—arming defenders with empirical indicators of landscape degradation.
            </p>
          </div>

          {/* Visual Grid: Core Pillars */}
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🛰️</div>
              <h3 className={styles.cardTitle}>Continuous Observation</h3>
              <p className={styles.cardText}>
                We harness multi-spectral imagery from the Copernicus Sentinel-2 constellation to monitor sensitive river basins and exposed waterways every 5 days.
              </p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>🧠</div>
              <h3 className={styles.cardTitle}>ML-Driven Detections</h3>
              <p className={styles.cardText}>
                Our specialized YOLOv8 object detection model scans satellite raster tiles to locate dredger barges, sorting sieves, stockpiles, and heavy machinery.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📊</div>
              <h3 className={styles.cardTitle}>Biophysical Verification</h3>
              <p className={styles.cardText}>
                We extract multi-spectral indices (NDVI, BSI, MNDWI) to measure biological canopy loss, soil stripping, and dredging-induced river morphology alterations.
              </p>
            </div>
          </div>

          {/* IAAC Collaboration Section */}
          <div className={styles.section} style={{
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-md)',
            backgroundColor: 'rgba(27, 30, 34, 0.4)',
            padding: 'var(--spacing-6)',
            marginTop: 'var(--spacing-8)'
          }}>
            <div className={styles.sectionHeader} style={{ color: 'var(--color-accent)' }}>
              ACADEMIC & INSTITUTIONAL PARTNERSHIP
            </div>
            <h2 className={styles.sectionTitle} style={{ fontSize: '1.5rem', marginTop: '4px' }}>
              Institute for Advanced Architecture of Catalonia (IAAC)
            </h2>
            <div className={styles.visualGrid}>
              <div>
                <p className={styles.sectionText} style={{ fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                  This platform represents a collaborative initiative developed in alignment with researchers and environmental advocates at the **Institute for Advanced Architecture of Catalonia (IAAC)**. The project bridges the interface between computational architecture, geospatial data modeling, and ecological remediation.
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <span className={styles.boldText}>Research Alignment:</span> Designing software and hardware telemetry tools that empower grassroots environmental networks.
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.boldText}>Remediation Mapping:</span> Visualizing ecological restoration areas alongside mining extraction sites.
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.boldText}>Open Source Commitment:</span> Sharing computational methodologies for global public observation.
                  </li>
                </ul>
              </div>
              <div className={styles.consoleLog} style={{ margin: 0 }}>
                <div className={styles.consoleHeader}>IAAC_COLLABORATION_METADATA_LOCK</div>
                &gt; PARTNER NODE: IAAC // BARCELONA, ES<br />
                &gt; DEPARTMENT  : ADVANCED ECOLOGICAL BUILDINGS &amp; BIOCITIES<br />
                &gt; GEOGRAPHIC LOCK: Krishna &amp; Dwarakeshwar Pilot Studies<br />
                &gt; PIPELINE INJECT: GEE Earth Engine Node Calibration<br />
                &gt; RESEARCH STATUS: ACTIVE OPERATIONAL LINK
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
