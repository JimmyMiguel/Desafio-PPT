 import { createAccaunt } from "../pages/createAccaunt";
import { inicioPages } from "../pages/inicioPage";
import { login } from "../pages/login";
import { rooms } from "../pages/rooms";
 

type Route = {
    path: string;
    view: (goTo:Function) => HTMLElement;
};

export const arrayRoutes: Route[] = [
    {
        path: "/home",
        view: inicioPages
    },
    {
        path: "/",
        view: inicioPages
    },
    {
        path: "/login",
        view: login
    },
    {
        path:"/createAccaunt",
        view: createAccaunt
    },
    {
        path:"/rooms",
        view: rooms
    }

]

export function router(routes: Route[], container: HTMLElement) {

    function gotTo(path: string) {
        window.history.pushState({}, "", path)
        render()
    }

    function render() {
        const rutaNavegador = window.location.pathname
        const newPath = routes.find((x) => x.path === rutaNavegador)

        if (newPath) {
            container.innerHTML = ""
            container.appendChild(newPath.view(gotTo))

        }
        else {
             const error =  document.createElement("h2")
             container.innerHTML = ""
             error.innerText="Error 404, no se encuentra la ruta"
             container.appendChild(error)
            
        }
    }


    function navigation() {
        window.addEventListener('popstate', render)
    }



    render()
    navigation()



}