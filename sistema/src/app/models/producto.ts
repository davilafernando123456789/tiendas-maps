export class Producto {
    _id?: string;
    producto: string;
    categoria: string;
    ubicacion: string;
    precio: number;
    image?: {
        nombre: string;
        ruta: string;
    };

    constructor(producto: string, categoria: string, ubicacion: string, precio: number, imagen?: { nombre: string, ruta: string }) {
        this.producto = producto;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
        this.image = imagen;
    }
}
