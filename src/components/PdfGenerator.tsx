import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import menuData from '@/data/menu.json';

// --- 1. COLOR PALETTE ---
const PALETTE = {
  bgPrimary: '#f1cfce',    
  textMain: '#7b7575',     
  textSub: '#958f8f',      
  silver: '#A8A9AD',       
  gold: '#D4AF37',         
  // Increased Opacities for Cards to make them pop and increase readability
  cardBg: 'rgba(255, 255, 255, 0.5)', 
  addonsBg: 'rgba(255, 255, 255, 0.5)', 
  addonsPillBg: 'rgba(255, 255, 255, 0.5)', 
};

// // --- 2. VECTOR BACKGROUND (Mixed Metals) ---
// const SILVER_HEX = encodeURIComponent(PALETTE.silver);
// const GREY_HEX = encodeURIComponent(PALETTE.textSub);
// const GOLD_HEX = encodeURIComponent(PALETTE.gold);

// // A. Detailed Hanging Sketch (Header Background - Made BIGGER & DEEPER)
// // Scaled the items up by ~1.3x and made the drapes hang much lower
// const elegantRamadanSvg = `data:image/svg+xml,%3Csvg width='2100' height='800' viewBox='0 0 2100 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.line%7Bstroke:${SILVER_HEX};stroke-width:2.5;fill:none;opacity:0.8;%7D.drape%7Bstroke:${SILVER_HEX};stroke-width:3;fill:none;opacity:0.5;stroke-dasharray:4,8;stroke-linecap:round;%7D.g%7Bfill:${GREY_HEX};opacity:0.85;%7D.s%7Bfill:${SILVER_HEX};opacity:0.9;%7D.l-out%7Bstroke:${GREY_HEX};stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round;%7D.gold-star%7Bfill:${GOLD_HEX};opacity:0.85;%7D%3C/style%3E%3C!-- Deeper Beaded Drapes --%3E%3Cpath d='M0,60 Q200,180 420,60 T840,60 T1260,60 T1680,60 T2100,60' class='drape'/%3E%3Cpath d='M0,135 Q315,330 630,135 T1260,135 T1890,135 T2100,135' class='drape'/%3E%3C!-- Left Corner Moon --%3E%3Cg transform='translate(150,0) scale(1.3)'%3E%3Cline x1='0' y1='0' x2='0' y2='200' class='line'/%3E%3Cpath d='M-25,200 A35,35 0 1,0 25,260 A45,45 0 0,1 -25,200 Z' class='g' transform='rotate(15)'/%3E%3C/g%3E%3C!-- Left Lantern --%3E%3Cg transform='translate(360,0) scale(1.3)'%3E%3Cline x1='0' y1='0' x2='0' y2='340' class='line'/%3E%3Cg transform='translate(0,340) scale(1.6)'%3E%3Cpath d='M-12,0 L12,0 L8,10 L-8,10 Z M-8,10 L-8,40 L8,40 L8,10 M-12,40 L12,40 L8,50 L-8,50 Z M0,50 L0,60 M-8,10 Q0,20 8,10 M-8,25 Q0,35 8,25 M-8,40 Q0,50 8,40' class='l-out'/%3E%3Crect x='-8' y='10' width='16' height='30' class='s' opacity='0.3'/%3E%3C/g%3E%3C/g%3E%3C!-- Center Left Star --%3E%3Cg transform='translate(560,0) scale(1.3)'%3E%3Cline x1='0' y1='0' x2='0' y2='240' class='line'/%3E%3Cpolygon points='0,240 5,255 20,255 8,265 12,280 0,270 -12,280 -8,265 -20,255 -5,255' class='gold-star'/%3E%3C/g%3E%3C!-- Right Corner Moon --%3E%3Cg transform='translate(1950,0) scale(1.3)'%3E%3Cline x1='0' y1='0' x2='0' y2='160' class='line'/%3E%3Cpath d='M25,160 A35,35 0 1,1 -25,220 A45,45 0 0,0 25,160 Z' class='g' transform='rotate(-20)'/%3E%3C/g%3E%3C!-- Right Lantern --%3E%3Cg transform='translate(1740,0) scale(1.3)'%3E%3Cline x1='0' y1='0' x2='0' y2='320' class='line'/%3E%3Cg transform='translate(0,320) scale(1.4)'%3E%3Cpath d='M-15,0 L15,0 L10,8 L-10,8 Z M-10,8 L-10,35 L10,35 L10,8 M-15,35 L15,35 L10,45 L-10,45 Z' class='l-out'/%3E%3Ccircle cx='0' cy='21' r='7' class='s' opacity='0.5'/%3E%3C/g%3E%3C/g%3E%3C!-- Center Right Star --%3E%3Cg transform='translate(1540,0) scale(1.3)'%3E%3Cline x1='0' y1='0' x2='0' y2='220' class='line'/%3E%3Cpolygon points='0,220 5,235 20,235 8,245 12,270 0,260 -12,270 -8,245 -20,235 -5,235' class='gold-star'/%3E%3C/g%3E%3C!-- Tiny Center Star --%3E%3Cg transform='translate(1050,0) scale(1.3)'%3E%3Cline x1='0' y1='0' x2='0' y2='130' class='line'/%3E%3Cpolygon points='0,130 3,140 12,140 5,146 8,156 0,150 -8,156 -5,146 -12,140 -3,140' class='gold-star'/%3E%3C/g%3E%3C/svg%3E`;

