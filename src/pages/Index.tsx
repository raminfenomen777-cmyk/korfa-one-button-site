import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHomeSection, setShowHomeSection] = useState(false);
  const homeSectionRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsClicked(true);
    setIsMenuOpen(!isMenuOpen);
    setTimeout(() => setIsClicked(false), 300);
  };

  const handleHomeClick = () => {
    setShowHomeSection(true);
    setTimeout(() => {
      homeSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 200);
  };

  const homeButtons = [
    "Спальня", "Кухня", "Гостиная", "Ванная", "Коридор",
    "Балкон", "Кладовка", "Детская", "Кабинет", "Прихожая"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:32px_32px]" />
      
      <div className="relative z-10 text-center animate-fade-in">
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-black mb-4 transition-all duration-500">
            КОРФА
          </h1>
          <div className="w-24 h-px bg-black mx-auto opacity-30" />
        </div>
        
        <div className="space-y-8">
          <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            size="lg"
            className={`
              px-12 py-6 text-lg font-medium
              bg-black text-white border border-black
              transition-all duration-300 ease-out
              hover:bg-white hover:text-black
              hover:shadow-2xl hover:scale-105
              active:scale-95
              ${isHovered ? 'shadow-xl' : 'shadow-lg'}
              ${isClicked ? 'ring-4 ring-black/20' : ''}
            `}
          >
            КОРФА
          </Button>
          
          <div className="flex justify-center space-x-6 opacity-40">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className={`
            mt-8 space-y-4 transition-all duration-500 ease-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
          `}>
            <Button
              variant="outline"
              size="lg"
              onClick={handleHomeClick}
              className="
                px-8 py-4 text-base font-light
                bg-white text-black border-black
                hover:bg-black hover:text-white
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-lg
                mx-2
              "
            >
              ДОМА
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="
                px-8 py-4 text-base font-light
                bg-white text-black border-black
                hover:bg-black hover:text-white
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-lg
                mx-2
              "
            >
              ДОКУМЕНТЫ
            </Button>
          </div>
        </div>
        
        {!showHomeSection && (
          <div className="mt-16 opacity-60">
            <div className="w-px h-12 bg-black mx-auto mb-4" />
            <p className="text-sm font-light tracking-widest uppercase">
              Минимализм в действии
            </p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-8 left-8 opacity-30">
        <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full" />
        </div>
      </div>
      
      <div className="absolute top-8 right-8 opacity-30">
        <div className="flex space-x-2">
          <div className="w-8 h-px bg-black" />
          <div className="w-4 h-px bg-black" />
        </div>
      </div>
    </div>

    {showHomeSection && (
      <div 
        ref={homeSectionRef}
        className="min-h-screen bg-white flex items-center justify-center py-20 animate-fade-in"
      >
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light tracking-tight text-black mb-6">
              ДОМА
            </h2>
            <div className="w-16 h-px bg-black mx-auto opacity-50" />
            <p className="text-lg font-light text-gray-600 mt-6 tracking-wide">
              Выберите помещение
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {homeButtons.map((room, index) => (
              <Button
                key={room}
                variant="outline"
                size="sm"
                className={`
                  px-4 py-6 text-sm font-light
                  bg-white text-black border border-gray-300
                  hover:border-black hover:bg-black hover:text-white
                  transition-all duration-300 ease-out
                  hover:scale-105 hover:shadow-md
                  animate-fade-in
                `}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {room}
              </Button>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button
              variant="ghost"
              onClick={() => setShowHomeSection(false)}
              className="text-gray-400 hover:text-black transition-colors duration-300"
            >
              ← Назад
            </Button>
          </div>
        </div>
      </div>
    )}
  );
};

export default Index;