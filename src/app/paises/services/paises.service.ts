import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  // para prevenir modificaciones al pasar este objeto como referencia
  // se crea la variable como privada
  private _regiones: string[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ]

  get regiones(): string[] {
    // aun puede ser que se hagan modificaciones por eso lo paso por el 
    // operedor rest 
    return [...this._regiones];
  }

  constructor() { }



}
