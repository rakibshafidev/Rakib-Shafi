import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onBookCallClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onBookCallClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'books', label: 'Bookstore' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1F3A] border-b border-[#C9A96E]/30 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#E3CFA0] hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0">
            Tonnie Legacy<sup className="text-xs font-normal ml-0.5 text-[#C9A96E]">™</sup>
          </span>
        </button>

        {/* Zone 2: 4-6 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-[#C9A96E] border-[#C9A96E] font-semibold'
                    : 'text-[#DDD8C8] border-transparent hover:text-[#E3CFA0] hover:border-[#E3CFA0]/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + Cart */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBookCallClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#0B1F3A] bg-[#C9A96E] hover:bg-[#E3CFA0] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <span>Book a Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Open Cart"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#E3CFA0] border border-[#C9A96E]/60 hover:bg-[#13294B] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
            <span>Cart</span>
            <span className="bg-[#C9A96E] text-[#0B1F3A] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[11px]">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#E3CFA0] hover:text-white border border-[#C9A96E]/40 rounded cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071527] border-b border-[#C9A96E]/30 px-6 py-5 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs text-[#C9A96E] pb-2 border-b border-white/10">
            <ShieldCheck className="w-4 h-4" />
            <span>Veteran-Owned Brand</span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left py-2 text-base transition-colors ${
                activeTab === link.id
                  ? 'text-[#C9A96E] font-semibold'
                  : 'text-[#DDD8C8] hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookCallClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#0B1F3A] bg-[#C9A96E] rounded cursor-pointer"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
