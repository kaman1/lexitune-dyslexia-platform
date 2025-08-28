import Script from "next/script";
import { solutionsMetadata } from "../solutions-section/metadata";

export function SolutionsSchema() {
  return (
    <Script
      id="solutions-schema"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(solutionsMetadata.schema)}
    </Script>
  );
}
