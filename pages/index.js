import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "16px",
    paddingRight: "16px",
    fontSize: "1.2rem",
    lineHeight: "1.5"
  },
  title: {
    fontSize: "1.5rem",
    lineHeight: 1.4,
    margin: "1rem 0",
    paddingLeft: "16px",
    paddingRight: "16px",
  }
}));

export default function Home({ allPostsData }) {
  const classes = useStyles();
  return (
    <>
      <script src="/prism.js"></script>
      <Layout home>
        <Head>
          <title>Ching Yin's Blog</title>
        </Head>
        <section className={classes.root}>
          <p>
            Hello, I’m <b>Ching Yin</b>. I’m currently a year 3 colleague
            studying CS in CityU. I share my news recently on this blog. If you
            are interested with me, you can contact me on{" "}
            <a href="https://www.instagram.com/cyleungyo/">Instagram</a> or{" "}
            <a href="https://www.linkedin.com/in/cy-leung-139966198/">
              LinkedIn
            </a>
            .
          </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={classes.title}>Blog</h2>
          <ul className={utilStyles.list}>
            <List component="nav" aria-label="main mailbox folders">
              {allPostsData.map(({ id, date, title }) => (
                <ListItemLink href={"/posts/" + id}>
                  <li className={utilStyles.listItem} key={id}>
                    <Link href="/posts/[id]" as={`/posts/${id}`}>
                      <a>{title}</a>
                    </Link>
                    <br />
                    <small className={utilStyles.lightText}>
                      <Date dateString={date} />
                    </small>
                  </li>
                </ListItemLink>
              ))}
            </List>
          </ul>
        </section>
      </Layout>
    </>
  );
}
