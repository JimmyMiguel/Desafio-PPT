import "../component/piedraCom"
import "../component/papelCom"
import "../component/tijeraCom"
import { goTo } from "../main"


export const rooms = (): HTMLElement => {

    const conteiner = document.createElement('div');
    if (conteiner) {
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
            gap:260px;
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
            gap: 260px;
            align-content: center;
        }

            .bloque-1 {
            display: flex;
            flex-direction: column;
            align-content: flex-start;
            align-items: flex-start;
            margin-top:30px
        }
            .player-1, .player-2 {
                display: flex;
                flex-direction: row;
                align-items: center;
                align-content: center;
                justify-content: space-between;
                gap:10px;
        }
            .room-info{
            font-family: American Typewriter;
            font-weight: 600;
            font-size: 24px;
            }


    </style>

    <div class="body">

        <header class="game-hud">

            <div class="bloque-1">
                <div class="player-1">
                    <h3 class="player-name">Jimmy:</h3>
                    <span class="player-score">0</span>
                </div>

                <div class="player-2">
                    <h3 class="player-name">Miguel:</h3>
                    <span class="player-score">0</span>
                </div>
            </div>


            <div class="room-info">
                <span class="room-label">Sala</span>
                <span class="room-id">982739</span>
            </div>          
            
        </header>

        <section class="invite-section">
            <p class="invite-text">Compartí el código:</p>
            <h2 class="game-code"></h2>
            <p class="invite-subtext">Con tu contrincante</p>
        </section>

        <div class="manos">
            <piedra-com></piedra-com>
            <papel-com></papel-com>
            <tijera-com></tijera-com>
        </div>
    </div>
    `

        const botonJugar = conteiner.querySelector(".boton-jugar")
        botonJugar?.addEventListener("click", () => {
            goTo("/createAccaunt")

        })

    }
    return conteiner
}



