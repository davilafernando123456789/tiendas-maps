import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-tiendas-por-distrito',
  templateUrl: './ver-tiendas-por-distrito.component.html',
  styleUrls: ['./ver-tiendas-por-distrito.component.css']
})
export class VerTiendasPorDistritoComponent implements OnInit {
  distrito: string | null;
  tiendas: Tienda[] = [];
  googleMapsApiKey = 'AIzaSyCegryqfSTWHATAp5t_9JklYye7D6S9oiM'; // Reemplaza 'API_KEY_AQUI' con tu API key de Google Maps
  map: google.maps.Map | undefined;

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 13,
    mapTypeControl: false
  };

  markers: MarkerProperties[] = [];

  constructor(private route: ActivatedRoute, private tiendaService: TiendaService) {
    this.distrito = this.route.snapshot.paramMap.get('distrito');
  }
  ngOnInit(): void {
    if (this.distrito) {
      this.tiendaService.getTiendasPorDistrito(this.distrito).subscribe(data => {
        this.tiendas = data;
  
        // Agrega marcadores para las ubicaciones de las tiendas
        this.tiendas.forEach(tienda => {
          if (tienda.latitud && tienda.longitud) {
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
          }
        });
  
        // Asegúrate de que tu mapa esté inicializado antes de llamar a este método
        if (this.map) {
          this.handleMapInitialized(this.map);
        }
      });
    }
  }

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

