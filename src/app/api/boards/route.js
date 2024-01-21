export const dynamic = 'force-dynamic';
import { mongoConnection } from "../../../utils/mongo-connection";
import { createBoard, getBoard, getBoardById, getBoardByProjectId ,deleteBoard } from "../../../utils/models-util/boards-utils";

export async function GET(request) {
    const { searchParams } = new URL(request.nextUrl);
    const id = searchParams.get('id');
    try {
        await mongoConnection();
        if (id) {
            const board = await getBoardById(id);
            return Response.json({
                board,
            });
        } else {
            const boards = await getBoard();
            return Response.json({
                boards
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
        const board = await createBoard(body);
        return Response.json({
            board,
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
    return Response.json({
        error: 'Method is not supported',
    }, {
        status: 500,
    });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.nextUrl);
    const id = searchParams.get('id');
    try {
        await mongoConnection();
        const board = await deleteBoard(id);
        return Response.json({
            board,
        });
    } catch (e) {
        return Response.json({
            error: e,
        }, {
            status: 500,
        });
    }

}