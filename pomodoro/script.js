const svg = document.getElementById("principal");
const circulo = document.getElementById('circulo');

const botao = document.getElementById('botao');
const audio = document.getElementById('audio');

window.addEventListener("resize", deixarTamanhoDaTela)

function deixarTamanhoDaTela() {
    console.log("mudou");
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    svg.width.baseVal.value = newWidth;
    svg.height.baseVal.value = newHeight;
};
deixarTamanhoDaTela();

let pomodoro = [25, 5, 25, 5, 25, 5, 25];
let indice = 0;
let iniciado = false;

botao.addEventListener("click", (e) => {
    if (iniciado) return;
    circulo.style.animation = 'casinoLights 5s linear infinite';

    iniciado = true;

    nextTimer();




});

function nextTimer() {
    botao.innerText = pomodoro[indice];
    setTimeout(dispararAlarme, pomodoro[indice] * 60000);
    
    ++indice;
}

function dispararAlarme() {
    audio.play();
    if (indice < pomodoro.length) {
        nextTimer();
    } else {
        indice = 0;
        botao.innerText = "Iniciar";
        iniciado = false;
        circulo.style.animation = 'none';
    }
}