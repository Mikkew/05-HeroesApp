import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`);
  }

  getHeroePorId( id:string ): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.apiUrl}/heroes/${id}`);
  }

  getSugerencias( termino: string ): Observable<Heroe[]> {
    
    const params = new HttpParams()
      .set('q', termino)
      .set('_limit', '6');

    return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`, { params });
  }

  agregarHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.apiUrl}/heroes`, heroe);
  }

  actualizarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.apiUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe( id: string ): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/heroes/${id}`);
  }
}
