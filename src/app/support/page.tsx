'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function SupportPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.heroTagline}>OPERATIONAL DIRECTIVE: SUPPORT SYSTEMS</div>
            <h1 className={styles.heroTitle}>Coming Soon</h1>
            <p className={styles.heroSubtitle}>
              Stay tuned, you can connect to us <Link href="/contact" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>here</Link> to establish partnerships or coordinate research funding nodes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
