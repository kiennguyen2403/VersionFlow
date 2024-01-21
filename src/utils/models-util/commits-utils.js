import Commit from "../../model/commit";
import { v4 as uuidv4 } from "uuid";
export const createCommit = async (commit) => {
  const { boardId, branch, previousCommitId, message, action, content } =
    commit;
  const newCommit = new Commit({
    id: uuidv4(),
    boardId,
    branch,
    previousCommitId,
    message,
    action,
    date: Date.now(),
    content,
  });
  await newCommit.save();
};

export const getCommit = async (boardId) => {
  return await Commit.find();
};

export const getCommitById = async (id) => {
  return await Commit.findById(id);
};

export const getCommitById_2 = async (id) => {
  return await Commit.find({ id: id });
};

export const getCommitByBranchId = async (id) => {
  return await Commit.find({ branchId: id });
};

export const getCommitByBoardId = async (id) => {
  return await Commit.find({ boardId: id });
};

export const deleteCommit = async (id) => {
  return await Commit.deleteOne({ _id: id });
};

export const deleteCommitByBoardId = async (id) => {
  return await Commit.deleteMany({ boardId: id });
};

export const updateCommit = async (id, data) => {
  const {} = data;
  const commit = await Commit.findById(id);

  await commit.save();
};
