
import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BannerData } from '@/types/banner';

interface BannerPreviewProps {
  bannerData: BannerData;
}

const BannerPreview = ({ bannerData }: BannerPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = bannerData.width;
    canvas.height = bannerData.height;

    // Create background
    if (bannerData.backgroundImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw background image
        ctx.drawImage(img, 0, 0, bannerData.width, bannerData.height);
        
        // Add overlay
        ctx.fillStyle = bannerData.backgroundColor + '80';
        ctx.fillRect(0, 0, bannerData.width, bannerData.height);
        
        // Add text
        drawText(ctx);
        
        // Download
        const link = document.createElement('a');
        link.download = 'promotional-banner.png';
        link.href = canvas.toDataURL();
        link.click();
      };
      img.src = bannerData.backgroundImage;
    } else {
      // Solid background
      ctx.fillStyle = bannerData.backgroundColor;
      ctx.fillRect(0, 0, bannerData.width, bannerData.height);
      drawText(ctx);
      
      const link = document.createElement('a');
      link.download = 'promotional-banner.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const drawText = (ctx: CanvasRenderingContext2D) => {
    // Title
    ctx.fillStyle = bannerData.titleColor;
    ctx.font = `bold ${bannerData.titleSize}px ${bannerData.titleFont}`;
    ctx.textAlign = 'left';
    ctx.fillText(
      bannerData.title,
      (bannerData.titlePosition.x / 100) * bannerData.width,
      (bannerData.titlePosition.y / 100) * bannerData.height
    );

    // Subtitle
    ctx.fillStyle = bannerData.subtitleColor;
    ctx.font = `${bannerData.subtitleSize}px ${bannerData.subtitleFont}`;
    ctx.fillText(
      bannerData.subtitle,
      (bannerData.subtitlePosition.x / 100) * bannerData.width,
      (bannerData.subtitlePosition.y / 100) * bannerData.height
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Preview</h2>
        <Button onClick={downloadBanner} className="flex items-center gap-2">
          <Download size={16} />
          Download Banner
        </Button>
      </div>
      
      <div className="relative border-2 border-slate-200 rounded-lg overflow-hidden">
        <div
          className="relative flex items-center justify-center"
          style={{
            width: '100%',
            aspectRatio: `${bannerData.width}/${bannerData.height}`,
            backgroundColor: bannerData.backgroundColor,
            backgroundImage: bannerData.backgroundImage ? `url(${bannerData.backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: bannerData.backgroundColor + '80' }}
          />
          
          {/* Title */}
          <div
            className="absolute font-bold leading-tight"
            style={{
              left: `${bannerData.titlePosition.x}%`,
              top: `${bannerData.titlePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              color: bannerData.titleColor,
              fontSize: `${Math.max(bannerData.titleSize * 0.6, 16)}px`,
              fontFamily: bannerData.titleFont,
            }}
          >
            {bannerData.title}
          </div>
          
          {/* Subtitle */}
          <div
            className="absolute leading-tight"
            style={{
              left: `${bannerData.subtitlePosition.x}%`,
              top: `${bannerData.subtitlePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              color: bannerData.subtitleColor,
              fontSize: `${Math.max(bannerData.subtitleSize * 0.6, 12)}px`,
              fontFamily: bannerData.subtitleFont,
            }}
          >
            {bannerData.subtitle}
          </div>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default BannerPreview;
