import "./component/btnAzulCom";

function main() {
    const conteiner = document.getElementById("app")
    if (conteiner) {
        conteiner.innerHTML = `
        <btn-azul-com>VITE MOLA</btn-azul-com>
       `
    }
}
main()