import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { catalog, getProduct } from "../products";
import menuStyles from "../menu.module.css";
import ProductForm from "./product-form";
import styles from "./product.module.css";

export function generateStaticParams() {
  return catalog.map(({ id }) => ({ productId: id }));
}

export default async function ProductPage({ params }: PageProps<"/menu/[productId]">) {
  const { productId } = await params;
  const product = getProduct(productId);
  if (!product) notFound();

  return (
    <div className={menuStyles.screen}>
      <header className={menuStyles.header}>
        <p>Studieprojekt · ingen tilknytning til Shawarma King</p>
        <Link href="/menu">← Til menuen</Link>
      </header>
      <main className={styles.content}>
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
        <ProductForm product={product} />
      </main>
    </div>
  );
}
