import InnerBanner from "@/components/common/InnerBanner";
import SafeHtmlComponent from "@/components/common/SafeHtmlComponent";
import { getSett } from "@/http/helper";
import Markdown from "react-markdown";

export default async function about() {
  const data = await getSett("web/about");
  return (
    <>
      <div className="col-lg-8">
        <InnerBanner title="About Moji AI" />
        <div className="white-bg-shw about-box">
          {/* <Markdown>{data.about}</Markdown> */}
          <SafeHtmlComponent htmlContent={data.about} />
        </div>
      </div>
      <div className="col-lg-2"></div>
    </>
  );
}
