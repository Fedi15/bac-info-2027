# Bac Info 2027 — Private Tutoring — Cloudflare D1

Website for **Fedi Ghanmi (Torbaga)**'s private Informatique tutoring service.

## Cloudflare architecture

- Cloudflare Workers — backend/API
- Cloudflare D1 — SQLite database
- Workers Static Assets — `public/`
- `src/worker.js` — Worker entry point
- `api/register.js` — public registration handler
- `api/leads.js` — protected admin leads handler
- `public/admin.html` — simple admin viewer

The project no longer uses Hatchable or PostgreSQL. D1 is SQLite-based and the Worker uses the native `env.DB.prepare(...).bind(...).run()` API.

## Form structure

The student chooses **one combined Level / Section** field:

- 3ème année secondaire
- Bac Économie & Gestion
- Bac Mathématiques
- Bac Technique
- Bac Sciences Expérimentales
- Bac Lettres

Bac Informatique is not offered.

Programmes:

- **Économie & Gestion:** Access, Pandas, Python
- **Mathématiques + Technique + Sciences Expérimentales:** Python, algorithmique
- **Lettres:** Informatique not offered

City is fixed to **Sfax** and is not editable.

Students do not choose an availability time on the form. After submitting their details, they are contacted by email to confirm the information and arrange the lesson.

## Create the D1 database

Install/authenticate Wrangler if needed, then create the database:

```powershell
npx wrangler login
npx wrangler d1 create bac-info-2027
```

Cloudflare will return a `database_id`. Put that ID into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "bac-info-2027"
database_id = "YOUR_REAL_D1_DATABASE_ID"
```

Do not commit a real secret token to Git.

## Create the schema

For the remote/production database:

```powershell
npx wrangler d1 execute bac-info-2027 --remote --file=migrations/001_d1_schema.sql
```

For local development:

```powershell
npx wrangler d1 execute bac-info-2027 --local --file=migrations/001_d1_schema.sql
```

## Admin token

Create the admin token as a Worker secret:

```powershell
npx wrangler secret put ADMIN_TOKEN
```

Then open `/admin.html` and enter the same token. The API will reject requests without the correct Bearer token.

## Local development

```powershell
npx wrangler dev
```

Then open the local URL shown by Wrangler.

## Deploy

```powershell
npx wrangler deploy
```

The Worker serves the static site from `public/` and handles:

- `POST /api/register`
- `GET /api/leads`

## Email note

The form collects the student's email and the site explains that follow-up information will be sent by email. Cloudflare D1 stores the request; it does **not** itself send email. If you want an automatic email immediately after a request, connect an email provider such as Resend through a Worker secret/API integration.

## Google Maps

Teaching location:

https://maps.app.goo.gl/mSkGnLRJGRDpTnhc7


## iPhone Instagram Story fallback
On iPhone Safari, the Instagram button uses the same native iOS share popup as the earlier working version: it generates `torbaga-story.jpg` in memory and passes the image to `navigator.share({ files: [file] })`. It does not download the image or open `instagram://camera`. A native bridge, if present, still takes precedence.

Important: Safari cannot silently write a web-generated image directly into the iOS Photos library. The browser download location/behavior is controlled by iOS.
