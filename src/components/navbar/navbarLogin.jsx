import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation} from 'react-router-dom'; 
import { logout } from '../../Utils/authUtils';
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Collections', href: '/collection', current: false },
  { name: 'Events', href: '/event', current: false },
  { name: 'FAQ', href: '/faq', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes ) {
  return classes.filter(Boolean).join(' ');
}

// eslint-disable-next-line react/prop-types
const NavbarLogin = ({ scrollToSection },{ onLogout }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoutClick = () => {
    localStorage.clear();
    logout();
    onLogout();
  };

  return (
    <Disclosure as="nav" className={`fixed top-0 left-0 w-full z-50  bg-white shadow-md transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 -translate-y-full'}`}>
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-10">
        <div className="relative flex h-32 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center sm:items-stretch">
            <div className="flex flex-shrink-0 items-center pb-4">
              <img
                alt="Your Company"
                src="../src/assets/logo.png"
                className="h-40 w-auto"
              />
            </div>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className="hidden sm:mr-10 sm:block">
              <div className="flex space-x-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href === 'contact' ? '#contact' : item.href}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    onClick={() => item.href === 'contact' && scrollToSection('contact')}
                    className={classNames(
                      location.pathname === item.href ? 'text-yellow-800' : 'text-slate-950 border-b-4 border-transparent hover:text-yellow-800 hover:border-b-4 hover:border-yellow-900',
                      'rounded-md px-3 py-2 text-lg font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div  className="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-0 mr-1">
              <div>
                <MenuButton className="relative  flex rounded-full bg-gray-800 text-sm hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="/src/assets/profile2.jpg"
                  className="h-10 w-10 rounded-full " // Augmenter la taille ici
                />
              </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a  href="/"
                    onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={location.pathname === item.href ? 'page' : undefined}
              onClick={() => item.href === 'contact' && scrollToSection('contact')}
              className={classNames(
                location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default NavbarLogin;
