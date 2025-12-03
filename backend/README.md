# City Bikes Backend

Haskell backend API for the City Bikes Toronto application.

## Features

- **RESTful API** using Servant framework
- **CORS support** for frontend integration
- **API proxy** for bike data from citybik.es
- **Type-safe** endpoints with automatic JSON serialization
- **Health check** endpoint for monitoring

## Prerequisites

- [Stack](https://docs.haskellstack.org/en/stable/README/) (Haskell build tool)
- GHC 9.6 or later (installed automatically by Stack)

## Setup

1. Install Stack (if not already installed):
   ```bash
   curl -sSL https://get.haskellstack.org/ | sh
   ```

2. Build the project:
   ```bash
   cd backend
   stack build
   ```

3. Run the server:
   ```bash
   stack exec city-bikes-backend
   ```

   Or use `stack run`:
   ```bash
   stack run
   ```

The server will start on `http://localhost:8080`

## API Endpoints

### GET /api/bikes/toronto
Returns bike station data for Toronto (Bixi network).

**Response:**
```json
{
  "network": {
    "id": "bixi-toronto",
    "name": "Bixi",
    "location": { ... },
    "stations": [ ... ]
  }
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "City Bikes Backend is running"
}
```

## Development

### Project Structure

```
backend/
├── app/
│   └── Main.hs           # Application entry point
├── src/
│   ├── Api.hs            # Main API definition
│   ├── Api/
│   │   └── BikeData.hs   # Data types for bike stations
│   └── Config.hs         # Configuration
├── stack.yaml            # Stack configuration
└── city-bikes-backend.cabal  # Cabal package file
```

### Adding New Endpoints

1. Add the endpoint type to `BikeAPI` in `src/Api.hs`
2. Implement the handler function
3. Add it to the `server` function

Example:
```haskell
type BikeAPI =
  "api" :> "bikes" :> "toronto" :> Get '[JSON] ApiResponse
  :<|> "api" :> "new-endpoint" :> Get '[JSON] SomeResponse  -- Add here

server manager config = getTorontoBikes manager config
  :<|> getNewEndpoint  -- Add handler here
```

### Configuration

Edit `src/Config.hs` to change:
- Server port (default: 8080)
- External API URL
- Other configuration options

## Future Enhancements

Potential features to add:
- **Caching** - Cache bike data to reduce API calls
- **User preferences** - Store user favorite stations
- **Analytics** - Track usage patterns
- **Authentication** - User accounts and sessions
- **Database** - Persistent storage (PostgreSQL, SQLite)
- **WebSocket** - Real-time updates for station availability

## Testing

Run tests (when implemented):
```bash
stack test
```

## Building for Production

```bash
stack build --pedantic
```

## License

MIT

