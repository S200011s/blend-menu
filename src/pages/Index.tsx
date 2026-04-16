import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram, Coffee, Download } from 'lucide-react';

import LoadingScreen from '../components/LoadingScreen';
import MenuCover from '../components/MenuCover';
import CategorySection from '../components/CategorySection';
import PdfGenerator from '../components/PdfGenerator';
import menuData from '@/data/menu.json';

const PALETTE = {
  bgPrimary: '#f1cfce',    
  textSub: '#958f8f',      
  silver: '#A8A9AD',       
  gold: '#D4AF37',         
};

const SILVER_HEX = encodeURIComponent(PALETTE.silver);
const GREY_HEX = encodeURIComponent(PALETTE.textSub);
const GOLD_HEX = encodeURIComponent(PALETTE.gold);
const DOODLE_COLOR = encodeURIComponent(PALETTE.textSub); 
const DOODLE_OPACITY = "0.25"; 


const doodlePatternSvg = `data:image/svg+xml,%3Csvg width='600' height='600' viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3Epath,circle,rect,ellipse%7Bfill:none;stroke:${DOODLE_COLOR};stroke-width:2.5;opacity:${DOODLE_OPACITY};stroke-linecap:round;stroke-linejoin:round%7D%3C/style%3E%3Cg transform='translate(50, 50) rotate(30)'%3E%3Cellipse cx='0' cy='0' rx='15' ry='25' /%3E%3Cpath d='M0,-25 Q10,-5 0,25' /%3E%3C/g%3E%3Cg transform='translate(520, 480) rotate(-45)'%3E%3Cellipse cx='0' cy='0' rx='12' ry='20' /%3E%3Cpath d='M0,-20 Q-8,0 0,20' /%3E%3C/g%3E%3Cpath d='M150 80 L250 50 L280 120 L180 150 Z M150 80 L150 110 L180 150 M280 120 L280 150 L180 150' transform='translate(-20, 20) rotate(-10 200 100)' /%3E%3Cpath d='M400 100 L480 100 L460 220 L420 220 Z M400 100 L395 90 L485 90 L480 100 M440 160 L440 180' stroke-width='3' transform='rotate(10 440 160)' /%3E%3Ccircle cx='120' cy='350' r='40' /%3E%3Ccircle cx='120' cy='350' r='15' /%3E%3Cpath d='M400 400 C400 450 480 450 480 400 L480 360 L400 360 Z M480 370 C500 370 500 400 480 400 M420 380 Q440 420 460 380' transform='rotate(-5 440 400)' /%3E%3Cpath d='M250 500 Q300 450 350 500 Q300 550 250 500 Z M280 480 Q300 490 320 480' /%3E%3Cg transform='translate(500, 250) rotate(90)'%3E%3Cellipse cx='0' cy='0' rx='15' ry='25' /%3E%3Cpath d='M0,-25 Q8,0 0,25' /%3E%3C/g%3E%3C!-- CAFE SKETCHES --%3E%3Cg transform='translate(100, 500) rotate(-20) scale(0.8)'%3E%3Cpath d='M0,0 Q30,-20 60,0 Q90,20 120,0' stroke-width='4'/%3E%3Cpath d='M10,5 Q35,-10 60,5'/%3E%3Cpath d='M20,12 Q40,2 60,12'/%3E%3Cpath d='M70,8 Q95,-5 120,8'/%3E%3C/g%3E%3Cg transform='translate(350, 50) rotate(15) scale(0.8)'%3E%3Cpath d='M-20,0 L20,0 L15,40 L-15,40 Z'/%3E%3Cpath d='M-18,40 L18,40 L12,80 L-12,80 Z'/%3E%3Cpath d='M0,-5 L0,0 M15,40 H25'/%3E%3Cpath d='M20,10 C30,10 30,30 20,30'/%3E%3C/g%3E%3Cg transform='translate(500, 150) rotate(10) scale(0.8)'%3E%3Ccircle cx='0' cy='0' r='30'/%3E%3Ccircle cx='0' cy='0' r='10'/%3E%3Cpath d='M-15,-20 Q0,-10 15,-20'/%3E%3Cpath d='M10,15 Q20,10 25,20'/%3E%3C/g%3E%3C/svg%3E`;

