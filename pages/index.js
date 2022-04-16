import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App {styles.container}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        HOLA
      </Head>

      <Navbar />
      <main className={styles.main}>HOla</main>
      <Sidebar />
      <Footer />
    </div>
  );
}
