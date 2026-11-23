import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCatalog } from "../data";
import MenuErrorBoundary from "../menu-error-boundary";
import menuStyles from "../menu.module.css";
import ProductForm from "./product-form";
import styles from "./product.module.css";

type Params = PageProps<"/menu/[productId]">["params"];

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map(({ id }) => ({ productId: id }));
}

export default function ProductPage({ params }: PageProps<"/menu/[productId]">) {
  return (
    <div className={menuStyles.screen}>
      <p className={menuStyles.menuNotice}>
        <span>Studieprojekt</span> · ingen tilknytning til Shawarma King
      </p>
      <header className={styles.topbar}>
        <Link className={styles.back} href="/menu" aria-label="Tilbage til menuen">
          ←
        </Link>
        <Suspense fallback={null}>
          <ProductName params={params} />
        </Suspense>
      </header>
      <main className={styles.content}>
        <MenuErrorBoundary title="Retten kunne ikke hentes">
          <Suspense fallback={<div className={`${styles.banner} ${menuStyles.skeleton}`} aria-busy="true" aria-label="Henter retten" />}>
            <ProductDetails params={params} />
          </Suspense>
        </MenuErrorBoundary>
      </main>
    </div>
  );
}

async function findProduct(params: Params) {
  const { productId } = await params;
  const catalog = await getCatalog();
  return { catalog, product: catalog.find(({ id }) => id === productId) };
}

async function ProductName({ params }: { params: Params }) {
  const { product } = await findProduct(params);
  return product ? <p className={styles.topTitle}>{product.name}</p> : null;
}

async function ProductDetails({ params }: { params: Params }) {
  const { catalog, product } = await findProduct(params);
  if (!product) notFound();
  const drinks = catalog.filter(({ category }) => category === "Drikkevarer");
  const photo = product.banner ?? product.image;

  return (
    <>
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={700}
          height={256}
          sizes="(max-width: 460px) calc(100vw - 40px), 420px"
          className={styles.banner}
          preload
        />
      ) : (
        <div className={styles.banner} />
      )}
      <ProductForm product={product} drinks={drinks} />
    </>
  );
}
