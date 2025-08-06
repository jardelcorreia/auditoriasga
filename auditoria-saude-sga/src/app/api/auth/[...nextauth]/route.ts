import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Check if the password was provided
        if (!credentials?.password) {
          return null;
        }

        // Check if the environment variables are set
        const sharedPassword = process.env.SHARED_PASSWORD;
        if (!sharedPassword) {
          console.error("SHARED_PASSWORD is not set in .env file");
          return null;
        }

        // Perform a direct string comparison
        const isValid = credentials.password === sharedPassword;

        if (isValid) {
          // Any object returned will be saved in `user` property of the JWT
          // Since there are no real users, we return a static object
          return { id: '1' };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  // The AUTH_SECRET is not strictly necessary for Vercel deployments,
  // as it can be inferred from other environment variables.
  // secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login', // Redirect users to a custom login page
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
