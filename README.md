# Tourism App

## Run locally

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` to a MongoDB Atlas connection string.
3. Install dependencies and start the API:

```bash
npm install
npm start
```

The API runs at `http://localhost:5000`. The health endpoint is `GET /health`, and destinations are available at `/api/destinations`.

To run the frontend:

```bash
cd Frontend
npm install
npm run dev
```

Set `VITE_API_URL` to the deployed API URL plus `/api` when the frontend is hosted remotely.

## GitHub Actions and deployment

The CI workflow checks the backend and builds the frontend on pushes and pull requests to `main`.

The deploy workflow triggers Render on pushes to `main`. To enable it:

1. Create a Render Web Service from this repository.
2. Use the included `render.yaml`, or set the build command to `npm ci` and the start command to `npm start`.
3. Add `MONGO_URI` in Render environment variables.
4. Create a Render deploy hook and add it to GitHub as the repository secret `RENDER_DEPLOY_HOOK_URL`.
5. Push the repository to GitHub on the `main` branch.
