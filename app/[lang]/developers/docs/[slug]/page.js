// One developer docs page. English only (lib/docs.js).

import { notFound } from "next/navigation";
import DocsLayout from "../../../../../components/docs/DocsLayout";
import { docs, getDoc, docHref } from "../../../../../lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.filter(d => d.slug).map(d => ({ lang: "en", slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — Dakio developer docs`,
    description: doc.description,
    alternates: { canonical: docHref(slug), languages: { en: docHref(slug), "x-default": docHref(slug) } },
  };
}

export default async function DocPage({ params }) {
  const { lang, slug } = await params;
  const doc = getDoc(slug);
  if (lang !== "en" || !doc || !slug) notFound();
  return <DocsLayout doc={doc} />;
}
