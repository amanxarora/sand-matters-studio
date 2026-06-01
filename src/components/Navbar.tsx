'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const pathname = usePathname();

  const handleOpenGuide = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('consent_accepted');
    window.dispatchEvent(new Event('open_welcome_modal'));
  };

  return (
    <nav style={{
      height: 'var(--navbar-height)',
      width: '100%',
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--spacing-6)',
      position: 'relative',
      zIndex: 10, // Keep above the map
      boxShadow: 'var(--shadow-panel)'
    }}>
      {/* Brand / Logo Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', textDecoration: 'none' }}>
          <div style={{ 
            width: '32px', height: '32px', 
            backgroundColor: 'var(--color-accent)', 
            borderRadius: 'var(--border-radius-sm)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 'bold', fontSize: '0.78rem'
          }}>
            SMS
          </div>
          <h1 style={{ 
            fontSize: 'var(--font-size-lg)', 
            margin: 0, 
            fontWeight: 700,
            color: 'var(--color-text-primary)'
          }}>
            Sand Matters Studio
          </h1>
        </Link>
        <span style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          marginLeft: 'var(--spacing-2)',
          borderLeft: '1px solid var(--glass-border)',
          paddingLeft: 'var(--spacing-3)'
        }}>
          Sand Mining Intelligence
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>

        <Link href="/" style={{ 
          color: pathname === '/' ? 'var(--color-accent)' : 'var(--color-text-secondary)', 
          fontWeight: 600, 
          transition: 'var(--transition-fast)',
          borderBottom: pathname === '/' ? '2px solid var(--color-accent)' : '2px solid transparent',
          paddingBottom: '4px'
        }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = pathname === '/' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}>
          Forum
        </Link>
        <Link href="/console" style={{ 
          color: pathname === '/console' ? 'var(--color-accent)' : 'var(--color-text-secondary)', 
          fontWeight: 600, 
          transition: 'var(--transition-fast)',
          borderBottom: pathname === '/console' ? '2px solid var(--color-accent)' : '2px solid transparent',
          paddingBottom: '4px'
        }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = pathname === '/console' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}>
          Map Console
        </Link>
        <Link href="/methodology" style={{ 
          color: pathname === '/methodology' ? 'var(--color-accent)' : 'var(--color-text-secondary)', 
          fontWeight: 600, 
          transition: 'var(--transition-fast)',
          borderBottom: pathname === '/methodology' ? '2px solid var(--color-accent)' : '2px solid transparent',
          paddingBottom: '4px'
        }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = pathname === '/methodology' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}>
          Methodology
        </Link>
        <Link href="/impacts" style={{ 
          color: pathname === '/impacts' ? 'var(--color-accent)' : 'var(--color-text-secondary)', 
          fontWeight: 600, 
          transition: 'var(--transition-fast)',
          borderBottom: pathname === '/impacts' ? '2px solid var(--color-accent)' : '2px solid transparent',
          paddingBottom: '4px'
        }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = pathname === '/impacts' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}>
          Impacts
        </Link>
        <Link href="/about" style={{ 
          color: pathname === '/about' ? 'var(--color-accent)' : 'var(--color-text-secondary)', 
          fontWeight: 600, 
          transition: 'var(--transition-fast)',
          borderBottom: pathname === '/about' ? '2px solid var(--color-accent)' : '2px solid transparent',
          paddingBottom: '4px'
        }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = pathname === '/about' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}>
          About
        </Link>
        <Link href="/contact" style={{ 
          color: pathname === '/contact' ? 'var(--color-accent)' : 'var(--color-text-secondary)', 
          fontWeight: 600, 
          transition: 'var(--transition-fast)',
          borderBottom: pathname === '/contact' ? '2px solid var(--color-accent)' : '2px solid transparent',
          paddingBottom: '4px'
        }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = pathname === '/contact' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}>
          Contact
        </Link>
        
        {/* Auth Button */}
        {loading ? (
          <div style={{ width: '100px', height: '36px', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--glass-bg)' }} />
        ) : user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
              {user.user_metadata?.full_name || user.email}
            </span>
            <button style={{
              backgroundColor: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              borderRadius: 'var(--border-radius-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            onClick={signOut}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/console" style={{
            backgroundColor: '#a35138',
            color: '#fff',
            border: 'none',
            padding: 'var(--spacing-2) var(--spacing-4)',
            borderRadius: 'var(--border-radius-sm)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8b402b'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#a35138'}
          >
            Try Our Tool
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