// // B. Scattered Body Dust (INCREASED density of Helal and Fanoos)
// const scatteredStarsSvg = `data:image/svg+xml,%3Csvg width='500' height='500' viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.st%7Bfill:${GOLD_HEX};opacity:0.5;%7D.dt%7Bfill:${GREY_HEX};opacity:0.25;%7D.helal-g%7Bfill:${GOLD_HEX};opacity:0.35;%7D.helal-s%7Bfill:${SILVER_HEX};opacity:0.4;%7D.fanoos%7Bstroke:${SILVER_HEX};stroke-width:1.5;fill:none;opacity:0.45;stroke-linejoin:round;%7D.fanoos-g%7Bstroke:${GOLD_HEX};stroke-width:1.5;fill:none;opacity:0.4;stroke-linejoin:round;%7D%3C/style%3E%3C!-- Scattered Stars --%3E%3Cpath d='M50,45 L52,52 L59,52 L54,56 L56,63 L50,59 L44,63 L46,56 L41,52 L48,52 Z' class='st'/%3E%3Cpath d='M250,150 L253,158 L261,158 L255,164 L257,172 L250,167 L243,172 L245,164 L239,158 L247,158 Z' class='st' transform='scale(0.8) translate(50, 20)'/%3E%3Cpath d='M350,300 L354,310 L365,310 L357,318 L360,328 L350,322 L340,328 L343,318 L335,310 L346,310 Z' class='st' transform='scale(0.6) translate(100, 100)'/%3E%3Cpath d='M420,400 L422,407 L429,407 L424,411 L426,418 L420,414 L414,418 L416,411 L411,407 L418,407 Z' class='st' transform='scale(0.7)'/%3E%3C!-- Faint Dots --%3E%3Ccircle cx='120' cy='280' r='2' class='dt'/%3E%3Ccircle cx='320' cy='80' r='1.5' class='dt'/%3E%3Ccircle cx='180' cy='50' r='2' class='dt'/%3E%3Ccircle cx='400' cy='220' r='2' class='dt'/%3E%3Ccircle cx='80' cy='420' r='1.5' class='dt'/%3E%3C!-- Helal (Crescent Moons) --%3E%3Cpath d='M0,0 A20,20 0 1,0 30,30 A25,25 0 0,1 0,0 Z' class='helal-g' transform='translate(100, 150) scale(0.6) rotate(-15)'/%3E%3Cpath d='M0,0 A20,20 0 1,0 30,30 A25,25 0 0,1 0,0 Z' class='helal-s' transform='translate(380, 80) scale(0.7) rotate(25)'/%3E%3Cpath d='M0,0 A20,20 0 1,0 30,30 A25,25 0 0,1 0,0 Z' class='helal-s' transform='translate(200, 400) scale(0.5) rotate(-30)'/%3E%3Cpath d='M0,0 A20,20 0 1,0 30,30 A25,25 0 0,1 0,0 Z' class='helal-g' transform='translate(50, 280) scale(0.65) rotate(45)'/%3E%3Cpath d='M0,0 A20,20 0 1,0 30,30 A25,25 0 0,1 0,0 Z' class='helal-s' transform='translate(450, 400) scale(0.55) rotate(-10)'/%3E%3Cpath d='M0,0 A20,20 0 1,0 30,30 A25,25 0 0,1 0,0 Z' class='helal-g' transform='translate(280, 50) scale(0.4) rotate(60)'/%3E%3C!-- Fanoos (Lanterns) --%3E%3Cg transform='translate(280, 200) scale(0.5)' class='fanoos'%3E%3Cpath d='M-10,0 L10,0 L6,8 L-6,8 Z M-6,8 L-6,25 L6,25 L6,8 M-10,25 L10,25 L6,32 L-6,32 Z M0,-5 L0,0 M0,32 L0,35'/%3E%3C/g%3E%3Cg transform='translate(80, 320) scale(0.6)' class='fanoos'%3E%3Cpath d='M-10,0 L10,0 L6,8 L-6,8 Z M-6,8 L-6,25 L6,25 L6,8 M-10,25 L10,25 L6,32 L-6,32 Z M0,-5 L0,0 M0,32 L0,35'/%3E%3C/g%3E%3Cg transform='translate(420, 220) scale(0.45)' class='fanoos'%3E%3Cpath d='M-10,0 L10,0 L6,8 L-6,8 Z M-6,8 L-6,25 L6,25 L6,8 M-10,25 L10,25 L6,32 L-6,32 Z M0,-5 L0,0 M0,32 L0,35'/%3E%3C/g%3E%3Cg transform='translate(150, 60) scale(0.55)' class='fanoos-g'%3E%3Cpath d='M-10,0 L10,0 L6,8 L-6,8 Z M-6,8 L-6,25 L6,25 L6,8 M-10,25 L10,25 L6,32 L-6,32 Z M0,-5 L0,0 M0,32 L0,35'/%3E%3C/g%3E%3Cg transform='translate(350, 420) scale(0.65)' class='fanoos-g'%3E%3Cpath d='M-10,0 L10,0 L6,8 L-6,8 Z M-6,8 L-6,25 L6,25 L6,8 M-10,25 L10,25 L6,32 L-6,32 Z M0,-5 L0,0 M0,32 L0,35'/%3E%3C/g%3E%3Cg transform='translate(30, 120) scale(0.4)' class='fanoos'%3E%3Cpath d='M-10,0 L10,0 L6,8 L-6,8 Z M-6,8 L-6,25 L6,25 L6,8 M-10,25 L10,25 L6,32 L-6,32 Z M0,-5 L0,0 M0,32 L0,35'/%3E%3C/g%3E%3Cg transform='translate(230, 320) scale(0.5)' class='fanoos'%3E%3Cpath d='M-10,0 L10,0 L6,8 L-6,8 Z M-6,8 L-6,25 L6,25 L6,8 M-10,25 L10,25 L6,32 L-6,32 Z M0,-5 L0,0 M0,32 L0,35'/%3E%3C/g%3E%3C/svg%3E`;

