import InnerBanner from "@/components/common/InnerBanner";
import Markdown from "react-markdown";
import { getSett } from "@/http/helper";
import SafeHtmlComponent from "@/components/common/SafeHtmlComponent";

export default async function policy() {
  const data = await getSett("web/agreement");
  return (
    <>
      <div className="col-lg-8">
        <InnerBanner title="User Agreement" />
        <div className="white-bg-shw content-box">
          {/* <Markdown>{data.agreement}</Markdown> */}
          <SafeHtmlComponent htmlContent={data.agreement} />
        </div>
      </div>
      <div className="col-lg-2"></div>
    </>
  );
}
