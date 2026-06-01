'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface ProfileFormProps {
  onClose?: () => void;
  forceShow?: boolean;
}

const PROFESSION_OPTIONS = [
  {
    code: 'RESEARCH_GEOSPATIAL',
    label: 'Environmental Scientist / Remote Sensing Researcher',
    helperText: 'Access high-resolution spectral indices, raw GeoTIFF export options, and multi-temporal satellite comparisons for peer-reviewed studies and impact analysis.'
  },
  {
    code: 'INTELLIGENCE_JOURNALISM',
    label: 'Investigative Journalist / Media Analyst',
    helperText: 'Prioritize high-confidence YOLO machine detections and rapid timeline export features for media disclosures, public reports, and environmental exposes.'
  },
  {
    code: 'COMMUNITY_MONITOR',
    label: 'Local Activist / Community Defender',
    helperText: 'Focus on localized alerts, ground-truth crowdsourcing portals, and community report generation to defend local waterways and coastal boundaries.'
  },
  {
    code: 'REGULATORY_ENFORCEMENT',
    label: 'Government Regulator / Law Enforcement Official',
    helperText: 'Deploy high-fidelity detection alerts, compliance verification metrics, and audit-trail report bundles optimized for official investigation.'
  },
  {
    code: 'LEGAL_ADVOCACY',
    label: 'Environmental Lawyer / Policy Advocate',
    helperText: 'Retrieve chronological spectral logs and historical machine predictions to compile empirical evidentiary packages for litigation and policy drafts.'
  },
  {
    code: 'CIVIC_OBSERVER',
    label: 'Public Observer / Citizen Scientist',
    helperText: 'Support global telemetry monitoring by verifying automated machine detections and logging general field observations.'
  }
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const COUNTRIES = [
  'India', 'United States', 'Bangladesh', 'Vietnam', 'Australia', 'Brazil', 
  'Canada', 'China', 'Indonesia', 'Sri Lanka', 'Other'
];

export default function ProfileForm({ onClose, forceShow = false }: ProfileFormProps) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states
  const [profession, setProfession] = useState('');
  const [intention, setIntention] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [alertPreference, setAlertPreference] = useState('email');

  useEffect(() => {
    if (!user) {
      setShowForm(false);
      return;
    }

    // Fetch existing profile to see if calibration is needed
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          // If no row exists, we might need to show form anyway. 
          // The trigger should have made one, but let's default to showing if we want node calibration
          if (forceShow) {
            setShowForm(true);
          }
          return;
        }

        if (data) {
          setProfession(data.profession || '');
          setIntention(data.intention || '');
          setCountry(data.country || '');
          setState(data.state || '');
          setCity(data.city || '');
          setAlertPreference(data.alert_preference || 'email');

          // If profession is missing, it means they haven't calibrated their node yet
          if (!data.profession || forceShow) {
            setShowForm(true);
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (forceShow) setShowForm(true);
      }
    };

    fetchProfile();
  }, [user, forceShow]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setErrorMsg(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          profession,
          intention,
          country,
          state: country === 'India' ? state : null,
          city: country === 'India' ? city : null,
          alert_preference: alertPreference,
          created_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setTimeout(() => {
        setShowForm(false);
        if (onClose) onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setErrorMsg(err.message || 'Failed to save node calibration data.');
    } finally {
      setSaving(false);
    }
  };

  if (!showForm) return null;

  const selectedProfInfo = PROFESSION_OPTIONS.find(p => p.code === profession);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-4)',
      overflowY: 'auto',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-family-base)'
    }}>
      <div style={{
        maxWidth: '700px',
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'var(--shadow-panel)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '92vh',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header decoration */}
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--color-accent), transparent)',
          width: '100%'
        }} />

        {/* Close Button (only if not forced or onClose provided) */}
        {!forceShow && (
          <button
            onClick={() => {
              setShowForm(false);
              if (onClose) onClose();
            }}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--color-text-secondary)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            ✕
          </button>
        )}

        {/* Content Body */}
        <form onSubmit={handleSave} style={{
          padding: 'var(--spacing-6)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-5)'
        }}>
          {/* Form Title */}
          <div>
            <div style={{
              color: 'var(--color-accent)',
              fontSize: 'var(--font-size-sm)',
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}>
              Operational Profile
            </div>
            <h2 style={{
              fontSize: 'var(--font-size-lg)',
              margin: 'var(--spacing-1) 0 var(--spacing-2) 0',
              fontWeight: 700
            }}>
              Configure Regional Monitoring Preferences
            </h2>
            <p style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.5'
            }}>
              Define your professional sector and geographic monitoring focus. Tailoring your operational profile helps optimize spatial database routing and ensures relevant alert notifications.
            </p>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            
            {/* Profession Dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-base)', color: 'var(--color-accent)' }}>
                Professional Sector / Role *
              </label>
              <select
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                style={{
                  backgroundColor: '#faf8f5',
                  color: '#1b2632',
                  border: '1px solid var(--glass-border)',
                  padding: 'var(--spacing-3)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="" disabled>-- Select Professional Telemetry Role --</option>
                {PROFESSION_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Dynamic Role Helper Text Box */}
              {selectedProfInfo && (
                <div style={{
                  marginTop: '6px',
                  backgroundColor: 'var(--color-accent-soft)',
                  borderLeft: '2px solid var(--color-accent)',
                  padding: 'var(--spacing-3)',
                  borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-primary)',
                  lineHeight: '1.4',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  <strong style={{ color: 'var(--color-accent)' }}>Operational Guideline:</strong> {selectedProfInfo.helperText}
                </div>
              )}
            </div>

            {/* Country, State, City Rows */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: country === 'India' ? '1fr 1fr 1fr' : '1fr',
              gap: 'var(--spacing-4)',
              transition: 'all 0.3s ease'
            }}>
              {/* Country Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-base)', color: 'var(--color-accent)' }}>
                  Monitoring Focus Region (Country) *
                </label>
                <select
                  required
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    if (e.target.value !== 'India') {
                      setState('');
                      setCity('');
                    }
                  }}
                  style={{
                    backgroundColor: '#faf8f5',
                    color: '#1b2632',
                    border: '1px solid var(--glass-border)',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="" disabled>-- Select Country --</option>
                  {COUNTRIES.map((cnt) => (
                    <option key={cnt} value={cnt}>{cnt}</option>
                  ))}
                </select>
              </div>

              {/* State Dropdown (India Only) */}
              {country === 'India' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', animation: 'slideIn 0.3s ease' }}>
                  <label style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-base)', color: 'var(--color-accent)' }}>
                    Target State / Region *
                  </label>
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{
                      backgroundColor: '#faf8f5',
                      color: '#1b2632',
                      border: '1px solid var(--glass-border)',
                      padding: 'var(--spacing-3)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled>-- Select State --</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* City Text Input (India Only) */}
              {country === 'India' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', animation: 'slideIn 0.3s ease' }}>
                  <label style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-base)', color: 'var(--color-accent)' }}>
                    Focus Municipality / District (City) *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city or district"
                    style={{
                      backgroundColor: '#faf8f5',
                      color: '#1b2632',
                      border: '1px solid var(--glass-border)',
                      padding: 'var(--spacing-3)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Proximity Alerts Explanatory Panel */}
            <div style={{
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
              padding: 'var(--spacing-4)'
            }}>
              <div style={{
                color: 'var(--color-accent)',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'bold',
                marginBottom: 'var(--spacing-2)'
              }}>
                Geo-Fenced Alerts & Notifications
              </div>
              <p style={{
                fontSize: '0.78rem',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.4',
                marginBottom: 'var(--spacing-3)'
              }}>
                Establish a virtual geographic boundary around your target municipalities or active river basins. When a new satellite acquisition (Sentinel-2 or Landsat) detects a sharp Bare Soil Index (BSI) increase, a sudden drop in Normalized Difference Vegetation Index (NDVI), or a machine-learning identified mining asset within your designated radius, the system will trigger an automated alert notification. This eliminates the need for manual dashboard polling, keeping you informed of sudden landscape modifications.
              </p>

              {/* Alert Preference Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontWeight: 'bold' }}>
                  Alert Notification Channel:
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="alertPref"
                    value="email"
                    checked={alertPreference === 'email'}
                    onChange={() => setAlertPreference('email')}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  Email Notification
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="alertPref"
                    value="none"
                    checked={alertPreference === 'none'}
                    onChange={() => setAlertPreference('none')}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  Deactivated
                </label>
              </div>
            </div>

            {/* Intention Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-base)', color: 'var(--color-accent)' }}>
                Primary Monitoring Objectives & Scientific Intent
              </label>
              <textarea
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder="Detail the specific environmental anomalies, riverbeds, or extraction channels you seek to monitor or research..."
                rows={3}
                style={{
                  backgroundColor: '#faf8f5',
                  color: '#1b2632',
                  border: '1px solid var(--glass-border)',
                  padding: 'var(--spacing-3)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'var(--font-family-base)',
                  lineHeight: '1.4'
                }}
              />
            </div>
          </div>

          {/* Messages & Actions */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: 'var(--spacing-3)'
          }}>
            {errorMsg && (
              <div style={{
                color: 'var(--color-danger)',
                border: '1px solid var(--color-danger)',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fontFamily: 'var(--font-family-base)'
              }}>
                Error: {errorMsg}
              </div>
            )}

            {success && (
              <div style={{
                color: 'var(--color-success)',
                border: '1px solid var(--color-success)',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fontFamily: 'var(--font-family-base)'
              }}>
                Operational profile saved successfully. Configuring dashboard preferences...
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--spacing-3)'
            }}>
              {!forceShow && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    if (onClose) onClose();
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--glass-border)',
                    padding: 'var(--spacing-3) var(--spacing-5)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                disabled={saving || success}
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#ffffff',
                  border: '1px solid var(--color-accent)',
                  padding: 'var(--spacing-3) var(--spacing-5)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  cursor: (saving || success) ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition-normal)',
                  fontFamily: 'var(--font-family-base)',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => {
                  if (!saving && !success) {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!saving && !success) {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  }
                }}
              >
                {saving ? 'Saving Profile...' : 'Save Operational Profile'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
