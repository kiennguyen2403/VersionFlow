import React from "react";
import { Card, Skeleton, Stack } from "@mui/material";

const Loading = () => {
  return (
    <div>
      <Stack spacing={1} width="100%" height="100%">
        {/* For variant="text", adjust the height via font-size */}
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangular" width="100%" height="20vh" />
        <Skeleton variant="rectangular" width="100%" height="10vh" />
        <Skeleton variant="rectangular" width="100%" height="20vh" />
        <Skeleton variant="rectangular" width="100%" height="10vh" />
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        {/* For other variants, adjust the size with `width` and `height` */}
      </Stack>
    </div>
  );
};

export default Loading;
