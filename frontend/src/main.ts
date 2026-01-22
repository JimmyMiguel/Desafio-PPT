import "../src/routes/router"
import { arrayRoutes, router } from "../src/routes/router"
const app = document.querySelector("#app") as HTMLElement
export const goTo = router(arrayRoutes, app)
