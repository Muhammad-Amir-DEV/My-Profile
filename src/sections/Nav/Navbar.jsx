import Styles from './Navbar.module.css'
import { IoIosHome } from "react-icons/io";
import { IoIosBook } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import { IoIosBulb } from "react-icons/io";
import { IoIosCall,IoIosExit } from "react-icons/io";
import { Link } from 'react-router-dom'

import { BiSolidUserDetail ,BiLogoInstagram} from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

const Navbar = () => {
    return (
        <>
            <section id="nav" className={`${Styles.container}  z-10 bg-white/10 backdrop-blur `}>
                <div className={`${Styles.icons} ` }>
                    <div className={`${Styles.links} shadow-xl hover:shadow-[#0987f2]`}>
                        <Link  to={"/"}><BiSolidUserDetail /></Link>
                    </div>
                    <div className={`${Styles.links} shadow-xl hover:shadow-[#0987f2]`}>
                    <Link to={"/projects"}><FaProjectDiagram /></Link>
                    </div>
                    <div className={`${Styles.links} shadow-xl hover:shadow-[#0987f2]`}>

                    <Link to={"/skills"}><IoIosBulb /></Link>
                    </div>
                    <div className={`${Styles.links} shadow-xl hover:shadow-[#0987f2]`}>

                    <Link to={"/contact"}><BiSolidMessageRoundedDetail  /></Link>
                    </div>
                    {/* <IoIosCreate/> */}
                </div>
            </section>
        </>
    )
}
export default Navbar;