// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Lo sentimos, la página que buscas no existe.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
