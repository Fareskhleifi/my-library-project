import { motion } from 'framer-motion';
import { useEffect,useLayoutEffect,useState } from 'react';
import Footer from "../components/footer/Footer";
import NavbarHome from "../components/navbar/navbarHome";
import NavbarLogin from "../components/navbar/navbarLogin";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
};

const imageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut' } }
};

const textVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeInOut' } }
};

// eslint-disable-next-line react/prop-types
const About = ({ isLoggedIn }) => {
    const [isVisible, setIsVisible] = useState(false);

    
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
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

  useEffect(() => {
    window.scrollTo(0, 0); 
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

  return (
    <>
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
      <div className="font-inter mt-24">
        <motion.section
          className="py-14 lg:py-24 relative"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
              <motion.div className="img-box" variants={imageVariants}>
                <img
                  src="../src/assets/library.jpg"
                  alt="About Us tailwind page"
                  className="max-lg:mx-auto"
                />
              </motion.div>
              <motion.div className="lg:pl-[100px] flex items-center" variants={textVariants}>
                <div className="data w-full">
                  <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                    About Us
                  </h2>
                  <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                    Driven by a passion for seamless user experiences, we&apos;ve meticulously curated pagedone to empower creators, designers, and developers alike. Our mission is to provide a comprehensive toolkit, enabling you to build intuitive, beautiful interfaces that resonate with users on every interaction.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-14 lg:py-24 relative"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
              <motion.div className="lg:pr-24 flex items-center" variants={textVariants}>
                <div className="data w-full">
                  <motion.img
                    src="https://pagedone.io/asset/uploads/1702034785.png"
                    alt="About Us tailwind page"
                    className="block lg:hidden mb-9 mx-auto"
                    variants={imageVariants}
                  />
                  <motion.h2
                    className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center"
                    variants={textVariants}
                  >
                    We are Creative Since 2005
                  </motion.h2>
                  <motion.p
                    className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto"
                    variants={textVariants}
                  >
                    Pagedone isn’t just a collection of components and guidelines; it’s a philosophy. We go beyond aesthetics, prioritizing accessibility, scalability, and usability. Every element, from the tiniest detail to the grandest layout, is meticulously crafted to enhance functionality and elevate user satisfaction.
                  </motion.p>
                </div>
              </motion.div>
              <motion.div className="img-box" variants={imageVariants}>
                <img
                  src="https://pagedone.io/asset/uploads/1702034785.png"
                  alt="About Us tailwind page"
                  className="hidden lg:block"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-20 bg-white"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">
              Our results in numbers
            </h2>
            <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
              <motion.div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100" variants={textVariants}>
                <div className="flex gap-5">
                  <div className="font-manrope text-2xl font-bold text-indigo-600">
                    240%
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl text-gray-900 font-semibold mb-2">
                      Company growth
                    </h4>
                    <p className="text-xs text-gray-500 leading-5">
                      Company&apos;s remarkable growth journey as we continually innovate and drive towards new heights of success.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100" variants={textVariants}>
                <div className="flex gap-5">
                  <div className="font-manrope text-2xl font-bold text-indigo-600">
                    175+
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl text-gray-900 font-semibold mb-2">
                      Team members
                    </h4>
                    <p className="text-xs text-gray-500 leading-5">
                      Our very talented team members are the powerhouse of pagedone and pillars of our success.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100" variants={textVariants}>
                <div className="flex gap-5">
                  <div className="font-manrope text-2xl font-bold text-indigo-600">
                    625+
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl text-gray-900 font-semibold mb-2">
                      Projects Completed
                    </h4>
                    <p className="text-xs text-gray-500 leading-5">
                      We have accomplished more than 625 projects worldwide and we are still counting many more.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-14 lg:py-24 bg-gray-50"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mb-16 rounded-full">
              <h2 className="text-4xl font-manrope font-bold text-gray-900 text-center">
                What our happy users say!
              </h2>
            </div>
            <div className="flex justify-center items-center mt-8">
              <motion.div className="" variants={imageVariants}>
                <img
                  src="https://pagedone.io/asset/uploads/1704349534.png"
                  alt="Emily image"
                  className="mx-auto scale-90 transition-all duration-300 w-16 border rounded-full border-indigo-600"
                />
              </motion.div>
              <motion.div className="" variants={imageVariants}>
                <img
                  src="https://pagedone.io/asset/uploads/1704349572.png"
                  alt="Ethan image"
                  className="mx-auto scale-90 transition-all duration-300 w-16 border rounded-full border-indigo-600"
                />
              </motion.div>
              <motion.div className="" variants={imageVariants}>
                <img
                  src="https://pagedone.io/asset/uploads/1704349514.png"
                  alt="Olivia image"
                  className="mx-auto scale-90 transition-all duration-300 w-16 border rounded-full border-indigo-600"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}

export default About;
