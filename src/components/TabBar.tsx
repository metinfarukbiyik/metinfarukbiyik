import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRound, LayoutGrid, Award, Laptop } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Özgeçmiş', icon: UserRound },
  { to: '/projeler', label: 'Projeler', icon: LayoutGrid },
  { to: '/sertifikalar', label: 'Sertifikalar', icon: Award },
  { to: '/ekipmanlar', label: 'Ekipmanlar', icon: Laptop },
];

const TabBar: React.FC = () => (
  <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-separator bg-card/80 backdrop-blur-xl">
    <div
      className="mx-auto flex w-full max-w-[720px] items-stretch justify-around px-2 pt-1.5"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)' }}
    >
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors ${
              isActive ? 'text-accent' : 'text-label-tertiary hover:text-label-secondary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={23} strokeWidth={isActive ? 2.4 : 1.9} />
              <span className="text-[10.5px] font-medium tracking-tight">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default TabBar;
