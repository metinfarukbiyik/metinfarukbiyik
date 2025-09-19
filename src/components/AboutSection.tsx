import { HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="about-text">
        <p>
          Merhaba, ben <span className="highlight">Metin Faruk</span>. Yazılım geliştirme ve teknik destek alanlarında aktif olarak çalışıyorum. Teknik becerilerimi sürekli geliştirirken, aynı zamanda insanlarla etkili iletişim kurmayı ve çözüm odaklı yaklaşımı ön planda tutuyorum.
        </p>
        <p>
          İş hayatımda çok yönlü olmaya önem verirken, boş zamanlarımı ise doğayla baş başa geçiriyorum. Fotoğraf çekmek, kamp yapmak ve balık tutmak, benim için sadece hobi değil, aynı zamanda yaratıcılığımı besleyen birer ilham kaynağı.
        </p>
        <p>
          Teknoloji ve doğa arasında kurduğum bu dengeyle, hem profesyonel hem de kişisel gelişimime değer katmaya devam ediyorum.
        </p>
      </div>
      
      {/* Social Links */}
      <div className="social-links-bottom">
        <a href="mailto:metin@biyik.dev" rel="noopener noreferrer" className="social-link email">
          <HiMail className="social-icon" />
          Mail
        </a>
        <a href="https://github.com/metinfarukbiyik" target="_blank" rel="noopener noreferrer" className="social-link github">
          <FaGithub className="social-icon" />
          GitHub
        </a>
        <a href="https://instagram.com/_metinbiyik" target="_blank" rel="noopener noreferrer" className="social-link instagram">
          <FaInstagram className="social-icon" />
          Instagram
        </a>
        <a href="https://x.com/_metinbiyik" target="_blank" rel="noopener noreferrer" className="social-link twitter">
          <FaTwitter className="social-icon" />
          X
        </a>
        <a href="https://linkedin.com/in/metinbiyik" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
          <FaLinkedin className="social-icon" />
          LinkedIn
        </a>
      </div>
    </section>
  );
} 