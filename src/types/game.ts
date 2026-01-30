export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  position: Position;
  avatar: AvatarConfig;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
  isOnline: boolean;
}

export interface AvatarConfig {
  bodyColor: string;
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  hairStyle: 'short' | 'long' | 'spiky' | 'bald';
  accessories: string[];
}

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
  position?: Position;
}

export interface WorldZone {
  id: string;
  name: string;
  description: string;
  color: string;
  position: Position;
  size: { width: number; height: number };
  icon: string;
}

export interface GameObject {
  id: string;
  type: 'npc' | 'item' | 'portal' | 'sign';
  position: Position;
  size: { width: number; height: number };
  name: string;
  description?: string;
  interactive: boolean;
  sprite?: string;
}

export interface NPC extends GameObject {
  type: 'npc';
  dialogue: string[];
  currentDialogueIndex: number;
}

export interface Item extends GameObject {
  type: 'item';
  collectible: boolean;
  value: number;
}

export type TileType = 'grass' | 'water' | 'sand' | 'stone' | 'wood' | 'void';

export interface Tile {
  x: number;
  y: number;
  type: TileType;
  walkable: boolean;
}

export interface GameState {
  currentPlayer: Player;
  otherPlayers: Player[];
  chatMessages: ChatMessage[];
  currentZone: string;
  gameObjects: GameObject[];
  camera: Position;
  isChatOpen: boolean;
  isMenuOpen: boolean;
  isAvatarEditorOpen: boolean;
}
