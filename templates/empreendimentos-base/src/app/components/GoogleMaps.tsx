"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useContextDefault } from "@/context/Context";

const GoogleMap = () => {
  const context = useContextDefault();
  const submenu = context?.submenu;
  const [isSatellite, setIsSatellite] = useState(true);
  //controla se o mapa é satélite ou 2D

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  // Certifique-se de que a chave da API está definida no arquivo .env.local
  // para não tenha configure o arquivo .env.local com a chave da API do Google Maps
  // o arquivo .env.local não sobe para produção, então você precisa configurar a chave da API no ambiente de produção também

  useEffect(() => {
    if (submenu === "mapa2d") setIsSatellite(false);
    if (submenu === "mapa-satelite") setIsSatellite(true);
  }, [submenu]);

  const lat = "{{mapLat}}";
  const lng = "{{mapLng}}";

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: "100%", height: "100vh" }}
          defaultCenter={{ lat: lat, lng: lng }}
          // coordenadas do centro do mapa
          // você pode substituir por outras coordenadas
          defaultZoom={18}
          // nível de zoom inicial do mapa
          disableDefaultUI={false}
          // desativa a interface padrão do Google Maps
          gestureHandling={"greedy"}
          // controla o comportamento de gestos do mapa
          mapTypeId={isSatellite ? "satellite" : "roadmap"}
          // controla se o mapa é satélite ou 2D
        >
          <Marker
            // marcador no mapa
            icon={{
              url: "/local/pin.svg", // caminho do ícone
            }}
            position={{ lat: lat, lng: lng }}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMap;
