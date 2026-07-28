// Blog post detail — ported from dakio-landing/src/pages/BlogPost.jsx into the
// v3 site chrome. Statically generated for every post in lib/blog.

import { notFound } from "next/navigation";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import LogoDefs, { MK_PATH } from "../../../components/Logo";
import Thumb from "../../../components/blog/Thumb";
import { posts, getPost, relatedPosts, formatDate } from "../../../lib/blog";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dakio Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Content } = post;
  const related = relatedPosts(slug, 3);

  return (
    <div className="company-root" style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden", minHeight: "100vh" }}>
      <LogoDefs mkId="mk" wmId="wm" />
      <SiteNav ctaHref="/#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* Article header */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 28px 0" }}>
        <a href="/blog" className="hv-ink" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: "#8a8f7c" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          সব লেখা
        </a>

        <div style={{ marginTop: 24 }}>
          <span style={{ padding: "6px 13px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(27,30,21,0.10)", color: "#3E7A45", fontSize: 12, fontWeight: 600 }}>{post.category}</span>
        </div>

        <h1 style={{ margin: "18px 0 0", fontSize: 42, lineHeight: 1.25, letterSpacing: "-1.4px", fontWeight: 800 }}>{post.title}</h1>

        <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 99, background: "#1A1D12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 5.4 23 23" style={{ color: "#C6F035" }}><path fill="currentColor" d={MK_PATH} /></svg>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>Dakio টিম</div>
            <div style={{ fontSize: 12.5, color: "#8a8f7c", marginTop: 1 }}>{formatDate(post.date)} &nbsp;·&nbsp; {post.mins} মিনিট পড়া</div>
          </div>
        </div>

        <Thumb variant={post.thumb || "ink"} height={340} mark={120} radius={26} style={{ marginTop: 32 }} />
      </div>

      {/* Article body */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "44px 28px 0" }}>
        <Content />
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <div style={{ maxWidth: 1160, margin: "72px auto 0", padding: "0 28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, marginBottom: 22 }}>
            <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.8px", fontWeight: 750 }}>আরও পড়ুন</h2>
            <a href="/blog" className="hv-green" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: "#3E7A45" }}>
              সব লেখা <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {related.map(r => (
              <a key={r.slug} href={`/blog/${r.slug}`} className="hv-up3" style={{ display: "flex", flexDirection: "column", borderRadius: 22, background: "#FBFAF5", border: "1px solid rgba(27,30,21,0.06)", overflow: "hidden" }}>
                <Thumb variant={r.thumb || "cream"} height={130} mark={48} />
                <div style={{ padding: "18px 20px 22px" }}>
                  <div style={{ fontSize: 11.5, color: "#8a8f7c", fontWeight: 600 }}>{formatDate(r.date)} &nbsp;·&nbsp; {r.mins} min</div>
                  <div style={{ margin: "8px 0 0", fontSize: 15.5, fontWeight: 700, lineHeight: 1.45 }}>{r.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <div style={{ height: 24 }} />
      <SiteFooter />
    </div>
  );
}
