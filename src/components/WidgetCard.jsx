import React from 'react';

export const WidgetCard = ({ children, className = '', onClick, glowColor }) => {
  const glowClass = glowColor ? `glow-${glowColor}` : '';
  return (
    <div 
      className={`widget-wrapper ${className}`}
      style={{ cursor: onClick ? 'pointer' : 'default', height: '100%' }}
      onClick={onClick}
    >
      <div className={`glass-panel ${glowClass}`} style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};
