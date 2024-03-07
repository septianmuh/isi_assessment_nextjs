import { NextRequest, NextResponse } from "next/server";
import { getList } from "./service";

export async function GET(request: NextRequest) {
    try {
        const qParams = request.nextUrl.searchParams;
        const limit = parseInt(qParams.get('limit') || '10');
        const page = parseInt(qParams.get('page') || '1');
        const search = qParams.get('search') || '';
        let jsonData:any = {}
        const userData = await getList({
            limit,
            page,
            search,
        })
        jsonData = { data: userData, message: "get list data successfully" }, { status: 200, statusText: 'OK' }

        return NextResponse.json(jsonData);
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: error }, {status: 500, statusText: "ERROR"})
    }
}