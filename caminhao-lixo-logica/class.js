const tamanhoChunk = 100;
const metadeChunk = 50;
const tamanhoRaioCaminhao = 250;
const THREASHOLD_DISTANCIA = 470;
// distância mínima para considerar um chunk "perto" do caminhão
const THREASHOLD_CHUNK = 180;
// cor a aplicar nas pessoas dentro do chunk próximo
const COR_DENTRO = '#FF0000';

let grids = []; 

class Pessoa {
    constructor(x, y, target) {

        this.draw(x, y);
        
        if (target == null) return;

        if (target.classList.contains('chunk')) this.html.chunk = target.id;
        // if clicked on empty page (not chunk/pessoa/grid) -> create or reuse a nearby grid
        if (!target.classList.contains('chunk') && !target.classList.contains('pessoa') && !target.classList.contains('grid')) {
            const gx = x - metadeChunk;
            const gy = y - metadeChunk;
            const nearby = grids.find(g => Caminhao.calculateDistance(g.x, g.y, gx, gy) < metadeChunk);
            if (nearby) {
                this.html.chunk = nearby.idChunkCreation;
            } else {
                this.html.chunk = new Grid(gx, gy).idChunkCreation;
            }
        };

        // if clicked on a chunk -> ensure there's a grid centered here (no duplicates)
        if (target.classList.contains('chunk')) {
            // mark chunk as real
            if (!target.classList.contains('real')) target.classList.add('real');

            // get chunk coordinates (fallback to offset)
            const chunkLeft = parseFloat(target.style.left);
            const chunkTop = parseFloat(target.style.top);
            const cx = isNaN(chunkLeft) ? target.offsetLeft : chunkLeft;
            const cy = isNaN(chunkTop) ? target.offsetTop : chunkTop;

            // check for an existing grid nearby (avoid duplicates)
            const exists = grids.find(g => Caminhao.calculateDistance(g.x, g.y, cx, cy) < metadeChunk);
            if (exists) {
                // attach to central chunk of existing grid
                this.html.chunk = exists.idChunkCreation;
            } else {
                const newGrid = new Grid(cx, cy);
                this.html.chunk = newGrid.idChunkCreation;
            }
        }

        this.html.classList.add(this.html.chunk);

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
        // store the last mouse coordinates during a drag
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        const dragMouseDown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e.preventDefault();
            // calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // move element
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
            checarPerto(elmnt);
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        const checarPerto = (element) => {
            // compute center of the dragged element
            const centerX = element.offsetLeft + element.offsetWidth / 2;
            const centerY = element.offsetTop + element.offsetHeight / 2;
            for (let base of grids) {
                const distance = Caminhao.calculateDistance(
                    centerX,
                    centerY,
                    base.x + metadeChunk,
                    base.y + metadeChunk
                );

                if (distance <= THREASHOLD_DISTANCIA) {
                    // passamos o centro do caminhão para toggleGrids
                    Caminhao.toggleGrids(base, centerX, centerY);
                }
            }
        };

        elmnt.onmousedown = dragMouseDown;
        return elmnt;
    }

    static calculateDistance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static toggleGrids(grid, truckCenterX, truckCenterY) {
        const filhos = grid.html.childNodes;
        for (let chunkEl of filhos) {
            if (!(chunkEl instanceof HTMLElement)) continue;
            const id = chunkEl.id;
            // try to read numeric left/top from style, fallback to offset values
            let left = parseFloat(chunkEl.style.left);
            if (isNaN(left)) left = chunkEl.offsetLeft;
            let top = parseFloat(chunkEl.style.top);
            if (isNaN(top)) top = chunkEl.offsetTop;

            const chunkCenterX = left + metadeChunk;
            const chunkCenterY = top + metadeChunk;
            const dist = Caminhao.calculateDistance(truckCenterX, truckCenterY, chunkCenterX, chunkCenterY);

            // const selector = '.pessoa.' + id;
            if (dist <= THREASHOLD_CHUNK) {
                const pessoas = document.getElementsByClassName('pessoa ' + id);
                for (let i = 0; i < pessoas.length; i++) {
                    pessoas[i].style.backgroundColor = COR_DENTRO;
                }
            } else {
                // remove highlight when outside threshold
                const pessoas = document.getElementsByClassName('pessoa ' + id);
                for (let i = 0; i < pessoas.length; i++) {
                    pessoas[i].style.backgroundColor = '';
                }
            }
        }
    }

}