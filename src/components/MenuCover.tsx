import { motion } from 'framer-motion';

interface MenuCoverProps {
  isPdfMode?: boolean;
}

export default function MenuCover({ isPdfMode = false }: MenuCoverProps) {
  const motionProps = (initial: any, animate: any, transition: any) =>
    isPdfMode
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : { initial, animate, transition };

  return (
    // Changed bg-gradient to bg-transparent
    <motion.div
      {...motionProps({ opacity: 0 }, { opacity: 1 }, { duration: 1 })}
      className="menu-page relative flex flex-col items-center justify-center min-h-screen bg-transparent pt-20"
    >
      <div className="relative z-10 text-center px-8">
        <motion.div
          {...motionProps({ y: -50, opacity: 0 }, { y: 0, opacity: 1 }, { delay: 0.3, duration: 0.8 })}
        >
          <h1 className="font-playfair text-8xl font-bold text-[#7b7575] mb-4 tracking-wide">
            BLEND
          </h1>
        </motion.div>

        <motion.div
          {...motionProps({ scale: 0 }, { scale: 1 }, { delay: 0.6, duration: 0.8 })}
          className="my-8 md:my-12"
        >
          <img
            src="/images/cover.png"
            alt="Coffee with heart"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl mx-auto border-8 border-white/50"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </motion.div>

        <motion.div
          {...motionProps({ y: 50, opacity: 0 }, { y: 0, opacity: 1 }, { delay: 0.9, duration: 0.8 })}
        >
          <p className="font-pacifico text-xl text-[#7b7575] italic mb-8">
            Where every sip tells a story
          </p>
        </motion.div>

        <motion.div
          {...motionProps({ scaleX: 0 }, { scaleX: 1 }, { delay: 1.8, duration: 0.8 })}
          className="h-0.5 bg-gradient-to-r from-transparent via-[#958f8f] to-transparent my-8 mx-auto w-48"
        ></motion.div>

        
      </div>
    </motion.div>
  );
}