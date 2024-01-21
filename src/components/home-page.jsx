"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { CommitPage } from "./pages/commit-page";
import { BranchPage } from "./pages/branch-page";
import CommitInfoPage from "./pages/commit-info-page";
import axios from "axios";

const itemActions = {
  card: (item) => {
    // Perform actions for 'card' type
    // Example: addCardToMiroBoard(item);
  },
  shape: async (item) => {
    try {
      const shape = await miro.board.createShape({
        content: item.data.content,
        shape: item.data.shape,
        style: {
          color: item.style.color || "#ff0000", // Default text color: '#1a1a1a' (black)
          fillColor: item.style.fillColor || "#ffff00", // Default shape fill color: transparent (no fill)
          fontFamily: item.style.fontFamily || "arial", // Default font type for the text
          fontSize: parseInt(item.style.fontSize) || 14, // Default font size for the text, in dp
          textAlign: item.style.textAlign || "center", // Default horizontal alignment for the text
          textAlignVertical: item.style.textAlignVertical || "middle", // Default vertical alignment for the text
          borderStyle: item.style.borderStyle || "normal", // Default border line style
          borderOpacity: parseFloat(item.style.borderOpacity) || 1.0, // Default border color opacity: no opacity
          borderColor: item.style.borderColor || "#ff7400", // Default border color: '#ffffff` (white)
          borderWidth: parseFloat(item.style.borderWidth || 2), // Default border width
          fillOpacity: parseFloat(item.style.fillOpacity || 1.0), // Default fill color opacity: no opacity
        },
        x: item.position.x || 0, // Default value: center of the board
        y: item.position.y || 0, // Default value: center of the board
        width: item.geometry.width || 200,
        height: item.geometry.height || 200,
      });
      await miro.board.viewport.zoomTo(shape);
    } catch (error) {
      console.log("e", error);
    }

    // Output the created item to the developer console
  },
  sticky_note: async (item) => {
    try {
      const stickyNote = await miro.board.createStickyNote({
        content: item.data.content || "",
        style: {
          fillColor: item.style.fillColor || "light yellow",
          textAlign: item.style.textAlign || "center",
          textAlignVertical: item.style.textAlignVertical || "middle",
        },
        shape: item.data.shape || "square",
        x: item.position.x || 0,
        y: item.position.y || 0,
        width: item.geometry.width || 200,
      });
      await miro.board.viewport.zoomTo(stickyNote);
    } catch (error) {
      console.log("e", error);
    }
  },
  // You can add more item types and corresponding actions as needed
  // 'otherType': (item) => {
  //   // Perform actions for 'otherType' type
  //   // Example: addOtherTypeToMiroBoard(item);
  // },
};

export const HomePage = ({
  selectedCommit,
  setSelectedCommit,
  currentCommit,
  setCurrentCommit,
  value,
  setValue,
  board_id,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = async (commitId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/commits?id=${commitId}`);
      const data = response.data.commit.content || [];
      await deleteAllItems();
      await attachItems(data[0].data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllItems = async () => {
    try {
      const response = await getItems();
      const items = response.data;
      for (const item of items) {
        await deleteItem(item.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function attachItems(items) {
    try {
      for (const dataItem of items) {
        const itemType = dataItem.type;
        if (itemActions[itemType]) {
          await itemActions[itemType](dataItem);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteItem(item_id) {
    try {
      const options = {
        method: "DELETE",
        url: "https://api.miro.com/v2/boards/" + board_id + "/items/" + item_id,
        headers: {
          accept: "application/json",
          authorization:
            "Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_gMjOWoKKEEAb331Ryu2z6kL9FOc",
        },
      };

      const response = await axios.request(options);
    } catch (e) {
      console.log(e);
    }
  }

  async function getItems(id) {
    try {
      const options = {
        method: "GET",
        url: "https://api.miro.com/v2/boards/" + board_id + "/items",
        headers: {
          accept: "application/json",
          authorization:
            "Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_gMjOWoKKEEAb331Ryu2z6kL9FOc",
        },
      };

      const items = await axios.request(options);
      return items.data;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {isClient && (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              sx={{
                width: "100%",
              }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Details" />
              <Tab label="Commit" />
              <Tab label="Branches" />
            </Tabs>
          </Box>
          {value === 0 && (
            <CommitInfoPage
              selectedCommit={selectedCommit}
              setSelectedCommit={setSelectedCommit}
              handleClick={(commitId) => handleClick(commitId)}
              getItems={getItems}
              currentCommit={currentCommit}
              setCurrentCommit={setCurrentCommit}

            />
          )}
          {value === 1 && <CommitPage setCurrentCommit={setCurrentCommit} getItems={getItems} currentCommit={currentCommit}/>}
          {value === 2 && <BranchPage setCurrentCommit={setCurrentCommit} getItems={getItems} currentCommit={currentCommit}/>}
        </Box>
      )}
    </div>
  );
};
