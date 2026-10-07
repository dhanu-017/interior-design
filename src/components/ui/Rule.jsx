import React from 'react';

export function Rule({ className = '' }) {
  return <div className={`rule ${className}`} role="presentation" />;
}

export default Rule;
