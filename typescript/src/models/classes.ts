export class MAC {
    mac:string;

    constructor(mac: string) {
        this.verifyMacAddress(mac);
        this.mac = mac;
        // return this;
    }

    verifyMacAddress(mac:string) {
        const verify:string[] = mac.split(":");

        if (verify.length == 7) return;

        throw new Error('MAC inválido');
    }
}