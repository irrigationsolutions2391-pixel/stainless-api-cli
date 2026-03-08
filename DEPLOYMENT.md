# Deployment Guide

## Important Notice

> **SUPABASE PAUSED UNTIL APRIL 4, 2026**
> 
> The Supabase database is currently paused and will be reactivated on April 4, 2026.
> Until then, database-dependent features will not function. Plan your staging/production deployment accordingly.

## Production Domain

- **Staging**: `stainless-api-cli.vercel.app`
- **Production**: `irriggig.vercel.app` (to be configured after April 4)

---

## Quick Deploy to Vercel

### Method 1: One-Click Deploy from v0 (Easiest)

1. Click the "Publish" button in the top right of v0
2. Select your Vercel account
3. Choose a project name (e.g., "irriggig-ai")
4. Click "Deploy"
5. Wait 2-3 minutes for deployment to complete
6. Your app is live!

### Method 2: Deploy via GitHub

1. Push your code to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

### Method 3: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Post-Deployment Steps

### 1. Run Database Migrations

After deploying, you need to set up your database:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run these scripts in order:
   - `scripts/001_create_tables.sql`
   - `scripts/002_profile_trigger.sql`

### 2. Create Your First Account

1. Visit your deployed app URL
2. Click "Sign Up"
3. Create an account with your email
4. Check your email for verification link

### 3. Add Demo Jobs

1. After signing up, go to `/dashboard`
2. Click "Create Demo Jobs" button
3. This populates your marketplace with sample jobs

### 4. Configure Email Settings (Optional)

For custom email templates:

1. Go to Supabase Dashboard > Authentication > Email Templates
2. Customize confirmation, password reset, and magic link emails
3. Add your company branding

### 5. Set up Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., irriggig.com)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` to your domain

## Environment Variables

All environment variables are automatically synced from v0 to Vercel. Verify they're set:

1. Go to Vercel Project > Settings > Environment Variables
2. Confirm these exist:

### Supabase (Required - Available after April 4, 2026)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - All `POSTGRES_*` variables

### Stripe (Payment Processing - Optional)
   - `STRIPE_SECRET_KEY` - Your Stripe secret key
   - `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
   - `STRIPE_WEBHOOK_SECRET` - Webhook signing secret

### Email Service (Optional)
   - `SENDGRID_API_KEY` - For transactional emails (or use Supabase built-in email)
   - `EMAIL_FROM` - Sender email address (e.g., noreply@irriggig.app)

### AI Integration
   - Uses Vercel AI Gateway (zero config)

## Troubleshooting

### Database Connection Issues

If you see database errors:
1. Verify environment variables are set correctly
2. Check Supabase connection pooling is enabled
3. Ensure RLS policies are applied

### Authentication Not Working

1. Check redirect URLs in Supabase:
   - Go to Authentication > URL Configuration
   - Add your Vercel domain to "Site URL"
   - Add `https://your-domain.vercel.app/auth/callback` to "Redirect URLs"

### Build Failures

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify TypeScript has no errors locally

## Monitoring

Your app includes Vercel Analytics by default:

1. Go to Vercel Project > Analytics
2. View real-time visitor data
3. Monitor Web Vitals scores

## Staging Environment Checklist

Before going live (after April 4, 2026):

- [ ] **Supabase Reactivation**: Unpause Supabase project
- [ ] **Run Database Migrations**: Execute all SQL scripts in `/scripts` folder
- [ ] **Verify Auth Flow**: Test login/signup with email confirmation
- [ ] **Configure Redirect URLs in Supabase**:
  - Site URL: `https://stainless-api-cli.vercel.app`
  - Redirect URLs: `https://stainless-api-cli.vercel.app/auth/callback`
- [ ] **Test Wallet/Payments**: Verify Stripe integration (if enabled)
- [ ] **Email Delivery**: Confirm transactional emails are working
- [ ] **Create Test Accounts**: Verify both worker and employer flows
- [ ] **Load Demo Data**: Use "Create Demo Jobs" feature

## Production Domain Transition

When ready to move from staging to production:

1. Update Vercel project domain to `irriggig.vercel.app`
2. Update `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SUPABASE_REDIRECT_URL`
3. Update Supabase redirect URLs for the new domain
4. Test full auth flow on production domain

## Support

Need help? Contact: **irrigationsolutions2391@gmail.com**

---

Happy deploying!
