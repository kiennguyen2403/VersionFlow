import React from "react";
import initMiroAPI from "../utils/initMiroAPI";
import "../assets/style.css";
import PageWrapper from "../components/page-wrapper";

const getBoards = async () => {
    const { miro, userId } = initMiroAPI();

    // redirect to auth url if user has not authorized the app
    if (!userId || !(await miro.isAuthorized(userId))) {
        return {
            authUrl: miro.getAuthUrl(),
        };
    }

    const api = miro.as(userId);

    const boards = [];
    for await (const board of api.getAllBoards()) {
        boards.push(board);
    }

    return {
        boards,
    };
};

export default async function Page() {
    const { boards, authUrl } = await getBoards();

    return <PageWrapper />;
}
