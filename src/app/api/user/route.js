export const dynamic = 'force-dynamic';
import { mongoConnection } from "../../../utils/mongo-connection";
import { createUser, getUser, getUserById, getUserByProjectId ,deleteUser, updateUser } from "../../../utils/models-util/users-utils";

export async function GET(request) {
    const { searchParams } = new URL(request.nextUrl);
    const id = searchParams.get('id');
    try {
        await mongoConnection();
        if (id) {
            const user = await getUserById(id);
            return Response.json({
                user,
            });
        } else {
            const users = await getUser();
            return Response.json({
                users
            });
        }
    } catch (e) {
        return Response.json({
            error: e,
        }, {
            status: 500,
        });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await mongoConnection();
        const user = await createUser(body);
        return Response.json({
            user,
        });
    } catch (e) {
        return Response.json({
            error: e,
        }, {
            status: 500,
        });
    }

}

export async function PUT(request) {

    try {
        const body = await request.json();
        await mongoConnection();
        const user = await updateUser(body);
        return Response.json({
            user,
        });
    } catch (e) {
        return Response.json({
            error: e,
        }, {
            status: 500,
        });
    }

}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.nextUrl);
        const id = searchParams.get('id');
        await mongoConnection();
        const user = await deleteUser(id);
        return Response.json({
            user,
        });
    } catch (e) {
        return Response.json({
            error: e,
        }, {
            status: 500,
        });
    }
}
