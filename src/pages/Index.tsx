import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHomeSection, setShowHomeSection] = useState(false);
  const [showStreetNumbers, setShowStreetNumbers] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState("");
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesType, setNotesType] = useState("");
  const [notes, setNotes] = useState<{[key: string]: string}>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const ADMIN_PASSWORD = "admin123"; // В реальном проекте это должно быть зашифровано

  // Загрузка заметок и статуса авторизации из localStorage при запуске
  useEffect(() => {
    const savedNotes = localStorage.getItem('house-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    const savedAdminStatus = localStorage.getItem('is-admin');
    if (savedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Сохранение заметок в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('house-notes', JSON.stringify(notes));
  }, [notes]);
  const homeSectionRef = useRef<HTMLDivElement>(null);
  const streetNumbersRef = useRef<HTMLDivElement>(null);

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

  const handleStreetClick = (street: string) => {
    setSelectedStreet(street);
    setShowStreetNumbers(true);
    setTimeout(() => {
      streetNumbersRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 200);
  };

  const handleHouseClick = (house: string) => {
    setSelectedHouse(house);
    setShowHouseModal(true);
  };



  const getNotesKey = () => {
    return `${selectedStreet}-${selectedHouse}-${notesType}`;
  };

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('is-admin', 'true');
      setShowAuthModal(false);
    } else {
      // Неправильный пароль - показываем ошибку
      return false;
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('is-admin');
  };

  const handleNotesClick = (type: string) => {
    if (!isAdmin) {
      setShowAuthModal(true);
      return;
    }
    setNotesType(type);
    setShowNotesModal(true);
    setShowHouseModal(false);
  };

  const handleSaveNotes = (noteText: string) => {
    if (!isAdmin) return;
    
    const key = getNotesKey();
    setNotes(prev => {
      const updatedNotes = {
        ...prev,
        [key]: noteText
      };
      // Сохраняем в localStorage сразу
      localStorage.setItem('house-notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setShowNotesModal(false);
    setShowHouseModal(true);
  };

  const streets = ["Таежное", "Геологов", "Арсеньева", "Ленина", "Советская", "Лазо"];
  
  const getHousesForStreet = (street: string) => {
    switch (street) {
      case "Таежное":
        return ["1", "2", "4", "6", "8", "10", "12", "14", "16", "21", "23"];
      case "Геологов":
        return Array.from({ length: 16 }, (_, i) => (i + 1).toString());
      case "Арсеньева":
        return ["12", "14", "16", "18", "20", "22", "24"];
      case "Ленина":
        return ["3", "8", "9", "10"];
      case "Лазо":
        return ["12", "14"];
      case "Советская":
        return ["1а", "1б"];
      default:
        return [];
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:32px_32px]" />
      
      <div className="relative z-10 text-center animate-fade-in">
        <div className="mb-12 relative">
          <div className="absolute top-0 right-0">
            {isAdmin ? (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-black transition-colors duration-300"
              >
                Выйти
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowAuthModal(true)}
                className="text-sm text-gray-500 hover:text-black transition-colors duration-300"
              >
                Вход
              </Button>
            )}
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-black mb-4 transition-all duration-500">
            КОРФА
          </h1>
          <div className="w-24 h-px bg-black mx-auto opacity-30" />
          {isAdmin && (
            <p className="text-sm text-green-600 mt-2">Администратор</p>
          )}
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

      {showHomeSection && !showStreetNumbers && (
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
              Выберите улицу
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {streets.map((street, index) => (
              <Button
                key={street}
                variant="outline"
                size="lg"
                onClick={() => handleStreetClick(street)}
                className={`
                  px-8 py-6 text-lg font-light
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
                {street}
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

      {showStreetNumbers && (
      <div 
        ref={streetNumbersRef}
        className="min-h-screen bg-white flex items-center justify-center py-20 animate-fade-in"
      >
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light tracking-tight text-black mb-6">
              {selectedStreet}
            </h2>
            <div className="w-16 h-px bg-black mx-auto opacity-50" />
            <p className="text-lg font-light text-gray-600 mt-6 tracking-wide">
              Выберите дом
            </p>
          </div>
          
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-w-5xl mx-auto">
            {getHousesForStreet(selectedStreet).map((number, index) => (
              <Button
                key={number}
                variant="outline"
                size="sm"
                onClick={() => handleHouseClick(number)}
                className={`
                  px-3 py-4 text-sm font-medium
                  bg-white text-black border border-gray-300
                  hover:border-black hover:bg-black hover:text-white
                  transition-all duration-300 ease-out
                  hover:scale-110 hover:shadow-md
                  animate-fade-in
                  aspect-square flex items-center justify-center
                `}
                style={{ 
                  animationDelay: `${index * 0.02}s`,
                  animationFillMode: 'both'
                }}
              >
                {number}
              </Button>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button
              variant="ghost"
              onClick={() => setShowStreetNumbers(false)}
              className="text-gray-400 hover:text-black transition-colors duration-300"
            >
              ← Назад
            </Button>
          </div>
        </div>
      </div>
      )}

      {showHouseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-black mb-2">
                {selectedStreet}, {selectedHouse}
              </h3>
              <div className="w-12 h-px bg-black mx-auto opacity-50" />
            </div>
            
            <div className="space-y-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNotesClick("card")}
                className="w-full py-4 text-lg font-light bg-white text-black border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Карточка дома
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNotesClick("2025")}
                className="w-full py-4 text-lg font-light bg-white text-black border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Работы на этот год (2025)
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNotesClick("2026")}
                className="w-full py-4 text-lg font-light bg-white text-black border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Работы на след. год (2026)
              </Button>
            </div>
            
            <div className="text-center mt-8">
              <Button
                variant="ghost"
                onClick={() => setShowHouseModal(false)}
                className="text-gray-400 hover:text-black transition-colors duration-300"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}

      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-black mb-2">
                {selectedStreet}, {selectedHouse}
              </h3>
              <p className="text-lg text-gray-600">
                {notesType === "card" ? "Карточка дома" : 
                 notesType === "2025" ? "Работы на этот год (2025)" : 
                 "Работы на след. год (2026)"}
              </p>
              <div className="w-12 h-px bg-black mx-auto opacity-50 mt-4" />
            </div>
            
            <div className="mb-6">
              {isAdmin ? (
                <textarea
                  value={notes[getNotesKey()] || ""}
                  onChange={(e) => setNotes(prev => ({
                    ...prev,
                    [getNotesKey()]: e.target.value
                  }))}
                  placeholder="Введите заметки..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:border-black focus:outline-none transition-colors duration-300"
                />
              ) : (
                <div className="w-full h-64 p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 overflow-y-auto">
                  {notes[getNotesKey()] || "Нет заметок"}
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-4">
              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={() => handleSaveNotes(notes[getNotesKey()] || "")}
                  className="px-8 py-2 text-black border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  Сохранить
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={() => {
                  setShowNotesModal(false);
                  setShowHouseModal(true);
                }}
                className="px-8 py-2 text-gray-400 hover:text-black transition-colors duration-300"
              >
                {isAdmin ? "Отмена" : "Закрыть"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Index;