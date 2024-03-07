import { NextRequest, NextResponse } from 'next/server';
import { deleteUser, detailUser, getListUsers, saveData } from './service';
import { userCreateSchema, userUpdateSchema } from './schema';

export async function POST(request: NextRequest) {
    try {
        const body: any = await request.json();
        var dataBody = body['data']

        var { error, value } = userCreateSchema.validate(dataBody);
        if (error){
            return NextResponse.json({
                data: {
                    field: error.details[0].path,
                    message: error.message,
                    data: error.details
                },
                message: "error validation"
            }, { status: 400, statusText: "ERROR_VALIDATION"})
        }

        const userSaved = await saveData(value, 'create')
        if(userSaved.error){
            return NextResponse.json({data: null, message: userSaved.error}, { status: 400, statusText: 'ERROR_VALIDATION' })
        }

        return NextResponse.json({ data: userSaved, message: "save data successfully" }, { status: 200, statusText: 'OK' });

    } catch (error) {
        console.error(error)
        return NextResponse.json({message: error }, {status: 500, statusText: "ERROR"})
    }
}

export async function GET(request: NextRequest) {
    try {
        const qParams = request.nextUrl.searchParams;
        const limit = parseInt(qParams.get('limit') || '10');
        const page = parseInt(qParams.get('page') || '1');
        const search = qParams.get('search') || '';
        const id = qParams.get('user_id') || '';
        let jsonData:any = {}
        if(id){
            const userData = await detailUser(id)
            jsonData = { data: userData, message: "get detail user successfully" }, { status: 200, statusText: 'OK' }
        }else {
            const userData = await getListUsers({
                limit,
                page,
                search,
            })
            jsonData = { data: userData, message: "get list data successfully" }, { status: 200, statusText: 'OK' }
        }

        return NextResponse.json(jsonData);
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: error }, {status: 500, statusText: "ERROR"})
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const qParams = request.nextUrl.searchParams;
        const id = qParams.get('user_id') || '';
    	const body: any = await request.json();
        if(!id){
            return NextResponse.json({
                data: {
                    field: 'user_id',
                    message: 'user id is required',
                    data: null
                },
                message: "error validation"
            }, { status: 400, statusText: "ERROR_VALIDATION"})
        }

        var dataBody = body['data']
        var { error, value } = userUpdateSchema.validate(dataBody);
        if (error){
            return NextResponse.json({
                data: {
                    field: error.details[0].path,
                    message: error.message,
                    data: error.details
                },
                message: "error validation"
            }, { status: 400, statusText: "ERROR_VALIDATION"})
        }

        const userUpdated = await saveData({
            ...value, user_id: id
        }, 'update');

        if(userUpdated.error){
            return NextResponse.json({data: null, message: userUpdated.error}, { status: 400, statusText: 'ERROR_VALIDATION' })
        }

        return NextResponse.json({ data: userUpdated, message: "update data successfully" }, { status: 200, statusText: 'OK' });
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: error }, {status: 500, statusText: "ERROR"})
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const qParams = request.nextUrl.searchParams;
        const id = qParams.get('user_id') || '';
        if(!id){
            throw new Error('user id is required')
        }
        const delUser = await deleteUser(id)
        if(delUser.error){
            return NextResponse.json({data: null, message: delUser.error}, { status: 400, statusText: 'ERROR_VALIDATION' })
        }
        return NextResponse.json({ data: delUser, message: "delete data successfully" }, { status: 200, statusText: 'OK' });
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: error }, {status: 500, statusText: "ERROR"})
    }
}