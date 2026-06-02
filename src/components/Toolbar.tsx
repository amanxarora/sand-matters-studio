import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface ToolbarProps {
  onDrawPolygon: () => void;
  onDelete: () => void;
  showYolo: boolean;
  onToggleYolo: () => void;
  showIsochrone: boolean;
  onToggleIsochrone: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onDrawPolygon, onDelete, showYolo, onToggleYolo, showIsochrone, onToggleIsochrone }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div style={{
      width: 'var(--toolbar-width)',
      height: '100%',
      backgroundColor: 'var(--color-surface)',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'var(--spacing-4) 0',
      gap: 'var(--spacing-4)',
      zIndex: 5,
      boxShadow: 'var(--shadow-panel)'
    }}>
      
      {/* Tool Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <button 
          onClick={user ? onDrawPolygon : undefined}
          title={user ? "Draw Region of Interest" : "Sign in to draw regions"}
          disabled={!user}
          style={{
            width: '40px', height: '40px',
            backgroundColor: user ? 'var(--color-background)' : 'var(--color-surface-hover)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-sm)',
            cursor: user ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: user ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)',
            opacity: user ? 1 : 0.5
          }}
          onMouseOver={(e) => user && (e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)')}
          onMouseOut={(e) => user && (e.currentTarget.style.backgroundColor = 'var(--color-background)')}
        >
          {/* Simple Polygon Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l8 6-3 14H7L4 8z"></path>
          </svg>
        </button>

        <button 
          onClick={onDelete}
          title="Delete Selection"
          style={{
            width: '40px', height: '40px',
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-danger)',
            transition: 'var(--transition-fast)'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background)'}
        >
          {/* Simple Trash Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        <button 
          onClick={onToggleYolo}
          title={showYolo ? "Hide YOLO Detections" : "Show YOLO Detections"}
          style={{
            width: '40px', height: '40px',
            backgroundColor: showYolo ? 'rgba(93, 132, 150, 0.2)' : 'var(--color-background)',
            border: showYolo ? '1px solid #5D8496' : '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: showYolo ? '#5D8496' : 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)'
          }}
          onMouseOver={(e) => {
            if (!showYolo) {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            }
          }}
          onMouseOut={(e) => {
            if (!showYolo) {
              e.currentTarget.style.backgroundColor = 'var(--color-background)';
            }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>
          </svg>
        </button>

        <button 
          onClick={onToggleIsochrone}
          title={showIsochrone ? "Hide Travelshed Isochrone" : "Show Travelshed Isochrone"}
          style={{
            width: '40px', height: '40px',
            backgroundColor: showIsochrone ? 'rgba(163, 81, 56, 0.2)' : 'var(--color-background)',
            border: showIsochrone ? '1px solid #a35138' : '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: showIsochrone ? '#a35138' : 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)'
          }}
          onMouseOver={(e) => {
            if (!showIsochrone) {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            }
          }}
          onMouseOut={(e) => {
            if (!showIsochrone) {
              e.currentTarget.style.backgroundColor = 'var(--color-background)';
            }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </button>
      </div>

      <div style={{ flexGrow: 1 }} />

      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        style={{
          width: '40px', height: '40px',
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-text-primary)',
          transition: 'var(--transition-fast)',
          marginBottom: 'var(--spacing-4)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background)'}
      >
        {theme === 'dark' ? (
          // Sun icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        ) : (
          // Moon icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        )}
      </button>

    </div>
  );
};

export default Toolbar;
