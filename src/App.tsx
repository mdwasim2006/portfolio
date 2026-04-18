import { Mail } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Github, Linkedin } from './components/icons/BrandIcons';
import { MinimalistHero } from './components/MinimalistHero';
import { ProjectsSection } from './components/ProjectsSection';
import AnimatedBackgroundWrapper from './components/shared/AnimatedBackgroundWrapper';
import { SkillsSection } from './components/SkillsSection';

export default function App() {
  return (
    <div className="bg-black text-white">
      <main>
        <AnimatedBackgroundWrapper>
          <MinimalistHero
            intro="Computer Science Engineering student building real-world software, automation systems, and secure applications."
            headingLines={["build.", "impact."]}
            imageSrc="/my-photo.jpg"
            imageAlt="Portrait of Wasim"
            readMoreHref="#about"
            resumeHref="/resume/Mohamed_Wasim_Resume.pdf"
            resumeFileName="Mohamed_Wasim_Resume.pdf"
            accentClassName="bg-indigo-500"
            socialLinks={[
              { label: 'GitHub', href: 'https://github.com/mdwasim2006', icon: Github },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/mohamed-wasim-1a5938398', icon: Linkedin },
              { label: 'Email', href: 'mailto:wasim.j.office@gmail.com', icon: Mail },
            ]}
          />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </AnimatedBackgroundWrapper>
      </main>
    </div>
  );
}
