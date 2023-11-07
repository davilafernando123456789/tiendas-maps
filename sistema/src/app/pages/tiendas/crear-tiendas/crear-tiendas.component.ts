import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-crear-tiendas',
  templateUrl: './crear-tiendas.component.html',
  styleUrls: ['./crear-tiendas.component.css']
})

export class CrearTiendasComponent implements OnInit {
  tiendaForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private tiendaService: TiendaService) {
    this.tiendaForm = this.fb.group({
      departamento: ['', Validators.required],
      distrito: ['', Validators.required],
      nombre: ['', Validators.required],
      latitud: [0, Validators.required],
      longitud: [0, Validators.required],
      cantidad: [0, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  crearTienda() {
    if (this.tiendaForm.valid) {
      const tiendaData = this.tiendaForm.value;
      this.tiendaService.crearTienda(tiendaData).subscribe(data => {
        // Realiza las acciones necesarias después de crear la tienda, como redireccionar a la lista de tiendas.
        this.router.navigate(['/listar-tiendas']);
      });
    }
  }
}
