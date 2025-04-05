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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(product);
    };

    return (
        
        <div className='ml-80'>
        
        
        <form onSubmit={handleSubmit}  >
            <label>
                **Name:**
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                **Price:**
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                **Category:**
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}
export default Category;