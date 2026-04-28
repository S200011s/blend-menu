import { motion } from 'framer-motion';
import MenuItem from './MenuItem';

interface Size {
  label?: string;
  price: number;
}

interface Addon {
  label: string;
  price: number;
}

interface MenuItemData {
  name: string;
  img?: string; 
  sizes: Size[];
  addons?: Addon[];
  description?: string;
  isTable?: boolean;
  tableColumns?: number[];
  tableRows?: any[];
}

interface CategorySectionProps {
  title: string;
  items: MenuItemData[];
  image?: string;
  pageNumber: number;
  isPdfMode?: boolean;
}

export default function CategorySection({
  title,
  items,
  image,
  pageNumber,
  isPdfMode = false
}: CategorySectionProps) {

  const motionProps = (initial: any, animate: any, transition: any) =>
    isPdfMode
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : { initial, animate, transition };

  const allAddons = items.flatMap(item => item.addons || []);
  const uniqueAddons = Array.from(
    new Map(
      allAddons.map(addon => [
        `${addon.label}-${addon.price}`,
        addon
      ])
    ).values()
  );

  return (
    <div className="menu-page relative bg-transparent py-8 px-8 ">
      <div className="relative z-10 max-w-2xl mx-auto w-full">

        {!isPdfMode && image && (
          <motion.div
            {...motionProps(
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1 },
              { duration: 0.8 }
            )}
            className="mb-8"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-64 object-cover rounded-[2rem] shadow-lg border-4 border-white/50"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </motion.div>
        )}

        <motion.div
          {...motionProps(
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1 },
            { delay: 0.3, duration: 0.6 }
          )}
          className="text-center mb-5 flex justify-center items-center gap-4"
        >
          <div className="text-[#D4AF37] text-2xl">✧</div>
          <h2 className="font-pacifico text-5xl text-[#7b7575] capitalize leading-normal">
            {title}
          </h2>
          <div className="text-[#D4AF37] text-2xl">✧</div>
        </motion.div>

        <div className="space-y-4">
  {items.map((item, index) => {
    if (item.isTable && item.tableColumns && item.tableRows) {
      return (
        <motion.div
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm"
        >
          {/* Title */}
          <div className="text-center font-montserrat text-lg font-bold mb-4 text-[#7b7575]">
            {item.name}
          </div>

          {/* Table */}
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="pb-2 text-sm font-bold text-left pl-2 text-[#958f8f]">
                  Flavor
                </th>

                {item.tableColumns.map((col, cIdx) => (
                  <th key={cIdx} className="pb-2 text-sm font-bold text-[#958f8f]">
                    {col} pcs
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {item.tableRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={`border-t border-dashed ${
                    rIdx % 2 === 0 ? '' : 'bg-white/30'
                  }`}
                >
                  <td className="py-2 text-sm font-semibold text-left pl-2 text-[#7b7575]">
                    {row.label}
                  </td>

                  {row.prices.map((price, pIdx) => (
                    <td key={pIdx} className="py-2 text-sm font-bold text-[#7b7575]">
                      {price}
                      <span className="text-xs font-normal"> EGP</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      );
    }

    return (
      <MenuItem
        key={index}
        name={item.name}
        sizes={item.sizes}
        delay={0.4 + index * 0.1}
      />
    );
  })}
</div>

        {uniqueAddons.length > 0 && (
          <div
            className="mt-4 p-3 rounded-xl border text-center bg-white/50 backdrop-blur-sm"
            style={{ borderColor: 'rgba(168, 169, 173, 0.4)' }}
          >
            <div className="mb-3 flex justify-center">
              <span className="font-montserrat text-sm font-bold uppercase tracking-widest px-6 py-1 rounded-full bg-white text-[#7b7575] shadow-sm">
                ADD-ONS
              </span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2">
              {uniqueAddons.map((addon, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/70 border border-white shadow-sm"
                >
                  <span className="text-sm font-bold text-[#7b7575]">
                    + {addon.label}
                  </span>
                  <span className="text-sm font-extrabold text-[#958f8f]">
                    {addon.price} EGP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}