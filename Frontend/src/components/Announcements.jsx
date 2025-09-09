// components/Announcements.jsx - Rekker Professional Company Announcements (Red Theme)
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";

const Announcements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const announcements = [
    "QUALITY • PRODUCTS • FOR • KENYAN • BUSINESSES • SINCE • 2009",
    "WHOLESALE • PRICING • AVAILABLE • CONTACT • FOR • MOQ • DETAILS",
    "SAFFRON • & • CORNELLS • BRANDS • AVAILABLE • NATIONWIDE",
    "MANUFACTURING • EXCELLENCE • DISTRIBUTION • NATIONWIDE • PARTNERSHIP • OPPORTUNITIES"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="relative bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat bg-center" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}>
        </div>
      </div>

      {/* Sliding Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse"></div>
      
      <div className="relative h-12 flex items-center justify-center px-4">
        <div className="flex items-center space-x-4">
          {/* Decorative Elements */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-400"></div>
            <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Announcement */}
          <div className="text-center">
            <div className="text-sm font-light tracking-[0.2em] uppercase">
              <Typewriter
                words={[announcements[currentIndex]]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={0}
                delaySpeed={0}
                cursorColor="#EF4444"
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-red-400"></div>
          </div>
        </div>
      </div>

      {/* Professional Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent"></div>
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-red-400/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-4 right-1/3 w-1 h-1 bg-red-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-2 left-2/3 w-1 h-1 bg-red-400/25 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
      </div>
    </div>
  );
};

export default Announcements;