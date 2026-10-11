import React from 'react';
import { X, BookOpen, Clock, Tag, Share2, Check } from 'lucide-react';
import { Article } from '../data/content';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenBookCall: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onOpenBookCall,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F7F1E3] border border-[#C9A96E]/50 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-fadeIn my-8">
        {/* Header bar */}
        <div className="bg-[#0B1F3A] px-6 py-4 border-b border-[#C9A96E]/30 flex items-center justify-between text-[#E3CFA0]">
          <div className="flex items-center gap-2 text-xs">
            <BookOpen className="w-4 h-4 text-[#C9A96E]" />
            <span className="uppercase tracking-widest text-[#C9A96E] font-semibold">
              Tonnie Legacy™ Resources
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#DDD8C8] hover:text-[#C9A96E] transition-colors rounded cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-6">
          <div className="space-y-3 border-b border-[#E2D8C0] pb-6">
            <div className="flex items-center gap-3 text-xs text-[#5B6577]">
              <span className="font-semibold text-[#0B1F3A] uppercase tracking-wider">
                {article.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F3A] leading-tight">
              {article.title}
            </h2>

            <p className="text-base sm:text-lg text-[#5B6577] italic">
              {article.subtitle}
            </p>
          </div>

          {/* Key takeaway callout */}
          <div className="p-4 bg-white border border-[#E2D8C0] rounded">
            <p className="text-sm font-semibold text-[#0B1F3A] italic">
              “{article.summary}”
            </p>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-[#1A2433] leading-relaxed text-base">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Footer of article */}
          <div className="pt-8 border-t border-[#E2D8C0] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={handleShare}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#C9A96E] flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link copied to clipboard!' : 'Share article'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenBookCall();
                }}
                className="px-4 py-2 bg-[#0B1F3A] text-[#E3CFA0] hover:text-white text-xs uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors"
              >
                Discuss this with Tonnie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
