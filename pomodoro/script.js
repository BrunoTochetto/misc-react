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
const multiplicador = 60000;

botao.addEventListener("click", (e) => {
    if (iniciado) return;
    circulo.style.animation = 'casinoLights 5s linear infinite';

    iniciado = true;

    nextTimer();




});

function mudarTempoTexto(operacao = -1) {
    if (botao.innerText <= 0) {
        return;
    }

    botao.innerText = pomodoro[indice-1] + operacao;
    setTimeout(mudarTempoTexto, 1 * multiplicador);
}

function nextTimer() {
    botao.innerText = pomodoro[indice];
    setTimeout(dispararAlarme, pomodoro[indice] * multiplicador);
    setTimeout(mudarTempoTexto, 1 * multiplicadors);
    
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