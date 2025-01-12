import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addToCartHandler = () => {};

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="fdsfdsf"
          name="Mackbook"
          price={23491}
          stock={323}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
