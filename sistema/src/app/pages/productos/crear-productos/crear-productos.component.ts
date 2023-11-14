import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent {

  productoForm: FormGroup;
  uploadFiles: Array<File> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: [null]
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const image = files[0];
      this.uploadFiles = files;
      this.productoForm.get('imagen')!.setValue(image.name);
    }
  }

  guardarProducto() {
    const productoData = this.productoForm.value;
    productoData.precio = Number(productoData.precio);

    const formData = new FormData();
    if (this.uploadFiles.length > 0) {
      formData.append('imagen', this.uploadFiles[0], this.uploadFiles[0].name);
    }

    Swal.fire({
      title: 'Creación de Producto',
      text: '¿Desea crear el producto?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoService.guardarProducto(formData).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/listar-productos']);
          },
          (error) => {
            console.error('Error al guardar el producto', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al guardar el producto',
              icon: 'error'
            });
          }
        );
      }
    });
  }
}
