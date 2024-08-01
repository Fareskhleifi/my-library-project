import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import NavbarHome from "../components/navbar/navbarHome";
import NavbarLogin from "../components/navbar/navbarLogin";
import backgroundHome from "../assets/backgroundHome.jpg";
import about3 from "../assets/about3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/Card/Card';
import Event from '../components/Events/Event';
import Footer from '../components/footer/Footer';

// eslint-disable-next-line react/prop-types
export default function Home({isLoggedIn}) {
  const [isVisibleS2, setIsVisibleS2] = useState(false);
  const [isVisibleS3, setIsVisibleS3] = useState(false);
  const s2Ref = useRef(null);
  const s3Ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  
  const handleAbout = () => {
    navigate('/about');
  };

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
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
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 's2') {
            setIsVisibleS2(true);
          } else if (entry.target.id === 's3') {
            setIsVisibleS3(true);
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (s2Ref.current) {
      observer.observe(s2Ref.current);
    }
    if (s3Ref.current) {
      observer.observe(s3Ref.current);
    }

    return () => {
      observer.disconnect();
    };
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

  const handleCollection = ()=>{
    window.location.href = '/collection'
  }

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
      <header >
        <nav >
        {isLoggedIn ? (
        <NavbarLogin scrollToSection={scrollToSection} />
      ) : (
        <NavbarHome scrollToSection={scrollToSection} />
      )}
        </nav>
      </header>
       <div className="block justify-center mt-28 items-center h-screen">
        <section id="s1" className="block w-full" style={{ backgroundColor: `#F6DDCC`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', margin: '0 auto' }}>
        <div className="block justify-center mt-28 items-center h-screen">
        <section id="s1" className="block w-full" style={{ backgroundColor: `#F6DDCC`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', margin: '0 auto' }}>
          <div className="relative w-full min-h-screen">
            <div
              className="absolute animate-fade-right animate-once inset-0 w-3/5 h-4/5 bg-cover bg-center ml-24 m-auto"
              style={{ backgroundImage: `url(${backgroundHome})` }}>
            </div>
            <div
              className="absolute animate-fade-left animate-once mr-56 m-auto inset-0 w-5/12 h-2/4"
              style={{ backgroundColor: '#713f12' }}>
              <div className="relative flex flex-col justify-center items-center m-auto w-4/5 h-full">
                <h1 className="text-5xl uppercase text-slate-200 text-left w-full" style={{ fontFamily: "Baskervville SC" }}>
                  Welcome to BookLend Public Library
                </h1>
                <p className="pt-2 text-left w-full text-slate-300">
                  Grab-and-go book checkout services now available
                </p>
                <button
                  onClick={handleCollection}
                  className="relative mt-7 flex items-center justify-center font-sans font-semibold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-36 h-12 rounded-lg text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                >
                  Borrow Now
                  <span className="ml-2">
                    <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
        </section>
      </div>
      <div className="flex relative h-32 -mt-4 justify-center items-center" style={{ backgroundColor: `#F6DDCC` }}>
        <FontAwesomeIcon
          icon={faArrowDown}
          className="h-10 pb-4 animate-bounce text-yellow-900"
          aria-hidden="true"
        />
      </div>
      <section id="s2" ref={s2Ref} className={`relative block items-center mt-24 justify-center h-full ${isVisibleS2 ? 'animate-fade-up animate-once' : 'opacity-0 translate-y-10'}`}>
        <div className={`items-center justify-center `}>
          <h1 className="font-normal text-4xl font-serif text-center">New Additions</h1>
          <p className="text-center font-extralight text-lg pt-3 leading-normal">
            Discover our newest books! From fiction to non-fiction, <br /> there&apos;s something for everyone
          </p>
        </div>
        <Card />
        <div className="text-center relative h-24 mt-2">
          <a href="#_" className="relative px-6 py-3 text-lg font-normal text-black group inline-block" style={{ fontFamily: "Baskervville" }}>
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-yellow-800 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full border-2 border-black"></span>
            <span className="relative text-white">Our Collections</span>
          </a>
        </div>
      </section>

      <div className='border-t w-5/6 m-auto border-black my-8'></div>

      <section id="s3" ref={s3Ref} className={`relative block mt-24 h-full ${isVisibleS3 ? 'animate-fade-up animate-once' : 'opacity-0 translate-y-10'}`}>
        <div className={`items-center justify-center `}>
          <h1 className="font-normal text-4xl font-serif text-center">Virtual Events</h1>
          <p className="text-center font-extralight text-lg pt-3 leading-normal">
            Stay connected with our live and interactive online sessions, <br /> bringing the library experience to you.
          </p>
        </div>
        <Event />
        <div className="text-center relative h-24 mt-20">
          <a href="#_" className="relative px-10 py-3 font-normal text-white rounded-lg group" style={{ fontFamily: "Baskervville" }}>
            <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-yellow-900 ease opacity-90 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 border-2 border-black bg-transparent ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
            <span className="relative text-lg text-white">Join Us</span>
          </a>
        </div>
      </section>

      <div className='border-t w-5/6 m-auto border-black my-8'></div>

      <section className="relative w-11/12 m-auto block mt-24 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${about3})` }}>
        <div
          className="absolute items-center justify-center animate-fade-left animate-once m-auto inset-0 w-5/12 h-2/4"
          style={{ backgroundColor: '#d1b9ba' }}>
          <div className="relative flex flex-col justify-center items-center m-auto w-4/5 h-full">
            <h1 className="text-4xl text-center uppercase text-black w-full" style={{ fontFamily: "Baskervville SC" }}>
              About Our Library
            </h1>
            <p className="pt-5 w-full text-center text-lg font-extralight text-black leading-normal">
              Welcome to BookLend Public Library, your hub for knowledge and community.
              Explore a diverse collection from classics to contemporary reads.
              Whether you&apos;re studying, researching, or simply curious, discover and connect with us today.
            </p>
            <button
              className="relative mt-8 flex items-center justify-center font-sans font-semibold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-40 h-12 rounded-lg text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button" onClick={handleAbout}
            >
              Read more
            </button>
          </div>
        </div>
      </section>

      <div className='border-t w-5/6 m-auto border-black mt-24'></div>
      <footer id="contact" className='mt-24'>
        <Footer />
      </footer>
    </div>
  );
}
