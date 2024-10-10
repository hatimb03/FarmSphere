import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-green-800 text-white px-5 py-4 md:px-20 md:py-8 flex justify-between items-center'>
      <p className=' md:text-base font-semibold'>&copy; Hatim Barwahwala</p>
      <div className='flex items-center gap-8 text-2xl'>
        <a className='cursor-pointer hover:text-green-200'>
          <FaGithub />
        </a>
        <a className='cursor-pointer hover:text-green-200'>
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
