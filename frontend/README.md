# City Bikes Frontend

React + TypeScript frontend for the City Bikes Toronto application.

## Features

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Mapbox GL** for interactive maps
- **React Router** for navigation

## Project Structure

```
frontend/
├── src/
│   ├── pages/           # Page-level components
│   │   ├── About.tsx
│   │   ├── LandingPage.tsx
│   │   └── MapView.tsx
│   ├── components/       # Reusable UI components
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── NavBar.tsx
│   │   ├── StationInfo.tsx
│   │   └── StationToggle.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useBikeData.ts
│   │   ├── useLocation.ts
│   │   └── useMap.ts
│   ├── services/        # API services
│   │   └── bikeApi.ts
│   ├── utils/           # Utility functions
│   │   └── distance.ts
│   ├── interfaces/      # TypeScript interfaces
│   │   ├── Extra.ts
│   │   ├── Network.ts
│   │   └── Station.ts
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## Prerequisites

- Node.js 18+ and npm

## Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Create `.env` file** (in the `frontend/` directory):
   ```
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   VITE_BACKEND_URL=http://localhost:8080  # Optional: use backend API
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_MAPBOX_ACCESS_TOKEN` - Required. Your Mapbox access token
- `VITE_BACKEND_URL` - Optional. Backend API URL (defaults to direct API calls)

## Development

The frontend can work in two modes:

1. **Direct API mode** (default): Calls the citybik.es API directly
2. **Backend mode**: Uses the Haskell backend as a proxy (set `VITE_BACKEND_URL`)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Mapbox GL** - Interactive maps
- **React Router** - Client-side routing
- **Axios** - HTTP client

