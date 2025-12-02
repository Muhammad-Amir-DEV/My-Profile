function ProjectCard({ src, link, h3, p,onclick}) {
  return (
    <a  className='w-full sm:basis-[45%] md:basis-[45%] lg:basis-[30%] xl:basis-[22%]'onClick={onclick}>
      <img className="hover w-full bg-gray-200" src={src} alt={`${h3} img`} />
      <h3>{h3}</h3>
      <p>{p}</p>
    </a>
  );
}

export default ProjectCard;
