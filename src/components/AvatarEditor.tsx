import React from 'react';
import type { AvatarConfig } from '@/types/game';
import { X, Palette, Shirt, User, Sparkles } from 'lucide-react';

interface AvatarEditorProps {
  avatar: AvatarConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (updates: Partial<AvatarConfig>) => void;
}

const HAIR_STYLES = [
  { id: 'short', name: 'Short', emoji: '💇‍♂️' },
  { id: 'long', name: 'Long', emoji: '💇‍♀️' },
  { id: 'spiky', name: 'Spiky', emoji: '🦔' },
  { id: 'bald', name: 'Bald', emoji: '🥚' },
];

const COLORS = [
  '#e94560', '#00d9ff', '#ffd700', '#4ecdc4', 
  '#ff6b6b', '#a8e6cf', '#ff8b94', '#c7ceea',
  '#fdbcb4', '#4a3000', '#16213e', '#2d5016',
  '#8b5cf6', '#f472b6', '#10b981', '#f59e0b',
];

const AvatarEditor: React.FC<AvatarEditorProps> = ({
  avatar,
  isOpen,
  onClose,
  onUpdateAvatar,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-strong rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e94560] to-[#00d9ff] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Orbitron']">
                Avatar Editor
              </h2>
              <p className="text-sm text-gray-400">Customize your look</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Avatar Preview */}
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#16213e] to-[#0f3460] flex items-center justify-center border-2 border-[#e94560]/30">
                  <svg viewBox="0 0 100 120" className="w-40 h-48">
                    {/* Body */}
                    <circle cx="50" cy="35" r="20" fill={avatar.bodyColor} />
                    
                    {/* Shirt */}
                    <rect x="25" y="50" width="50" height="35" rx="5" fill={avatar.shirtColor} />
                    
                    {/* Pants */}
                    <rect x="30" y="80" width="18" height="30" rx="3" fill={avatar.pantsColor} />
                    <rect x="52" y="80" width="18" height="30" rx="3" fill={avatar.pantsColor} />
                    
                    {/* Head */}
                    <circle cx="50" cy="30" r="15" fill={avatar.bodyColor} />
                    
                    {/* Hair */}
                    {avatar.hairStyle !== 'bald' && (
                      <>
                        {avatar.hairStyle === 'short' && (
                          <path d="M35 25 Q50 10 65 25" fill={avatar.hairColor} />
                        )}
                        {avatar.hairStyle === 'long' && (
                          <>
                            <path d="M35 25 Q50 10 65 25" fill={avatar.hairColor} />
                            <rect x="35" y="25" width="30" height="25" fill={avatar.hairColor} />
                          </>
                        )}
                        {avatar.hairStyle === 'spiky' && (
                          <>
                            <path d="M40 20 L45 10 L50 20" fill={avatar.hairColor} />
                            <path d="M50 20 L55 8 L60 20" fill={avatar.hairColor} />
                            <path d="M35 25 L40 15 L45 25" fill={avatar.hairColor} />
                            <path d="M55 25 L60 15 L65 25" fill={avatar.hairColor} />
                          </>
                        )}
                      </>
                    )}
                    
                    {/* Eyes */}
                    <circle cx="45" cy="30" r="2" fill="#000" />
                    <circle cx="55" cy="30" r="2" fill="#000" />
                  </svg>
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-[#e94560]/20 rounded-3xl blur-xl -z-10" />
              </div>
              
              <p className="mt-4 text-gray-400 text-sm">Preview</p>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Hair Style */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-[#00d9ff]" />
                  <label className="text-sm font-semibold text-white">Hair Style</label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {HAIR_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => onUpdateAvatar({ hairStyle: style.id as AvatarConfig['hairStyle'] })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        avatar.hairStyle === style.id
                          ? 'border-[#e94560] bg-[#e94560]/20'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-2xl">{style.emoji}</span>
                      <p className="text-xs mt-1 text-gray-300">{style.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-[#ffd700]" />
                  <label className="text-sm font-semibold text-white">Hair Color</label>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => onUpdateAvatar({ hairColor: color })}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        avatar.hairColor === color
                          ? 'border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Shirt Color */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shirt className="w-4 h-4 text-[#e94560]" />
                  <label className="text-sm font-semibold text-white">Shirt Color</label>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => onUpdateAvatar({ shirtColor: color })}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        avatar.shirtColor === color
                          ? 'border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Pants Color */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded bg-[#4ecdc4]" />
                  <label className="text-sm font-semibold text-white">Pants Color</label>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => onUpdateAvatar({ pantsColor: color })}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        avatar.pantsColor === color
                          ? 'border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Skin Tone */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded bg-[#fdbcb4]" />
                  <label className="text-sm font-semibold text-white">Skin Tone</label>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {['#fdbcb4', '#f5d0b0', '#e8c4a0', '#d4a574', '#b8956a', '#8d6e63', '#6d4c41', '#3e2723'].map((color) => (
                    <button
                      key={color}
                      onClick={() => onUpdateAvatar({ bodyColor: color })}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        avatar.bodyColor === color
                          ? 'border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarEditor;
