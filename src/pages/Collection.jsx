import  { useState, useEffect } from 'react';
import {  useLayoutEffect } from 'react';
import NavbarHome from "../components/navbar/navbarHome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import BookCard from '../components/BookCard/BookCard';
import { request } from '../axios_helper';
import NavbarLogin from "../components/navbar/navbarLogin";

// eslint-disable-next-line react/prop-types
export default function Collection({isLoggedIn}) {

    const [livres, setLivres] = useState([]);
  
    useEffect(() => {
      request('get', '/public/getlivres')
        .then(response => {
          setLivres(response.data);
        })
        .catch(error => {
          console.error('Error fetching livres:', error);
        });
    }, []);

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
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    };
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
        {isLoggedIn ? (
        <NavbarLogin scrollToSection={scrollToSection} />
      ) : (
        <NavbarHome scrollToSection={scrollToSection} />
      )}
        </nav>
      </header>
         <main>
            <div className=" animate-fade-up animate-once mt-28">
                  <BookCard livre={livres} />
            </div>
        </main>
        {/* <footer id="contact" className='mt-24'>
          <Footer />
        </footer> */}
    </div>
  );
}
