import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface FooterMapProps {
  accessToken?: string;
}

const FooterMap: React.FC<FooterMapProps> = ({ accessToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState(accessToken || '');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(!accessToken);

  // Bloom Branding Studio location (example: San Francisco)
  const studioLocation: [number, number] = [-122.4194, 37.7749];

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: studioLocation,
        zoom: 14,
        pitch: 45,
        bearing: -17.6,
        antialias: true,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add marker for studio location
      const markerEl = document.createElement('div');
      markerEl.className = 'studio-marker';
      markerEl.innerHTML = `
        <div style="
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, hsl(42 45% 65%), hsl(42 50% 70%));
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        "></div>
      `;

      new mapboxgl.Marker(markerEl)
        .setLngLat(studioLocation)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            '<div style="padding: 8px; font-family: Outfit, sans-serif;"><strong>Bloom Branding Studio</strong><br/>Creative Design Agency</div>'
          )
        )
        .addTo(map.current);

      map.current.on('load', () => {
        setIsMapLoaded(true);

        // Add 3D buildings
        const layers = map.current?.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
        )?.id;

        map.current?.addLayer(
          {
            id: 'add-3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 12,
            paint: {
              'fill-extrusion-color': '#2a2a2f',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.7,
            },
          },
          labelLayerId
        );
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setShowTokenInput(true);
    }

    return () => {
      map.current?.remove();
    };
  }, [token]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      setIsMapLoaded(false);
    }
  };

  if (showTokenInput) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-footer-surface rounded-lg p-6">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-footer-accent/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-footer-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="text-footer-heading font-display text-lg mb-2">Enable Map</h4>
          <p className="text-footer-text text-sm mb-4">
            Enter your Mapbox public token to display our studio location
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-3">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="pk.your_mapbox_token..."
              className="w-full px-4 py-2 bg-footer rounded-md border border-footer-border text-footer-heading placeholder:text-footer-text/50 focus:outline-none focus:ring-2 focus:ring-footer-accent/50 text-sm"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-footer-accent text-footer rounded-md font-medium hover:bg-footer-accent-glow transition-colors text-sm"
            >
              Load Map
            </button>
          </form>
          <a
            href="https://mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-footer-accent hover:text-footer-accent-glow transition-colors"
          >
            Get your token at mapbox.com →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <div 
        ref={mapContainer} 
        className="absolute inset-0"
        style={{ opacity: isMapLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-footer-surface flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-footer-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-inset ring-footer-border/50" />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default FooterMap;