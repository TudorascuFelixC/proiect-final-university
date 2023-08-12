import Button from "@mui/material/Button";
import React from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestoreDB, firebaseAuth } from "@/firebase.config";
import { User, onAuthStateChanged } from "firebase/auth";

export default function Book(props: any) {
  const [checked, setChecked] = React.useState<any>([]);
  const [booked, setBooked] = React.useState<any>([]);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      // Get the user
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  React.useEffect(() => {
    //merge booked and checked
    // console.log(checked);
    // console.log(booked);
    // console.log(checked.concat(booked));

    props.setChecked(booked);
    // console.log(
    //   checked.includes(
    //     props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"
    //   )
    // );
  }, [booked]);

  React.useEffect(() => {
    if (props.checked?.length > 0) {
      console.log(props.checked);
      setBooked(props.checked);
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <div className="flex items-end">
      <ul className="flex flex-col p-4 ">
        {/* <Button variant="contained" color="primary">
          {props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"}
        </Button>
        <Button variant="contained" color="primary">
          {props.itemId == 1 ? "9:00 - 10:00 AM" : "13:00 - 14:00 PM"}
        </Button>
        <Button variant="contained" color="primary">
          {props.itemId == 1 ? "10:00 - 11:00 AM" : "14:00 - 15:00 PM"}
        </Button> */}
        <li>
          <input
            type="checkbox"
            id={`option1${props.itemId}`}
            value={props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"}
            className="hidden peer"
            // checked={checked.includes(
            //   props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"
            // )}
            onChange={(e) => {
              console.log(e.target.checked);
              if (
                e.target.checked &&
                !booked.includes(
                  props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"
                )
              ) {
                setBooked([
                  ...booked,
                  props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM",
                ]);
              } else {
                console.log("unchecked");
                setBooked(
                  booked.filter(
                    (item: any) =>
                      item !=
                      (props.itemId == 1
                        ? "8:00 - 9:00 AM"
                        : "12:00 - 13:00 PM")
                  )
                );
              }
            }}
            disabled={checked.includes(
              props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"
            )}
          />
          <label
            htmlFor="react-option"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              {props.itemId == 1 ? "8:00 - 9:00 AM" : "12:00 - 13:00 PM"}
            </div>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            id={`option2${props.itemId}`}
            value={props.itemId == 1 ? "9:00 - 10:00 AM" : "13:00 - 14:00 PM"}
            className="hidden peer"
            onChange={(e) => {
              if (
                e.target.checked &&
                !booked.includes(
                  props.itemId == 1 ? "9:00 - 10:00 AM" : "13:00 - 14:00 PM"
                )
              ) {
                setBooked([
                  ...booked,
                  props.itemId == 1 ? "9:00 - 10:00 AM" : "13:00 - 14:00 PM",
                ]);
              } else {
                setBooked(
                  booked.filter(
                    (item: any) =>
                      item !=
                      (props.itemId == 1
                        ? "9:00 - 10:00 AM"
                        : "13:00 - 14:00 PM")
                  )
                );
              }
            }}
            disabled={checked.includes(
              props.itemId == 1 ? "9:00 - 10:00 AM" : "13:00 - 14:00 PM"
            )}
          />
          <label
            htmlFor="flowbite-option"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              {props.itemId == 1 ? "9:00 - 10:00 AM" : "13:00 - 14:00 PM"}
            </div>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            id={`option3${props.itemId}`}
            value={props.itemId == 1 ? "10:00 - 11:00 AM" : "14:00 - 15:00 PM"}
            className="hidden peer"
            onChange={(e) => {
              if (
                e.target.checked &&
                !booked.includes(
                  props.itemId == 1 ? "10:00 - 11:00 AM" : "14:00 - 15:00 PM"
                )
              ) {
                setBooked([
                  ...booked,
                  props.itemId == 1 ? "10:00 - 11:00 AM" : "14:00 - 15:00 PM",
                ]);
              } else {
                setBooked(
                  booked.filter(
                    (item: any) =>
                      item !=
                      (props.itemId == 1
                        ? "10:00 - 11:00 AM"
                        : "14:00 - 15:00 PM")
                  )
                );
              }
            }}
            disabled={checked.includes(
              props.itemId == 1 ? "10:00 - 11:00 AM" : "14:00 - 15:00 PM"
            )}
          />
          <label
            htmlFor={`option3${props.itemId}`}
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              {props.itemId == 1 ? "10:00 - 11:00 AM" : "14:00 - 15:00 PM"}
            </div>
          </label>
        </li>
      </ul>
    </div>
  );
}
