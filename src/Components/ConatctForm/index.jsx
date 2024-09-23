import React, { useState } from "react";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs.send("service_2y2ovci", "template_bfgvq39", formData, "mxAtLj58FZbHf8xO7")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setShowPopup(true); // Show the popup
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form data
        
        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to send email. Error:", err);
      });
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-[#229799] text-lg font-bold uppercase mb-2">Contact</h2>
        <h1 className="text-3xl font-bold mb-4">I'd Love To Hear From You.</h1>
        <p className="text-gray-400 mb-8">
          Whether you have a question, want to discuss a potential collaboration, or just want to say hello, feel free to reach out. Please use the form below to send me a message, and I will get back to you as soon as possible.
        </p>

        <form className="space-y-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input 
            className="w-full px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            type="text" 
            name="name"
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input 
            className="w-full px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            className="w-full px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            type="text" 
            name="subject"
            placeholder="Subject" 
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea 
            className="w-full h-32 px-4 py-2 bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-pink-500 rounded" 
            name="message"
            placeholder="Message | add your name email at end of message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-black text-white font-bold py-2 px-4 rounded border border-white transition-all duration-300 hover:bg-[#229799]">
            Submit
          </button>
        </form>

        {/* Conditional rendering for pop-up notification */}
        {showPopup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded shadow-lg z-50">
            Your message has been sent successfully!
          </div>
        )}
      </div>

      <div className="mt-16 flex flex-col md:flex-row justify-around text-center px-4">
        <div className="mb-8 md:mb-0 flex flex-col items-center">
          <div className="text-[#48CFCB] mb-2 text-3xl">
            <FiMapPin />
          </div>
          <h4 className="text-[#229799] mb-1 font-bold uppercase">Where to find me</h4>
          <p className="text-white text-center">Lahore, Punjab, Pakistan</p>
        </div>

        <div className="mb-8 md:mb-0 flex flex-col items-center">
          <div className="text-[#48CFCB] mb-2 text-3xl">
            <FiMail />
          </div>
          <h4 className="text-[#229799] mb-1 font-bold uppercase">Email me at</h4>
          <p className="text-white text-center">hjamshaid81@gmail.com</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[#48CFCB] mb-2 text-3xl">
            <FiPhone />
          </div>
          <h4 className="text-[#229799] mb-1 font-bold uppercase">Call me at</h4>
          <p className="text-white text-center">
            Phone: (+92) 312 4384133
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
