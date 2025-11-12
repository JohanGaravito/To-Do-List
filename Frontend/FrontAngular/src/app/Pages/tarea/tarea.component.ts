import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarea } from '../../Models/Tarea';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent {
  form: FormGroup;
  titulo: string = 'Nueva Tarea';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TareaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarea
  ) {
    this.form = this.fb.group({
      IdTarea: [data?.IdTarea || 0],
      Titulo: [data?.Titulo || '', Validators.required],
      Descripcion: [data?.Descripcion || '', Validators.required],
      Estado: [data?.Estado || 'Pendiente', Validators.required]
    });

    if (data) this.titulo = 'Editar Tarea';
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}