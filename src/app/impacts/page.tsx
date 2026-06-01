'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function ImpactsPage() {
  const [activeTab, setActiveTab] = useState<'ecological' | 'social'>('ecological');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.heroTagline}>OPERATIONAL LEDGER: ECOLOGICAL DAMAGE</div>
            <h1 className={styles.heroTitle}>Environmental &amp; Social Realities</h1>
            <p className={styles.heroSubtitle}>
              Cataloguing the destructive footprints of unregulated sand extraction on India's river ecosystems, coastal aquifers, and local communities.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.tabContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'ecological' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('ecological')}
            >
              ECOLOGICAL DEGRADATION
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'social' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('social')}
            >
              SOCIAL &amp; AGRICULTURAL DESTABILIZATION
            </button>
          </div>

          {activeTab === 'ecological' && (
            <div className="tab-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>ECOSYSTEM COLLAPSE</div>
                <h2 className={styles.sectionTitle}>Severe Riverine &amp; Coastal Alterations</h2>
                <p className={styles.sectionText}>
                  River sand is a crucial natural filter and a stabilizing force for hydrologic basins. Uncontrolled extraction strips the riverbed, triggering deep changes in biological and geomorphological structures.
                </p>
              </div>

              {/* Grid of Ecological Impacts */}
              <div className={styles.grid}>
                <div className={styles.card}>
                  <div className={styles.cardIcon} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>SOIL</div>
                  <h3 className={styles.cardTitle}>Severe Bank Erosion</h3>
                  <p className={styles.cardText}>
                    Removing riverbed sand accelerates flow velocities. Fast-moving currents strip away protective soils and vegetation, causing bank collapses and destroying surrounding habitats.
                  </p>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardIcon} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>FLOW</div>
                  <h3 className={styles.cardTitle}>Channel Destabilization</h3>
                  <p className={styles.cardText}>
                    Dredging creates deep, localized holes, forcing the river to shift its natural course (incising). This channel carving bypasses historic water paths, stranding wetlands and drying out natural secondary streams.
                  </p>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardIcon} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>LIFE</div>
                  <h3 className={styles.cardTitle}>Biodiversity Depletion</h3>
                  <p className={styles.cardText}>
                    Excavation clouds water with thick silt (turbidity), blocking sunlight and choking out underwater vegetation. This process blankets fish spawning grounds and destroys nesting areas for vulnerable river species.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="tab-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>COMMUNITIES AT RISK</div>
                <h2 className={styles.sectionTitle}>Loss of Livelihoods and Structural Hazards</h2>
                <p className={styles.sectionText}>
                  The costs of sand mining go far beyond the riverbanks. Local farmers, coastal villages, and municipal structures bear the immediate physical and financial burdens of this unregulated industry.
                </p>
              </div>

              {/* Grid of Social Impacts */}
              <div className={styles.grid}>
                <div className={styles.card}>
                  <div className={styles.cardIcon} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>CROP</div>
                  <h3 className={styles.cardTitle}>Agricultural Collapse</h3>
                  <p className={styles.cardText}>
                    As the riverbed drops, nearby groundwater tables drop with it (drawdown). Wells run dry, and farmland soil loses its moisture, causing crop failures and threatening local food security.
                  </p>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardIcon} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>WELL</div>
                  <h3 className={styles.cardTitle}>Aquifer Salinization</h3>
                  <p className={styles.cardText}>
                    Stretching natural sand barriers near coasts allows dense sea water to seep inland into freshwater aquifers. This salinization ruins local drinking wells, creating severe water crises for coastal communities.
                  </p>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardIcon} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>GRID</div>
                  <h3 className={styles.cardTitle}>Infrastructure Damage</h3>
                  <p className={styles.cardText}>
                    Channel incision and soil loss undermine bridge foundations, flood protection levies, and pipeline supports, creating major structural hazards for public transit and utilities.
                  </p>
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
