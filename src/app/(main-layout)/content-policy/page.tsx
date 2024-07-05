import InnerBanner from "@/components/common/InnerBanner";
import SafeHtmlComponent from "@/components/common/SafeHtmlComponent";
import { getSett } from "@/http/helper";
import Markdown from "react-markdown";

export default async function policy() {
  const data = await getSett("web/content");
  return (
    <>
      <div className="col-lg-8">
        <InnerBanner title="Content Policy" />
        <SafeHtmlComponent htmlContent={data.content} />
        {/* <Markdown></Markdown> */}
      </div>
      <div className="col-lg-2"></div>
    </>
  );
}
