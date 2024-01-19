export const dynamic = 'force-dynamic';
import { mongoConnection } from "../../../utils/mongo-connection";
import { createProject, getProject, getProjectById, getProjectByUserId ,deleteProject, updateProject } from "../../../utils/models-util/projects-utls";

export async function GET(request) {
    const { searchParams } = new URL(request.nextUrl);
    const id = searchParams.get('id');
    try {
        await mongoConnection();
        if (id) {
            const project = await getProjectById(id);
            return Response.json({
                project,
            });
        } else {
            const projects = await getProject();
            return Response.json({
                projects
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
        const project = await createProject(body);
        return Response.json({
            project,
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
        const project = await updateProject(body);
        return Response.json({
            project,
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
        const project = await deleteProject(id);
        return Response.json({
            project,
        });
    } catch (e) {
        return Response.json({
            error: e,
        }, {
            status: 500,
        });
    }

}