import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../config/axios";
import L from "leaflet";

// הגדרת אייקון ברירת מחדל
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapUsers() {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMapData();
  }, []);

  async function fetchMapData() {
    try {
      const countriesRes = await axios.get(
        "https://restcountries.com/v3.1/all"
      );
      const userDataRes = await api.get("/map-data");

      const mapData = userDataRes.data.countries
        .map((country) => {
          const match = countriesRes.data.find(
            (c) =>
              c.name.common.toLowerCase() === country.name.toLowerCase() ||
              c.name.official.toLowerCase() === country.name.toLowerCase()
          );

          if (match && match.latlng) {
            return {
              name: match.name.common,
              count: country.count,
              lat: match.latlng[0],
              lng: match.latlng[1],
              flag: match.flags.png,
              postId: country.postId,
            };
          }
          return null;
        })
        .filter(Boolean);

      setCountriesData(mapData);
    } catch (err) {
      console.error("Error loading map data:", err);
      setError("Failed to load map data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        className="w-full"
        style={{ height: "400px", borderRadius: "12px", overflow: "hidden" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {countriesData.map((country) => (
          <Marker key={country.name} position={[country.lat, country.lng]}>
            <Popup>
              <div className="text-center p-2" dir="auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {country.flag && (
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="h-4 w-auto"
                    />
                  )}
                  <h3 className="font-semibold">{country.name}</h3>
                </div>

                <p className="text-sm text-gray-700 mb-2">
                  {country.count} {country.count === 1 ? "Member" : "Members"}
                </p>

                {country.postId ? (
                  <Link
                    to={`/posts/${country.postId}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Story
                  </Link>
                ) : (
                  <p className="text-xs text-gray-400">No stories yet</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
