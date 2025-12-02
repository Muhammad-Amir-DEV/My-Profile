import styles from './HeroStyles.module.css';
import heroImg from '../../assets/hero-img.png';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import CV from '../../assets/cv.pdf';
import { useTheme } from '../../common/ThemeContext';
import { space } from 'postcss/lib/list';
import { BiLogoGithub ,BiLogoTwitter,BiLogoLinkedin,BiLogoInstagram,BiLogoWhatsapp} from "react-icons/bi";

import Co from './co'

function Hero() {
  const theme = useTheme();
  const toggleTheme = useTheme();
  const hero_info = [
    {
      id: 1,
      name: "CUSTOMER",
      numberof: 3,
      border: false,
    },
    {
      id: 2,
      name: "COMPLETED PROJEECTS",
      numberof: 10,
      border: true,
    },
    {
      id: 3,
      name: "BRANDS COLLABORATION",
      numberof: 3,
      border: false,
    },
  ]

  return (
    <section id="hero" className={`${styles.container} bg-gray-900`}>
      <div className={styles.colorModeContainer}>
        <img
          src={heroImg}
          className={styles.hero}
          alt="Profile picture of Harris Johnsen"
        />
        <img
          className={styles.colorMode}
          src={sun}
          alt="Color mode icon"
          onClick={toggleTheme}
        />
      </div>
      <div className={styles.info}>


        <h1>
          Muhammad
          <br />
          Amir
        </h1>
        <h2>Frontend Developer</h2>
       
        <Co />
         <span>
          <a href="https://x.com/@MAmir369" target='_blank'>
           <BiLogoTwitter  className=' text-2xl  hover:text-[#0987f2] font-extrabold text-white' />
          </a>
          <a href="https://github.com/mElia-pro1514" target="_blank">
            <BiLogoGithub  className=' text-2xl  hover:text-[#0987f2] font-extrabold text-white'/>
          </a>
          <a href="https://linkedin.com/" target="_blank">
          <BiLogoLinkedin  className=' text-2xl  hover:text-[#0987f2] font-extrabold text-white'/>
          </a>
          <a href="https://wa.me//+923554763375" target='_blank'>
            <BiLogoWhatsapp className=' text-2xl  hover:text-[#0987f2] font-extrabold text-white'/>
          </a>
          <a href="https:in/@m.elia007" target='_blank '>
            <BiLogoInstagram className=' text-2xl  hover:text-[#0987f2] font-extrabold text-white'/>
          </a>
        </span>
        <p className={styles.description}>
          With a passion for developing modern React web apps for commercial
          businesses.
        </p>
        <a href={CV} download>
          <button className="hover">Resume</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
