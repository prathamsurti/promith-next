'use client';

import { useState } from 'react';
import Link from 'next/link';
import content from '@/data/content.json';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((s) => !s);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <img
              src={content.navigation.logo}
              alt="Promith Logo"
              style={{
                width: content.navigation.logoSize?.width || '40px',
                height: content.navigation.logoSize?.height || '40px'
              }}
            />
          </Link>

          {/* Right side: Nav + CTA + Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Desktop Navigation */}
            <nav className={`navbar ${isMobileMenuOpen ? 'active' : ''}`}>
              {content.navigation.links.map((link) => {
                // Check if it's an internal route or hash link
                const isInternalRoute = link.href.startsWith('/') && !link.href.includes('#');

                if (isInternalRoute) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                }

                // For hash links and external links, use <a>
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              id="menu-icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
