import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tiendas.component.html',
  styleUrls: ['./editar-tiendas.component.css']
})

export class EditarTiendaComponent implements OnInit {
  tiendaForm: FormGroup;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private tiendaService: TiendaService
  ) {
    this.tiendaForm = this.fb.group({
      departamento: ['', Validators.required],
      distrito: ['', Validators.required],
      nombre: ['', Validators.required], // Agrega el campo "Nombre"
      latitud: ['', Validators.required], // Agrega el campo "Latitud"
      longitud: ['', Validators.required], // Agrega el campo "Longitud"
      cantidad: ['', Validators.required]
    });

    this.id = aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.validarId();
  }

  validarId() {
    if (this.id !== null) {
      this.tiendaService.viewTienda(this.id).subscribe(data => {
        this.tiendaForm.setValue({
          departamento: data.departamento,
          distrito: data.distrito,
          nombre: data.nombre, // Asigna el valor del campo "Nombre"
          latitud: data.latitud, // Asigna el valor del campo "Latitud"
          longitud: data.longitud, // Asigna el valor del campo "Longitud"
          cantidad: data.cantidad
        });
      });
    }
  }

  editarTienda() {
    const TIENDA: Tienda = {
      departamento: this.tiendaForm.get('departamento')?.value,
      distrito: this.tiendaForm.get('distrito')?.value,
      nombre: this.tiendaForm.get('nombre')?.value, // Obtén el valor del campo "Nombre"
      latitud: this.tiendaForm.get('latitud')?.value, // Obtén el valor del campo "Latitud"
      longitud: this.tiendaForm.get('longitud')?.value, // Obtén el valor del campo "Longitud"
      cantidad: this.tiendaForm.get('cantidad')?.value
    };
  
    Swal.fire({
      title: 'Actualización de Tienda',
      text: '¿Desea actualizar la tienda?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id !== null) {
          this.tiendaService.actualizarTienda(this.id, TIENDA).subscribe(data => {
            console.log(TIENDA);
            this.router.navigate(['/listar-tiendas']);
          });
        }
      }
    });
  }
}  
