import Boarch from '../../models/boards';

export const createBoard = async (board) => {
    const { id, name } = board;
    const newBoard = new Boarch({
        id,
        name,
    });
    await newBoard.save();
};

export const getBoard = async () => {
    return await Boarch.find();
};

export const getBoardById = async (id) => {
    return await Boarch.findById(id);
};

export const deleteBoard = async (id) => {
    return await Boarch.deleteOne({ _id: id });
};
