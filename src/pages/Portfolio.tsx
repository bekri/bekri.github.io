
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ButtonCustom from '@/components/ui/button-custom';

// Portfolio project type definition
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tools: string[];
  role?: string;
  client?: string;
  link?: string;
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === selectedCategory);
      setFilteredProjects(filtered);
    }
  }, [selectedCategory]);
  
  // Open project modal
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close project modal
  const closeProjectModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Get unique categories
  const categories = ["all", ...new Set(projects.map(project => project.category))];
  
  return (
    <div>
      {/* Header */}
      <section className="relative py-24 bg-portfolio-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(155,135,245,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0">Portfolio</h1>
          <div className="w-20 h-1 bg-portfolio-primary mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-portfolio-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-portfolio-secondary/10 rounded-full blur-2xl"></div>
      </section>
      
      {/* Filter Categories */}
      <section className="py-8 bg-portfolio-darker sticky top-16 z-20 shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-portfolio-primary text-white"
                    : "bg-portfolio-dark text-portfolio-muted hover:bg-portfolio-dark/70"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-portfolio-muted">Try selecting a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => openProjectModal(project)} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeProjectModal}></div>
          <div 
            className="relative bg-portfolio-darker rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto z-50 animate-fade-in opacity-0"
            style={{ animationDelay: '0.1s' }}
          >
            <button 
              onClick={closeProjectModal} 
              className="absolute top-4 right-4 bg-portfolio-dark/50 rounded-full p-2 text-portfolio-muted hover:text-white transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
            
            <div className="relative w-full h-[40vh]">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-portfolio-background to-transparent"></div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-portfolio-primary/20 text-portfolio-primary text-xs px-3 py-1 rounded-full">{selectedProject.category}</span>
              </div>
              
              <p className="text-portfolio-muted mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              
              <div className="space-y-4">
                {selectedProject.role && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1">My Role</h3>
                    <p className="text-sm text-portfolio-muted">{selectedProject.role}</p>
                  </div>
                )}
                
                {selectedProject.client && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Client</h3>
                    <p className="text-sm text-portfolio-muted">{selectedProject.client}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-semibold mb-1">Tools Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool, index) => (
                      <span key={index} className="bg-portfolio-dark text-xs px-3 py-1 rounded-full text-portfolio-muted">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedProject.link && (
                  <div className="mt-6">
                    <ButtonCustom href={selectedProject.link} target="_blank">
                      View Live Project
                    </ButtonCustom>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => (
  <div 
    className="group relative rounded-lg overflow-hidden cursor-pointer animate-fade-in opacity-0"
    style={{ animationDelay: `${0.1 + (project.id % 10) * 0.05}s` }}
    onClick={onClick}
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
      <span className="text-xs font-medium bg-portfolio-primary/90 text-white px-2 py-1 inline-block rounded-sm mb-2 w-fit">
        {project.category}
      </span>
      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
      <p className="text-sm text-portfolio-muted line-clamp-2">{project.description}</p>
    </div>
  </div>
);

// Projects data
const projects: Project[] = [
  {
    id: 1,
    title: "Zach's Imaginary Lemonade",
    category: "3D Modeling & Rendering",
    image: "https://i.imgur.com/JlI1XUO.png",
    description: "Simple 3D Lemonade Can Made In Blender.",
    tools: ["Blender", "Clip Studio Paint", "Adobe Photoshop"],
    role: "Lead 3D Artist and Lighting Specialist",
    client: "Personal Project"
  },
  {
    id: 2,
    title: "Face Yoga MasterMind: Glow & Flow Sessions",
    category: "Graphic Design",
    image: "https://i.imgur.com/RgXUyvw.png",
    description: "A serene promo poster inviting participants to online Zoom face-yoga workshops. With a soft-focus portrait backdrop and dynamic brush-stroke graphics, it highlights a holistic practice designed to tone facial muscles, boost circulation, and promote natural relaxation—all from the comfort of your home.",
    tools: ["Canva", "Adobe Photoshop"],
    role: "Graphic Designer Designer",
    client: "Face Yoga MasterMind."
  },
  {
    id: 3,
    title: "Face Yoga Wellness Website Design – UI/UX & Development",
    category: "UI/UX Design",
    image: "https://i.imgur.com/lmmzC7M.png",
    description: "I designed this clean and calming website interface using Figma with a strong focus on user experience, clarity, and brand alignment for a face yoga and wellness program. The layout highlights intuitive navigation, modern typography, and a serene color palette to reflect the holistic nature of the services.The design was then brought to life using WordPress Elementor, ensuring responsiveness across devices and seamless content editing for the client. Key features include service overviews, appointment booking CTA, and visual storytelling through high-quality imagery—all optimized for user engagement and clarity.",
    tools: ["Figma", "Adobe Photoshop", "WordPress Elementor"],
    role: "UI/UX Designer & Web Dev",
    client: "Face Yoga MasterMind",
    link: "https://annaori.com/"
  },
  {
    id: 4,
    title: "Black Clover Fanart",
    category: "Digital Painting",
    image: "https://i.imgur.com/q5LrdGi.png",
    description: "A digital fan art of Asta from Black Clover, painted in Clip Studio Paint. He stands in a shadowy forest gripping his sword, while the demon’s silhouette looms behind him and his five-leaf grimoire floats before him, bathed in a glowing aura.",
    tools: ["Clip Studio Paint"],
    role: "Digital Artist"
  },
  {
    id: 5,
    title: "PTLancer Registration Screen UI",
    category: "UI/UX Design",
    image: "https://i.imgur.com/suefrHF.png",
    description: "A clean and intuitive registration interface designed in Figma for PTLancer — a platform connecting personal trainers and clients. The design features a modern gym-themed background with a sleek frosted-glass UI element to highlight the choice between registering as a Coach or a Client. Playful yet professional illustrations enhance user engagement, while the minimal layout ensures a smooth onboarding experience.",
    tools: ["Figma", "Visual Studio Code"],
    role: "UI Designer & Web Dev",
    client: "PT Lancer"
  },
  {
    id: 6,
    title: "Moroccan Wine",
    category: "3D Modeling & Rendering",
    image: "https://i.imgur.com/X43GGA5.png",
    description: "A sleek, 3D-rendered wine bottle crowned with a vibrant label that marries traditional Moroccan tile patterns and the classic red tarbouch. Dedicated to a beloved Facebook community, its name is subtly inscribed on the label—an elegant tribute that blends cultural heritage with modern design flair.",
    tools: ["Blender", "Adobe Photoshop"],
    role: "3D Artist and Concept Designer"
  },
  {
    id: 7,
    title: "Ramadan Story About Customized Educational Jigsaw Puzzle Design",
    category: "Graphic Design",
    image: "https://i.imgur.com/WBkgsNP.png",
    description: "This project showcases my graphic design work for a bilingual (English-Arabic) promotional flyer. I created a visually engaging layout to advertise personalized Ramadan-themed jigsaw puzzles for kids. The design highlights playful illustrations, editable name features, and festive Islamic elements, all tailored to appeal to a young audience and reflect cultural relevance. The layout balances both languages with a clean, modern aesthetic to ensure clarity and appeal across diverse audiences.",
    tools: ["Adobe Photoshop", "Canva"],
    role: "Graphic Designer",
    client: "BelleBox Gifts"
  },
  {
    id: 8,
    title: "PS5 Giveaway Landing Page Design",
    category: "UI/UX Design",
    image: "https://i.imgur.com/bjkt3JV.png",
    description: "A vibrant and engaging giveaway page designed in Figma to promote a PlayStation 5 giveaway. This layout was created to collect user emails through a visually appealing call-to-action, blending clean typography, dynamic PlayStation-themed visuals, and a user-friendly subscription form. The goal was to boost survey participation and newsletter sign-ups through effective visual hierarchy and gamified design elements.",
    tools: ["Figma"],
    role: "UX Designer",
    client: "Personal Project",
  },
  {
    id: 9,
    title: "Embers & Frost Lounge",
    category: "3D Modeling & Rendering",
    image: "https://i.imgur.com/utUAZid.png",
    description: "A cozy, wood-paneled lounge bathed in soft daylight from floor-to-ceiling windows revealing a snowy landscape beyond. In the foreground, a marble countertop holds a bottle of whiskey and a tumbler of amber spirit, inviting you to unwind by the minimalist coffee table and low-profile sofa beneath a framed deer watercolor.",
    tools: ["Blender", "ZBrush"],
    role: "interior visualization",
    client: "Fiverr Client"
  },
  {
    id: 10,
    title: "Diletta Gomez Digital Painting",
    category: "Digital Painting",
    image: "https://i.imgur.com/wUTIxf7.png",
    description: "A digital painting crafted in Clip Studio Paint, featuring model Diletta Gomez Gane. The artwork is based on an original photograph shot by photographer Alessio Albi.",
    tools: ["Clip Studio Paint"],
    role: "Digital Artist"
  },
  {
    id: 11,
    title: "Elegant Wedding Gift Box Mockup",
    category: "Graphic Design",
    image: "https://i.imgur.com/DA9z7ES.png",
    description: "A refined mockup design for a personalized wedding gift box featuring a soft botanical theme with gold accents and watercolor elements. Created to celebrate the union of Asmaa & Adam, the design pairs elegant typography with a heartfelt message, all wrapped in a clean white box and satin ribbon for a luxurious finish. Perfect for showcasing custom packaging design for wedding or event branding.",
    tools: ["Adobe Photoshop"],
    role: "Graphic Designer",
    client: "BelleBox Gifts"
  },
  {
    id: 12,
    title: "Final Detroit Smash – Midoriya & Bakugo Fan Art",
    category: "Digital Painting",
    image: "https://i.imgur.com/nVeHEgJ.png",
    description: "A high-energy digital painting inspired by Boku no Hero Academia, depicting Midoriya and Bakugo unleashing the Final Detroit Smash in perfect sync. This artwork captures the raw intensity, emotion, and explosive power of the duo’s combined attack, symbolizing their growth from rivals to formidable allies. Dynamic lighting, motion effects, and bold composition bring this epic moment to life with dramatic flair.",
    tools: ["Clip Studio Paint"],
    role: "Digital Artist"
  },
  {
  id: 13,
  title: "New Product Instagram Story",
  category: "Graphic Design",
  image: "https://i.imgur.com/blBMQ2F.png",
  description: "An Instagram story made to showcase new POD product that just dropped, This Showcases Design, Mockups and Story.",
  tools: ["Canva", "Adobe Photoshop"],
  role: "Graphic Designer",
  client: "BelleBox Gifts"
  },
  {
    id: 14,
    title: "Lumen Character Animation",
    category: "Digital Painting",
    image: "https://i.imgur.com/jeqR983.gif",
    description: "Lumen is a solitary being of living light, born from the last spark in a world consumed by shadow. Quiet and curious, Lumen glows with a soft brilliance that pulses with emotion a light that guides, heals, and reveals hidden paths. Though they do not speak, their journey through darkness speaks volumes. Fragile but determined, Lumen searches the remnants of a broken world not just to escape it, but to understand it and perhaps, to rekindle what was lost. as an Artist, I put my feelings into this character design and his story",
    tools: ["Clip Studio Paint", "Photoshop", "DALE AI" ],
    role: "Character Design, Animator"
  },
  {
    id: 13,
    title: "Web Flow Brand Identity Design",
    category: "Graphic Design",
    image: "https://i.imgur.com/KQsitYN.png",
    description: "This is a quick 5-minute concept design created as part of my application for Project Growth. It reflects a clean, storytelling approach to website creation, balancing aesthetics and usability to showcase creative ideas effectively.",
    tools: ["Canva", "Adobe Photoshop"],
    role: "Graphic Designer",
    client: "Project Growth"
    },
];

export default Portfolio;
