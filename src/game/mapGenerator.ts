// src/game/mapGenerator.ts

import {
  GRID_WIDTH,
  GRID_HEIGHT,
  SPAWN_POINTS,
  SAFE_RADIUS,
  MAX_POWERUPS,
} from "./constants";
import type { Grid, Tile, PowerUpType } from "./types"; // <-- IMPORT TYPE

function createEmptyGrid(): Grid {
  const grid: Grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const line: Tile[] = [];
    for (let col = 0; col < GRID_WIDTH; col++) {
      line.push({ type: "empty" });
    }
    grid.push(line);
  }
  return grid;
}

function isInSafeZone(row: number, col: number): boolean {
  return SPAWN_POINTS.some((spawn) => {
    return (
      Math.abs(spawn.row - row) <= SAFE_RADIUS &&
      Math.abs(spawn.col - col) <= SAFE_RADIUS
    );
  });
}

function placeSolidWalls(grid: Grid): void {
  // Murs indestructibles en damier à l'intérieur (bordure jouable)
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      if (row % 2 === 1 && col % 2 === 1) {
        grid[row][col].type = "solid";
      }
    }
  }
}

export function generateMap(_seed?: number): Grid {
  // (seed sera utile plus tard pour du random déterministe)
  const grid = createEmptyGrid();

  placeSolidWalls(grid);

  const powerUpRemaining: Record<PowerUpType, number> = {
    range: MAX_POWERUPS.range,
    extraBomb: MAX_POWERUPS.extraBomb,
    fuseShorten: MAX_POWERUPS.fuseShorten,
  };

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const tile = grid[row][col];

      // On ne touche pas aux murs solides
      if (tile.type !== "empty") continue;

      // On laisse les zones de spawn libres
      if (isInSafeZone(row, col)) continue;

      // Proba de mettre un mur cassable
      const shouldPlaceBreakable = Math.random() < 0.6;
      if (!shouldPlaceBreakable) continue;

      tile.type = "breakable";

      // Proba d’avoir un power-up derrière ce mur
      const shouldHavePowerUp = Math.random() < 0.3;
      if (!shouldHavePowerUp) continue;

      const availableTypes = (Object.keys(
        powerUpRemaining
      ) as PowerUpType[]).filter((type) => powerUpRemaining[type] > 0);

      if (availableTypes.length === 0) continue;

      const randomIndex = Math.floor(Math.random() * availableTypes.length);
      const chosenType = availableTypes[randomIndex];

      tile.powerUp = { type: chosenType };
      powerUpRemaining[chosenType]--;
    }
  }

  return grid;
}
