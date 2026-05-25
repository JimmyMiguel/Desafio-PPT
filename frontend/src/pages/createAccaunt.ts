import "../component/btnAzulCom"
import "../component/piedraCom"
import "../component/papelCom"
import "../component/tijeraCom"
import "../component/btnImputCom"
import { state } from "../core/state"
import { getShadowInput, onShadowBtn } from "../utils/dom"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const createAccaunt = (goTo: Function): HTMLElement => {
  const conteiner = document.createElement('div');
  if (conteiner) {
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
        margin-top: 35px;
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
            .btn-txt{
            font-family: Odibee Sans;
            font-weight: 400;
            font-size: 45px;
            color:rgba(0, 0, 0, 0):
            text-align: center;
            margin-bottom: -18px;
  
            }

    </style>

    <div class="body">

        <h1 class="title">Piedra <br> Papel <span>ó</span> <br> Tijera</h1>
        
        <div class="botones">
        <h1 class="btn-txt" >Tu Nombre</h1>
            <btn-input-com class="inputBtn"></btn-input-com>
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

  function onIngresarSala() {
    const name = getShadowInput(conteiner, ".inputBtn")
    if (!name) {
      alert("Escribí tu nombre para continuar")
      return
    }
    state.setState({ playerName: name })
    state.createRoom()
    const roomId = state.getState().roomId
    const url = `${API_BASE}/rooms`
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, name }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear la sala")
        goTo("/rooms")
      })
      .catch((e: unknown) => {
        console.error("Error crear sala:", e)
        const isNetworkError =
          e instanceof TypeError ||
          (e && typeof e === "object" && "message" in e && String((e as Error).message).toLowerCase().includes("fetch"))
        const msg = isNetworkError
          ? "No se pudo conectar con el backend. ¿Está corriendo? (en la carpeta backend: yarn dev). Abrí la app desde http://localhost:5173, no desde un archivo."
          : e instanceof Error ? e.message : "Error de red"
        alert("No se pudo crear la sala. " + msg)
      })
  }

  onShadowBtn(conteiner, ".boton-sala", onIngresarSala)

  return conteiner
}