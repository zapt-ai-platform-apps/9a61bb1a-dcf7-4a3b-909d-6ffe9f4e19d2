# AI Image Generator

A React-based application for generating AI images with customization options and batch processing capabilities.

## Features

- Create AI-generated images from text prompts
- Customize image generation parameters:
  - Resolution options (256x256, 512x512, 1024x1024, etc.)
  - Style presets (realistic, cartoon, sketch, etc.)
  - Negative prompts to avoid unwanted elements
- Real-time preview capability (requires GPU)
- Batch processing for generating multiple images
- Export options in various formats (PNG, JPEG, SVG)
- Responsive design for all devices

## Tech Stack

- React.js
- TailwindCSS for styling
- Axios for API requests
- React Toastify for notifications
- HTML-to-Image for export functionality
- Sentry for error tracking
- Vite for fast development and building

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with required environment variables
4. Run the development server with `npm run dev`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run serve` - Preview the production build locally
- `npm run start` - Start the production server

## Implementation Notes

The current implementation uses placeholder images for demonstration purposes. To use a real AI image generation API:

1. Uncomment the appropriate code in `src/services/imageService.js`
2. Add your API key to the `.env` file
3. Adjust the API parameters as needed for your specific provider

## License

MIT