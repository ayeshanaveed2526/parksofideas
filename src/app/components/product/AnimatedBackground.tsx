import React from 'react';

const AnimatedBackground: React.FC = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      background: 'linear-gradient(145deg, #faeae8 0%, #fdf8f6 35%, #f5f9f9 65%, #eaf3f4 100%)',
    }}
  />
);

export default AnimatedBackground;
