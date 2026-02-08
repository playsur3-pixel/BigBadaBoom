import { useState } from "react";
import GameCanvas from "./game/GameCanvas";
import { BOARD_PIXEL_SIZE } from "./game/constants";
import "./App.css";
import LogoBig from "./assets/LogoTitre_Big_Badaboom.png";

type ScreenMode = "home" | "lobby" | "ingame";

function App() {
  const [mode, setMode] = useState<ScreenMode>("home"); // on démarre sur HOME
  const currentRound = 3;
  const formattedTime = "01:12";
  return (
    <div className="page">
      {/* Petit panneau DEV pour changer de vue sans casser le layout */}
      <div className="mode-switcher">
        <button onClick={() => setMode("home")}>Home</button>
        <button onClick={() => setMode("lobby")}>Lobby</button>
        <button onClick={() => setMode("ingame")}>Ingame</button>
      </div>

      {/* HUD central */}
      <header className="hud">

        {mode === "lobby" && (
          <>
            <div className="hud-title">CODE :</div>
            <button className="hud-button">COPIER LE LIEN</button>
          </>
        )}

        {mode === "ingame" && (
          <div className="hud-ingame">
            <div className="hud-row">
              <span className="hud-label">ROUND :</span>
              <span className="hud-value">{currentRound}</span>
            </div>
            <div className="hud-row">
              <span className="hud-label">TIMER :</span>
              <span className="hud-timer">{formattedTime}</span>
            </div>
          </div>
        )}
      </header>

      {/* Zone centrale : board + overlays */}
      <main className="board-shell">
        <div
          className="board-frame"
          style={{
            width: BOARD_PIXEL_SIZE,
            height: BOARD_PIXEL_SIZE,
          }}
        >
          {/* Canvas */}
          <GameCanvas />

          {/* Overlays selon le mode */}

          {mode === "home" && (
            <>
              <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
                <img
                  src={LogoBig}
                  alt="Big Bada Boom"
                  className="w-[60%] max-w-[480px] opacity-0 animate-logoDrop relative top-10"
                />
              </div>
                            <button
                className="absolute left-1/2 bottom-10 -translate-x-1/2 px-10 py-3 rounded-full border-4 border-black bg-red-500 text-white font-extrabold text-base cursor-pointer opacity-0 animate-buttonFadeIn"
              >
                CRÉER UNE ROOM
              </button>
            </>
            )}


          {mode === "lobby" && (
            <>
              <div className="overlay-logo-small">BIG BADA BOOM</div>
              <div className="overlay-lobby-panel">
                <div className="overlay-lobby-title">Joueurs :</div>
                <div className="overlay-lobby-list">
                  Liste des 4 joueurs connectés au lobby
                </div>
              </div>
              <button className="overlay-main-button">
                LANCER LA PARTIE
              </button>
            </>
          )}

          {mode === "ingame" && (
            <>
              <div className="player-hud player-hud--p1">
                <div>PLAYER 1</div>
                <div>0 pts</div>
              </div>

              <div className="player-hud player-hud--p2">
                <div>PLAYER 2</div>
                <div>0 pts</div>
              </div>

              <div className="player-hud player-hud--p3">
                <div>PLAYER 3</div>
                <div>0 pts</div>
              </div>

              <div className="player-hud player-hud--p4">
                <div>PLAYER 4</div>
                <div>0 pts</div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
