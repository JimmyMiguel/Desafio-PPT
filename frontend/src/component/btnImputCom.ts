export class btnInputCom extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })    
    }

    connectedCallback(){
        this.render()
    }


    render() {
        if (this.shadowRoot) {

            const textoPlaceholder = this.getAttribute('placeholder') || '';

            this.shadowRoot.innerHTML = `
            <style>

            .btn-input{
            border: rgba(0, 25, 151, 1) solid 10px;
            width: 322px;
            height: 80px;
            border-radius: 10px;
            box-sizing: border-box;  
            font-weight: 600;
            font-size: 45px;
            letter-spacing: 0.05em;  
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            color:rgba(0, 144, 72, 1);
            }
            .btn-input::placeholder {
            color: rgba(217, 217, 217, 1);      
            font-style: bold;
            font-size: 0.9rem;
            opacity: 1;    
            font-size: 45px;
            font-weight: 400;
            font-family: Odibee Sans;
 
            }
             
            </style>
            
            <input class="btn-input" type="text" placeholder="${textoPlaceholder}" />
             `
        }
    }
}

customElements.define("btn-input-com",btnInputCom)