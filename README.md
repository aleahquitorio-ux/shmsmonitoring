# Server Health Monitoring System (SHMS)

SHMS is an Express web app with user/admin authentication, device registration, monitoring agent endpoints, dashboard, history, notifications, and profile/password controls.

## Requirements
- Node.js 18 or newer
- Neon PostgreSQL (recommended for deployment), or local JSON storage for local-only testing

## Run locally
1. Extract this folder and open it in VS Code.
2. Open Terminal in the `systemmonitoring` folder.
3. Run `npm install`.
4. For local JSON-only testing, run `npm start` without setting `DATABASE_URL`.
5. Open `http://localhost:3000`.

## Connect to Neon PostgreSQL
1. In Neon, open your project and copy the **pooled** connection string. Keep it private.
2. Create a `.env` file from `.env.example` and set `DATABASE_URL` and a long random `SESSION_SECRET`.
3. Set `NODE_ENV=production` only in the production environment. Locally, use `development`.
4. Install a dotenv loader if you want Node to load `.env` automatically; alternatively set these environment variables in your terminal. This project intentionally does not read `.env` automatically by default.
5. Run `npm start`. On first start, SHMS creates its `shms_collections` and `shms_sessions` tables and seeds empty collections from the local data files. Existing data in the database takes precedence on later starts.

### Render deployment environment
Set these environment variables in Render's service settings (do not commit them):
- `DATABASE_URL`: Neon pooled connection string
- `SESSION_SECRET`: long, random secret (at least 32 random bytes)
- `NODE_ENV`: `production`

Use the start command `npm start`. Configure a real email provider before relying on password-reset emails; the current reset flow prints a reset link to the server log and is for local development only.

## Data safety
- The packaged `data/*.json` files are empty starter files. They do not contain personal account records or previously exposed pairing tokens.
- Keep your previous project folder as a backup until you have tested this version.
- Rotate/revoke old device pairing tokens before connecting agents to a public deployment.
- Do not commit `.env`, database credentials, or session secrets.

## Important implementation note
The existing route layer is retained and uses a small in-memory cache with PostgreSQL JSONB collection persistence when `DATABASE_URL` is set. This is suitable as a migration step for the current small project; before multiple application instances or high concurrent writes, move to normalized per-record tables and transactional repository methods.
