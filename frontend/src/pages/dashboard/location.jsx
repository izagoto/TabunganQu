import React, { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function LocationPage() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setError(null);
        },
        (err) => setError("Gagal mendapatkan lokasi: " + err.message),
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation tidak didukung browser ini.");
    }
  }, []);

  return (
    <div className="min-h-[80vh] bg-blue-gray-50/40">
      <div className="w-full bg-white rounded-2xl shadow-lg border border-blue-gray-100 mt-12 p-8">
        <div className="flex items-center gap-3 px-6 pt-6 pb-2 border-b border-blue-gray-50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl">
          <div className="bg-white rounded-full p-2 shadow">
            <MapPinIcon className="h-7 w-7 text-cyan-600" />
          </div>
          <h1 className="text-xl font-bold text-white drop-shadow">Location</h1>
        </div>
        <div className="pt-8">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {position ? (
            <>
              <div className="mb-4 flex gap-6">
                <div className="flex flex-col text-blue-gray-700 text-sm">
                  <span className="font-semibold text-blue-gray-900">Latitude</span>
                  <span className="bg-blue-gray-50 rounded px-2 py-1 mt-1 font-mono">{position.lat}</span>
                </div>
                <div className="flex flex-col text-blue-gray-700 text-sm">
                  <span className="font-semibold text-blue-gray-900">Longitude</span>
                  <span className="bg-blue-gray-50 rounded px-2 py-1 mt-1 font-mono">{position.lng}</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-blue-gray-100 shadow-md w-full">
                <iframe
                  title="maps"
                  width="100%"
                  height="482"
                  frameBorder="0"
                  style={{ border: 0, minWidth: '300px', width: '100%' }}
                  src={`https://maps.google.com/maps?q=${position.lat},${position.lng}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-blue-gray-400">
              <svg className="animate-spin h-8 w-8 mb-2 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Mengambil lokasi...
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 