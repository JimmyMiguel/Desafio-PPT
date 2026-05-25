import "../component/btnAzulCom"
import { state } from "../core/state"
import { onShadowBtn } from "../utils/dom"

export const estadisticasPage = (goTo: Function): HTMLElement => {
  const conteiner = document.createElement("div")
  const { ganadas, perdidas, empates, total } = state.getStats()

  conteiner.innerHTML = `
<style>
  @import url("https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap");
  .body {
    width: 315px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .title {
    font-family: American Typewriter, serif;
    font-size: 48px;
    font-weight: bold;
    color: #009048;
    margin-top: 50px;
    line-height: 1.1;
  }
  .stats {
    display: flex;
    flex-direction: column;
    gap: 28px;
    font-family: American Typewriter, serif;
    font-size: 32px;
    margin: 40px 0;
  }
  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-radius: 10px;
    background: rgba(255,255,255,0.6);
  }
  .stat-row.ganadas { color: #009048; }
  .stat-row.perdidas { color: #c62828; }
  .stat-row.empates { color: #e6a800; }
  .stat-row.total { font-weight: bold; color: #000; }
  .botones {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    margin-bottom: 40px;
  }
</style>
<div class="body">
  <h1 class="title">Mis<br>partidos</h1>
  <div class="stats">
    <div class="stat-row ganadas">
      <span>Ganados</span>
      <strong>${ganadas}</strong>
    </div>
    <div class="stat-row perdidas">
      <span>Perdidos</span>
      <strong>${perdidas}</strong>
    </div>
    <div class="stat-row empates">
      <span>Empates</span>
      <strong>${empates}</strong>
    </div>
    <div class="stat-row total">
      <span>Total jugados</span>
      <strong>${total}</strong>
    </div>
  </div>
  <div class="botones">
    <btn-azul-com class="btn-inicio">Volver al inicio</btn-azul-com>
  </div>
</div>
  `

  onShadowBtn(conteiner, ".btn-inicio", () => goTo("/"))

  return conteiner
}
