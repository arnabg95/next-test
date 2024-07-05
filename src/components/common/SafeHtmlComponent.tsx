"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function SafeHtmlComponent({
  htmlContent,
}: {
  htmlContent: string;
}) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    if (htmlContent?.length === 0) return;

    const domPurify = DOMPurify(window);
    const cleanHtml = domPurify.sanitize(htmlContent);
    setSanitizedHtml(cleanHtml);
  }, [htmlContent]);

  if (!sanitizedHtml) return null;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      // style={{
      //   width: "100%",
      //   height: "100%",
      //   wordWrap: "break-word",
      //   overflowWrap: "break-word",
      //   whiteSpace: "pre-wrap",
      // }}
    ></div>
  );
}
