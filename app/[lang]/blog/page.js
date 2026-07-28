import BlogClient from "../../../components/blog/BlogClient";
import PageJsonLd from "../../../components/PageJsonLd";
import { posts, categories, ALL_CATEGORIES, formatDate } from "../../../lib/blog";
import { href, languageAlternates } from "../../../lib/i18n";
import blogEn from "../../../content/copy/blog.en";
import blogBn from "../../../content/copy/blog.bn";

const COPY = { en: blogEn, bn: blogBn };
const ROUTE = "/blog";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const meta = posts.map(({ Content, ...p }) => p);
  const formattedDates = Object.fromEntries(posts.map(p => [p.slug, formatDate(p.date)]));

  return (
    <>
      <PageJsonLd route={ROUTE} lang={lang} />
      <BlogClient
        lang={lang}
        copy={c}
        posts={meta}
        categories={categories}
        allCategories={ALL_CATEGORIES}
        formattedDates={formattedDates}
      />
    </>
  );
}
