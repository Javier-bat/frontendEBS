import { Domicilio } from "./Domicilio";

export class Cliente {
    id: number = 0;
    nombre: string = '';
    apellido: string = '';
    telefono: number = 0;
    email: string = '';
    Domicilio: Domicilio = new Domicilio();
}