import { SEOHead } from '../components';
import { generatePageSEO } from '../utils/seo';
import { usePageTitle } from '../hooks/usePageTitle';
import { aboutData } from '../data/aboutData';
import { HiMail, HiLocationMarker, HiGlobeAlt, HiBriefcase, HiAcademicCap, HiBadgeCheck, HiLightBulb, HiUser, HiPhone } from 'react-icons/hi';

export function AboutPage() {
  const seo = generatePageSEO('about');
  usePageTitle(seo.title);

  // Icon mapping function
  const getContactIcon = (label: string) => {
    if (label.includes('📧') || label.includes('Email')) return <HiMail className="contact-icon" />;
    if (label.includes('📍') || label.includes('Konum')) return <HiLocationMarker className="contact-icon" />;
    if (label.includes('🌐') || label.includes('Website')) return <HiGlobeAlt className="contact-icon" />;
    return <HiUser className="contact-icon" />;
  };

  const getInfoIcon = (label: string) => {
    if (label.includes('🎂') || label.includes('Yaş')) return <HiUser className="info-icon" />;
    if (label.includes('💼') || label.includes('Durum')) return <HiBriefcase className="info-icon" />;
    return <HiLightBulb className="info-icon" />;
  };

  const getSectionIcon = (sectionName: string) => {
    switch (sectionName) {
      case 'yetenekler': return <HiLightBulb className="section-icon" />;
      case 'deneyim': return <HiBriefcase className="section-icon" />;
      case 'egitim': return <HiAcademicCap className="section-icon" />;
      case 'sertifikalar': return <HiBadgeCheck className="section-icon" />;
      default: return <HiUser className="section-icon" />;
    }
  };

  return (
    <>
      <SEOHead seo={seo} />
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>Hakkımda</h1>
          <p className="about-description">
            {aboutData.description}
          </p>
        </section>

        {/* Main Content */}
        <div className="about-content">
          
          {/* İletişim Bilgileri */}
          <section className="about-section">
            <h2><HiPhone className="section-icon" /> İletişim</h2>
            <div className="contact-grid">
                    {aboutData.contact.map((contact, index) => (
                      <div key={index} className="contact-item">
                  {getContactIcon(contact.label)}
                  <div className="contact-info">
                    <span className="contact-label">{contact.label.split(' ').slice(1).join(' ')}</span>
                        {contact.href ? (
                      <a href={contact.href} className="contact-value">{contact.value}</a>
                        ) : (
                          <span className="contact-value">{contact.value}</span>
                        )}
                  </div>
                      </div>
                    ))}
          </div>

            {/* Ek Bilgiler */}
            <div className="additional-info">
              {aboutData.additionalInfo.map((info, index) => (
                <div key={index} className="info-item">
                  {getInfoIcon(info.label)}
                  <div className="info-content">
                    <span className="info-label">{info.label.split(' ').slice(1).join(' ')}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                </div>
                        ))}
                      </div>
          </section>

          {/* Yetenekler */}
          <section className="about-section">
            <h2>{getSectionIcon('yetenekler')} Yetenekler</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Kişisel Yetenekler</h3>
                <div className="skill-tags">
                  {aboutData.skills.personal.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                        ))}
            </div>
          </div>

              <div className="skill-category">
                <h3>Programlar</h3>
                <div className="skill-tags">
                  {aboutData.skills.programs.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                      </div>
              
              <div className="skill-category">
                <h3>Web Geliştirme</h3>
                <div className="skill-tags">
                  {aboutData.skills.webDevelopment.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* İş Deneyimi */}
          <section className="about-section">
            <h2>{getSectionIcon('deneyim')} İş Deneyimi</h2>
            <div className="timeline">
              {aboutData.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-content">
                    <h3>{exp.company}</h3>
                    <p className="position">{exp.position}</p>
                        <span className="duration">{exp.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
          </section>

          {/* Eğitim */}
          <section className="about-section">
            <h2>{getSectionIcon('egitim')} Eğitim</h2>
            <div className="education-list">
              {aboutData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-content">
                    <h3>{edu.school}</h3>
                    <p className="education-detail">{edu.detail}</p>
                    <span className="education-degree">{edu.degree}</span>
                    <span className="education-duration">{edu.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
          </section>

          {/* Sertifikalar */}
          <section className="about-section">
            <h2>{getSectionIcon('sertifikalar')} Sertifikalar</h2>
            <div className="certificates-grid">
              {aboutData.certificates.map((cert, index) => (
                <div key={index} className="certificate-item">
                  <h3>{cert.title}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  <span className="certificate-date">{cert.date}</span>
                    </div>
                  ))}
            </div>
          </section>



        </div>
      </div>
    </>
  );
} 