import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

const PRODUCTO_INITIAL: Producto = {
  producto: '',
  categoria: '',
  ubicacion: '',
  precio: 0,
  image: { nombre: '', ruta: '' }
};


@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})

export class EditarProductosComponent implements OnInit {
  productoForm: FormGroup;
  id: string | null;
  image: { nombre: string; ruta: string } = { nombre: '', ruta: '' }; // Cambiado de undefined a un objeto vacío

  constructor(
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private _productoService: ProductoService
    ) {
      this.productoForm = this.fb.group({
        producto: ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio: ['', Validators.required],
        imagen: [null],
      });
      this.id = aRouter.snapshot.paramMap.get('id');
    }
  
    ngOnInit(): void {
      this.validarId();
    }
  onFileChange(e: any) {
    this.productoForm.patchValue({
      imagen: e.target.files[0]
    });
    this.productoForm.get('imagen')?.updateValueAndValidity();
  }

  validarId() {
    if (this.id !== null) {
      this._productoService.viewProducto(this.id).subscribe((data) => {
        this.image = data.image || { nombre: '', ruta: '' }; // Asegúrate de manejar el caso en el que data.image sea null o undefined
        this.productoForm.setValue({
          producto: data.producto,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
          imagen: null,
        });
      });
    }
  }
  editarProducto() {
    const formData = new FormData();
    if (this.productoForm.get('imagen')?.value) {
      formData.append('imagen', this.productoForm.get('imagen')?.value);
    }

    // Acceder correctamente a las propiedades del formulario
    const producto: Producto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
      image: this.image,
    };

    Swal.fire({
      title: 'Actualización de Producto',
      text: '¿Desea actualizar el producto?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id !== null) {
          this._productoService.actualizarProducto(this.id, formData).subscribe(data => {
            this.router.navigate(['/listar-productos']);
          });
        }
      }
    });
  }
}
