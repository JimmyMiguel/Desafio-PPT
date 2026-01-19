import "../src/routes/router"
import { arrayRoutes, router } from "../src/routes/router"


function main() {
    const app = document.querySelector("#app") as HTMLElement
    if(!app === null){
        router(arrayRoutes,app)
    }
 
}
main()