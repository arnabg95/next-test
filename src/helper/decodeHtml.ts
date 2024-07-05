import { htmlToText } from "html-to-text";

export const decodeHtmlEntities = (html: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

export const getRawCharsFromHtml = (htmlString: string) => {
  const plainText = htmlToText(htmlString, { wordwrap: false });
  const words = plainText.split(/\s+/);
  return words.join(" ");
};
