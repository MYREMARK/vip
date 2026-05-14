# The VIP Connector Next.js website

## What is included

This project includes a luxury black and gold Next.js website with:

1. A home page with the supplied logo in the header
2. Navigation to About, Academy, and Talents
3. Player and game registration modes
4. A live counter for combined gaming experience years
5. Local development storage in `data/metrics.json`
6. Optional HubSpot sync placeholders through environment variables
7. A future Members Only placeholder page

## Run locally in VSCode

Open the folder in VSCode and run:

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## HubSpot setup

Copy `.env.example` to `.env.local` and fill in one of these options:

Option 1, recommended for CRM contact creation:

```bash
HUBSPOT_PRIVATE_APP_TOKEN=your_private_app_token
```

Option 2, recommended for a public HubSpot form submission:

```bash
HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_FORM_GUID=your_form_guid
```

The code sends:

1. email
2. firstname
3. gaming_experience_years
4. vip_connector_role

Create these custom properties in HubSpot before using the sync in production.

## Important production note

The local `data/metrics.json` counter is good for local testing, but not for production hosting on Vercel or Netlify. For production, move the counter to a database such as Supabase, Neon, Firebase, or HubSpot custom objects.

## Professional auth recommendation

Use HubSpot as the CRM, but do not use HubSpot itself as the password system unless you are using HubSpot CMS membership features. For a custom Next.js site, use Auth.js, Clerk, Supabase Auth, or Firebase Auth, then sync the user profile and membership status into HubSpot.
# vip
