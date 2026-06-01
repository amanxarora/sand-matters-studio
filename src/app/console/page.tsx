import React from 'react';
import MapComponent from '../../components/Map';
import Navbar from '../../components/Navbar';

export default function ConsolePage() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <MapComponent />
      </div>
    </main>
  );
}
