'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-surface)',
      borderTop: '1px solid var(--glass-border)',
      padding: 'var(--spacing-8) var(--spacing-6) var(--spacing-6) var(--spacing-6)',
      width: '100%',
      color: 'var(--color-text-secondary)',
      fontSize: 'var(--font-size-sm)',
      fontFamily: 'var(--font-family-base)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--spacing-6)',
        marginBottom: 'var(--spacing-8)'
      }}>
        {/* Brand details */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-3)' }}>
            <div style={{ 
              width: '24px', height: '24px', 
              backgroundColor: 'var(--color-accent)', 
              borderRadius: 'var(--border-radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 'bold', fontSize: '0.65rem'
            }}>
              SMS
            </div>
            <span style={{ fontWeight: 'bold', color: 'var(--color-text-primary)', letterSpacing: '0.5px' }}>
              Sand Matters Studio
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', lineHeight: '1.5', maxWidth: '250px' }}>
            Orbital Earth Engine & computer vision pipeline cataloguing riverine morphological changes and exposing unauthorized sand extraction.
          </p>
        </div>

        {/* Links: Support Us */}
        <div>
          <h4 style={{ color: 'var(--color-text-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--spacing-3)' }}>
            Support Us
          </h4>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <Link href="/collaboration" style={{ color: 'var(--color-text-secondary)', transition: 'var(--transition-fast)', textDecoration: 'none' }}
                 onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                 onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                COLLAB: NGO Alliances
              </Link>
            </li>
            <li>
              <Link href="/support" style={{ color: 'var(--color-text-secondary)', transition: 'var(--transition-fast)', textDecoration: 'none' }}
                 onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                 onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                FUND: Donate to Research
              </Link>
            </li>
            <li>
              <Link href="/support" style={{ color: 'var(--color-text-secondary)', transition: 'var(--transition-fast)', textDecoration: 'none' }}
                 onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                 onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                Sponsor Imagery Passes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px dashed rgba(93, 132, 150, 0.15)',
        paddingTop: 'var(--spacing-4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--spacing-3)',
        fontSize: '0.72rem'
      }}>
        <div>
          &copy; {new Date().getFullYear()} Sand Matters Studio. Decentralized Ecosystem Sentinel.
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Link href="/gdpr" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
             onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
             onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            GDPR Compliance
          </Link>
          <span>&middot;</span>
          <Link href="/terms" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
             onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
             onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            Terms & Disclaimers
          </Link>
        </div>
      </div>
    </footer>
  );
}
