'use client';

import React, { useState, useEffect } from 'react';

interface WelcomeModalProps {
  onAccept?: () => void;
}

export default function WelcomeModal({ onAccept }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeStorage, setAgreeStorage] = useState(false);
  const [agreeDisclaimer, setAgreeDisclaimer] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('consent_accepted');
    if (accepted !== 'true') {
      setIsOpen(true);
    }

    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('open_welcome_modal', handleOpen);
    return () => {
      window.removeEventListener('open_welcome_modal', handleOpen);
    };
  }, []);

  const handleAccept = () => {
    if (agreeTerms && agreeStorage && agreeDisclaimer) {
      localStorage.setItem('consent_accepted', 'true');
      setIsOpen(false);
      if (onAccept) onAccept();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(17, 20, 23, 0.92)',
      backdropFilter: 'none',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-4)',
      overflowY: 'auto',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-family-base)'
    }}>
      <div style={{
        maxWidth: '850px',
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: 'var(--spacing-5) var(--spacing-6)',
          borderBottom: '1px solid var(--glass-border)',
          backgroundColor: 'var(--color-accent-soft)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              color: 'var(--color-accent)',
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-family-base)'
            }}>
              From Afar
            </div>
            <div style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.8rem',
              marginTop: 'var(--spacing-1)',
              fontFamily: 'var(--font-family-base)'
            }}>
              Geospatial Platform for Sand Mining Oversight & Environmental Hydrology
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
              display: 'inline-block'
            }} />
            <span style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family-base)'
            }}>
              Data Stream Online
            </span>
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div style={{
          padding: 'var(--spacing-6)',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-6)'
        }}>
          {/* Mission Intro */}
          <div style={{
            fontSize: 'var(--font-size-sm)',
            lineHeight: '1.6',
            color: 'var(--color-text-primary)',
            borderLeft: '3px solid var(--color-accent)',
            paddingLeft: 'var(--spacing-4)',
            backgroundColor: 'var(--color-accent-soft)'
          }}>
            <p style={{ marginBottom: 'var(--spacing-3)', fontWeight: 500 }}>
              Welcome to From Afar, a professional-grade remote sensing and geospatial intelligence platform. This interface tracks and catalogues suspected sand mining extraction and environmental degradation across sensitive riverine and coastal zones.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              By integrating multi-spectral satellite imagery (Sentinel-2 and Landsat) with machine learning pipelines (YOLO object detection) and biophysical spectral indices (NDVI, BSI, MNDWI), From Afar processes surface reflectance data into objective, verifiable spatial data. The platform empowers conservationists, researchers, and regulatory agencies with high-fidelity telemetry to monitor fragile morphology, document canopy loss, and support ecological conservation.
            </p>
          </div>

          {/* Terms of Service */}
          <div style={{
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-sm)',
            backgroundColor: 'rgba(30, 41, 59, 0.3)',
            padding: 'var(--spacing-4)'
          }}>
            <div style={{
              color: 'var(--color-accent)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'bold',
              fontFamily: 'var(--font-family-base)',
              marginBottom: 'var(--spacing-3)',
              borderBottom: '1px solid var(--glass-border)',
              paddingBottom: 'var(--spacing-2)'
            }}>
              Section 1: Terms of Service & Data Rights
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-3)',
              maxHeight: '160px',
              overflowY: 'auto',
              paddingRight: 'var(--spacing-2)',
              lineHeight: '1.5'
            }}>
              <div>
                <strong style={{ color: 'var(--color-text-primary)' }}>1.1 Conservation & Research Mandate</strong>
                <p style={{ marginTop: '2px' }}>The geospatial data, spatial indices, and machine learning inferences compiled on this platform are provided strictly for conservation advocacy, scientific research, and regulatory monitoring. Commercial exploitation of telemetry data or spatial assets is prohibited.</p>
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-primary)' }}>1.2 Contributed Coordinates & Public Mapping</strong>
                <p style={{ marginTop: '2px' }}>When you submit reports, coordinates, or ground-truth photo evidence to From Afar, you retain intellectual property rights to your contributions. By submitting, you grant this project a perpetual, worldwide, royalty-free, non-exclusive license to aggregate, analyze, and display these datasets to map global extraction hotspots.</p>
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-primary)' }}>1.3 Intellectual Property & Scraping Policy</strong>
                <p style={{ marginTop: '2px' }}>The computational workflows, custom spectral layers, and trained computer vision model weights are the exclusive property of the From Afar project. Systematic, automated scraping or extraction of platform coordinate databases without written permission violates these terms.</p>
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-primary)' }}>1.4 Regulatory & Legal Precaution</strong>
                <p style={{ marginTop: '2px' }}>Satellite observation is a probabilistic discipline. All spectral indices, machine learning predictions, and alert metrics represent mathematical estimations of ground conditions rather than definitive legal facts. Users are advised to perform independent, on-the-ground validation before initiating formal regulatory or administrative proceedings.</p>
              </div>
            </div>
          </div>

          {/* Storage & Technical Limitations Dual Columns */}
          <div className="welcome-split-layout">
            {/* Storage */}
            <div style={{
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'rgba(30, 41, 59, 0.3)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                color: 'var(--color-accent)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-family-base)',
                marginBottom: 'var(--spacing-2)',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: 'var(--spacing-1)'
              }}>
                Section 2: Local Storage & Session Data Policy
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.4',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <p>To deliver a highly responsive and secure user interface, From Afar stores essential telemetry states directly within your browser's local storage (<code>localStorage</code>) and cookies:</p>
                <ul style={{ paddingLeft: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
                  <li><strong>Active Session Preservation:</strong> If you register or authenticate, secure, encrypted tokens are written to maintain your session.</li>
                  <li><strong>Consent Persistence:</strong> Your compliance and onboarding acknowledgements are stored locally to prevent redundant onboarding prompts.</li>
                  <li><strong>Interface Preferences:</strong> We cache active region filters, custom map coordinates of interest, and viewport boundaries to optimize queries and reduce server latency.</li>
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'rgba(30, 41, 59, 0.3)',
              padding: 'var(--spacing-4)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                color: 'var(--color-accent)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-family-base)',
                marginBottom: 'var(--spacing-2)',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: 'var(--spacing-1)'
              }}>
                Section 3: Scientific & Technical Limitations
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.4',
                maxHeight: '180px',
                overflowY: 'auto'
              }}>
                <p style={{ marginBottom: '6px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  ATTENTION NODE OPERATORS:
                </p>
                <ul style={{ paddingLeft: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li><strong>NDVI:</strong> Measures chlorophyll density. Decreases suggest canopy clearance preceding active sand excavation.</li>
                  <li><strong>BSI:</strong> Highlights mineral and soil exposure. Sharp increases signal active excavation pits or stripped topsoil.</li>
                  <li><strong>MNDWI:</strong> Delineates open water boundaries. Shifts reveal channel alterations from riverbed dredging.</li>
                  <li><strong>YOLO PREDICTION:</strong> High confidence rating denotes statistical visual resemblance, not definitive legal proof of illegal activity.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel / Consents */}
        <div style={{
          padding: 'var(--spacing-5) var(--spacing-6)',
          borderTop: '1px solid var(--glass-border)',
          backgroundColor: 'var(--color-background)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)'
        }}>
          {/* Checkboxes */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              color: agreeTerms ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              transition: 'color var(--transition-fast)'
            }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{
                  accentColor: 'var(--color-accent)',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span>I agree to the <strong>Terms of Service & Data Rights</strong> (Section 1.2)</span>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              color: agreeStorage ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              transition: 'color var(--transition-fast)'
            }}>
              <input
                type="checkbox"
                checked={agreeStorage}
                onChange={(e) => setAgreeStorage(e.target.checked)}
                style={{
                  accentColor: 'var(--color-accent)',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span>I consent to the <strong>Session Storage Protocol</strong> (Section 1.3)</span>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              color: agreeDisclaimer ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              transition: 'color var(--transition-fast)'
            }}>
              <input
                type="checkbox"
                checked={agreeDisclaimer}
                onChange={(e) => setAgreeDisclaimer(e.target.checked)}
                style={{
                  accentColor: 'var(--color-accent)',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span>I acknowledge the <strong>Technical & Spectral Limitations</strong> (Section 1.4)</span>
            </label>
          </div>

          {/* Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '4px'
          }}>
            <button
              onClick={handleAccept}
              disabled={!(agreeTerms && agreeStorage && agreeDisclaimer)}
              style={{
                backgroundColor: (agreeTerms && agreeStorage && agreeDisclaimer) ? 'var(--color-accent)' : 'var(--color-surface-hover)',
                color: (agreeTerms && agreeStorage && agreeDisclaimer) ? '#ffffff' : 'var(--color-text-secondary)',
                border: (agreeTerms && agreeStorage && agreeDisclaimer) ? '1px solid var(--color-accent)' : '1px solid var(--glass-border)',
                padding: 'var(--spacing-3) var(--spacing-6)',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                cursor: (agreeTerms && agreeStorage && agreeDisclaimer) ? 'pointer' : 'not-allowed',
                transition: 'all var(--transition-normal)',
                boxShadow: 'none',
                fontFamily: 'monospace',
                letterSpacing: '1px'
              }}
              onMouseOver={(e) => {
                if (agreeTerms && agreeStorage && agreeDisclaimer) {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                }
              }}
              onMouseOut={(e) => {
                if (agreeTerms && agreeStorage && agreeDisclaimer) {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                }
              }}
            >
              [ INITIALIZE SECURE FEED ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
