import React from 'react';

const resolutionOptions = [
  { value: '256x256', label: '256x256 (Small)' },
  { value: '512x512', label: '512x512 (Medium)' },
  { value: '1024x1024', label: '1024x1024 (Large)' },
  { value: '1024x1792', label: '1024x1792 (Portrait)' },
  { value: '1792x1024', label: '1792x1024 (Landscape)' },
];

const styleOptions = [
  { value: 'realistic', label: 'Realistic' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'sketch', label: 'Sketch' },
  { value: 'painting', label: 'Painting' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'vaporwave', label: 'Vaporwave' },
  { value: 'pixel-art', label: 'Pixel Art' },
];

const CustomizationPanel = ({ parameters, onParameterChange, disabled }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-900">Customization Options</h3>
      
      <div>
        <label htmlFor="resolution" className="label">Resolution</label>
        <select
          id="resolution"
          value={parameters.resolution}
          onChange={(e) => onParameterChange('resolution', e.target.value)}
          className="select-field"
          disabled={disabled}
        >
          {resolutionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="style" className="label">Style</label>
        <select
          id="style"
          value={parameters.style}
          onChange={(e) => onParameterChange('style', e.target.value)}
          className="select-field"
          disabled={disabled}
        >
          {styleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="negative-prompt" className="label">Negative Prompt (things to avoid)</label>
        <input
          type="text"
          id="negative-prompt"
          value={parameters.negativePrompt}
          onChange={(e) => onParameterChange('negativePrompt', e.target.value)}
          placeholder="E.g., blurry, low quality, distorted"
          className="input-field"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CustomizationPanel;