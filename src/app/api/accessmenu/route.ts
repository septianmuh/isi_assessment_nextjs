import { NextRequest, NextResponse } from "next/server";
import { checkAccessRole } from "./service";
import { decryptData } from "@/libs/EncDecrypt";

export async function POST(request: NextRequest) {
    try {
        const qParams = request.nextUrl.searchParams;
    	const body: any = await request.json();
        const HeadersList = request.headers
        const sessionID = HeadersList.get('session_id')

        if(!sessionID){
            return NextResponse.json({
                message: 'session not found'
            }, { status: 401, statusText: "ERROR"})
        }

        const sessionDecrypt = await decryptData(sessionID) as any
        if(!sessionDecrypt){
            return NextResponse.json({
                message: 'invalid session'
            }, { status: 401, statusText: "ERROR"})
        }
        const checkSession = await checkAccessRole({
            method: body['permission'],
            req_type: body['type_req'],
            role_id: sessionDecrypt.role_id,
            url_path: body['url'],
            user_id: sessionDecrypt.user_id,
        })

        if(!checkSession.isAuthorized){
            return NextResponse.json({
                message: checkSession.error || "unauthorized"
            }, { status: 401, statusText: "ERROR"})
        }
        return NextResponse.json({is_authorized: checkSession.isAuthorized}, { status: 200, statusText: 'OK' });

    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "something wrong, "}, { status: 422, statusText: 'ERROR' });
    }
}