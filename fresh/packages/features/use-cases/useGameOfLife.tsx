/** @jsx h */
import { useEffect, useState } from "preact/hooks";
import { GameBoard } from "~features/services/game-of-life.ts";
import { Board, Position } from "../entities/game-of-life.ts";

export function useGameOfLife(width: number, height: number) {
  const game = GameBoard.getInstance(width, height);
  const [isRunning, setIsRunning] = useState(game.isRunning);
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    const subID = "gol-hook-id";
    game.subscribe(subID, setBoard);
  }, []);

  return {
    board,
    isRunning,
    generation: game.generation,
    playPause: () => {
      // TODO: sync with game isRunning state
      setIsRunning((running) => !running);
      game.isRunning ? game.stopTicker() : game.startGame();
    },
    next: () => game.next(),
    cleanup: () => game.cleanup(),
    restart: () => game.restart(),
    toggle: (pos: Position) => game.toggleLife(pos),
  };
}
