import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "") {
      setError("Введите пароль");
      return;
    }
    onLogin(password);
    setPassword("");
    setError("");
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-light text-black mb-2">
            Вход для администратора
          </h3>
          <div className="w-12 h-px bg-black mx-auto opacity-50" />
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full p-4 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors duration-300"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button
              type="submit"
              variant="outline"
              className="px-8 py-2 text-black border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Войти
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="px-8 py-2 text-gray-400 hover:text-black transition-colors duration-300"
            >
              Отмена
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Только администраторы могут редактировать заметки
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;