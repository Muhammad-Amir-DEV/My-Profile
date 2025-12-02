import { BiSolidUserDetail, BiLogoGithub, BiCopyright,BiHide } from "react-icons/bi";
import styles from './FooterStyles.module.css';

function Footer() {
  return (
    <section id="footer" className={`${styles.container} bg-gray-900 mt`}>
      <p className=" flex items-center justify-center text-center gap-3">
        <BiCopyright/> 2024 Muhammad Amir.
        All rights reserved.
      </p>
    </section>
  );
}

export default Footer;
