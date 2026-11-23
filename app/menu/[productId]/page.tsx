import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCatalog } from "../data";
import MenuErrorBoundary from "../menu-error-boundary";
import menuStyles from "../menu.module.css";
import ProductForm from "./product-form";
import styles from "./product.module.css";

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map(({ id }) => ({ productId: id }));
}

export default function ProductPage({ params }: PageProps<"/menu/[productId]">) {
  return (
    <div className={menuStyles.screen}>
      <header className={menuStyles.header}>
        <p>Studieprojekt · ingen tilknytning til Shawarma King</p>
        <Link href="/menu">← Til menuen</Link>
      </header>
      <main className={styles.content}>
        <MenuErrorBoundary title="Retten kunne ikke hentes">
          <Suspense fallback={<div className={`${menuStyles.card} ${menuStyles.skeleton}`} aria-busy="true" aria-label="Henter retten" />}>
            <ProductDetails params={params} />
          </Suspense>
        </MenuErrorBoundary>
      </main>
    </div>
  );
}

async function ProductDetails({ params }: { params: PageProps<"/menu/[productId]">["params"] }) {
  const { productId } = await params;
  const catalog = await getCatalog();
  const product = catalog.find(({ id }) => id === productId);
  if (!product) notFound();
  const drinks = catalog.filter(({ category }) => category === "Drikkevarer");

  return (
    <>
      {product.image && (
        <Image
          src={product.image}
          alt=""
          width={640}
          height={640}
          sizes="(max-width: 460px) calc(100vw - 40px), 420px"
          className={styles.hero}
        />
      )}
      <h1>{product.name}</h1>
      <ProductForm product={product} drinks={drinks} />
    </>
  );
}
