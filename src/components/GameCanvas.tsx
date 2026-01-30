import React, { useRef, useEffect, useCallback } from 'react';
import type { Player, GameObject, Position, ChatMessage } from '@/types/game';

interface GameCanvasProps {
  currentPlayer: Player;
  otherPlayers: Player[];
  gameObjects: GameObject[];
  chatMessages: ChatMessage[];
  collectedItems: string[];
  camera: Position;
}

const TILE_SIZE = 64;

// Tile colors
const TILE_COLORS: Record<string, string> = {
  grass: '#2d5016',
  grassLight: '#3d6b1e',
  water: '#1e4d6b',
  sand: '#c4a35a',
  stone: '#4a4a4a',
  wood: '#5c4033',
  void: '#0a0a0f',
};

const GameCanvas: React.FC<GameCanvasProps> = ({
  currentPlayer,
  otherPlayers,
  gameObjects,
  chatMessages,
  collectedItems,
  camera,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const frameCount = useRef(0);

  // Draw a tile
  const drawTile = (ctx: CanvasRenderingContext2D, x: number, y: number, type: string, viewportWidth: number, viewportHeight: number) => {
    const screenX = x * TILE_SIZE - camera.x + viewportWidth / 2;
    const screenY = y * TILE_SIZE - camera.y + viewportHeight / 2;

    // Skip if off-screen
    if (screenX < -TILE_SIZE || screenX > viewportWidth ||
        screenY < -TILE_SIZE || screenY > viewportHeight) {
      return;
    }

    // Create pattern based on position
    const patternValue = (x + y) % 2;
    const baseColor = type === 'grass' && patternValue === 0 ? TILE_COLORS.grassLight : TILE_COLORS[type] || TILE_COLORS.grass;
    
    ctx.fillStyle = baseColor;
    ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

    // Add tile border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

    // Add detail based on type
    if (type === 'grass' && patternValue === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(screenX + 10, screenY + 10, 4, 4);
      ctx.fillRect(screenX + 40, screenY + 30, 3, 3);
      ctx.fillRect(screenX + 25, screenY + 45, 4, 4);
    }
  };

  // Draw the world grid
  const drawWorld = (ctx: CanvasRenderingContext2D, viewportWidth: number, viewportHeight: number) => {
    const startX = Math.floor((camera.x - viewportWidth / 2) / TILE_SIZE);
    const endX = Math.ceil((camera.x + viewportWidth / 2) / TILE_SIZE);
    const startY = Math.floor((camera.y - viewportHeight / 2) / TILE_SIZE);
    const endY = Math.ceil((camera.y + viewportHeight / 2) / TILE_SIZE);

    for (let x = startX - 1; x <= endX + 1; x++) {
      for (let y = startY - 1; y <= endY + 1; y++) {
        // Create different terrain zones based on position
        let tileType = 'grass';
        const distFromCenter = Math.sqrt(x * x + y * y);
        
        if (distFromCenter > 25) tileType = 'sand';
        if (distFromCenter > 40) tileType = 'stone';
        if (x > 20 && x < 30 && y > -10 && y < 10) tileType = 'water';
        if (x < -20 && x > -35 && y > 15 && y < 30) tileType = 'wood';
        
        drawTile(ctx, x, y, tileType, viewportWidth, viewportHeight);
      }
    }
  };

  // Draw a player avatar
  const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player, isCurrentPlayer: boolean, viewportWidth: number, viewportHeight: number) => {
    const screenX = player.position.x - camera.x + viewportWidth / 2;
    const screenY = player.position.y - camera.y + viewportHeight / 2;

    // Skip if off-screen
    if (screenX < -50 || screenX > viewportWidth + 50 ||
        screenY < -50 || screenY > viewportHeight + 50) {
      return;
    }

    const { avatar } = player;
    const scale = isCurrentPlayer ? 1.2 : 1;
    const baseSize = 40 * scale;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(screenX, screenY + baseSize / 2 + 5, baseSize / 2, baseSize / 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = avatar.bodyColor;
    ctx.beginPath();
    ctx.arc(screenX, screenY, baseSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Shirt
    ctx.fillStyle = avatar.shirtColor;
    ctx.fillRect(screenX - baseSize / 2, screenY, baseSize, baseSize / 2);

    // Pants
    ctx.fillStyle = avatar.pantsColor;
    ctx.fillRect(screenX - baseSize / 2 + 5, screenY + baseSize / 2, baseSize / 2 - 5, baseSize / 3);
    ctx.fillRect(screenX + 5, screenY + baseSize / 2, baseSize / 2 - 5, baseSize / 3);

    // Head/Face
    ctx.fillStyle = avatar.bodyColor;
    ctx.beginPath();
    ctx.arc(screenX, screenY - baseSize / 4, baseSize / 3, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = avatar.hairColor;
    if (avatar.hairStyle === 'short') {
      ctx.beginPath();
      ctx.arc(screenX, screenY - baseSize / 4, baseSize / 3, Math.PI, 0);
      ctx.fill();
    } else if (avatar.hairStyle === 'long') {
      ctx.beginPath();
      ctx.arc(screenX, screenY - baseSize / 4, baseSize / 3, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(screenX - baseSize / 3, screenY - baseSize / 4, baseSize / 1.5, baseSize / 2);
    } else if (avatar.hairStyle === 'spiky') {
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(screenX - baseSize / 3 + (i * baseSize / 6), screenY - baseSize / 3);
        ctx.lineTo(screenX - baseSize / 3 + (i * baseSize / 6) + baseSize / 12, screenY - baseSize / 2);
        ctx.lineTo(screenX - baseSize / 3 + (i * baseSize / 6) + baseSize / 6, screenY - baseSize / 3);
        ctx.fill();
      }
    }

    // Eyes (direction based)
    ctx.fillStyle = '#000';
    const eyeOffset = baseSize / 8;
    if (player.direction === 'right') {
      ctx.beginPath();
      ctx.arc(screenX + eyeOffset, screenY - baseSize / 4, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (player.direction === 'left') {
      ctx.beginPath();
      ctx.arc(screenX - eyeOffset, screenY - baseSize / 4, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(screenX - eyeOffset / 2, screenY - baseSize / 4, 2, 0, Math.PI * 2);
      ctx.arc(screenX + eyeOffset / 2, screenY - baseSize / 4, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Name tag
    ctx.font = `${isCurrentPlayer ? 'bold ' : ''}12px 'Rajdhani', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = isCurrentPlayer ? '#00d9ff' : '#fff';
    ctx.fillText(player.name, screenX, screenY - baseSize / 2 - 10);

    // Online indicator
    if (player.isOnline) {
      ctx.fillStyle = '#00ff00';
      ctx.beginPath();
      ctx.arc(screenX + baseSize / 2, screenY - baseSize / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Movement animation
    if (player.isMoving) {
      const bounce = Math.sin(frameCount.current * 0.2) * 3;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(screenX, screenY + baseSize / 2 + 5 + bounce, baseSize / 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Draw game objects
  const drawGameObject = (ctx: CanvasRenderingContext2D, obj: GameObject, viewportWidth: number, viewportHeight: number) => {
    // Skip collected items
    if (obj.type === 'item' && collectedItems.includes(obj.id)) {
      return;
    }

    const screenX = obj.position.x - camera.x + viewportWidth / 2;
    const screenY = obj.position.y - camera.y + viewportHeight / 2;

    // Skip if off-screen
    if (screenX < -100 || screenX > viewportWidth + 100 ||
        screenY < -100 || screenY > viewportHeight + 100) {
      return;
    }

    const { size, type } = obj;

    if (type === 'npc') {
      // Draw NPC
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(screenX, screenY, size.width / 2, 0, Math.PI * 2);
      ctx.fill();
      
      // NPC indicator
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(screenX, screenY - size.height / 2 - 15);
      ctx.lineTo(screenX - 8, screenY - size.height / 2 - 5);
      ctx.lineTo(screenX + 8, screenY - size.height / 2 - 5);
      ctx.fill();
      
      ctx.font = '11px "Rajdhani", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(obj.name, screenX, screenY + size.height / 2 + 15);
    } else if (type === 'item') {
      // Draw collectible item with glow
      const pulse = Math.sin(frameCount.current * 0.1) * 0.3 + 0.7;
      ctx.shadowColor = '#00d9ff';
      ctx.shadowBlur = 20 * pulse;
      
      ctx.fillStyle = `rgba(0, 217, 255, ${pulse})`;
      ctx.beginPath();
      ctx.moveTo(screenX, screenY - size.height / 2);
      ctx.lineTo(screenX + size.width / 2, screenY);
      ctx.lineTo(screenX, screenY + size.height / 2);
      ctx.lineTo(screenX - size.width / 2, screenY);
      ctx.closePath();
      ctx.fill();
      
      ctx.shadowBlur = 0;
      
      // Inner glow
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(screenX, screenY, size.width / 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'portal') {
      // Draw portal with animation
      const rotation = frameCount.current * 0.02;
      
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(rotation);
      
      // Outer ring
      ctx.strokeStyle = '#e94560';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, size.width / 2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner ring (opposite rotation)
      ctx.rotate(-rotation * 2);
      ctx.strokeStyle = '#00d9ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, size.width / 3, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
      
      // Portal center
      ctx.fillStyle = 'rgba(233, 69, 96, 0.5)';
      ctx.beginPath();
      ctx.arc(screenX, screenY, size.width / 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.font = '11px "Rajdhani", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(obj.name, screenX, screenY + size.height / 2 + 15);
    }
  };

  // Draw chat messages above players
  const drawChatMessages = (ctx: CanvasRenderingContext2D, viewportWidth: number, viewportHeight: number) => {
    const recentMessages = chatMessages.slice(-10);
    
    recentMessages.forEach(msg => {
      const screenX = (msg.position?.x || 0) - camera.x + viewportWidth / 2;
      const screenY = (msg.position?.y || 0) - camera.y + viewportHeight / 2 - 60;
      
      if (screenX < 0 || screenX > viewportWidth || screenY < 0 || screenY > viewportHeight) {
        return;
      }

      const age = Date.now() - msg.timestamp;
      const opacity = Math.max(0, 1 - age / 10000);
      
      if (opacity <= 0) return;

      ctx.font = '12px "Rajdhani", sans-serif';
      const textWidth = ctx.measureText(msg.message).width;
      const padding = 8;
      const bubbleWidth = textWidth + padding * 2;
      const bubbleHeight = 24;

      // Chat bubble background
      ctx.fillStyle = `rgba(0, 0, 0, ${0.8 * opacity})`;
      ctx.strokeStyle = `rgba(233, 69, 96, ${opacity})`;
      ctx.lineWidth = 1;
      
      // Draw rounded rectangle manually for compatibility
      const x = screenX - bubbleWidth / 2;
      const y = screenY - bubbleHeight / 2;
      const w = bubbleWidth;
      const h = bubbleHeight;
      const r = 8;
      
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Message text
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillText(msg.message, screenX, screenY + 4);
    });
  };

  // Main render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const viewportWidth = canvas.width;
    const viewportHeight = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw world
    drawWorld(ctx, viewportWidth, viewportHeight);

    // Draw game objects
    gameObjects.forEach(obj => drawGameObject(ctx, obj, viewportWidth, viewportHeight));

    // Draw other players
    otherPlayers.forEach(player => drawPlayer(ctx, player, false, viewportWidth, viewportHeight));

    // Draw current player
    drawPlayer(ctx, currentPlayer, true, viewportWidth, viewportHeight);

    // Draw chat messages
    drawChatMessages(ctx, viewportWidth, viewportHeight);

    // Update frame count
    frameCount.current++;

    animationRef.current = requestAnimationFrame(render);
  }, [camera, currentPlayer, otherPlayers, gameObjects, chatMessages, collectedItems]);

  // Start and stop animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(render);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [render]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default GameCanvas;
