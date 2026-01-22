export class BtnAzulCom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
            @import url("https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap");

                 .btn {
                    background-color: rgba(0, 108, 252, 1);
                    border: rgba(0, 25, 151, 1) solid 10px;
                    width: 322px;
                    height: 80px;
                    border-radius: 10px;
                    font-family: "Odibee Sans", cursive;
                    box-sizing: border-box;  
                    font-weight: 400;
                    font-size: 45px;
                    letter-spacing: 0.05em;  
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;  
                 }

                .btn:hover {
                     transform: scale(1.01); 

                }

                .btn:active {
                     transform: scale(0.98); 
                    background-color: rgb(4, 95, 214);
                }
                
             </style>

            <button class="btn">
            <slot></slot>
            </button>
            
            `;
        }
    }
}

customElements.define('btn-azul-com', BtnAzulCom);