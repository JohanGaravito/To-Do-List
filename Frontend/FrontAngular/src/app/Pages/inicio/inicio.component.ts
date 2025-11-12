import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TaskService } from '../../Services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Tarea } from '../../Models/Tarea';
import { Router } from '@angular/router';
import { TareaComponent } from '../tarea/tarea.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  private tareaServicio = inject(TaskService);
  public listaTareas:Tarea[] = [];
  public columnas:string[] = ['Titulo','Descripcion','Estado','FechaCreacion','FechaActualizacion','Accion']
  
  ObtenerTareas(){
    this.tareaServicio.Listar().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaTareas = data;
        }
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  constructor(private router: Router, private dialog: MatDialog) {
  this.ObtenerTareas();
}

Nuevo() {
  const dialogRef = this.dialog.open(TareaComponent, { width: '400px', data: null });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.tareaServicio.Crear(result).subscribe(() => this.ObtenerTareas());
    }
  });
}

Editar(objeto: Tarea) {
  const dialogRef = this.dialog.open(TareaComponent, { width: '400px', data: objeto });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.tareaServicio.Editar(result).subscribe(() => this.ObtenerTareas());
    }
  });
}

  Eliminar(objeto:Tarea){
    if (confirm("Desea eliminar la tarea" + objeto.Titulo)) {
      this.tareaServicio.Eliminar(objeto.IdTarea).subscribe({
        next:(data)=>{
          if (data.length > 0) {
            this.listaTareas = data;
          }
        }
      })
    }
  }
}