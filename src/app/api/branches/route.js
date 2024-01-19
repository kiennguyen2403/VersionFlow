export const dynamic = 'force-dynamic';
import { mongoConnection } from "../../../utils/mongo-connection";
import { createBranch, getBranch, getBranchById, getBranchByProjectId ,deleteBranch, updateBranch } from "../../../utils/models-util/branches-utls";

export async function GET(request) {
    const { searchParams } = new URL(request.nextUrl);
    const id = searchParams.get('id');
    try {
        await mongoConnection();
        if (id) {
            const branch = await getBranchById(id);
            return Response.json({
                branch,
            });
        } else {
            const branches = await getBranch();
            return Response.json({
                branches
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
        const branch = await createBranch(body);
        return Response.json({
            branch,
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
        const branch = await updateBranch(body);
        return Response.json({
            branch,
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
    const { searchParams } = new URL(request.nextUrl);
    const id = searchParams.get('id');
    try {
        await mongoConnection();
        const branch = await deleteBranch(id);
        return Response.json({
            branch,
        });
    } catch (e) {
        return Response.json({
            error: e,
        }, {
            status: 500,
        });
    }
}