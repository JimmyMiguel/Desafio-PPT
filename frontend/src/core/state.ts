import { v4 as uuidv4 } from 'uuid';
import { rtdb } from '../db';
import { ref, set, onValue } from 'firebase/database'

type Jugada = "Piedra" | "Papel" | "Tijera" | ""

type gameState = {
    miJugada: Jugada,
    rivalJugada: Jugada,
    roomId: string,
    roomRtdb: string,
    whoAmI: "player1" | "player2" | "",
    connection: boolean,
    ganadas: number,
    perdidas: number,
    empates: number,
    resultado: string,
    playerName: string,
    rivalName: string,
}

function loadStats(): Pick<gameState, "ganadas" | "perdidas" | "empates"> {
    const saved = localStorage.getItem("ppt-stats")
    if (saved) {
        const s = JSON.parse(saved)
        return {
            ganadas: s.ganadas ?? 0,
            perdidas: s.perdidas ?? 0,
            empates: s.empates ?? 0,
        }
    }
    const old = localStorage.getItem("score-juego")
    return { ganadas: old ? parseInt(old) : 0, perdidas: 0, empates: 0 }
}

function saveStats(ganadas: number, perdidas: number, empates: number) {
    localStorage.setItem("ppt-stats", JSON.stringify({ ganadas, perdidas, empates }))
}

export class State {
    private data: gameState
    private listeners: ((data: gameState) => void)[] = []
    private lastRoundKey = ""
    private isListening = false

    constructor(roomInicial: string) {
        const stats = loadStats()
        this.data = {
            miJugada: "",
            rivalJugada: "",
            roomId: roomInicial,
            connection: false,
            whoAmI: "",
            ...stats,
            roomRtdb: "",
            resultado: "",
            playerName: "",
            rivalName: "",
        }
    }

    getState() {
        return this.data
    }

    getStats() {
        const { ganadas, perdidas, empates } = this.data
        return {
            ganadas,
            perdidas,
            empates,
            total: ganadas + perdidas + empates,
        }
    }

    setState(data: Partial<gameState>) {
        const dataActual = this.getState()
        const dataNueva = { ...dataActual, ...data }
        this.data = dataNueva
        for (const cb of this.listeners) {
            cb(this.data)
        }

        if (
            data.ganadas !== undefined ||
            data.perdidas !== undefined ||
            data.empates !== undefined
        ) {
            saveStats(this.data.ganadas, this.data.perdidas, this.data.empates)
        }
    }

    subscribe(callback: (data: gameState) => void) {
        this.listeners.push(callback)
    }

    setMove(miJugada: Jugada) {
        const nowData = this.getState()
        if (!nowData.whoAmI) return

        this.setState({ miJugada })
        const ruta = `/rooms/${nowData.roomRtdb}/${nowData.whoAmI}/choice`
        set(ref(rtdb, ruta), miJugada)
    }

    createRoom() {
        const roomId: string = uuidv4();
        const nombre = this.getState().playerName || "Jugador 1"
        set(ref(rtdb, "/rooms/" + roomId), {
            player1: {
                choice: "",
                online: true,
                start: true,
                name: nombre,
            },
            player2: {
                choice: "",
                online: false,
                start: false,
                name: "",
            }
        })
        this.setState({
            roomId,
            roomRtdb: roomId,
            whoAmI: "player1",
            connection: false,
        })
        this.listenRoom()
    }

    joinRoom(roomId: string) {
        const nombre = this.getState().playerName || "Jugador 2"
        set(ref(rtdb, "/rooms/" + roomId + "/player2"), {
            choice: "",
            online: true,
            start: true,
            name: nombre,
        })

        this.setState({
            roomId,
            roomRtdb: roomId,
            whoAmI: "player2",
            connection: true,
        })

        this.listenRoom()
    }

    listenRoom() {
        if (this.isListening) return
        this.isListening = true

        const roomRef = ref(rtdb, "/rooms/" + this.getState().roomRtdb)

        onValue(roomRef, (snapshot) => {
            const serverData = snapshot.val()
            if (!serverData) return

            const roomActual = this.getState()
            const player1 = serverData.player1 || {}
            const player2 = serverData.player2 || {}

            let moveRival: Jugada = ""
            let movemio: Jugada = ""
            let onlinRival = false
            let rivalName = ""

            if (roomActual.whoAmI === "player1") {
                moveRival = player2.choice || ""
                movemio = player1.choice || ""
                onlinRival = !!player2.online
                rivalName = player2.name || ""
            } else {
                moveRival = player1.choice || ""
                movemio = player2.choice || ""
                onlinRival = !!player1.online
                rivalName = player1.name || ""
            }

            this.setState({
                miJugada: movemio,
                rivalJugada: moveRival,
                connection: onlinRival,
                rivalName,
            })

            if (moveRival !== "" && movemio !== "") {
                this.calcWinner(movemio, moveRival)
            }
        })
    }

    calcWinner(miJugada: Jugada, rivalJugada: Jugada) {
        const key = `${miJugada}-${rivalJugada}`
        if (this.lastRoundKey === key) return
        this.lastRoundKey = key

        const s = this.getState()

        if (miJugada === rivalJugada) {
            this.setState({ empates: s.empates + 1, resultado: "Empate" })
            return
        }

        const gane =
            (miJugada === "Piedra" && rivalJugada === "Tijera") ||
            (miJugada === "Papel" && rivalJugada === "Piedra") ||
            (miJugada === "Tijera" && rivalJugada === "Papel")

        if (gane) {
            this.setState({ ganadas: s.ganadas + 1, resultado: "Ganaste" })
        } else {
            this.setState({ perdidas: s.perdidas + 1, resultado: "Perdiste" })
        }
    }

    async resetRonda() {
        const d = this.getState()
        if (!d.roomRtdb) return
        this.lastRoundKey = ""
        await set(ref(rtdb, `/rooms/${d.roomRtdb}/player1/choice`), "")
        await set(ref(rtdb, `/rooms/${d.roomRtdb}/player2/choice`), "")
        this.setState({ miJugada: "", rivalJugada: "", resultado: "" })
    }
}

export const state = new State("");
