import { useState, useCallback } from 'react';
import type { Player, ChatMessage, GameObject, Position, AvatarConfig } from '@/types/game';

const defaultAvatar: AvatarConfig = {
  bodyColor: '#fdbcb4',
  hairColor: '#4a3000',
  shirtColor: '#e94560',
  pantsColor: '#16213e',
  hairStyle: 'short',
  accessories: [],
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const generateRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * 2000) - 1000,
  y: Math.floor(Math.random() * 2000) - 1000,
});

const generateOtherPlayers = (count: number): Player[] => {
  const names = ['CyberNinja', 'PixelQueen', 'NeoRunner', 'StarWalker', 'CodeBreaker', 'DataStream', 'VoidWalker', 'FluxCapacitor'];
  const colors = ['#00d9ff', '#ffd700', '#ff6b6b', '#4ecdc4', '#a8e6cf', '#ff8b94', '#c7ceea', '#b4a7d6'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: generateId(),
    name: names[i % names.length] + '_' + Math.floor(Math.random() * 99),
    position: generateRandomPosition(),
    avatar: {
      ...defaultAvatar,
      shirtColor: colors[i % colors.length],
    },
    direction: ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)] as Player['direction'],
    isMoving: Math.random() > 0.5,
    isOnline: true,
  }));
};

const generateGameObjects = (): GameObject[] => {
  const objects: GameObject[] = [];
  
  // Add NPCs
  const npcNames = ['Guide Bot', 'Shop Keeper', 'Quest Giver', 'Info Terminal', 'Portal Master'];
  npcNames.forEach((name, i) => {
    objects.push({
      id: generateId(),
      type: 'npc',
      position: { x: -400 + i * 200, y: -300 + (i % 2) * 200 },
      size: { width: 40, height: 60 },
      name,
      description: `Interactive ${name}`,
      interactive: true,
    });
  });
  
  // Add collectible items
  for (let i = 0; i < 20; i++) {
    objects.push({
      id: generateId(),
      type: 'item',
      position: { 
        x: Math.floor(Math.random() * 1600) - 800, 
        y: Math.floor(Math.random() * 1600) - 800 
      },
      size: { width: 20, height: 20 },
      name: 'Crystal Shard',
      description: 'A glowing crystal shard',
      interactive: true,
    } as GameObject);
  }
  
  // Add portals
  const portalDestinations = ['Cyber City', 'Fantasy Realm', 'Space Station', 'Nature Reserve'];
  portalDestinations.forEach((dest, i) => {
    objects.push({
      id: generateId(),
      type: 'portal',
      position: { x: -600 + i * 400, y: 500 },
      size: { width: 80, height: 100 },
      name: `Portal to ${dest}`,
      description: `Travel to ${dest}`,
      interactive: true,
    });
  });
  
  return objects;
};

export const useGameState = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: 'player-1',
    name: 'You',
    position: { x: 0, y: 0 },
    avatar: defaultAvatar,
    direction: 'down',
    isMoving: false,
    isOnline: true,
  });

  const [otherPlayers] = useState<Player[]>(generateOtherPlayers(15));
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [gameObjects] = useState<GameObject[]>(generateGameObjects());
  const [camera, setCamera] = useState<Position>({ x: 0, y: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const movePlayer = useCallback((deltaX: number, deltaY: number) => {
    setCurrentPlayer(prev => {
      const newX = prev.position.x + deltaX;
      const newY = prev.position.y + deltaY;
      
      // Boundary check
      const boundedX = Math.max(-2000, Math.min(2000, newX));
      const boundedY = Math.max(-2000, Math.min(2000, newY));
      
      let direction = prev.direction;
      if (deltaX > 0) direction = 'right';
      else if (deltaX < 0) direction = 'left';
      else if (deltaY > 0) direction = 'down';
      else if (deltaY < 0) direction = 'up';
      
      return {
        ...prev,
        position: { x: boundedX, y: boundedY },
        direction,
        isMoving: deltaX !== 0 || deltaY !== 0,
      };
    });
    
    // Update camera to follow player
    setCamera({
      x: currentPlayer.position.x,
      y: currentPlayer.position.y,
    });
  }, [currentPlayer.position.x, currentPlayer.position.y]);

  const stopPlayer = useCallback(() => {
    setCurrentPlayer(prev => ({ ...prev, isMoving: false }));
  }, []);

  const sendChatMessage = useCallback((message: string) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      message,
      timestamp: Date.now(),
      position: currentPlayer.position,
    };
    setChatMessages(prev => [...prev.slice(-49), newMessage]);
  }, [currentPlayer]);

  const updateAvatar = useCallback((updates: Partial<AvatarConfig>) => {
    setCurrentPlayer(prev => ({
      ...prev,
      avatar: { ...prev.avatar, ...updates },
    }));
  }, []);

  const collectItem = useCallback((itemId: string, value: number) => {
    setCollectedItems(prev => [...prev, itemId]);
    setScore(prev => prev + value);
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setCurrentPlayer(prev => ({ ...prev, name }));
  }, []);

  return {
    currentPlayer,
    otherPlayers,
    chatMessages,
    gameObjects,
    camera,
    isChatOpen,
    isMenuOpen,
    isAvatarEditorOpen,
    collectedItems,
    score,
    movePlayer,
    stopPlayer,
    sendChatMessage,
    updateAvatar,
    collectItem,
    setPlayerName,
    setIsChatOpen,
    setIsMenuOpen,
    setIsAvatarEditorOpen,
  };
};
