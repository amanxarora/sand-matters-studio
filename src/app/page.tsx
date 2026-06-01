'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './forum.module.css';

const CAROUSEL_SLIDES = [
  {
    tagline: "FACT 1: SAND CONSUMPTION",
    title: "Fact 1: Global Sand Mining Anomaly",
    subtitle: "This is a placeholder for the first sand mining fact. We will manually populate this content with custom facts later.",
    image: "/images/slide_one_bg.png"
  },
  {
    tagline: "FACT 2: LANDSCAPE COLLAPSE",
    title: "Fact 2: Severe Riverbank Erosion",
    subtitle: "This is a placeholder for the second sand mining fact. We will manually populate this content with custom facts later.",
    image: "/images/slide_two_bg.png"
  },
  {
    tagline: "GEOSPATIAL INTERVENTION TOOL",
    title: "Interactive Sand Mining Console",
    subtitle: "This is a placeholder for the third slide. It contains a quick-redirect button to try our console tool.",
    image: "/images/slide_three_bg.png",
    showButton: true
  }
];

const MOCK_FORUM_POSTS = [
  {
    id: 1,
    title: 'Observation Anomaly #001: Riverbed Incident',
    author: 'OBSERVER_#1024',
    role: 'Civic Warden',
    time: '2 hours ago',
    text: 'Placeholder content for the first recent activity on the map. This represents a localized report of suspected unauthorized extraction.',
    replies: [
      { author: 'GROUND_VAL_#082', text: 'Placeholder comment reply. Ground-truth verification record.', time: '1 hour ago' },
      { author: 'LEGAL_ADVOCACY_#521', text: 'Placeholder comment reply. Legal coordination and index chart analysis.', time: '30m ago' }
    ]
  },
  {
    id: 2,
    title: 'Observation Anomaly #002: Canopy Stripping Report',
    author: 'OBSERVER_#3942',
    role: 'Satellite Operator',
    time: '12 hours ago',
    text: 'Placeholder content for the second recent activity on the map. This represents high-resolution index collapses over river quadrants.',
    replies: [
      { author: 'RESEARCH_GEOSPATIAL_#99', text: 'Placeholder comment reply. Riparian zone erosion threat monitoring.', time: '8 hours ago' }
    ]
  },
  {
    id: 3,
    title: 'Observation Anomaly #003: River Course Shift',
    author: 'OBSERVER_#5A3F',
    role: 'Hydrology Analyst',
    time: '18 hours ago',
    text: 'Placeholder content for the third recent activity on the map. This represents silt bar blockages or sand pile accumulations.',
    replies: [
      { author: 'GROUND_VAL_#902', text: 'Placeholder comment reply. Channel depth loss and agricultural blocks.', time: '14 hours ago' },
      { author: 'CIVIC_OBSERVER_#104', text: 'Placeholder comment reply. Local complaint filing status.', time: '10 hours ago' }
    ]
  }
];


