import { getHotStories } from "@/http/helper";
import useSWR from "swr";
import SimpleSlider from "./Slider";
import SliderSkeleton from "./SliderSkeleton";

export default function SliderData() {
  const { data: slide, isLoading } = useSWR(
    "/web/get-hot-stories",
    getHotStories
  );

  return (
    <>
      {isLoading ? (
        <SliderSkeleton />
      ) : slide && slide?.length > 0 ? (
        <SimpleSlider slide={slide} />
      ) : (
        <h4 className="text-center">No hot stories</h4>
      )}
    </>
  );
}
