
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('caminhao')) return;
    
    const x = e.x;
    const y = e.y;
    const target = e.target;

    console.log(e);

    new Pessoa(x, y, target);
});

const caminhao = new Caminhao(100, 100);