'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading, signInWithGoogle, signOut, loginManually } = useAuth();
  const pathname = usePathname();

  // Modal State Parameters
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      zIndex: 10,
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
        
        {/* Auth Actions Block */}
        {loading ? (
          <div style={{ width: '100px', height: '36px', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--glass-bg)' }} />
        ) : user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            {/* Clickable Profile Navigation */}
            <Link href="/profile" style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--color-text-primary)', 
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: pathname === '/profile' ? '2px solid var(--color-accent)' : '2px solid transparent',
              paddingBottom: '2px',
              transition: 'var(--transition-fast)'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseOut={(e) => e.currentTarget.style.color = pathname === '/profile' ? 'var(--color-accent)' : 'var(--color-text-primary)'}
            >
              {user.user_metadata?.full_name || user.email}
            </Link>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            {/* Both Try Our Tool (Console) and Sign In side-by-side */}
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

            <button 
              onClick={() => setShowModal(true)}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--glass-border)',
                padding: 'var(--spacing-2) var(--spacing-4)',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Glassmorphic Cyber Sign-In Modal Overlay */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(12, 15, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--glass-border)',
            borderRadius: '0px',
            width: '420px',
            padding: 'var(--spacing-6)',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '16px', right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-secondary)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                lineHeight: 1
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              &times;
            </button>

            {/* Modal Headers */}
            <div style={{ marginBottom: 'var(--spacing-5)' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                Operational Node Access
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Sign In to Studio
              </h2>
            </div>

            {/* Custom Manual Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              loginManually(username, email);
              setShowModal(false);
              setUsername('');
              setEmail('');
              setPassword('');
            }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '10px', color: 'var(--color-accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Operator Identifier (Username) *
                </label>
                <input 
                  type="text" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Field Officer Delta"
                  style={{
                    background: 'rgba(27, 30, 34, 0.8)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '10px', color: 'var(--color-accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Return Telemetry Channel (Email) *
                </label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@network.org"
                  style={{
                    background: 'rgba(27, 30, 34, 0.8)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '10px', color: 'var(--color-accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Access Passphrase (Password) *
                </label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    background: 'rgba(27, 30, 34, 0.8)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                style={{
                  backgroundColor: '#a35138',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '0px',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  transition: 'background-color 200ms ease',
                  marginTop: '6px'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8b402b'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#a35138'}
              >
                Authenticate Node
              </button>
            </form>

            {/* Google OAuth Option */}
            <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--glass-border)' }} />
              <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--glass-border)' }} />
            </div>

            <button 
              onClick={() => {
                signInWithGoogle();
                setShowModal(false);
              }}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--glass-border)',
                padding: '10px',
                borderRadius: '0px',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 200ms ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.7 17.57V20.34H19.26C21.34 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.7 17.57C14.73 18.22 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.88 14.12H2.21V16.96C4.01 20.54 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.88 14.12C5.66 13.47 5.54 12.76 5.54 12C5.54 11.24 5.66 10.53 5.88 9.88V7.04H2.21C1.47 8.53 1.05 10.21 1.05 12C1.05 13.79 1.47 15.47 2.21 16.96L5.88 14.12Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1 12 1C7.7 1 4.01 3.46 2.21 7.04L5.88 9.88C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
              Sign In with Google
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
