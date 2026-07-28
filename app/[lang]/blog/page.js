import BlogClient from "../../../components/blog/BlogClient";
import PageJsonLd from "../../../components/PageJsonLd";
import { posts, categories, formatDate } from "../../../lib/blog";

export const metadata = {
  title: "Dakio Blog — ই-কমার্স গ্রোথ গাইড ও রিসোর্স",
  description:
    "Practical guides in Bangla and English on selling online in Bangladesh: COD, couriers, bKash, Facebook selling and growing with an AI CEO.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const meta = posts.map(({ Content, ...p }) => p);
  const formattedDates = Object.fromEntries(posts.map(p => [p.slug, formatDate(p.date)]));
  return (
    <>
      <PageJsonLd route="/blog" />
      <BlogClient posts={meta} categories={categories} formattedDates={formattedDates} />
    </>
  );
}
