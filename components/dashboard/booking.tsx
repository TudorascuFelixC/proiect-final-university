import React from "react";
import Carousel from "./carousel";
import { firestoreDB, firebaseAuth } from "@/firebase.config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Book1 from "./book1";
import Book2 from "./book2";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Booking() {
  const [user, setUser] = React.useState<User | null>(null);
  const [currentId, setCurrentId] = React.useState<number>(1);
  const [remarkText, setRemarkText] = React.useState<string>("");
  const [loadingSendRemark, setLoadingSendRemark] =
    React.useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "info" | "warning" | "error" | undefined
  >("success");
  const [checked1, setChecked1] = React.useState<any>([]);
  const [checked2, setChecked2] = React.useState<any>([]);
  const [booked, setBooked] = React.useState<any>([]);
  const [dateTimePicked, setDateTimePicked] = React.useState<any>("");

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
    // Get the booking
    const unsubscribe = onSnapshot(
      doc(firestoreDB, "bookings", "UniversityMeeting"),
      (doc) => {
        if (doc.exists()) {
          // console.log("Document data:", doc.data());
          setBooked(doc.data().checked);
          setRemarkText(doc.data().remarkText);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const handleClose = (
    // Handle close snackbar
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: any) => {
    // Handle submit
    e.preventDefault(); // Prevent default form submit
    setLoadingSendRemark(true); // Set loading to true
    const data = {
      remarkText,
      checked: arrayUnion({ time: dateTimePicked, remarkText: remarkText }),
      user: user?.uid,
    };
    const docRef = doc(firestoreDB, "bookings", "UniversityMeeting"); // Get the document reference
    await setDoc(docRef, data, { merge: true }) // Set the document data
      .then(() => {
        setLoadingSendRemark(false);
        setSnackbarMessage("Booking saved successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error: any) => {
        setLoadingSendRemark(false);
        setSnackbarMessage("Error sending remark!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleChecked1 = (e: any) => {
    setChecked1(e);
  };

  const handleChecked2 = (e: any) => {
    setChecked2(e);
  };

  const getReservedHours = (booked: any) => {
    // console.log(booked);
    const reservedHours: any = {};

    booked.forEach((booking: any) => {
      const timestamp = booking.time.seconds;
      const date = dayjs.unix(timestamp).format("YYYY-MM-DD");
      const hour = dayjs.unix(timestamp).format("HH");

      if (!reservedHours[date]) {
        reservedHours[date] = [];
      }

      reservedHours[date].push(hour);
    });

    return reservedHours;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 flex flex-col justify-end items-end">
          <div className="absolute bottom-0 right-0 flex flex-col justify-between items-center gap-2 p-2 z-10">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                defaultValue={dayjs("2022-04-17T15:30")}
                views={["year", "month", "day", "hours", "minutes"]}
                onChange={(newValue) => {
                  setDateTimePicked(new Date(newValue));
                }}
                value={dateTimePicked}
                shouldDisableTime={(date) => {
                  const formattedDate = date.format("YYYY-MM-DD");
                  const reservedHours = getReservedHours(booked);

                  // Verificăm dacă data este rezervată și dacă ora este în listă
                  if (reservedHours[formattedDate]) {
                    const hour = date.format("HH");
                    // console.log(hour);
                    return reservedHours[formattedDate].includes(hour);
                  }

                  return false;
                }}
              />
              {/* {currentId == 1 ? (
                <Book1
                  itemId={currentId}
                  checked={booked}
                  setChecked={handleChecked1}
                />
              ) : (
                <Book2
                  itemId={currentId}
                  checked={booked}
                  setChecked={handleChecked2}
                />
              )} */}
            </LocalizationProvider>
          </div>
          <Carousel itemId={currentId} />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col gap-2">
          <div className="flex flex-col bg-gray-500 p-2 text-black rounded">
            He unaffected sympathize discovered at no am conviction principles.
            Girl ham very how yet hill four show. Meet lain on he only size.
            Branched learning so subjects mistress do appetite jennings be in.
            Esteems up lasting no village morning do offices. Settled wishing
            ability musical may another set age. Diminution my apartments he
            attachment is entreaties announcing estimating.
          </div>
          <form>
            <div className="w-full mb-4 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">
                  Write your remarks here...
                </label>
                <textarea
                  id="comment"
                  value={remarkText}
                  onChange={(e) => setRemarkText(e.target.value)}
                  rows={4}
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write your remarks here..."
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  onClick={handleSubmit}
                  disabled={loadingSendRemark}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  {loadingSendRemark ? "Sending..." : "Book Now"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-row justify-center pt-2">
        <div
          className="flex cursor-pointer border rounded p-2"
          onClick={() => {
            if (currentId == 1) setCurrentId(2);
            else if (currentId == 2) setCurrentId(1);
          }}
        >
          Next
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
