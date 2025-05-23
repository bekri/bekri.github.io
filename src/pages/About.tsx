
import React from 'react';
import ButtonCustom from '@/components/ui/button-custom';

const About = () => {
  return (
    <div>
      {/* Header */}
      <section className="relative py-24 bg-portfolio-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(155,135,245,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0">About Me</h1>
          <div className="w-20 h-1 bg-portfolio-primary mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-portfolio-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-portfolio-secondary/10 rounded-full blur-2xl"></div>
      </section>
      
      {/* Bio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-portfolio-primary blur-xl opacity-20 transform -rotate-6"></div>
                <img 
                  src="https://i.imgur.com/iH43A6B.png" 
                  alt="Bekri Zakariae" 
                  className="relative z-10 w-full h-auto rounded-lg object-cover shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-portfolio-primary rounded-lg z-0"></div>
              </div>
              
              <div className="mt-8 space-y-4">
                <ButtonCustom 
                  href="https://drive.google.com/uc?export=download&id=1dBxD3Abf7DDXK-NGXEbcUARSNGL51-9u" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Resume
                </ButtonCustom>
                
                <div className="flex justify-center space-x-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-portfolio-darker p-3 rounded-full hover:bg-portfolio-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-portfolio-darker p-3 rounded-full hover:bg-portfolio-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                      <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-portfolio-darker p-3 rounded-full hover:bg-portfolio-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Bio Content */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Hi, I'm <span className="text-gradient">Bekri Zakariae</span>
              </h2>
              
              <p className="text-portfolio-muted leading-relaxed">
              I’m Bekri Zakariae — but most people call me <strong>Zach</strong>. I'm a versatile designer and digital creator based in Doha, with a strong foundation in <strong>graphic design</strong>, <strong>3D modeling</strong>, <strong>web development</strong>, and <strong>digital illustration</strong>. I’ve worn many hats over the years: from <strong>print shop operator</strong> to <strong>freelance designer</strong> to <strong>business owner</strong> — each role has sharpened my eye for detail, problem-solving, and creative execution.
              </p>

              <p className="text-portfolio-muted leading-relaxed">
              My work spans <strong>print advertising</strong>, <strong>branding</strong>, <strong>WordPress web development</strong>, and <strong>3D product visuals</strong>, and I’m currently developing my own portfolio site <strong>zbekri.io</strong> with a <strong>dark, futuristic aesthetic</strong>. I also have a deep interest in <strong>game development</strong>, especially <strong>narrative-driven platformers</strong>, and I’m working on original concepts like <strong>"Lumen"</strong> and <strong>"Bonebound"</strong>.
              </p>

              <p className="text-portfolio-muted leading-relaxed">
              Outside of work, I enjoy exploring <strong>pixel art</strong>, <strong>urban photography</strong>, and attending workshops to stay on top of new tools and trends. I believe in <strong>continuous learning</strong> — whether that’s mastering new <strong>design plugins</strong> or diving into <strong>Unity</strong> and <strong>game logic</strong>. My goal is simple: to <strong>grow as a designer</strong>, <strong>collaborate with passionate teams</strong>, and eventually bring my own <strong>indie game ideas</strong> to life.
              </p>   
              {/* Expertise */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">My Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expertiseList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-portfolio-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-portfolio-primary">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-sm text-portfolio-muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-16 bg-portfolio-dark">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-2">Skills & Tools</h2>
          <div className="w-20 h-1 bg-portfolio-primary mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-portfolio-darker p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-portfolio-primary">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-portfolio-darker rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Software Tools */}
          <div>
            <h3 className="text-xl font-bold mb-6">Software & Tools</h3>
            <div className="flex flex-wrap gap-4">
              {toolsList.map((tool, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 bg-portfolio-darker rounded-lg text-sm text-portfolio-muted flex items-center gap-2"
                >
                  <span className="text-portfolio-primary">{tool.icon}</span>
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Education & Experience */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Education</h2>
              <div className="w-20 h-1 bg-portfolio-primary mb-8"></div>
              
              <div className="space-y-8">
                {education.map((item, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-portfolio-primary/30">
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-portfolio-primary transform -translate-x-[3px]"></div>
                    <div className="text-sm text-portfolio-primary font-medium mb-1">{item.years}</div>
                    <h3 className="text-lg font-bold">{item.degree}</h3>
                    <div className="text-portfolio-muted">{item.institution}</div>
                    <p className="text-sm text-portfolio-muted mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Experience */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Experience</h2>
              <div className="w-20 h-1 bg-portfolio-primary mb-8"></div>
              
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-portfolio-primary/30">
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-portfolio-primary transform -translate-x-[3px]"></div>
                    <div className="text-sm text-portfolio-primary font-medium mb-1">{item.years}</div>
                    <h3 className="text-lg font-bold">{item.position}</h3>
                    <div className="text-portfolio-muted">{item.company}</div>
                    <p className="text-sm text-portfolio-muted mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-portfolio-dark">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-portfolio-muted max-w-2xl mx-auto mb-8">
            Interested in collaborating or have a project in mind? I'm always open to discussing new opportunities and creative challenges.
          </p>
          <ButtonCustom to="/contact" size="lg">
            Get In Touch
          </ButtonCustom>
        </div>
      </section>
    </div>
  );
};

// Expertise data
const expertiseList = [
  {
    icon: "🎨",
    title: "Graphic Design",
    description: "Brand identity systems, print media, digital assets, and marketing materials."
  },
  {
    icon: "🧊",
    title: "3D Modeling & Rendering",
    description: "Character modeling, environment design, product visualization, and architectural rendering."
  },
  {
    icon: "📱",
    title: "UI/UX Design",
    description: "User interfaces, experience design, wireframing, prototyping, and usability testing."
  },
  {
    icon: "🖌️",
    title: "Digital Illustration",
    description: "Concept art, character design, editorial illustrations, and digital painting."
  }
];

// Skills data
const skillCategories = [
  {
    title: "Design",
    skills: [
      { name: "Visual Design", level: 95 },
      { name: "Typography", level: 90 },
      { name: "Color Theory", level: 85 },
      { name: "Logo Design", level: 90 }
    ]
  },
  {
    title: "3D & Animation",
    skills: [
      { name: "3D Modeling", level: 85 },
      { name: "Texturing", level: 80 },
      { name: "Lighting & Rendering", level: 75 },
      { name: "Basic Animation", level: 65 }
    ]
  },
  {
    title: "Web & UI",
    skills: [
      { name: "UI Design", level: 90 },
      { name: "Wireframing", level: 85 },
      { name: "Prototyping", level: 80 },
      { name: "HTML/CSS", level: 70 }
    ]
  }
];

// Tools data
const toolsList = [
  { name: "Adobe Photoshop", icon: "🖌️" },
  { name: "Adobe Illustrator", icon: "✒️" },
  { name: "Canva", icon: "👨‍💻" },
  { name: "Blender", icon: "🧊" },
  { name: "Unity", icon: "🎮" },
  { name: "Figma", icon: "🖥️" },
  { name: "Sketch", icon: "📱" },
  { name: "Clip Studio Paint", icon: "🎨" },
  { name: "Visual Studio Code", icon: "🤖" }
];

// Education data
const education = [
  {
    years: "2013 - 2015",
    degree: "Technician Diploma In Draft Drawing",
    institution: "ISTA OFPPT",
    description: "Completed a vocational diploma in Draft Drawing (Dessin de Construction) at OFPPT ISTA, where I gained strong skills in technical drawing, blueprint reading, and CAD software (AutoCAD). Trained to produce accurate construction and mechanical plans, with a solid understanding of industry standards and design principles."
  },
  {
    years: "2016 - 2018",
    degree: "Specialized Technician in Structural Works",
    institution: "ISTA OFPPT",
    description: "Earned a Specialized Technician diploma in Structural Works (Gros Œuvre) from OFPPT ISTA, focusing on the execution and supervision of major construction projects. Gained hands-on experience in structural design, site management, and construction techniques, including foundations, concrete frameworks, and structural safety. Well-versed in construction regulations, project planning, and technical drawing interpretation."
  }
];

// Experience data
const experience = [
  {
    years: "2024 - Present",
    position: "Senior Designer",
    company: "BelleBox Gifts",
    description: "Lead design projects for major clients across various industries. Responsible for creative direction, client communication, and team collaboration."
  },
  {
    years: "2019 - 2023",
    position: "Print On Demand Business Owner & Manager",
    company: "Perma Print",
    description: "Founded and managed a print-on-demand shop specializing in custom merchandise such as mugs, t-shirts, hoodies, flyers, business cards, and banners. I created all visual assets, including personalized designs for customers and branding materials for local businesses. I operated and maintained printing equipment to ensure consistent quality and reduce downtime. In addition to overseeing the design workflow, I handled client service, inventory management, production scheduling, and machine upkeep. I also built strong B2B relationships with wholesalers and local businesses, managing large custom orders and securing repeat contracts."
  },
];

export default About;
