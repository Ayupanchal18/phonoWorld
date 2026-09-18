import React from 'react';
import { Smartphone, Laptop, Watch, Tablet, Headphones, LayoutGrid } from 'lucide-react';

const CATEGORY_ICONS = {
  smartphones: Smartphone,
  laptops: Laptop,
  wearables: Watch,
  tablets: Tablet,
  audio: Headphones,
  all: LayoutGrid
};

export const CategoryPills = ({ activeCategory = 'all', onSelectCategory, categories = [] }) => {
  const allItems = [
    { id: 'all', name: 'All Devices', icon: 'all' },
    ...categories
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
      <div className="flex items-center gap-2.5 min-w-max">
        {allItems.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] || LayoutGrid;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory?.(cat.id)}
              className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? 'bg-gradient-to-r from-accent-blue/25 to-accent-indigo/25 text-white border border-accent-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'bg-dark-card/70 hover:bg-dark-card text-zinc-400 hover:text-zinc-200 border border-white/5 hover:border-white/15'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent-blue text-white shadow-sm'
                    : 'bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span>{cat.name}</span>
              {cat.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold transition-colors ${
                    isActive
                      ? 'bg-accent-blue/40 text-blue-200'
                      : 'bg-white/5 text-zinc-500 group-hover:bg-white/10 group-hover:text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
