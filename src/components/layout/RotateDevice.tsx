import React from 'react';
import { RotateCcw } from 'lucide-react';

const RotateDevice = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center p-8 max-w-sm mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
            <RotateCcw size={48} className="text-primary animate-pulse" />
          </div>
        </div>
        
        <h2 className="font-orbitron font-bold text-2xl mb-4 text-gradient-primary">
          Rotate Your Device
        </h2>
        
        <p className="text-muted-foreground mb-6">
          This game works best in portrait mode. Please rotate your device for the optimal gaming experience.
        </p>
        
        <div className="text-xs text-muted-foreground">
          Tip: Turn on auto-rotation in your device settings
        </div>
      </div>
    </div>
  );
};

export default RotateDevice;