export default function HomePage() {
  const [commentText, setCommentText] = useState('');
  const [forumPosts, setForumPosts] = useState(MOCK_FORUM_POSTS);
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic Carousel timer logic
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % CAROUSEL_SLIDES.length);
    resetTimer();
  };

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    resetTimer();
  };

  const handlePostComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            { author: 'CIVIC_OBSERVER_#715', text: commentText, time: 'Just now' }
          ]
        };
      }
      return post;
    }));
    setCommentText('');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      {/* Full-Size Editorial Carousel Header with Locked High-Contrast HUD Card */}
      <div className={styles.carouselContainer}>
        {CAROUSEL_SLIDES.map((slide, idx) => (
          <div 
            key={idx} 
            className={`${styles.slide} ${idx === activeSlide ? styles.activeSlide : ''}`}
          >
            <img src={slide.image} className={styles.slideBackground} alt={slide.title} />
            <div className={styles.slideContent}>
              <div className={styles.slideTagline}>{slide.tagline}</div>
              <h1 className={styles.slideTitle}>{slide.title}</h1>
              <p className={styles.slideSubtitle}>{slide.subtitle}</p>
              {slide.showButton && (
                <div>
                  <Link href="/console" className={styles.carouselButton}>
                    TRY OUR TOOL
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Manual Arrow Controls */}
        <button className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`} onClick={handlePrevSlide}>
          &larr;
        </button>
        <button className={`${styles.carouselArrow} ${styles.carouselArrowRight}`} onClick={handleNextSlide}>
          &rarr;
        </button>

        {/* Carousel indicator dots */}
        <div className={styles.carouselDots}>
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button 
              key={idx} 
              className={`${styles.dot} ${idx === activeSlide ? styles.activeDot : ''}`}
              onClick={() => { setActiveSlide(idx); resetTimer(); }}
            />
          ))}
        </div>
      </div>

      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          <div className={styles.visualGrid}>
            
            {/* Left Side: Recent activities on the map (2/3 Column) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              <div className={styles.sectionHeader}>// RECENT MORPHOLOGICAL OBSERVATIONS //</div>
              
              {forumPosts.map((post) => (
                <div key={post.id} className={styles.card}>
                  {/* Post Header */}
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>
                      {post.title}
                    </h3>
                    <span className={styles.cardTime}>
                      {post.time}
                    </span>
                  </div>
                  
                  {/* Author meta */}
                  <div className={styles.authorMeta}>
                    <span className={styles.authorName}>{post.author}</span>
                    <span className={styles.authorRole}>
                      {post.role}
                    </span>
                  </div>

                  {/* Body Text */}
                  <p className={styles.cardText}>
                    {post.text}
                  </p>

                  {/* Replies Ledger */}
                  {post.replies.length > 0 && (
                    <div className={styles.repliesContainer}>
                      <div className={styles.repliesHeader}>
                        // SYSTEM REPLIES LOGGED //
                      </div>
                      
                      {post.replies.map((reply, rIdx) => (
                        <div key={rIdx} className={styles.replyItem}>
                          <div className={styles.replyMeta}>
                            <span className={styles.replyAuthor}>{reply.author}</span>
                            <span className={styles.replyTime}>{reply.time || '1h ago'}</span>
                          </div>
                          <span className={styles.replyText}>{reply.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Write Reply Form */}
                  <form onSubmit={(e) => handlePostComment(e, post.id)} className={styles.replyForm}>
                    <input 
                      type="text" 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Input secure reply text..."
                      className={styles.inputField}
                      required
                    />
                    <button type="submit" className={styles.replySubmitButton}>
                      Reply
                    </button>
                  </form>
                </div>
              ))}
            </div>

            {/* Right Side: Initiative & Reporting Info (1/3 Column) */}
            <div className={styles.sidebar}>
              
              {/* Why This Website Card (Placeholder) */}
              <div className={styles.card}>
                <div className={styles.sectionHeader}>// OUR MISSION & PURPOSE //</div>
                <h3 className={styles.warningTitle} style={{ fontSize: '1.2rem', marginTop: '4px' }}>
                  Why This Website?
                </h3>
                <p className={styles.warningText} style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '0' }}>
                  Placeholder text explaining the core mission of this platform, NGO alliances, and how remote sensing is used to democratize environmental observation. Update this copy manually later.
                </p>
              </div>

              {/* Report Sand Activity Card (Placeholder) */}
              <div className={styles.card}>
                <div className={styles.sectionHeader}>// SECURE CIVIC ADVOCACY //</div>
                <h3 className={styles.warningTitle} style={{ fontSize: '1.2rem', marginTop: '4px' }}>
                  Report Sand Activity
                </h3>
                <p className={styles.warningText} style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '0' }}>
                  Placeholder paragraph explaining the civic coordinate submission workflow. Tells local observers how they can check alerts, verify stockpiles, and submit ground observations. Update this copy manually later.
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


