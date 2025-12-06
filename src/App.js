import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const observerRef = useRef(null);

  // Scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (currentPage !== 'home') return;
      
      const sections = ['home', 'about', 'tools', 'works', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentPage]);

  const scrollToSection = (sectionId) => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  const tools = [
  { name: 'Premiere Pro', icon: '/icons/premiere_pro.png', color: '#9999FF' },
  { name: 'Photoshop', icon: '/icons/photoshop.png', color: '#31A8FF' },
  { name: 'Figma', icon: '/icons/figma.png', color: '#F24E1E' },
  { name: 'Canva', icon: '/icons/canva.png', color: '#00C4CC' },
  { name: 'Lightroom', icon: '/icons/lightroom.png', color: '#31C5F0' }
  ];



  const videos = {
    horizontal: [
      { id: 1, title: 'Commercial Edit', embed: 'Idx4ejAwCq0' },
      { id: 2, title: 'Guest AV', embed: '4k98dNV_B1U' },
      { id: 3, title: 'Day in a Life', embed: 'vfyIIo1E4ZA' }
    ],
    vertical: [
      { id: 4, title: 'Vertical #1', embed: 'a6IjMA6VhoI' },
      { id: 5, title: 'Vertical #2', embed: 'pylJ2ZvItjI' },
      { id: 6, title: 'Vertical #3', embed: '4dAqlvkVnzk' },
      { id: 7, title: 'Vertical #4', embed: 'aiLAkzjHru0' },
      { id: 8, title: 'Vertical #5', embed: '2Rl6YIyGZ7o' }
    ]
  };

  const graphicCategories = [
    { id: 'posters', name: 'POSTERS', icon: '📄', desc: 'Eye-catching poster designs for events and promotions', gradient: 'from-red-900 to-red-600' },
    { id: 'logos', name: 'LOGO DESIGNS', icon: '🎯', desc: 'Unique brand identities and logo concepts', gradient: 'from-red-900 to-red-600' },
    { id: 'apparel', name: 'APPAREL DESIGNS', icon: '👕', desc: 'Creative designs for clothing and merchandise', gradient: 'from-red-900 to-red-600' },
    { id: 'social', name: 'SOCIAL MEDIA', icon: '📱', desc: 'Social media graphics and content designs', gradient: 'from-red-900 to-red-600' },
    { id: 'thumbnails', name: 'YOUTUBE THUMBNAILS', icon: '▶️', desc: 'Clickable thumbnails that drive engagement', gradient: 'from-red-900 to-red-600' },
    { id: 'uiux', name: 'UI/UX', icon: '💻', desc: 'User interface and experience design projects', gradient: 'from-red-900 to-red-600' }
  ];

  const categoryImages = {
    posters: Array(9).fill(null).map((_, i) => ({ 
      id: i, 
      url: `/images/posters/poster-${i + 1}.jpg`,
      title: `Poster Design ${i + 1}`
    })),
    logos: Array(9).fill(null).map((_, i) => ({ 
      id: i, 
      url: `/images/logos/logo-${i + 1}.png`,
      title: `Logo Design ${i + 1}`
    })),
    apparel: Array(6).fill(null).map((_, i) => ({ 
      id: i, 
      url: `/images/apparel/apparel-${i + 1}.png`,
      title: `Apparel Design ${i + 1}`
    })),
    social: Array(6).fill(null).map((_, i) => ({ 
      id: i, 
      url: `/images/social/social-${i + 1}.png`,
      title: `Social Media Post ${i + 1}`
    })),
    thumbnails: Array(6).fill(null).map((_, i) => ({ 
      id: i, 
      url: `/images/thumbnails/thumbnail-${i + 1}.png`,
      title: `Thumbnail ${i + 1}`
    })),
    uiux: Array(6).fill(null).map((_, i) => ({ 
      id: i, 
      url: `/images/uiux/uiux-${i + 1}.png`,
      title: `UI/UX Design ${i + 1}`
    }))
  };

  const openCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage('category');
    window.scrollTo(0, 0);
  };

  const openLightbox = (images, index) => {
    setLightboxImage(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxIndex(0);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImage.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImage.length) % lightboxImage.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
      return;
    }

    setFormStatus('sending');

    // Replace these with your actual EmailJS credentials
    const serviceId  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Rahul Malaikani'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 5000);
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setFormStatus('failed');
        setTimeout(() => setFormStatus(''), 5000);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
        
        @font-face {
          font-family: 'Akira';
          src: url('/fonts/Akira.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Helvetica';
          src: url('/fonts/Helvetica.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Gilroy';
          src: url('/fonts/Gilroy.ttf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Syncopate';
          src: url('/fonts/Syncopate.ttf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .akira-font {
          font-family: 'Akira', sans-serif;
        }

        .helvetica-font {
          font-family: 'Helvetica', sans-serif;
        }

        .gilroy-font {
          font-family: 'Gilroy', sans-serif;
        }

        .syncopate-font {
          font-family: 'Syncopate', sans-serif;
        }

        * {
          font-family: 'Gilroy', sans-serif;
        }

        
        
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-strong {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .glass-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .glass-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .glass-hover:hover::before {
          left: 100%;
        }
        
        .glass-hover:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(239, 68, 68, 0.6);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-2deg); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.5),
                        0 0 60px rgba(239, 68, 68, 0.3),
                        inset 0 0 20px rgba(239, 68, 68, 0.1);
          }
          50% { 
            box-shadow: 0 0 50px rgba(239, 68, 68, 0.8),
                        0 0 100px rgba(239, 68, 68, 0.5),
                        inset 0 0 30px rgba(239, 68, 68, 0.2);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #ef4444 50%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .hero-bg {
          background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 40%),
                      radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 40%);
        }
        
        .smooth-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        input, textarea {
          transition: all 0.3s ease;
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: rgba(239, 68, 68, 0.6);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          transform: scale(1.01);
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .reveal-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-left.reveal-active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .reveal-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-right.reveal-active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .reveal-scale {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-scale.reveal-active {
          opacity: 1;
          transform: scale(1);
        }
        
        .glow-on-hover {
          position: relative;
          z-index: 0;
        }
        
        .glow-on-hover::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c, #991b1b, #7f1d1d);
          background-size: 400%;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          border-radius: inherit;
          animation: rotate 8s linear infinite;
        }
        
        .glow-on-hover:hover::before {
          opacity: 1;
        }
        
        .tool-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tool-card:hover {
          transform: translateY(-10px) rotate(2deg);
        }
        
        .tool-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s;
          background: radial-gradient(circle at center, rgba(239, 68, 68, 0.2), transparent 70%);
        }
        
        .tool-card:hover::after {
          opacity: 1;
        }
        
        .video-container {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .video-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0));
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        
        .video-container:hover::after {
          opacity: 1;
        }
        
        .video-container:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .category-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .category-card::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.3), transparent 70%);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .category-card:hover::before {
          width: 300%;
          height: 300%;
        }
        
        .image-hover-zoom {
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .image-hover-zoom img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .image-hover-zoom:hover img {
          transform: scale(1.1) rotate(2deg);
        }
        
        .button-glow {
          position: relative;
          overflow: hidden;
        }
        
        .button-glow::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .button-glow:hover::after {
          width: 300px;
          height: 300px;
        }
        
        .parallax {
          transition: transform 0.3s ease-out;
        }
        
        @media (max-width: 768px) {
          .glass-hover:hover {
            transform: translateY(-5px) scale(1.01);
          }
        }

        .sliding-text-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .sliding-text {
          display: inline-flex;
          white-space: nowrap;
          animation: slide 50s linear infinite;
        }

        .sliding-text span {
          padding-right: 2rem; /* optional spacing between repeats */
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }


        /* Optional: Pause on hover */
        .sliding-text-wrapper:hover .sliding-text {
          animation-play-state: paused;
        }



        /* Add at the end of your existing styles, before closing </style> */
        /* Extra responsive adjustments */
        @media (max-width: 640px) {
          .glass-strong {
            padding: 1rem;
          }
          
          .sliding-text span {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .sliding-text span {
            font-size: 2rem;
          }
        }

        @media (max-width: 375px) {
          .sliding-text span {
            font-size: 1.75rem;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 768px) and (max-width: 1024px) {
          .tool-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div 
            className="akira-font text-xl sm:text-2xl font-bold gradient-text cursor-pointer smooth-transition hover:scale-110" 
            onClick={() => scrollToSection('home')}
          >
            RM
          </div>
          
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {['home', 'about', 'tools', 'works', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`smooth-transition relative group ${
                  activeSection === section ? 'text-red-500' : 'text-white hover:text-red-400'
                }`}
              >
                {section.toUpperCase()}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-left transition-transform duration-300 ${
                  activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </button>
            ))}
          </div>

          <button 
            className="md:hidden text-white smooth-transition hover:scale-110 hover:text-red-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass-strong border-t border-white/10 animate-fade-in-up">
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {['home', 'about', 'tools', 'works', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left smooth-transition ${
                    activeSection === section ? 'text-red-500' : 'text-white hover:text-red-400'
                  }`}
                >
                  {section.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center hero-bg relative overflow-hidden px-4">
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-red-500 rounded-full"
                  style={{
                    width: Math.random() * 300 + 50 + 'px',
                    height: Math.random() * 300 + 50 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                    animationDelay: Math.random() * 5 + 's',
                    filter: 'blur(60px)'
                  }}
                />
              ))}
            </div>
            
            <div 
              className="text-center z-10 parallax w-full max-w-6xl"
              style={{
                transform: window.innerWidth > 768 ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : 'none'
              }}
            >
              <h1
                className="
                  text-[2.6rem]          /* very small phones */
                  sm:text-[3rem]
                  md:text-[5.5rem]
                  lg:text-[7rem]
                  xl:text-[8.5rem]
                  font-bold
                  mb-6
                  leading-[0.8]          /* more breathing room on phones */
                  sm:leading-[0.8]
                  md:leading-[0.75]
                  lg:leading-[0.725]
                  animate-fade-in-up
                "
              >
                <span className="akira-font text-red-500 block hover:scale-110 smooth-transition cursor-pointer">
                  RAHUL
                </span>
                <span className="akira-font text-red-500 block hover:scale-110 smooth-transition cursor-pointer">
                  MALAIKANI
                </span>
              </h1>

              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-300 animate-fade-in-up px-4" style={{animationDelay: '0.1s'}}>
                Video Editor & Graphic Designer
              </p>
              <p className="text-sm sm:text-lg md:text-xl text-gray-400 mt-3 sm:mt-4 animate-fade-in-up px-4" style={{animationDelay: '0.2s'}}>
                Crafting Visual Stories That Captivate
              </p>
              <button
                onClick={() => scrollToSection('works')}
                className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 glass glass-hover rounded-full text-base sm:text-lg font-semibold smooth-transition animate-fade-in-up"
                style={{animationDelay: '0.3s'}}
              >
                View My Work
              </button>
            </div>

            {/* Infinite Sliding Text Animation */}
            <div className="absolute bottom-3 left-0 w-full overflow-hidden cursor-pointer">
              <div className="sliding-text-wrapper">
                <div className="sliding-text">
                  <span className="syncopate-font text-6xl font-bold text-white opacity-5 whitespace-nowrap">
                    RAHUL MALAIKANI . PORTFOLIO . V01 . VIDEO EDITOR . GRAPHIC DESIGNER . 
                  </span>

                  <span className="syncopate-font text-6xl font-bold text-white opacity-5 whitespace-nowrap">
                    RAHUL MALAIKANI . PORTFOLIO . V01 . VIDEO EDITOR . GRAPHIC DESIGNER .      
                  </span>

                </div>
              </div>
            </div>

          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 relative">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-float-slow"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="max-w-6xl w-full relative">
              {/* Main Content Card */}
              <div className="rounded-3xl p-1 relative overflow-hidden group">
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-900 opacity-0 group-hover:opacity-10 smooth-transition blur-xl"></div>
                
                <div className="glass-strong rounded-3xl p-6 sm:p-8 md:p-12 relative z-10">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="order-2 md:order-1 space-y-6">
                      <div className="relative">
                        <h2 className="akira-font text-4xl md:text-5xl font-bold mb-2 gradient-text" style={{ wordSpacing: '-8px' }}>About Me</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-gray-300 text-lg leading-relaxed hover:text-white smooth-transition relative pl-4 border-l-2 border-red-500/50 hover:border-red-500">
                          Hi! I'm <span className="text-white font-semibold">Rahul Malaikani</span>, a passionate Video Editor and Graphic Designer with a keen eye for detail and a love for storytelling through visuals.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed hover:text-white smooth-transition relative pl-4 border-l-2 border-red-500/30 hover:border-red-500">
                          I specialize in creating compelling video content and stunning graphic designs that help brands stand out. With expertise in Adobe Creative Suite and modern design tools, I transform ideas into visual masterpieces.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed hover:text-white smooth-transition relative pl-4 border-l-2 border-red-500/20 hover:border-red-500">
                          Whether it's editing short-form engaging videos or cinematic visuals, or designing posters, logos, apparel, thumbnails, social posts, or UI/UX, I love creating visuals that look good and feel intentional!
                        </p>
                      </div>

                      {/* Stats/Highlights */}
                      <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="glass rounded-xl p-4 text-center hover:scale-105 smooth-transition cursor-pointer">
                          <div className="text-3xl font-bold gradient-text">4+</div>
                          <div className="text-sm text-gray-400 mt-1">Years</div>
                        </div>
                        <div className="glass rounded-xl p-4 text-center hover:scale-105 smooth-transition cursor-pointer">
                          <div className="text-3xl font-bold gradient-text">100+</div>
                          <div className="text-sm text-gray-400 mt-1">Projects</div>
                        </div>
                        {/* <div className="glass rounded-xl p-4 text-center hover:scale-105 smooth-transition cursor-pointer">
                          <div className="text-3xl font-bold gradient-text">50+</div>
                          <div className="text-sm text-gray-400 mt-1">Clients</div>
                        </div> */}
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="order-1 md:order-2 flex justify-center relative">
                      {/* Decorative Rings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-80 h-80 md:w-96 md:h-96 border-2 border-red-500/20 rounded-full "></div>
                      </div>

                      {/* Image Container */}
                      <div className="relative z-10">
                        <div className="glass-strong rounded-3xl relative overflow-hidden group">
                          
                          <img
                            src="photo2.png"
                            alt="Rahul Malaikani"
                            className="rounded-3xl w-72 h-72 md:w-96 md:h-96 object-cover smooth-transition group-hover:scale-105 relative z-0"
                          />
                          
                    
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-4 -right-4 glass-strong rounded-2xl px-6 py-3 shadow-2xl animate-float">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold">Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Tools Section */}
          <section id="tools" className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-6xl w-full">
              <h2 className="akira-font text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 gradient-text reveal" style={{ wordSpacing: '-8px' ,lineHeight: '0.75'   }}>
                Proficient Tools
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="glass tool-card glass-hover rounded-2xl p-6 sm:p-8 text-center smooth-transition reveal glow-on-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-4 animate-float flex justify-center"
                        style={{ animationDelay: `${index * 0.2}s` }}>
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-16 h-16 object-contain"
                        style={{ filter: `drop-shadow(0 0 25px ${tool.color})` }}
                      />
                    </div>

                    <p className="text-lg font-semibold">{tool.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* Works Section */}
          <section id="works" className="min-h-screen px-6 py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="akira-font text-4xl sm:text-5xl font-bold text-center mb-6 sm:mb-8 gradient-text reveal" style={{ wordSpacing: '-15px' }}>
                My Works
              </h2>
              
              <div className="mb-20">
                <h3 className="text-2xl sm:text-3xl syncopate-font font-bold mb-6 sm:mb-8 text-red-500 reveal">VIDEO EDITS</h3>
                
                

                <div className="mb-12">
                  <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-300 reveal">Vertical Videos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {videos.vertical.map((video, index) => (
                      <div key={video.id} className="glass-strong rounded-2xl overflow-hidden glass-hover smooth-transition reveal video-container" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="aspect-[9/16] bg-gray-900">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${video.embed}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-4 relative z-10">
                          <p className="font-semibold text-sm">{video.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-300 reveal">Horizontal Videos</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {videos.horizontal.map((video, index) => (
                      <div key={video.id} className="glass-strong rounded-2xl overflow-hidden glass-hover smooth-transition reveal video-container" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="aspect-video bg-gray-900">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${video.embed}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-4 relative z-10">
                          <p className="font-semibold">{video.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl syncopate-font font-bold mb-6 sm:mb-8 text-red-500 reveal">GRAPHIC DESIGN</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {graphicCategories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => openCategory(category.id)}
                      className="glass-strong category-card glass-hover rounded-2xl p-6 sm:p-8 text-center smooth-transition reveal glow-on-hover"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="relative z-10">
                        <div className="text-5xl mb-4 inline-block animate-float" style={{animationDelay: `${index * 0.2}s`}}>
                          {category.icon}
                        </div>
                        <p className="syncopate-font text-l font-semibold mb-2">{category.name}</p>
                        <p className="text-sm text-gray-400 mb-4">{category.desc}</p>
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${category.gradient} text-white text-sm font-semibold`}>
                          <span>Explore</span>
                          <ExternalLink size={16} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <section
            id="contact"
            className="min-h-screen flex items-center justify-center px-6 py-20"
          >
            <div className="max-w-2xl w-full glass-strong rounded-3xl p-6 sm:p-8 md:p-12">
              <h2 className="akira-font text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 gradient-text" style={{ wordSpacing: '-6px' }}>
                Contact Me
              </h2>

              <p className="text-center text-gray-300 mb-8">
                Let's create something amazing together!
              </p>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2 text-gray-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full glass-strong px-4 py-3 rounded-xl text-white placeholder-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2 text-gray-300"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full glass-strong px-4 py-3 rounded-xl text-white placeholder-gray-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2 text-gray-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    required
                    className="w-full glass-strong px-4 py-3 rounded-xl text-white placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full glass-strong py-4 rounded-xl font-semibold text-lg smooth-transition hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="glass-strong p-4 rounded-xl text-center text-green-400 border border-green-500/30">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="glass-strong p-4 rounded-xl text-center text-red-400 border border-red-500/30">
                    Please fill in all fields.
                  </div>
                )}

                {formStatus === 'failed' && (
                  <div className="glass-strong p-4 rounded-xl text-center text-red-400 border border-red-500/30">
                    Failed to send message. Please try again or email me directly at
                    <br />
                    <span className="text-white font-medium">
                      rahul.malaikani@gmail.com
                    </span>
                  </div>
                )}
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 glass-strong rounded-full">OR</span>
                </div>
              </div>

              {/* Instagram Contact */}
              <div className="space-y-4">
                {/* Instagram Contact */}
                <a
                  href="https://instagram.com/rahul.malaikani"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Instagram profile"
                  className="w-full glass-strong p-4 sm:p-6 rounded-2xl hover:bg-white/10 smooth-transition flex items-center justify-between group cursor-pointer block"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-500/20 p-3 rounded-xl group-hover:bg-red-500/30 smooth-transition">
                      <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>

                    <div className="text-left">
                      <p className="text-white font-semibold text-lg">Instagram</p>
                      <p className="text-gray-400 text-sm">@rahul.malaikani / @malaikani.mp4</p>
                    </div>
                  </div>

                  <ExternalLink size={20} className="text-gray-400 group-hover:text-red-500 smooth-transition" />
                </a>


              </div>
            </div>
          </section>

          

        </>
      )}

      {/* Category Page */}
      {currentPage === 'category' && selectedCategory && (
        <div className="min-h-screen pt-24 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => {
                setCurrentPage('home');
                setTimeout(() => scrollToSection('works'), 100);
              }}
              className="glass-strong px-4 sm:px-6 py-2 sm:py-3 rounded-xl mb-6 sm:mb-8 flex items-center space-x-2 hover:bg-white/10 smooth-transition transform hover:scale-105 hover:shadow-lg"
            >
              <ChevronLeft size={20} />
              <span>Back to Works</span>
            </button>

            <h2 className="syncopate-font text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 gradient-text animate-fade-in-up" style={{lineHeight: '0.8'   }}>
              {graphicCategories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-300 text-lg mb-12 animate-fade-in-up" style={{animationDelay: '0.1s',lineHeight: '1.0' }}>
              {graphicCategories.find(c => c.id === selectedCategory)?.desc}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {categoryImages[selectedCategory]?.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => openLightbox(categoryImages[selectedCategory], index)}
                  className="glass-strong rounded-2xl overflow-hidden cursor-pointer glass-hover smooth-transition image-hover-zoom animate-fade-in-up"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                  <div className="p-4">
                    <p className="font-medium text-xs sm:text-sm md:text-base text-gray-200">{image.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 animate-fade-in-up" onClick={closeLightbox}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:text-red-500 smooth-transition transform hover:scale-125 hover:rotate-90"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-6 text-white hover:text-red-500 smooth-transition glass-strong p-2 sm:p-3 rounded-full transform hover:scale-110"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="glass-strong rounded-3xl p-3 sm:p-4 max-w-4xl max-h-[90vh] animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage[lightboxIndex].url}
              alt={lightboxImage[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center mt-2 text-l font-semibold">{lightboxImage[lightboxIndex].title}</p>
            <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
              {lightboxIndex + 1} / {lightboxImage.length}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 text-white hover:text-red-500 smooth-transition glass-strong p-3 rounded-full transform hover:scale-110"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="glass-strong py-8 text-center text-gray-400 ">
        <p className="hover:text-white smooth-transition">© 2025 Rahul Malaikani. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;