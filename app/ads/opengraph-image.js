import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dakio";

export default function Image() {
  return ogImage("Pick a product. Get the ad.");
}
