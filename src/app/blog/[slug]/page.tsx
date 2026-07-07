import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchAllBlogs, fetchBlogBySlug } from "../../lib/api";
import styles from "../../components/blog/blogPost.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await fetchAllBlogs();
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Parks of Ideas Blog`,
    description: post.shortDescription,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) notFound();

  const allBlogs = await fetchAllBlogs();
  const related = allBlogs.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 3);

  return (
    <main className={`min-h-screen relative ${styles.pageBg}`}>
      <Header />
      <article className={styles.article}>
        <div className={styles.heroSplit}>
          {/* Starry background overlay for the left side */}
          <div className={styles.heroStars} aria-hidden="true" />
          
          <div className={styles.heroTextContent}>
            <Link href="/blog" className={styles.backLink}>
              ← Back to Blog
            </Link>
            <span className={styles.badge}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.meta}>
              {new Date(post.publishedAt).toLocaleDateString()} · {post.readTime} min read
            </p>
            <p className={styles.lead}>{post.shortDescription}</p>
          </div>
          <div className={styles.heroImageWrap}>
            <Image src={post.image || "/assets/images/blog/default.jpg"} alt={post.title} fill priority className={styles.heroImgSplit} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.content }} />
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
                {related.map((item, index) => (
                  <Link key={item.id || item._id || index} href={`/blog/${item.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedImage}>
                      <Image src={item.image || "/assets/images/blog/default.jpg"} alt={item.title} fill sizes="300px" style={{ objectFit: "cover" }} />
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
