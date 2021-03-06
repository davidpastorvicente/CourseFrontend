import { Profesor } from './profesor';

export class Curso {
  id: number;
  titulo: string;
  horas: number;
  activo: boolean;
  nivel: string;
  temario: string;
  profesor: Profesor;
}
