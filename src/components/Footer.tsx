import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#081628] text-[#B9BFCB] border-t border-[#1E3050] pt-16 pb-10 text-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <h4 className="font-serif text-2xl font-bold text-[#E3CFA0] tracking-wide">
              Tonnie Legacy<sup className="text-xs ml-0.5 text-[#C9A96E]">™</sup>
            </h4>
            <p className="text-[#AEB6C4] leading-relaxed text-sm">
              Helping men develop personal discipline, lead their families with steadiness, and build an enduring generational legacy.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#C9A96E]/40 text-[#C9A96E] text-xs font-semibold rounded">
              <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
              <span>Veteran-Owned & Operated</span>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div className="space-y-3">
            <h5 className="font-serif text-base font-bold text-[#E3CFA0] uppercase tracking-wider">
              Explore
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  About Tonnie
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('coaching')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Coaching Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('books')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Bookstore & Workbooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Resources & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="space-y-3">
            <h5 className="font-serif text-base font-bold text-[#E3CFA0] uppercase tracking-wider">
              Legal & Policies
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('refund')}
                  className="hover:text-[#C9A96E] transition-colors cursor-pointer text-left"
                >
                  Refund & Return Policy
                </button>
              </li>
            </ul>
            <div className="pt-2 text-xs text-[#5B6577]">
              <span>Direct Inquiries: </span>
              <a href="mailto:hello@tonnielegacy.com" className="text-[#AEB6C4] hover:text-[#C9A96E] underline">
                hello@tonnielegacy.com
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h5 className="font-serif text-base font-bold text-[#E3CFA0] uppercase tracking-wider">
              The Legacy Letter
            </h5>
            <p className="text-xs text-[#AEB6C4] leading-relaxed">
              One practical insight every Tuesday morning on leadership, marriage, and intentional fatherhood.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#13294B] border border-[#C9A96E]/50 rounded text-xs text-[#E3CFA0] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you. You are on the Legacy list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#0F223D] border border-[#C9A96E]/40 text-white rounded placeholder-[#707E94] focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C9A96E] hover:bg-[#E3CFA0] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1E3050] flex flex-col sm:flex-row items-center justify-between text-xs text-[#707E94] gap-3">
          <div>
            © {new Date().getFullYear()} Tonnie Legacy™. All rights reserved. Built with pride for men of purpose.
          </div>
          <div className="flex items-center gap-4">
            <span>Faith · Family · Discipline · Legacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
