import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

import { Heroe as IHeroe, heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id:"Marvel Comics",
      desc:"Marvel - Comics"
    }
  ];

  heroe: IHeroe = heroe;

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if( !this.router.url.includes("editar")) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe);
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id){
      //Actualizar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnackBar("Registro Actualizado"))
    } else {
      //Crear
      this.heroe.id = `${ (this.heroe.publisher == Publisher.DCComics) ? 'dc' : 'marvel' }`
        .concat("-").concat(`${this.heroe.superhero.replace(" ", "_")}`).toLowerCase();
        
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe(heroe => {
          this.mostrarSnackBar("Registro Creado")
          this.router.navigate(['/heroes/editar', heroe.id ]);
        });
    }    
  }

  borrar(): void {
    
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: "250px",
      data: {...this.heroe}
    });

    dialog.afterClosed()
      .subscribe( 
        (result) => {
          if(result) {
            this.heroesService.borrarHeroe( this.heroe.id! )
              .subscribe(resp => {
                this.router.navigate(["/heroes"]);
              });
          }
        });

  }

  mostrarSnackBar(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000
    });
  }
}
