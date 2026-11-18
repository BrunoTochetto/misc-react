const azul = ["D", "D", "C", "D", "C", "B", "D", "D", "C", "D", "A", "E", "A", "A", "E", "A", "E", "C", "E", "E", "B", "D", "B", "B", "C", "C", "D", "C", "B", "B", "B", "D", "E", "B", "B", "D", "C", "E", "A", "E", "E", "C", "A", "B", "A", "C", "B", "E", "C", "E", "C", "C", "A", "D", "D", "B", "E", "C", "B", "D", "D", "D", "A", "C", "B", "E", "C", "C", "D", "E", "A", "B", "B", "A", "D", "E", "D", "E", "A", "B", "E", "D", "A", "B", "C", "C", "B", "E", "A", "D"]
const cinza = ["91:C", "92:B", "93:C", "94:C", "95:C", "96:C", "97:E", "98:C", "99:E", "100:D", "101:E", "102:C", "103:E", "104:A", "105:B", "106:D", "107:E", "108:D", "109:E", "110:C", "111:C", "112:D", "113:A", "114:D", "115:D", "116:C", "117:B", "118:B", "119:D", "120:C", "121:B", "122:A", "123:D", "124:A", "125:A", "126:A", "127:E", "128:C", "129:E", "130:B", "131:A", "132:A", "133:B", "134:C", "135:E", "136:C", "137:D", "138:E", "139:C", "140:A", "141:E", "142:E", "143:C", "144:B", "145:A", "146:A", "147:B", "148:B", "149:E", "150:D", "151:A", "152:D", "153:D", "154:B", "155:D", "156:C", "157:E", "158:A", "159:C", "160:C", "161:D", "162:C", "163:D", "164:Anulado", "165:C", "166:B", "167:D", "168:D", "169:A", "170:E", "171:E", "172:D", "173:A", "174:B", "175:B", "176:B", "177:A", "178:C", "179:E", "180:B"]
const verde = ["E", "E", "B", "D", "E", "C", "D", "D", "C", "D", "C", "B", "D", "D", "E", "A", "C", "D", "A", "E", "A", "A", "A", "B", "B", "C", "C", "D", "C", "B", "C", "E", "A", "A", "B", "B", "B", "D", "B", "B", "D", "E", "E", "E", "C", "B", "D", "D", "D", "E", "B", "C", "A", "D", "D", "B", "C", "E", "C", "C", "A", "C", "E", "C", "D", "E", "B", "E", "C", "C", "D", "B", "A", "E", "A", "B", "A", "B", "C", "C", "B", "E", "A", "D", "D", "E", "B", "E", "D", "A"]
const amarelo = ["C", "B", "D", "D", "C", "D", "A", "E", "A", "A", "A", "E", "C", "B", "B", "C", "E", "A", "E", "E", "B", "D", "E", "E", "C", "A", "B", "B", "B", "D", "E", "C", "D", "C", "B", "B", "B", "D", "C", "E", "A", "D", "D", "C", "D", "C", "E", "C", "C", "A", "D", "D", "B", "E", "B", "C", "A", "C", "E", "C", "B", "D", "D", "D", "B", "A", "D", "E", "E", "A", "B", "B", "E", "C", "C", "D", "A", "B", "E", "A", "D", "D", "E", "B", "E", "D", "A", "B", "C", "C"]
const primeira = document.getElementById('primeira');
const segunda = document.getElementById('segunda');
let acertoObjP = document.querySelector('#acertosP');
let acertoObjS = document.querySelector('#acertosS');
let acertosP = 0;
let acertosS = 0;

const title = document.getElementById('title');

const provas = [cinza, azul, verde, amarelo];
const cores = ['gray', '#1865f5', 'green', 'yellow'];
let provaSelecionada = 0;

function criarObjeto(numero, letraCerta, bool) {
    const obj = document.createElement('div');
    const letra = document.createElement('p');
    const certo = document.createElement('button');

    if (!bool){
        certo.addEventListener('click', adicionarOuRemoverAcertoPrimeira);
    } else {
        certo.addEventListener('click', adicionarOuRemoverAcertoSegunda);
    }

    // letra.innerText = `${numero}: ${letraCerta}`;
    letra.innerText = `${letraCerta}`;    

    obj.appendChild(letra);
    obj.appendChild(certo)
    return obj;
}

function adicionarOuRemoverAcertoPrimeira() {
    this.classList.toggle('certo');

    if (this.classList.contains('certo')) {
        acertosP++;
    } else {
        acertosP--;
    }

    acertoObjP.innerText = acertosP;
}

function adicionarOuRemoverAcertoSegunda() {
    this.classList.toggle('certo');

    if (this.classList.contains('certo')) {
        acertosS++;
    } else {
        acertosS--;
    }

    acertoObjS.innerText = acertosS;
}

function load(valor) {
    const respostas = provas[valor];
    title.style.backgroundColor = cores[valor];
    primeira.innerHTML = '';
    segunda.innerHTML = '';

    for (let i = 0; i < respostas.length; i++) {
        if ( i < respostas.length/2){
            primeira.appendChild(criarObjeto(i+91, respostas[i], false))
        } else {
            segunda.appendChild(criarObjeto(i+91, respostas[i], true))
        }

    }

}
load(0);

