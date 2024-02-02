import React, { useState } from "react";
import dateformat from "dateformat";
import { i18n } from "dateformat";
import styles from "../styles/Detail.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";


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


function CampaignDetail({ data }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: "POST",
            body: JSON.stringify({
                email,
                campaign: data.id
            }),

            headers: {
                'Content-Type': "application/json",
            }
        }

        setIsSubmitting(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscribers/`, options)
        .then(res => res.json())
        .then(response => {
            setIsSubmitted(true);
        })
        .catch(error => console.log('error: ', error))
        .finally(() => {
            setIsSubmitting(false);
        })
    }

    return(
        <div>
            <Head>
                <title>CampañApp | {data.title}</title>
                <meta name="description" content={data.description}/>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.main}>

                </div>

                <div className={styles.contents}>
                    <Image
                      className={styles.img}
                      src={'https://res.cloudinary.com/dvf7opqxb/' + data.image} 
                      height={120} 
                      width={120} 
                      alt="Imagen de campaña">
                    </Image>

                    <div className={styles.grid}>
                        <div className={styles.leftColumn}>
                            <h1 className={styles.itemTitle}>{data.title}</h1>
                            <p className={styles.description}>{data.description}</p>
                            <p className={styles.date}>{dateformat(new Date(data.created_at), "dddd, d 'de' mmmm 'de' yyyy")}</p>
                        </div>

                        <div className={styles.rightColumn}>
                            {!isSubmitted ? 
                            <div className={styles.rightContents}>
                                <form onSubmit={handleSubmit}> 
                                    <div className={styles.formGroup}>
                                        <input
                                          onChange={(e) => {setEmail(e.target.value)}}
                                          value={email} 
                                          type="email" 
                                          name="email" 
                                          placeholder="Ingrese su email" 
                                          className={styles.input} 
                                          required/>
                                    </div>

                                    <div className={styles.submit}>
                                        <input type="submit" value={isSubmitting ? "SUSCRIBIENDO..." : "SUSCRIBIRSE"} disabled={isSubmitting} className={styles.button}/> 
                                        <p className={styles.consent}>Respetamos su privacidad, puedes cancelar la suscripción en cualquier momento.</p>                                    
                                    </div>
                                </form>
                            </div> 
                            : 
                            <div className={styles.subscribed}>
                                <div className={styles.icon}>
                                    <FaCheckCircle size={17} color="green"/>
                                </div>
                                <div className={styles.message}>
                                    Gracias por su suscripción!
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.item}>
                  <div className={styles.imgContainer}>
                    
                  </div>
                  <div className={styles.rightItems}>

                  </div>

                  <footer className={styles.footer}>
                    <Link href="/">
                        Volver a la página principal
                    </Link>
                  </footer>
                </div>
        </div>
    )
}

export async function getStaticPaths() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/`)
    const data = await response.json()

    const allSlugs = data.map(item => item.slug) 
    const paths = allSlugs.map(slug => ({ params: { slug: slug }}))

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${params.slug}/`)
    const data = await response.json()

    return {
        props: {
            data
        }
    }
}

export default CampaignDetail