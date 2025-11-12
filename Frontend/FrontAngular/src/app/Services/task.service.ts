import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/app.settings';
import { Tarea } from '../Models/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
private http = inject(HttpClient);
private apiUrl:string = appsettings.apiUrl + "Tarea"
  constructor() { }

  Listar()
  {
    return this.http.get<Tarea[]>(this.apiUrl);
  }
  Obtener(IdTarea:Number)
  {
    return this.http.get<Tarea[]>(`${this.apiUrl}/${IdTarea}`);
  }
  Crear(objeto:Tarea){
    return this.http.post<Tarea[]>(this.apiUrl,objeto);
  }
  Editar(objeto:Tarea){
    return this.http.post<Tarea[]>(this.apiUrl,objeto);
  }
  Eliminar(IdTarea:Number)
  {
    return this.http.delete<Tarea[]>(`${this.apiUrl}/${IdTarea}`);
  }
}