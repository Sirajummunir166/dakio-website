// Developer docs home — the quickstart. English only (lib/docs.js).

import { notFound } from "next/navigation";
import DocsLayout from "../../../../components/docs/DocsLayout";
import { getDoc, docHref } from "../../../../lib/docs";

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata() {
  const doc = getDoc("");
  return {
    title: `${doc.title} — Dakio developer docs`,
    description: doc.description,
    alternates: { canonical: docHref(""), languages: { en: docHref(""), "x-default": docHref("") } },
  };
}

export default async function DocsHome({ params }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return <DocsLayout doc={getDoc("")} />;
}
