import React from 'react';

const Footer: React.FC = () => (
  <p className="pt-8 text-center text-[12px] leading-relaxed text-label-tertiary">
    Bu özgeçmiş{' '}
    <a
      href="https://biyik.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent transition-opacity active:opacity-60"
    >
      Metin Faruk Bıyık
    </a>{' '}
    tarafından tasarlanıp kodlanmıştır.
  </p>
);

export default Footer;
