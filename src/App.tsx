import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import bannerImage from '../images/heroImage/h-img.jpg';
import brownShingleImage from '../images/Brown Architectural Shingle Roofs .jpg';
import terracottaTileImage from '../images/Terracotta Clay Tile Roofs.jpg';
import darkGrayShingleImage from '../images/Dark Gray Shingle Roofs.jpg';
import grayCeramicTileImage from '../images/Gray Ceramic Tile Mansion Roofs.jpg';
import commercialOfficeImage from '../images/image 2/commercial-office-building-metal-roofing-project_amherst-roofing.jpg';
import gulfShoreImage from '../images/image 2/gulf-shore-apothecary-and-medical-supply-commercial-metal-roofing-project_amherst-roofing.jpg';
import multiBuildingImage from '../images/image 2/multi-building-condominium-complex-commercial-shingle-roofing-project_amherst-roofing.jpg';
import kings10Image from '../images/work gallery/11-Kings-10.jpg';
import tileReRoof20Image from '../images/work gallery/Tile-ReRoof-20-.jpg';
import logoImage from '../images/logo/ChatGPT Image Jul 6, 2026, 12_48_28 PM.png';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  Star, 
  Menu, 
  X, 
  ArrowRight, 
  ExternalLink, 
  Shield, 
  Layers, 
  Home, 
  Briefcase, 
  Clock, 
  ArrowUp, 
  CheckCircle2, 
  Compass, 
  Zap, 
  User, 
  FileText 
} from 'lucide-react';

