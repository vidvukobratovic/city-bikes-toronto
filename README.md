# City Bikes Toronto

A full-stack application for finding and viewing e-bike stations in Toronto, featuring a React frontend and Haskell backend.

## Project Structure

```
city-bikes-toronto/
├── frontend/          # React + TypeScript frontend
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/          # Haskell backend API
│   ├── src/         # Source code
│   ├── app/         # Application entry point
│   └── stack.yaml   # Stack configuration
└── README.md        # This file
```

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

See [frontend/README.md](frontend/README.md) for more details.

### Backend

```bash
cd backend
stack build
stack run
```

See [backend/README.md](backend/README.md) for more details.

## Features

- **Interactive Map**: View bike stations on an interactive Mapbox map
- **E-Bike Filtering**: Find stations with available e-bikes
- **Location-Based**: Shows nearest e-bike stations based on your location
- **Type-Safe API**: Haskell backend with type-safe endpoints
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Mapbox GL
- React Router

### Backend
- Haskell
- Servant (Web framework)
- Warp (Web server)

## Development

Both frontend and backend can be developed independently:

- Frontend runs on `http://localhost:5173` (Vite default)
- Backend runs on `http://localhost:8080` (configurable)

To use the backend with the frontend, set `VITE_BACKEND_URL=http://localhost:8080` in `frontend/.env`.

## License

MIT
