import { withAuth } from 'next-auth/middleware';

export default withAuth(
	function middleware(req) {
		// this function called after authorized
	},
	{
		callbacks: {
			authorized: async ({ token, req }) => {
                // return true
				if (req.nextUrl.pathname.startsWith('/admin')) {
                    if (!token) {
                        return false;
                    }
                    
                    const path = req.nextUrl.pathname
                    const permission = req.method
                    const body: any = {
                        url: path,
                        permission: permission,
                    };

                    if(path.includes("/api")) body.type_req = 'api'; else body.type_req = 'ui';
                    const headers: any = {
                        session_id: token.sessionID as string,
                    };

                    try {
                        const request = await fetch(`${process.env.NEXTAUTH_URL}/api/accessmenu`, {
                            method: 'POST',
                            headers: {
                                ...headers,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        });
                        const status = request.status;
                        if (status === 200) {
                            return true;
                        }
                        return false;
                    } catch (error) {
                        console.log({ error });
                        return false;
                    }
                }
                return true
			},
		},
	},
);
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|images|img|favicon.ico).*)'],
};