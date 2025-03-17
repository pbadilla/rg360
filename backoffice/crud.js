// Example: CreateProductForm.jsx
import { useState } from 'react';
import { useCreateProduct } from '../hooks/useProductMutations';

const CreateProductForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { mutate, isPending } = useCreateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      title,
      price: parseFloat(price),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
};

export default CreateProductForm;
