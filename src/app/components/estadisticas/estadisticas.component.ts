import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{


  generos: any[] = []
  resultadoArray: { genero: string, veces: number }[] = [];


  constructor(private spotiService: SpotifyService,
              private route: ActivatedRoute,
              private listsService: TopItemsService,
              private router: Router, private titulo: Title) {
    titulo.setTitle('Estadisticas')
  }

  ngOnInit(): void {
    this.listsService.getMidArtist().subscribe(
      artsit => {
        console.log(artsit);
        for (let a of artsit){
          for (let b of a.genres){
            this.generos.push(b)
          }
        }
        console.log('Hola '+this.generos)
        this.contarPalabras();
      },
      error => {
        console.error(error);
      }
    );
  }

  contarPalabras() {
    const contador: { [key: string]: number } = {};

    this.generos.forEach(palabra => {
      if (contador[palabra]) {
        contador[palabra]++;
      } else {
        contador[palabra] = 1;
      }
    });

    this.resultadoArray = Object.keys(contador).map(palabra => ({ genero: palabra, veces: contador[palabra] }));

    // Ordenar el array por la cantidad de repeticiones en orden descendente
    this.resultadoArray.sort((a, b) => b.veces - a.veces);

    // Mantener solo las primeras 6 palabras con más repeticiones
    this.resultadoArray = this.resultadoArray.slice(0, 15);
  }

  calcularAncho(veces: number): string {
    const totalRepeticiones = this.generos.length;
    const porcentaje = (veces / totalRepeticiones) * 100;
    return (porcentaje*3) + '%';
  }

}
