This is a [Next.js](https://nextjs.org/) project for the Health Audit System of São Gonçalo do Amarante.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/`: Main application pages and routes.
- `src/app/api/`: API routes.
- `prisma/`: Prisma schema and database-related files.
- `db/`: Contains the manual database creation script.

---

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/).

### Step-by-Step Guide

1.  **Sign up on Vercel**: Create an account on [Vercel.com](https://vercel.com) using your GitHub, GitLab, or Bitbucket account.

2.  **Import Project**:
    - Click on "Add New..." -> "Project".
    - Select the Git repository where this project is hosted.
    - Vercel will automatically detect that it is a Next.js project and configure the build settings.

3.  **Configure Environment Variables**: This is the most important step. In the Vercel project dashboard, go to "Settings" -> "Environment Variables" and add the following variables:

    - `DATABASE_URL`: The connection string for your PostgreSQL database from Neon.com. It should look like `postgresql://user:password@host/dbname?sslmode=require`.
    - `AUTH_SECRET`: A long, random string used to sign session cookies. You can generate one by running `openssl rand -base64 32` in your terminal.
    - `SHARED_PASSWORD`: The plaintext shared password for the application.

4.  **Deploy**:
    - After configuring the environment variables, click the "Deploy" button.
    - Vercel will build and deploy your application.

### Post-Deployment Steps: Running Migrations and Seeding

Because of the network restrictions in this development environment, the database migration and seeding could not be run automatically. You will need to run these commands after the project is set up on Vercel or from a local machine that can connect to the database.

1.  **Install dependencies locally**: `npm install`
2.  **Run Migrations**: `npx prisma migrate dev --name init`
3.  **Seed the Database**: `npx prisma db seed` (Note: you may need to configure `ts-node` for this, by adding `"prisma": { "seed": "ts-node prisma/seed.ts" }` to `package.json` and running `npm install --save-dev ts-node`).
