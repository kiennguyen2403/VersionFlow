export const dynamic = "force-dynamic";
import { mongoConnection } from "../../../../utils/mongo-connection";
import {
  createCommit,
  getCommit,
  getCommitById,
  deleteCommit,
  updateCommit,
} from "../../../../utils/models-util/commits-utils";

export async function GET(request) {
  const { searchParams } = new URL(request.nextUrl);
  const id = searchParams.get("id");
  try {
    await mongoConnection();
    if (id) {
      const commit = await getCommitById(id);
      return Response.json({
        commit,
      });
    } else {
      const commits = await getCommit();
      return Response.json({
        commits,
      });
    }
  } catch (e) {
    return Response.json(
      {
        error: e,
      },
      {
        status: 500,
      }
    );
  }
}
