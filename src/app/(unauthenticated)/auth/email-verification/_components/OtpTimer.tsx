"use client";

import { TriggerSwal } from "@/components/swal";
import { RESEND_VERIFICATION_URL } from "@/constants/urls";
import { fetchApi } from "@/http";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const OtpTimer = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const timeInterval = useRef<number>(25);
  const [seconds, setSeconds] = useState<number>(timeInterval.current);
  const [mount, setMount] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (!email) return router.replace("/auth/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  if (!mount) return <></>;

  const handleResendOtp = () => {
    timeInterval.current *= 2;
    setSeconds(timeInterval.current);
    setIsActive(true);
  };

  const SendOtp = () => {
    (async () => {
      try {
        const response = await fetchApi(
          `${RESEND_VERIFICATION_URL}?email=${email}`,
          {
            method: "POST",
          }
        );
        TriggerSwal("Success", response.message, "success");
      } catch (error: any) {
        TriggerSwal("Error", error.message, "error");
      }
    })();
    handleResendOtp();
  };

  return (
    <>
      Didn&apos;t get an email?{" "}
      {isActive ? (
        <button onClick={handleResendOtp} disabled={isActive} className="btn-resend">
          Resend Email in - 00:{seconds < 10 ? `0${seconds}` : seconds}
        </button>
      ) : (
        <button onClick={SendOtp} className="btn-resend">
          Resend Email
        </button>
      )}
    </>
  );
};

export default OtpTimer;
