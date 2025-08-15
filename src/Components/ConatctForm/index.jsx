import React, { useState, useCallback, useRef, useEffect } from "react";
import { FiMapPin, FiMail, FiPhone, FiSend, FiUser, FiMessageSquare, FiTarget } from "react-icons/fi";
import { FaRocket, FaBrain, FaCode } from "react-icons/fa";
import emailjs from "emailjs-com";

const contactInfo = [
  {
    id: 1,
    icon: <FiMapPin size={24} />,
    title: "Location",
    details: "Lahore, Punjab, Pakistan",
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    id: 2,
    icon: <FiMail size={24} />,
    title: "Email",
    details: "hjamshaid81@gmail.com",
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    id: 3,
    icon: <FiPhone size={24} />,
    title: "Phone",
    details: "(+92) 312 4384133",
    gradient: "from-purple-400 to-pink-500"
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        "service_2y2ovci", 
        "template_bfgvq39", 
        formData, 
        "mxAtLj58FZbHf8xO7"
      );
      
      setShowPopup(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to send email. Error:", err);
      setErrorPopup(true);
      
      setTimeout(() => {
        setErrorPopup(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.contact-element');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="relative py-20 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-6xl mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center mb-16 contact-element">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <FiMessageSquare className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-6">
            Let's Build Something Amazing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? I'm here to help you create innovative solutions 
            that drive business growth and user engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-element">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FiSend className="text-cyan-400" />
                Send Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400 transition-all duration-300 group-focus-within:text-cyan-400">
                      <FiUser size={20} />
                    </div>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all duration-300"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label 
                      htmlFor="name"
                      className={`absolute left-12 top-4 text-gray-400 transition-all duration-300 ${
                        focusedField === 'name' || formData.name ? 'text-xs -translate-y-6 text-cyan-400' : 'text-base'
                      }`}
                    >
                      {focusedField === 'name' || formData.name ? 'Name' : 'Name'}
                    </label>
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400 transition-all duration-300 group-focus-within:text-purple-400">
                      <FiMail size={20} />
                    </div>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label 
                      htmlFor="email"
                      className={`absolute left-12 top-4 text-gray-400 transition-all duration-300 ${
                        focusedField === 'email' || formData.email ? 'text-xs -translate-y-6 text-purple-400' : 'text-base'
                      }`}
                    >
                      {focusedField === 'email' || formData.email ? 'Email' : 'Email'}
                    </label>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400 transition-all duration-300 group-focus-within:text-emerald-400">
                      <FiTarget size={20} />
                    </div>
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all duration-300"
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label 
                      htmlFor="subject"
                      className={`absolute left-12 top-4 text-gray-400 transition-all duration-300 ${
                        focusedField === 'subject' || formData.subject ? 'text-xs -translate-y-6 text-emerald-400' : 'text-base'
                      }`}
                    >
                      {focusedField === 'subject' || formData.subject ? 'Subject' : 'Subject'}
                    </label>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400 transition-all duration-300 group-focus-within:text-orange-400">
                      <FiMessageSquare size={20} />
                    </div>
                    <textarea
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all duration-300 resize-none"
                      name="message"
                      id="message"
                      rows="5"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                    ></textarea>
                    <label 
                      htmlFor="message"
                      className={`absolute left-12 top-4 text-gray-400 transition-all duration-300 ${
                        focusedField === 'message' || formData.message ? 'text-xs -translate-y-6 text-orange-400' : 'text-base'
                      }`}
                    >
                      {focusedField === 'message' || formData.message ? 'Message' : 'Message'}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaRocket className="group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Launch Project</span>
                      </>
                    )}
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-element space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map(({ id, icon, title, details, gradient }) => (
                <div key={id} className="group">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                      </div>
                      <div>
                        <h4 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-1">
                          {title}
                        </h4>
                        <p className="text-white text-lg">{details}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl border border-cyan-500/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaBrain className="text-cyan-400" />
                Why Choose Me?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span>Innovative problem-solving approach</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span>Cutting-edge technology expertise</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span>Fast turnaround times</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span>Ongoing support & maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-2xl border border-emerald-400/20 backdrop-blur-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FiSend className="text-white" />
              </div>
              <span className="font-semibold">Message sent successfully!</span>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errorPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl shadow-2xl border border-red-400/20 backdrop-blur-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FiMessageSquare className="text-white" />
              </div>
              <span className="font-semibold">Failed to send message. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
