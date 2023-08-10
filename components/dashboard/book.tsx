import Button from "@mui/material/Button";
import React from "react";

export default function Book(props: any) {
  return (
    <div>
      <div className="flex flex-col">
        <Button variant="contained" color="primary">
          {props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"}
        </Button>
        <Button variant="contained" color="primary">
          {props.itemId == 1 ? "9:00 - 10:00 AM" : "13:00 - 14:00 PM"}
        </Button>
        <Button variant="contained" color="primary">
          {props.itemId == 1 ? "10:00 - 11:00 AM" : "14:00 - 15:00 PM"}
        </Button>
      </div>
    </div>
  );
}
