import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dakio";

export default function Image() {
  return ogImage("Your store's AI Acting CEO, on duty 24/7.");
}
