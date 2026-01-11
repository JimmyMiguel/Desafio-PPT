class timeCom extends HTMLElement {
     private timeLeft: number;
    private interval: number | null;  
    private radius: number;
    private circumference: number;
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.timeLeft = 5;
      this.interval = null;
      this.radius = 40;
      this.circumference = 2 * Math.PI * this.radius;  
    }
  
    connectedCallback(): void {
      this.render();
      this.startTimer();
    }
  
    disconnectedCallback(): void {
       if (this.interval) {
        window.clearInterval(this.interval);
      }
    }
  
    startTimer(): void {
       this.timeLeft = 5;
      if (this.interval) {
        window.clearInterval(this.interval);
      }
  
       const numberEl = this.shadowRoot?.querySelector('.number') as HTMLElement;
      const circleEl = this.shadowRoot?.querySelector('.progress-ring__circle') as SVGCircleElement;
  
       if (!numberEl || !circleEl) return;
  
       const parent = circleEl.parentNode;
      if (parent) {
          const newCircle = circleEl.cloneNode(true) as SVGCircleElement;
          parent.replaceChild(newCircle, circleEl);
      }
  
       numberEl.textContent = this.timeLeft.toString();
  
       this.interval = window.setInterval(() => {
        this.timeLeft--;
        
         if (numberEl) {
            numberEl.textContent = this.timeLeft.toString();
        }
  
        if (this.timeLeft <= 0) {
          if (this.interval) window.clearInterval(this.interval);
          
           this.dispatchEvent(new CustomEvent('time-up', {
            bubbles: true,
            composed: true
          }));
        }
      }, 1000);
    }
  
    render(): void {
      if (!this.shadowRoot) return;
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            position: relative;
            width: 100px;
            height: 100px;
            font-family: sans-serif;
          }
  
          .container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          /* SVG Transformación para que empiece arriba */
          svg {
            transform: rotate(-90deg);
            width: 100%;
            height: 100%;
          }
  
          /* Círculo de fondo (gris claro) */
          .track {
            fill: none;
            stroke: #e0e0e0;
            stroke-width: 8;
          }
  
          /* Círculo de progreso animado */
          .progress-ring__circle {
            fill: none;
            stroke: var(--timer-color, #000);
            stroke-width: 8;
            stroke-linecap: round;
            stroke-dasharray: ${this.circumference};
            stroke-dashoffset: 0;
            /* La animación dura 5 segundos, lineal */
            animation: countdown 5s linear forwards;
          }
  
          /* El número en el centro */
          .number {
            position: absolute;
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--timer-color, #000);
          }
  
          @keyframes countdown {
            to {
              stroke-dashoffset: ${this.circumference};
            }
          }
        </style>
  
        <div class="container">
          <svg>
            <circle class="track" cx="50" cy="50" r="${this.radius}"></circle>
            <circle class="progress-ring__circle" cx="50" cy="50" r="${this.radius}"></circle>
          </svg>
          <div class="number">${this.timeLeft}</div>
        </div>
      `;
    }
  }
  
  customElements.define("time-com", timeCom);