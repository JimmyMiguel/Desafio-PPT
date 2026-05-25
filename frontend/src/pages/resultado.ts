import "../component/btnAzulCom"
import "../component/resultadoCom"
import { state } from "../core/state"
import { onShadowBtn } from "../utils/dom"

export const resultadoPage = (goTo: Function): HTMLElement => {
  const conteiner = document.createElement("div")
  const data = state.getState()
  const { ganadas, perdidas, empates } = state.getStats()

  const color =
    data.resultado === "Ganaste"
      ? "#6CB46C"
      : data.resultado === "Perdiste"
        ? "#E57373"
        : "#F5D547"

  conteiner.innerHTML = `
<style>
  @import url("https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap");
  .body {
    width: 315px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    font-family: American Typewriter, serif;
    text-align: center;
  }
  .resultado-txt {
    font-size: 42px;
    font-weight: bold;
    color: #009048;
  }
  .resumen {
    font-size: 22px;
    color: #333;
    line-height: 1.6;
  }
  .jugadas {
    font-size: 20px;
    color: #555;
  }
  .botones {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
</style>
<div class="body">
  <resultado-com style="--resultadoCom: ${color}">
    <span class="resultado-txt">${data.resultado || "—"}</span>
  </resultado-com>
  <p class="resumen">
    Ganados: <strong>${ganadas}</strong> ·
    Perdidos: <strong>${perdidas}</strong> ·
    Empates: <strong>${empates}</strong>
  </p>
  <p class="jugadas">Vos: ${data.miJugada} · Rival: ${data.rivalJugada}</p>
  <div class="botones">
    <btn-azul-com class="btn-otra">Jugar de nuevo</btn-azul-com>
    <btn-azul-com class="btn-stats">Ver mis partidos</btn-azul-com>
  </div>
</div>
  `

  onShadowBtn(conteiner, ".btn-otra", async () => {
    await state.resetRonda()
    goTo("/rooms")
  })
  onShadowBtn(conteiner, ".btn-stats", () => goTo("/estadisticas"))

  return conteiner
}
