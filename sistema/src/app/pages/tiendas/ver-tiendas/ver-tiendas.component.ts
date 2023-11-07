import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-ver-tienda',
  templateUrl: './ver-tiendas.component.html',
  styleUrls: ['./ver-tiendas.component.css']
})
export class VerTiendasComponent implements OnInit {
  tiendaId: string | null;
  tienda: Tienda | null;

  googleMapsApiKey = 'AIzaSyCegryqfSTWHATAp5t_9JklYye7D6S9oiM'; // Reemplaza 'API_KEY_AQUI' con tu API key de Google Maps
  map: google.maps.Map | undefined;

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 15,
    mapTypeControl: false
  };

  markers: MarkerProperties[] = [];

  constructor(private route: ActivatedRoute, private tiendaService: TiendaService) {
    this.tiendaId = this.route.snapshot.paramMap.get('id');
    this.tienda = null;
  }

  ngOnInit(): void {
    if (this.tiendaId) {
      this.tiendaService.viewTienda(this.tiendaId).subscribe(data => {
        this.tienda = data;

        // Agrega un marcador para la ubicación de la tienda
        if (this.tienda && this.tienda.latitud && this.tienda.longitud) {
          this.markers.push({
            position: { lat: this.tienda.latitud, lng: this.tienda.longitud },
            label: { color: 'black', text: `Tienda ${this.tienda.nombre}`, fontSize: '20px', fontWeight: 'bold' },
            title: this.tienda.nombre,
            info: `
            <div>
              <h4>${this.tienda.nombre}</h4>
              <p>Dirección: ${this.tienda.distrito}</p>
              <p>Teléfono: 972212543</p>
              <p>Total de tienas: ${this.tienda.cantidad}</p>
            </div>
          `
          });
        // Asegúrate de que tu mapa esté inicializado antes de llamar a este método
        if (this.map) {
          this.handleMapInitialized(this.map);
        }
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

