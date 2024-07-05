import InnerBanner from "@/components/common/InnerBanner";
import SafeHtmlComponent from "@/components/common/SafeHtmlComponent";
import { getSett } from "@/http/helper";
import Markdown from "react-markdown";

export default async function policy() {
  const data = await getSett("web/privacy");
  return (
    <>
      <div className="col-lg-8">
        <InnerBanner title="Privacy Policy" />
        <div className="white-bg-shw content-box">
          {/* <Markdown>{data.privacy}</Markdown> */}
          <SafeHtmlComponent htmlContent={data.privacy} />
        </div>
      </div>
      <div className="col-lg-2"></div>
    </>
  );
}
