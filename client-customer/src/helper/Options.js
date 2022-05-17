import { toast } from "react-toastify";

export const errorAlert = (x) => {
  toast.clearWaitingQueue();
  toast.dismiss();
  toast.error(x, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: true,
  });
};
export const successAlert = (x) => {
  toast.success(x, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: true,
  });
};
export const warningAlert = (x) => {
  toast.clearWaitingQueue();
  toast.dismiss();
  toast.warning(x, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: true,
  });
};
export const infoAlert = (x) => {
  toast.clearWaitingQueue();
  toast.dismiss();
  toast.info(x, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: true,
  });
};
