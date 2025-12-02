import { FaHtml5 } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io5';
import { FaJs } from 'react-icons/fa';
import { BiLogoTypescript } from 'react-icons/bi';
import { FaReact } from 'react-icons/fa';
import {  BiLogoTailwindCss } from "react-icons/bi"; // Updated import for Tailwind CSS
import { FaNodeJs } from 'react-icons/fa';
import { FaGithub,FaDiagramNext } from "react-icons/fa6";
import { FaBootstrap } from 'react-icons/fa';
import styles from './SkillsStyles.module.css';
import SkillList from '../../common/SkillList';
import { useTheme } from '../../common/ThemeContext';

function Skills() {
  const theme = useTheme();
  // const colors = ["",, ,,  ,, "", ]
  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.skillList}>
        <SkillList Colors={"text-[#d53300]"} Icon={FaHtml5} skill="HTML" />
        <SkillList Colors={"text-[#3c88ff]"} Icon={IoLogoCss3} skill="CSS" />
        <SkillList Colors={"text-[#c1c112]"} Icon={FaJs} skill="JavaScript" />
        <SkillList Colors={"text-[#224ecf]"} Icon={BiLogoTypescript} skill="TypeScript" />
      </div>

      <div className={`${styles.skillList} border-t-[1.8px] flex  items-center justify-center gap-4 border-b-[1.8px] py-8 border-gray-700 }`}>
        <SkillList Colors={"text-[#00c2ff]"} Icon={FaReact} skill="React" />
        <SkillList Colors={"text-[#1e771e]"} Icon={FaNodeJs} skill="Node" />
      </div>

      <div className={styles.skillList}>
        <SkillList Colors={"text-blue-500"} Icon={BiLogoTailwindCss} skill="Tailwind CSS" />
        <SkillList Colors={"text-white/90"} Icon={FaGithub} skill="Git" />
        <SkillList Colors={"text-blue-700"} Icon={FaBootstrap} skill="Bootstrap" />
      </div>
    </section>
  );
}

export default Skills;
