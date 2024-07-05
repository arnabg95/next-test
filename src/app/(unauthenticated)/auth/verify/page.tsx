"use client";
import React from "react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyUserByToken } from "@/http/helper";
import { TriggerSwal } from "@/components/swal";
import Link from "next/link";
import Image from "next/image";
import CustomLoader from "@/components/Loader/CustomLoader";

const VerifyToken = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const { error, isLoading } = useSWR(token, verifyUserByToken, {
    shouldRetryOnError: false,
  });

  if (error)
    TriggerSwal(
      "Error",
      `<p>
        ${error.message} <br />
        <p>Please Contact Admin</p>
      </p>`,
      "error"
    )
    router.replace("/auth/signin");

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="right-bar forget-page position-relative">
            <div className="login-details">
              <h3>Your Account has been activated</h3>
              <div className="img-wraper">
                <Image
                  src="/assets/images/image1.png"
                  alt=""
                  width={500}
                  height={500}
                />
              </div>
              <div className="resend-text text-center">
                <p className="mb-0">
                  Please <Link href="/auth/signin">login</Link>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VerifyToken;

// http://localhost:3000/auth/verify?token=1e4aac4130779b7b60d68b7c096014f6b649ae61A

/**
 * @description ***BACKUP***
 * 
  useEffect(() => {
    (async () => {
      setMessage("loading");
      try {
        const response = await fetchApi(VERIFY_USER, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        setMessage("success");
      } catch (error) {
        console.log(error);
        setMessage("error");
      }
    })();
  }, []);
 */