// --- 2. BOLD SKETCH BACKGROUND ---
const DOODLE_COLOR = encodeURIComponent(PALETTE.textSub); 
const DOODLE_OPACITY = "0.25"; 

//  const doodlePatternSvg = `data:image/svg+xml,%3Csvg width='600' height='600' viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3Epath,circle,rect,ellipse%7Bfill:none;stroke:${DOODLE_COLOR};stroke-width:2.5;opacity:${DOODLE_OPACITY};stroke-linecap:round;stroke-linejoin:round%7D%3C/style%3E%3Cg transform='translate(50, 50) rotate(30)'%3E%3Cellipse cx='0' cy='0' rx='15' ry='25' /%3E%3Cpath d='M0,-25 Q10,-5 0,25' /%3E%3C/g%3E%3Cg transform='translate(520, 480) rotate(-45)'%3E%3Cellipse cx='0' cy='0' rx='12' ry='20' /%3E%3Cpath d='M0,-20 Q-8,0 0,20' /%3E%3C/g%3E%3Cpath d='M150 80 L250 50 L280 120 L180 150 Z M150 80 L150 110 L180 150 M280 120 L280 150 L180 150' transform='translate(-20, 20) rotate(-10 200 100)' /%3E%3Cpath d='M400 100 L480 100 L460 220 L420 220 Z M400 100 L395 90 L485 90 L480 100 M440 160 L440 180' stroke-width='3' transform='rotate(10 440 160)' /%3E%3Ccircle cx='120' cy='350' r='40' /%3E%3Ccircle cx='120' cy='350' r='15' /%3E%3Cpath d='M400 400 C400 450 480 450 480 400 L480 360 L400 360 Z M480 370 C500 370 500 400 480 400 M420 380 Q440 420 460 380' transform='rotate(-5 440 400)' /%3E%3Cpath d='M250 500 Q300 450 350 500 Q300 550 250 500 Z M280 480 Q300 490 320 480' /%3E%3Cg transform='translate(500, 250) rotate(90)'%3E%3Cellipse cx='0' cy='0' rx='15' ry='25' /%3E%3Cpath d='M0,-25 Q8,0 0,25' /%3E%3C/g%3E%3C/svg%3E`;
const doodlePatternSvg = `data:image/svg+xml,%3Csvg width='600' height='600' viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3Epath,circle,rect,ellipse%7Bfill:none;stroke:${DOODLE_COLOR};stroke-width:2.5;opacity:${DOODLE_OPACITY};stroke-linecap:round;stroke-linejoin:round%7D%3C/style%3E%3Cg transform='translate(50, 50) rotate(30)'%3E%3Cellipse cx='0' cy='0' rx='15' ry='25' /%3E%3Cpath d='M0,-25 Q10,-5 0,25' /%3E%3C/g%3E%3Cg transform='translate(520, 480) rotate(-45)'%3E%3Cellipse cx='0' cy='0' rx='12' ry='20' /%3E%3Cpath d='M0,-20 Q-8,0 0,20' /%3E%3C/g%3E%3Cpath d='M150 80 L250 50 L280 120 L180 150 Z M150 80 L150 110 L180 150 M280 120 L280 150 L180 150' transform='translate(-20, 20) rotate(-10 200 100)' /%3E%3Cpath d='M400 100 L480 100 L460 220 L420 220 Z M400 100 L395 90 L485 90 L480 100 M440 160 L440 180' stroke-width='3' transform='rotate(10 440 160)' /%3E%3Ccircle cx='120' cy='350' r='40' /%3E%3Ccircle cx='120' cy='350' r='15' /%3E%3Cpath d='M400 400 C400 450 480 450 480 400 L480 360 L400 360 Z M480 370 C500 370 500 400 480 400 M420 380 Q440 420 460 380' transform='rotate(-5 440 400)' /%3E%3Cpath d='M250 500 Q300 450 350 500 Q300 550 250 500 Z M280 480 Q300 490 320 480' /%3E%3Cg transform='translate(500, 250) rotate(90)'%3E%3Cellipse cx='0' cy='0' rx='15' ry='25' /%3E%3Cpath d='M0,-25 Q8,0 0,25' /%3E%3C/g%3E%3C!-- NEW CAFE SKETCHES --%3E%3Cg transform='translate(100, 500) rotate(-20) scale(0.8)'%3E%3Cpath d='M0,0 Q30,-20 60,0 Q90,20 120,0' stroke-width='4'/%3E%3Cpath d='M10,5 Q35,-10 60,5'/%3E%3Cpath d='M20,12 Q40,2 60,12'/%3E%3Cpath d='M70,8 Q95,-5 120,8'/%3E%3C/g%3E%3Cg transform='translate(350, 50) rotate(15) scale(0.8)'%3E%3Cpath d='M-20,0 L20,0 L15,40 L-15,40 Z'/%3E%3Cpath d='M-18,40 L18,40 L12,80 L-12,80 Z'/%3E%3Cpath d='M0,-5 L0,0 M15,40 H25'/%3E%3Cpath d='M20,10 C30,10 30,30 20,30'/%3E%3C/g%3E%3Cg transform='translate(500, 150) rotate(10) scale(0.8)'%3E%3Ccircle cx='0' cy='0' r='30'/%3E%3Ccircle cx='0' cy='0' r='10'/%3E%3Cpath d='M-15,-20 Q0,-10 15,-20'/%3E%3Cpath d='M10,15 Q20,10 25,20'/%3E%3C/g%3E%3C/svg%3E`;


