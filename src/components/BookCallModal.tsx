import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2, Shield, User, Mail, Phone, ArrowRight, X } from 'lucide-react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTopic?: string;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  preselectedTopic = '1-on-1 Legacy Coaching',
}) => {
  const [topic, setTopic] = useState(preselectedTopic);
  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [familyStatus, setFamilyStatus] = useState('Married with children');
  const [primaryGoal, setPrimaryGoal] = useState('Building better family presence & discipline');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const availableDates = [
    { label: 'Tue, Oct 13', value: '2026-10-13' },
    { label: 'Wed, Oct 14', value: '2026-10-14' },
    { label: 'Thu, Oct 15', value: '2026-10-15' },
    { label: 'Fri, Oct 16', value: '2026-10-16' },
    { label: 'Mon, Oct 19', value: '2026-10-19' },
  ];

  const availableTimes = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tonnie Legacy//Discovery Call//EN
BEGIN:VEVENT
SUMMARY:Tonnie Legacy™ Discovery Call with Tonnie
DESCRIPTION:30-minute discovery call to discuss your goals, family leadership, and coaching fit.\\nZoom Meeting: https://zoom.us/j/94827103982
DTSTART:20261014T150000Z
DTEND:20261014T153000Z
LOCATION:Zoom Video Call
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Tonnie-Legacy-Discovery-Call.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F7F1E3] border border-[#C9A96E]/50 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#0B1F3A] px-6 py-4 border-b border-[#C9A96E]/30 flex items-center justify-between text-[#E3CFA0]">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#C9A96E]" />
            <h3 className="font-serif text-xl font-bold text-white tracking-wide">
              Book a Free Discovery Call
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#DDD8C8] hover:text-[#C9A96E] transition-colors rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                Discovery Call Confirmed!
              </h4>
              <p className="text-sm text-[#5B6577] max-w-md mx-auto">
                We have scheduled your 30-minute private consultation with Tonnie on{' '}
                <strong className="text-[#0B1F3A]">{selectedDate}</strong> at{' '}
                <strong className="text-[#0B1F3A]">{selectedTime} (CST)</strong>.
              </p>
            </div>

            <div className="bg-white border border-[#E2D8C0] p-4 rounded text-left max-w-md mx-auto space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm">
                <Video className="w-4 h-4 text-[#C9A96E]" />
                <span>Zoom Meeting Details</span>
              </div>
              <p className="text-[#5B6577]">
                A direct Zoom invitation and calendar link has been sent to{' '}
                <span className="font-semibold text-[#0B1F3A]">{email || 'your email'}</span>.
              </p>
              <div className="p-2 bg-[#F7F1E3] rounded font-mono text-[11px] text-[#13294B] break-all border border-[#CFC5AA]/60">
                https://zoom.us/j/94827103982 (Password: LEGACY)
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadIcs}
                className="px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4 text-[#C9A96E]" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#C9A96E] hover:bg-[#E3CFA0] text-[#0B1F3A] rounded text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <p className="text-xs text-[#5B6577]">
                30 minutes · 100% Free · No sales pressure. We will discuss your current season, identify blind spots, and see if coaching is the right fit.
              </p>
            </div>

            {/* Step 1: Select Topic */}
            <div>
              <label className="text-xs font-semibold text-[#1A2433] block mb-1.5">
                Focus of Discussion
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '1-on-1 Legacy Coaching',
                  'Group Cohort Coaching',
                  'Fatherhood & Marriage Guidance',
                  'General Discovery & Questions',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTopic(item)}
                    className={`px-3 py-2 text-xs font-medium rounded text-left border transition-all cursor-pointer ${
                      topic === item
                        ? 'bg-[#0B1F3A] text-[#E3CFA0] border-[#0B1F3A] shadow-xs'
                        : 'bg-white text-[#1A2433] border-[#CFC5AA] hover:bg-[#E2D8C0]/30'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#1A2433] flex items-center gap-1 mb-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Choose Date (Central Time)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDates.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                        selectedDate === d.value
                          ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-semibold'
                          : 'bg-white text-[#1A2433] border-[#CFC5AA] hover:bg-[#F0E8D5]'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1A2433] flex items-center gap-1 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Available Time Slot</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableTimes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-1.5 px-2 text-xs rounded border text-center transition-colors cursor-pointer ${
                        selectedTime === t
                          ? 'bg-[#C9A96E] text-[#0B1F3A] border-[#C9A96E] font-bold'
                          : 'bg-white text-[#1A2433] border-[#CFC5AA] hover:bg-[#F0E8D5]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-3 pt-2 border-t border-[#E2D8C0]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                    Phone (for calendar SMS reminder)
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                    Family Status
                  </label>
                  <select
                    value={familyStatus}
                    onChange={(e) => setFamilyStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none"
                  >
                    <option>Married with children</option>
                    <option>Married, no children yet</option>
                    <option>Single father</option>
                    <option>Engaged / Planning family</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                  What is the #1 breakthrough you are seeking right now?
                </label>
                <textarea
                  rows={2}
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#5B6577]">
                <Shield className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Strictly confidential. No sales spam.</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>Confirm Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
