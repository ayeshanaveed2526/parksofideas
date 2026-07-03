import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BLOG_POSTS, getBlogPostBySlug } from "../../data/blogPosts";
import styles from "../../components/blog/blogPost.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Parks of Ideas Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 3);

  return (
    <main className={`min-h-screen relative ${styles.pageBg}`}>
      <Header />
      <article className={styles.article}>
        <div className={styles.heroImage}>
          <Image src={post.image} alt={post.title} fill priority className={styles.heroImg} sizes="100vw" />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.container}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
          <span className={styles.badge}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.meta}>
            {post.date} · {post.readTime}
          </p>
          <p className={styles.lead}>{post.excerpt}</p>
          <div className={styles.body}>
            <p>
              Fragrance is more than a scent — it is memory, mood, and identity woven
              into every note. At Parks of Ideas, we believe in curating experiences
              that feel personal, refined, and lasting.
            </p>
            <p>
              Whether you are exploring new accords or refining your signature
              style, this guide offers practical insight to help you choose with
              confidence and wear with intention.
            </p>
          </div>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          {related.length > 0 && (
            <section className={styles.related}>
              <h2 className={styles.relatedTitle}>Related Posts</h2>
              <div className={styles.relatedGrid}>
                {related.map((item) => (
                  <Link key={item.id} href={`/blog/${item.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedImage}>
                      <Image src={item.image} alt={item.title} fill sizes="300px" style={{ objectFit: "cover" }} />
                    </div>
                    <h3>{item.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
