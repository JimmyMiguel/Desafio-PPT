import "../component/piedraCom"
import "../component/papelCom"
import "../component/tijeraCom"
import { state } from "../core/state"

const MOVES: { tag: string; jugada: "Piedra" | "Papel" | "Tijera" }[] = [
  { tag: "piedra-com", jugada: "Piedra" },
  { tag: "papel-com", jugada: "Papel" },
  { tag: "tijera-com", jugada: "Tijera" },
]

export const rooms = (goTo: Function): HTMLElement => {
  const conteiner = document.createElement("div")
  const s = state.getState()
  const codigoCorto = s.roomId ? s.roomId.slice(0, 8) : "—"
  const yo = s.playerName || "Vos"
  const rival = s.rivalName || "Esperando..."

  conteiner.innerHTML = `
<style>
      @import url("https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap");

        .body {
            width: 630px;
            height: 100vh;         
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            align-items: center;
            gap: 80px;
        }
        
        .game-hud {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            box-sizing: border-box;
            align-items: center;
            font-family: American Typewriter;
            font-weight: 600;
            font-size: 24px;
            gap: 80px;
            align-items: end;
            width: 100%;
            padding: 0 20px;
        }

        .bloque-1 {
            display: flex;
            flex-direction: column;
            margin-top: 30px;
        }
        .player-1, .player-2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            font-size: 24px;
        }
        .room-info {
            font-family: American Typewriter;
            font-weight: 600;
            font-size: 25px;
            display: flex;
            flex-direction: column;
            align-items: end;
        }
        .room-info .room-id {
            font-weight: 400;
            word-break: break-all;
            max-width: 200px;
            text-align: right;
        }
        .invite-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
            font-size: 35px;
            font-family: American Typewriter;
            text-align: center;
        }
        .play-section {
            display: none;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            font-family: American Typewriter;
            font-size: 28px;
        }
        .manos {
            display: flex;
            gap: 40px;
            cursor: pointer;
        }
        .manos.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
        .estado-rival {
            font-size: 22px;
            color: #009048;
        }
</style>

    <div class="body">
        <header class="game-hud">
            <div class="bloque-1">
                <div class="player-1">
                    <h3 class="nombre-yo">${yo}:</h3>
                    <span class="score-yo">${s.ganadas}</span>
                </div>
                <div class="player-2">
                    <h3 class="nombre-rival">${rival}:</h3>
                    <span class="score-rival">—</span>
                </div>
            </div>
            <div class="room-info">
                <h3 class="room-label">Sala:</h3>
                <h3 class="room-id">${codigoCorto}</h3>
            </div>          
        </header>

        <section class="invite-section">
            <p class="invite-text">Compartí el código:</p>
            <h2 class="game-code">${s.roomId || codigoCorto}</h2>
            <p class="invite-subtext">Con tu contrincante</p>
            <p class="estado-rival"></p>
        </section>

        <section class="play-section">
            <p class="msg-jugar">Elegí tu jugada</p>
            <div class="manos">
                <piedra-com></piedra-com>
                <papel-com></papel-com>
                <tijera-com></tijera-com>
            </div>
        </section>
    </div>
    `

  const invite = conteiner.querySelector(".invite-section") as HTMLElement
  const play = conteiner.querySelector(".play-section") as HTMLElement
  const manos = conteiner.querySelector(".manos") as HTMLElement
  const estadoRival = conteiner.querySelector(".estado-rival") as HTMLElement

  function actualizarUI(data: ReturnType<typeof state.getState>) {
    const yoEl = conteiner.querySelector(".nombre-yo") as HTMLElement
    const rivalEl = conteiner.querySelector(".nombre-rival") as HTMLElement
    const scoreYo = conteiner.querySelector(".score-yo") as HTMLElement
    const codeEl = conteiner.querySelector(".game-code") as HTMLElement
    const roomIdEl = conteiner.querySelector(".room-id") as HTMLElement

    if (yoEl) yoEl.textContent = `${data.playerName || "Vos"}:`
    if (rivalEl) rivalEl.textContent = `${data.rivalName || "Esperando..."}:`
    if (scoreYo) scoreYo.textContent = String(data.ganadas)
    if (codeEl) codeEl.textContent = data.roomId || "—"
    if (roomIdEl) roomIdEl.textContent = data.roomId ? data.roomId.slice(0, 8) : "—"

    if (data.connection) {
      invite.style.display = "none"
      play.style.display = "flex"
      if (estadoRival) estadoRival.textContent = ""
      if (manos) manos.classList.toggle("disabled", data.miJugada !== "")
    } else {
      invite.style.display = "flex"
      play.style.display = "none"
      if (estadoRival) estadoRival.textContent = "Esperando al rival..."
    }

    if (data.resultado && window.location.pathname === "/rooms") {
      goTo("/resultado")
    }
  }

  MOVES.forEach(({ tag, jugada }) => {
    conteiner.querySelector(tag)?.addEventListener("click", () => {
      if (!state.getState().connection) return
      state.setMove(jugada)
      manos?.classList.add("disabled")
    })
  })

  state.subscribe(actualizarUI)
  actualizarUI(state.getState())

  return conteiner
}
