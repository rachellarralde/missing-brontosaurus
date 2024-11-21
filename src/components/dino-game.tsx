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

const getObstacleType = (score: number): ObstacleType => {
  return score % 500 < 250 ? 'single' : 'turntable';
};

export default function Component() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(366)
  const [isJumping, setIsJumping] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const dinoRef = useRef<HTMLDivElement>(null)
  const obstacleRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const [obstacleType, setObstacleType] = useState<ObstacleType>('single')
  const [speed, setSpeed] = useState(2)
  const obstacleSpawnedRef = useRef(false);

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
    obstacleSpawnedRef.current = false;
  }, []);

  const jump = useCallback(() => {
    if (!isJumping && gameStarted && !gameOver) {
      setIsJumping(true)
      setTimeout(() => setIsJumping(false), 500)
    }
  }, [gameStarted, isJumping, gameOver]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      if (!gameStarted) {
        startGame();
      } else {
        jump();
      }
    }
  }, [gameStarted, jump, startGame]);

  useEffect(() => {
    const checkCollision = () => {
      if (dinoRef.current && obstacleRef.current) {
        const dinoRect = dinoRef.current.getBoundingClientRect()
        const obstacleRect = obstacleRef.current.getBoundingClientRect()

        const collisionThreshold = 10

        if (
          dinoRect.right - collisionThreshold > obstacleRect.left &&
          dinoRect.left + collisionThreshold < obstacleRect.right &&
          dinoRect.bottom - collisionThreshold > obstacleRect.top &&
          dinoRect.top + collisionThreshold < obstacleRect.bottom
        ) {
          setGameOver(true)
          setGameStarted(false)
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current)
          }
        }
      }
    }

    const gameLoop = () => {
      if (gameStarted && !gameOver) {
        checkCollision()

        if (obstacleRef.current) {
          const obstacleRect = obstacleRef.current.getBoundingClientRect();
          if (obstacleRect.right < 0) {
            obstacleSpawnedRef.current = false;
          }
        }

        if (!obstacleSpawnedRef.current) {
          const newType = getObstacleType(score);
          setObstacleType(newType);
          obstacleSpawnedRef.current = true;
        }

        setScore(prev => prev + 1);
      }
      frameRef.current = requestAnimationFrame(gameLoop)
    }

    window.addEventListener('keydown', handleKeyPress)
    if (gameStarted) {
      frameRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [gameStarted, gameOver, handleKeyPress, score])

  useEffect(() => {
    setSpeed(calculateSpeed(score))
    if (gameOver && score > highScore) {
      setHighScore(score)
    }
  }, [score, gameOver, highScore, calculateSpeed])

  return (
    /* container */
    <div className="relative h-full w-full min-h-300 bg-background justify-center p-4 font-mono">

      {/* game */}
      <div className="absolute inset-0 w-full h-full">
        <div className="text-center">
          <p className="text-sm text-foreground">Press the Spacebar to start the game and jump.</p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="text-right mb-4 font-mono text-foreground">
            <span className="mr-4">HI {highScore.toString().padStart(5, '0')}</span>
            <span>{score.toString().padStart(5, '0')}</span>
          </div>

          <div className="relative h-32 border-b border-dotted border-muted-foreground">
            {/* Background Clouds */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="cloud absolute top-4 right-20 w-12 h-4 opacity-10" />
              <div className="cloud absolute top-8 right-48 w-16 h-4 opacity-10" />
              <div className="cloud absolute top-6 left-32 w-12 h-4 opacity-10" />
            </div>

            {/* Dinosaur - Made Much Bigger */}
            <div
              ref={dinoRef}
              className={`absolute left-8 bottom-0 transition-transform duration-500 ${isJumping ? 'translate-y-[-80px]' : 'translate-y-0'
                }`}
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

            {/* Obstacle - Records or Turntable */}
            {gameStarted && (
              <div
                ref={obstacleRef}
                className="absolute right-[-40px] bottom-0 animate-obstacle h-[40px] w-[40px]"
                style={{
                  animationDuration: `${speed}s`,
                  willChange: 'transform'
                }}
              >
                {obstacleType === 'turntable' ? (
                  <div className="animate-spin-slow">
                    <TurntableIcon />
                  </div>
                ) : (
                  <div className="animate-spin-slow">
                    <RecordIcon />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0">
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
        @keyframes obstacle {
          from {
            right: -40px;
          }
          to {
            right: 100%;
          }
        }
        .animate-obstacle {
          animation: obstacle linear infinite;
          will-change: transform;
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