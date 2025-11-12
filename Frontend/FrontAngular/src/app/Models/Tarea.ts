export interface Tarea {
    IdTarea: number;
    IdUsuario: number;
    Titulo: string;
    Descripcion: string;
    Estado: string;
    FechaCreacion: string;
    FechaActualizacion: string;
}

export interface ApiResponse{
    message: string;
    result: string;
    data: any;
}