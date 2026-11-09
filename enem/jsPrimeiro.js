const azul = ["1:D|B", "2:D|A", "3:D|D", "4:E|D", "5:A|C", "6:E", "7:C", "8:D", "9:C", "10:E", "11:B", "12:C", "13:E", "14:C", "15:A", "16:E", "17:C", "18:A", "19:E", "20:B", "21:C", "22:B", "23:C", "24:B", "25:E", "26:B", "27:A", "28:B", "29:A", "30:B", "31:D", "32:E", "33:B", "34:C", "35:E", "36:D", "37:A", "38:B", "39:C", "40:A", "41:B", "42:A", "43:D", "44:D", "45:C", "46:E", "47:D", "48:E", "49:C", "50:A", "51:D", "52:C", "53:E", "54:E", "55:D", "56:C", "57:A", "58:D", "59:B", "60:D", "61:E", "62:B", "63:B", "64:A", "65:C", "66:D", "67:D", "68:E", "69:C", "70:B", "71:A", "72:D", "73:A", "74:B", "75:B", "76:C", "77:A", "78:B", "79:A", "80:C", "81:E", "82:E", "83:D", "84:D", "85:B", "86:C", "87:B", "88:C", "89:E", "90:A"]
const cinza = ["1:E|D", "2:A|C", "3:D|B", "4:D|A", "5:D|D", "6:C", "7:E", "8:E", "9:D", "10:C", "11:A", "12:E", "13:B", "14:C", "15:A", "16:E", "17:C", "18:B", "19:C", "20:E", "21:C", "22:B", "23:E", "24:B", "25:C", "26:B", "27:A", "28:B", "29:A", "30:C", "31:E", "32:D", "33:B", "34:D", "35:E", "36:B", "37:C", "38:A", "39:B", "40:A", "41:D", "42:D", "43:C", "44:A", "45:B", "46:A", "47:D", "48:B", "49:D", "50:E", "51:E", "52:D", "53:E", "54:C", "55:E", "56:E", "57:D", "58:C", "59:C", "60:A", "61:D", "62:B", "63:A", "64:D", "65:A", "66:B", "67:B", "68:C", "69:A", "70:B", "71:A", "72:C", "73:B", "74:B", "75:A", "76:C", "77:D", "78:D", "79:E", "80:C", "81:C", "82:B", "83:C", "84:E", "85:A", "86:E", "87:E", "88:D", "89:D", "90:B"]
const verde = ["1:D|B", "2:D|D", "3:A|A", "4:D|D", "5:E|C", "6:E", "7:D", "8:C", "9:C", "10:E", "11:B", "12:E", "13:B", "14:C", "15:E", "16:C", "17:A", "18:E", "19:B", "20:C", "21:A", "22:E", "23:C", "24:C", "25:E", "26:D", "27:B", "28:A", "29:B", "30:A", "31:B", "32:D", "33:E", "34:B", "35:B", "36:C", "37:B", "38:A", "39:A", "40:B", "41:D", "42:D", "43:C", "44:C", "45:A", "46:C", "47:E", "48:E", "49:D", "50:C", "51:A", "52:D", "53:B", "54:D", "55:E", "56:C", "57:A", "58:D", "59:E", "60:D", "61:E", "62:C", "63:A", "64:B", "65:A", "66:C", "67:B", "68:A", "69:D", "70:A", "71:B", "72:B", "73:C", "74:B", "75:C", "76:E", "77:A", "78:E", "79:E", "80:D", "81:D", "82:B", "83:C", "84:D", "85:D", "86:E", "87:C", "88:B", "89:B", "90:A"]
const amarelo = ["1 Ing: E", "2 Ing: C", "3 Ing: D", "4 Ing: B", "5 Ing: A", "1 Esp: A", "2 Esp: A", "3 Esp: D", "4 Esp: B", "5 Esp: C", "6: E", "7: D", "8: D", "9: D", "10: D", "11: B", "12: A", "13: B", "14: B", "15: C", "16: B", "17: E", "18: A", "19: E", "20: A", "21: B", "22: D", "23: B", "24: C", "25: E", "26: D", "27: E", "28: A", "29: C", "30: A", "31: C", "32: E", "33: A", "34: A", "35: B", "36: C", "37: E", "38: C", "39: D", "40: C", "41: B", "42: A", "43: B", "44: C", "45: D", "46: D", "47: D", "48: E", "49: C", "50: C", "51: A", "52: E", "53: C", "54: B", "55: A", "56: A", "57: D", "58: D", "59: E", "60: B", "61: E", "62: D", "63: D", "64: D", "65: B", "66: E", "67: D", "68: A", "69: C", "70: A", "71: E", "72: B", "73: A", "74: E", "75: A", "76: B", "77: D", "78: E", "79: E", "80: B", "81: C", "82: D", "83: E", "84: C", "85: A", "86: B", "87: C", "88: B", "89: E", "90: A"]
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

function criarObjeto(letraCerta, bool) {
    const obj = document.createElement('div');
    const letra = document.createElement('p');
    const certo = document.createElement('button');

    if (!bool){
        certo.addEventListener('click', adicionarOuRemoverAcertoPrimeira);
    } else {
        certo.addEventListener('click', adicionarOuRemoverAcertoSegunda);
    }

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
        if (i < respostas.length/2){
            primeira.appendChild(criarObjeto(respostas[i], false))
        } else {
            segunda.appendChild(criarObjeto(respostas[i], true))
        }

    }

}
load(0);

