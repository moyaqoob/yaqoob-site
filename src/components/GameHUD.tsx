import React from 'react';
import type { Player } from '@/types/game';
import { MapPin, MessageSquare, User, Zap, Coins, Users } from 'lucide-react';

interface GameHUDProps {
  currentPlayer: Player;
  score: number;
  onlineCount: number;
  onToggleChat: () => void;
  onToggleAvatarEditor: () => void;
  onToggleMenu: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({
  currentPlayer,
  score,
  onlineCount,
  onToggleChat,
  onToggleAvatarEditor,
  onToggleMenu,
}) => {
  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="glass rounded-xl px-4 py-2">
            <h1 className="text-xl font-bold gradient-text font-['Orbitron']">
              METAVERSE 2D
            </h1>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#ffd700]" />
              <span className="font-['Share_Tech_Mono'] text-lg">{score.toLocaleString()}</span>
            </div>
            
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00d9ff]" />
              <span className="font-['Share_Tech_Mono'] text-lg">{onlineCount.toLocaleString()}</span>
            </div>

            <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#e94560]" />
              <span className="font-['Share_Tech_Mono'] text-sm">
                {currentPlayer.position.x.toFixed(0)}, {currentPlayer.position.y.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          {/* Player Info */}
          <div className="glass rounded-xl px-4 py-3 flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-full border-2 border-[#e94560] flex items-center justify-center"
              style={{ backgroundColor: currentPlayer.avatar.shirtColor }}
            >
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">{currentPlayer.name}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleChat}
              className="glass rounded-xl p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
            >
              <MessageSquare className="w-6 h-6 text-[#00d9ff] group-hover:neon-glow-cyan" />
            </button>
            
            <button
              onClick={onToggleAvatarEditor}
              className="glass rounded-xl p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
            >
              <User className="w-6 h-6 text-[#e94560] group-hover:neon-glow" />
            </button>
            
            <button
              onClick={onToggleMenu}
              className="glass rounded-xl p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
            >
              <Zap className="w-6 h-6 text-[#ffd700] group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Controls Hint */}
      <div className="fixed bottom-24 left-4 z-40">
        <div className="glass rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 mb-2">CONTROLS</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">WASD</kbd>
              <span className="text-gray-300">Move</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">E</kbd>
              <span className="text-gray-300">Interact</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Enter</kbd>
              <span className="text-gray-300">Chat</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameHUD;
