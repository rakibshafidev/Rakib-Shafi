import React, { useState } from 'react';
import { X, CheckCircle, Shield, CreditCard, Lock, Download, ArrowLeft } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
}) => {
  const [formData, setFormData] = useState({
    name: 'Marcus Vance',
    email: 'marcus@example.com',
    address: '428 Heritage Way',
    city: 'Franklin',
    state: 'TN',
    zip: '37064',
    cardNumber: '•••• •••• •••• 4242',
    exp: '08/28',
    cvc: '382',
  });

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = rawSubtotal > 30 ? 0 : 4.95;
  const finalTotal = Math.max(0, rawSubtotal - discount + shipping);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LEGACY10') {
      setDiscount(rawSubtotal * 0.1);
    } else if (promoCode.trim().toUpperCase() === 'VETERAN') {
      setDiscount(5.0);
    } else {
      setDiscount(0);
      alert("Try code 'LEGACY10' for 10% off or 'VETERAN' for $5.00 off!");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setOrderNumber(`TL-${Math.floor(100000 + Math.random() * 900000)}`);
      onClearCart();
    }, 1200);
  };

  const hasDigitalItems = items.some((item) => item.product.isDigital);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F7F1E3] border border-[#C9A96E]/50 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-fadeIn">
        {/* Top Header */}
        <div className="bg-[#0B1F3A] px-6 py-4 border-b border-[#C9A96E]/30 flex items-center justify-between text-[#E3CFA0]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C9A96E]" />
            <span className="font-serif text-lg font-bold text-white tracking-wide">
              {isCompleted ? 'Order Confirmed' : 'Secure Checkout (Live Demo Simulation)'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#DDD8C8] hover:text-[#C9A96E] transition-colors rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl font-bold text-[#0B1F3A]">
                Thank you for your order, {formData.name}!
              </h3>
              <p className="text-sm text-[#5B6577]">
                Your order <span className="font-semibold text-[#0B1F3A] font-mono">{orderNumber}</span> has been confirmed. A receipt and shipment tracker have been sent to <span className="font-medium text-[#0B1F3A]">{formData.email}</span>.
              </p>
            </div>

            {hasDigitalItems && (
              <div className="p-4 bg-white border border-[#E2D8C0] rounded text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-wider text-[#C9A96E] font-bold">
                    Digital Access Ready
                  </div>
                  <span className="text-xs text-emerald-700 font-medium">Instant Download</span>
                </div>
                <p className="text-xs text-[#5B6577]">
                  Your digital copies of The Legacy Blueprint & The Steady Father Workbook are ready to read:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => alert("Demo download: Opening full interactive PDF preview...")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#0B1F3A] text-[#E3CFA0] rounded hover:bg-[#13294B] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Edition
                  </button>
                  <button
                    onClick={() => alert("Demo download: EPUB file download simulated.")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-[#0B1F3A] text-[#0B1F3A] rounded hover:bg-[#E2D8C0]/30 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download EPUB Edition
                  </button>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#E2D8C0] flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#E3CFA0] text-[#0B1F3A] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Return to Bookstore
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Customer & Delivery */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#0B1F3A] border-b border-[#E2D8C0] pb-2">
                  1. Delivery Details
                </h4>

                <div>
                  <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                    Email Address (for order tracking & downloads)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                      ZIP
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CFC5AA] rounded focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Payment & Order Summary */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#0B1F3A] border-b border-[#E2D8C0] pb-2">
                  2. Payment Method
                </h4>

                <div className="p-3 bg-white border border-[#CFC5AA] rounded space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5B6577]">
                    <span className="flex items-center gap-1.5 font-medium text-[#0B1F3A]">
                      <CreditCard className="w-4 h-4 text-[#C9A96E]" />
                      Credit / Debit Card (Stripe test mode)
                    </span>
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#F7F1E3]/30 border border-[#CFC5AA] rounded focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.exp}
                        onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#F7F1E3]/30 border border-[#CFC5AA] rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1A2433] block mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#F7F1E3]/30 border border-[#CFC5AA] rounded font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Promo code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. LEGACY10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#CFC5AA] rounded uppercase"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#E2D8C0] hover:bg-[#C9A96E] text-[#0B1F3A] rounded transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Pricing Summary */}
                <div className="p-3 bg-white/70 border border-[#E2D8C0] rounded space-y-1 text-xs">
                  <div className="flex justify-between text-[#5B6577]">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold text-[#1A2433]">${rawSubtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5B6577]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E2D8C0] flex justify-between text-sm font-bold text-[#0B1F3A]">
                    <span>Total Due</span>
                    <span className="font-serif text-lg font-bold">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#E2D8C0] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#5B6577] hover:text-[#0B1F3A] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to cart</span>
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto px-8 py-3 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isProcessing ? 'Processing Secure Payment...' : `Complete Purchase ($${finalTotal.toFixed(2)})`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
