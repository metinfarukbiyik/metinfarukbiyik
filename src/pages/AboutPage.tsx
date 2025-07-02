import { SEOHead } from '../components';
import { generatePageSEO } from '../utils/seo';
import { usePageTitle } from '../hooks/usePageTitle';
import { aboutData } from '../data/aboutData';

export function AboutPage() {
  const seo = generatePageSEO('about');
  usePageTitle(seo.title);

  // Sertifikaları 2 sütuna böl
  const midPoint = Math.ceil(aboutData.certificates.length / 2);
  const firstColumnCertificates = aboutData.certificates.slice(0, midPoint);
  const secondColumnCertificates = aboutData.certificates.slice(midPoint);

  // İş deneyimini 2 sütuna böl
  const expMidPoint = Math.ceil(aboutData.experience.length / 2);
  const firstColumnExperience = aboutData.experience.slice(0, expMidPoint);
  const secondColumnExperience = aboutData.experience.slice(expMidPoint);

  return (
    <>
      <SEOHead seo={seo} />
      <section className="about-section">
        <div className="section-header">
          <h2>Hakkımda</h2>
          <p className="section-description">
            {aboutData.description}
          </p>
        </div>

        <div className="about-grid">
          {/* İletişim & Ek Bilgiler - 2 sütun */}
          <div className="about-card span-2">
            <div className="card-icon">📞</div>
            <div className="card-content">
              <h3>İletişim & Ek Bilgiler</h3>
              <div className="contact-details-container">
                <div className="contact-category">
                  <h4>İletişim</h4>
                  <div className="contact-list">
                    {aboutData.contact.map((contact, index) => (
                      <div key={index} className="contact-item">
                        <span className="contact-label">{contact.label}</span>
                        {contact.href ? (
                          <a 
                            href={contact.href} 
                            className="contact-value"
                            target={contact.type === 'website' ? '_blank' : undefined}
                            rel={contact.type === 'website' ? 'noopener noreferrer' : undefined}
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span className="contact-value">{contact.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="contact-category">
                  <h4>Ek Bilgiler</h4>
                  <div className="detail-list">
                    {aboutData.additionalInfo.map((info, index) => (
                      <div key={index} className="detail-item">
                        <span className="detail-label">{info.label}</span>
                        <span className="detail-value">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yetenekler (Kişisel + Teknik) - 2 sütun */}
          <div className="about-card span-2">
            <div className="card-icon">⭐</div>
            <div className="card-content">
              <h3>Yetenekler</h3>
              <div className="skills-all-container">
                <div className="skills-category">
                  <h4>Kişisel Yetenekler</h4>
                  <div className="skills-grid">
                    {aboutData.skills.personal.map((skill, index) => (
                      <span key={index} className="skill-item">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="skills-category">
                  <h4>Teknik Yetenekler</h4>
                  <div className="tech-skills-container">
                    <div className="tech-category">
                      <h5>Programlar</h5>
                      <div className="skills-grid">
                        {aboutData.skills.programs.map((skill, index) => (
                          <span key={index} className="skill-item">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="tech-category">
                      <h5>Web Geliştirme</h5>
                      <div className="skills-grid">
                        {aboutData.skills.webDevelopment.map((skill, index) => (
                          <span key={index} className="skill-item">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sertifikalar - 2 sütun */}
          <div className="about-card span-2">
            <div className="card-icon">🏆</div>
            <div className="card-content">
              <h3>Sertifikalar</h3>
              <div className="certificate-grid">
                <div className="certificate-column">
                  {firstColumnCertificates.map((certificate, index) => (
                    <div key={index} className="certificate-item">
                      <div className="certificate-info">
                        <h4>{certificate.title}</h4>
                        <span className="certificate-issuer">{certificate.issuer}</span>
                        <span className="certificate-date">{certificate.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="certificate-column">
                  {secondColumnCertificates.map((certificate, index) => (
                    <div key={index} className="certificate-item">
                      <div className="certificate-info">
                        <h4>{certificate.title}</h4>
                        <span className="certificate-issuer">{certificate.issuer}</span>
                        <span className="certificate-date">{certificate.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* İş Deneyimi - 2 sütun */}
          <div className="about-card span-2">
            <div className="card-icon">💼</div>
            <div className="card-content">
              <h3>İş Deneyimi</h3>
              <div className="experience-grid">
                <div className="experience-column">
                  {firstColumnExperience.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <div className="company-info">
                        <h4>{exp.company}</h4>
                        <span className="position">{exp.position}</span>
                        <span className="duration">{exp.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="experience-column">
                  {secondColumnExperience.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <div className="company-info">
                        <h4>{exp.company}</h4>
                        <span className="position">{exp.position}</span>
                        <span className="duration">{exp.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Eğitim - 2 sütun */}
          <div className="about-card span-2">
            <div className="card-icon">🎓</div>
            <div className="card-content">
              <h3>Eğitim</h3>
              <div className="education-grid">
                <div className="education-column">
                  {aboutData.education.slice(0, 1).map((edu, index) => (
                    <div key={index} className="education-item">
                      <div className="school-info">
                        <h4>{edu.school}</h4>
                        <span className="school-detail">{edu.detail}</span>
                        <span className="degree">{edu.degree}</span>
                        <span className="duration">{edu.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="education-column">
                  {aboutData.education.slice(1).map((edu, index) => (
                    <div key={index} className="education-item">
                      <div className="school-info">
                        <h4>{edu.school}</h4>
                        <span className="school-detail">{edu.detail}</span>
                        <span className="degree">{edu.degree}</span>
                        <span className="duration">{edu.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 