const ISOLATED_PAGES = [
  "🌙RAMADAN HITS",
  "MAKE IT YOURS"
];

interface PdfGeneratorProps {
  onComplete: () => void;
}

export default function PdfGenerator({ onComplete }: PdfGeneratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgPatternRef = useRef<HTMLDivElement>(null); 
  const [ready, setReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const chunkItems = (items: any[]) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += 2) {
      chunks.push(items.slice(i, i + 2));
    }
    return chunks;
  };

  const getCategoryAddons = (items: any[]) => {
    const allAddons: any[] = [];
    const seenLabels = new Set();
    items.forEach(item => {
      if (item.addons) {
        item.addons.forEach((addon: any) => {
          if (!seenLabels.has(addon.label)) {
            seenLabels.add(addon.label);
            allAddons.push(addon);
          }
        });
      }
    });
    return allAddons;
  };

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current || !bgPatternRef.current) return;

    const generatePdf = async () => {
      setIsGenerating(true); 
      
      try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210;
        const pdfHeight = 297;
        const topMargin = 15;
        const bottomMargin = 25;
        let currentY = topMargin;

        const bgCanvas = await html2canvas(bgPatternRef.current!, {
            scale: 2, 
            useCORS: true,
            backgroundColor: PALETTE.bgPrimary,
            logging: false,
            width: pdfWidth * 4, 
            height: pdfHeight * 4,
        });
        const bgImgData = bgCanvas.toDataURL('image/jpeg', 0.9);

        const addPageWithBackground = () => {
            pdf.addPage();
            pdf.addImage(bgImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        };

        pdf.addImage(bgImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

        const container = containerRef.current!;
const blocks = Array.from(
  container.querySelectorAll('.category-start')
) as HTMLElement[];
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 800));

       // 🟣 1) اطبع الهيدر الأول
const header = container.querySelector('.menu-header') as HTMLElement;

if (header) {
  const headerCanvas = await html2canvas(header, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  const headerImg = headerCanvas.toDataURL('image/png');
  const imgWidth = pdfWidth - (topMargin * 2);
  const imgHeight = (headerCanvas.height * imgWidth) / headerCanvas.width;

  pdf.addImage(headerImg, 'PNG', topMargin, currentY, imgWidth, imgHeight, undefined, 'FAST');

  currentY += imgHeight + 10;
}

// 🟣 2) اطبع الكاتيجوريز
// for (let i = 0; i < blocks.length; i++) {
//   const block = blocks[i];

//   // كل كاتيجوري بعد الأولى صفحة جديدة
//   if (i !== 0) {
//     addPageWithBackground();
//     currentY = topMargin;
//   }

//   const canvas = await html2canvas(block, {
//     scale: 1.5,
//     useCORS: true,
//     backgroundColor: null,
//     logging: false,
//   });

//   const imgData = canvas.toDataURL('image/png');
//   const imgWidth = pdfWidth - (topMargin * 2);
//   const imgHeight = (canvas.height * imgWidth) / canvas.width;

//   const spaceLeft = pdfHeight - bottomMargin - currentY;

//   // لو أول صفحة ومفيش مساحة بعد الهيدر
//   if (imgHeight > spaceLeft && i === 0) {
//     addPageWithBackground();
//     currentY = topMargin;
//   }

//   pdf.addImage(imgData, 'PNG', topMargin, currentY, imgWidth, imgHeight, undefined, 'FAST');
// }
// Replace your existing "Print categories" for loop with this:

for (let i = 0; i < blocks.length; i++) {
  if (i !== 0) {
    addPageWithBackground();
    currentY = topMargin;
  }

  const canvas = await html2canvas(blocks[i], {
    scale: 1.5,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  const imgWidth  = pdfWidth - topMargin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const spaceLeft = pdfHeight - bottomMargin - currentY;

  // If first block doesn't fit after header, new page
  if (imgHeight > spaceLeft && i === 0) {
    addPageWithBackground();
    currentY = topMargin;
  }

  // ── CENTER VERTICALLY if content is short and page has room ──────────
  const usablePage   = pdfHeight - topMargin - bottomMargin; // full usable page height
  const spaceOnPage  = pdfHeight - bottomMargin - currentY;  // remaining space from current position
  const isShortBlock = imgHeight < usablePage * 0.65;        // content uses less than 65% of page

  // Only center if: this block starts fresh on a page (currentY is near top)
  // AND the content is noticeably shorter than the page
  const isNearTop = currentY <= topMargin + 5; // started at top of page (new page or just header)
  
  if (isShortBlock && isNearTop) {
    // Center the block vertically in the usable area
    const centeredY = topMargin + (usablePage - imgHeight) / 2;
    currentY = Math.max(topMargin, centeredY); // never go above top margin
  }
  // ── END centering ─────────────────────────────────────────────────────

  pdf.addImage(
    canvas.toDataURL('image/png'),
    'PNG',
    topMargin,
    currentY,
    imgWidth,
    imgHeight,
    undefined,
    'FAST'
  );

  currentY += imgHeight;
}
pdf.save('blend-menu-grand-ramadan.pdf');
           

        pdf.save('blend-menu-grand-ramadan.pdf');
        toast.success('PDF generated successfully!');
      } catch (err) {
        console.error('PDF error:', err);
        toast.error('Failed to generate PDF');
      } finally {
        setIsGenerating(false); 
        onComplete();
      }
    };

    setTimeout(generatePdf, 500);

  }, [ready, onComplete]);

  // const backgroundStyle = {
  //   backgroundColor: PALETTE.bgPrimary,
  //   backgroundImage: `url("${elegantRamadanSvg}"), url("${scatteredStarsSvg}")`,
  //   backgroundRepeat: 'repeat-x, repeat',
  //   backgroundSize: '210mm auto, 150mm 150mm',
  //   backgroundPosition: 'top center, center top'
  // };
  const backgroundStyle = {
  backgroundColor: PALETTE.bgPrimary,
  backgroundImage: `url("${doodlePatternSvg}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '150mm 150mm',
  backgroundPosition: 'center top'
};

  if (!ready) return (
     <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white font-bold text-xl text-gray-600">
        Initializing Menu Generator...
     </div>
  );

  return (
    <>
      <div 
        ref={bgPatternRef}
        style={{
            ...backgroundStyle,
            position: 'fixed', top: 0, left: 0, 
            width: '210mm', height: '297mm',
            zIndex: -1000, 
        }}
      />

      <div
        ref={containerRef}
        className="absolute left-0 top-0 w-[210mm] p-4 box-border"
        style={{ 
            zIndex: isGenerating ? 10000 : -9999,
            opacity: isGenerating ? 1 : 0,
            ...backgroundStyle,
            height: 'auto', 
        }}
      >
        {isGenerating && (
            <div className="fixed top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg z-[10001] font-bold text-[#7b7575]">
                Applying Grand Ramadan Vibes & Generating PDF...
            </div>
        )}

        {/* --- HEADER TEXT (Returned to normal size) --- */}
        <div className="menu-header text-center mb-10 p-4 pt-16 relative z-10">
          <h1 className="font-playfair text-6xl font-bold mb-2" style={{ color: PALETTE.textMain }}>
            BLEND MENU
          </h1>
          <p className="font-montserrat text-lg italic mt-2" style={{ color: PALETTE.textSub }}>
            Where every sip tells a story...
          </p>
        </div>

        {/* Categories */}
        {menuData.categories?.map((category: any, catIndex: number) => {
          if (!category.items || category.items.length === 0) return null;

          const itemRows = chunkItems(category.items);
          const uniqueAddons = getCategoryAddons(category.items);
 const isCompact = category.items.length <7;  // ← threshold

  if (isCompact) {
    // ── Single centered column, everything in one print-block ──────────
    return (
      <div key={catIndex} className="relative z-10 mb-1 category-start print-block p-1">
        {/* Category header */}
        <div className="text-center mb-6 flex items-center justify-center gap-4">
          <div style={{ color: PALETTE.gold, fontSize: '1.5rem' }}>✧</div>
          <h2 className="font-pacifico text-5xl leading-relaxed" style={{ color: PALETTE.textMain }}>
            {category.name}
          </h2>
          <div style={{ color: PALETTE.gold, fontSize: '1.5rem' }}>✧</div>
        </div>

        {/* All items in centered single column */}
        <div className="flex flex-col items-center gap-4 w-full">
          {category.items.map((item: any, itemIndex: number) => {
            const sizes = item.sizes || item.options || [];
            const isSingleSize = sizes.length === 1;
            const singlePrice = isSingleSize ? sizes[0].price : item.price;

            // Pancakes table check
            if (item.isTable && item.tableColumns && item.tableRows) {
              return (
                <div
                  key={itemIndex}
                  className="rounded-xl p-4 w-full"
                  style={{
                    backgroundColor: PALETTE.cardBg,
                    border: `1px solid rgba(168, 169, 173, 0.4)`,
                    boxShadow: `0 4px 15px rgba(168, 169, 173, 0.15)`,
                  }}
                >
                  <div className="font-montserrat text-xl font-bold text-center mb-3" style={{ color: PALETTE.textMain }}>
                    {item.name}
                  </div>
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="pb-2 text-sm font-bold text-left pl-2" style={{ color: PALETTE.textSub }}>Flavor</th>
                        {item.tableColumns.map((col: number, cIdx: number) => (
                          <th key={cIdx} className="pb-2 text-sm font-bold" style={{ color: PALETTE.textSub }}>{col} pcs</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.tableRows.map((row: any, rIdx: number) => (
                        <tr key={rIdx} style={{ borderTop: `1px dotted rgba(168,169,173,0.5)`, backgroundColor: rIdx % 2 === 0 ? 'transparent' : 'rgba(168,169,173,0.06)' }}>
                          <td className="py-1 text-sm font-semibold text-left pl-2" style={{ color: PALETTE.textMain }}>{row.label}</td>
                          {row.prices.map((price: number, pIdx: number) => (
                            <td key={pIdx} className="py-1 text-sm font-bold" style={{ color: PALETTE.textMain }}>
                              {price}<span className="text-xs font-normal"> EGP</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            return (
              <div
                key={itemIndex}
                className="backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center min-h-[90px]"
                style={{
                  width: 'calc(50% - 0.5rem)',       // ← centered, half width
                  backgroundColor: PALETTE.cardBg,
                  border: `1px solid rgba(168, 169, 173, 0.4)`,
                  boxShadow: `0 4px 15px rgba(168, 169, 173, 0.15)`,
                }}
              >
                {isSingleSize ? (
                  <div className="flex justify-between items-center w-full">
                    <div className="font-montserrat text-xl font-bold text-[#7b7575]">{item.name}</div>
                    <div className="font-montserrat text-xl font-bold text-[#7b7575]">
                      {singlePrice} <span className="text-xs">EGP</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-montserrat text-xl font-bold text-center mb-2" style={{ color: PALETTE.textMain }}>
                      {item.name || 'Unnamed Item'}
                    </div>
                    <div className="space-y-1">
                      {sizes.map((size: any, sIdx: number) => (
                        <div key={sIdx} className="flex justify-between items-baseline border-b border-dotted pb-1" style={{ borderColor: 'rgba(168, 169, 173, 0.5)' }}>
                          <span className="text-sm font-medium" style={{ color: PALETTE.textMain }}>• {size.label || size.name}</span>
                          <span className="font-bold text-lg" style={{ color: PALETTE.textMain }}>{size.price} <span className="text-xs">EGP</span></span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {item.description && (
                  <div className="mt-1 text-sm italic text-center" style={{ color: PALETTE.textSub }}>{item.description}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Addons — glued to items, no page break between */}
        {uniqueAddons.length > 0 && (
          <div
            className="mt-3 p-3 rounded-xl border mx-2 text-center w-full box-border"
            style={{
              backgroundColor: PALETTE.addonsBg,
              borderColor: PALETTE.silver,
              boxShadow: `0 4px 10px rgba(168, 169, 173, 0.1)`
            }}
          >
            <div className="mb-2 flex justify-center w-full">
              <span
                className="font-montserrat text-sm font-bold uppercase tracking-widest px-6 py-1 rounded-full inline-block shadow-sm"
                style={{ backgroundColor: '#fff', color: PALETTE.textMain }}
              >
                ADD-ONS
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 items-center w-full">
              {uniqueAddons.map((addon, aIdx) => (
                <div
                  key={aIdx}
                  className="inline-flex items-center justify-center px-3 py-1 rounded-lg shadow-sm"
                  style={{
                    backgroundColor: PALETTE.addonsPillBg,
                    border: `1px solid rgba(168, 169, 173, 0.3)`
                  }}
                >
                  <span className="text-sm font-bold text-center" style={{ color: PALETTE.textMain }}>+ {addon.label}</span>
                  <span className="text-sm font-extrabold text-center ml-2" style={{ color: PALETTE.textSub }}>{addon.price} EGP</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="category-end-marker" />
      </div>
    );
  }
          return (
<div key={catIndex} className="relative z-10 mb-1 category-start">              {itemRows.map((row, rowIndex) => {
                const isFirstRow = rowIndex === 0;
                const isLastRow = rowIndex === itemRows.length - 1;
                const hasAddons = uniqueAddons.length > 0;
                const shouldRenderAddonsHere = isLastRow && hasAddons;
                const isSingleItem = row.length === 1;

                return (
                  <div 
                    key={rowIndex} 
                    className="print-block p-1"
                  >
                    {isFirstRow && (
                      <div className="text-center mb-6 flex items-center justify-center gap-4"> 
                        <div style={{ color: PALETTE.gold, fontSize: '1.5rem' }}>✧</div>
                        <h2 className="font-pacifico text-5xl leading-relaxed" style={{ color: PALETTE.textMain }}>
                          {category.name}
                        </h2>
                        <div style={{ color: PALETTE.gold, fontSize: '1.5rem' }}>✧</div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 w-full">
                      {row.map((item: any, itemIndex: number) => {
                        const sizes = item.sizes || item.options || [];
                        const isSingleSize = sizes.length === 1;
                        const singlePrice = isSingleSize ? sizes[0].price : item.price;
// ── NEW: Pancakes table rendering ──────────────────────────────────────
if (item.isTable && item.tableColumns && item.tableRows) {
  return (
    <div
      key={itemIndex}
      className="col-span-2 rounded-xl p-4"
      style={{
        backgroundColor: PALETTE.cardBg,
        border: `1px solid rgba(168, 169, 173, 0.4)`,
        boxShadow: `0 4px 15px rgba(168, 169, 173, 0.15)`,
      }}
    >
      {/* Item name */}
      <div className="font-montserrat text-xl font-bold text-center mb-3" style={{ color: PALETTE.textMain }}>
        {item.name}
      </div>

      {/* Table */}
      <table className="w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="pb-2 text-sm font-bold text-left pl-2" style={{ color: PALETTE.textSub }}>
              Flavor
            </th>
            {item.tableColumns.map((col: number, cIdx: number) => (
              <th key={cIdx} className="pb-2 text-sm font-bold" style={{ color: PALETTE.textSub }}>
                {col} pcs
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {item.tableRows.map((row: any, rIdx: number) => (
            <tr
              key={rIdx}
              style={{
                borderTop: `1px dotted rgba(168,169,173,0.5)`,
                backgroundColor: rIdx % 2 === 0 ? 'transparent' : 'rgba(168,169,173,0.06)',
              }}
            >
              <td className="py-1 text-sm font-semibold text-left pl-2" style={{ color: PALETTE.textMain }}>
                {row.label}
              </td>
              {row.prices.map((price: number, pIdx: number) => (
                <td key={pIdx} className="py-1 text-sm font-bold" style={{ color: PALETTE.textMain }}>
                  {price}
                  <span className="text-xs font-normal"> EGP</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// ── END Pancakes table ─────────────────────────────────────────────────

                        return (
                          <div
                            key={itemIndex}
                            className="backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center min-h-[90px]"
                            style={{ 
                                backgroundColor: PALETTE.cardBg, // Now much more opaque
                                border: `1px solid rgba(168, 169, 173, 0.4)`, 
                                boxShadow: `0 4px 15px rgba(168, 169, 173, 0.15)`,
                                 ...(isSingleItem ? { gridColumn: 'span 2', width: 'calc(50% - 0.5rem)', margin: '0 auto' } : {})
                            }}
                          >
                            {isSingleSize ? (
                                <div className="flex justify-between items-center w-full">
                                    <div className="font-montserrat text-xl font-bold text-[#7b7575]">
                                        {item.name}
                                    </div>
                                    <div className="font-montserrat text-xl font-bold text-[#7b7575]">
                                        {singlePrice} <span className="text-xs">EGP</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="font-montserrat text-xl font-bold text-center mb-2" style={{ color: PALETTE.textMain }}>
                                        {item.name || 'Unnamed Item'}
                                    </div>
                                    
                                    <div className="space-y-1">
                                        {sizes.map((size: any, sIdx: number) => (
                                        <div 
                                            key={sIdx} 
                                            className="flex justify-between items-baseline border-b border-dotted pb-1"
                                            style={{ borderColor: 'rgba(168, 169, 173, 0.5)' }} 
                                        >
                                            <span className="text-sm font-medium" style={{ color: PALETTE.textMain }}>
                                            • {size.label || size.name}
                                            </span>
                                            <span className="font-bold text-lg" style={{ color: PALETTE.textMain }}>
                                            {size.price} <span className="text-xs">EGP</span>
                                            </span>
                                        </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {item.description && (
                              <div className="mt-1 text-sm italic text-center" style={{ color: PALETTE.textSub }}>
                                {item.description}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {shouldRenderAddonsHere && uniqueAddons.length > 0 && (
                      <div 
                        className="mt-3 p-3 rounded-xl border mx-2 text-center w-full box-border"
                        style={{ 
                          backgroundColor: PALETTE.addonsBg, 
                          borderColor: PALETTE.silver, 
                          boxShadow: `0 4px 10px rgba(168, 169, 173, 0.1)`
                        }}
                      >
                        <div className="mb-2 flex justify-center w-full">
                          <span 
                            className="font-montserrat text-sm font-bold uppercase tracking-widest px-6 py-1 rounded-full inline-block shadow-sm"
                            style={{ backgroundColor: '#fff', color: PALETTE.textMain }}
                          >
                            ADD-ONS
                          </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 items-center gap-2 w-full">
                          {uniqueAddons.map((addon, aIdx) => (
                            <div 
                              key={aIdx} 
                              className="inline-flex items-center justify-center px-3 py-1 rounded-lg shadow-sm"
                              style={{ 
                                backgroundColor: PALETTE.addonsPillBg,
                                border: `1px solid rgba(168, 169, 173, 0.3)` 
                              }}
                            >
                              <span className="text-sm font-bold text-center" style={{ color: PALETTE.textMain }}>
                                + {addon.label}
                              </span>
                              <span className="text-sm font-extrabold text-center ml-2" style={{ color: PALETTE.textSub }}>
                                {addon.price} EGP
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {isLastRow && <div className="category-end-marker" />}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="print-block mt-4 pt-4 text-center p-4 relative z-10">
          <p className="font-pacifico text-3xl italic mb-2" style={{ color: PALETTE.textMain }}>
            Thank you for choosing BLEND
          </p>
        </div>
      </div>
    </>
  );
}









