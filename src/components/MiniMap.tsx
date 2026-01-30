import React from 'react';
import type { Player, GameObject } from '@/types/game';

interface MiniMapProps {
  currentPlayer: Player;
  otherPlayers: Player[];
  gameObjects: GameObject[];
  collectedItems: string[];
}

const MiniMap: React.FC<MiniMapProps> = ({
  currentPlayer,
  otherPlayers,
  gameObjects,
  collectedItems,
}) => {
  const mapSize = 200;
  const worldSize = 4000;
  const scale = mapSize / worldSize;

  const worldToMap = (x: number, y: number) => ({
    x: (x + worldSize / 2) * scale,
    y: (y + worldSize / 2) * scale,
  });

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className="glass-strong rounded-2xl p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-white font-['Orbitron']">MINI MAP</h4>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d9ff]" />
            <span className="text-xs text-gray-400">You</span>
          </div>
        </div>
        
        <svg 
          width={mapSize} 
          height={mapSize} 
          className="rounded-xl bg-[#0a0a0f] border border-white/10"
        >
          {/* Grid */}
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <line
                x1={0}
                y1={(mapSize / 10) * i}
                x2={mapSize}
                y2={(mapSize / 10) * i}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={1}
              />
              <line
                x1={(mapSize / 10) * i}
                y1={0}
                x2={(mapSize / 10) * i}
                y2={mapSize}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={1}
              />
            </React.Fragment>
          ))}

          {/* Zones */}
          <rect
            x={worldToMap(-800, -400).x}
            y={worldToMap(-800, -400).y}
            width={400 * scale}
            height={800 * scale}
            fill="rgba(0, 217, 255, 0.1)"
            stroke="rgba(0, 217, 255, 0.3)"
            strokeWidth={1}
          />
          <text
            x={worldToMap(-600, 0).x}
            y={worldToMap(-600, 0).y}
            fill="rgba(0, 217, 255, 0.5)"
            fontSize={8}
            textAnchor="middle"
          >
            Water
          </text>

          {/* Portals */}
          {gameObjects
            .filter(obj => obj.type === 'portal')
            .map(portal => {
              const pos = worldToMap(portal.position.x, portal.position.y);
              return (
                <circle
                  key={portal.id}
                  cx={pos.x}
                  cy={pos.y}
                  r={6}
                  fill="#e94560"
                  opacity={0.7}
                />
              );
            })}

          {/* Items */}
          {gameObjects
            .filter(obj => obj.type === 'item' && !collectedItems.includes(obj.id))
            .map(item => {
              const pos = worldToMap(item.position.x, item.position.y);
              return (
                <rect
                  key={item.id}
                  x={pos.x - 2}
                  y={pos.y - 2}
                  width={4}
                  height={4}
                  fill="#ffd700"
                  opacity={0.6}
                />
              );
            })}

          {/* Other Players */}
          {otherPlayers.map(player => {
            const pos = worldToMap(player.position.x, player.position.y);
            return (
              <circle
                key={player.id}
                cx={pos.x}
                cy={pos.y}
                r={3}
                fill="#8b5cf6"
                opacity={0.8}
              />
            );
          })}

          {/* Current Player */}
          <circle
            cx={worldToMap(currentPlayer.position.x, currentPlayer.position.y).x}
            cy={worldToMap(currentPlayer.position.x, currentPlayer.position.y).y}
            r={5}
            fill="#00d9ff"
            stroke="#fff"
            strokeWidth={2}
          />

          {/* Viewport indicator */}
          <rect
            x={worldToMap(currentPlayer.position.x - 600, currentPlayer.position.y - 400).x}
            y={worldToMap(currentPlayer.position.x - 600, currentPlayer.position.y - 400).y}
            width={1200 * scale}
            height={800 * scale}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        </svg>

        {/* Legend */}
        <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#e94560]" />
            <span className="text-gray-400">Portal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#ffd700]" />
            <span className="text-gray-400">Item</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
            <span className="text-gray-400">Player</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00d9ff]" />
            <span className="text-gray-400">You</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
