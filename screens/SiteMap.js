import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './SiteMap.css';
import { getPointsOfInterest } from './services/pointsOfInterest';
import mapboxSdk from '@mapbox/mapbox-sdk';
import directions from '@mapbox/mapbox-sdk/services/directions';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbmFyZCIsImEiOiJjbTA0NnRzMmgwNGxnMmpyNXY0OGt5MXVjIn0.Ojuo6UTNN_g2LaE5HR2q6g';

const SiteMap = ({ isFullScreen, toggleFullScreen }) => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [map, setMap] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  useEffect(() => {
    const fetchPointsOfInterest = async () => {
      try {
        const data = await getPointsOfInterest();
        setPointsOfInterest(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des points d\'intérêt:', error);
      }
    };

    fetchPointsOfInterest();
  }, []);

  useEffect(() => {
    if (pointsOfInterest.length > 0) {
      const initializeMap = () => {
        const mapInstance = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-1.2785, 47.0930], // Coordonnées initiales
          zoom: 15,
        });

        mapInstance.addControl(new mapboxgl.NavigationControl());

        pointsOfInterest.forEach(point => {
          const markerColor = point.title === 'Statue Lemmy' ? 'red' : 'blue';

          const marker = new mapboxgl.Marker({ color: markerColor })
            .setLngLat([point.lng, point.lat])
            .addTo(mapInstance);

          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <h3>${point.title}</h3>
              ${point.title === 'Statue Lemmy' && point.position ? 
                `<p><span style="color: red; font-size: 20px;">Position : ${point.position}</span></p>` 
                : ''}
              <p>${point.description || 'Aucune description disponible.'}</p>
            `);

          marker.setPopup(popup);
        });

        setMap(mapInstance);
      };

      initializeMap();
    }
  }, [pointsOfInterest]);

  const handleCalculateRoute = () => {
    if (!startPoint || !endPoint) {
      alert('Veuillez sélectionner un point de départ et un point d\'arrivée.');
      return;
    }

    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    const directionsService = directions(mapboxClient);

    directionsService.getDirections({
      profile: 'walking',
      waypoints: [
        { coordinates: [startPoint.lng, startPoint.lat] },
        { coordinates: [endPoint.lng, endPoint.lat] },
      ]
    })
      .send()
      .then(response => {
        const data = response.body;
        if (data.routes.length > 0) {
          const route = data.routes[0];
          
          if (map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
          }

          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: route.geometry,
            }
          });

          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
            }
          });
        } else {
          console.error('Aucun itinéraire trouvé.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'itinéraire:', error);
      });
  };

  return (
    <div className={`map-container ${isFullScreen ? 'full-screen' : ''}`}>
      <div className="controls">
        <button onClick={toggleFullScreen} className="fullscreen-toggle">
          {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
        </button>

        <select onChange={(e) => setStartPoint(pointsOfInterest[e.target.value])}>
          <option value="">Sélectionnez un point de départ</option>
          {pointsOfInterest.map((point, index) => (
            <option key={index} value={index}>{point.title}</option>
          ))}
        </select>

        <select onChange={(e) => setEndPoint(pointsOfInterest[e.target.value])}>
          <option value="">Sélectionnez un point d'arrivée</option>
          {pointsOfInterest.map((point, index) => (
            <option key={index} value={index}>{point.title}</option>
          ))}
        </select>

        <button onClick={handleCalculateRoute}>Calculer l'itinéraire</button>
      </div>

      <div id="map" className="map" />
    </div>
  );
};

export default SiteMap;
