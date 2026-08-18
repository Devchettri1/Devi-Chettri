import React, { useState } from 'react';
import { LeadSubmission } from '../types';
import { FloatingWhatsAppTrigger } from './booking/FloatingWhatsAppTrigger';
import { BookingModal } from './booking/BookingModal';
import { useWhatsApp } from '../utils/whatsAppContext';

export interface FloatingWhatsAppProps {
  onOpenAIChat?: () => void;
  onLeadCaptured?: (lead: LeadSubmission) => void;
  initialRoute?: string;
  initialVehicle?: string;
  isOpenOverride?: boolean;
  onCloseOverride?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  onOpenAIChat,
  onLeadCaptured,
  initialRoute,
  initialVehicle,
  isOpenOverride,
  onCloseOverride,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { context } = useWhatsApp();

  // Controlled or uncontrolled open state
  const isModalOpen = isOpenOverride !== undefined ? isOpenOverride : internalIsOpen;

  const handleOpen = () => {
    setInternalIsOpen(true);
  };

  const handleClose = () => {
    if (onCloseOverride) {
      onCloseOverride();
    }
    setInternalIsOpen(false);
  };

  // Derive route or vehicle from context if not explicitly provided
  const effectiveRoute = initialRoute || (context.type === 'package' ? context.title : undefined);
  const effectiveVehicle = initialVehicle || (context.type === 'cab' ? context.title : context.vehicle);

  return (
    <>
      {/* Floating Action Trigger Button with Context Awareness */}
      <FloatingWhatsAppTrigger onOpenBookingModal={handleOpen} />

      {/* Enterprise-grade Master Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleClose}
        initialRoute={effectiveRoute}
        initialVehicle={effectiveVehicle}
      />
    </>
  );
};
