import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiSolidUserDetail, BiLogoGithub, BiCopyright,BiHide } from "react-icons/bi";
import style from '../sections/Hero/HeroStyles.module.css'
function ProjectPopup({ project, onClose }) {
    const [currentImage, setCurrentImage] = useState(project.images[0]);
    const [zoom, setZoom] = useState(1);

    return (
        <div className=' z-40 bg-gray-950/95 h-[100vh] flex items-center justify-center fixed w-full text-white'>

            <div className='bg-gray-900  w-full md:w-[90%] lg:w-[95%] xl:w-[80%] border-2 border-gray-800 h-full md:h-[90%] lg:h-[85%] px-8 py-16 md:px-4 md:py-4  box-border md:rounded-lg relative 2xl:w-[1600px]  2xl:h-[1000px] 2xl:flex 2xl:items-center 2xl:justify-center 2xl:mx-auto  '>
                <button onClick={onClose} className=' absolute top-[20px] md:top-[6px] right-[20px] text-2xl md:right-[6px] md:text-xl  2xl:text-3xl hover:bg-red-600 rounded-full  hover:scale-125'>
                    <RxCross2 />
                </button>
                <div className=" h-full w-full flex flex-col justify-center ">
                    <div className="h-[5%] lg:h-[10%] pb-[5rem] md:pb-[2.3rem]"><h3 className=" text-4xl font-bold md:text-4xl  md:font-semibold 2xl:text-6xl">{project.h3}</h3></div>
                    <div className="flex items-center justify-center flex-col lg:flex-row  h-[90%] lg:h-[90%] w-full gap-4 relative lg:overflow-hidden">
                        <div className=' w-full lg:w-[85%] h-[85%] lg:h-full'>
                            <div className=" rounded-xl px-5 lg:px-10 py-3 lg:py-6 w-full h-full flex  flex-col items-center lg:justify-between gap-6 ">
                                <div className='lg:ani relative  w-full md:w-[90%] lg:w-[70%] 2xl:w-[85%] h-[90%] flex  items-center overflow-auto  '>
                                    <img src={currentImage} className=' p-4 my-auto w-fit h-auto rounded-md' alt="" />

                                </div>
                                <div className='h-[10%] w-full md:w-[30%] flex items-center justify-center gap-11 md:justify-between bottom-0'>
                                    <a className='hover:bg-[#0985f20b] flex items-center justify-center gap-1  bg-[#0985f2e3]  border-2 border-[#0985f2e3] px-4 py-2  font-semibold 2xl:text-xl 2xl:gap-3 2xl:py-4 2xl:px-8 rounded' href={project.vercelLink} target="_blank" rel="noopener noreferrer">

                                        <BiHide /> Preview
                                    </a>
                                    <a className="hover:bg-[#0985f2e3] flex items-center justify-center gap-1 bg-[#0985f200] border-2 border-[#0985f2e3] px-4 py-2  font-semibold rounded 2xl:text-xl 2xl:gap-3 2xl:py-4 2xl:px-8 " href={project.link} target="_blank" rel="noopener noreferrer">
                                        <BiLogoGithub />   GitHub
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className=' w-full lg:w-[10%] h-[15%] lg:h-full md:py-5 '>
                            <div className="rounded-xl  bg-[#ffffff12] flex  items-center justify-center px-6 py-10 lg:py-6 2xl:py-0 2xl:px-0  flex-col w-full h-full ">
                                <div className=" w-full md:w-[30%] h-full flex items-center justify-center lg:flex-col flow-row gap-2 2xl:gap-4     ">
                                    {project.images.map((image, index) => (
                                        <div className={`${project.images[index] == currentImage ? ' border-2 border-[#0987f2] rounded  w-[5rem] h-[3rem] 2xl:w-[7rem] lg:h-fit  ' : 'w-[5rem] 2xl:w-[7rem]  h-[3rem] lg:h-fit overflow-auto'} " overflow-hidden rounded  flex items-center justify-center flex-col"`} key={index}>
                                            <img
                                                className=' h-auto lg:h-fit lg:w-fit w-auto'
                                                key={index}
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                onClick={() => setCurrentImage(image)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProjectPopup;