import React from "react";
import Carousel from "./carousel";
import { firestoreDB, firebaseAuth } from "@/firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSendRemark(true);
    const data = {
      remarkText,
      user: user?.uid,
    };
    const docRef = doc(collection(firestoreDB, "remarks"));
    await setDoc(docRef, data)
      .then(() => {
        setLoadingSendRemark(false);
        setRemarkText("");
        setSnackbarMessage("Remark sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error: any) => {
        setLoadingSendRemark(false);
        console.error("Error adding document: ", error);
        setSnackbarMessage("Error sending remark!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="w-1/2">
          <Carousel itemId={currentId} />
        </div>
        <div className="w-1/2 p-4 flex flex-col gap-2">
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
                  {loadingSendRemark ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-row">
        <div
          className="cursor-pointer border rounded p-2"
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
