
import React from 'react';
import { cn } from '@/lib/utils';
import ButtonCustom from '@/components/ui/button-custom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-portfolio-background">
          <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/20 to-portfolio-tertiary/20 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
        </div>
        
        {/* Grid decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNTkuNSA1OS41VjU4SDU4djEuNWgtMS41VjYwSDYwdi0uNWgtLjV6TTU4IDU4di0xLjVoLTEuNVY1OEg1OHptLTEuNS0xLjV2LTEuNWgtMS41djEuNUg1Ni41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDU1em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDUzLjV6TTUyIDUydi0xLjVoLTEuNVY1Mkg1MnptLTEuNS0xLjV2LTEuNWgtMS41djEuNUg1MC41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDQ5em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDQ3LjV6TTQ2IDQ2di0xLjVoLTEuNVY0Nkg0NnptLTEuNS0xLjV2LTEuNWgtMS41djEuNUg0NC41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDQzem0tMS41LTEuNXYtMS41aC0xLjV2MS41SDQxLjV6TTQwIDQwdi0xLjVoLTEuNVY0MEg0MHptLTEuNS0xLjV2LTEuNWgtMS41djEuNUgzOC41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDM3em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDM1LjV6TTM0IDM0di0xLjVoLTEuNVYzNEgzNHptLTEuNS0xLjV2LTEuNWgtMS41djEuNUgzMi41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDMxem0tMS41LTEuNXYtMS41aC0xLjV2MS41SDI5LjV6TTI4IDI4di0xLjVoLTEuNVYyOEgyOHptLTEuNS0xLjV2LTEuNWgtMS41djEuNUgyNi41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDI1em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDIzLjV6TTIyIDIydi0xLjVoLTEuNVYyMkgyMnptLTEuNS0xLjV2LTEuNWgtMS41djEuNUgyMC41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDE5em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDE3LjV6TTE2IDE2di0xLjVoLTEuNVYxNkgxNnptLTEuNS0xLjV2LTEuNWgtMS41djEuNUgxNC41em0tMS41LTEuNXYtMS41aC0xLjV2MS41SDEzem0tMS41LTEuNXYtMS41aC0xLjV2MS41SDExLjV6TTEwIDEwVjguNUg4LjVWMTBIMTB6bS0xLjUgNDh2MS41aDEuNVY1OEg4LjV6TTcgNTdsMS41LjAyVjU1LjVINlY1N2gxek02IDU0di0xLjVINC41VjU0SDZ6bS0xLjUgMHYxLjVIM1Y1NEg0LjV6TTMgNTR2LTEuNUgxLjVWNTRIM3ptLTEuNSAwdjEuNUgwVjU0aDEuNXpNMCA1NHYtMS41aDEuNXYtMUgwdi01MmgxLjV2LTFIMG0wIDEuNWgxLjVWMGgtMy44TTE5LjUgN2gwIiBzdHJva2Utb3BhY2l0eT0iLjIiIHN0cm9rZT0iI2ZmZiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <span className="text-gradient">Visual Storyteller</span> <br />& 3D Generalist
            </h1>
            <p className="text-xl md:text-2xl text-portfolio-muted mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
              Creating immersive digital experiences through graphic design, 3D modeling, and UI development.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              <ButtonCustom to="/portfolio" size="lg">
                Explore My Work
              </ButtonCustom>
              <ButtonCustom to="/contact" variant="outline" size="lg">
                Get In Touch
              </ButtonCustom>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-portfolio-muted flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-portfolio-muted rounded-full"></div>
          </div>
        </div>
      </section>
      
      {/* Featured Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Works</h2>
          <div className="w-20 h-1 bg-portfolio-primary mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <FeaturedWorkCard key={index} work={work} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <ButtonCustom to="/portfolio">
              View All Projects
            </ButtonCustom>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-portfolio-dark">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Services</h2>
          <div className="w-20 h-1 bg-portfolio-primary mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-portfolio-primary/10 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Bring Your Ideas to Life?</h2>
            <p className="text-lg mb-8 text-portfolio-muted">
              Let's collaborate to create something amazing together. I'm always open to discussing new projects and creative ideas.
            </p>
            <ButtonCustom to="/contact" size="lg">
              Start a Project
            </ButtonCustom>
          </div>
        </div>
      </section>
    </div>
  );
};

// Featured Works data
const featuredWorks = [
  {
    title: "Zach's Imaginary Lemonade",
    category: "3D Modeling & Rendering",
    image: "https://i.imgur.com/JlI1XUO.png",
    description: "Simple 3D Lemonade Can Made In Blender.",
  },
  {
    title: "2D Product Mockup",
    category: "Graphic Design",
    image: "https://i.imgur.com/KB6t2On.png",
    description: "Magnetic Box With A Custom Design, POD",
  },
  {
    title: "Face Yoga Website",
    category: "UI/UX Design",
    image: "https://i.imgur.com/2sN6IpD.png",
    description: "Built a responsive face-yoga site with class schedules, instructor profile, and online booking.",
  }
];

// Services data
const services = [
  {
    title: "Graphic Design",
    icon: "🎨",
    description: "Brand identity, print collateral, marketing materials, and digital assets tailored to your brand's unique voice."
  },
  {
    title: "3D Modeling & Rendering",
    icon: "🧊",
    description: "High-quality 3D models, environments, and photorealistic renders for various applications."
  },
  {
    title: "UI/UX Design",
    icon: "📱",
    description: "Intuitive user interfaces and engaging user experiences for web and mobile applications."
  }
];

// Featured Work Card Component
const FeaturedWorkCard = ({ work, index }: { work: any, index: number }) => (
  <div 
    className="group relative overflow-hidden rounded-lg animate-fade-in opacity-0" 
    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
  >
    <div className="relative h-72 overflow-hidden">
      <img 
        src={work.image} 
        alt={work.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <span className="inline-block text-xs font-medium bg-portfolio-primary/90 text-white px-2 py-1 rounded-sm mb-2">
        {work.category}
      </span>
      <h3 className="text-xl font-bold mb-2">{work.title}</h3>
      <p className="text-sm text-portfolio-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">{work.description}</p>
    </div>
  </div>
);

// Service Card Component
const ServiceCard = ({ service }: { service: any }) => (
  <div className="bg-portfolio-darker p-6 rounded-lg glass-effect">
    <div className="text-4xl mb-4">{service.icon}</div>
    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
    <p className="text-sm text-portfolio-muted">{service.description}</p>
  </div>
);

export default Home;
