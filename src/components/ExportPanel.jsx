import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import * as Sentry from '@sentry/browser';
import { toast } from 'react-toastify';

const ExportPanel = ({ image, prompt }) => {
  const [fileName, setFileName] = useState('generated-image');
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [isExporting, setIsExporting] = useState(false);
  
  const exportFormats = [
    { value: 'png', label: 'PNG', mimeType: 'image/png' },
    { value: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg' },
    { value: 'svg', label: 'SVG', mimeType: 'image/svg+xml' },
  ];
  
  const handleExport = async () => {
    if (!image) return;
    
    try {
      setIsExporting(true);
      
      // Create a temporary DOM element to hold the image
      const node = document.createElement('div');
      const img = document.createElement('img');
      img.src = image;
      img.style.maxWidth = '100%';
      node.appendChild(img);
      document.body.appendChild(node);
      
      let blob;
      const exportFileName = fileName.trim() || 'generated-image';
      
      switch (selectedFormat) {
        case 'png':
          blob = await toPng(img);
          saveAs(blob, `${exportFileName}.png`);
          break;
        case 'jpeg':
          blob = await toJpeg(img, { quality: 0.95 });
          saveAs(blob, `${exportFileName}.jpg`);
          break;
        case 'svg':
          blob = await toSvg(img);
          saveAs(blob, `${exportFileName}.svg`);
          break;
        default:
          throw new Error('Unsupported export format');
      }
      
      // Clean up
      document.body.removeChild(node);
      toast.success(`Image exported as ${selectedFormat.toUpperCase()}`);
    } catch (error) {
      console.error('Error exporting image:', error);
      Sentry.captureException(error);
      toast.error('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-900">Export Options</h3>
      
      <div>
        <label htmlFor="file-name" className="label">File Name</label>
        <input
          type="text"
          id="file-name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name"
          className="input-field"
        />
      </div>
      
      <div>
        <label className="label">Format</label>
        <div className="flex space-x-4">
          {exportFormats.map((format) => (
            <div key={format.value} className="flex items-center">
              <input
                type="radio"
                id={`format-${format.value}`}
                name="export-format"
                value={format.value}
                checked={selectedFormat === format.value}
                onChange={() => setSelectedFormat(format.value)}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor={`format-${format.value}`} className="ml-2 text-sm text-gray-700">
                {format.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <button
        className="btn-primary cursor-pointer flex items-center justify-center"
        onClick={handleExport}
        disabled={isExporting || !image}
      >
        {isExporting ? (
          <>
            <svg className="loading-spinner mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Exporting...
          </>
        ) : (
          `Export as ${selectedFormat.toUpperCase()}`
        )}
      </button>
    </div>
  );
};

export default ExportPanel;