const siteBackgroundStyle = {
  backgroundColor: PALETTE.bgPrimary,
  backgroundImage: ` url("${doodlePatternSvg}")`,
  backgroundRepeat: ' repeat',
  backgroundSize: ' 400px 400px', 
  backgroundPosition: ' center top',
  backgroundAttachment: ' fixed' 
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={siteBackgroundStyle} className="min-h-screen relative font-montserrat selection:bg-[#D4AF37] selection:text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <main>
          
          {/* --- STICKY NAVBAR --- */}
<nav className="fixed top-0 left-0 right-0 z-[100] bg-[#fdf8f5]/40 backdrop-blur-xl border-b border-[#e8dcd5]/30 transition-all duration-300">
  <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
    <div 
className="font-playfair text-3xl font-bold text-[#5c5656]"
      onClick={() => scrollToSection('home')}
    >
      BLEND
    </div>
   
    <div className="hidden md:flex gap-10 text-[15px] uppercase tracking-widest font-semibold text-[#7b7575]">
  <button onClick={() => scrollToSection('menu')} className="hover:text-[#D4AF37] transition-colors">Menu</button>
  <button onClick={() => scrollToSection('about')} className="hover:text-[#D4AF37] transition-colors">Our Story</button>
  <button onClick={() => scrollToSection('visit')} className="hover:text-[#D4AF37] transition-colors">Visit Us</button>

  {/* PDF BUTTON */}
  <button
  onClick={() => setIsGeneratingPdf(true)}
  disabled={isGeneratingPdf}
  className={`ml-6 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-md ${
    isGeneratingPdf
      ? 'bg-[#958f8f] text-white cursor-not-allowed'
      : 'bg-[#D4AF37] text-white hover:bg-[#b5952f] hover:scale-105'
  }`}
>
    {isGeneratingPdf ? (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    ) : (
      <Download className="w-4 h-4" />
    )}
    PDF
  </button>
</div>
  </div>
</nav>


          {/* --- HERO SECTION --- */}
          <section id="home">
            <MenuCover />
          </section>

         

          {/* --- MENU SECTION --- */}
          <section id="menu">
            {/* <div className="py-12 text-center">
              <h2 className="font-playfair text-5xl font-bold text-[#7b7575] mb-4">Explore Our Menu</h2>
              <p className="text-[#958f8f] font-medium">Discover your new favorite flavor.</p>
            </div>
             */}
            {menuData.categories.map((category: any, index: number) => (
              <CategorySection
                key={index}
                title={category.name}
                items={category.items as any}
                image={(category.items[0] as any)?.img} 
                pageNumber={index + 1}
              />
            ))}
          </section>

          {/* --- INFO / VISIT US SECTION (Added Glassmorphism) --- */}
          <section id="visit" className="py-24 px-8 bg-white/40 backdrop-blur-md mx-4 md:mx-auto max-w-5xl rounded-[3rem] border border-white/60 shadow-sm mb-24 mt-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-5xl font-bold text-[#7b7575] mb-6">Visit BLEND</h2>
                <div className="w-24 h-1 bg-[#D4AF37] mx-auto opacity-50 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="p-8 rounded-3xl bg-white/60 border border-white shadow-sm hover:shadow-md transition-shadow">
                  <MapPin className="w-10 h-10 mx-auto text-[#D4AF37] mb-4" />
                  <h3 className="font-bold text-[#7b7575] text-xl mb-2">Location</h3>
                  <p className="text-[#958f8f] font-medium">123 Coffee Avenue<br/>Cairo, Egypt</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/60 border border-white shadow-sm hover:shadow-md transition-shadow">
                  <Clock className="w-10 h-10 mx-auto text-[#D4AF37] mb-4" />
                  <h3 className="font-bold text-[#7b7575] text-xl mb-2">Working Hours</h3>
                  <p className="text-[#958f8f] font-medium">4:00 PM - 3:00 AM</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/60 border border-white shadow-sm hover:shadow-md transition-shadow">
                  <Phone className="w-10 h-10 mx-auto text-[#D4AF37] mb-4" />
                  <h3 className="font-bold text-[#7b7575] text-xl mb-2">Contact Us</h3>
                  <p className="text-[#958f8f] font-medium">+20 123 456 7890<br/>hello@blendcafe.com</p>
                </div>
              </div>
            </div>
          </section>
 {/* --- ABOUT US SECTION (Added Glassmorphism to show background) --- */}
          <section id="about" className="py-24 px-8 bg-white/40 backdrop-blur-md mx-4 md:mx-auto max-w-5xl rounded-[3rem] border border-white/60 shadow-sm mt-12 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <Coffee className="w-12 h-12 mx-auto text-[#D4AF37] mb-6" />
              <h2 className="font-playfair text-5xl font-bold text-[#7b7575] mb-6">Our Story</h2>
              <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8 opacity-50 rounded-full"></div>
              <p className="text-lg text-[#958f8f] leading-relaxed mb-6 font-medium">
                At BLEND, we believe that coffee is more than just a drink—it's an experience. 
                Born from a passion for exceptional roasting and heartfelt hospitality, 
                our cafe is designed to be your second home. Whether you're here for a quiet morning espresso 
                or a lively evening gathering over our signature Ramadan desserts, every sip tells a story.
              </p>
              <p className="font-pacifico text-3xl text-[#D4AF37] mt-8">
                Crafted with love, poured with passion.
              </p>
            </div>
          </section>
         
          {/* --- FOOTER --- */}
<footer className="bg-gradient-to-b from-transparent to-[#fdf8f5]/90 backdrop-blur-sm pt-20 pb-12 px-8 text-center text-[#5c5656]">
  <div className="max-w-4xl mx-auto border-t border-[#e8dcd5] pt-12">
    <h2 className="font-playfair text-4xl font-bold mb-8 tracking-tight">BLEND</h2>
    <div className="flex justify-center gap-8 mb-10">
      <a href="https://www.instagram.com/blend.ns/" className="p-3 rounded-full bg-white/30 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-300">
        <Instagram className="w-5 h-5" />
      </a>
    </div>
    <p className="text-[12px] uppercase tracking-widest text-[#958f8f] font-bold">
      © {new Date().getFullYear()} BLEND Cafe. All rights reserved.
    </p>
  </div>
</footer>

        </main>
      )}

      {/* --- HIDDEN PDF ENGINE --- */}
      {isGeneratingPdf && (
        <PdfGenerator onComplete={() => setIsGeneratingPdf(false)} />
      )}
    </div>
  );
}