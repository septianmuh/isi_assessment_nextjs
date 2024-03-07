import sequelize from '@/database/models';
import User from '@/database/models/Users';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcrypt"
import { encryptData } from '@/libs/EncDecrypt';

User.initialize(sequelize)

const getUser = async (email: string) => {
    try {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return null
        }

        return user.dataValues
    } catch (error) {
        console.error("Authorization error:", error);
        return null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Log In with ......',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials, req) {
                var { email, password } = credentials as any;
                const user = await getUser(email)
                if(!user){
                    throw new Error( "user's email not found" )
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    throw new Error( "password not match" )
                }

                const sessionID = await encryptData(user)
                return { user, sessionID } as any;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 100 * 60,
    },
    callbacks: {
        async signIn(signInc) {
            return true;
        },

        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...user
                };
            }

            const sessionID = (user as any)?.sessionID as string | null
            return { ...token, ...user }
        },

        async redirect({ url, baseUrl }) {
            return baseUrl + `/admin/dashboard`;
        },
        session({ session, user, token }): any {
            let newToken: any = { ...token };
            let data = {
                user_id: newToken.user_id,
                username: newToken.username,
                role_id: newToken.role_id,
                sessionID: newToken.sessionID,
            };
            session.user = {
                name: newToken.username,
            }
            return { ...session, ...data };
        },
    },
    pages: {
        signIn: '/auth/login',
    },
    events: {
        async signOut({ session, token }) {
        },
    },
};
