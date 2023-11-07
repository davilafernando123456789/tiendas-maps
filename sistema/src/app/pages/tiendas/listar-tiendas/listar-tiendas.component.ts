import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tiendas',
  templateUrl: './listar-tiendas.component.html',
  styleUrls: ['./listar-tiendas.component.css']
})
export class ListarTiendasComponent implements OnInit {

  googleMapsApiKey = 'AIzaSyCegryqfSTWHATAp5t_9JklYye7D6S9oiM';
  map: google.maps.Map | undefined;

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 13,
    mapTypeControl: false
  };

  markers: MarkerProperties[] = [];

  handleMapInitialized(map: google.maps.Map) {
    this.map = map;
    this.markers.forEach((marker: MarkerProperties) => {
      const googleMarker = new google.maps.Marker({
        position: marker.position,
        label: marker.label,
        map,
        title: marker.title
      });
  
      // Agrega información personalizada al marcador
      const infoWindow = new google.maps.InfoWindow({
        content: marker.info
      });
  
      googleMarker.addListener('click', () => {
        infoWindow.open(map, googleMarker);
      });
    });
  }
  

  listTiendas: Tienda[] = [];
  elementos: number = 0;

  constructor(private tiendaService: TiendaService) {}

  ngOnInit(): void {
    this.obtenerTiendas();
  }
  obtenerTiendas() {
    this.tiendaService.getTiendas().subscribe(data => {
      console.log(data);
      this.listTiendas = data;
      this.elementos = this.listTiendas.length;
      // this.markers.push({
      //   position: { lat: -12.0464, lng: -77.0428 }, // Coordenadas de Lima, Perú
      //   label: { color: 'black', text: 'Tienda de prueba', fontSize: '20px', fontWeight: 'bold' },
      //   title: 'Lima',
      //   info: 'Tienda de prueba'
      // });
      
      this.listTiendas.forEach(tienda => {
        this.markers.push({
          position: { lat: tienda.latitud, lng: tienda.longitud },
          label: { color: 'black', text: `Tienda ${tienda.nombre}`, fontSize: '20px', fontWeight: 'bold' },
          title: tienda.nombre,
          info: `
          <div>
            <h4>${tienda.nombre}</h4>
            <p>Dirección: ${tienda.distrito}</p>
            <p>Teléfono: 972212543</p>
            <p>Total de tienas: ${tienda.cantidad}</p>
          </div>
        `
        });
      });
  
      // Asegúrate de que tu mapa esté inicializado antes de llamar a este método
      if (this.map) {
        this.handleMapInitialized(this.map);
      }
    });
  }
  

  eliminarTienda(id: any) {
    this.tiendaService.deleteTienda(id).subscribe(data => {
      Swal.fire({
        title: 'Eliminación de Tienda',
        text: '¿Desea eliminar la tienda?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(data);
          this.obtenerTiendas();
          this.elementos = this.listTiendas.length;
        }
      });
    });
  }
}

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  },
  label: {
    color: string;
    text: string;
    fontSize: string;
    fontWeight: string;
  },
  title: string,
  info: string
}
