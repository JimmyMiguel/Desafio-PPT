 import { arrayRoutes, router } from "./routes/router"
const app = document.querySelector("#app") as HTMLElement;
router(arrayRoutes, app);