// src/game/GameCanvas.tsx

import React, { useEffect, useRef } from "react";
import {
  TILE_SIZE,
  GRID_WIDTH,
  GRID_HEIGHT,
  BORDER_THICKNESS,
} from "./constants";
import { generateMap } from "./mapGenerator";
import type { Grid } from "./types"; // <-- ICI : import type

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const playWidth = GRID_WIDTH * TILE_SIZE;
    const playHeight = GRID_HEIGHT * TILE_SIZE;

    // canvas = zone jouable + anneau décor
    canvas.width = playWidth + BORDER_THICKNESS * 2;
    canvas.height = playHeight + BORDER_THICKNESS * 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grid: Grid = generateMap();

    // 1) fond global
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2) anneau extérieur "bedrock"
    ctx.fillStyle = "#222222";

    // haut
    ctx.fillRect(0, 0, canvas.width, BORDER_THICKNESS);
    // bas
    ctx.fillRect(
      0,
      canvas.height - BORDER_THICKNESS,
      canvas.width,
      BORDER_THICKNESS
    );
    // gauche
    ctx.fillRect(
      0,
      BORDER_THICKNESS,
      BORDER_THICKNESS,
      playHeight
    );
    // droite
    ctx.fillRect(
      canvas.width - BORDER_THICKNESS,
      BORDER_THICKNESS,
      BORDER_THICKNESS,
      playHeight
    );

    // 3) zone jouable (offset)
    const offsetX = BORDER_THICKNESS;
    const offsetY = BORDER_THICKNESS;

    for (let row = 0; row < GRID_HEIGHT; row++) {
      for (let col = 0; col < GRID_WIDTH; col++) {
        const tile = grid[row][col];

        // fond case
        ctx.fillStyle = "#2b2b2b";
        ctx.fillRect(
          offsetX + col * TILE_SIZE,
          offsetY + row * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );

        // contenu de case : solide / cassable / sol
        if (tile.type === "solid") {
          ctx.fillStyle = "#555555"; // indestructible
        } else if (tile.type === "breakable") {
          ctx.fillStyle = "#a36b3f"; // cassable
        } else {
          ctx.fillStyle = "#3d3d3d"; // sol
        }

        ctx.fillRect(
          offsetX + col * TILE_SIZE + 4,
          offsetY + row * TILE_SIZE + 4,
          TILE_SIZE - 8,
          TILE_SIZE - 8
        );

        // power-up éventuel
        if (tile.type === "breakable" && tile.powerUp) {
          if (tile.powerUp.type === "range") {
            ctx.fillStyle = "#ffcc00";
          } else if (tile.powerUp.type === "extraBomb") {
            ctx.fillStyle = "#00ccff";
          } else if (tile.powerUp.type === "fuseShorten") {
            ctx.fillStyle = "#ff66aa";
          }

          ctx.beginPath();
          ctx.arc(
            offsetX + col * TILE_SIZE + TILE_SIZE / 2,
            offsetY + row * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE / 6,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default GameCanvas;
