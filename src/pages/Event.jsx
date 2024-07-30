import NavbarLogin from "../components/navbar/navbarLogin";
import NavbarHome from "../components/navbar/navbarHome";
// import { request } from '../axios_helper';


// eslint-disable-next-line react/prop-types
export default function Event({isLoggedIn}) {

  
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
    <header>
    <nav>
    {isLoggedIn ? (
    <NavbarLogin scrollToSection={scrollToSection} />
  ) : (
    <NavbarHome scrollToSection={scrollToSection} />
  )}
    </nav>
  </header>
  )
}
