"use client";
import React from "react";
import Slider from "react-slick";
import SliderItem from "./SliderItem";
import useSettingsStore from "@/store/useAuthStore";

export default function SimpleSlider({ slide }: { slide: any }) {
  const { blurMatured, postInNewTab } = useSettingsStore();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3.08,
    slidesToScroll: 1,
    rtl: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: false,
          slidesToShow: 2.08,
        },
      },
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          arrows: false,
          dots: false,
          autoplay: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} arrows={true}>
      {slide?.map((value: any) => {
        return (
          <SliderItem
            value={value}
            key={value.id}
            blurMatured={
              value.isMatured ? blurMatured === value.isMatured : false
            } // IF USER HAS TURNED ON THE BLURRED MATURE AND THE POST IS MATURE CONTENT
            postInNewTab={postInNewTab}
          />
        );
      })}
    </Slider>
  );
}
