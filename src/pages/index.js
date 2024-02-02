import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import dateformat from "dateformat";
import { i18n } from "dateformat";

i18n.dayNames = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

i18n.monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const inter = Inter({ subsets: ["latin"] });


export default function Home({ data, error }) {
  console.log('data :>> ', data)
  console.log('error :>> ', error)

  useEffect(() => {
    console.log('process.env.NEXT_PUBLIC_BASE_URL :>> ', process.env.NEXT_PUBLIC_BASE_URL);
  }, [])

  return (
    <div>
      <Head>
        <title>CampañApp | Inicio</title>
        <meta name="description" content="Esta es una página donde puedes ver campañas disponibles y suscribirte a ellas"/>
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.main}>

        </div>

        <div className={styles.innerContent}>
          <h1 className={styles.title}>Campañas Disponibles</h1>
          
          {error&& <p>{error}</p>}

          {data.map((element) => (
            <div key={element.slug}>
              <Link href={"/" + element.slug}>
              <div className={styles.item}>
                  <div className={styles.imgContainer}>
                    <Image
                      className={styles.img}
                      src={'https://res.cloudinary.com/dvf7opqxb/' + element.image} 
                      height={120} 
                      width={120} 
                      alt="Imagen de campaña">
                    </Image>
                  </div>
                  <div className={styles.rightItems}>
                    <h1 className={styles.itemTitle}>{element.title}</h1>
                    <p>{element.description}</p>
                    <p className={styles.date}>{dateformat(new Date(element.created_at), "dddd, d 'de' mmmm 'de' yyyy")}</p>
                  </div>
                </div>
                </Link>
            </div>))}

            

        </div>
      </div>

        

        <footer className={styles.footer}>
          <p>
              CampañApp 
          </p>
        </footer>

    </div>
  );
}


export async function getStaticProps() {
  let data = []
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/`)
    data = await response.json()

  } catch(err) {
    console.log('err :>> ', err);
    error = err.message? err.message : "Algo salió mal";
  }


  return {
    props: {
      data,
      error
    }
  }
}