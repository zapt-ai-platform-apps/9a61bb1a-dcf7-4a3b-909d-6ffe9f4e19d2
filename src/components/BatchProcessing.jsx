import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import CustomizationPanel from './CustomizationPanel';
import ImagePreview from './ImagePreview';

const BatchProcessing = ({
  prompts,
  results,
  isProcessing,
  onAddPrompt,
  onUpdatePrompt,
  onRemovePrompt,
  onGenerate,
  parameters,
  onParameterChange
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Batch Prompts</h3>
        
        {prompts.map((prompt, index) => (
          <div key={index} className="flex items-start space-x-2">
            <textarea
              value={prompt}
              onChange={(e) => onUpdatePrompt(index, e.target.value)}
              placeholder="Enter prompt..."
              className="input-field flex-grow"
              disabled={isProcessing}
              rows={2}
            />
            <button
              onClick={() => onRemovePrompt(index)}
              className="mt-1 p-2 text-gray-500 hover:text-red-500 cursor-pointer"
              disabled={isProcessing || prompts.length <= 1}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
        
        <button
          onClick={onAddPrompt}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
          disabled={isProcessing}
        >
          <FiPlus size={18} className="mr-1" />
          Add Another Prompt
        </button>
      </div>
      
      <CustomizationPanel
        parameters={parameters}
        onParameterChange={onParameterChange}
        disabled={isProcessing}
      />
      
      <button
        className="btn-primary cursor-pointer flex items-center justify-center min-w-[160px]"
        onClick={onGenerate}
        disabled={isProcessing || prompts.every(p => !p.trim())}
      >
        {isProcessing ? (
          <>
            <svg className="loading-spinner mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Batch...
          </>
        ) : (
          'Generate Batch'
        )}
      </button>
      
      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Batch Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <ImagePreview image={result.image} alt={result.prompt} />
                <div className="p-3 bg-white">
                  <p className="text-sm text-gray-700 line-clamp-2">{result.prompt}</p>
                  <a
                    href={result.image}
                    download={`image-${index + 1}.png`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 inline-block cursor-pointer"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchProcessing;