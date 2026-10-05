import React, { useState } from 'react';
import { X, Mail, Send, Check } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-4 font-sans-clean leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'editorial', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact The Daily Pulse">
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
            Message Received
          </h4>
          <p className="mt-1 text-stone-500">
            Thank you for reaching out. Our editorial desk will review your inquiry shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-stone-500">
            Have a story pitch, letter to the editor, correction, or general inquiry? Send our newsroom a message.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Your Full Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Eleanor Vance"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded text-xs sm:text-sm focus:outline-none focus:border-amber-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Email Address
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="eleanor@example.com"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded text-xs sm:text-sm focus:outline-none focus:border-amber-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Inquiry Department
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded text-xs sm:text-sm focus:outline-none focus:border-amber-700"
            >
              <option value="editorial">Editorial Desk (Pitches &amp; Suggestions)</option>
              <option value="letters">Letters to the Editor</option>
              <option value="corrections">Factual Corrections</option>
              <option value="syndication">Syndication &amp; Republication</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Your Message
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Outline your thoughts, pitch summary, or question..."
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded text-xs sm:text-sm focus:outline-none focus:border-amber-700"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> newsroom@thedailypulse.magazine
            </span>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <p>
        <strong>Last Updated: October 2026</strong>
      </p>
      <p>
        At <strong>The Daily Pulse</strong>, we uphold the highest standards of reader privacy. We believe an intellectual publication should never harvest excessive personal data or compromise reader autonomy.
      </p>
      <h4 className="font-bold text-stone-800 dark:text-stone-200">1. Information We Collect</h4>
      <p>
        We only collect information you voluntarily provide, such as your email address when subscribing to our editorial newsletter or submitting reader comments. We do not sell, rent, or lease personal identifiers to third-party ad brokers.
      </p>
      <h4 className="font-bold text-stone-800 dark:text-stone-200">2. Local Storage and Preferences</h4>
      <p>
        Preferences such as dark mode toggles and saved reading bookmarks are stored strictly within your browser&apos;s local storage. This data never leaves your personal device.
      </p>
      <h4 className="font-bold text-stone-800 dark:text-stone-200">3. Unsubscribing</h4>
      <p>
        You may unsubscribe from our newsletter at any time with a single click via the link included at the bottom of every dispatch.
      </p>
    </Modal>
  );
};

export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms &amp; Conditions">
      <p>
        <strong>Effective Date: October 2026</strong>
      </p>
      <p>
        Welcome to <strong>The Daily Pulse</strong>. By accessing or browsing our digital magazine, you agree to comply with and be bound by the following terms of service.
      </p>
      <h4 className="font-bold text-stone-800 dark:text-stone-200">1. Intellectual Property &amp; Copyright</h4>
      <p>
        All original essays, analyses, curated typography, visual layouts, and editorial photography published on The Daily Pulse are protected by copyright laws. You may quote short passages for review or academic purposes with explicit attribution and a backlink.
      </p>
      <h4 className="font-bold text-stone-800 dark:text-stone-200">2. Editorial Integrity &amp; Informational Notice</h4>
      <p>
        The Daily Pulse covers health, wellness, finance, and technology for educational, cultural, and informational purposes only. Health essays do not constitute personalized medical diagnosis or clinical treatment. Financial articles do not constitute fiduciary financial advice.
      </p>
      <h4 className="font-bold text-stone-800 dark:text-stone-200">3. Reader Discourse</h4>
      <p>
        We encourage rigorous, respectful debate. Comment submissions containing harassment, hate speech, or unsolicited commercial promotion will be removed by moderators.
      </p>
    </Modal>
  );
};
