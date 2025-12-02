import { useState } from 'react';
import styles from './ProjectsStyles.module.css';
import Bithu from '../../assets/bithu.png';
import  bit from '../../assets/bit.jpeg';
import bit1 from '../../assets/bit1.jpg';
import bit2 from '../../assets/bit2.webp';
import bit4 from '../../assets/bit0.png';

import Brain from '../../assets/brainwave1.png';
import brain2 from '../../assets/brain2.png';
import brain1 from '../../assets/brain.jpeg';

import Leiapix from '../../assets/leiapix.jpg';
import sell1 from '../../assets/sell.jpeg';
import sell from '../../assets/sell1.png';
import sell3 from '../../assets/sell3.jpg';

import Nick from '../../assets/nickcoat.png';
import nike1 from '../../assets/nike1.png';
import nike from '../../assets/nike.jpeg';



import ProjectCard from '../../common/ProjectCard';
import ProjectPopup from '../../common/ProjectPopup';

function Projects() {
  
  const [selectedProject, setSelectedProject] = useState(null);
   const projects = [
    {
      id: 1,
      src: Bithu,
      h3: 'Bithu',
      p: 'NFT Selling App',
      link: 'https://github.com/melia1514',                    
      vercelLink: 'https://bithu.vercel.app',
      images: [bit, bit4, bit2, bit1, ],
    },
    {
      id: 2,
      src: Brain,
      h3: 'Brain Wave',
      p: 'Smart AI Tools',
      link: 'https://github.com/melia1514',                        
      vercelLink: 'https://bithu.vercel.app',
      images: [brain1, , brain2, Brain],
    },
    {
      id: 3,
      src: Leiapix,
      h3: 'Leiapix',
      p: 'NFT Creating App',
      link: 'https://github.com/melia1514',                         
      vercelLink: 'https://bithu.vercel.app',
      images: [sell1, sell, sell3],
    },
    {
      id: 4,
      src: Nick,
      h3: 'Nick Coats',
      p: 'Futuristic Coats Seller',
      link: 'https://github.com/melia1514'         ,                
      vercelLink: 'https://bithu.vercel.app',
      images: [nike1, nike, Nick],
    },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };
  return (
    <section id="projects" className={`${styles.container} bg-gray-900`}>
      <h1 className={`${styles.protitle} `}>Projects</h1>
      <div className={styles.projectsContainer}>
       {projects.map((project)=>( <ProjectCard key={project.id}
          src={project.src}
          link="https://github.com/mElia-pro1514"
          h3={project.h3}
          p={project.p}
          onclick={() => handleProjectClick(project)}
          
      />))}
      
      </div>
      {selectedProject && (
         <ProjectPopup  project={selectedProject} onClose={handleClosePopup}/>
       )}
    </section>
  );
}

export default Projects;



