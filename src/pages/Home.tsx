
import React from 'react';
import { cn } from '@/lib/utils';
import ButtonCustom from '@/components/ui/button-custom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
  {/* Background effect */}
  <div className="absolute inset-0 bg-portfolio-background z-0">
    <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/20 to-portfolio-tertiary/20 animate-gradient-x"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
  </div>

  {/* LOOPING GIF (BEHIND GRID) */}
  <div className="absolute inset-0 z-0">
    <img
      src="https://i.imgur.com/EZlzAeT.gif" // Replace with your actual path
      alt="Looping background animation"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Grid decoration */}
  <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,...')] opacity-10 pointer-events-none"></div>

        
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
