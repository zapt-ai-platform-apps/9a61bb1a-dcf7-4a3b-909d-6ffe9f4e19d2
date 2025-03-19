import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { toast } from 'react-toastify';
import CustomizationPanel from './CustomizationPanel';
import ImagePreview from './ImagePreview';
import ExportPanel from './ExportPanel';
import BatchProcessing from './BatchProcessing';
import { generateImage } from '../services/imageService';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewEnabled, setPreviewEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState('single');
  
  // Customization parameters
  const [parameters, setParameters] = useState({
    resolution: '512x512', // Default resolution
    style: 'realistic', // Default style
    negativePrompt: '', // Things to avoid in the image
  });

  // Batch processing
  const [batchPrompts, setBatchPrompts] = useState(['']);
  const [batchResults, setBatchResults] = useState([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    
    try {
      setIsGenerating(true);
      const image = await generateImage(prompt, parameters);
      setGeneratedImage(image);
      toast.success('Image generated successfully!');
    } catch (error) {
      console.error('Error generating image:', error);
      Sentry.captureException(error);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleParameterChange = (name, value) => {
    setParameters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBatchGenerate = async () => {
    const validPrompts = batchPrompts.filter(p => p.trim() !== '');
    if (validPrompts.length === 0) {
      toast.error('Please add at least one valid prompt');
      return;
    }
    
    try {
      setIsBatchProcessing(true);
      const results = [];
      
      for (const prompt of validPrompts) {
        const image = await generateImage(prompt, parameters);
        results.push({ prompt, image });
      }
      
      setBatchResults(results);
      toast.success(`Generated ${results.length} images`);
    } catch (error) {
      console.error('Error in batch processing:', error);
      Sentry.captureException(error);
      toast.error('Failed to complete batch processing');
    } finally {
      setIsBatchProcessing(false);
    }
  };
  
  const addBatchPrompt = () => {
    setBatchPrompts([...batchPrompts, '']);
  };
  
  const updateBatchPrompt = (index, value) => {
    const newPrompts = [...batchPrompts];
    newPrompts[index] = value;
    setBatchPrompts(newPrompts);
  };
  
  const removeBatchPrompt = (index) => {
    if (batchPrompts.length > 1) {
      const newPrompts = batchPrompts.filter((_, i) => i !== index);
      setBatchPrompts(newPrompts);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${selectedTab === 'single' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSelectedTab('single')}
          >
            Single Image
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${selectedTab === 'batch' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSelectedTab('batch')}
          >
            Batch Processing
          </button>
        </div>
        
        <div className="mt-6">
          {selectedTab === 'single' ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="prompt" className="label">Prompt</label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="input-field min-h-[100px]"
                  disabled={isGenerating}
                />
              </div>
              
              <CustomizationPanel
                parameters={parameters}
                onParameterChange={handleParameterChange}
                disabled={isGenerating}
              />
              
              <div className="flex items-center space-x-4">
                <button
                  className="btn-primary cursor-pointer flex items-center justify-center min-w-[120px]"
                  onClick={handleGenerateImage}
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <svg className="loading-spinner mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    'Generate'
                  )}
                </button>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="realtime-preview"
                    checked={previewEnabled}
                    onChange={() => setPreviewEnabled(!previewEnabled)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="realtime-preview" className="ml-2 text-sm text-gray-700">
                    Enable real-time preview (requires GPU)
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <BatchProcessing
              prompts={batchPrompts}
              results={batchResults}
              isProcessing={isBatchProcessing}
              onAddPrompt={addBatchPrompt}
              onUpdatePrompt={updateBatchPrompt}
              onRemovePrompt={removeBatchPrompt}
              onGenerate={handleBatchGenerate}
              parameters={parameters}
              onParameterChange={handleParameterChange}
            />
          )}
        </div>
      </div>
      
      {selectedTab === 'single' && generatedImage && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Image</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImagePreview image={generatedImage} alt={prompt} />
            <ExportPanel image={generatedImage} prompt={prompt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;