import { useEffect, useRef, useCallback } from 'react';

interface KeyState {
  [key: string]: boolean;
}

export const useKeyboard = (
  onMove: (deltaX: number, deltaY: number) => void,
  onStop: () => void,
  speed: number = 5
) => {
  const keysPressed = useRef<KeyState>({});
  const animationFrameId = useRef<number | null>(null);
  const lastMoveTime = useRef<number>(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default for game controls
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
      e.preventDefault();
    }
    
    keysPressed.current[e.key.toLowerCase()] = true;
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current[e.key.toLowerCase()] = false;
  }, []);

  const updateMovement = useCallback(() => {
    const keys = keysPressed.current;
    let deltaX = 0;
    let deltaY = 0;

    // Check movement keys
    if (keys['arrowup'] || keys['w']) deltaY -= speed;
    if (keys['arrowdown'] || keys['s']) deltaY += speed;
    if (keys['arrowleft'] || keys['a']) deltaX -= speed;
    if (keys['arrowright'] || keys['d']) deltaX += speed;

    // Normalize diagonal movement
    if (deltaX !== 0 && deltaY !== 0) {
      const factor = 1 / Math.sqrt(2);
      deltaX *= factor;
      deltaY *= factor;
    }

    if (deltaX !== 0 || deltaY !== 0) {
      onMove(deltaX, deltaY);
      lastMoveTime.current = Date.now();
    } else if (Date.now() - lastMoveTime.current > 50) {
      onStop();
    }

    animationFrameId.current = requestAnimationFrame(updateMovement);
  }, [onMove, onStop, speed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animationFrameId.current = requestAnimationFrame(updateMovement);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleKeyDown, handleKeyUp, updateMovement]);

  return keysPressed;
};

export const useChatInput = (
  isActive: boolean,
  onSubmit: (message: string) => void,
  onClose: () => void
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  }, [inputValue, onSubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  return {
    inputRef,
    inputValue,
    setInputValue,
    handleSubmit,
    handleKeyDown,
  };
};

import React from 'react';
