import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface CopyButtonIconProps {
  onCopy: () => void;
  size?: number;
}

export const CopyButtonIcon = ({ onCopy, size = 18 }: CopyButtonIconProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      onClick={handleClick}
      className="relative inline-flex items-center justify-center cursor-pointer"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: copied ? 0 : 1,
          transform: copied ? 'scale(0.6)' : 'scale(1)',
          transition: 'opacity 150ms, transform 150ms'
        }}
      >
        <Icon name="Copy" size={size} />
      </span>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: copied ? 1 : 0,
          transform: copied ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 400ms 150ms, transform 400ms 150ms'
        }}
      >
        <Icon name="Check" size={size} className="text-green-500" />
      </span>
    </span>
  );
};