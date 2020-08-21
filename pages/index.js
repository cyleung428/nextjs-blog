import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <>
      <script src="/prism.js"></script>
      <Layout home>
        <Head>
          <title>Ching Yin's Blog</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>
            Hello, I’m <b>Ching Yin</b>. I’m currently a year 3 colleague
            studying CS in CityU. I share my news recently on this blog. If you
            are interested with me, you can contact me on{" "}
            <a href="https://www.linkedin.com/in/cy-leung-139966198/">
              LinkedIn
            </a>
            .
          </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
}
