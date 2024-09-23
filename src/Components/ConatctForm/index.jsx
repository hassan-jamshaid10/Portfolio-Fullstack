import React from "react";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi"; // Importing the icons

const ContactForm = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-[#229799] text-lg font-bold uppercase mb-2">Contact</h2>
        <h1 className="text-3xl font-bold mb-4">I'd Love To Hear From You.</h1>
        <p className="text-gray-400 mb-8">
          Lorem ipsum Do commodo in proident enim in dolor cupidatat adipisicing dolore officia nisi aliqua incididunt. 
          Ut veniam lorem ipsum consectetur ut in eu do.
        </p>
        
        <form className="space-y-4 max-w-lg mx-auto">
          <input 
            className="w-full px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            type="text" placeholder="Name" />
          <input 
            className="w-full px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            type="email" placeholder="Email" />
          <input 
            className="w-full px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            type="text" placeholder="Subject" />
          <textarea 
            className="w-full h-32 px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            placeholder="Message"></textarea>
          <button 
            className="w-full bg-black text-white font-bold py-2 px-4 rounded border border-white transition-all duration-300 hover:bg-[#229799]">
            Submit
          </button>
        </form>
      </div>

      <div className="mt-16 flex flex-col md:flex-row justify-around text-center px-4">
        {/* Each section wrapped in flexbox */}
        <div className="mb-8 md:mb-0 flex flex-col items-center">
          <div className="text-[#48CFCB] mb-2 text-3xl">
            <FiMapPin /> {/* React icon for location */}
          </div>
          <h4 className="text-[#229799] mb-1 font-bold uppercase">Where to find me</h4>
          <p className="text-white text-center">1600 Amphitheatre Parkway <br /> Mountain View, CA <br /> 94043 US</p>
        </div>

        <div className="mb-8 md:mb-0 flex flex-col items-center">
          <div className="text-[#48CFCB] mb-2 text-3xl">
            <FiMail /> {/* React icon for email */}
          </div>
          <h4 className="text-[#229799] mb-1 font-bold uppercase">Email me at</h4>
          <p className="text-white text-center">someone@kardswebsite.com <br /> info@kardswebsite.com</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[#48CFCB] mb-2 text-3xl">
            <FiPhone /> {/* React icon for phone */}
          </div>
          <h4 className="text-[#229799] mb-1 font-bold uppercase">Call me at</h4>
          <p className="text-white text-center">
            Phone: (+63) 555 1212 <br />
            Mobile: (+63) 555 0100 <br />
            Fax: (+63) 555 0101
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
