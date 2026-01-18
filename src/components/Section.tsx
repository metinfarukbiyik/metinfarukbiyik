import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-[#004A99] mb-1 tracking-wider">{title}</h2>
      <div className="h-0.5 bg-[#004A99] w-full mb-3"></div>
      <div>{children}</div>
    </section>
  );
};

export default Section;
