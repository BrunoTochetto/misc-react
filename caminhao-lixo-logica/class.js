const tamanhoChunk = 100;
const metadeChunk = 50;
const tamanhoRaioCaminhao = 250;

let grids = [];

class Pessoa {
    constructor(x, y, target) {

        this.draw(x, y);
        
        if (target == null) return;

        if (target.classList.contains('chunk')) this.html.chunk = target.id;

        if (!target.classList.contains('chunk') && !target.classList.contains('pessoa') && !target.classList.contains('grid')) {
            this.html.chunk = new Grid(x-metadeChunk, y-metadeChunk).idChunkCreation;
        };

        if (target.classList.contains('chunk') && !target.classList.contains('real')) {
            target.classList.add('real');
        }

        

    }

    draw(x, y) {
        const ponto = document.createElement('div');
        ponto.classList.add('pessoa');
        ponto.style.left = x + 'px';
        ponto.style.top = y + 'px';

        this.html = ponto;


        document.body.appendChild(this.html);
    }


}

class Grid {
    n = 5
    constructor(xOrigin, yOrigin) { // origin => meio
        this.x = xOrigin;
        this.y = yOrigin;

        this.html = document.createElement('div');
        this.html.classList.add('grid');
        
        document.body.appendChild(this.html);
        
        this.rX = this.x - tamanhoChunk*Math.floor(this.n/2);
        this.rY = this.y - tamanhoChunk*Math.floor(this.n/2);

        this.vertices = [
            [this.rX, this.rY],
            [this.x + tamanhoChunk*Math.floor(this.n/2 + 1), this.y + tamanhoChunk*Math.floor(this.n/2 + 1)]
        ];

        // new Pessoa(this.x + tamanhoChunk*Math.floor(this.n/2 + 1), this.y + tamanhoChunk*Math.floor(this.n/2 + 1), null)
        

        grids.push(this);

        this.draw();
    }

    draw() {
        //  Primeiros chunks da lista
        for (let i = 0; i < this.n / 2 - 1; i++) {
            for (let j = 0; j < this.n; j++) {
                new Chunk(this.rX + tamanhoChunk*j, this.rY + tamanhoChunk*i, false, this.html);
            }
        }
        //Metade
        for (let i = 0; i < this.n / 2 - 1; i++) {
            new Chunk(this.rX + tamanhoChunk*i, this.y, false, this.html);
        }

        this.idChunkCreation = new Chunk(this.x, this.y, true, this.html).id; // Chunk atual

        for (let i = 1; i < this.n / 2; i++) {
            new Chunk(this.x + tamanhoChunk*i, this.y, false, this.html);
        }

        //  Resto dos chunks da lista
        for (let i = Math.floor(this.n / 2) + 1; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                new Chunk(this.rX + tamanhoChunk*j, this.rY + tamanhoChunk*i, false, this.html);
            }
        }
    }
}

class Chunk {
    static id = 0;
    constructor(x, y, tipo, pai = document.body) {
        this.tipo = tipo;
        this.id = Chunk.id++;
        this.draw(x, y, pai);
    }

    draw(x, y, pai) {
        const chunk = document.createElement('div');
        chunk.classList.add('chunk');
        this.tipo && chunk.classList.add('real'); // real / falsa
        chunk.style.left = x + 'px';
        chunk.style.top = y + 'px';
        chunk.id = this.id;


        pai.appendChild(chunk);
    }
}

class Caminhao {

    constructor(x, y) {

        this.draw(x, y);
    }

    draw(x, y) {
        const caminhao = document.createElement('div');
        caminhao.classList.add('caminhao');
        caminhao.style.left = x + 'px';
        caminhao.style.top = y + 'px';
        caminhao.innerText = "C";
        this.html = this.addDrag(caminhao);

        document.body.appendChild(this.html);
    }

    addDrag(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }

        return elmnt;
    }

    toggleAreas() {
        function calcularDistancia(x1, y1, x2, y2) {
            return ((x1 - x2)**2 + (y1 - y2)**2) ** 1/2
        }
    }

}