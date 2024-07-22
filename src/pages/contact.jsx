import Footer from "../components/footer/Footer";
import NavbarHome from "../components/navbar/navbarHome";
import NavbarLogin from "../components/navbar/navbarLogin";


// eslint-disable-next-line react/prop-types
export default function Contact({isLoggedIn}) {

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
    <div>
        <header>
        <nav>
        {isLoggedIn ? (
        <NavbarLogin scrollToSection={scrollToSection} />
      ) : (
        <NavbarHome scrollToSection={scrollToSection} />
      )}
        </nav>
      </header>
      <div className="mt-36 animate-fade-up animate-once">
      <Footer ></Footer>
      </div>
    </div>
  )
}
