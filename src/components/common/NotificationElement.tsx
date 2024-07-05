import { timeAgoFromCreation } from "@/helper/timeShow";
import Image from "next/image";
import React from "react";

const NotificationElement = ({ notification }: { notification: any }) => {
  console.log("123", notification);
  return (
    <div className="natify-wraper">
      <div className="natification-list">
        <div className="notification-img">
          <Image
            src={
              notification?.by?.profile_image
                ? notification?.by?.profile_image
                : "/assets/images/default-user.png"
            }
            alt=""
            width={64}
            height={64}
            unoptimized
          />
          <div className="notification-sm-img">
            <Image
              src={
                notification?.type === "like"
                  ? "/assets/images/iconamoon_like-light.png"
                  : notification?.type === "follow"
                  ? "/assets/images/follow-notification.png"
                  : "/assets/images/white-chat.png"
              }
              alt=""
              width={64}
              height={64}
              unoptimized
            />
          </div>
        </div>
        <div className="notification-content">
          <h4>{notification?.message ?? ""}</h4>
          <p>{timeAgoFromCreation(notification?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationElement;
