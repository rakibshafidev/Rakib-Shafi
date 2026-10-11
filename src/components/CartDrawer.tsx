import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { Product } from '../data/content';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-[#F7F1E3] border-l border-[#C9A96E]/40 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 bg-[#0B1F3A] border-b border-[#C9A96E]/30 flex items-center justify-between text-[#E3CFA0]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C9A96E]" />
              <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                Your Bookstore Cart
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#DDD8C8] hover:text-[#C9A96E] transition-colors rounded cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#E2D8C0]">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E2D8C0]/40 flex items-center justify-center text-[#5B6577]">
                  <BookOpen className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-2xl text-[#0B1F3A]">Your cart is empty</h4>
                <p className="text-sm text-[#5B6577] max-w-xs mx-auto">
                  Browse our books and practical workbooks designed to strengthen character and home leadership.
                </p>
                <button
                  onClick={onClose}
                  className="inline-block mt-2 px-6 py-2.5 text-xs font-semibold text-[#0B1F3A] bg-[#C9A96E] hover:bg-[#E3CFA0] rounded transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Browse Bookstore
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-5 flex gap-4 items-start">
                  <div className="w-18 h-24 shrink-0 bg-[#0B1F3A] rounded border border-[#C9A96E]/30 overflow-hidden shadow-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base font-bold text-[#0B1F3A] leading-snug">
                      {item.product.title}
                    </h4>
                    <span className="text-xs text-[#5B6577] block mt-0.5">
                      {item.product.format}
                    </span>
                    <div className="mt-1 text-sm font-semibold text-[#0B1F3A]">
                      ${item.product.price.toFixed(2)}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#CFC5AA] rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2.5 py-0.5 text-sm font-bold text-[#1A2433] hover:bg-[#F7F1E3] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#1A2433]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2.5 py-0.5 text-sm font-bold text-[#1A2433] hover:bg-[#F7F1E3] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-xs text-[#A33] hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E2D8C0] space-y-4 shadow-lg">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#5B6577]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A2433]">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#5B6577]">
                  <span>Shipping & Handling</span>
                  <span className="text-emerald-700 font-medium">
                    Free / Calculated next
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E2D8C0] flex justify-between items-baseline">
                  <span className="font-serif text-lg font-bold text-[#0B1F3A]">
                    Estimated Total
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#0B1F3A]">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-6 bg-[#0B1F3A] hover:bg-[#13294B] text-[#E3CFA0] hover:text-white font-semibold text-sm rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#5B6577] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                <span>Secure 256-bit Stripe / WooCommerce Checkout Simulation</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
