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
    subtitle: "Sand and gravel represent the single most extracted solid materials on Earth, second only to water in global consumption volume. Humanity currently extracts between 40 and 50 billion metric tonnes of sand annually—a rate that has tripled over the past two decades, driven by exponential rates of urbanization, industrial concrete production, infrastructure development, and coastal land reclamation. This relentless demand outpaces the natural geological replenishment rate of riverine and marine deposition systems, precipitating a structural global sand deficit and fueling unregulated, destructive dredging operations across vulnerable river basins.",
    image: "/images/slide_one_bg.png"
  },
  {
    tagline: "FACT 2: LANDSCAPE COLLAPSE",
    title: "Fact 2: Severe Riverbank Erosion",
    subtitle: "Unregulated instream sand mining triggers systemic hydrological and ecological collapse within riparian ecosystems. Mechanical dredging strips riverbeds of their sediment layers, causing severe channel incision, bed lowering, and rapid degradation of riverbanks. In critical water systems like the Krishna River basin and the Dwarakeshwar River quadrants, this uncontrolled dredging destabilizes riverbanks, destroying vital agricultural land, inducing structural collapse of municipal infrastructure, and obliterating benthic habitats. The destruction of these riparian zones severely reduces aquatic biodiversity, impairs groundwater recharge capacity, and increases vulnerability to catastrophic flood events during monsoon cycles.",
    image: "/images/slide_two_bg.png"
  },
  {
    tagline: "GEOSPATIAL INTERVENTION TOOL",
    title: "Interactive Sand Mining Console",
    subtitle: "The Sand Matters Studio console democratizes spatial intelligence by giving advocates, researchers, and regulatory bodies direct access to cloud-processed satellite telemetry. Powered by Google Earth Engine, our interface synthesizes multi-spectral imagery from Sentinel-2 and Landsat 8-9, calculating localized surface dynamics through Normalized Difference Vegetation Index (NDVI), Bare Soil Index (BSI), and Modified Normalized Difference Water Index (MNDWI) profiles. This telemetry is integrated with a custom PyTorch YOLOv8 object detection model, which scans spatial tiles in real time to isolate heavy excavation machinery, extraction barges, stockpiles, and illegal access roads with high-confidence bounding box vector layers.",
    image: "/images/slide_three_bg.png"
  }
];

