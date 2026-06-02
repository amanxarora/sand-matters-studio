'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import styles from '../informational.module.css';

export default function ProfilePage() {
  const { user, loading, loginManually } = useAuth();

  // Onboarding Registration Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('Enthusiast');
  const [intent, setIntent] = useState('Education');
  const [fromIndia, setFromIndia] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [referral, setReferral] = useState('Search Engine');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  // Status Feedback
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form Mock Inputs for unauthenticated prompt
  const [mockUser, setMockUser] = useState('');
  const [mockEmail, setMockEmail] = useState('');

  // Hydrate states from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`sms_profile_data_${user.id}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFirstName(parsed.firstName || '');
          setLastName(parsed.lastName || '');
          setEmail(parsed.email || user.email || '');
          setUserRole(parsed.role || 'Enthusiast');
          setIntent(parsed.intent || 'Education');
          setFromIndia(parsed.fromIndia || false);
          setCity(parsed.city || '');
          setState(parsed.state || '');
          setReferral(parsed.referral || 'Search Engine');
          setAgreedTerms(parsed.agreedTerms !== undefined ? parsed.agreedTerms : true);
          setReceiveUpdates(parsed.receiveUpdates || false);
        } catch (e) {
          console.error('Error parsing onboarding profile data:', e);
        }
      } else {
        // Fallback: parse name from full_name metadata
        const fullName = user.user_metadata?.full_name || '';
        const parts = fullName.trim().split(/\s+/);
        setFirstName(parts[0] || '');
        setLastName(parts.slice(1).join(' ') || '');
        setEmail(user.email || '');
        setUserRole('Enthusiast');
        setIntent('Education');
        setFromIndia(false);
        setCity('');
        setState('');
        setReferral('Search Engine');
        setAgreedTerms(true);
        setReceiveUpdates(false);
      }
    }
  }, [user]);

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginManually(mockUser || 'Observer Delta', mockEmail || 'delta@sandmatters.org');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const profileData = {
      firstName,
      lastName,
      email,
      role: userRole,
      intent,
      fromIndia,
      city,
      state,
      referral,
      agreedTerms,
      receiveUpdates,
    };

    // Save to user-specific local storage
    localStorage.setItem(`sms_profile_data_${user.id}`, JSON.stringify(profileData));

    // Synchronize mock observer user if running standard browser mock
    if (user.id === 'mock-uuid-123456789') {
      const updatedMock = {
        ...user,
        email: email || user.email,
        user_metadata: {
          ...user.user_metadata,
          full_name: `${firstName} ${lastName}`.trim() || user.user_metadata?.full_name,
        },
      };
      localStorage.setItem('sms_mock_user', JSON.stringify(updatedMock));
      
      // Force quick refresh after success notification to sync global Navbar states
      setTimeout(() => {
        window.location.reload();
      }, 900);
    }

    setSaveStatus('SUCCESS');
    setTimeout(() => {
      setSaveStatus(null);
    }, 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
              <div className={styles.consoleLog}>&gt; LOADING SECURE NODE PROFILE...</div>
            </div>
          ) : !user ? (
            /* Unauthenticated View Prompt */
            <div style={{ maxWidth: '600px', margin: '60px auto', background: 'var(--color-surface)', border: '1px solid var(--glass-border)', padding: 'var(--spacing-6)' }}>
              <div className={styles.sectionHeader}>SECURE PROTOCOL ERROR</div>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.25rem' }}>Operator Authentication Required</h2>
              <p className={styles.sectionText} style={{ fontSize: '13px', lineHeight: '1.6' }}>
                Access to the telemetry profile dashboard is restricted to registered civic wardens, satellite operators, and institutional nodes. Please sign in via the Navbar or configure a mock operator node below to enter the session.
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
            /* Authenticated View Profile */
            <>
              {/* Hero Section */}
              <div className={styles.hero}>
                <h1 className={styles.heroTitle}>Operator Profile Node</h1>
                <p className={styles.heroSubtitle}>
                  View secure cognitive credentials, monitor network authorization status, and update your telemetry alerts configurations.
                </p>
              </div>

              <div className={styles.visualGrid} style={{ alignItems: 'stretch' }}>
                
                {/* Left: Clean Operator Details Card */}
                <div style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0px',
                  padding: 'var(--spacing-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-5)',
                  height: 'fit-content'
                }}>
                  <div>
                    <div className={styles.sectionHeader}>SECURE NODE DETAILS</div>
                    <h2 className={styles.sectionTitle} style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-2)' }}>
                      {firstName || lastName ? `${firstName} ${lastName}`.trim() : (user.user_metadata?.full_name || 'Active Operator')}
                    </h2>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-success)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      ● Active Network Node
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', borderTop: '1px dashed var(--glass-border)', paddingTop: 'var(--spacing-4)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Full Name:</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>
                        {firstName || lastName ? `${firstName} ${lastName}`.trim() : (user.user_metadata?.full_name || 'Observer Delta')}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Registered Email:</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>{email || user.email}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Node ID (UUID):</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--color-text-primary)', wordBreak: 'break-all' }}>{user.id}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Node Active Since:</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Active Session'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Auth Scheme:</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>{user.id === 'mock-uuid-123456789' ? 'Browser Mock Credentials' : 'Google OAuth'}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Comprehensive Registration Form */}
                <div style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0px',
                  padding: 'var(--spacing-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-4)'
                }}>
                  <div className={styles.sectionHeader}>OPERATOR TELEMETRY REGISTRATION FILE</div>
                  <h2 className={styles.sectionTitle} style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                    Profile Credentials &amp; Metadata
                  </h2>
                  <p className={styles.sectionText} style={{ fontSize: '13px', lineHeight: '1.6', marginTop: 0, marginBottom: 'var(--spacing-2)' }}>
                    Your onboarding registration data is securely stored locally. You can review and update your focus metrics or alert parameters below.
                  </p>

                  {saveStatus === 'SUCCESS' && (
                    <div style={{
                      background: '#faf8f5',
                      border: '1px solid var(--glass-border)',
                      borderLeft: '4px solid #a35138',
                      padding: 'var(--spacing-4)',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: '13px',
                      color: 'var(--color-text-primary)',
                      lineHeight: '1.6',
                      marginBottom: 'var(--spacing-3)'
                    }}>
                      <div style={{ fontWeight: 'bold', color: '#a35138', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        ▲ Profile Updated Successfully
                      </div>
                      <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                        System credentials written to local database. Current operator session synchronized.
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleUpdateProfile} className={styles.form} style={{ maxWidth: '100%', gap: 'var(--spacing-4)', margin: 0 }}>
                    
                    {/* Row: First Name & Last Name */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>First Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Aman"
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Surname (Last Name) *</label>
                        <input 
                          type="text" 
                          required 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Arora"
                          className={styles.input}
                        />
                      </div>
                    </div>

                    {/* Email */}
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

                    {/* Row: Role & Intent Dropdowns */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>What best describes you? *</label>
                        <select 
                          value={userRole}
                          onChange={(e) => setUserRole(e.target.value)}
                          className={styles.input}
                        >
                          <option value="Enthusiast">Enthusiast</option>
                          <option value="NGO">NGO / Activist</option>
                          <option value="Government">Government / Officer</option>
                          <option value="Researcher">Researcher / Scholar</option>
                          <option value="Media">Media / Journalist</option>
                          <option value="Citizen Scientist">Citizen Scientist</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Why use this site? *</label>
                        <select 
                          value={intent}
                          onChange={(e) => setIntent(e.target.value)}
                          className={styles.input}
                        >
                          <option value="Education">Education</option>
                          <option value="Environmental Awareness">Environmental Awareness</option>
                          <option value="Scientific Research">Scientific Research</option>
                          <option value="Legal Recourse / Evidence">Legal Recourse / Evidence</option>
                          <option value="Public Disclosure">Public Disclosure</option>
                          <option value="Administrative Enforcement">Administrative Enforcement</option>
                        </select>
                      </div>
                    </div>

                    {/* Geographic Section */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 'var(--spacing-3)', 
                      border: '1px solid var(--glass-border)', 
                      padding: 'var(--spacing-4)', 
                      background: 'rgba(44, 59, 77, 0.01)',
                      borderRadius: '0px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="checkbox"
                          id="profileFromIndiaCheckbox"
                          checked={fromIndia}
                          onChange={(e) => setFromIndia(e.target.checked)}
                          style={{ accentColor: 'var(--color-accent)', cursor: 'pointer', width: '15px', height: '15px' }}
                        />
                        <label htmlFor="profileFromIndiaCheckbox" style={{ fontSize: '12px', color: 'var(--color-text-primary)', fontWeight: 'bold', cursor: 'pointer' }}>
                          Are you from India?
                        </label>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)', marginTop: '4px' }}>
                        <div className={styles.formGroup}>
                          <label className={styles.label} style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>City</label>
                          <input 
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Bankura"
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label} style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>State</label>
                          <input 
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="e.g. West Bengal"
                            className={styles.input}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Referral Dropdown */}
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Where did you hear about us? *</label>
                      <select 
                        value={referral}
                        onChange={(e) => setReferral(e.target.value)}
                        className={styles.input}
                      >
                        <option value="Social Media">Social Media</option>
                        <option value="Environmental Reports">Environmental Reports</option>
                        <option value="News / Press">News / Press</option>
                        <option value="Word of Mouth">Word of Mouth</option>
                        <option value="Search Engine">Search Engine</option>
                      </select>
                    </div>

                    {/* Consent and Notification Checks */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <input 
                          type="checkbox"
                          required
                          id="profileTermsCheck"
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          style={{ accentColor: 'var(--color-accent)', marginTop: '3px', cursor: 'pointer', width: '14px', height: '14px' }}
                        />
                        <label htmlFor="profileTermsCheck" style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: '1.4', cursor: 'pointer' }}>
                          I agree to the Terms and Conditions for secure orbital data access. *
                        </label>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <input 
                          type="checkbox"
                          id="profileUpdatesCheck"
                          checked={receiveUpdates}
                          onChange={(e) => setReceiveUpdates(e.target.checked)}
                          style={{ accentColor: 'var(--color-accent)', marginTop: '3px', cursor: 'pointer', width: '14px', height: '14px' }}
                        />
                        <label htmlFor="profileUpdatesCheck" style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: '1.4', cursor: 'pointer' }}>
                          Receive automated alerts if an active mining disturbance is detected near my specified city.
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className={styles.button}
                      style={{
                        borderRadius: '0px',
                        backgroundColor: '#a35138',
                        borderColor: '#a35138',
                        width: '100%',
                        marginTop: '10px',
                        padding: '12px',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8b402b'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#a35138'}
                    >
                      Update Profile Node
                    </button>
                  </form>
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
