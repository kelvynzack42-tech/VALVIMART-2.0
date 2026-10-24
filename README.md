# VALVIMART — Deployment-Ready Final Release

VALVIMART is a Node.js full-stack fashion storefront with:

- 3D-style welcome experience and dark-tech storefront
- Product catalogue, search, filters, favourites and cart
- Server-side customer accounts and sessions
- Direct customer registration without email/SMS verification
- Email verification for every password login
- Verified email + phone password-reset flow
- Google Identity Services sign-in
- Server-side checkout, stock validation and order storage
- Login-protected inbox and checkout
- Server-authenticated administrator login/dashboard
- Customer/order/product administration
- Health endpoint for hosting platforms

## Local test

Requirements: Node.js 18+.

```bash
npm install
npm start
```

Open `http://127.0.0.1:3000` on your computer or phone when connected to the same Wi-Fi (use your computer’s local network IP on the phone).\n\nManager sign-in entry: `/manager-access` (redirects to the existing server-authenticated administrator login).

Default development administrator:
- Username: `admin`
- Password: `FLAXX2026`

Change these before public deployment with `ADMIN_USER` and `ADMIN_PASSWORD`. The manager URL is intentionally discreet, but access is protected by server-side login rather than by the URL.

## Render deployment

Create a **Web Service** from this repository.

Use:

- Build Command: `npm install`
- Start Command: `npm start`
- Environment: `Node`
- The server listens on Render's `PORT` and defaults to `0.0.0.0`.

Do not upload `.env` or API secrets to GitHub. Use Render Environment Variables instead.

Recommended Render variables:

```text
NODE_ENV=production
ADMIN_USER=your-admin-username
ADMIN_PASSWORD=your-strong-admin-password
GOOGLE_CLIENT_ID=your-google-web-client-id
GOOGLE_CLIENT_SECRET=optional-if-using-standard-oauth-callback
GOOGLE_REDIRECT_URI=https://YOUR-RENDER-DOMAIN/auth/google/callback
ADMIN_EMAIL=your-support-email
RESEND_API_KEY=your-resend-api-key
MAIL_FROM=VALVIMART <your-verified-sender@yourdomain.com>
```

The current project contains the existing Google Web Client ID in its setup notes. In Google Cloud, add the exact HTTPS Render URL as an Authorized JavaScript origin. If using the standard OAuth callback, also add the exact HTTPS callback URL.

For real customer email delivery, use a verified sender/domain in Resend. The example `onboarding@resend.dev` sender is not a production sender for arbitrary customer mail.

## Important production note

The included `server/data/db.json` is a starter database. On Render, filesystem data can be lost when a service is redeployed or recreated unless persistent storage is configured. For a serious production store, move users/orders/products to a managed database such as PostgreSQL.

## Health check

The server exposes:

`/api/health`

A successful response contains `ok: true`.

## Security

- `.env` is excluded from the release.
- Admin authentication is server-side, not localStorage-only.
- Customer sessions use HTTP-only cookies.
- Checkout is validated by the server and stock is deducted server-side.
- Passwords are stored using Node's `scrypt` hashing.
- Google ID tokens are verified against the configured Google client ID.
