import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    CategoryName: '',
    name: '',
    img: '',
    options: {
      half: '',
      full: ''
    },
    description: '',
    type: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'half' || e.target.name === 'full') {
      setForm({ ...form, options: { ...form.options, [e.target.name]: e.target.value } });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const { CategoryName, name, img, options, description, type } = form;

    try {
      const response = await fetch('http://localhost:3000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CategoryName, name, img, options, description, type }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Food Item item added successfully:', data);
      } else {
        console.error('Error adding Foo item:', data.error);
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div className="tw-bg-slate-700 tw-p-4 tw-rounded tw-shadow-md tw-max-w-md tw-mx-auto tw-mt-10 tw-h-screen">
      <h1 className="tw-text-lg tw-font-bold tw-mb-4 tw-text-white">Form</h1>
      <form onSubmit={handleSubmit} className="tw-space-y-4">
        <div className="tw-form-group">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Category Name:</label>
          <input
            type="text"
            name="CategoryName"
            value={form.CategoryName}
            onChange={handleChange}
            className="tw-block tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-bg-slate-800 tw-text-white"
          />
        </div>
        <div className="tw-form-group">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="tw-block tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-bg-slate-800 tw-text-white"
          />
        </div>
        <div className="tw-form-group">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Image:</label>
          <input
            type="text"
            name="img"
            value={form.img}
            onChange={handleChange}
            className="tw-block tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-bg-slate-800 tw-text-white"
          />
        </div>
        <div className="tw-form-group">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Options:</label>
          <div className="tw-flex tw-space-x-4">
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Half:</label>
              <input
                type="number"
                name="half"
                value={form.options.half}
                onChange={handleChange}
                className="tw-block tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-bg-slate-800 tw-text-white"
              />
            </div>
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Full:</label>
              <input
                type="number"
                name="full"
                value={form.options.full}
                onChange={handleChange}
                className="tw-block tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-bg-slate-800 tw-text-white"
              />
            </div>
          </div>
        </div>
        <div className="tw-form-group">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="tw-block tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-bg-slate-800 tw-text-white"
          />
        </div>
        <div className="tw-form-group">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2 tw-text-white">Type:</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="tw-block tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500 tw-bg-slate-800 tw-text-white"
          />
        </div>
        <button
          type="submit"
          className="tw-bg-blue-500 tw-hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;