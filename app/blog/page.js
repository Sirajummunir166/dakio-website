import BlogClient from "../../components/blog/BlogClient";
import PageJsonLd from "../../components/PageJsonLd";

export const metadata = {
  title: "Dakio Blog — ই-কমার্স গ্রোথ গাইড ও রিসোর্স",
  description:
    "Practical guides in Bangla and English on selling online in Bangladesh: COD, couriers, bKash, Facebook selling and growing with an AI CEO.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageJsonLd route="/blog" />
      <BlogClient />
    </>
  );
}
