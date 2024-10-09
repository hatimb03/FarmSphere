import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className='bg-green-800 text-white px-5 py-4 md:px-20 md:py-8 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>
        Farm<span className='text-yellow-400'>Sphere</span>
      </h1>

      {/* Desktop Menu */}
      <ul className='hidden md:flex gap-12 '>
        <li className='hover:text-green-300 cursor-pointer'>Home</li>
        <li className='hover:text-green-300 cursor-pointer'>Features</li>
        <li className='hover:text-green-300 cursor-pointer'>About</li>
        <li className='hover:text-green-300 cursor-pointer'>Contact</li>
      </ul>

      <div className='md:hidden'>
        <GiHamburgerMenu
          className='text-2xl cursor-pointer'
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      {showMenu && (
        <ul className='absolute top-16 right-0 w-1/2 bg-green-800 text-lg flex flex-col items-center gap-4 py-4 md:hidden'>
          <li
            className='hover:text-green-300 cursor-pointer'
            onClick={() => setShowMenu(false)}
          >
            Home
          </li>
          <li
            className='hover:text-green-300 cursor-pointer'
            onClick={() => setShowMenu(false)}
          >
            Features
          </li>
          <li
            className='hover:text-green-300 cursor-pointer'
            onClick={() => setShowMenu(false)}
          >
            About
          </li>
          <li
            className='hover:text-green-300 cursor-pointer'
            onClick={() => setShowMenu(false)}
          >
            Contact
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
