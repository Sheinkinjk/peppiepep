'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Download, QrCode } from 'lucide-react';

interface QRCodeGeneratorProps {
  url: string;
  fileName?: string;
}

export default function QRCodeGenerator({ url, fileName = 'qr-code' }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (showQR && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [showQR, url]);

  const handleDownloadPNG = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleDownloadSVG = async () => {
    try {
      const svg = await QRCode.toString(url, {
        type: 'svg',
        width: 300,
        margin: 2,
      });
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const link = document.createElement('a');
      link.download = `${fileName}.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();
    } catch (error) {
      console.error('Error generating SVG:', error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setShowQR(!showQR)}
        variant="outline"
        className="w-full border-purple-300 hover:bg-purple-50"
      >
        <QrCode className="mr-2 h-4 w-4" />
        {showQR ? 'Hide QR Code' : 'Show QR Code'}
      </Button>

      {showQR && (
        <div className="mt-4 space-y-4 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-center">
            <canvas ref={canvasRef} className="rounded-lg border-4 border-white shadow-lg" />
          </div>

          <div className="space-y-2">
            <p className="text-center text-xs text-gray-600">
              Download and print for in-store displays
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleDownloadPNG}
                size="sm"
                variant="outline"
                className="w-full"
              >
                <Download className="mr-2 h-3 w-3" />
                PNG
              </Button>
              <Button
                onClick={handleDownloadSVG}
                size="sm"
                variant="outline"
                className="w-full"
              >
                <Download className="mr-2 h-3 w-3" />
                SVG
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
