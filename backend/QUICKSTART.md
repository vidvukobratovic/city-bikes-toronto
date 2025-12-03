# Quick Start Guide

## First Time Setup

1. **Install Stack** (if not already installed):
   ```bash
   curl -sSL https://get.haskellstack.org/ | sh
   ```

2. **Build the project**:
   ```bash
   cd backend
   stack build
   ```

   This will download GHC and all dependencies (may take a few minutes the first time).

3. **Run the server**:
   ```bash
   stack run
   # or
   ./run.sh
   ```

   The server will start on `http://localhost:8080`

## Testing the API

Once the server is running, you can test it:

```bash
# Health check
curl http://localhost:8080/api/health

# Get bike data
curl http://localhost:8080/api/bikes/toronto
```

## Connecting the Frontend

1. Create a `.env` file in the project root (same level as `package.json`):
   ```
   VITE_BACKEND_URL=http://localhost:8080
   ```

2. Restart your frontend dev server:
   ```bash
   npm run dev
   ```

   The frontend will now use the backend API instead of calling the external API directly.

## Development Workflow

1. Make changes to Haskell files in `src/`
2. Rebuild: `stack build`
3. Run: `stack run`
4. Or use `stack build --file-watch` for auto-rebuild on file changes

## Common Commands

```bash
# Build
stack build

# Run
stack run

# Run tests (when implemented)
stack test

# Clean build artifacts
stack clean

# Update dependencies
stack update
```

## Troubleshooting

**Build fails with dependency errors:**
- Run `stack update` to update package index
- Try `stack build --resolver lts-21.22` to use a specific resolver

**Port already in use:**
- Change the port in `src/Config.hs`
- Or kill the process using port 8080: `lsof -ti:8080 | xargs kill`

**CORS errors:**
- Make sure your frontend URL is in the `corsOrigins` list in `src/Api.hs`
- Default allows `http://localhost:5173` (Vite) and `http://localhost:3000` (Create React App)

