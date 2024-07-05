import { TriggerSwal } from "@/components/swal";
import { useRouter } from "next/navigation";

const ErrorSwal = ({ error }: { error: string }) => {
  const router = useRouter();
  if (error === "CredentialsSignin")
    TriggerSwal("Error", "Invalid Email or Password", "error")
  router.replace("/auth/signin");
  if (error === "Callback")
    TriggerSwal("Error", "Social Login Failed", "error")
  router.replace("/auth/signin");
  return null;
};

export default ErrorSwal;
