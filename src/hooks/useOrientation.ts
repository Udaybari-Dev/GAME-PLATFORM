import { useState, useEffect } from 'react';

export type OrientationType = 'portrait' | 'landscape';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>('portrait');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
      
      // Check if it's a mobile device and force portrait, but allow desktop in any orientation
      const isMobile = window.innerWidth < 768; // mobile breakpoint
      if (isMobile) {
        setIsSupported(isPortrait);
      } else {
        setIsSupported(true); // Desktop always supported
      }
    };

    checkOrientation();
    
    const handleResize = () => {
      checkOrientation();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return { orientation, isSupported };
};