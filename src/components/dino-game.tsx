'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image'

const RecordIcon = () => (
  <svg 
    width="32" 
    height="32" 
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

type ObstacleType = 'single' | 'stacked' | 'turntable';

const getObstacleType = (score: number): ObstacleType => {
  const cycle = score % 750;
  if (cycle < 250) return 'single';
  if (cycle < 500) return 'stacked';
  return 'turntable';
};

export default function Component() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(366)
  const [isJumping, setIsJumping] = useState(false)
  const [isDucking, setIsDucking] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const dinoRef = useRef<HTMLDivElement>(null)
  const obstacleRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const [obstacleType, setObstacleType] = useState<ObstacleType>('single')
  const [speed, setSpeed] = useState(2)

  const calculateSpeed = (currentScore: number): number => {
    if (currentScore < 500) return 2;
    if (currentScore < 1000) return 1.7;
    if (currentScore < 1500) return 1.4;
    if (currentScore < 2000) return 1.2;
    return Math.max(1, 2 - (currentScore / 2500));
  }

  const jump = () => {
    if (!isJumping && gameStarted && !gameOver) {
      setIsJumping(true)
      setTimeout(() => setIsJumping(false), 500)
    }
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      if (!gameStarted) {
        startGame();
      } else {
        jump();
      }
    } else if (event.code === 'ArrowDown') {
      event.preventDefault();
      setIsDucking(true);
    }
  }, [gameStarted, gameOver, startGame, jump]);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'ArrowDown') {
      setIsDucking(false)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setSpeed(2)
  }

  useEffect(() => {
    const checkCollision = () => {
      if (dinoRef.current && obstacleRef.current) {
        const dinoRect = dinoRef.current.getBoundingClientRect()
        const obstacleRect = obstacleRef.current.getBoundingClientRect()

        if (
          dinoRect.right > obstacleRect.left &&
          dinoRect.left < obstacleRect.right &&
          dinoRect.bottom > obstacleRect.top &&
          dinoRect.top < obstacleRect.bottom
        ) {
          setGameOver(true)
          setGameStarted(false)
        }
      }
    }

    const gameLoop = () => {
      if (gameStarted && !gameOver) {
        checkCollision()
        setScore(prev => {
          const newScore = prev + 1;
          setObstacleType(getObstacleType(newScore));
          return newScore;
        })
      }
      frameRef.current = requestAnimationFrame(gameLoop)
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyUp)
    if (gameStarted) {
      frameRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('keyup', handleKeyUp)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [gameStarted, gameOver])

  useEffect(() => {
    setSpeed(calculateSpeed(score))
    if (gameOver && score > highScore) {
      setHighScore(score)
    }
  }, [score, gameOver, highScore])

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background flex flex-col items-center justify-center p-4 font-mono">
      {/* Hero Title */}
      {/* <div className="absolute top-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Missing Brontosaurus</h1>
        <p className="text-muted-foreground text-sm">Record label</p>
      </div> */}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-card p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Game Over!</h2>
            <p className="text-muted-foreground mb-2">Score: {score}</p>
            <p className="text-sm text-foreground">Press spacebar to play again</p>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <p className="text-sm mb-8 text-foreground">Space to start the game online and jump, use down arrow (↓) to duck.</p>
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
            className={`absolute left-8 bottom-0 transition-transform duration-500 ${
              isJumping ? 'translate-y-[-80px]' : 'translate-y-0'
            }`}
          >
            <Image
              src="/image.png"
              alt="Dinosaur"
              width={100}
              height={isDucking ? 60 : 120}
              className={`object-contain ${isDucking ? 'scale-y-50' : ''}`}
              priority
            />
          </div>

          {/* Obstacle - Records or Turntable */}
          {gameStarted && (
            <div
              ref={obstacleRef}
              className="absolute bottom-0 right-0 animate-obstacle"
              style={{
                animationDuration: `${speed}s`
              }}
            >
              <div className="relative">
                {obstacleType === 'stacked' ? (
                  <>
                    <div className="absolute bottom-8 animate-spin-slow">
                      <RecordIcon />
                    </div>
                    <div className="absolute bottom-0 animate-spin-slow">
                      <RecordIcon />
                    </div>
                  </>
                ) : obstacleType === 'turntable' ? (
                  <div className="animate-spin-slow">
                    <TurntableIcon />
                  </div>
                ) : (
                  <div className="animate-spin-slow">
                    <RecordIcon />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

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
            right: -50px;
          }
          to {
            right: 100%;
          }
        }
        .animate-obstacle {
          animation: obstacle linear infinite;
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