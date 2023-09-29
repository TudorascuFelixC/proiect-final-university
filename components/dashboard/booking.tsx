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
}); // Alert component to show the snackbar message to the user in the dashboard page of the application

export default function Booking() {
  // Booking component for booking the meeting room in the dashboard page of the application
  const [user, setUser] = React.useState<User | null>(null); // User state to store the user data from firebase if the user is logged in or null if the user is not logged in or logged out of the application from firebase authentication state
  const [currentId, setCurrentId] = React.useState<number>(1); // Current id state to store the current id of the meeting room to be booked in the dashboard page of the application (1 or 2) to be used in the carousel component to show the meeting room image and details to the user in the dashboard page of the application (1 for the first meeting room and 2 for the second meeting room) and to be used in the booking component to show the booking form to the user in the dashboard page of the application (1 for the first meeting room and 2 for the second meeting room)
  const [remarkText, setRemarkText] = React.useState<string>(""); // Remark text state to store the remark text from the user in the booking form in the dashboard page of the application to be used in the booking component to send the remark text to firebase
  const [loadingSendRemark, setLoadingSendRemark] =
    React.useState<boolean>(false); // Loading send remark state to store the loading state while sending the remark text to firebase in the booking component in the dashboard page of the application
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false); //
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "info" | "warning" | "error" | undefined
  >("success");
  const [checked1, setChecked1] = React.useState<any>([]); // Checked 1 state to store the checked time slots of the first meeting room from the user in the booking form in the dashboard page of the application to be used in the booking component to send the checked time slots to firebase
  const [checked2, setChecked2] = React.useState<any>([]); // Checked 2 state to store the checked time slots of the second meeting room from the user in the booking form in the dashboard page of the application to be used in the booking component to send the checked time slots to firebase
  const [booked, setBooked] = React.useState<any>([]); // Booked state to store the booked time slots of the meeting rooms from firebase to be used in the booking component to show the booked time slots to the user in the dashboard page of the application and to be used in the booking component
  const [dateTimePicked, setDateTimePicked] = React.useState<any>(""); // Date time picked state to store the date time picked by the user in the booking form in the dashboard page of the application to be used in the booking component to send the date time picked to firebase

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      // Get the user from firebase
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }); // Get the user from firebase authentication state when the component is mounted and unmount the component when the component is unmounted to prevent memory leaks in the dashboard page of the application (if the user is logged in, set the user state to the user data from firebase, if the user is not logged in or logged out of the application, set the user state to null)
  }, []);

  React.useEffect(() => {
    // Get the booking data from firebase
    const unsubscribe = onSnapshot(
      doc(firestoreDB, "bookings", "UniversityMeeting"),
      (doc) => {
        if (doc.exists()) {
          // console.log("Document data:", doc.data());
          setBooked(doc.data().checked); // Set the booked data
          setRemarkText(doc.data().remarkText); // Set the remark text
        }
      }
    );
    return () => unsubscribe();
  }, []); // Get the booking data from firebase when the component is mounted and unmount the component when the component is unmounted to prevent memory leaks in the dashboard page of the application

  const handleClose = (
    // Handle close snackbar event
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false); // Set snackbar open to false
  }; // Handle close snackbar event to close the snackbar message in the dashboard page of the application when the user clicks away from the snackbar message or clicks on the snackbar message

  const handleSubmit = async (e: any) => {
    // Handle submit event for booking
    e.preventDefault(); // Prevent default form submit event behavior (refreshing page)
    setLoadingSendRemark(true); // Set loading to true while sending remark to firebase
    const data = {
      remarkText,
      checked: arrayUnion({ time: dateTimePicked, remarkText: remarkText }), // Add the new booking to the array of bookings in firebase
      user: user?.uid,
    }; // Data to be sent to firebase (remark text, checked time slots, and user id) in the booking component in the dashboard page of the application
    const docRef = doc(firestoreDB, "bookings", "UniversityMeeting"); // Get the document reference from firebase
    await setDoc(docRef, data, { merge: true }) // Set the document data to the new data with merge option set to true to merge the new data with the old data in firebase
      .then(() => {
        setLoadingSendRemark(false);
        setSnackbarMessage("Booking saved successfully!"); // Set snackbar message to success message
        setSnackbarSeverity("success"); // Set snackbar severity to success severity
        setSnackbarOpen(true); // Set snackbar open to true to show the snackbar message to the user
      })
      .catch((error: any) => {
        setLoadingSendRemark(false); // Set loading to false if there is an error while sending remark to firebase
        setSnackbarMessage("Error sending remark!"); // Set snackbar message to error message
        setSnackbarSeverity("error"); // Set snackbar severity to error severity
        setSnackbarOpen(true); // Set snackbar open to true to show the snackbar message to the user
      });
  };

  const handleChecked1 = (e: any) => {
    setChecked1(e);
  }; // Handle checked 1 event to set the checked time slots of the first meeting room from the user in the booking form in the dashboard page of the application to be used in the booking component to send the checked time slots to firebase

  const handleChecked2 = (e: any) => {
    setChecked2(e);
  }; // Handle checked 2 event to set the checked time slots of the second meeting room from the user in the booking form in the dashboard page of the application to be used in the booking component to send the checked time slots to firebase

  const getReservedHours = (booked: any) => {
    // console.log(booked);
    const reservedHours: any = {};

    booked.forEach((booking: any) => {
      // Loop through the booked data from firebase to get the reserved hours from the booked data from firebase to be used in the booking component to show the booked time slots to the user in the dashboard page of the application and to be used in the booking component to disable the booked time slots in the booking form in the dashboard page of the application to prevent the user from booking the booked time slots again
      const timestamp = booking.time.seconds;
      const date = dayjs.unix(timestamp).format("YYYY-MM-DD");
      const hour = dayjs.unix(timestamp).format("HH");

      if (!reservedHours[date]) {
        reservedHours[date] = [];
      } // If the date is not in the reserved hours object, add it to the reserved hours object and set the value to an empty array

      reservedHours[date].push(hour);
    });

    return reservedHours;
  }; // Get the reserved hours from the booked data from firebase to be used in the booking component to show the booked time slots to the user in the dashboard page of the application and to be used in the booking component to disable the booked time slots in the booking form in the dashboard page of the application to prevent the user from booking the booked time slots again

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 flex flex-col justify-end items-end">
          <div className="absolute bottom-0 right-0 flex flex-col justify-between items-center gap-2 p-2 z-10 bg-gray-200">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                defaultValue={dayjs("2022-04-17T15:30")}
                views={["year", "month", "day", "hours", "minutes"]}
                onChange={(newValue) => {
                  setDateTimePicked(new Date(newValue));
                }} // Set the date time picked by the user in the booking form in the dashboard page of the application to be used in the booking component to send the date time picked to firebase
                value={dateTimePicked}
                shouldDisableTime={(date) => {
                  const formattedDate = date.format("YYYY-MM-DD");
                  const reservedHours = getReservedHours(booked);

                  // We are checking if the date is booked and if the time is in the list. If it is, we disable it.
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
            Feel free to use the Remarks section to specify any additional items
            you require, such as water, pens, papers, or any other specific
            needs. We are here to accommodate your preferences and make sure
            your request is fulfilled to your satisfaction.
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
      <div className="flex flex-row justify-center pt-4">
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
