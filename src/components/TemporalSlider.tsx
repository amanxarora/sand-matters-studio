import React, { useState, useRef, useEffect } from 'react';
import styles from './TemporalSlider.module.css';

interface TemporalSliderProps {
  imageBefore: string;
  imageAfter: string;
}

const TemporalSlider: React.FC<TemporalSliderProps> = ({ imageBefore, imageAfter }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      <div className={styles.imageBefore} style={{ backgroundImage: `url(${imageBefore})` }}></div>
      <div 
        className={styles.imageAfter} 
        style={{ 
          backgroundImage: `url(${imageAfter})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      ></div>
      
      <div 
        className={styles.sliderLine} 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={styles.sliderHandle}>
          <div className={styles.sliderHandleLine}></div>
          <div className={styles.sliderHandleLine}></div>
        </div>
      </div>

      <div className={styles.labelBefore}>1987</div>
      <div className={styles.labelAfter}>2026</div>
    </div>
  );
};

export default TemporalSlider;
