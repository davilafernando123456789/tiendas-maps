export interface Tienda {
  _id?: string;
  departamento: string;
  distrito: string;
  nombre: string; // Agrega el campo "nombre"
  latitud: number; // Agrega el campo "latitud"
  longitud: number; // Agrega el campo "longitud"
  cantidad: number;
}
