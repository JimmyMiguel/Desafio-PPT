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
                 .btn {
                    background-color: rgba(0, 108, 252, 1);
                    border: rgba(0, 25, 151, 1) solid 10px;
                    width: 322px;
                    height: 80px;
                    border-radius: 10px;
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
                
                /* 3. No usar comas después de cerrar llaves '}' */
            </style>

            <div class="btn">
                <slot></slot>
            </div>
            `;
        }
    }
}

customElements.define('btn-azul-com', BtnAzulCom);