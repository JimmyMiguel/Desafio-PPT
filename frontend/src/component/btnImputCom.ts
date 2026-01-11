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
            ::placeholder {
            color: #999;
            font-style: italic;
            font-weight: 400;
            font-size: 45px;
            line-height: 100%;
            letter-spacing: 5%;
            text-align: center;
 
            }

            .btn-input{
            border: rgba(0, 25, 151, 1) solid 10px;
            width: 364px;
            height: 84px;
            border-radius: 10px;
            box-sizing: border-box;  
            font-weight: 400;
            font-size: 45px;
            letter-spacing: 0.05em;  
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            color:rgb(0, 0, 0);
            }
            .btn-input::placeholder {
            color: rgba(217, 217, 217, 1);      
            font-style: italic;
            font-size: 0.5em;
            opacity: 1;     
            }
            </style>
            
            <input class="btn-input" type="text" placeholder="${textoPlaceholder}" />
            `
        }
    }
}

customElements.define("btn-input-com",btnInputCom)