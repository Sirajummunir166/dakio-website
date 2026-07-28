import PricingClient from "../../components/pricing/PricingClient";
import PageJsonLd from "../../components/PageJsonLd";

export const metadata = {
  title: "Dakio Pricing — Plans in Taka, AI CEO Included | Free to Start",
  description:
    "Free forever to start. Growth ৳1,490/mo, Business ৳3,990/mo — every plan includes Nova. Honest task metering, no hidden fees, courier rates passed through.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageJsonLd route="/pricing" />
      <PricingClient />
    </>
  );
}
