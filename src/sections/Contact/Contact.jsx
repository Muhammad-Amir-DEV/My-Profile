import { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";

function Contact() {
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("name").trim() || !formData.get("email").trim() || !formData.get("message").trim()) {
      setStatus('Please fill out all fields.');
      setTimeout(() => setStatus(''), 1000);
      return;
    }

    setIsSending(true);

    emailjs.sendForm(
      'service_o52rg0h',   // Replace with your EmailJS Service ID
      'template_v34d45v',   // Replace with your EmailJS Template ID
      e.target,
      'DfMbNAKkROKV7ScEP' 
    ).then((result) => {
      setIsSending(false);
      setStatus('Message sent successfully!');
      setTimeout(() => setStatus(''), 2000);
    }).catch((error) => {
      setIsSending(false);
      setStatus('Failed to send message. Please try again.');
      setTimeout(() => setStatus(''), 2000);
    });

    e.target.reset();
  };

  return (
    <section className="pt-10 pb-8 px-6  mx-auto  text-center w-full">
      <h1 className="text-3xl mt-12 lg:mt-20 font-semibold text-gray-100 mb-8">Contact ME</h1>
      
      <form onSubmit={sendEmail} className=" relative flex items-center justify-center flex-col gap-6 mx-auto w-[95%] sm:w-[85%] md:w-[50%] 2xl:w-[40%] pt-8">
        
        <div className=' w-full'>
          <label htmlFor="name" className="sr-only ">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            className="w-full h-12 2xl:h-20  px-4 2xl:text-3xl placeholder:2xl:text-3xl rounded-lg bg-transparent text-gray-200 border border-gray-700 focus:border-gray-500 focus:outline-none transition"
          />
        </div>

        <div className=' w-full'>
          <label htmlFor="email" className="sr-only ">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full h-12 2xl:h-20  px-4 2xl:text-3xl placeholder:2xl:text-3xl rounded-lg bg-transparent text-gray-200 border border-gray-700 focus:border-gray-500 focus:outline-none transition"
          />
        </div>

        <div className=' w-full'>
          <label htmlFor="message" className="sr-only ">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            required
            className="w-full h-40 px-4 2xl:h-[25rem] 2xl:text-3xl  py-2 placeholder:2xl:text-3xl rounded-lg bg-transparent text-gray-200 border border-gray-700 focus:border-gray-500 focus:outline-none transition resize-none"
          ></textarea>
        </div>

       
          {status && (
          <div className={`flex  items-center gap-3 justify-center  rounded-lg text-[16px] font-light transition-opacity duration-500 2xl:text-[30px]
            ${status.includes('success') ? 'text-green-500  ' : 'text-red-500'}
          `}>
            {status.includes('success') ? <><div><FaRegCircleCheck/></div>
             <div>{status}</div></> : <> <div><MdError/></div> <div>{status}</div></>}
            
          </div>
        )}
        <button
          type="submit"
          disabled={isSending}
          className={`w-40 h-12 2xl:h-[5rem] 2xl:w-[20rem] mt-2 mx-auto 2xl:text-2xl rounded-lg font-semibold text-gray-100 transition-all duration-200
            ${isSending ? 'bg-gray-700 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {isSending ? 'Sending...' : 'Submit'}
        </button>

         
        
       
      </form>
    </section>
  );
}

export default Contact;
