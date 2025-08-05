import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

export const authOptions = {
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
        const passwordHash = process.env.SHARED_PASSWORD_HASH;
        if (!passwordHash) {
          console.error("SHARED_PASSWORD_HASH is not set in .env file");
          return null;
        }

        // Compare the provided password with the stored hash
        const isValid = await compare(credentials.password, passwordHash);

        if (isValid) {
          // Any object returned will be saved in `user` property of the JWT
          // Since there are no real users, we return a static object
          return { id: '1', name: 'Auditor', email: 'auditor@sga.ce.gov.br' };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login', // Redirect users to a custom login page
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
