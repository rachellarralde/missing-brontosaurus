'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image'

const RecordIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    className="text-foreground"
  >
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"
    />
  </svg>
);

const TurntableIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 80 80"
    className="text-foreground"
  >
    <path
      fill="currentColor"
      d="M40 5C20.7 5 5 20.7 5 40s15.7 35 35 35 35-15.7 35-35S59.3 5 40 5zm0 60c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z"
    />
    <path
      fill="currentColor"
      d="M40 25c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 20c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
    />
    <rect
      fill="currentColor"
      x="65"
      y="35"
      width="15"
      height="10"
    />
  </svg>
);

type ObstacleType = 'single' | 'turntable';

interface Obstacle {
  id: number;
  type: ObstacleType;
  x: number;
}

const getObstacleType = (score: number): ObstacleType => {
  return score % 500 < 250 ? 'single' : 'turntable';
};

export default function Component() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(366)
  const [gameOver, setGameOver] = useState(false)
  const dinoRef = useRef<HTMLDivElement>(null)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [speed, setSpeed] = useState(2)
  const nextObstacleIdRef = useRef(1)
  const lastObstacleTimeRef = useRef(0)
  // Jumping physics refs
  const jumpingRef = useRef(false)
  const jumpHeightRef = useRef(0)
  const jumpVelocityRef = useRef(0)
  const gravityRef = useRef(0.7) // Reduced gravity for slower falling
  const jumpPowerRef = useRef(16) // Slightly reduced jump power
  const keyPressedRef = useRef(false)

  const calculateSpeed = useCallback((currentScore: number): number => {
    if (currentScore < 500) return 2;
    if (currentScore < 1000) return 1.7;
    if (currentScore < 1500) return 1.4;
    if (currentScore < 2000) return 1.2;
    return Math.max(1, 2 - (currentScore / 2500));
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setSpeed(2)
    setObstacles([])
    lastObstacleTimeRef.current = 0
    nextObstacleIdRef.current = 1
  }, []);

  const jump = useCallback(() => {
    if (!jumpingRef.current && gameStarted && !gameOver) {
      jumpingRef.current = true;
      jumpVelocityRef.current = jumpPowerRef.current;
    }
  }, [gameStarted, gameOver]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      keyPressedRef.current = true;
      
      if (!gameStarted) {
        startGame();
      } else if (!jumpingRef.current && !gameOver) {
        jump();
      }
    }
  }, [gameStarted, jump, startGame, gameOver]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      keyPressedRef.current = false;
    }
  }, []);

  const spawnObstacle = useCallback(() => {
    if (!gameAreaRef.current) return;
    
    const gameWidth = gameAreaRef.current.offsetWidth;
    
    const newObstacle: Obstacle = {
      id: nextObstacleIdRef.current++,
      type: getObstacleType(score),
      x: gameWidth // Start at the right edge of the game area
    };
    
    setObstacles(prev => [...prev, newObstacle]);
  }, [score]);

  const checkCollisions = useCallback(() => {
    if (!dinoRef.current || obstacles.length === 0) return false;
    
    const dinoRect = dinoRef.current.getBoundingClientRect();
    
    // More forgiving collision detection
    const collisionThreshold = 20;
    const dinoCollisionWidth = dinoRect.width * 0.6;
    const dinoCollisionLeft = dinoRect.left + (dinoRect.width * 0.2);
    const dinoCollisionRight = dinoCollisionLeft + dinoCollisionWidth;
    
    for (const obstacle of obstacles) {
      const obstacleElement = document.querySelector(`[data-obstacle-id="${obstacle.id}"]`);
      if (!obstacleElement) continue;
      
      const obstacleRect = obstacleElement.getBoundingClientRect();
      
      if (
        dinoCollisionRight > obstacleRect.left &&
        dinoCollisionLeft < obstacleRect.right &&
        dinoRect.bottom - collisionThreshold > obstacleRect.top &&
        dinoRect.top + collisionThreshold < obstacleRect.bottom
      ) {
        return true;
      }
    }
    
    return false;
  }, [obstacles]);

  useEffect(() => {
    const gameLoop = () => {
      if (gameStarted && !gameOver) {
        // Check for collisions
        if (checkCollisions()) {
          setGameOver(true);
          setGameStarted(false);
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
          return;
        }
        
        // Handle jumping physics
        if (jumpingRef.current) {
          // Apply velocity to position
          jumpHeightRef.current += jumpVelocityRef.current;
          
          // Apply gravity to velocity (slower at the peak of the jump)
          if (jumpVelocityRef.current > 0) {
            // Slower deceleration when going up
            jumpVelocityRef.current -= gravityRef.current * 0.8;
          } else {
            // Normal acceleration when falling
            jumpVelocityRef.current -= gravityRef.current;
          }
          
          // Check if dinosaur has landed
          if (jumpHeightRef.current <= 0) {
            jumpHeightRef.current = 0;
            jumpingRef.current = false;
            
            // Allow immediate jump again if key is still pressed
            if (keyPressedRef.current && gameStarted && !gameOver) {
              jump();
            }
          }
          
          // Update dinosaur position if ref exists
          if (dinoRef.current) {
            dinoRef.current.style.transform = `translateY(-${jumpHeightRef.current}px)`;
          }
        }
        
        // Spawn obstacles
        const currentTime = Date.now();
        const timeSinceLastObstacle = currentTime - lastObstacleTimeRef.current;
        const minTimeBetweenObstacles = 1500; // 1.5 seconds between obstacles
        
        if (timeSinceLastObstacle > minTimeBetweenObstacles) {
          spawnObstacle();
          lastObstacleTimeRef.current = currentTime;
        }
        
        // Move obstacles
        setObstacles(prev => {
          // Move obstacles from right to left
          const updatedObstacles = prev.map(obstacle => ({
            ...obstacle,
            x: obstacle.x - (5 / speed) // Move faster when speed is lower
          }));
          
          // Remove obstacles that are off-screen
          return updatedObstacles.filter(obstacle => obstacle.x > -50);
        });
        
        setScore(prev => prev + 1);
      }
      
      frameRef.current = requestAnimationFrame(gameLoop);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    if (gameStarted) {
      frameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [gameStarted, gameOver, handleKeyDown, handleKeyUp, jump, score, spawnObstacle, checkCollisions, speed]);

  useEffect(() => {
    setSpeed(calculateSpeed(score))
    if (gameOver && score > highScore) {
      setHighScore(score)
    }
  }, [score, gameOver, highScore, calculateSpeed])

  return (
    <div className="relative w-full h-fit min-h-48 bg-background justify-center p-4 font-mono">
      <div className="text-center">
        <p className="text-sm text-foreground">Press the Spacebar to start the game and jump.</p>
      </div>

      <div className="w-full max-w-2xl">
        <div className="text-right mb-4 font-mono text-foreground">
          <span className="mr-4">HI {highScore.toString().padStart(5, '0')}</span>
          <span>{score.toString().padStart(5, '0')}</span>
        </div>

        <div 
          ref={gameAreaRef}
          className="relative h-32 border-b border-dotted border-muted-foreground"
        >
          {/* Background Clouds */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="cloud absolute top-4 right-20 w-12 h-4 opacity-10" />
            <div className="cloud absolute top-8 right-48 w-16 h-4 opacity-10" />
            <div className="cloud absolute top-6 left-32 w-12 h-4 opacity-10" />
          </div>

          {/* Dinosaur - Made Much Bigger */}
          <div
            ref={dinoRef}
            className="absolute left-8 bottom-0"
          >
            <Image
              src="/logos/game-image.png"
              alt="Dinosaur"
              width={100}
              height={120}
              className="object-contain"
              priority
            />
          </div>

          {/* Render all obstacles */}
          {gameStarted && obstacles.map(obstacle => (
            <div
              key={obstacle.id}
              data-obstacle-id={obstacle.id}
              className="absolute bottom-0 h-[40px] w-[40px]"
              style={{
                left: `${obstacle.x}px`
              }}
            >
              {obstacle.type === 'turntable' ? (
                <div className="animate-spin-slow">
                  <TurntableIcon />
                </div>
              ) : (
                <div className="animate-spin-slow">
                  <RecordIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="inset-0 z-50 flex items-center justify-center">
          <div className="bg-background/80 flex items-center justify-center backdrop-blur-sm inset-0 p-0 m-0">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Game Over!</h2>
              <p className="text-muted-foreground mb-2">Score: {score}</p>
              <p className="text-sm text-foreground">Press spacebar to play again</p>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .cloud {
          background: 
            radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px),
            radial-gradient(circle at 70% 50%, currentColor 1px, transparent 1px),
            radial-gradient(circle at 30% 50%, currentColor 1px, transparent 1px);
          color: var(--foreground);
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        :global(.animate-spin-slow) {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  )
}