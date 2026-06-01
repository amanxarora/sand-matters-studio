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
              <div className={styles.sectionHeader}>SECURE COMMUNICATION CHANNELS</div>
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
                    TRANSMIT PACKET
                  </button>
                </form>
              )}
            </div>

            {/* Institutional Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              
              <div className={styles.card}>
                <div className={styles.cardIcon} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>HQ</div>
                <h3 className={styles.cardTitle}>Research Command</h3>
                <p className={styles.cardText} style={{ fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: '1.6' }}>
                  <strong><a href="https://iaac.net" target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-primary)', textDecoration: 'underline' }}>Institute for Advanced Architecture of Catalonia</a></strong><br />
                  Pujades 102, 08005<br />
                  Barcelona, Spain<br />
                  <span style={{ color: 'var(--color-accent)' }}>Lat: 41.3976, Lng: 2.1932</span>
                </p>
              </div>

              <div className={styles.card} style={{ padding: '0px !important', overflow: 'hidden' }}>
                <iframe
                  title="IAAC Pujades 102 Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.447556094038!2d2.1921909765955613!3d41.39669077926315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3176486d56b%3A0x43da322368b6ed68!2sInstitute%20for%20Advanced%20Architecture%20of%20Catalonia!5e0!3m2!1sen!2ses!4v1717285623042!5m2!1sen!2ses"
                  width="100%"
                  height="240"
                  style={{ border: 0, verticalAlign: 'middle' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div style={{ padding: '20px var(--spacing-6)' }}>
                  <h3 className={styles.cardTitle} style={{ fontSize: '1rem', marginBottom: '4px' }}>IAAC Research Map Node</h3>
                  <p className={styles.cardText} style={{ fontSize: '12px', margin: 0 }}>
                    Interactive satellite/topographical lock for Pujades 102, 08005 Barcelona, Spain.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
