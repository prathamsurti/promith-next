'use client';

import { motion } from 'framer-motion';
import './FounderNote.css';

interface FounderNoteProps {
  quote: string;
  founderName: string;
  founderTitle: string;
  founderImage: string;
}

const FounderNote = ({
  quote,
  founderName,
  founderTitle,
}: FounderNoteProps) => {
  const highlightWords = [
    'Fire', 'Prometheus', 'humanity', 'Technology', 'guide', 'harnessing',
    'accessible', 'powerful', 'mission', 'grow', 'innovate', 'succeed'
  ];
  
  const processQuote = (text: string) => {
    const words = text.split(' ');
    let hereCount = 0;
    
    return words.map((word, index) => {
      const cleanWord = word.replace(/[""",.;:!?-]/g, '');
      let isHighlight = highlightWords.includes(cleanWord);
      
      // Special logic from your original file
      if (cleanWord === "here") {
        hereCount++;
        isHighlight = hereCount === 1;
      }
      
      if (cleanWord === "We're" || cleanWord === "Were" || word.includes("easy-to-use")) {
        isHighlight = true;
      }
      
      return (
        <motion.span
          key={index}
          className={`quote-word ${isHighlight ? 'highlight' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      );
    });
  };

  return (
    <section className="founder-note-section" id="founder-note">
      <div className="founder-note-container">
        <div className="founder-note-content">
          {/* Quote */}
          <motion.div
            className="founder-quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="quote-text">
              {processQuote(quote)}
            </h3>
          </motion.div>

          {/* Founder Info */}
          <motion.div
            className="founder-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="founder-image-wrapper">
              <div className="founder-image"></div>
            </div>
            <div className="founder-details">
              <p className="founder-name">
                {founderTitle}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;