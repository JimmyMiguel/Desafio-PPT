import "../src/pages/inicioPage"
import "../src/pages/login"
import { inicioPages } from "../src/pages/inicioPage"
import { login } from "../src/pages/login"


function main() {
    const app = document.querySelector("#app")
    const inicio = login()
    if(app){

        app.appendChild(inicio)
        
        }

}
main()