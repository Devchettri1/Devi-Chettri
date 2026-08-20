import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Share2, ExternalLink, Smartphone } from 'lucide-react';
import { OptimizedImage } from '../ui/OptimizedImage';

interface QRShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: {
    title: string;
    text: string;
    url: string;
  };
}

export const QRShareModal: React.FC<QRShareModalProps> = ({
  isOpen,
  onClose,
  shareData,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareData.url);
  // Free high-contrast QR code image endpoint
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedUrl}&color=0A1128&bgcolor=FFFFFF&margin=1`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0A1128] border border-cyan-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl z-10 text-center space-y-4 text-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-slate-100">Share Itinerary via QR</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Scan with your phone camera or share with co-travelers & family to view this customized itinerary.
        </p>

        {/* QR Code Container */}
        <div className="p-3 bg-white rounded-2xl inline-block shadow-lg mx-auto">
          <OptimizedImage
            src={qrImageUrl}
            alt="OffbeatDestination QR Code"
            className="w-48 h-48 object-contain rounded-lg mx-auto"
          />
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-1 text-xs">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Copy Direct Itinerary Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Open Native Share Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