// --- CUSTOM SAFE IMAGE COMPONENT ---
// Ensures no broken image icons ever show.
// Uses relative path from /assets/ first, and falls back to beautifully styled premium gradients.
function SafeImage({ 
  src, 
  alt, 
  className, 
  fallbackGradient = "from-slate-800 to-slate-900" 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  fallbackGradient?: string; 
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br ${fallbackGradient} relative overflow-hidden ${className}`}>
        {/* Subtle high-end geometric overlay patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -right-20 -bottom-20 w-52 h-52 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -top-20 w-52 h-52 bg-[#0A58A2]/10 rounded-full blur-3xl"></div>
        
        {/* Elegant typography showcase */}
        <div className="z-10 text-center px-6">
          <p className="text-white font-display text-sm md:text-base font-semibold tracking-wider uppercase mb-1 text-shadow-sm">{alt}</p>
          <div className="inline-flex items-center gap-1.5 text-[10px] text-[#D4AF37] font-mono tracking-widest bg-black/25 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full uppercase">
            <Shield className="w-3 h-3" />
            Amherst Certified
          </div>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
}

// --- LOGO CREST COMPONENT ---
// Render actual logo if found, or beautiful SVG representation of the brand's logo
function BrandLogo({ className = "h-12 w-auto" }: { className?: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex items-center gap-3">
        {/* Stylized vector representation of the sunset roof crest */}
        <div className="relative w-12 h-12 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center overflow-hidden">
          {/* Yellow sun */}
          <div className="absolute right-1 top-2 w-7 h-7 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full"></div>
          {/* Palm tree trunks and fronds stylized in blue */}
          <div className="absolute right-3 top-3 text-[#0A58A2]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.73 19.45,15.33 18.5,16.63L15.5,12H17.5A5.5,5.5 0 0,0 12,6.5A5.5,5.5 0 0,0 6.5,12H8.5L5.5,16.63C4.55,15.33 4,13.73 4,12A8,8 0 0,1 12,4Z" />
            </svg>
          </div>
          {/* Blue roof truss line */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#0A58A2] to-[#0a4880] flex items-center justify-center">
            <span className="text-[7px] text-white font-bold tracking-widest">AMHERST</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-display font-extrabold tracking-tight text-[#0A58A2] leading-none">Amherst <span className="text-[#D4AF37]">Roofing</span></span>
          <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase leading-tight">Naples, FL</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={logoImage} 
      alt="Amherst Roofing Inc." 
      className={`${className} object-cover`} 
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Accordion state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Residential',
    serviceNeeded: 'New Roof Installation',
    message: ''
  });

  // Modal State for instant CTA Free Estimate
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);

  // Scroll spy effect to update active link
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check sections visibility
      const sections = ['home', 'about', 'services', 'gallery', 'testimonials', 'faqs', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form handling
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.phone && formState.email) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormState({
          name: '',
          phone: '',
          email: '',
          propertyType: 'Residential',
          serviceNeeded: 'New Roof Installation',
          message: ''
        });
        setEstimateModalOpen(false);
      }, 5000);
    }
  };

  const handleFAQToggle = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Gallery items matching the 8 user uploaded images
  const galleryItems = [
    {
      id: 1,
      title: "Gray Tile Luxury Roof",
      category: "tile",
      src: kings10Image,
      desc: "Premium cement flat tile roof on luxury estate with elegant palm styling",
      gradient: "from-slate-700 to-slate-900"
    },
    {
      id: 2,
      title: "Green Standing Seam Metal",
      category: "metal",
      src: commercialOfficeImage,
      desc: "Commercial building green standing seam metal roof integrated with solar arrays",
      gradient: "from-emerald-800 to-slate-900"
    },
    {
      id: 3,
      title: "Silver Metal Roof System",
      category: "metal",
      src: gulfShoreImage,
      desc: "Sleek standing seam metal roofing installed at Gulf Shore Apothecary & Medical Supply",
      gradient: "from-sky-800 to-slate-900"
    },
    {
      id: 4,
      title: "Commercial Condominium Roof",
      category: "shingle",
      src: multiBuildingImage,
      desc: "Large scale commercial multi-family asphalt shingle and carport design",
      gradient: "from-indigo-800 to-slate-900"
    },
    {
      id: 5,
      title: "Dark Gray Architectural Shingle",
      category: "shingle",
      src: darkGrayShingleImage,
      desc: "High-performance dark gray wind-resistant architectural shingles on newly constructed residential home",
      gradient: "from-neutral-800 to-neutral-900"
    },
    {
      id: 6,
      title: "Brown Architectural Shingle",
      category: "shingle",
      src: brownShingleImage,
      desc: "Warm tone multi-dimensional asphalt shingles enhancing residential curb appeal",
      gradient: "from-amber-800 to-stone-950"
    },
    {
      id: 7,
      title: "Terracotta Clay Tile",
      category: "tile",
      src: terracottaTileImage,
      desc: "Classic S-shape Mediterranean style terracotta clay tile roof for ultimate thermal insulation",
      gradient: "from-orange-800 to-stone-900"
    },
    {
      id: 8,
      title: "Light Gray Shingle Detail",
      category: "shingle",
      src: tileReRoof20Image,
      desc: "Meticulously lined water-tight gray fiberglass shingle installation",
      gradient: "from-zinc-700 to-slate-900"
    }
  ];

  const filteredGallery = selectedGalleryTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedGalleryTab);

  // FAQs exact data
  const faqData = [
    {
      question: "Do you offer free estimates for roofing projects?",
      answer: "Yes, Amherst Roofing offers completely free, comprehensive, and non-obligatory roof estimates for all residential and commercial properties throughout Naples and Southwest Florida. Call us directly at 239.354.1133 or complete our online quote request form to schedule an appointment with our estimators."
    },
    {
      question: "Are you fully licensed and insured in Southwest Florida?",
      answer: "Absolutely. Amherst Roofing is a fully licensed Florida roofing contractor carrying primary License # CCC1332482 and License # CAC1821486. We maintain comprehensive liability insurance and workers' compensation coverage. We are also proud active members insured by the FRSA (Florida Roofing and Sheetmetal Association), ensuring optimal security for our clients and crew."
    },
    {
      question: "What areas do you provide roofing services to?",
      answer: "We proudly serve homeowners, property managers, and commercial business owners across Naples, Marco Island, Bonita Springs, Fort Myers, and surrounding communities. We cover 100% of Collier County and Lee County, Florida, delivering dependable service with locally owned and operated pride."
    },
    {
      question: "How long has Amherst Roofing been in business?",
      answer: "Amherst Roofing has been a trusted contractor in Naples and Southwest Florida since 1990. For over three decades (35 years), we have dedicated ourselves to professional craftsmanship, honest pricing, and durable roofing solutions built specifically to handle Florida's intense heat, high humidity, and extreme weather storms."
    },
    {
      question: "What roofing materials and services do you specialize in?",
      answer: "We handle residential and commercial roofing of all types. This includes traditional Mediterranean-style clay and concrete tile roofs, modern standing seam metal roofs, affordable multi-dimensional architectural shingle roofs, and commercial flat roof systems. Our services span complete re-roofing, emergency roof repairs, storm damage mitigation, leak detection, and new construction installation."
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-800 font-sans selection:bg-[#D4AF37]/30 overflow-x-hidden">
      
      {/* Top Banner Contact Strip */}
      <div className="bg-gradient-to-r from-[#0A58A2] via-[#094784] to-[#1E232A] text-white text-[11px] font-mono tracking-wider py-2.5 px-4 md:px-8 border-b border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-4 flex-wrap justify-center text-center">
            <span className="flex items-center gap-1.5 hover:text-[#D4AF37] transition">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href="tel:2393541133">239.354.1133</a>
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="flex items-center gap-1.5 hover:text-[#D4AF37] transition">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href="mailto:amy@amherstroofingnaples.com">amy@amherstroofingnaples.com</a>
            </span>
          </div>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-[#D4AF37] font-semibold tracking-widest">LICENSE# CCC1332482 | # CAC1821486</span>
            <span className="hidden sm:inline text-white/50 text-[10px]">COLLIER & LEE COUNTY, FL</span>
          </div>
        </div>
      </div>

      {/* Floating Glass Navbar Redesign */}
      <header className={`fixed top-[38px] left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 ${scrolled ? 'top-2' : ''}`}>
        <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${scrolled ? 'glass-nav py-3.5 px-6 shadow-lg shadow-black/5 ring-1 ring-black/5' : 'bg-transparent py-5 px-4'}`}>
          <div className="flex items-center justify-between">
            {/* Brand Logo Left */}
            <a href="#home" className="flex items-center gap-1.5 focus:outline-none" aria-label="Amherst Roofing Homepage">
              <BrandLogo className={`transition-all duration-300 ${scrolled ? 'h-14 md:h-16' : 'h-20 md:h-24'} w-auto`} />
            </a>

            {/* Desktop Navigation Center */}
            <nav className="hidden lg:flex items-center gap-7">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About Us', id: 'about' },
                { name: 'Who We Service', id: 'services' },
                { name: 'Roofing', id: 'roofing' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'FAQs', id: 'faqs' },
                { name: 'News', id: 'news' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium tracking-wide relative py-1 transition-colors duration-200 hover:opacity-80 ${activeSection === item.id ? 'text-[#0A58A2] font-semibold' : 'text-[#0a58a2]'}`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span 
                      layoutId="navUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Right Action Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => setEstimateModalOpen(true)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8962D] hover:from-[#e2be44] hover:to-[#cfa833] text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-md shadow-[#D4AF37]/15 transition duration-300 flex items-center gap-1.5 hover:translate-y-[-1px]"
              >
                <span>Free Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#0A58A2] transition focus:outline-none rounded-xl hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Glass Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-[95px] z-50 glass-nav rounded-2xl shadow-xl shadow-black/10 border border-white/40 p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About Us', id: 'about' },
                { name: 'Who We Service', id: 'services' },
                { name: 'Roofing', id: 'roofing' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'FAQs', id: 'faqs' },
                { name: 'News', id: 'news' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold tracking-wide py-2 border-b border-slate-100 last:border-none hover:text-[#0A58A2] ${activeSection === item.id ? 'text-[#0A58A2]' : 'text-slate-700'}`}
                >
                  {item.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEstimateModalOpen(true);
                }}
                className="w-full bg-[#0A58A2] hover:bg-[#094784] text-white text-sm font-semibold uppercase tracking-wider py-3 rounded-xl mt-2 transition text-center"
              >
                Request Free Estimate
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION: HERO (CINEMATIC LUXURY) --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 bg-slate-900 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src={bannerImage} 
            alt="Amherst Luxury Tile Roof Project" 
            className="w-full h-full object-cover object-center opacity-65 scale-105 filter saturate-[0.85]"
            fallbackGradient="from-slate-900 via-slate-950 to-blue-950"
          />
          {/* Refined Luxury Vignette / Linear Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-slate-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-900/20 to-transparent"></div>
          {/* Grid visual lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Main Hero Copy */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/35 rounded-full px-4 py-1.5 mb-6 shadow-sm shadow-[#D4AF37]/10 animate-fade-in">
                <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-extrabold uppercase">
                  AMHERST ROOFING COMPANY NAPLES FLORIDA
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Your Home. <br />
                <span className="bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-[#F2E09B] bg-clip-text text-transparent">Our Priority.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
                A beautiful roof not only provides protection and peace of mind, but increases the value to your investment.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setEstimateModalOpen(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8962D] hover:from-[#e2be44] hover:to-[#cfa833] text-white font-semibold uppercase tracking-wider text-xs px-8 py-4.5 rounded-xl transition duration-300 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                >
                  <span>GET A FREE ESTIMATE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="tel:2393541133" 
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold uppercase tracking-wider text-xs px-8 py-4.5 rounded-xl transition duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>CALL 239.354.1133</span>
                </a>
              </div>

              {/* Scroll indicators */}
              <div className="hidden md:flex items-center gap-3 mt-16 text-slate-400 text-[11px] font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping"></span>
                <span>Scroll to Explore</span>
                <span className="text-slate-600">|</span>
                <span>Licensed Florida Contractor</span>
              </div>
            </div>

            {/* Right Mini-Form Display on Desktop */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="dark-glass-card rounded-2xl p-7 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl"></div>
                <h3 className="text-white font-display text-lg font-bold mb-1">Request Quote</h3>
                <p className="text-slate-400 text-xs mb-5">Submit details for an immediate response</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1" htmlFor="hero-name">Full Name</label>
                    <input 
                      type="text" 
                      id="hero-name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Gayle Brown"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#D4AF37] focus:outline-none rounded-lg py-2 px-3 text-white text-xs transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1" htmlFor="hero-phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="hero-phone"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleFormChange}
                      placeholder="e.g. 239.354.1133"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#D4AF37] focus:outline-none rounded-lg py-2 px-3 text-white text-xs transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1" htmlFor="hero-email">Email Address</label>
                    <input 
                      type="email" 
                      id="hero-email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="e.g. amy@amherstroofing.com"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#D4AF37] focus:outline-none rounded-lg py-2 px-3 text-white text-xs transition"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#0A58A2] hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-lg transition shadow-md shadow-blue-900/20"
                  >
                    Send Request
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: TRUST BAR (IMMEDIATELY BELOW HERO) --- */}
      <section className="bg-white border-y border-slate-100 py-8 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center text-center divide-x divide-slate-100">
            
            {/* Trust Indicator 1: Reviews */}
            <div className="flex flex-col items-center p-3">
              <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xl font-display font-extrabold text-slate-800 leading-tight">5.0 Star Rated</p>
              <p className="text-[11px] font-mono tracking-wide text-slate-500 uppercase">52 Google Reviews</p>
            </div>

            {/* Trust Indicator 2: Experience */}
            <div className="flex flex-col items-center p-3">
              <Award className="w-5 h-5 text-[#0A58A2] mb-1.5" />
              <p className="text-xl font-display font-extrabold text-slate-800 leading-tight">Since 1990</p>
              <p className="text-[11px] font-mono tracking-wide text-slate-500 uppercase">35 Years of Service</p>
            </div>

            {/* Trust Indicator 3: Credentials */}
            <div className="flex flex-col items-center p-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-1.5" />
              <p className="text-xl font-display font-extrabold text-slate-800 leading-tight">FRSA Insured</p>
              <p className="text-[11px] font-mono tracking-wide text-slate-500 uppercase">Member Association</p>
            </div>

            {/* Trust Indicator 4: Service Areas */}
            <div className="flex flex-col items-center p-3">
              <MapPin className="w-5 h-5 text-[#0A58A2] mb-1.5" />
              <p className="text-xl font-display font-extrabold text-slate-800 leading-tight">Southwest FL</p>
              <p className="text-[11px] font-mono tracking-wide text-slate-500 uppercase">Collier & Lee Counties</p>
            </div>

            {/* Trust Indicator 5: BBB Rating */}
            <div className="hidden lg:flex flex-col items-center p-3">
              <div className="inline-flex items-center justify-center bg-blue-50 text-[#0A58A2] font-extrabold px-2.5 py-0.5 rounded-full text-xs font-mono mb-1.5 border border-blue-100">
                A+ RATING
              </div>
              <p className="text-sm font-display font-bold text-slate-800 leading-tight">BBB Accredited</p>
              <p className="text-[10px] font-mono tracking-wide text-slate-500 uppercase">Highly Trustworthy</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: ABOUT US (EDITORIAL COMPOSITION) --- */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative backdrop shapes */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute left-0 bottom-10 w-80 h-80 bg-blue-50/20 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Graphic Layered Layout */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-slate-100">
                <SafeImage 
                  src={grayCeramicTileImage} 
                  alt="Amherst Premium Roofing Craftsmanship" 
                  className="w-full h-[450px] object-cover hover:scale-105 transition duration-500"
                  fallbackGradient="from-slate-700 to-slate-900"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-1">Featured Project</p>
                  <p className="text-lg font-display font-bold">Naples Custom Home Tile Roof Replacement</p>
                </div>
              </div>

              {/* Float Glass Accent Card */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 z-20 glass-card rounded-2xl p-6 shadow-xl max-w-[280px] border border-white/60">
                <div className="flex items-start gap-3">
                  <div className="bg-[#0A58A2]/10 p-2.5 rounded-xl text-[#0A58A2]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">35 Years Excellence</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Serving residential and commercial customers since 1990.</p>
                  </div>
                </div>
              </div>

              {/* Secondary geometric decoration */}
              <div className="absolute -left-6 -top-6 w-32 h-32 border-l-2 border-t-2 border-[#D4AF37]/40 rounded-tl-2xl z-0"></div>
            </div>

            {/* Right Column: Original Editorial Content */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <p className="text-[#0A58A2] font-mono tracking-widest text-xs uppercase font-extrabold">
                    Roofing Company Naples, Florida | Residential & Commercial
                  </p>
                  <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                    Amherst Roofing
                  </h2>
                  <div className="w-16 h-1 bg-[#D4AF37] rounded-full mt-4"></div>
                </div>

                <div className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed text-sm md:text-base">
                  <p>
                    Since 1990, <strong className="text-slate-900">Amherst Roofing Company of Naples</strong> has been the trusted roofing contractor serving <strong className="text-slate-900">homeowners</strong> and <strong className="text-slate-900">businesses</strong> throughout <strong className="text-slate-900">Naples and Southwest Florida</strong>. This locally owned roofing company specializes in re-roofing, roof repairs, and new roof construction, offering affordable and reliable solutions built to withstand Florida's unique climate.
                  </p>
                  
                  <p>
                    As a <strong className="text-[#0A58A2] font-semibold">licensed and insured Naples roofing contractor</strong>, Amherst Roofing Company is dedicated to delivering exceptional craftsmanship, honest service, and lasting results. For over three decades, the company has proudly helped protect homes and commercial properties with high-quality roofing systems designed for durability, safety, and style.
                  </p>
                </div>

                {/* Bullet trust list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Licensed and Insured (CCC1332482 / CAC1821486)",
                    "Locally Owned & Operated Since 1990",
                    "Exceptional Craftsmanship & Honest Pricing",
                    "Durable Systems Built for Florida Climate"
                  ].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="bg-[#0A58A2]/10 p-1 rounded-full text-[#0A58A2]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Sub-CTA Area */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6">
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-[#0A58A2] hover:bg-[#094784] text-white font-bold tracking-wider text-xs uppercase px-6 py-3.5 rounded-xl shadow-md transition duration-200"
                  >
                    <span>Request Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Response within 24 Hours</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: WHO WE SERVICE & SERVICES CARD GRID --- */}
      <section id="services" className="py-24 bg-[#F8F9FB] border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#0A58A2] font-mono tracking-widest text-xs uppercase font-extrabold bg-[#0A58A2]/5 px-3.5 py-1.5 rounded-full">
              Dependable Protection Since 1990
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              Roofing Services We Specialize In
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Serving homeowners and commercial businesses across Naples and Southwest Florida with absolute structural integrity.
            </p>
          </div>

          {/* Grid Layout of Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Service Block 1: Residential Roofing */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/[0.02] border border-slate-100 hover:shadow-2xl hover:shadow-black/5 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                {/* Visual Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#0A58A2]/10 text-[#0A58A2] p-4 rounded-2xl group-hover:bg-[#0A58A2] group-hover:text-white transition duration-300">
                    <Home className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold tracking-wider uppercase bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">Residential</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-[#0A58A2] transition duration-200">Residential Roofing Services</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Dependable protection and gorgeous curb appeal designed specifically to withstand intense heat, heavy downpours, and hurricanes.
                  </p>
                </div>

                <ul className="space-y-3.5 text-slate-600 text-sm">
                  {[
                    "New roof installations and custom replacements",
                    "Mediterranean tile, concrete tile & clay systems",
                    "High-performance asphalt shingle options",
                    "Leak detection & storm damage roof repair",
                    "Energy-efficient, wind-rated ventilation setups"
                  ].map((service, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="bg-[#D4AF37]/10 p-0.5 rounded-full text-[#D4AF37]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-8 flex items-center justify-between">
                <a 
                  href="#roofing-residential" 
                  className="text-slate-800 group-hover:text-[#0A58A2] font-display font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 transition"
                >
                  <span>Learn More — Residential</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
                </a>
              </div>
            </div>

            {/* Service Block 2: Commercial Roofing */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/[0.02] border border-slate-100 hover:shadow-2xl hover:shadow-black/5 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                {/* Visual Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#D4AF37]/15 text-[#D4AF37] p-4 rounded-2xl group-hover:bg-[#D4AF37] group-hover:text-white transition duration-300">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold tracking-wider uppercase bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">Commercial</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-[#0A58A2] transition duration-200">Commercial Roofing Contractor</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Reliable, cost-effective roofing solutions for offices, retail centers, multi-unit complexes, and industrial properties.
                  </p>
                </div>

                <ul className="space-y-3.5 text-slate-600 text-sm">
                  {[
                    "Complete structural low-slope & flat roof installs",
                    "Durable standing seam metal roofing systems",
                    "Routine maintenance & proactive wear monitoring",
                    "Advanced leak tracing, repair & seal applications",
                    "Minimal disruption to overall business operations"
                  ].map((service, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="bg-[#0A58A2]/10 p-0.5 rounded-full text-[#0A58A2]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-8 flex items-center justify-between">
                <a 
                  href="#roofing-commercial" 
                  className="text-slate-800 group-hover:text-[#D4AF37] font-display font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 transition"
                >
                  <span>Learn More — Commercial</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: ROOFING - RESIDENTIAL (DETAILED SPLIT LAYOUT) --- */}
      <section id="roofing-residential" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#0A58A2] font-mono tracking-widest text-xs uppercase font-extrabold">
                Southwest Florida Home Specialists
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                Residential Roofing Services
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] rounded-full mt-2"></div>

              <div className="prose prose-slate max-w-none space-y-5 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>
                  Homeowners across Naples and Southwest Florida trust <strong className="text-slate-900">Amherst Roofing Company</strong> as their go-to residential roofing contractor for dependable service and lasting protection. The company understands the unique challenges of Florida's tropical climate — from intense sun and humidity to heavy storms and hurricanes — and builds roofing systems designed to withstand them all.
                </p>
                <p>
                  Whether it's a <strong className="text-slate-900">new roof installation, re-roofing project, or expert roof repair</strong>, Amherst Roofing Company delivers high-quality craftsmanship with honest pricing and exceptional customer care. As a locally owned and operated roofing company, Amherst Roofing takes pride in helping families protect their homes, improve curb appeal, and increase long-term value with durable, energy-efficient roofing solutions.
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setEstimateModalOpen(true)}
                  className="bg-[#D4AF37] hover:bg-[#B8962D] text-white text-xs font-semibold uppercase tracking-widest px-6 py-4 rounded-xl shadow-md shadow-[#D4AF37]/10 transition duration-200"
                >
                  LEARN MORE — RESIDENTIAL
                </button>
              </div>
            </div>

            {/* Right Images Layout */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Image 1: Brown Shingle */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 group aspect-4/3 relative">
                  <SafeImage 
                    src={brownShingleImage} 
                    alt="Brown Architectural Shingle Roof" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-amber-950"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-wider uppercase">Brown Shingle</div>
                </div>
                {/* Image 2: Terracotta clay */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 group aspect-4/3 relative">
                  <SafeImage 
                    src={terracottaTileImage} 
                    alt="Terracotta Clay Tile Roof" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-orange-950"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-wider uppercase">Terracotta Tile</div>
                </div>
                {/* Image 3: Black Shingle */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 group aspect-4/3 relative">
                  <SafeImage 
                    src={darkGrayShingleImage} 
                    alt="Dark Gray Shingle Roof" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-neutral-900"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-wider uppercase">Gray Shingle</div>
                </div>
                {/* Image 4: Tile Gray */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 group aspect-4/3 relative">
                  <SafeImage 
                    src={grayCeramicTileImage} 
                    alt="Gray Ceramic Tile Mansion Roof" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-slate-950"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-wider uppercase">Luxury Tile</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: ROOFING - COMMERCIAL (DETAILED SPLIT LAYOUT) --- */}
      <section id="roofing-commercial" className="py-24 bg-[#F8F9FB] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Image Columns (rearranged for alternate layout spacing) */}
            <div className="lg:col-span-6 lg:order-last">
              <div className="grid grid-cols-2 gap-4">
                {/* Metal Silver - Gulf Shore Apothecary */}
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-md border border-slate-100 group h-64 relative">
                  <SafeImage 
                    src={commercialOfficeImage} 
                    alt="Silver Standing Seam Metal Roof" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-sky-950"
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-900/75 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-white font-mono tracking-wider uppercase">Silver Metal Roof</div>
                </div>
                {/* Metal Green */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 group aspect-4/3 relative">
                  <SafeImage 
                    src={gulfShoreImage} 
                    alt="Green Metal Roof with Solar Panels" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-emerald-950"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-wider uppercase">Solar Metal</div>
                </div>
                {/* Condo Roofs */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 group aspect-4/3 relative">
                  <SafeImage 
                    src={multiBuildingImage} 
                    alt="Condos Roof Replacement Naples" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-indigo-950"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white font-mono tracking-wider uppercase">Condominium</div>
                </div>
              </div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#D4AF37] font-mono tracking-widest text-xs uppercase font-extrabold">
                Business & Commercial Roof Experts
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                Commercial Roofing Contractor
              </h2>
              <div className="w-16 h-1 bg-[#0A58A2] rounded-full mt-2"></div>

              <div className="prose prose-slate max-w-none space-y-5 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>
                  For business owners and property managers, <strong className="text-slate-900">Amherst Roofing Company</strong> is the commercial roofing contractor of choice throughout Naples and Southwest Florida. With decades of experience in large-scale roofing systems, the company provides reliable, cost-effective solutions for <strong className="text-slate-900">offices, retail centers, multi-unit buildings, and industrial properties</strong>.
                </p>
                <p>
                  From <strong className="text-slate-900">flat roof installations to leak detection, maintenance, and full roof replacements</strong>, Amherst Roofing combines technical expertise with top-grade materials to ensure long-term performance and minimal disruption to business operations. Trusted by the region's most respected builders and property owners, this roofing company delivers results that meet the highest industry standards while standing up to Florida's demanding weather conditions.
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setEstimateModalOpen(true)}
                  className="bg-[#0A58A2] hover:bg-[#094784] text-white text-xs font-semibold uppercase tracking-widest px-6 py-4 rounded-xl shadow-md shadow-[#0A58A2]/10 transition duration-200"
                >
                  LEARN MORE — COMMERCIAL
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: GALLERY (MODERN MASONRY & FILTERING) --- */}
      <section id="gallery" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4 max-w-2xl">
              <span className="text-[#0A58A2] font-mono tracking-widest text-xs uppercase font-extrabold bg-[#0A58A2]/5 px-3.5 py-1.5 rounded-full">
                Original Project Showcases
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                Our Works Gallery
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Real, locally completed installations throughout Southwest Florida. We only use exact photos of our actual structural craftsmanship.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'tile', 'shingle', 'metal'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedGalleryTab(tab)}
                  className={`text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-xl transition duration-200 border ${
                    selectedGalleryTab === tab 
                      ? 'bg-[#0A58A2] border-[#0A58A2] text-white shadow-sm' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Style Grid Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 bg-white relative aspect-3/4 flex flex-col justify-end"
                >
                  <div className="absolute inset-0 z-0">
                    <SafeImage 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      fallbackGradient={item.gradient}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition"></div>
                  </div>

                  {/* Image info footer hover */}
                  <div className="relative z-10 p-5 text-white space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/15 border border-[#D4AF37]/25 px-2 py-0.5 rounded-full inline-block">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-base tracking-tight leading-tight group-hover:text-[#D4AF37] transition duration-200">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 font-normal leading-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between text-white z-10 w-full">
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
                Amherst Portfolio Showcase ({lightboxIndex + 1} / {filteredGallery.length})
              </span>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="p-2 text-slate-400 hover:text-white transition rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central display image */}
            <div className="flex-1 flex items-center justify-center max-h-[75vh]">
              <div className="max-w-4xl max-h-full rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
                <SafeImage 
                  src={filteredGallery[lightboxIndex].src} 
                  alt={filteredGallery[lightboxIndex].title} 
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  fallbackGradient={filteredGallery[lightboxIndex].gradient}
                />
              </div>
            </div>

            {/* Footer with detail */}
            <div className="text-center text-white space-y-1 py-4 z-10 max-w-2xl mx-auto">
              <h3 className="text-xl font-display font-bold text-[#D4AF37]">{filteredGallery[lightboxIndex].title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{filteredGallery[lightboxIndex].desc}</p>
              
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  disabled={lightboxIndex === 0}
                  onClick={() => setLightboxIndex(lightboxIndex - 1)}
                  className="px-4 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-xs transition"
                >
                  Previous
                </button>
                <button
                  disabled={lightboxIndex === filteredGallery.length - 1}
                  onClick={() => setLightboxIndex(lightboxIndex + 1)}
                  className="px-4 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-xs transition"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION: TESTIMONIALS (LUXURY GLASS review CARDS) --- */}
      <section id="testimonials" className="py-24 bg-[#F8F9FB] border-y border-slate-100 relative overflow-hidden">
        {/* Visual Background Accent */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#0A58A2]/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 top-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[#0A58A2] font-mono tracking-widest text-xs uppercase font-extrabold bg-[#0A58A2]/5 px-3.5 py-1.5 rounded-full inline-block">
                Verified Customer Feedback
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                Excellent Google Reviews
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
                Amherst Roofing is extremely proud of our pristine reputation. We combine absolute engineering detail with helpful local service.
              </p>
            </div>
            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3.5">
              <div className="text-left bg-white border border-slate-200 px-5 py-4 rounded-2xl shadow-sm flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-slate-800 mt-1">Excellent (5.0 / 5)</p>
                  <p className="text-[10px] text-slate-500 font-mono">BASED ON 52 REVIEWS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Slider/List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1: Gayle Brown */}
            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-lg shadow-black/[0.01] hover:shadow-xl hover:translate-y-[-2px] transition duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0A58A2]"></div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0A58A2] text-white rounded-full flex items-center justify-center font-bold font-display text-sm">
                      GB
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">Gayle Brown</h4>
                      <span className="text-[10px] text-slate-400 font-mono">11 Days Ago</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-[#0A58A2] px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                    <span className="text-[9px] font-bold font-mono">GOOGLE</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">
                  "Absolutely great company to work with, attentive to details. Answered all my questions, showed up on time, finished ahead of schedule, cleaned up well. They replace some rotted wood, repaired a couple of leaks, and replaced some broken tile."
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center gap-2">
                <div className="bg-green-50 text-green-700 p-0.5 rounded-full">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 font-mono">VERIFIED AMHERST CUSTOMER</span>
              </div>
            </div>

            {/* Review 2: Sonia Navarro */}
            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-lg shadow-black/[0.01] hover:shadow-xl hover:translate-y-[-2px] transition duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]"></div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-bold font-display text-sm">
                      SN
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">Sonia Navarro</h4>
                      <span className="text-[10px] text-slate-400 font-mono">12 Days Ago</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-[#0A58A2] px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                    <span className="text-[9px] font-bold font-mono">GOOGLE</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">
                  "I am so grateful to have found a company that is local, incredibly professional, and responsive. Amherst Roofing did a fantastic job inspecting my tile roof, sealing vents, replacing cracked tiles, and giving me complete confidence that my roof is leak-free."
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center gap-2">
                <div className="bg-green-50 text-green-700 p-0.5 rounded-full">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 font-mono">VERIFIED AMHERST CUSTOMER</span>
              </div>
            </div>

            {/* Review 3: Jason Farquhar */}
            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-lg shadow-black/[0.01] hover:shadow-xl hover:translate-y-[-2px] transition duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-800"></div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold font-display text-sm">
                      JF
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">Jason Farquhar</h4>
                      <span className="text-[10px] text-slate-400 font-mono">14 Days Ago</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-[#0A58A2] px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                    <span className="text-[9px] font-bold font-mono">GOOGLE</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">
                  "Had Tim from Amherst Roofing out to inspect our roof and was very impressed with his professionalism and knowledge. From beginning to end they provided a great experience. Our roofing project was finished on budget and on time, and the clean-up was immaculate."
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 mt-5 flex items-center gap-2">
                <div className="bg-green-50 text-green-700 p-0.5 rounded-full">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 font-mono">VERIFIED AMHERST CUSTOMER</span>
              </div>
            </div>

          </div>

          {/* Bottom Review Actions */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#0A58A2] hover:bg-[#094784] text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl transition duration-200 shadow shadow-blue-900/10 inline-flex items-center gap-1.5"
            >
              <span>See All Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl transition duration-200 shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Review Us On Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

        </div>
      </section>

      {/* --- SECTION: FAQ (PREMIUM ACCORDIONS) --- */}
      <section id="faqs" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          
          {/* Header Block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#0A58A2] font-mono tracking-widest text-xs uppercase font-extrabold bg-[#0A58A2]/5 px-3.5 py-1.5 rounded-full">
              Common Contractor Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Frequently Asked FAQs
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Find instant professional answers regarding our licensing, estimates, and custom materials.
            </p>
          </div>

          {/* Accordion Layout */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:border-slate-200 transition duration-200"
              >
                <button
                  onClick={() => handleFAQToggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-slate-50 hover:bg-slate-100/50 transition duration-200 focus:outline-none"
                >
                  <span className="font-display font-bold text-slate-900 text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm flex-shrink-0">
                    <ChevronDown className={`w-4 h-4 transition duration-300 ${openFAQIndex === index ? 'transform rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Animated Body */}
                <AnimatePresence initial={false}>
                  {openFAQIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-6 border-t border-slate-100 text-slate-600 text-xs md:text-sm leading-relaxed bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION: CONTACT & FORM (SPLIT CONVERSION SECTION) --- */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        
        {/* Subtle decorative background lights */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#0A58A2]/10 rounded-full blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Brand & Contact Info */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                
                <BrandLogo className="h-14 w-auto brightness-200" />
                
                <div className="space-y-3">
                  <span className="text-[#D4AF37] font-mono tracking-widest text-xs uppercase font-extrabold block">
                    Get in Touch with Amherst
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                    Request Your Free Project Estimate
                  </h2>
                </div>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md">
                  Have a question or ready to replacement your roof? Contact Naples' most trusted roofing contractor team. We inspect, repair, and install high-performance roofing.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-4 pt-4">
                  
                  {/* Phone */}
                  <a href="tel:2393541133" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition group">
                    <div className="bg-[#0A58A2] text-white p-2.5 rounded-xl">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Direct Hotline</p>
                      <p className="text-base font-bold text-white group-hover:text-[#D4AF37] transition">239.354.1133</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href="mailto:amy@amherstroofingnaples.com" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition group">
                    <div className="bg-[#D4AF37] text-white p-2.5 rounded-xl">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Email Inquiry</p>
                      <p className="text-base font-bold text-white group-hover:text-[#D4AF37] transition break-all">amy@amherstroofingnaples.com</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition group">
                    <div className="bg-slate-700 text-white p-2.5 rounded-xl">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Office Address</p>
                      <p className="text-sm font-semibold text-white">107 12th Street NE, Naples, Florida 34120</p>
                    </div>
                  </div>

                </div>

              </div>

              {/* License display */}
              <div className="pt-6 border-t border-white/10 text-slate-500 text-xs font-mono">
                <p>Licensed Florida Roofing Contractor</p>
                <p className="text-slate-400 mt-1">License # CCC1332482 | # CAC1821486</p>
              </div>
            </div>

            {/* Right Column: Premium Form Container */}
            <div className="lg:col-span-7">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative">
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.div
                      key="form-fields"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-extrabold text-white">Estimate Request</h3>
                        <p className="text-slate-400 text-xs md:text-sm">Please fill out this form to request your free, on-site roofing evaluation.</p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Name */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="form-name">Your Name *</label>
                            <input 
                              type="text" 
                              id="form-name"
                              name="name"
                              required
                              value={formState.name}
                              onChange={handleFormChange}
                              placeholder="Gayle Brown"
                              className="w-full bg-slate-950/40 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-3 px-4 text-white text-sm transition"
                            />
                          </div>
                          {/* Phone */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="form-phone">Phone Number *</label>
                            <input 
                              type="tel" 
                              id="form-phone"
                              name="phone"
                              required
                              value={formState.phone}
                              onChange={handleFormChange}
                              placeholder="239.354.1133"
                              className="w-full bg-slate-950/40 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-3 px-4 text-white text-sm transition"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="form-email">Email Address *</label>
                          <input 
                            type="email" 
                            id="form-email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleFormChange}
                            placeholder="amy@amherstroofingnaples.com"
                            className="w-full bg-slate-950/40 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-3 px-4 text-white text-sm transition"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Property Type */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="form-prop-type">Property Type</label>
                            <select 
                              id="form-prop-type"
                              name="propertyType"
                              value={formState.propertyType}
                              onChange={handleFormChange}
                              className="w-full bg-slate-950 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-3 px-4 text-white text-sm transition"
                            >
                              <option value="Residential">Residential Property</option>
                              <option value="Commercial">Commercial Property</option>
                              <option value="Multi-Family">Multi-Family / Condos</option>
                            </select>
                          </div>
                          {/* Service Needed */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="form-service">Service Needed</label>
                            <select 
                              id="form-service"
                              name="serviceNeeded"
                              value={formState.serviceNeeded}
                              onChange={handleFormChange}
                              className="w-full bg-slate-950 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-3 px-4 text-white text-sm transition"
                            >
                              <option value="New Roof Installation">New Roof Installation</option>
                              <option value="Full Re-Roofing Replacement">Full Re-Roof Replacement</option>
                              <option value="Leak Detection & Repair">Leak Repair & Mitigation</option>
                              <option value="Maintenance / Inspection">Roof Inspection & Sealing</option>
                            </select>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="form-message">Describe Your Project *</label>
                          <textarea 
                            id="form-message"
                            name="message"
                            required
                            rows={4}
                            value={formState.message}
                            onChange={handleFormChange}
                            placeholder="Please tell us about your roofing issues, required materials, or project timeline..."
                            className="w-full bg-slate-950/40 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-3 px-4 text-white text-sm transition resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8962D] hover:from-[#e2be44] hover:to-[#cfa833] text-white font-bold uppercase tracking-widest text-xs py-4.5 rounded-xl transition duration-300 shadow-lg shadow-[#D4AF37]/15 flex items-center justify-center gap-2"
                        >
                          <span>SUBMIT REQUEST FOR FREE ESTIMATE</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/5">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-extrabold text-white">Estimate Request Sent!</h3>
                        <p className="text-slate-300 text-sm max-w-md">
                          Thank you, <strong className="text-white">{formState.name}</strong>. Your inquiry has been received. Our expert team will review your details and contact you via phone or email within 24 hours to schedule your free inspection.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        Amherst Rapid response Activated
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: NEWS / METADATA SUMMARY --- */}
      <section id="news" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#0A58A2] font-mono tracking-widest text-xs uppercase font-extrabold bg-[#0A58A2]/5 px-3.5 py-1.5 rounded-full">
              Industry Knowledge & Updates
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Latest Roofing News & Updates
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto">
              Professional roofing advice, local Naples wind mitigation standards, and guidelines from Amherst experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Article 1 */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <SafeImage 
                    src={grayCeramicTileImage} 
                    alt="Hurricane Wind Mitigation Naples" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-slate-950"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/75 backdrop-blur text-[10px] text-white font-mono tracking-widest px-2.5 py-1 rounded">NAPLES COMPLIANCE</div>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono text-[#0A58A2] tracking-wider uppercase font-bold">July 05, 2026 | Amherst Experts</span>
                  <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#0A58A2] transition">Understanding Naples Wind Mitigation Standards</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    Florida wind mitigation inspections can reduce your home insurance premiums significantly. Learn how Amherst Roofing constructs systems that exceed local building codes.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100/50 mt-4">
                <span className="text-xs font-semibold text-[#0A58A2] flex items-center gap-1.5 group-hover:translate-x-1 transition duration-200 cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <SafeImage 
                    src="/assets/metal_roof_green.png" 
                    alt="Tile vs Metal Roofing Southwest Florida" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-emerald-950"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/75 backdrop-blur text-[10px] text-white font-mono tracking-widest px-2.5 py-1 rounded">GUIDES</div>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono text-[#0A58A2] tracking-wider uppercase font-bold">June 28, 2026 | Staff Writer</span>
                  <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#0A58A2] transition">Choosing Between Tile & Metal Roofs in Florida</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    Comparing traditional Mediterranean tile aesthetics with modern standing seam metal roof longevity. Discover which premium option is ideal for your home.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100/50 mt-4">
                <span className="text-xs font-semibold text-[#0A58A2] flex items-center gap-1.5 group-hover:translate-x-1 transition duration-200 cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <SafeImage 
                    src={darkGrayShingleImage} 
                    alt="Asphalt Shingle Maintenance Guide" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    fallbackGradient="from-slate-800 to-neutral-900"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/75 backdrop-blur text-[10px] text-white font-mono tracking-widest px-2.5 py-1 rounded">MAINTENANCE</div>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono text-[#0A58A2] tracking-wider uppercase font-bold">May 15, 2026 | Tech Lead</span>
                  <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#0A58A2] transition">Preventative Roof Maintenance for Extreme Heat</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    Naples' sun is relentless. Simple steps like vent inspections and minor sealant repairs can increase your asphalt shingles or ceramic tile life expectancy.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100/50 mt-4">
                <span className="text-xs font-semibold text-[#0A58A2] flex items-center gap-1.5 group-hover:translate-x-1 transition duration-200 cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION: FOOTER (MODERN, MULTI-COLUMN, SLATE BLACK) --- */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-16 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start pb-12 border-b border-slate-900">
            
            {/* Column 1: Brand & Details */}
            <div className="lg:col-span-4 space-y-5">
              <BrandLogo className="h-16 md:h-18 w-auto brightness-200" />
              <p className="text-slate-500 leading-relaxed pr-4">
                Since 1990, Amherst Roofing Company of Naples has been the trusted roofing contractor serving homeowners and businesses throughout Southwest Florida. Fully licensed and insured.
              </p>
              
              {/* Credentials Grid representation */}
              <div className="flex items-center gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 py-1.5 px-3 rounded-lg text-[10px] font-mono text-[#D4AF37] font-semibold">
                  BBB A+ RATING
                </div>
                <div className="bg-white/5 border border-white/10 py-1.5 px-3 rounded-lg text-[10px] font-mono text-white/80 font-semibold">
                  FRSA INSURED
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs">Quick Navigation</h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'Home', link: '#home' },
                  { name: 'About Us', link: '#about' },
                  { name: 'Services We Offer', link: '#services' },
                  { name: 'Gallery Portfolio', link: '#gallery' },
                  { name: 'Frequently FAQs', link: '#faqs' },
                  { name: 'Contact Quote', link: '#contact' }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} className="hover:text-white transition duration-200 flex items-center gap-1.5">
                      <ChevronDown className="w-3.5 h-3.5 text-slate-600 rotate-270" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs">Amherst Contact Info</h4>
              <ul className="space-y-3 text-slate-500">
                <li className="flex items-start gap-2.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span>107 12th Street NE, Naples, Florida 34120</span>
                </li>
                <li className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <a href="tel:2393541133" className="hover:text-[#D4AF37] transition">239.354.1133</a>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <a href="mailto:amy@amherstroofingnaples.com" className="hover:text-[#D4AF37] transition break-all">amy@amherstroofingnaples.com</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Static map representation */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs">Our Location Map</h4>
              <div className="h-28 rounded-xl overflow-hidden border border-slate-900 bg-slate-900 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 opacity-90"></div>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"></div>
                
                {/* Minimalist interactive map look */}
                <div className="z-10 text-center p-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] mx-auto mb-1 animate-bounce" />
                  <p className="text-white font-bold text-[10px] tracking-wide uppercase">Naples, FL 34120</p>
                  <p className="text-[9px] text-slate-500 font-mono mt-0.5">Collier & Lee Counties</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono">
                <span>Serving all Collier & Lee</span>
                <span className="text-[#D4AF37]">● 100% Local</span>
              </div>
            </div>

          </div>

          {/* Footer Bottom Credentials Bar */}
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-600 text-[11px] font-mono">
            <div className="flex flex-wrap items-center justify-center gap-4 text-center md:text-left">
              <span>© Amherst Roofing Inc. All rights reserved.</span>
              <span>•</span>
              <a href="#about" className="hover:text-slate-400 transition">Image Use</a>
              <span>•</span>
              <a href="#about" className="hover:text-slate-400 transition">Privacy Policy</a>
              <span>•</span>
              <a href="#about" className="hover:text-slate-400 transition">Cookies Policy</a>
            </div>
            <div className="text-center md:text-right flex items-center gap-1.5">
              <span>Web Design by</span>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition inline-flex items-center gap-0.5 font-bold">
                <span>NxWeber</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* --- FLOATING BACK TO TOP BUTTON WITH SCROLL TRACKING --- */}
      {scrolled && (
        <a
          href="#home"
          className="fixed bottom-6 right-6 z-40 bg-[#0A58A2] hover:bg-[#094784] text-white p-3.5 rounded-full shadow-lg shadow-[#0A58A2]/20 border border-[#0A58A2]/35 hover:translate-y-[-2px] transition duration-200"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </a>
      )}

      {/* --- ESTIMATE RECONCILIATION MODAL POPUP --- */}
      <AnimatePresence>
        {estimateModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1E232A] text-white rounded-3xl p-8 max-w-lg w-full relative border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
              
              <button 
                onClick={() => setEstimateModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-full bg-white/5 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20 text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider">
                    <Award className="w-3 h-3" />
                    Amherst Naples Certified
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white">Request Free Quote</h3>
                  <p className="text-slate-400 text-xs">Fill out details below for an immediate callback and evaluation schedule.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1" htmlFor="modal-name">Your Full Name *</label>
                    <input 
                      type="text" 
                      id="modal-name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Gayle Brown"
                      className="w-full bg-slate-950/40 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-2.5 px-3.5 text-white text-xs transition"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1" htmlFor="modal-phone">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="modal-phone"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. 239.354.1133"
                        className="w-full bg-slate-950/40 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-2.5 px-3.5 text-white text-xs transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1" htmlFor="modal-email">Email Address *</label>
                      <input 
                        type="email" 
                        id="modal-email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="e.g. amy@amherstroofing.com"
                        className="w-full bg-slate-950/40 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-2.5 px-3.5 text-white text-xs transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1" htmlFor="modal-service">What roofing project is needed? *</label>
                    <select 
                      id="modal-service"
                      name="serviceNeeded"
                      value={formState.serviceNeeded}
                      onChange={handleFormChange}
                      className="w-full bg-slate-950 border border-slate-700/60 focus:border-[#D4AF37] focus:outline-none rounded-xl py-2.5 px-3.5 text-white text-xs transition"
                    >
                      <option value="New Roof Installation">New Roof Installation</option>
                      <option value="Full Re-Roofing Replacement">Full Re-Roof Replacement</option>
                      <option value="Leak Detection & Repair">Leak Repair & Mitigation</option>
                      <option value="Maintenance / Inspection">Roof Inspection & Sealing</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8962D] text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition hover:from-[#e2be44] hover:to-[#cfa833] shadow-lg shadow-[#D4AF37]/15 flex items-center justify-center gap-2"
                  >
                    <span>SUBMIT QUOTE REQUEST</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
