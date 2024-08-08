import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({ featuredProduct, newProducts, collectionProduct }) {
  return (
    <main className={`min-h-screen p-4 bg-background `}>

      <Hero product={featuredProduct} />

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />
      <Collection product={collectionProduct} />
    </main>
  )

}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredId = '66b4d7797ccfa54e4dc02852';
  const collectionId = '66b4e182acd78644c5d578fe';

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, { sort: { '_id': 1 }, limit: 5 })
  // const allProducts = await Product.find({}, null, { sort: { '_id': 1 } })

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      // allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }
}