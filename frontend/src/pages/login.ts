import "../component/btnAzulCom"
import "../component/piedraCom"
import "../component/papelCom"
import "../component/tijeraCom"
import "../component/btnImputCom"

export const login = (goTo:Function):HTMLElement=>{
    const conteiner = document.createElement('div');
    if(conteiner){
    conteiner.innerHTML = `
<style>
      @import url("https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap");

      .body {
        width: 315px;
        height: 100vh;         
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
      }
        span{
        color: rgba(0, 144, 72, 0.5)
        }

       .title {
        font-family:American Typewriter;
        font-size: 80px;
        font-weight: 700;
        font-size: 80px;
        font-weight: bold;
        color: #009048;
        text-align: left;
        margin-top: 70px;
        line-height: 0.9;
      }

       .manos {
        display: flex;
        flex-direction: row;
        gap: 40px;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      
        .botones {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40px;
            gap: 20px;
      }

    </style>

    <div class="body">

        <h1 class="title">Piedra <br> Papel <span>ó</span> <br> Tijera</h1>
        
        <div class="botones">
            <btn-input-com class="inputBtn" placeholder="código" ></btn-input-com>
            <btn-azul-com class="boton-sala">Ingresar a sala</btn-azul-com>
        </div>

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