import Branches from '../../models/branches';

export const createBranch = async (branch) => {
    const { id, name } = branch;
    const newBranch = new Branches({
        id,
        name,
    });
    await newBranch.save();
}

export const getBranch = async () => {
    return await Branches.find();
}

export const getBranchById = async (id) => {
    return await Branches.findById(id);
}

export const deleteBranch = async (id) => {
    return await Branches.deleteOne({ _id: id });
}