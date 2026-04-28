import { motion } from 'framer-motion';

interface Size {
  label?: string;
  price: number;
}

interface MenuItemProps {
  name: string;
  sizes: Size[];
  delay?: number;
}

export default function MenuItem({ name, sizes, delay = 0 }: MenuItemProps) {
  const hasMultipleSizes = sizes.length > 1;
  const singleSizePrice = sizes[0]?.price;

  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="py-4 px-6 bg-white/40 backdrop-blur-sm rounded-2xl mb-4 shadow-sm"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-montserrat text-lg text-[#7b7575] font-medium">
          {name}
        </span>

        {!hasMultipleSizes && singleSizePrice && (
          <span className="font-montserrat text-lg text-[#958f8f] font-bold">
            {singleSizePrice} EGP
          </span>
        )}
      </div>

      {hasMultipleSizes && (
        <div className="space-y-2">
          {sizes.map((size, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-montserrat text-sm text-[#958f8f] ml-4">
                • {size.label}
              </span>
              <span className="font-montserrat text-lg text-[#958f8f] font-bold">
                {size.price} EGP
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
