/* eslint-disable react/prop-types */
import { useEffect, useState, useLayoutEffect } from 'react';
import NavbarLogin from "../components/navbar/navbarLogin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function DefaultLayout({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      return () => {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'auto';
        }
      };
    }
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 p-3 py-3 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      <header>
        <nav>
          <NavbarLogin />
        </nav>
      </header>
      <main>
        {children}
      </main>
      {/* <footer id="contact" className='mt-24'>
        <Footer />
      </footer> */}
    </div>
  );
}
