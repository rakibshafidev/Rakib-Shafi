import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Calendar,
  Users,
  Award,
  Compass,
  CheckCircle,
  Clock,
  Sparkles,
  Mail,
  Send,
  ExternalLink,
  ChevronRight,
  Star,
  Quote,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BookCallModal } from './components/BookCallModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { PRODUCTS, ARTICLES, Article, Product } from './data/content';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [bookCallTopic, setBookCallTopic] = useState('1-on-1 Legacy Coaching');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Home newsletter state
  const [homeEmail, setHomeEmail] = useState('');
  const [homeSubscribed, setHomeSubscribed] = useState(false);

  // Resource newsletter state
  const [resourceEmail, setResourceEmail] = useState('');
  const [resourceSubscribed, setResourceSubscribed] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'Coaching',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Bookstore category filter
  const [bookstoreFilter, setBookstoreFilter] = useState<'all' | 'print' | 'digital'>('all');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Synchronize with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const validTabs = [
        'home',
        'about',
        'coaching',
        'books',
        'resources',
        'book-call',
        'contact',
        'privacy',
        'terms',
        'refund',
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (tab: string) => {
    window.location.hash = tab;
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.title}" to your cart.`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenDiscovery = (topicName: string = '1-on-1 Legacy Coaching') => {
    setBookCallTopic(topicName);
    setIsBookCallOpen(true);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (bookstoreFilter === 'print') return !p.isDigital;
    if (bookstoreFilter === 'digital') return p.isDigital;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E3] text-[#1A2433]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1F3A] text-[#E3CFA0] border border-[#C9A96E] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-fadeIn text-sm">
          <CheckCircle className="w-4 h-4 text-[#C9A96E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onBookCallClick={() => handleOpenDiscovery()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ========================================================= */}
        {/* TAB: HOME                                                 */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <section className="bg-[#0B1F3A] text-[#E9E4D6] pt-14 pb-20 sm:pt-20 sm:pb-28 border-b border-[#C9A96E]/20 relative overflow-hidden">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Value Prop */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#C9A96E] text-[#C9A96E] text-xs font-semibold rounded tracking-wider uppercase">
                      <Star className="w-3.5 h-3.5 fill-[#C9A96E]" />
                      <span>Veteran-Owned Brand</span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F7F1E3] leading-[1.08] tracking-tight">
                      Lead yourself well.{' '}
                      <span className="text-[#E3CFA0]">Leave something</span> worth inheriting.
                    </h1>

                    <p className="text-lg text-[#C7CCD6] max-w-xl leading-relaxed">
                      Tonnie Legacy™ helps men grow in character, strengthen their families, and build a lasting legacy that outlasts them—through private coaching, cohorts, books, and practical workbooks.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => handleOpenDiscovery()}
                        className="px-7 py-3.5 bg-[#C9A96E] hover:bg-[#E3CFA0] text-[#0B1F3A] font-semibold text-sm rounded uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center gap-2"
                      >
                        <span>Book a free discovery call</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigateTo('books')}
                        className="px-6 py-3.5 border border-[#C9A96E] text-[#E3CFA0] hover:bg-[#13294B] font-semibold text-sm rounded uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Shop the bookstore
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Three Generations Triad & Visual Asset */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="relative rounded-lg overflow-hidden border border-[#C9A96E]/40 shadow-2xl group">
                      <img
                        src="/src/assets/images/hero_legacy_leadership_1791649551356.jpg"
                        alt="Father and son walking in morning dawn"
                        referrerPolicy="no-referrer"
                        className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-4 right-4 text-xs text-[#E3CFA0] font-medium italic">
                        Generational strength is forged in daily presence.
                      </div>
                    </div>

                    {/* Three Generations Triad */}
                    <div className="border-l-2 border-[#C9A96E] pl-6 space-y-5 bg-[#13294B]/50 p-5 rounded-r">
                      <div>
                        <div className="font-serif text-xl sm:text-2xl text-[#E3CFA0] font-semibold">
                          Your father's example
                        </div>
                        <span className="text-xs text-[#AEB6C4] block uppercase tracking-wider">
                          What you inherited
                        </span>
                      </div>
                      <div>
                        <div className="font-serif text-xl sm:text-2xl text-[#E3CFA0] font-semibold">
                          Your choices today
                        </div>
                        <span className="text-xs text-[#AEB6C4] block uppercase tracking-wider">
                          What you build
                        </span>
                      </div>
                      <div>
                        <div className="font-serif text-xl sm:text-2xl text-[#E3CFA0] font-semibold">
                          Your children's future
                        </div>
                        <span className="text-xs text-[#AEB6C4] block uppercase tracking-wider">
                          What you leave behind
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Three Commitments Section */}
            <section className="py-20 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-2xl mb-12">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
                  Three commitments that shape a man's legacy
                </h2>
                <p className="text-base text-[#5B6577] mt-3">
                  Everything we teach and build rests on three foundational pillars of character and stewardship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pillar 1 */}
                <div className="bg-white border border-[#E2D8C0] border-t-4 border-t-[#C9A96E] p-8 rounded shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded bg-[#F7F1E3] flex items-center justify-center text-[#0B1F3A] mb-5">
                    <Compass className="w-5 h-5 text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-3">
                    Personal Growth
                  </h3>
                  <p className="text-sm text-[#5B6577] leading-relaxed">
                    Build discipline, emotional clarity, and spiritual fortitude so you lead from internal steadiness, not reactionary stress.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white border border-[#E2D8C0] border-t-4 border-t-[#C9A96E] p-8 rounded shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded bg-[#F7F1E3] flex items-center justify-center text-[#0B1F3A] mb-5">
                    <Users className="w-5 h-5 text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-3">
                    Stronger Families
                  </h3>
                  <p className="text-sm text-[#5B6577] leading-relaxed">
                    Become the husband and father your family can count on. Implement simple, steady habits that rebuild deep connection and trust.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white border border-[#E2D8C0] border-t-4 border-t-[#C9A96E] p-8 rounded shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded bg-[#F7F1E3] flex items-center justify-center text-[#0B1F3A] mb-5">
                    <Award className="w-5 h-5 text-[#C9A96E]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-3">
                    Meaningful Legacy
                  </h3>
                  <p className="text-sm text-[#5B6577] leading-relaxed">
                    Define your values, document them in a family charter, and live them out so the next generation carries them forward with honor.
                  </p>
                </div>
              </div>
            </section>

            {/* Start Here Section */}
            <section className="bg-[#0B1F3A] text-[#E9E4D6] py-20 sm:py-24 border-y border-[#C9A96E]/20">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="max-w-2xl mb-12">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F1E3]">
                    Start Here
                  </h2>
                  <p className="text-base text-[#C7CCD6] mt-2">
                    Pick the pathway that fits where you are right now in your leadership journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded flex flex-col justify-between hover:border-[#C9A96E] transition-colors">
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold">
                        Private Mentorship
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        1-on-1 Coaching
                      </h3>
                      <p className="text-sm text-[#AEB6C4] leading-relaxed">
                        Personal guidance and rigorous accountability built around your personal goals, marriage, and fatherhood season.
                      </p>
                    </div>
                    <div className="pt-8">
                      <button
                        onClick={() => navigateTo('coaching')}
                        className="w-full py-2.5 px-4 border border-[#C9A96E] text-[#E3CFA0] hover:bg-[#C9A96E] hover:text-[#0B1F3A] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
                      >
                        See Coaching Programs
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded flex flex-col justify-between hover:border-[#C9A96E] transition-colors">
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold">
                        Brotherhood & Cohorts
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        Group Coaching
                      </h3>
                      <p className="text-sm text-[#AEB6C4] leading-relaxed">
                        Grow alongside men who are serious about intentional change. Weekly calls, shared commitments, and mutual accountability.
                      </p>
                    </div>
                    <div className="pt-8">
                      <button
                        onClick={() => handleOpenDiscovery('Group Cohort Coaching')}
                        className="w-full py-2.5 px-4 border border-[#C9A96E] text-[#E3CFA0] hover:bg-[#C9A96E] hover:text-[#0B1F3A] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
                      >
                        Inquire About Next Cohort
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded flex flex-col justify-between hover:border-[#C9A96E] transition-colors">
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold">
                        Self-Paced Resources
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        Books & Workbooks
                      </h3>
                      <p className="text-sm text-[#AEB6C4] leading-relaxed">
                        Practical guides in print, eBook, and printable workbook formats to help you and your family take immediate action.
                      </p>
                    </div>
                    <div className="pt-8">
                      <button
                        onClick={() => navigateTo('books')}
                        className="w-full py-2.5 px-4 border border-[#C9A96E] text-[#E3CFA0] hover:bg-[#C9A96E] hover:text-[#0B1F3A] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
                      >
                        Browse Bookstore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Founder Quote & Discovery Call Teaser */}
            <section className="py-20 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-[#E2D8C0] p-8 sm:p-14 rounded-lg shadow-sm">
                <div className="lg:col-span-6 space-y-4 border-b lg:border-b-0 lg:border-r border-[#E2D8C0] pb-8 lg:pb-0 lg:pr-10">
                  <Quote className="w-10 h-10 text-[#C9A96E] opacity-60" />
                  <p className="font-serif text-2xl sm:text-3xl text-[#0B1F3A] italic leading-snug">
                    “A man's legacy is not what he owns. It is who he becomes and who he shapes.”
                  </p>
                  <div className="pt-2">
                    <div className="font-semibold text-base text-[#0B1F3A]">Tonnie</div>
                    <span className="text-xs text-[#5B6577] uppercase tracking-wider">
                      Founder, Veteran & Father
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <h3 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                    Not sure where to begin?
                  </h3>
                  <p className="text-sm sm:text-base text-[#5B6577] leading-relaxed">
                    A free 30-minute discovery call helps us understand your situation, explore your primary roadblocks, and recommend the right next step. No pressure.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleOpenDiscovery()}
                      className="px-6 py-3.5 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>Book your free 30-min call</span>
                      <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Weekly Legacy Letter Newsletter Banner */}
            <section className="bg-white border-t border-[#E2D8C0] py-20">
              <div className="max-w-[700px] mx-auto px-4 sm:px-6 text-center space-y-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F1E3] flex items-center justify-center text-[#0B1F3A]">
                  <Mail className="w-6 h-6 text-[#C9A96E]" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
                  Get the weekly Legacy Letter
                </h2>
                <p className="text-base text-[#5B6577]">
                  One practical idea each week on leadership, family, and purpose delivered straight to your inbox.
                </p>

                {homeSubscribed ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-sm font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Thank you. You are on the list! Watch for your first briefing this Tuesday.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (homeEmail) setHomeSubscribed(true);
                    }}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={homeEmail}
                      onChange={(e) => setHomeEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border border-[#CFC5AA] rounded text-sm focus:outline-none focus:border-[#0B1F3A]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: ABOUT                                                */}
        {/* ========================================================= */}
        {activeTab === 'about' && (
          <div className="space-y-0">
            {/* Page Header */}
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  About Tonnie Legacy™
                </h1>
                <p className="text-lg text-[#C7CCD6] mt-3 max-w-2xl">
                  A veteran-owned brand built on service, discipline, and family leadership.
                </p>
              </div>
            </div>

            {/* Backstory & Founder Profile */}
            <div className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Founder Photo */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-[#C9A96E]/40 shadow-xl bg-[#0B1F3A]">
                    <img
                      src="/src/assets/images/tonnie_founder_portrait_1791649570431.jpg"
                      alt="Tonnie, Founder of Tonnie Legacy"
                      referrerPolicy="no-referrer"
                      className="w-full aspect-square object-cover object-top"
                    />
                    <div className="p-4 bg-[#0B1F3A] text-center border-t border-[#C9A96E]/30">
                      <div className="font-serif text-xl font-bold text-[#E3CFA0]">Tonnie</div>
                      <span className="text-xs text-[#AEB6C4] block uppercase tracking-wider">
                        Founder & Principal Coach
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-[#E2D8C0] rounded text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                      <span>U.S. Veteran-Owned Enterprise</span>
                    </span>
                  </div>
                </div>

                {/* Backstory Prose */}
                <div className="lg:col-span-7 space-y-6 text-[#1A2433] leading-relaxed">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
                    Why this work matters
                  </h2>

                  <p className="text-base sm:text-lg text-[#5B6577]">
                    Years of military service taught Tonnie that strong leaders are not born in comfortable circumstances—they are forged through habit, personal responsibility, and daily sacrifice.
                  </p>

                  <p>
                    Those same battle-tested principles apply directly at home: in marriage, in fatherhood, and in the quiet decisions no one else sees. Yet so many high-achieving men experience a silent drift. They win at work while feeling distant or exhausted at their own dinner table.
                  </p>

                  <p>
                    Tonnie Legacy™ exists to give men a clear, practical roadmap to grow in character, lead their homes with steady confidence, and cultivate a legacy of faith, integrity, and purpose.
                  </p>

                  <div className="p-5 bg-white border border-[#E2D8C0] rounded space-y-2">
                    <h4 className="font-serif text-lg font-bold text-[#0B1F3A]">
                      The Core Mission
                    </h4>
                    <p className="text-sm text-[#5B6577]">
                      To equip one million men to break cycles of generational apathy, lead with moral courage, and leave families that stand firm for generations to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values Strip */}
            <div className="bg-[#0B1F3A] text-[#E9E4D6] py-20 border-t border-[#C9A96E]/20">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F1E3]">
                    What we stand for
                  </h2>
                  <p className="text-sm text-[#C7CCD6] mt-2">
                    Our non-negotiable standards in coaching and content.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded">
                    <div className="w-10 h-10 rounded bg-[#0B1F3A] flex items-center justify-center text-[#C9A96E] mb-4">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      Integrity
                    </h3>
                    <p className="text-sm text-[#AEB6C4]">
                      Do what you say. In public, and behind closed doors when nobody is watching. Every single day.
                    </p>
                  </div>

                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded">
                    <div className="w-10 h-10 rounded bg-[#0B1F3A] flex items-center justify-center text-[#C9A96E] mb-4">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      Service
                    </h3>
                    <p className="text-sm text-[#AEB6C4]">
                      True leadership is not demanding authority. It is laying down your ego to serve your wife, children, and community.
                    </p>
                  </div>

                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded">
                    <div className="w-10 h-10 rounded bg-[#0B1F3A] flex items-center justify-center text-[#C9A96E] mb-4">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      Legacy
                    </h3>
                    <p className="text-sm text-[#AEB6C4]">
                      Think in multi-generational horizons. Act today with the awareness that your grandchildren will inherit the culture you create.
                    </p>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button
                    onClick={() => handleOpenDiscovery()}
                    className="px-8 py-3.5 bg-[#C9A96E] hover:bg-[#E3CFA0] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <span>Book a Discovery Call with Tonnie</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: COACHING                                             */}
        {/* ========================================================= */}
        {activeTab === 'coaching' && (
          <div className="space-y-0">
            {/* Header */}
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Coaching Programs
                </h1>
                <p className="text-lg text-[#C7CCD6] mt-3 max-w-2xl">
                  Practical guidance, strategic clarity, and real accountability for men ready to lead.
                </p>
              </div>
            </div>

            {/* Programs Comparison */}
            <div className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1-on-1 Coaching */}
                <div className="bg-white border border-[#E2D8C0] border-t-4 border-t-[#C9A96E] p-8 sm:p-10 rounded shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-[#C9A96E]">
                        Private Mentorship
                      </span>
                      <span className="text-xs bg-[#F7F1E3] px-2.5 py-1 rounded text-[#0B1F3A] font-medium">
                        Zoom Video
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                      1-on-1 Legacy Coaching
                    </h3>

                    <p className="text-sm text-[#5B6577] leading-relaxed">
                      Confidential, high-level private coaching tailored directly to your personal hurdles, marriage relationship, and fatherhood leadership goals.
                    </p>

                    <div className="py-4 border-y border-[#E2D8C0] space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
                        What is included:
                      </div>
                      <ul className="space-y-2.5 text-sm text-[#1A2433]">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>Custom Life Blueprint & Legacy Audit</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>Bi-weekly 60-min private Zoom deep-dive sessions</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>Direct Voxer/SMS access between calls for live support</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>Personalized family constitution & marriage rituals</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => handleOpenDiscovery('1-on-1 Legacy Coaching')}
                      className="w-full py-3.5 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Book a Discovery Call</span>
                      <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
                    </button>
                  </div>
                </div>

                {/* Group Coaching */}
                <div className="bg-white border border-[#E2D8C0] border-t-4 border-t-[#C9A96E] p-8 sm:p-10 rounded shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-[#C9A96E]">
                        Small Cohort
                      </span>
                      <span className="text-xs bg-[#F7F1E3] px-2.5 py-1 rounded text-[#0B1F3A] font-medium">
                        Max 8 Men
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                      Group Coaching Cohort
                    </h3>

                    <p className="text-sm text-[#5B6577] leading-relaxed">
                      Join a small, hand-selected group of men who will hold your feet to the fire. Grow in brotherhood, share honest challenges, and sharpen one another.
                    </p>

                    <div className="py-4 border-y border-[#E2D8C0] space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
                        What is included:
                      </div>
                      <ul className="space-y-2.5 text-sm text-[#1A2433]">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>Weekly live 75-min group strategy calls with Tonnie</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>8-week structured curriculum & The Steady Father workbook</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>Peer accountability partner pairings</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>Private cohort brotherhood community vault</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => handleOpenDiscovery('Group Cohort Coaching')}
                      className="w-full py-3.5 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Ask About the Next Cohort</span>
                      <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* How it works 3-step section */}
            <div className="bg-[#0B1F3A] text-[#E9E4D6] py-20 border-t border-[#C9A96E]/20">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
                <div className="text-center max-w-xl mx-auto">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F1E3]">
                    How coaching works
                  </h2>
                  <p className="text-sm text-[#C7CCD6] mt-2">
                    A simple, high-accountability framework designed for lasting transformation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#0B1F3A] border border-[#C9A96E] flex items-center justify-center font-serif text-xl font-bold text-[#C9A96E]">
                      1
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      1. Discovery Talk
                    </h3>
                    <p className="text-sm text-[#AEB6C4]">
                      We schedule a free, confidential 30-minute discovery call to understand your family context, schedule, and goals.
                    </p>
                  </div>

                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#0B1F3A] border border-[#C9A96E] flex items-center justify-center font-serif text-xl font-bold text-[#C9A96E]">
                      2
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      2. Agree on Plan
                    </h3>
                    <p className="text-sm text-[#AEB6C4]">
                      Together, we determine whether 1-on-1 mentorship or cohort immersion fits best, locking in dates and milestones.
                    </p>
                  </div>

                  <div className="bg-[#13294B] border border-[#C9A96E]/30 p-8 rounded text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#0B1F3A] border border-[#C9A96E] flex items-center justify-center font-serif text-xl font-bold text-[#C9A96E]">
                      3
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      3. Execute & Grow
                    </h3>
                    <p className="text-sm text-[#AEB6C4]">
                      Show up, do the weekly work, apply the exercises, and experience the quiet confidence that spreads through your home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: BOOKSTORE                                            */}
        {/* ========================================================= */}
        {activeTab === 'books' && (
          <div className="space-y-0">
            {/* Header */}
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Bookstore & Workbooks
                </h1>
                <p className="text-lg text-[#C7CCD6] mt-3 max-w-2xl">
                  Books, eBooks, and workbooks to help you grow at your own pace and lead your family with intention.
                </p>

                {/* Filter buttons */}
                <div className="flex items-center gap-2 pt-6">
                  <button
                    onClick={() => setBookstoreFilter('all')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                      bookstoreFilter === 'all'
                        ? 'bg-[#C9A96E] text-[#0B1F3A]'
                        : 'bg-[#13294B] text-[#DDD8C8] hover:text-white'
                    }`}
                  >
                    All Publications
                  </button>
                  <button
                    onClick={() => setBookstoreFilter('print')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                      bookstoreFilter === 'print'
                        ? 'bg-[#C9A96E] text-[#0B1F3A]'
                        : 'bg-[#13294B] text-[#DDD8C8] hover:text-white'
                    }`}
                  >
                    Print Books & Journals
                  </button>
                  <button
                    onClick={() => setBookstoreFilter('digital')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                      bookstoreFilter === 'digital'
                        ? 'bg-[#C9A96E] text-[#0B1F3A]'
                        : 'bg-[#13294B] text-[#DDD8C8] hover:text-white'
                    }`}
                  >
                    eBooks & Workbooks
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E2D8C0] rounded overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    {/* Book Cover Image container */}
                    <div>
                      <div className="relative aspect-[3/4] bg-[#0B1F3A] overflow-hidden border-b-2 border-[#C9A96E]">
                        <img
                          src={product.image}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-500"
                        />
                        {product.badge && (
                          <span className="absolute top-3 right-3 bg-[#0B1F3A]/90 text-[#E3CFA0] text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider border border-[#C9A96E]/40 backdrop-blur-xs">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-6 space-y-2">
                        <div className="text-xs text-[#5B6577] font-semibold uppercase tracking-wider">
                          {product.format}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] leading-tight">
                          {product.title}
                        </h3>
                        <p className="text-sm text-[#5B6577] leading-relaxed pt-1">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-[#E2D8C0]/60 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div className="font-serif text-2xl font-bold text-[#0B1F3A]">
                          ${product.price.toFixed(2)}
                        </div>
                        <span className="text-xs text-[#5B6577]">
                          {product.isDigital ? 'Instant Access' : 'Ships in 1-2 days'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-3 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                      >
                        <BookOpen className="w-4 h-4 text-[#C9A96E]" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure Checkout Note matching HTML */}
              <div className="mt-12 p-6 bg-white border border-[#E2D8C0] rounded flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B6577]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
                  <span>
                    More publications coming soon. Secure checkout simulation enabled; in live WordPress/WooCommerce deployment, Stripe handles live transactions.
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="shrink-0 text-xs font-semibold text-[#0B1F3A] underline hover:text-[#C9A96E]"
                >
                  View your cart ({totalCartCount} items)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: RESOURCES                                            */}
        {/* ========================================================= */}
        {activeTab === 'resources' && (
          <div className="space-y-0">
            {/* Header */}
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Resources & Field Notes
                </h1>
                <p className="text-lg text-[#C7CCD6] mt-3 max-w-2xl">
                  Short, practical articles and frameworks for men building an enduring legacy at home.
                </p>
              </div>
            </div>

            {/* Articles List */}
            <div className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ARTICLES.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white border border-[#E2D8C0] p-8 rounded shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#5B6577]">
                        <span className="font-semibold text-[#0B1F3A] uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-[#5B6577] leading-relaxed">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] hover:text-[#C9A96E] uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Read full article</span>
                        <ChevronRight className="w-4 h-4 text-[#C9A96E]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Callout */}
            <div className="bg-[#0B1F3A] text-[#E9E4D6] py-20 border-t border-[#C9A96E]/20">
              <div className="max-w-[650px] mx-auto px-4 sm:px-6 text-center space-y-6">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F1E3]">
                  Get new articles by email
                </h2>
                <p className="text-sm text-[#C7CCD6]">
                  Every Tuesday, Tonnie publishes one focused insight on home leadership, marriage, and emotional steadiness.
                </p>

                {resourceSubscribed ? (
                  <div className="p-4 bg-[#13294B] border border-[#C9A96E]/50 rounded text-xs text-[#E3CFA0] flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Thank you. You are on the Legacy list.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (resourceEmail) setResourceSubscribed(true);
                    }}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={resourceEmail}
                      onChange={(e) => setResourceEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-[#0F223D] border border-[#C9A96E]/40 text-white placeholder-[#707E94] rounded text-sm focus:outline-none focus:border-[#C9A96E]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#C9A96E] hover:bg-[#E3CFA0] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: BOOK A CALL                                          */}
        {/* ========================================================= */}
        {activeTab === 'book-call' && (
          <div className="space-y-0">
            {/* Header */}
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Book a Discovery Call
                </h1>
                <p className="text-lg text-[#C7CCD6] mt-3 max-w-2xl">
                  30 minutes, free, no pressure. We will talk through your goals and see if coaching is the right fit.
                </p>
              </div>
            </div>

            {/* Embedded Interactive Scheduler Box */}
            <div className="py-20 max-w-[900px] mx-auto px-4 sm:px-6">
              <div className="bg-white border-2 border-dashed border-[#C9A96E] p-8 sm:p-14 rounded-lg text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F7F1E3] flex items-center justify-center text-[#0B1F3A]">
                  <Calendar className="w-8 h-8 text-[#C9A96E]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                    Interactive Schedule & Zoom Link
                  </h3>
                  <p className="text-sm sm:text-base text-[#5B6577] max-w-lg mx-auto">
                    In the live WordPress site, your Calendly inline embed code displays here with direct Zoom integration. In this live demo, our interactive booking engine is ready below!
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => handleOpenDiscovery()}
                    className="px-8 py-3.5 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <span>Launch Discovery Call Scheduler</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
                  </button>

                  <button
                    onClick={() => navigateTo('contact')}
                    className="px-6 py-3.5 border border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#F7F1E3] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Prefer to message us? Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: CONTACT                                              */}
        {/* ========================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-0">
            {/* Header */}
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Contact
                </h1>
                <p className="text-lg text-[#C7CCD6] mt-3 max-w-2xl">
                  Questions about coaching or an order? Send a message and we will reply within 1–2 business days.
                </p>
              </div>
            </div>

            {/* Form & Info */}
            <div className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Form Column */}
                <div className="lg:col-span-7 bg-white border border-[#E2D8C0] p-8 sm:p-10 rounded shadow-xs">
                  {contactSubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#0B1F3A]">
                        Message Sent
                      </h3>
                      <p className="text-sm text-[#5B6577] max-w-sm mx-auto">
                        Thank you, {contactForm.name}. We have received your inquiry regarding {contactForm.topic} and will be in touch shortly.
                      </p>
                      <button
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactForm({ name: '', email: '', topic: 'Coaching', message: '' });
                        }}
                        className="text-xs uppercase tracking-wider font-semibold text-[#0B1F3A] underline pt-2"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setContactSubmitted(true);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                          Inquiry Topic
                        </label>
                        <select
                          value={contactForm.topic}
                          onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none"
                        >
                          <option>Coaching</option>
                          <option>Book order or download</option>
                          <option>Speaking or workshop</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                          Message *
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-7 py-3.5 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Send className="w-4 h-4 text-[#C9A96E]" />
                        <span>Send Message</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Right Info Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white border border-[#E2D8C0] p-8 rounded space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#0B1F3A]">
                      Prefer to talk directly?
                    </h3>
                    <p className="text-sm text-[#5B6577] leading-relaxed">
                      Book a free 30-minute discovery call and get your questions answered live with Tonnie.
                    </p>
                    <button
                      onClick={() => handleOpenDiscovery()}
                      className="px-6 py-3 bg-[#C9A96E] hover:bg-[#E3CFA0] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Book a Discovery Call</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-[#5B6577] px-2">
                    <p>
                      <strong className="text-[#0B1F3A]">Direct Email:</strong>{' '}
                      <a href="mailto:hello@tonnielegacy.com" className="underline hover:text-[#0B1F3A]">
                        hello@tonnielegacy.com
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#0B1F3A]">Operating Hours:</strong> Monday – Friday, 8am – 5pm CST
                    </p>
                    <p className="pt-2 text-[#0B1F3A] font-semibold">
                      ★ Proudly Veteran-Owned & Operated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: PRIVACY POLICY                                       */}
        {/* ========================================================= */}
        {activeTab === 'privacy' && (
          <div className="space-y-0">
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Privacy Policy
                </h1>
                <p className="text-sm text-[#AEB6C4] mt-2">
                  Last updated: October 2026 · Tonnie Legacy™
                </p>
              </div>
            </div>

            <div className="py-16 max-w-[900px] mx-auto px-4 sm:px-6 space-y-8 text-sm leading-relaxed text-[#1A2433]">
              <p className="text-xs text-[#5B6577] italic">
                Template for review by a legal professional.
              </p>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  1. Information We Collect
                </h2>
                <p>
                  We collect your name, email address, mailing address, billing details, and any message or consultation questionnaire you submit. We also collect non-identifying operational analytics such as page visits and device type to improve site functionality.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  2. How We Use It
                </h2>
                <p>
                  We use your information exclusively to fulfill book orders, deliver digital eBooks, schedule and host coaching sessions, respond to your inquiries, and send the weekly Legacy Letter newsletter when requested.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  3. Sharing
                </h2>
                <p>
                  We share data solely with secure infrastructure vendors essential for running this service (such as Stripe for encrypted payments, Zoom/Calendly for meeting management, and transactional email deliverability). We never sell, rent, or trade your personal information.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  4. Your Choices & Data Rights
                </h2>
                <p>
                  You may unsubscribe from our newsletter at any time via the one-click unsubscribe link in any email. You may also contact us at hello@tonnielegacy.com to request access, correction, or deletion of your personal records.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: TERMS & CONDITIONS                                   */}
        {/* ========================================================= */}
        {activeTab === 'terms' && (
          <div className="space-y-0">
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Terms & Conditions
                </h1>
                <p className="text-sm text-[#AEB6C4] mt-2">
                  Last updated: October 2026 · Tonnie Legacy™
                </p>
              </div>
            </div>

            <div className="py-16 max-w-[900px] mx-auto px-4 sm:px-6 space-y-8 text-sm leading-relaxed text-[#1A2433]">
              <p className="text-xs text-[#5B6577] italic">
                Template for review by a legal professional.
              </p>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  1. Use of the Site & Content
                </h2>
                <p>
                  All written materials, book excerpts, audio recordings, and graphics are the exclusive intellectual property of Tonnie Legacy™ and may not be reproduced, sold, or distributed without prior written consent.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  2. Nature of Coaching Services
                </h2>
                <p>
                  Coaching is an educational, motivational, and mentoring service. It does not constitute medical, psychological, legal, or licensed financial advice. Personal outcomes depend on individual commitment and execution.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  3. Digital Products
                </h2>
                <p>
                  Digital downloads (PDFs, EPUBs, fillable workbooks) are licensed for single-household personal use only. Sharing download links publicly or commercially is strictly prohibited.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  4. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, Tonnie Legacy™ and its associates shall not be held liable for indirect, incidental, or consequential damages resulting from the use or inability to use the site or services.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: REFUND POLICY                                        */}
        {/* ========================================================= */}
        {activeTab === 'refund' && (
          <div className="space-y-0">
            <div className="bg-[#0B1F3A] py-16 sm:py-20 border-b border-[#C9A96E]/20 text-[#E9E4D6]">
              <div className="max-w-[900px] mx-auto px-4 sm:px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F1E3]">
                  Refund & Return Policy
                </h1>
                <p className="text-sm text-[#AEB6C4] mt-2">
                  Clear, honest guarantees for all customers.
                </p>
              </div>
            </div>

            <div className="py-16 max-w-[900px] mx-auto px-4 sm:px-6 space-y-8 text-sm leading-relaxed text-[#1A2433]">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  1. Physical Books & Workbooks
                </h2>
                <p>
                  Unmarked books in original condition may be returned within 30 days of delivery for a full refund of the item purchase price. Return shipping is the customer's responsibility unless the merchandise arrived damaged or defective.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  2. eBooks and Digital Workbooks
                </h2>
                <p>
                  Because digital files are fulfilled immediately upon purchase, digital sales are generally non-refundable. However, if you experience formatting errors or download difficulties, email us immediately and our team will resolve it.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  3. Coaching Engagements
                </h2>
                <p>
                  Unused prepaid coaching sessions may be refunded within 14 days of purchase. Completed coaching sessions are non-refundable.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-2">
                  4. How to Request a Return
                </h2>
                <p>
                  Email hello@tonnielegacy.com with your order number and invoice details.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onClearCart={() => setCart([])}
      />

      {/* Discovery Call Scheduler Modal */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
        preselectedTopic={bookCallTopic}
      />

      {/* Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBookCall={() => handleOpenDiscovery()}
      />
    </div>
  );
}
