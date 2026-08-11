import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, X, Bot, User, Check, Phone, ShieldCheck, ChevronDown, RefreshCw, MessageCircle, Compass, Calendar, Sliders, DollarSign, Heart, MapPin, AlertCircle } from 'lucide-react';
import { ChatMessage, GeneratedItinerary } from '../types';
import { AGENCY_DETAILS } from '../data/travelData';
import { GeneratedItineraryCard } from './GeneratedItineraryCard';
import { GovtRegistrationBadge } from './GovtRegistrationBadge';

interface AIChatWidgetProps {
  onLeadCaptured: (leadData: any) => void;
  isFloatingOpen?: boolean;
  onToggleFloating?: () => void;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  onLeadCaptured,
  isFloatingOpen,
  onToggleFloating,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to OffbeatDestination Travels. Planning a trip to Sikkim, Darjeeling, or Bhutan? Tell me your preferred duration, interests, or budget — or click '✨ Build Custom Itinerary' below for a tailored proposal with daily highlights and costs!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showPlannerWizard, setShowPlannerWizard] = useState(false);

  // Custom Itinerary Planner Wizard Form State
  const [wizardDuration, setWizardDuration] = useState('5 Nights / 6 Days');
  const [wizardDestination, setWizardDestination] = useState('Sikkim & Darjeeling');
  const [wizardCompanions, setWizardCompanions] = useState('Couple / Honeymoon');
  const [wizardBudget, setWizardBudget] = useState('Premium 3★/4★');
  const [wizardInterests, setWizardInterests] = useState<string[]>(['Offbeat Hidden Gems', 'Culture & Monasteries']);
  const [wizardTravelers, setWizardTravelers] = useState('2');
  const [wizardVegMeals, setWizardVegMeals] = useState(false);

  // Lead Form State inside Chat
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadDates, setLeadDates] = useState('');
  const [leadTravelers, setLeadTravelers] = useState('2');
  const [leadPackage, setLeadPackage] = useState('5N/6D Sikkim & Darjeeling');
  const [leadSuccess, setLeadSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showLeadForm, showPlannerWizard]);

  const toggleInterest = (interest: string) => {
    setWizardInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerateItineraryFromWizard = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPlannerWizard(false);
    setIsLoading(true);

    const userPromptText = `✨ Please generate a custom itinerary for ${wizardDuration} (${wizardDestination}) for ${wizardTravelers} travelers (${wizardCompanions}). Interests: ${wizardInterests.join(', ')}. Budget: ${wizardBudget}. Pure Veg Meals: ${wizardVegMeals ? 'YES' : 'Standard'}.`;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userPromptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration: wizardDuration,
          destination: wizardDestination,
          companions: wizardCompanions,
          interests: wizardInterests,
          budget: wizardBudget,
          travelers: wizardTravelers,
          vegMeals: wizardVegMeals,
        }),
      });

      const itineraryData: GeneratedItinerary = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-itinerary-${Date.now()}`,
        sender: 'bot',
        text: `Namaste! 🙏 Here is your 100% personalized itinerary for *${itineraryData.title}*. It features a 50/50 blend of popular landmarks and offbeat hidden gems, plus guaranteed permit compliance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        itineraryData: itineraryData,
        isLeadPrompt: true,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Wizard itinerary generation error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: "Namaste! 🙏 I've prepared a custom package for you. Drop your WhatsApp number below and our Gangtok coordinator will send you the full PDF plan!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLeadPrompt: true,
        },
      ]);
      setShowLeadForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    const lowerText = text.toLowerCase();
    const isItineraryRequest = lowerText.includes('itinerary') || lowerText.includes('plan') || lowerText.includes('custom') || lowerText.includes('days trip') || lowerText.includes('day trip') || lowerText.includes('tour package') || lowerText.includes('north sikkim');

    try {
      if (isItineraryRequest) {
        // Fetch structured itinerary from endpoint
        const response = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            duration: text.match(/(\d+)\s*days?/i) ? `${text.match(/(\d+)\s*days?/i)![1]} Days` : '5 Nights / 6 Days',
            destination: text,
            companions: 'Couple / Family',
            interests: ['Popular Tourist Highlights', 'Offbeat Hidden Gems'],
            budget: 'Premium 3★/4★',
            travelers: 2,
            vegMeals: lowerText.includes('veg') || lowerText.includes('jain')
          }),
        });

        const itineraryData: GeneratedItinerary = await response.json();

        const botMsg: ChatMessage = {
          id: `bot-itinerary-${Date.now()}`,
          sender: 'bot',
          text: `Namaste! 🙏 I've designed a custom itinerary proposal based on your request. You can view the full day-by-day highlights below and download the formatted PDF file anytime!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          itineraryData: itineraryData,
          isLeadPrompt: true,
        };

        setMessages((prev) => [...prev, botMsg]);
      } else {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversationHistory: messages,
          }),
        });

        const data = await response.json();
        const botReply = data.reply || "Namaste! I'll be glad to send you the details on WhatsApp. Please share your WhatsApp number below.";

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLeadPrompt: botReply.toLowerCase().includes('whatsapp') || botReply.toLowerCase().includes('phone number') || botReply.toLowerCase().includes('lock in'),
        };

        setMessages((prev) => [...prev, botMsg]);

        if (botReply.toLowerCase().includes('whatsapp') || botReply.toLowerCase().includes('number')) {
          setTimeout(() => {
            setShowLeadForm(true);
          }, 1200);
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: "Namaste! 🙏 Our Sikkim trip advisors are available right now. Please drop your WhatsApp number below to receive instant itinerary options!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLeadPrompt: true,
        },
      ]);
      setShowLeadForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: leadName,
          whatsappNumber: leadPhone,
          travelDates: leadDates || 'Flexible dates',
          travelersCount: Number(leadTravelers) || 2,
          packageOrRoute: leadPackage,
          notes: 'Captured via AI Selling Engine Chatbot',
        }),
      });

      const data = await response.json();
      setLeadSuccess(true);
      if (data.lead) {
        onLeadCaptured(data.lead);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'bot',
          text: `🎉 Thank you ${leadName}! Your travel inquiry has been received by our Gangtok team. We have sent a confirmation message to ${leadPhone}. Our coordinator will contact you in a few minutes with your customized PDF itinerary!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      setTimeout(() => {
        setShowLeadForm(false);
        setLeadSuccess(false);
      }, 4000);
    } catch (err) {
      console.error('Lead submit error:', err);
      alert('Inquiry recorded. Thank you!');
    }
  };

  const quickPrompts = [
    "5N/6D Sikkim & Darjeeling Package",
    "North Sikkim Zero Point Permit Cost",
    "Innova Crysta NJP Pickup Rates",
    "Pure Vegetarian Food Options"
  ];

  return (
    <div className="bg-slate-900 border border-emerald-800/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[560px] max-w-2xl mx-auto my-6">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-4 border-b border-emerald-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-sm">Offbeat AI Sales Assistant</h3>
              <span className="bg-emerald-900/90 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-700">
                24/7 Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trained on Sikkim routes, permits, vehicles & 4.9★ reviews
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPlannerWizard(!showPlannerWizard)}
            className="px-2.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5"
            title="Create Tailored Tour Plan"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Build Custom Itinerary</span>
            <span className="sm:hidden">Planner</span>
          </button>

          <button
            onClick={() => {
              setMessages([
                {
                  id: 'welcome-1',
                  sender: 'bot',
                  text: "Namaste! 🙏 Welcome to OffbeatDestination Travels. Planning a trip to Sikkim, Darjeeling, or Bhutan? Tell me your preferred duration, interests, or budget — or click '✨ Build Custom Itinerary' above for a tailored proposal with daily highlights and costs!",
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ]);
              setShowLeadForm(false);
              setShowPlannerWizard(false);
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/60">
        {/* Interactive Custom Itinerary Builder Wizard Drawer */}
        {showPlannerWizard && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-500/60 rounded-2xl p-4 shadow-2xl text-xs space-y-3 animate-fadeIn my-2">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-extrabold text-slate-100 text-sm">✨ AI Custom Itinerary Generator</span>
              </div>
              <button
                onClick={() => setShowPlannerWizard(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateItineraryFromWizard} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Duration */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Duration</span>
                  </label>
                  <select
                    value={wizardDuration}
                    onChange={(e) => setWizardDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="3 Nights / 4 Days">3 Nights / 4 Days (Glimpse)</option>
                    <option value="4 Nights / 5 Days">4 Nights / 5 Days (Standard)</option>
                    <option value="5 Nights / 6 Days">5 Nights / 6 Days (Most Popular)</option>
                    <option value="6 Nights / 7 Days">6 Nights / 7 Days (Comprehensive)</option>
                    <option value="7 Nights / 8 Days">7 Nights / 8 Days (Grand Expedition)</option>
                    <option value="9 Nights / 10 Days">9 Nights / 10 Days (Sikkim + Bhutan)</option>
                  </select>
                </div>

                {/* Destination / Circuit */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Target Region</span>
                  </label>
                  <select
                    value={wizardDestination}
                    onChange={(e) => setWizardDestination(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Sikkim & Darjeeling">Sikkim & Darjeeling Blend</option>
                    <option value="North Sikkim (Lachung, Yumthang & Zero Point)">North Sikkim (Mandatory 2-Night Lachung Stay)</option>
                    <option value="South & West Sikkim (Pelling Skywalk & Ravangla)">South & West Sikkim Offbeat</option>
                    <option value="Old Silk Route (Zuluk, Nathang Valley & Reshi)">Old Silk Route Zuluk Circuit</option>
                    <option value="Bhutan Cultural Odyssey">Bhutan Cultural Odyssey</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Companions */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Travel Companions</span>
                  </label>
                  <select
                    value={wizardCompanions}
                    onChange={(e) => setWizardCompanions(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Couple / Honeymoon">Couple / Honeymoon</option>
                    <option value="Family with Kids">Family with Kids</option>
                    <option value="Family with Senior Citizens">Family with Senior Citizens</option>
                    <option value="Group of Friends / Adventure">Group of Friends</option>
                    <option value="Solo Traveler">Solo Traveler</option>
                  </select>
                </div>

                {/* Budget Tier */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    <span>Budget Category</span>
                  </label>
                  <select
                    value={wizardBudget}
                    onChange={(e) => setWizardBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Budget Deluxe (Clean Deluxe Stays)">Budget Deluxe (Clean Stays / Homestays)</option>
                    <option value="Premium 3★/4★ (Summit & Udaan Hotels)">Premium 3★/4★ (Summit, Udaan, Rufina)</option>
                    <option value="Ultra Luxury 5★ (Mayfair & Elgin Heritage)">Ultra Luxury 5★ (Mayfair & Elgin)</option>
                  </select>
                </div>
              </div>

              {/* Interests Multi-Select Chips */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>Primary Interests (Select Multiple)</span>
                </label>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {[
                    'Offbeat Hidden Gems',
                    'Popular Tourist Icons',
                    'Adventure & Snow',
                    'Culture & Monasteries',
                    'Tea Gardens & Nature',
                    'Photography & Views',
                    'Relaxation & Slow Pace'
                  ].map((interest) => {
                    const isSelected = wizardInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/80 font-bold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Veg Meal Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="wizardVeg"
                  checked={wizardVegMeals}
                  onChange={(e) => setWizardVegMeals(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-500 bg-slate-950 border-slate-700"
                />
                <label htmlFor="wizardVeg" className="text-slate-300 text-xs font-medium cursor-pointer">
                  Require 100% Pure Veg / Strict Jain Meals (No onion/garlic on request)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Tailored Day-by-Day Itinerary</span>
              </button>
            </form>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
              <div className="w-7 h-7 rounded-full bg-emerald-900/80 border border-emerald-700 flex items-center justify-center text-emerald-300 flex-shrink-0 text-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Render Structured Itinerary Card if present */}
              {msg.itineraryData && (
                <GeneratedItineraryCard
                  itinerary={msg.itineraryData}
                  onRequestWhatsAppQuote={(title) => {
                    setLeadPackage(title);
                    setShowLeadForm(true);
                  }}
                />
              )}

              <div
                className={`text-[10px] mt-1.5 font-medium ${
                  msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-teal-800 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 p-2">
            <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Offbeat AI is analyzing Sikkim routes & generating response...</span>
          </div>
        )}

        {/* Lead Generation Form Drawer inside Chat */}
        {showLeadForm && (
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 border border-emerald-600/60 rounded-2xl p-4 shadow-xl text-xs space-y-3 animate-fadeIn my-2">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-slate-100">Get Instant Discounted Quote & Itinerary PDF</span>
                <GovtRegistrationBadge />
              </div>
              <button
                onClick={() => setShowLeadForm(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {leadSuccess ? (
              <div className="p-3 bg-emerald-900/60 border border-emerald-500/50 rounded-xl text-center space-y-1">
                <Check className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-bold text-emerald-200 text-sm">Quote Request Sent!</p>
                <p className="text-[11px] text-slate-300">
                  Our Gangtok travel expert will ping you on WhatsApp ({leadPhone}) within 5 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">WhatsApp / Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Tentative Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. Oct 10 - Oct 16"
                      value={leadDates}
                      onChange={(e) => setLeadDates(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Interested Route</label>
                    <select
                      value={leadPackage}
                      onChange={(e) => setLeadPackage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="5N/6D Sikkim & Darjeeling">5N/6D Sikkim & Darjeeling Tour</option>
                      <option value="North Sikkim (Lachung/Zero Point)">North Sikkim (Lachung/Zero Point)</option>
                      <option value="South & West Sikkim (Pelling/Ravangla)">South & West Sikkim (Pelling/Ravangla)</option>
                      <option value="Custom Bhutan Cultural Tour">Bhutan Cultural Tour</option>
                      <option value="NJP / Bagdogra Cab Rental">NJP / Bagdogra Innova Crysta Cab</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-extrabold rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Lock Vehicle & Get WhatsApp Quote</span>
                </button>
              </form>
            )}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Question Chips */}
      <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-slate-400 font-medium whitespace-nowrap">Ask AI:</span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700/80 rounded-full whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Footer */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask AI about Sikkim routes, permits, pricing or vehicles..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputMessage.trim()}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
