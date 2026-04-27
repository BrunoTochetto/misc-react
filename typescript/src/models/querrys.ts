import { MAC } from "./classes.js";

let token = 0

interface usuario {
    id: number,
    nome_dispositivo: string,
    endereco_mac: MAC,
    lat: string,
    lng: string,
    token: string,
}

type statusOperacao = "em percurso" | "inativo";

interface motorista {
    id: number,
    nome_dispositivo: string,
    identificacao_caminhao: string,
    tipo_lixo: string,
    status_operacao: statusOperacao;
}

class usuarioClasse {
    dados: usuario;

    constructor(id:number, nome_dispositivo: string, endereco_mac: string, lat: string, lng: string) {
        const enderecoMac = new MAC(endereco_mac);
        const tokenCriado = `Criação ${token++}`;
        this.dados = {id, nome_dispositivo, endereco_mac: enderecoMac, lat, lng, token: tokenCriado }
    }
}

class motoristaClasse {
    dados: motorista;

    constructor(id:number, nome_dispositivo: string, identificacao_caminhao: string, tipo_lixo: string, status_operacao: statusOperacao) {
        this.dados = {id, nome_dispositivo, identificacao_caminhao, tipo_lixo, status_operacao};
    }
}



type listaUsuarios = usuarioClasse[];
type listaCaminhoes = motoristaClasse[];
