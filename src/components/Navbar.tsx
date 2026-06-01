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
        <a href="#" onClick={handleOpenGuide} style={{ color: 'var(--color-text-secondary)', fontWeight: 500, transition: 'var(--transition-fast)' }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
          Platform Guide
        </a>
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
        <Link href="/learning" style={{ 
          color: pathname === '/learning' ? 'var(--color-accent)' : 'var(--color-text-secondary)', 
          fontWeight: 600, 
          transition: 'var(--transition-fast)',
          borderBottom: pathname === '/learning' ? '2px solid var(--color-accent)' : '2px solid transparent',
          paddingBottom: '4px'
        }}
           onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
           onMouseOut={(e) => e.currentTarget.style.color = pathname === '/learning' ? 'var(--color-accent)' : 'var(--color-text-secondary)'}>
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
          <button style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
            border: 'none',
            padding: 'var(--spacing-2) var(--spacing-4)',
            borderRadius: 'var(--border-radius-sm)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onClick={signInWithGoogle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.7 17.57V20.34H19.26C21.34 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.7 17.57C14.73 18.22 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.88 14.12H2.21V16.96C4.01 20.54 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.88 14.12C5.66 13.47 5.54 12.76 5.54 12C5.54 11.24 5.66 10.53 5.88 9.88V7.04H2.21C1.47 8.53 1.05 10.21 1.05 12C1.05 13.79 1.47 15.47 2.21 16.96L5.88 14.12Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1 12 1C7.7 1 4.01 3.46 2.21 7.04L5.88 9.88C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
