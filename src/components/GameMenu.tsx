import React from 'react';
import { X, Settings, Volume2, Music, User, LogOut, HelpCircle } from 'lucide-react';

interface GameMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeName: (name: string) => void;
  currentName: string;
}

const GameMenu: React.FC<GameMenuProps> = ({
  isOpen,
  onClose,
  onChangeName,
  currentName,
}) => {
  const [newName, setNewName] = React.useState(currentName);
  const [showNameInput, setShowNameInput] = React.useState(false);

  if (!isOpen) return null;

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onChangeName(newName.trim());
      setShowNameInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-strong rounded-3xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#e94560] flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white font-['Orbitron']">
              Game Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Change Name */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-[#00d9ff]" />
              <span className="text-white font-semibold">Player Name</span>
            </div>
            
            {!showNameInput ? (
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{currentName}</span>
                <button
                  onClick={() => setShowNameInput(true)}
                  className="text-sm text-[#e94560] hover:text-[#ff6b6b] transition-colors"
                >
                  Change
                </button>
              </div>
            ) : (
              <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e94560]"
                  maxLength={20}
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#e94560] rounded-lg text-white text-sm hover:bg-[#ff6b6b] transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNameInput(false);
                    setNewName(currentName);
                  }}
                  className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>

          {/* Audio Settings */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <Volume2 className="w-5 h-5 text-[#ffd700]" />
              <span className="text-white font-semibold">Audio Settings</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Background Music</span>
                </div>
                <button className="w-12 h-6 rounded-full bg-[#e94560] relative transition-colors">
                  <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Sound Effects</span>
                </div>
                <button className="w-12 h-6 rounded-full bg-[#e94560] relative transition-colors">
                  <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Help */}
          <button className="w-full glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors">
            <HelpCircle className="w-5 h-5 text-[#4ecdc4]" />
            <span className="text-white font-semibold">How to Play</span>
          </button>

          {/* Stats */}
          <div className="glass rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Session Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#00d9ff] font-['Share_Tech_Mono']">0</p>
                <p className="text-xs text-gray-400">Distance Traveled</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#ffd700] font-['Share_Tech_Mono']">0</p>
                <p className="text-xs text-gray-400">Items Collected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
