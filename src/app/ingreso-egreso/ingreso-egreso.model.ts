

export class IngresoEgreso {

    descripcion: string;
    monto: number;
    tipo: string;
    // variable acompañada de ? es para indicar que es opcional
    uid?: string;


    constructor( obj ) {
        this.descripcion  = obj && obj.descripcion || null;
        this.monto        = obj && obj.monto || null;
        this.tipo         = obj && obj.tipo || null;
        // this.uid          = obj && obj.uid || null;

    }


}
