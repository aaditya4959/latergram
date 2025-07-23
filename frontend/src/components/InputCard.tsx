import axios from 'axios';
import React, { useState } from 'react';
//@ts-ignore
const IP_ADDRESS = process.env.BACKEND_IP;

export default function InputCard() {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    type: '',
    description: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here we have to update the logic to send the form Data to the backend
    axios.post(`${IP_ADDRESS}/api/v1/content` , {
      link: formData.url,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()), // Convert tags to array
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-start space-y-4">
      {/* Header */}
      <div className="w-full flex items-center">
        <h2 className="text-xl font-semibold text-left">+ Save New Content</h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        {/* Content Type Dropdown */}
        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">Content Type</label>
          <select
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="Twitter/X Post"
            name='type'
            onChange={handleChange}
          >
            <option>Twitter/X Post</option>
            <option>Youtube Video</option>
            <option>Custom</option>
          </select>
        </div>

        {/* URL */}
        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">URL</label>
          <input
            type="url"
            name="url"
            placeholder="https://twitter.com/..."
            value={formData.url}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Give this content a title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Add a brief description of what this content is about"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col items-start w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="ai, tutorial, tech (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Save Content
          </button>
        </div>
      </form>
    </div>
  );
}
