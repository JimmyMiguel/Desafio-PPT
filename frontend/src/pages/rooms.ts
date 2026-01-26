import "../component/piedraCom"
import "../component/papelCom"
import "../component/tijeraCom"


export const rooms = (goTo:Function): HTMLElement => {

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
            gap: 200px;
            align-content: center;
            align-items:end;

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
                gap:20px;
        }
            .room-info{
                font-family: American Typewriter;
                font-weight: 600;
                font-size: 25px;
                display:flex;
                flex-direction: column;
                align-items:end;
                }
                .room-info .room-id{
                font-weight: 400;

                }
                .invite-section{
                display:flex;
                
                
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
                <h3 class="room-label"> Sala: </h3>
                <h3 class="room-id">982739 </h3>
            </div>          
            
        </header>

        <section class="invite-section">
            <p class="invite-text">Compartí el código:</p>
            <h2 class="game-code">982739</h2>
            <p class="invite-subtext">Con tu contrincante</p>
        </section>

        <div class="manos">
            <piedra-com></piedra-com>
            <papel-com></papel-com>
            <tijera-com></tijera-com>
        </div>
    </div>
    `

    }
    return conteiner
}



