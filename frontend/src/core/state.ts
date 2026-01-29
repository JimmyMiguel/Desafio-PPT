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
    connection: true | false,
    puntaje: number,
    resultado:string
}



export class State {
    private data: gameState
    private listeners: ((data: gameState) => void)[] = []


    constructor(roomInicial: string) {
        const storage = localStorage.getItem("score-juego")

        const scoreIinicial = storage ? parseInt(storage) : 0

        this.data = {
            miJugada: "",
            rivalJugada: "",
            roomId: roomInicial,
            connection: false,
            whoAmI: "",
            puntaje: scoreIinicial,
            roomRtdb: "",
            resultado:""
        }

    }

    getState() {
        return this.data
    }

    setState(data: Partial<gameState>) {
        const dataActual = this.getState()
        const dataNueva = { ...dataActual, ...data }
        this.data = dataNueva
        for (const cb of this.listeners) {
            cb(this.data)

        }

        if (data.puntaje !== undefined) {
            localStorage.setItem("score-juego", data.puntaje.toString())
        }
    }

    subscribe(callback: (data: gameState) => void) {

        this.listeners.push(callback)
    }

    setMove(miJugada:Jugada) {

        const nowData = this.getState()
        if(!nowData.whoAmI) return

        this.setState({miJugada:miJugada})
        const ruta = `/rooms/${nowData.roomRtdb}/${nowData.whoAmI}/choice`


        const moveRef = ref(rtdb, ruta)
        set(moveRef, miJugada)
    }

    createRoom() {
        const roomId: string = uuidv4();
        const roomRef = ref(rtdb, "/rooms/" + roomId)
        set(roomRef, {
            player1: {
                choice: "",
                online: true,
                start: true
            },
            player2: {
                choice: "",
                online: false,
                start: false
            }
        })
        this.setState({
            roomId: roomId,
            roomRtdb: roomId,
            whoAmI: "player1",
            connection: true
        })
        this.listenRoom()
    }


    joinRoom(roomId: string) {
        const roomIdPlayer2 = ref(rtdb, "/rooms/" + roomId + "/player2")
        set(roomIdPlayer2, {
            choice: "",
            online: true,
            start: true
        })

        this.setState({
            roomId: roomId,
            roomRtdb: roomId,
            whoAmI: "player2",
            connection: true
        })

        this.listenRoom()

    }

    listenRoom() {
        const roomActual = this.getState()
        const roomRef = ref(rtdb, "/rooms/" + roomActual.roomRtdb)

        onValue(roomRef, (snapshot) => {
            const serverData = snapshot.val()
            if (!serverData) return


            const player1 = serverData.player1 || {}
            const player2 = serverData.player2 || {}

            let moveRival: Jugada = ""
            let movemio: Jugada = ""
            let onlinRival = false

            if (roomActual.whoAmI === "player1") {
                moveRival = player2.choice || ""
                movemio = player1.choice || ""
                onlinRival = player2.online
              } else {
                moveRival = player1.choice || ""
                movemio = player2.choice || ""
                onlinRival = player1.online
            }

            this.setState(
                {
                    miJugada: movemio,
                    rivalJugada: moveRival,
                    connection:onlinRival
                })

            if(moveRival !== "" && movemio !== ""){
                this.calcWinner(movemio,moveRival)
            } 
        }) 
    }

        calcWinner(miJugada: Jugada, rivalJugada: Jugada) {
        let resultado = "";

        if (miJugada === rivalJugada) {
            resultado = "Empate";
        } else if (
            (miJugada === "Piedra" && rivalJugada === "Tijera") ||
            (miJugada === "Papel" && rivalJugada === "Piedra") ||
            (miJugada === "Tijera" && rivalJugada === "Papel")
        ) {
            resultado = "Ganaste";
            // Sumamos punto (recuerda que setState guarda en localStorage auto)
            const currentScore = this.getState().puntaje;
            this.setState({ puntaje: currentScore + 1 });
        } else {
            resultado = "Perdiste";
        }
        
        console.log("RESULTADO FINAL:", resultado);
        this.setState({ resultado: resultado }); 
    }

}