import Board from '../../model/board';

export const createBoard = async (board) => {
    const { id, users, commits } = board;
    const newBoard = new Board({
        id,
        users,
        commits
    });
    await newBoard.save();
};

export const getBoard = async () => {
    return await Board.find();
};

export const getBoardById = async (id) => {
    return await Board.findById(id);
};

export const deleteBoard = async (id) => {
    return await Board.deleteOne({ _id: id });
};
