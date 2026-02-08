export const TILE_SIZE = 64; // taille d'une case en pixels

export const GRID_WIDTH = 11;   // 11x11 jouable
export const GRID_HEIGHT = 11;

// joueurs dans chaque coin de la grille jouable
export const SPAWN_POINTS = [
  { row: 0, col: 0 },                         // haut gauche
  { row: 0, col: GRID_WIDTH - 1 },           // haut droit
  { row: GRID_HEIGHT - 1, col: 0 },          // bas gauche
  { row: GRID_HEIGHT - 1, col: GRID_WIDTH - 1 }, // bas droit
];

// zone "safe" autour des spawns (pas de mur cassable ici)
export const SAFE_RADIUS = 3;

// anneau décoratif autour du terrain (en pixels)
export const BORDER_THICKNESS = 24;

// limites globales de power-ups par partie
export const MAX_POWERUPS = {
  range: 6,
  extraBomb: 6,
  fuseShorten: 4,
};

// Taille totale du board (canvas) en pixels
export const BOARD_PIXEL_SIZE =
  GRID_WIDTH * TILE_SIZE + BORDER_THICKNESS * 2;
