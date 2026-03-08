'use client';

import { useState } from 'react';
import { Language, t } from '@/lib/translations';

interface TermsAgreementProps {
  lang: Language;
  onAccept: () => void;
}

export function TermsAgreement({ lang, onAccept }: TermsAgreementProps) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptAge, setAcceptAge] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!acceptTerms || !acceptPrivacy || !acceptAge) {
      setError(t('termsRequired', lang));
      return;
    }
    // Store acceptance in localStorage
    localStorage.setItem('termsAccepted', 'true');
    localStorage.setItem('termsAcceptedDate', new Date().toISOString());
    onAccept();
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full glass-card rounded-3xl neon-border p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full neon-border flex items-center justify-center bg-card">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2">{t('termsTitle', lang)}</h2>
          <p className="text-muted-foreground">{t('termsIntro', lang)}</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6 mb-8 text-sm">
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-primary mb-2">{t('termsSection1Title', lang)}</h3>
            <p className="text-muted-foreground">{t('termsSection1', lang)}</p>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-primary mb-2">{t('termsSection2Title', lang)}</h3>
            <p className="text-muted-foreground">{t('termsSection2', lang)}</p>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-primary mb-2">{t('termsSection3Title', lang)}</h3>
            <p className="text-muted-foreground">{t('termsSection3', lang)}</p>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-primary mb-2">{t('termsSection4Title', lang)}</h3>
            <p className="text-muted-foreground">{t('termsSection4', lang)}</p>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 mb-8">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-6 h-6 rounded-lg border-2 border-border peer-checked:border-primary peer-checked:bg-primary/20 transition-colors flex items-center justify-center">
                {acceptTerms && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-foreground group-hover:text-primary transition-colors">{t('termsAccept', lang)}</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={acceptPrivacy}
                onChange={(e) => setAcceptPrivacy(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-6 h-6 rounded-lg border-2 border-border peer-checked:border-primary peer-checked:bg-primary/20 transition-colors flex items-center justify-center">
                {acceptPrivacy && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-foreground group-hover:text-primary transition-colors">{t('termsPrivacy', lang)}</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={acceptAge}
                onChange={(e) => setAcceptAge(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-6 h-6 rounded-lg border-2 border-border peer-checked:border-primary peer-checked:bg-primary/20 transition-colors flex items-center justify-center">
                {acceptAge && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-foreground group-hover:text-primary transition-colors">{t('termsAge', lang)}</span>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-destructive/20 border border-destructive/50 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:scale-[1.02] transition-transform neon-border"
        >
          {t('termsContinue', lang)}
        </button>

        {/* Company Attribution */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Flores Landscape & Design LLC</p>
          <p>Phoenix, Arizona</p>
        </div>
      </div>
    </div>
  );
}
