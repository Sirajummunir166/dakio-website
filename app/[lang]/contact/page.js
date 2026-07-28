import ContactClient from "../../../components/contact/ContactClient";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = {
  title: "Contact Dakio — Talk to a Human",
  description:
    "Questions or help? Reach the Dakio team in Dhaka — email, phone or the form. A human answers here; Nova only runs the stores.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageJsonLd route="/contact" />
      <ContactClient />
    </>
  );
}
