'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import styles from '../informational.module.css';

export default function ProfilePage() {
  const { user, loading, loginManually } = useAuth();
  
  // Local Calibration States
  const [proximityRadius, setProximityRadius] = useState('10');
  const [targetState, setTargetState] = useState('West Bengal');
  const [targetDistrict, setTargetDistrict] = useState('Bankura');
  const [alertFrequency, setAlertFrequency] = useState('Immediate');
  const [calibrated, setCalibrated] = useState(false);

  // Form Mock Inputs for unauthenticated prompt
  const [mockUser, setMockUser] = useState('');
  const [mockEmail, setMockEmail] = useState('');

  const handleCalibrate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalibrated(true);
    setTimeout(() => {
      setCalibrated(false);
    }, 3000);
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginManually(mockUser || 'Observer Delta', mockEmail || 'delta@sandmatters.org');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
              <div className={styles.consoleLog}>&gt; LOADING SECURE NODE CREDENTIALS...</div>
            </div>
          ) : !user ? (
            /* Unauthenticated View Prompt */
            <div style={{ maxWidth: '600px', margin: '60px auto', background: 'var(--color-surface)', border: '1px solid var(--glass-border)', padding: 'var(--spacing-6)' }}>
              <div className={styles.sectionHeader}>SECURE PROTOCOL ERROR</div>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.25rem' }}>Operator Authentication Required</h2>
              <p className={styles.sectionText} style={{ fontSize: '13px', lineHeight: '1.6' }}>
                Access to the telemetry calibration dashboard is restricted to registered civic wardens, satellite operators, and institutional nodes. Please sign in via the Navbar or configure a mock operator node below to calibrate parameters.
              </p>
              
              <form onSubmit={handleQuickLogin} className={styles.form} style={{ marginTop: 'var(--spacing-4)', gap: 'var(--spacing-3)' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quick Username</label>
                  <input 
                    type="text" 
                    value={mockUser}
                    onChange={(e) => setMockUser(e.target.value)}
                    placeholder="e.g. Field Officer Delta"
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quick Email</label>
                  <input 
                    type="email" 
                    value={mockEmail}
                    onChange={(e) => setMockEmail(e.target.value)}
                    placeholder="operator@network.org"
                    className={styles.input}
                    required
                  />
                </div>
                <button type="submit" className={styles.button} style={{ width: '100%', borderRadius: '0px' }}>
                  Create Quick Session
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated View Dashboard */
            <>
              {/* Hero Section */}
              <div className={styles.hero}>
                <div className={styles.heroTagline}>OPERATIONAL WORKSPACE: NODE_#{user.id?.slice(0, 8) || 'MOCK_ID'}</div>
                <h1 className={styles.heroTitle}>Node Calibration &amp; Proximity Alerts</h1>
                <p className={styles.heroSubtitle}>
                  Manage your active spatial focus areas, configure real-time orbit notification radius boundaries, and monitor submitted ground verification records.
                </p>
              </div>

              <div className={styles.visualGrid} style={{ alignItems: 'flex-start' }}>
                
                {/* Left: Calibration Controls */}
                <div style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0px',
                  padding: 'var(--spacing-6)'
                }}>
                  <div className={styles.sectionHeader}>TELEMETRY RADAR BOUNDARY LOCKS</div>
                  <h2 className={styles.sectionTitle} style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-4)' }}>
                    Radar Calibration Parameters
                  </h2>

                  {calibrated && (
                    <div className={styles.consoleLog} style={{ margin: '0 0 var(--spacing-4) 0' }}>
                      <div className={styles.consoleHeader}>CALIBRATION_SYNCHRONIZED</div>
                      &gt; LOCK PROXIMITY : {proximityRadius} Kilometers<br />
                      &gt; FOCUS AREA     : State: {targetState} // District: {targetDistrict}<br />
                      &gt; STATUS         : SYSTEM BOUNDARIES UPDATE CONFIGURED (OK)
                    </div>
                  )}

                  <form onSubmit={handleCalibrate} className={styles.form} style={{ maxWidth: '100%', gap: 'var(--spacing-4)' }}>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Radar Alert Focus Radius *</label>
                      <select 
                        value={proximityRadius} 
                        onChange={(e) => setProximityRadius(e.target.value)}
                        className={styles.input}
                        style={{ background: 'rgba(27, 30, 34, 0.9)' }}
                      >
                        <option value="5">5 Kilometers (Strict Local Riparian corridor)</option>
                        <option value="10">10 Kilometers (Extended hydrological basin)</option>
                        <option value="20">20 Kilometers (Sub-divisional catchment area)</option>
                        <option value="50">50 Kilometers (District-wide operational lock)</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Target Sector State *</label>
                        <input 
                          type="text" 
                          required 
                          value={targetState}
                          onChange={(e) => setTargetState(e.target.value)}
                          placeholder="e.g. West Bengal"
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Focus District *</label>
                        <input 
                          type="text" 
                          required 
                          value={targetDistrict}
                          onChange={(e) => setTargetDistrict(e.target.value)}
                          placeholder="e.g. Bankura"
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Spectral Anomaly Alert Frequency *</label>
                      <select 
                        value={alertFrequency} 
                        onChange={(e) => setAlertFrequency(e.target.value)}
                        className={styles.input}
                        style={{ background: 'rgba(27, 30, 34, 0.9)' }}
                      >
                        <option value="Immediate">Immediate (On Copernicus Sentinel-2 pass completions)</option>
                        <option value="Daily">Daily Synthesis Logs (Consolidated matrix deltas)</option>
                        <option value="Weekly">Weekly Geospatial Dossiers (Auditable PDF logs)</option>
                      </select>
                    </div>

                    <button type="submit" className={styles.button} style={{ borderRadius: '0px' }}>
                      Calibrate Radar Grid
                    </button>
                  </form>
                </div>

                {/* Right: Active Credentials & Logs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                  
                  {/* Operator Credentials Card */}
                  <div className={styles.card} style={{ borderRadius: '0px' }}>
                    <div className={styles.sectionHeader}>NODE CREDENTIALS OVERVIEW</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <div><span style={{ color: 'var(--color-accent)' }}>OPERATOR NAME:</span> {user.user_metadata?.full_name}</div>
                      <div><span style={{ color: 'var(--color-accent)' }}>RETURN CHANNEL:</span> {user.email}</div>
                      <div><span style={{ color: 'var(--color-accent)' }}>ROUTING NODE:</span> {user.id}</div>
                      <div><span style={{ color: 'var(--color-accent)' }}>AUTH SCHEME:</span> {user.id === 'mock-uuid-123456789' ? 'Browser Mock Credentials' : 'Google OAuth'}</div>
                    </div>
                  </div>

                  {/* Operational Logs Console */}
                  <div className={styles.consoleLog} style={{ margin: 0 }}>
                    <div className={styles.consoleHeader}>OPERATIVE_COORDINATE_LOGS_SYNC</div>
                    &gt; [OPR_#1024]: Submitted coordinate lock: Dwarakeshwar River (May 28)<br />
                    &gt; [OPR_#1024]: Automated BSI reflectance index audit processed successfully.<br />
                    &gt; [OPR_#1024]: Grid calibration status: SECURED // SYNCED
                  </div>

                </div>

              </div>
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