const MOCK_FORUM_POSTS = [
  {
    id: 1,
    title: 'Telemetry Anomaly #001: Instream Dredging in Dwarakeshwar Basin',
    author: 'OBSERVER_#1024',
    role: 'Civic Warden',
    time: '2 hours ago',
    text: 'Manual coordinate lock established at Dwarakeshwar River Basin (Sector West Bengal, Coordinates: 22.9814° N, 87.3195° E). Local observers reported multiple unauthorized suction pumps active during nocturnal hours on May 28, 2026. A cross-reference of the Sentinel-2 pass from May 30, 2026, shows a distinct Bare Soil Index (BSI) spike to +0.48 within the riparian buffer, alongside an MNDWI water surface expansion of 14 meters, suggesting illegal channelization.',
    replies: [
      { 
        author: 'GROUND_VAL_#082', 
        text: 'Ground validation team successfully established a visual checkpoint at Coordinates: 22.9818° N, 87.3201° E on May 31, 2026. Handheld geotagged photography confirms three high-capacity suction pumps anchored to a temporary jetty. Local soil compaction and severe undercut riverbanks are visible. Photogrammetric evidence has been uploaded to Supabase node repository.', 
        time: '1 hour ago' 
      },
      { 
        author: 'LEGAL_ADVOCACY_#521', 
        text: 'I have integrated the May 30 GEE reflectance delta and GROUND_VAL_#082\'s field photography into a chronological evidentiary folder. The BSI spike from -0.15 to +0.48 indicates substantial topsoil disturbance over a 72-hour window. This matches legal thresholds under the Environmental Protection Act, 1986. A formal notice is being drafted for the District Environmental Impact Assessment Authority (DEIAA).', 
        time: '30m ago' 
      }
    ]
  },
  {
    id: 2,
    title: 'Telemetry Anomaly #002: Riparian Canopy Stripping on Krishna River',
    author: 'OBSERVER_#3942',
    role: 'Satellite Operator',
    time: '12 hours ago',
    text: 'Algorithmic alert triggered for Krishna River Quadrant (Sector Andhra Pradesh, Coordinates: 16.5742° N, 80.3519° E). Our automated processing pipeline registered a severe NDVI drop from +0.62 to +0.18 within the protected riverbank sanctuary. The anomaly spans a 1.2-hectare zone, indicative of rapid vegetation clearance to establish heavy machinery access roads.',
    replies: [
      { 
        author: 'RESEARCH_GEOSPATIAL_#99', 
        text: 'Temporal analysis of the sector using Sentinel-2 L2A historical bands confirms this road footprint was cut between the orbit passes of May 24 and May 29, 2026. The high BSI density (+0.55) along the access corridor suggests complete clearing of Acacia Nilotica stands. This increases local bank erosion risk by an estimated 280% ahead of the upcoming monsoon surge.', 
        time: '8 hours ago' 
      }
    ]
  },
  {
    id: 3,
    title: 'Telemetry Anomaly #003: Channel Diversion & Sand Stockpiling near Dwarkeshwar',
    author: 'OBSERVER_#5A3F',
    role: 'Hydrology Analyst',
    time: '18 hours ago',
    text: 'Sentinel-2 spectral contrast analysis identifies severe channel morphological deviation at Coordinates: 23.0145° N, 87.4589° E near Arambagh. MNDWI index maps delineate a newly carved bypass channel which diverts the river\'s main flow around a central sand spit. This spit is currently being utilized as an active stockpile staging ground, visible as a 200-meter-wide high-albedo bare soil cluster.',
    replies: [
      { 
        author: 'GROUND_VAL_#902', 
        text: 'Confirmed. Local community members report a fleet of 14 multi-axle haul trucks active at this spit location. Bypassing the main river flow has led to acute stagnation and silt accumulation in the downstream agrarian channels. Agricultural water intake ports are completely blocked as of May 30, 2026.', 
        time: '14 hours ago' 
      },
      { 
        author: 'CIVIC_OBSERVER_#104', 
        text: 'We have cross-referenced the coordinates with the local mining lease registry. No valid leases exist for Arambagh Sector Coordinates: 23.0145° N, 87.4589° E. The channel diversion constitutes an illegal diversion of a public watercourse under the State Rivers Act. Filed a formal grievance report with the State Pollution Control Board containing this telemetry package.', 
        time: '10 hours ago' 
      }
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
              <div className={styles.sectionHeader}>RECENT MORPHOLOGICAL OBSERVATIONS</div>
              
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
                        SYSTEM REPLIES LOGGED
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
              
              {/* Why This Website Card (Telemetry & Mission) */}
              <div className={styles.card}>
                <div className={styles.sectionHeader}>OUR MISSION & PURPOSE</div>
                <h3 className={styles.warningTitle} style={{ fontSize: '1.2rem', marginTop: '4px' }}>
                  Why This Website?
                </h3>
                <p className={styles.warningText} style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: 'var(--spacing-4)' }}>
                  Sand Matters Studio was established to bridge the critical gap between localized environmental destruction and institutional enforcement inertia. Traditional regulatory monitoring of sand extraction is often hindered by remote geolocations, resource constraints, and bureaucratic delays. By democratizing high-fidelity satellite telemetry and automation pipelines, this open-source node equips civic defenders with objective, empirical evidence. Utilizing predictable Sentinel-2 and Landsat orbital schedules, we convert raw spectral reflectance data into auditable temporal records, enabling community leaders and investigative journalists to validate environmental complaints, expose unregulated extraction hotspots, and force accountability through undeniable geospatial proof.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <Link href="/console" className={styles.button} style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}>
                    Try Our Tool
                  </Link>
                </div>
              </div>

              {/* Report Sand Activity Card (Secure Civic Submission) */}
              <div className={styles.card}>
                <div className={styles.sectionHeader}>SECURE CIVIC ADVOCACY</div>
                <h3 className={styles.warningTitle} style={{ fontSize: '1.2rem', marginTop: '4px' }}>
                  Report Sand Activity
                </h3>
                <p className={styles.warningText} style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: 'var(--spacing-4)' }}>
                  Protecting riverine corridors requires immediate local coordination and crowdsourced ground-truth verification. Local observers, citizen scientists, and environmental wardens can submit specific decimal coordinate points of suspected mining activity, supplemented by geotagged, time-stamped mobile photography. Upon submission, our backend automatically registers these points as Regions of Interest (ROIs), triggering an immediate spectral audit of historical and recent satellite imagery. By calculating localized Bare Soil Index (BSI) and MNDWI water boundary shifts over the specified coordinate quadrants, the system generates a standardized, chronological evidentiary dossier ready for local legal advocacy and public disclosure.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <Link href="/collaboration" className={styles.button} style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}>
                    Report
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


