import "./component/btnAzulCom";
import "./component/btnImputCom"
import "./component/tijeraCom"
import "./component/piedraCom"
import "./component/papelCom"
import "./component/resultadoCom"
import "./component/timeCom"




function main() {
    const conteiner = document.getElementById("app")
    if (conteiner) {
        conteiner.innerHTML = `
        <style>
        .tijera{
        width:200px
        }
        </style>
        <time-com  class=""></time-com>
       `
    }
}
main()