'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setEmail('');
      setOrg('');
      setMsg('');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.heroTagline}>[ OPERATIONAL INTERFACE: SECURE INQUIRY ]</div>
            <h1 className={styles.heroTitle}>Establish Secure Communications</h1>
            <p className={styles.heroSubtitle}>
              Connect with our research coordinators, submit ground-truth field records, or coordinate environmental advocacy partnerships.
            </p>
          </div>

          <div className={styles.visualGrid} style={{ alignItems: 'flex-start' }}>
            {/* Contact Form */}
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--spacing-6)'
            }}>
              <div className={styles.sectionHeader}>// SECURE COMMUNICATION CHANNELS //</div>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-5)' }}>Transmit Data Packet</h2>
              
              {success ? (
                <div style={{
                  padding: 'var(--spacing-4)',
                  backgroundColor: 'var(--color-accent-soft)',
                  borderLeft: '3px solid var(--color-success)',
                  borderRadius: 'var(--border-radius-sm)',
                  color: 'var(--color-success)',
                  fontSize: 'var(--font-size-sm)',
                  fontFamily: 'monospace',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  &gt; PACKET SUCCESSFULLY DISPATCHED<br />
                  &gt; SECURE DECRYPTION QUEUED AT TERMINAL<br />
                  &gt; STATUS: OK (200)
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} style={{ maxWidth: '100%' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Operator Identifier (Full Name) *</label>
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter identity label"
                      className={styles.input}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Return Telemetry Channel (Email) *</label>
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@network.org"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Sector / Affiliation (Organization)</label>
                    <input 
                      type="text" 
                      value={org} 
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="Agency or NGO name"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Data Description &amp; Ground Records *</label>
                    <textarea 
                      required 
                      value={msg} 
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Detail coordinate anomalies, research proposals, or ground-truth photo uploads..."
                      rows={5}
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.button}>
                    [ TRANSMIT PACKET ]
                  </button>
                </form>
              )}
            </div>

            {/* Institutional Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              
              <div className={styles.card}>
                <div className={styles.cardIcon}>📍</div>
                <h3 className={styles.cardTitle}>Research Command</h3>
                <p className={styles.cardText} style={{ fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: '1.6' }}>
                  <strong>Institute for Advanced Architecture of Catalonia</strong><br />
                  Pujades 102, 08005<br />
                  Barcelona, Spain<br />
                  <span style={{ color: 'var(--color-accent)' }}>Lat: 41.3976, Lng: 2.1932</span>
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardIcon}>🔗</div>
                <h3 className={styles.cardTitle}>Institutional Redirections</h3>
                <p className={styles.cardText} style={{ marginBottom: 'var(--spacing-4)' }}>
                  Access official academic portals and explore parallel ecological structures.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="https://iaac.net" target="_blank" rel="noreferrer" className={`${styles.button} ${styles.buttonSecondary}`} style={{ textAlign: 'center', fontSize: '0.78rem' }}>
                    [ VISIT IAAC ACADEMIC SITE ]
                  </a>
                  <a href="#" className={`${styles.button} ${styles.buttonSecondary}`} style={{ textAlign: 'center', fontSize: '0.78rem' }}>
                    [ LOAD LOCAL IAAC TELEMETRY MAP ]
                  </a>
                </div>
              </div>

              <div className={styles.consoleLog} style={{ margin: 0 }}>
                <div className={styles.consoleHeader}>OPERATIONAL_INSTRUCTIONS_LOCK</div>
                &gt; Pinned ground photo uploads require lat/lng coordinate tags.<br />
                &gt; Form submissions are audited for anti-spam safety.<br />
                &gt; Urgent illegal extraction records should be sent directly to compliance warden nodes.
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
