'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function GDPRPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.heroTagline}>OPERATIONAL DISCLOSURE: DATA PRIVACY</div>
            <h1 className={styles.heroTitle}>GDPR Privacy Policy &amp; Data Protection</h1>
            <p className={styles.heroSubtitle}>
              Detailed protocol explaining how local browser state is managed, telemetry is protected, and coordinate submissions are secured.
            </p>
          </div>

          {/* Section 1: Scope & Accountability */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 01 // DATA ACCOUNTABILITY</div>
            <h2 className={styles.sectionTitle}>1. Scope &amp; Legal Framework</h2>
            <p className={styles.sectionText}>
              Sand Matters Studio is committed to full compliance with the European Union General Data Protection Regulation (Regulation (EU) 2016/679) (&quot;GDPR&quot;) and global privacy standards. Operating as a decentralized environmental research node, we act as the Data Controller for information processed via our open platform. This privacy policy transparently details how we handle the minimal personal data required to operate our geospatial telemetry tools, manage civic comments, coordinate ground-truth alerts, and persist your customized dashboard configurations.
            </p>
          </div>

          {/* Section 2: Data Minimization & Cookie-less Telemetry */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 02 // COOKIE-LESS STATE MANAGEMENT</div>
            <h2 className={styles.sectionTitle}>2. Cookie-less Architecture &amp; Local Storage</h2>
            <p className={styles.sectionText}>
              In alignment with principles of data minimization and privacy-by-design, Sand Matters Studio utilizes a strictly cookie-less telemetry architecture. We do not deploy third-party trackers, retargeting pixels, or behavioral advertising scripts. Your interactions remain entirely local and secure. 
            </p>
            <p className={styles.sectionText}>
              To maintain system state across your monitoring sessions, we utilize standard browser local storage (<span className={styles.boldText}>localStorage</span>) and session storage. The following localized parameters are stored on your device:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Consent and Onboarding Tokens:</span> We store a binary compliance marker to ensure onboarding and computational disclaimer modals do not repeatedly obscure your viewport during successive visits.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Telemetry Filtering Preferences:</span> Your active geospatial filtering configurations (such as specific river basin selections, spectral band toggles, and temporal epochs) are cached locally to minimize redundant Google Earth Engine API calls and optimize device bandwidth.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Map Coordinates and Viewports:</span> The latitude, longitude, and zoom levels of your active map focus area are saved to your local session state to preserve your visual target sector upon page reload.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>JWT Session Tokens:</span> Secure, locally stored JSON Web Tokens (JWT) are maintained when you authenticate to the platform to enable secure telemetry data streams.
              </li>
            </ul>
            <div className={styles.consoleLog}>
              <div className={styles.consoleHeader}>LOCAL_STORAGE_STATE_MANIFEST</div>
              &gt; sms_onboarding_verified  : Boolean (Token Bypass)<br />
              &gt; sms_map_viewport_lat     : Float64 (Coordinate Persist)<br />
              &gt; sms_map_viewport_lng     : Float64 (Coordinate Persist)<br />
              &gt; sms_map_viewport_zoom    : Float32 (Zoom Scale)<br />
              &gt; sms_active_spectral_band : String (e.g., &quot;BSI&quot; / &quot;NDVI&quot;)<br />
              &gt; sms_session_token         : JWT Hashed String (Auth Keep-Alive)
            </div>
          </div>

          {/* Section 3: Coordinate Submissions & Anonymized Crowdsourcing */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 03 // CROWDSOURCE PROTECTION</div>
            <h2 className={styles.sectionTitle}>3. Processing of Coordinate Submissions &amp; PII Redaction</h2>
            <p className={styles.sectionText}>
              Civic observers submitting ground-truth evidence are crucial to exposing unauthorized mining. We take meticulous technical steps to protect the identities of contributors:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>EXIF Metadata Strip-Mining:</span> Our upload portal automatically parses all submitted photography, extracting the spatial geolocations and timestamps to map the event, while completely stripping all personally identifiable metadata (PII) including camera make/model, lenses, unique device identifiers, and original filenames.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Randomized Node Identities:</span> To protect citizen advocates from retaliatory action, user profiles are displayed on the public activity ledger as randomized secure node IDs (e.g., `NODE_OPR_#3942` or `GROUND_VAL_#082`).
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Encrypted Comment Logs:</span> Public forum observations, coordination logs, and alerts are stored in our secure database using End-to-End TLS 1.3 transmission protocols. Write access is governed by strict Row-Level Security (RLS) policies within our Supabase database cluster, ensuring comments cannot be spoofed or unauthorizedly edited.
              </li>
            </ul>
          </div>

          {/* Section 4: User Rights (Access, Portability, and Right to Erasure) */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>SECTION 04 // USER CONTROLS</div>
            <h2 className={styles.sectionTitle}>4. User Rights: Access, Export, and Permanent Deletion</h2>
            <p className={styles.sectionText}>
              Under the GDPR, platform users possess comprehensive rights regarding their personal data, which can be exercised at any point without administrative fees:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Right of Access &amp; Portability:</span> You have the right to request a complete machine-readable export of all data associated with your node identity, including your profile metadata, log history, and submitted coordinates.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Right to Rectification:</span> You can correct, modify, or update your registered proximity radar radii, sector monitoring configurations, and profile indicators directly through the user calibration interface.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Right to Erasure (Right to be Forgotten):</span> You have the right to request the permanent deletion of your account and all associated submissions. Upon receiving an erasure request, we will instantly delete your authentication record and execute a database purge, leaving only anonymized, aggregate spatial coordinate entries stripped of all node history.
              </li>
            </ul>
            <p className={styles.sectionText}>
              To execute any of these rights, establish an encrypted request link to our privacy desk at **privacy@sandmatters.org** with your active Node ID.
            </p>
          </div>

          {/* Section 5: Technical Security Protocols */}
          <div className={styles.section} style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--spacing-6)' }}>
            <div className={styles.sectionHeader} style={{ color: 'var(--color-accent)' }}>SECTION 05 // SYSTEM ENCRYPTION ARCHITECTURE</div>
            <h2 className={styles.sectionTitle}>5. Technical Security &amp; Breach Protocol</h2>
            <p className={styles.sectionText}>
              We deploy advanced security measures to protect database records and sensor feeds:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Transport Encryption:</span> All traffic between user browsers, the Google Earth Engine processing backend, and our database nodes is forced over HTTPS using Transport Layer Security (TLS 1.3) protocols.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Database Separation:</span> Spatial coordinate databases and user authentication files are isolated into distinct, sandboxed schemas with strict role-level policies, ensuring raw email addresses or IP records are never mapped directly to coordinate indicators on the map interface.
              </li>
              <li className={styles.listItem}>
                <span className={styles.boldText}>Breach Notification:</span> In the highly unlikely event of a database compromise or systematic access breach, we will notify all affected node operators and relevant regulatory authorities within 72 hours, in full compliance with GDPR Article 33 guidelines.
              </li>
            </ul>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
