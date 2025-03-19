import React, { useState, useEffect } from 'react';
import ImageGenerator from './components/ImageGenerator';
import Header from './components/Header';
import Footer from './components/Footer';
import { ZaptBadge } from './components/ZaptBadge';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow app-container">
        <ImageGenerator />
      </main>
      <Footer />
      <ZaptBadge />
    </div>
  );
}