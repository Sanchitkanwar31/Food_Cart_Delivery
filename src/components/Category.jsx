import React, { useState } from 'react';

function Category() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, price, category } = product;

    try {
      const response = await fetch('http://localhost:3000/api/addFoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, category }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Foo item added successfully:', data);
      } else {
        console.error('Error adding Foo item:', data.error);
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };


  return (
    <div className="tw-bg-slate-700 tw-p-4 tw-rounded tw-shadow-md tw-max-w-md tw-mx-auto tw-mt-10 tw-h-svh">
      <h2 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-4">Category Form</h2>
      <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
        <label className="tw-block tw-text-white tw-text-lg">
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="tw-w-full tw-p-2 tw-rounded tw-border tw-border-slate-500 tw-text-slate-700"
          />
        </label>
        <label className="tw-block tw-text-white tw-text-lg">
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="tw-w-full tw-p-2 tw-rounded tw-border tw-border-slate-500 tw-text-slate-700"
          />
        </label>
        <label className="tw-block tw-text-white tw-text-lg">
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="tw-w-full tw-p-2 tw-rounded tw-border tw-border-slate-500 tw-text-slate-700"
          />
        </label>
        <button
          type="submit"
          className="tw-bg-blue-500 tw-text-white tw-p-2 tw-rounded tw-w-full tw-cursor-pointer tw-transition tw-duration-200 tw-ease-in-out hover:tw-bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Category;