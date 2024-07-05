// import Swal from "sweetalert2";

import Swal from "sweetalert2";

export const TriggerSwal = (title: any, text: any, icon: any) => {
  // Changed on JUNE 19 to access .then() function
  return Swal.fire({
    title,
    text: text,
    icon,
    confirmButtonColor: "#40a2e3",
    allowOutsideClick: false,
    
  });
  // console.log(title,text,icon)
};
