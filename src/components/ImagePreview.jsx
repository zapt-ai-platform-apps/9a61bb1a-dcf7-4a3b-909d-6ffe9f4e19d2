import React, { useState, useEffect } from 'react';

const ImagePreview = ({ image, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (image) {
      setIsLoading(true);
      const img = new Image();
      img.onload = () => {
        setIsLoading(false);
      };
      img.src = image;
    }
  }, [image]);
  
  return (
    <div className="relative flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
      {isLoading && image && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      {image ? (
        <img
          src={image}
          alt={alt || 'Generated image'}
          className={`max-w-full max-h-[500px] object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      ) : (
        <div className="text-gray-400 text-center p-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p className="mt-2">
            Generated image will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;