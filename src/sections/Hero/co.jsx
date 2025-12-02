import React, { useEffect, useRef, useState } from 'react';

// Example high "start" values for the animated count down
const hero_info = [
  { id:1, name:"CUSTOMER", start:14, numberof:3, border:false },
  { id:2, name:"COMPLETED PROJECTS", start:30, numberof:10, border:true },
  { id:3, name:"BRANDS COLLABORATION", start:12, numberof:3, border:false },
];

function AnimatedCounts() {
  const [counts, setCounts] = useState(hero_info.map(i => i.start));
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStarted(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
 
  useEffect(() => {
    if (!started) return;
    const duration = 2200;
    const steps = 40;
    const decrements = hero_info.map(i => (i.start - i.numberof) / steps);
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setCounts(prev =>
        prev.map((v, i) =>
          Math.max(Math.round(hero_info[i].start - decrements[i] * frame), hero_info[i].numberof)
        )
      );
      if (frame >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <div ref={ref} className='flex items-center justify-center gap-4 md:gap-6 w-full py-3 px-3  md:px-8'>
      {hero_info.map((item, idx) => (
        <div key={item.id} className={item.border? 'border-x-[1px] px-4 md:px-8   box-border border-gray-500': ''}>
          <div className='text-xl md:text-2xl font-extrabold text-[#0987f2] flex items-center justify-center'>
            {counts[idx] < 10? <span>0</span>: ''}{counts[idx]}+
          </div>
          <p className=' text-[12px] md:text-[14px] text-gray-300 font-extrabold'>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default AnimatedCounts;