import React from 'react';

// 8-bit pixel art icons for Frikisys
// Each icon is a 16x16 or 32x32 pixel grid rendered as SVG

interface PixelIconProps {
  name: string;
  size?: number;
  color?: string;
}

const PixelIcon: React.FC<PixelIconProps> = ({ name, size = 24, color = '#6b7280' }) => {
  const renderIcon = () => {
    switch (name) {
      case 'terminal':
        // 8-bit terminal icon (16x16 grid, 2px per pixel = 32x32 viewbox)
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="4" y="4" width="24" height="24" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="8" y="10" width="4" height="2" fill={color}/>
            <rect x="14" y="10" width="4" height="2" fill={color}/>
            <rect x="20" y="10" width="4" height="2" fill={color}/>
            <rect x="8" y="14" width="12" height="2" fill={color} opacity="0.6"/>
            <rect x="8" y="18" width="6" height="2" fill={color} opacity="0.6"/>
            <rect x="16" y="18" width="2" height="2" fill={color}/>
            <rect x="20" y="18" width="4" height="2" fill={color}/>
          </svg>
        );
      
      case 'server':
        // 8-bit server icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="4" y="4" width="24" height="6" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="4" y="13" width="24" height="6" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="4" y="22" width="24" height="6" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="8" y="6" width="2" height="2" fill="#22c55e"/>
            <rect x="8" y="15" width="2" height="2" fill="#22c55e"/>
            <rect x="8" y="24" width="2" height="2" fill="#22c55e"/>
            <rect x="12" y="6" width="4" height="2" fill={color} opacity="0.6"/>
            <rect x="12" y="15" width="4" height="2" fill={color} opacity="0.6"/>
            <rect x="12" y="24" width="4" height="2" fill={color} opacity="0.6"/>
          </svg>
        );
      
      case 'shield':
        // 8-bit shield icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <path d="M16 4 L26 8 L26 16 L26 22 L16 28 L6 22 L6 16 L6 8 Z" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="12" y="12" width="8" height="2" fill={color}/>
            <rect x="14" y="14" width="4" height="6" fill={color}/>
            <rect x="10" y="16" width="4" height="2" fill={color}/>
            <rect x="18" y="16" width="4" height="2" fill={color}/>
          </svg>
        );
      
      case 'database':
        // 8-bit database icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <ellipse cx="16" cy="8" rx="10" ry="4" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="6" y="8" width="20" height="16" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <ellipse cx="16" cy="24" rx="10" ry="4" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <ellipse cx="16" cy="12" rx="6" ry="2" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
            <ellipse cx="16" cy="16" rx="6" ry="2" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
            <ellipse cx="16" cy="20" rx="6" ry="2" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
          </svg>
        );
      
      case 'cloud':
        // 8-bit cloud icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="8" y="16" width="16" height="8" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="12" y="12" width="12" height="8" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="16" y="8" width="8" height="8" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="10" y="18" width="2" height="2" fill={color} opacity="0.6"/>
            <rect x="14" y="14" width="2" height="2" fill={color} opacity="0.6"/>
            <rect x="18" y="10" width="2" height="2" fill={color} opacity="0.6"/>
            <rect x="20" y="22" width="2" height="4" fill={color}/>
          </svg>
        );
      
      case 'network':
        // 8-bit network/globe icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <circle cx="16" cy="16" r="12" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="4" y="15" width="24" height="2" fill={color}/>
            <rect x="15" y="4" width="2" height="24" fill={color}/>
            <ellipse cx="16" cy="16" rx="8" ry="4" fill="none" stroke={color} strokeWidth="2"/>
            <rect x="14" y="6" width="4" height="2" fill={color} opacity="0.6"/>
            <rect x="14" y="24" width="4" height="2" fill={color} opacity="0.6"/>
          </svg>
        );
      
      case 'book':
        // 8-bit book/wiki icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="4" y="6" width="24" height="20" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="8" y="10" width="16" height="2" fill={color}/>
            <rect x="8" y="14" width="12" height="2" fill={color} opacity="0.6"/>
            <rect x="8" y="18" width="14" height="2" fill={color} opacity="0.6"/>
            <rect x="8" y="22" width="10" height="2" fill={color} opacity="0.6"/>
            <rect x="16" y="6" width="2" height="20" fill={color}/>
          </svg>
        );
      
      case 'code':
        // 8-bit code brackets icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="6" y="6" width="4" height="20" fill={color}/>
            <rect x="6" y="6" width="8" height="4" fill={color}/>
            <rect x="6" y="22" width="8" height="4" fill={color}/>
            <rect x="22" y="6" width="4" height="20" fill={color}/>
            <rect x="18" y="6" width="8" height="4" fill={color}/>
            <rect x="18" y="22" width="8" height="4" fill={color}/>
            <rect x="14" y="14" width="4" height="4" fill={color}/>
            <rect x="10" y="10" width="4" height="4" fill={color} opacity="0.6"/>
            <rect x="18" y="18" width="4" height="4" fill={color} opacity="0.6"/>
          </svg>
        );
      
      case 'heart':
        // 8-bit heart icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <path d="M16 28 L6 18 C2 14 2 8 6 6 C10 4 14 6 16 10 C18 6 22 4 26 6 C30 8 30 14 26 18 Z" fill={color}/>
            <rect x="10" y="10" width="4" height="4" fill="#fff" opacity="0.3"/>
          </svg>
        );
      
      case 'star':
        // 8-bit star icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="14" y="2" width="4" height="6" fill={color}/>
            <rect x="14" y="24" width="4" height="6" fill={color}/>
            <rect x="2" y="14" width="6" height="4" fill={color}/>
            <rect x="24" y="14" width="6" height="4" fill={color}/>
            <rect x="6" y="6" width="4" height="4" fill={color}/>
            <rect x="22" y="6" width="4" height="4" fill={color}/>
            <rect x="6" y="22" width="4" height="4" fill={color}/>
            <rect x="22" y="22" width="4" height="4" fill={color}/>
            <rect x="10" y="10" width="12" height="12" fill={color}/>
            <rect x="12" y="12" width="8" height="8" fill="#fff" opacity="0.2"/>
          </svg>
        );
      
      case 'fire':
        // 8-bit fire icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="12" y="2" width="8" height="4" fill={color}/>
            <rect x="10" y="6" width="12" height="4" fill={color}/>
            <rect x="8" y="10" width="16" height="4" fill={color}/>
            <rect x="10" y="14" width="12" height="4" fill={color}/>
            <rect x="12" y="18" width="8" height="4" fill={color}/>
            <rect x="14" y="22" width="4" height="4" fill={color}/>
            <rect x="14" y="26" width="4" height="4" fill={color}/>
            <rect x="10" y="14" width="4" height="4" fill="#f59e0b"/>
            <rect x="12" y="18" width="4" height="4" fill="#f59e0b"/>
            <rect x="14" y="22" width="4" height="4" fill="#ef4444"/>
          </svg>
        );
      
      case 'robot':
        // 8-bit robot/AI icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="8" y="8" width="16" height="12" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="10" y="20" width="12" height="8" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="6" y="12" width="4" height="4" fill={color}/>
            <rect x="22" y="12" width="4" height="4" fill={color}/>
            <rect x="10" y="4" width="4" height="4" fill={color}/>
            <rect x="18" y="4" width="4" height="4" fill={color}/>
            <rect x="12" y="6" width="2" height="2" fill={color}/>
            <rect x="18" y="6" width="2" height="2" fill={color}/>
            <rect x="11" y="12" width="4" height="4" fill="#3b82f6"/>
            <rect x="17" y="12" width="4" height="4" fill="#3b82f6"/>
            <rect x="14" y="16" width="4" height="2" fill={color}/>
            <rect x="12" y="22" width="2" height="4" fill={color}/>
            <rect x="18" y="22" width="2" height="4" fill={color}/>
          </svg>
        );
      
      case 'lightning':
        // 8-bit lightning bolt icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="18" y="2" width="6" height="4" fill={color}/>
            <rect x="10" y="6" width="14" height="4" fill={color}/>
            <rect x="8" y="10" width="12" height="4" fill={color}/>
            <rect x="6" y="14" width="10" height="4" fill={color}/>
            <rect x="4" y="18" width="8" height="4" fill={color}/>
            <rect x="12" y="18" width="6" height="4" fill={color}/>
            <rect x="18" y="18" width="6" height="4" fill={color}/>
            <rect x="14" y="22" width="6" height="4" fill={color}/>
            <rect x="10" y="26" width="6" height="4" fill={color}/>
            <rect x="8" y="10" width="4" height="4" fill="#fbbf24"/>
            <rect x="12" y="14" width="4" height="4" fill="#fbbf24"/>
          </svg>
        );
      
      case 'question':
        // 8-bit question mark icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="12" y="4" width="8" height="4" fill={color}/>
            <rect x="10" y="8" width="12" height="4" fill={color}/>
            <rect x="12" y="12" width="8" height="4" fill={color}/>
            <rect x="14" y="16" width="4" height="4" fill={color}/>
            <rect x="14" y="24" width="4" height="4" fill={color}/>
            <rect x="10" y="8" width="4" height="4" fill="#fff" opacity="0.2"/>
          </svg>
        );
      
      case 'lock':
        // 8-bit lock icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="8" y="14" width="16" height="12" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <path d="M10 14 L10 10 C10 6 14 4 16 4 C18 4 22 6 22 10 L22 14" fill="none" stroke={color} strokeWidth="4"/>
            <rect x="14" y="18" width="4" height="6" fill={color}/>
            <rect x="12" y="20" width="2" height="2" fill="#fff" opacity="0.3"/>
          </svg>
        );
      
      case 'document':
        // 8-bit document icon
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="6" y="2" width="20" height="28" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <polygon points="18,2 26,10 18,10" fill={color} opacity="0.5"/>
            <rect x="10" y="14" width="12" height="2" fill={color}/>
            <rect x="10" y="18" width="10" height="2" fill={color} opacity="0.6"/>
            <rect x="10" y="22" width="8" height="2" fill={color} opacity="0.6"/>
          </svg>
        );
      
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="4" y="4" width="24" height="24" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="10" y="10" width="12" height="2" fill={color}/>
            <rect x="10" y="14" width="8" height="2" fill={color} opacity="0.6"/>
            <rect x="10" y="18" width="10" height="2" fill={color} opacity="0.6"/>
          </svg>
        );
    }
  };

  return <div className="inline-block">{renderIcon()}</div>;
};

export default PixelIcon;