import styles from "../styles/page.module.css";
import HomeCompIndex from "@/components/home/ui";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Donate Next App</title>
        <meta name="description" content="Donate Next App crated by ...." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeCompIndex />
    </div>
  );
}
