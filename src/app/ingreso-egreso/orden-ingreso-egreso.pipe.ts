import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform( items: IngresoEgreso[]): IngresoEgreso[] {
    // sort es una funcion de javascript que devuelve ordenado los arreglos
    return items.sort( (a, b) => {
        if (a.tipo === 'ingreso') {
          return -1;
        } else {
          return 1;
        }
    });
  }

}
