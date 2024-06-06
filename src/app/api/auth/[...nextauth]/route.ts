import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth/auth";

// Do whatever you want here, before the request is passed down to `NextAuth`
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
