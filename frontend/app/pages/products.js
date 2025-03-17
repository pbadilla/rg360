// ProductsList.jsx
import { useProducts } from '../hooks/useProducts';

const ProductsList = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
