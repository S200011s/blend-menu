import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface CallToActionProps {
  pdfUrl: string;
  isPdfMode?: boolean;
}

export default function CallToAction({ pdfUrl, isPdfMode = false }: CallToActionProps) {
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrRef.current && pdfUrl) {
      QRCode.toCanvas(qrRef.current, pdfUrl, {
        width: 200,
        margin: 2,
        color: { dark: '#7b7575', light: '#f1cfce' },
      });
    }
  }, [pdfUrl]);

  const motionProps = (initial: any, animate: any, transition: any) =>
    isPdfMode ? { initial: {}, animate: {}, transition: { duration: 0 } } : { initial, animate, transition };

  return (
    <motion.div
      {...motionProps({ opacity: 0 }, { opacity: 1 }, { duration: 1 })}
className="menu-page relative bg-gradient-to-br from-[#cbbdbc] via-[#e4cfce] to-[#f1cfce] overflow-hidden py-12 px-8"    >
      <div className="absolute inset-0 backdrop-blur-3xl opacity-30"></div>

      <div className="relative z-10 text-center px-8 max-w-2xl  mx-auto">
        <motion.div {...motionProps({ y: -50, opacity: 0 }, { y: 0, opacity: 1 }, { delay: 0.3, duration: 0.8 })}>
          <h2 className="font-playfair text-6xl font-bold text-[#7b7575] mb-6">Visit Us</h2>
        </motion.div>

        <motion.div {...motionProps({ scale: 0 }, { scale: 1 }, { delay: 0.6, duration: 0.8 })} className="my-12">
          <img src="/images/loading2.jpg" alt="Cafe ambiance" className="w-full h-64 object-cover rounded-3xl shadow-2xl mb-8" />
        </motion.div>

        <motion.div {...motionProps({ y: 30, opacity: 0 }, { y: 0, opacity: 1 }, { delay: 0.9, duration: 0.8 })} className="space-y-6">
          <p className="font-pacifico text-lg text-[#7b7575] mt-8 italic">Thank you for choosing BLEND</p>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#958f8f] blur-3xl opacity-10"></div>
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#cbbdbc] blur-3xl opacity-10"></div>
    </motion.div>
  );
}

