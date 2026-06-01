'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function CollaborationPage() {
  const [collabType, setCollabType] = useState('NGO');
  const [orgName, setOrgName] = useState('');
  const [repName, setRepName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [coorLink, setCoorLink] = useState('');
  const [evidenceText, setEvidenceText] = useState('');
  const [fileName, setFileName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Institutional &amp; NGO Collaboration Node</h1>
            <p className={styles.heroSubtitle}>
              Connecting grassroots networks, research bodies, and regulatory agencies to synthesize multi-layered environmental evidence and combat unauthorized instream extraction.
            </p>
          </div>

          <div className={styles.visualGrid} style={{ alignItems: 'flex-start' }}>
            
            {/* Left: Structured Form */}
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--glass-border)',
              borderRadius: '0px', // Strict Ethereal Zero Radius
              padding: 'var(--spacing-6)'
            }}>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-5)' }}>
                Cooperative Telemetry Registry
              </h2>
              
              {success ? (
                <div className={styles.consoleLog} style={{ margin: 'var(--spacing-2) 0' }}>
                  <div className={styles.consoleHeader}>DATA_PACKET_DISPATCH_COMPLETE</div>
                  &gt; STATUS              : OK (202 ACCEPTED)<br />
                  &gt; COLLABORATOR TYPE   : {collabType}<br />
                  &gt; ORGANIZATION        : {orgName || 'N/A'}<br />
                  &gt; LEAD REPRESENTATIVE : {repName}<br />
                  &gt; TARGET REGION       : {region || 'N/A'}<br />
                  &gt; ATTACHMENT RECEIVED : {fileName || 'None (Simulated Link only)'}<br />
                  &gt;&gt; SECURE COGNITIVE DATABASE LINK COMPLETED.<br />
                  &gt;&gt; TELEMETRY NODE AUDIT QUEUED. THANK YOU FOR YOUR EVIDENCE.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} style={{ maxWidth: '100%' }}>
                  
                  {/* Grid row: Type & Org */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Collaborator Category *</label>
                      <select 
                        value={collabType} 
                        onChange={(e) => setCollabType(e.target.value)}
                        className={styles.input}
                      >
                        <option value="NGO">NGO / Activist Alliance</option>
                        <option value="Government">Government / Regulatory Agency</option>
                        <option value="Research">Academic / Scientific Body</option>
                        <option value="Warden">Volunteer Warden Grid</option>
                        <option value="Media">Investigative Media / Press</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Organization Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Agency or NGO title"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* Grid row: Contact name & email */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Representative Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={repName}
                        onChange={(e) => setRepName(e.target.value)}
                        placeholder="Enter full name"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Contact Email *</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@institution.org"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* Grid row: Region & Coordinate link */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Hydrological Focus *</label>
                      <input 
                        type="text" 
                        required 
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="e.g. Krishna River Sanctuary"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Coordinates (Lat/Lng) *</label>
                      <input 
                        type="text" 
                        required 
                        value={coorLink}
                        onChange={(e) => setCoorLink(e.target.value)}
                        placeholder="e.g. 16.5742, 80.3519"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* File Upload Element */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Evidence Attachment (Photos, Videos, Vectors) *</label>
                    <div style={{
                      border: '1px dashed var(--glass-border)',
                      padding: 'var(--spacing-4)',
                      textAlign: 'center',
                      background: '#faf8f5',
                      color: '#1b2632',
                      position: 'relative',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        accept="image/*,video/*,application/json,application/geo+json"
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, width: '100%', height: '100%',
                          opacity: 0, cursor: 'pointer'
                        }}
                      />
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        {fileName ? `File locked: ${fileName}` : 'Drag & Drop or click to upload drone videos, geotagged photos, or GIS shapes'}
                      </span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Cooperative Intent &amp; Evidence Details *</label>
                    <textarea 
                      required 
                      value={evidenceText}
                      onChange={(e) => setEvidenceText(e.target.value)}
                      placeholder="Please outline localized mining methods observed, vehicle frequency, or coordinate shifts to calibrate historical satellite index charts..."
                      rows={5}
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.button} style={{ borderRadius: '0px', width: '100%' }}>
                    Submit Collaboration Dossier
                  </button>
                </form>
              )}
            </div>

            {/* Right: Operational Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              
              <div className={styles.card} style={{ borderRadius: '0px' }}>
                <div className={styles.sectionHeader}>SUPPORT SYSTEMS</div>
                <h3 className={styles.warningTitle} style={{ fontSize: '1.1rem', marginTop: '4px' }}>
                  Evidentiary Standards
                </h3>
                <p className={styles.warningText} style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: 'var(--spacing-3)' }}>
                  To compile auditable legal packets, we encourage partner organizations to submit data matching exact spatial frameworks.
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem} style={{ fontSize: '12px' }}>
                    <span className={styles.boldText}>Photo Metadata:</span> Geotagged coordinates parsed in standard EXIF headers.
                  </li>
                  <li className={styles.listItem} style={{ fontSize: '12px' }}>
                    <span className={styles.boldText}>Video Verification:</span> Time-stamped visual sweeps of dredger anchors.
                  </li>
                  <li className={styles.listItem} style={{ fontSize: '12px' }}>
                    <span className={styles.boldText}>Spatial GIS Layers:</span> GeoJSON formats matching the WGS 84 coordinate system.
                  </li>
                  <li className={styles.listItem} style={{ fontSize: '12px' }}>
                    <span className={styles.boldText}>Identity &amp; Affiliation Safeguards:</span> Personal identities and institutional affiliation records are kept strictly confidential, isolated in secure sandboxed schemas, and permanently redacted from public telemetry layers.
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
