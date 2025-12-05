# Encyclopedia PWA

A mobile-first Progressive Web App built with React and Vite for exploring knowledge.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile devices with responsive layouts
- ⚡ **Lightning Fast** - Built with Vite for instant loading and hot module replacement
- 🔌 **Works Offline** - PWA capabilities with service workers for offline functionality
- 🎨 **Modern UI** - Clean interface with light/dark mode support
- 🔍 **Search Functionality** - Easy-to-use search to find articles quickly
- ♿ **Accessible** - Built with accessibility best practices

## Tech Stack

- **React 19** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **PWA** - Progressive Web App with service workers
- **CSS Variables** - For theming and responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lpruitt2004-commits/encyclopedia.git
cd encyclopedia
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
encyclopedia/
├── public/              # Static assets
│   ├── pwa-192x192.png # PWA icon (192x192)
│   ├── pwa-512x512.png # PWA icon (512x512)
│   └── apple-touch-icon.png
├── src/
│   ├── components/     # React components
│   │   ├── ArticleCard.jsx
│   │   └── ArticleCard.css
│   ├── data/          # Data files
│   │   └── articles.js
│   ├── App.jsx        # Main App component
│   ├── App.css        # App styles
│   ├── index.css      # Global styles
│   └── main.jsx       # Entry point
├── index.html
├── vite.config.js     # Vite configuration
└── package.json
```

## PWA Features

The app includes:

- Service worker for offline caching
- Web app manifest for installation
- Mobile-optimized viewport settings
- Touch-friendly UI elements (44px minimum touch targets)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## Deploying

The app can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Simply deploy the contents of the `dist` folder after building.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

lpruitt2004-commits
