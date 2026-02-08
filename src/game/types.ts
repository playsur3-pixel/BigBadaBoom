// src/game/types.ts

// Types littéraux pour les tuiles
export type TileType = "empty" | "solid" | "breakable";

// Types littéraux pour les power-ups
export type PowerUpType = "range" | "extraBomb" | "fuseShorten";

export interface PowerUp {
  type: PowerUpType;
}

export interface Tile {
  type: TileType;
  powerUp?: PowerUp; // présent uniquement si mur cassable avec bonus
}

// Grille = tableau 2D de tuiles
export type Grid = Tile[][];
