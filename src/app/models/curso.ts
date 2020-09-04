
export class Curso {
  id: number;
  titulo: string;
  profesor;
  horas: number;
  nivel: string;
  activo: boolean;
  temario;

  constructor(titulo: string, profesor, horas: number, nivel: string, activo: boolean) {
    this.titulo = titulo;
    this.profesor = profesor;
    this.horas = horas;
    this.nivel = nivel;
    this.activo = activo;
  }
}
