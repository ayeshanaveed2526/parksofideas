import React from 'react';

const AnimatedBackground: React.FC = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      background: 'linear-gradient(145deg, #fce8e7ff 0%, #f4e4dfff 35%, #d2eaeaff 65%, #eaf3f4 100%)',
    }}
  />
);

export default AnimatedBackground;
