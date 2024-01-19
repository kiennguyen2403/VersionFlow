import Commit from '../../models/commit'

export const createCommit = async (commit) => {
    const { id, name } = commit;
    const newCommit = new Commit({
        id,
        name,
    });
    await newCommit.save();
};

export const getCommit = async () => {
    return await Commit.find();
};

export const getCommitById = async (id) => {
    return await Commit.findById(id);
};

export const getCommitByBranchId = async (id) => {
    
};

export const deleteCommit = async (id) => {
    return await Commit.deleteOne({ _id: id });
};

export const updateCommit = async (id, data) => {
    const { } = data;
    const commit = await Commit.findById(id);

    await commit.save();
};