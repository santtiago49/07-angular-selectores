import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from 'rxjs';

import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region  : ['', Validators.required ],
    pais    : ['', Validators.required ],
    frontera: ['', Validators.required ],
  })

  regiones : string[]    = []
  paises   : PaisSmall[] = []
  fronteras: string[]    = []

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones

    // Cuando cambia la region
    this.miFormulario.get('region')?.valueChanges
        .pipe(
          tap( () => 
            this.miFormulario.get('pais')?.reset('')
          ),
          switchMap( (region) => this.paisesService.getPaisesPorRegion(region)),
        )
        .subscribe( (paises) => this.paises = paises)

    // Cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap( (_) =>
            this.miFormulario.get('frontera')?.reset('')
          ),
          switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo))
        )
        .subscribe( pais => {
          // console.log(pais?.[0].borders)
          this.fronteras = pais?.[0].borders || []
        })

  }

  guardar(){
    console.log(this.miFormulario.value)

  }

}
