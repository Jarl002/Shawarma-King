import Image from "next/image";
import Link from "next/link";
import { Carousel } from "./carousel";
import { StudyNotice } from "./study-notice";
import styles from "./page.module.css";

const gallery = [
  { src: "/gallery/pita-pa-tallerken.png", alt: "Pitabrød med shawarma og tomat på en tallerken omgivet af hummus og falafel" },
  { src: "/gallery/kebabtallerken.png", alt: "Kebabtallerken med kød, rødkål, tomat, løg og en skål pommes frites" },
  { src: "/gallery/tyrkisk-brod.png", alt: "Tyrkisk brød fyldt med kød, salat, tomat og rødløg" },
  { src: "/gallery/falafel.png", alt: "Falafel med salat, pommes frites, hummus og dressing" },
  { src: "/gallery/pommes-frites.png", alt: "En skål pommes frites på et træbord" },
];

const reviews = [
  {
    name: "Anton T.",
    text: "Best lamb durum in dk, I live in Copenhagen but have yet to find anyone who can compete. Always good service, positively bubbly at times, infectious happiness in dark times.",
  },
  {
    name: "Ben J",
    text: "Without a doubt the best shawarma I've ever had. The meat is seasoned perfectly and the condiments are fresh and flavorful. An absolutely essential stop when visiting Aarhus.",
  },
  {
    name: "Grace J.",
    text: "AMAZING shawarma and the staff were very friendly! My Danish isn't so good yet so they switched to English and asked me about my experience in Denmark so far. Lovely people and great food!",
  },
];

const faq = [
  {
    question: "Which dishes do you serve?",
    answer: "Durum rolls, homemade pita, kebab mix and Turkish bread – with beef, lamb, chicken or falafel. See everything on the menu.",
  },
  {
    question: "Do you offer delivery or takeaway?",
    answer: "Both. When you order here, you choose pickup at Immervad 1 E or delivery at checkout.",
  },
  {
    question: "Where are you located?",
    answer: "Immervad 1 E st, 8000 Aarhus – right in the middle of Aarhus C.",
  },
  {
    question: "Which areas do you deliver to?",
    answer: "We deliver in Aarhus. Enter your address at checkout to see if we deliver to you.",
  },
];

const openingHours = [
  { days: "Mon", hours: "10:00 – 02:00" },
  { days: "Tue", hours: "10:00 – 03:00" },
  { days: "Wed–Thu", hours: "10:00 – 04:00" },
  { days: "Fri–Sat", hours: "10:00 – 06:00" },
  { days: "Sun", hours: "10:00 – 24:00" },
];

export default function Home() {
  return (
    <div className={styles.landing} lang="en">
      <div className={styles.topbar}>
        <StudyNotice />
        <header className={styles.header}>
          <span className={styles.brand}>Shawarma King</span>
          <Link className={styles.orderButton} href="/menu">
            Order now
          </Link>
          <details className={styles.navigation}>
            <summary aria-label="Navigation">
              <span aria-hidden="true" />
            </summary>
            <nav aria-label="Landingsside" lang="da">
              <a href="#galleri">Galleri</a>
              <a href="#anmeldelser">Anmeldelser</a>
              <a href="#faq">FAQ</a>
              <a href="#kontakt">Kontakt og åbningstider</a>
              <a href="#om-projektet">Om projektet</a>
            </nav>
          </details>
        </header>
      </div>

      <main>
        <section className={styles.heroSection}>
          <div className={styles.intro}>
            <h1>Shawarma King<br />Aarhus</h1>
            <p className={styles.tagline}>
              The taste of the Middle East in the middle of Aarhus
            </p>
          </div>
          <Image
            className={styles.heroImage}
            src="/landing-shawarma-pita.png"
            alt="Pitabrød med shawarma, rødkål, tomat og salat, serveret med pommes frites"
            lang="da"
            width={700}
            height={520}
            sizes="(max-width: 460px) calc(100vw - 40px), 420px"
            preload
          />
          <p className={styles.description}>
            From slow-grilled, juicy shawarma to freshly baked pita and Turkish
            bread – every meal is prepared with care and flavor in focus.
          </p>
        </section>

        <section className={styles.gallery} id="galleri" aria-labelledby="galleri-titel">
          <h2 id="galleri-titel" className={styles.sectionTitle}>Gallery</h2>
          <Carousel
            label="Billeder af maden"
            itemLabel="Billede"
            hint={<p className={styles.swipeHint}>Swipe for more photos</p>}
          >
            {gallery.map((photo) => (
              <Image
                key={photo.src}
                className={styles.galleryImage}
                src={photo.src}
                alt={photo.alt}
                lang="da"
                width={600}
                height={452}
                sizes="300px"
              />
            ))}
          </Carousel>
        </section>

        <section className={styles.reviews} id="anmeldelser" aria-labelledby="anmeldelser-titel">
          <h2 id="anmeldelser-titel" className={styles.sectionTitle}>Reviews</h2>
          <Carousel label="Anmeldelser" itemLabel="Anmeldelse" className={styles.reviewCarousel}>
            {reviews.map((review) => (
              <figure key={review.name} className={styles.reviewCard}>
                <blockquote>&quot;{review.text}&quot;</blockquote>
                <figcaption>{review.name}</figcaption>
              </figure>
            ))}
          </Carousel>
        </section>

        <section className={styles.faq} id="faq" aria-labelledby="faq-titel">
          <h2 id="faq-titel" className={styles.sectionTitle}>FAQ</h2>
          <div className={styles.faqList}>
            {faq.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  {item.answer}
                  {item.question === "Which dishes do you serve?" && (
                    <> <Link href="/menu">Go to the menu</Link></>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="kontakt">
        <p className={styles.footerBrand}>Shawarma King</p>
        <p className={styles.footerText}>
          Authentic shawarma, freshly made in the heart of Aarhus. Every day
          with passion and the best ingredients.
        </p>
        <div className={styles.footerColumns}>
          <section aria-labelledby="kontakt-titel">
            <h2 id="kontakt-titel">Contact us</h2>
            <address>
              Immervad 1 E st, 8000 Aarhus
              <br />
              <a href="tel:+4528866968">+45 28 86 69 68</a>
            </address>
          </section>
          <section aria-labelledby="abningstider-titel">
            <h2 id="abningstider-titel">Opening hours</h2>
            <dl className={styles.hours}>
              {openingHours.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.hours}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        <p className={styles.footerMeta}>
          <a href="https://www.findsmiley.dk/" rel="noreferrer" target="_blank">Smiley Report</a>
          {" · "}VAT no: 41435844
        </p>
        <p className={styles.copyright}>
          Copyright © 2026 Shawarma King. All rights reserved
        </p>
        <p className={styles.copyright} id="om-projektet" lang="da">
          Studieprojekt · ingen tilknytning til Shawarma King
        </p>
      </footer>

      <div className={styles.orderBar}>
        <Link className={styles.orderButton} href="/menu">
          Order now
        </Link>
      </div>
    </div>
  );
}
