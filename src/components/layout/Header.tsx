'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageWithLoading from '@/components/ui/ImageWithLoading';
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
            <ImageWithLoading
              src={content.navigation.logo}
              alt="Promith Logo"
              width={parseInt(content.navigation.logoSize?.width || '40')}
              height={parseInt(content.navigation.logoSize?.height || '40')}
              className="block w-auto h-10"
              style={{
                width: content.navigation.logoSize?.width || '40px',
                height: content.navigation.logoSize?.height || '40px'
              }}
              priority
            />
          </Link>

          {/* Navigation Container */}
          <div>
            
            {/* Desktop Navigation */}
            <nav className="navbar desktop-nav">
              {content.navigation.links.map((link) => {
                const isInternalRoute = link.href.startsWith('/') && !link.href.includes('#');
                const classes = "";

                return isInternalRoute ? (
                  <Link key={link.href} href={link.href} className={classes}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} className={classes}>
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              id="menu-icon"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <nav className={`navbar mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        {content.navigation.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;