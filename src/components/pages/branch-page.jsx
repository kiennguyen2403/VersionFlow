"use client";
import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

export const BranchPage = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [branch, setBranch] = useState("");

  const postData = async () => {
    try {
      setIsLoading(true);
      const options = {
        method: "POST",
        url: "http://localhost:3000/api/commits",
        body: {},
      };
      const response = await axios.request(options);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "5rem",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <TextField
        id="branch-name"
        label="Branch Name"
        multiline
        rows={1}
        variant="outlined"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <LoadingButton
        onClick={async () => {
          await postData();
        }}
        loading={isLoading}
        variant="contained"
      >
        Create branch
      </LoadingButton>
    </div>
  );
};
