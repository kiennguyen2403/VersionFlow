import Commit from "../../model/commit";

export const createCommit = async (commit) => {
  const { boardId, branchId, previousCommitId, message, action, content } =
    commit;
  const newCommit = new Commit({
    boardId,
    branchId,
    previousCommitId,
    message,
    action,
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

export const getCommitByBranchId = async (id) => {
  return await Commit.find({ branchId: id });
};

export const deleteCommit = async (id) => {
  return await Commit.deleteOne({ _id: id });
};

export const updateCommit = async (id, data) => {
  const {} = data;
  const commit = await Commit.findById(id);

  await commit.save();
};
