"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { Box } from "@mui/material";
import useSWR from "swr";
import { getNotifications } from "@/http/helper";
import NotificationElement from "./NotificationElement";
import { GET_NOTIFICATIONS_URL } from "@/constants/urls";
import CustomLoader from "../Loader/CustomLoader";

export default function NotificationMenu() {
  const [view, setView] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [notifications, setNotifications] = useState<any>([]);

  const { data, isLoading } = useSWR(
    `${GET_NOTIFICATIONS_URL}?page=${page}&limit=2`,
    getNotifications
  );

  // View Area Maintaining
  const actionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".test213")
      ) {
        setView(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionRef]);
  // View Area Maintaining

  useEffect(() => {
    if (data) {
      if (data[0]?.data?.length > 0) {
        setNotifications((predata: any) => {
          const combinedData = [...predata, ...data[0]?.data];
          const uniqueDataMap = new Map(
            combinedData.map((item: any) => [item._id, item])
          );
          const uniqueData = Array.from(uniqueDataMap.values());
          return uniqueData;
        });
      }
    }
  }, [data]);

  return (
    <div className="notification-main-wrap position-relative">
      <button
        className="notification-img position-relative test213"
        onClick={() => setView((prev) => !prev)}
      >
        <Image
          src="/assets/images/notification.png"
          alt="notification"
          width={22}
          height={26}
        />
        {notifications?.length ? <div className="notification-active" /> : null}
      </button>
      {view && (
        <Box className="natification-box-wrap">
          <div className="natification-box" ref={actionRef}>
            <div className="natification-header">
              <h4>
                Notification
                <span>
                  ({notifications?.length ? notifications?.length : 0})
                </span>
              </h4>
              <Link
                href="/settings/notification"
                onClick={() => setView((prev) => !prev)}
              >
                <Image
                  src="/assets/images/settings.png"
                  alt=""
                  width={64}
                  height={64}
                  unoptimized
                />
              </Link>
            </div>
            <div className="natification-list-wrap">
              {notifications?.length > 0 ? (
                notifications.map((e: any) => (
                  <Link
                    href={e?.link}
                    key={e?._id}
                    onClick={() => setView(false)}
                  >
                    <NotificationElement notification={e} />
                  </Link>
                ))
              ) : (
                <h6 className="text-center my-5">No Notifications</h6>
              )}
              {isLoading ? <CustomLoader /> : null}

              {data && page < data[0]?.pagination?.totalPages ? (
                <div className="show-notification">
                  <Button
                    type="button"
                    title="Show More"
                    className="light-btn"
                    onclick={() => setPage((page) => page + 1)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}
