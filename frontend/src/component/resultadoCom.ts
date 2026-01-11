class resultadoCom extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
        if(this.shadowRoot){
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            position: relative;  
            width: 300px;  
            height: 300px;
            font-weight: bold;
            color: white;    
          }
  
           svg {
            width: 100%;
            height: 100%;
            display: block;
          }
  
           path {
            fill: var(--resultadoCom, #6CB46C);  
            stroke: black;
            stroke-width: 10;
            transition: fill 0.3s ease; 
          }
  
           .content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            z-index: 1;
           }
          

        </style>
  
        <svg viewBox="0 0 363 362" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M206.486 62.1223L208.047 62.9729L209.795 62.6458L320.673 41.9446L299.972 152.823L299.646 154.571L300.496 156.132L354.447 255.187L242.599 269.762L240.835 269.992L239.614 271.283L162.078 353.202L113.654 251.333L112.891 249.728L111.285 248.964L9.41443 200.538L91.3344 123.004L92.6263 121.782L92.8558 120.019L107.431 8.17017L206.486 62.1223Z" />
        </svg>
  
        <div class="content">
          <slot></slot>
        </div>
      `;
    }}
  }
  
  customElements.define("resultado-com", resultadoCom);