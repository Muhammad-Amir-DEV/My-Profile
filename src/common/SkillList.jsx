
function SkillList({ Icon, skill,Colors }) {
 
  return (
    <span className="flex items-center  hover:text-blue-500 transition-all duration-200">
      <Icon className={`${Colors} text-3xl  transition-all duration-200`} />
      <p className="text-lg text-gray-200">{skill}</p>
    </span>
  );
};
export default SkillList;