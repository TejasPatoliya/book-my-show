import { toast } from "react-toastify";

const autoClose = 3000;

export const successToastMessage = (message) => {
  toast.success(message, { autoClose });
};

export const errorToastMessage = (message) => {
  toast.error(message, { autoClose });
};

export const warningToastMessage = (message) => {
  toast.warning(message, { autoClose });
};
