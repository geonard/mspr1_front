import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapComponent.css';
import MapboxClient from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';

// Remplacez 'YOUR_MAPBOX_TOKEN' par votre token Mapbox
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

const MapComponent = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // ID du conteneur de la carte
      style: 'mapbox://styles/mapbox/streets-v11', // Style de la carte
      center: [-1.2785, 47.0930], // Coordonnées pour centrer sur le Hellfest
      zoom: 15, // Zoom pour se rapprocher du centre
    });

    // Ajouter un contrôle de navigation
    map.addControl(new mapboxgl.NavigationControl());

    // Points d'intérêt
    const pointsOfInterest = [
      {
        title: "Hellfest Steampunk Clock",
        description: "",
        lat: 47.097490290808054, 
        lng: -1.2660241133442103
      },
      {
        title: "Warzone Stage",
        description: "",
        lat: 47.09851279713055, 
        lng: -1.2645220763523983 
      },
      {
        title: "Hellfest - Organisation Check-in",
        description: "Billeterie",
        lat: 47.100090339894095, 
        lng: -1.2832760814469757
      },
      {
        title: "Camping Hellfest",
        description: "Joli petit camping de caractère, bien sous tout rapport.",
        lat: 47.102325111993366, 
        lng: -1.2739205370730342
      },
      {
        title: "Statue Lemmy",
        description: "Statue en bronze de Lemmy Kilmister, légendaire chanteur et bassiste de Motörhead.",
        lat: 47.09905,
        lng: -1.26554
      },
      {
        title: "Hellfest Steampunk Tree Monument",
        description: "",
        lat: 47.09740447242533, 
        lng: -1.2673498932170841
      },
      {
        title: "Hellfest Steampunk Horn Hand Sign",
        description: "",
        lat: 47.097608975586326, 
        lng: -1.2683369460990328
      },
    ];

    // Ajouter les marqueurs pour les points d'intérêt
    pointsOfInterest.forEach(point => {
      const popup = new mapboxgl.Popup().setHTML(`<h3>${point.title}</h3><p>${point.description}</p>`);
      new mapboxgl.Marker({ color: 'red' }) // Utiliser un marqueur rouge pour les POI
        .setLngLat([point.lng, point.lat])
        .setPopup(popup)
        .addTo(map);
    });

    // Ajouter un marqueur bleu au barycentre des marqueurs rouges
    const averageLat = (pointsOfInterest.reduce((sum, point) => sum + point.lat, 0) / pointsOfInterest.length);
    const averageLng = (pointsOfInterest.reduce((sum, point) => sum + point.lng, 0) / pointsOfInterest.length);

    new mapboxgl.Marker({
      element: createCustomMarker('blue'), // Utiliser une fonction pour créer un marqueur bleu personnalisé
    })
      .setLngLat([averageLng, averageLat])
      .addTo(map);

    // Fonction pour créer un marqueur bleu personnalisé
    function createCustomMarker(color) {
      const marker = document.createElement('div');
      marker.className = 'custom-marker';
      marker.style.backgroundColor = color;
      marker.style.width = '20px'; // Largeur du marqueur
      marker.style.height = '20px'; // Hauteur du marqueur
      marker.style.borderRadius = '50%'; // Marqueur circulaire
      marker.style.border = '2px solid black'; // Bordure du marqueur
      return marker;
    }

    // Définir la zone de Hellfest avec un polygone
    const hellfestArea = [
      [47.095, -1.290], 
      [47.090, -1.275], 
      [47.095, -1.270], 
      [47.100, -1.280], 
      [47.095, -1.290]   
    ];

    // Ajouter le polygone à la carte
    map.on('load', () => {
      map.addSource('hellfest-area', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [hellfestArea]
          }
        }
      });

      map.addLayer({
        'id': 'hellfest-area',
        'type': 'fill',
        'source': 'hellfest-area',
        'layout': {},
        'paint': {
          'fill-color': '#088', // Couleur du polygone
          'fill-opacity': 0.5
        }
      });

      // Créer un client Mapbox pour les directions
      const mapboxClient = MapboxClient(mapboxgl.accessToken);
      const directionsService = Directions(mapboxClient);

      // Coordonnées pour le camping et la statue de Lemmy
      const campingCoordinates = [47.102325111993366, -1.2739205370730342];
      const lemmyCoordinates = [47.09905, -1.26554];

      // Obtenir les directions entre le Camping Hellfest et la Statue Lemmy
      directionsService.getDirections({
        profile: 'walking',
        waypoints: [
          { coordinates: [campingCoordinates[1], campingCoordinates[0]] }, // Inversez lat/lng
          { coordinates: [lemmyCoordinates[1], lemmyCoordinates[0]] }
        ]
      })
      .send()
      .then(response => {
        const data = response.body;
        const route = data.routes[0].geometry;

        // Ajouter la ligne de l'itinéraire à la carte
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#007cbf',
            'line-width': 8
          }
        });
      })
      .catch(err => console.error(err));
    });

    // Nettoyer la carte lorsque le composant est démonté
    return () => map.remove();
  }, []);

  return <div id="map" className="map-container" />;
};

export default MapComponent;
