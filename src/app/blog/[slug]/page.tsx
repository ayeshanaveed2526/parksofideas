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
              {post.date} · {post.readTime}
            </p>
            <p className={styles.lead}>{post.excerpt}</p>
          </div>
          <div className={styles.heroImageWrap}>
            <Image src={post.image} alt={post.title} fill priority className={styles.heroImgSplit} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.body}>
            <p className={styles.dropcap}>
              Fragrance is more than a scent — it is memory, mood, and identity woven
              into every note. At Parks of Ideas, we believe in curating experiences
              that feel personal, refined, and lasting.
            </p>
            <p>
              Whether you are exploring new accords or refining your signature
              style, this guide offers practical insight to help you choose with
              confidence and wear with intention. The journey to finding your signature scent is one of the most rewarding sensory experiences.
            </p>
            
            <blockquote className={styles.blockquote}>
              "A perfume is an intimate object, it is the reflector of the heart."
              <span>— Parks of Ideas</span>
            </blockquote>
            
            <h3 className={styles.heading3}>The Art of Selection</h3>
            <p>
              Finding the perfect fragrance is a journey of self-discovery. It requires patience and a willingness to explore notes you might not typically gravitate toward. Start by identifying the olfactory families that speak to you—be it the crisp vitality of citrus, the comforting warmth of woods, or the rich complexity of oriental spices.
            </p>
            <div className={styles.inlineImageWrap}>
              <Image src={post.image} alt="Detail view" fill className={styles.inlineImage} sizes="(max-width: 768px) 100vw, 800px" />
            </div>
            <p>
              Remember to test fragrances on your skin, not just on paper. The unique chemistry of your body will interact with the perfume's notes, creating a bespoke scent that is entirely yours. Allow the fragrance to dry down completely before making your final decision, as the base notes will be what you smell for the rest of the day.
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
