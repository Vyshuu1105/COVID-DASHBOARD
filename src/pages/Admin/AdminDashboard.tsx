import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../context/CartContext';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'groceries' as Product['category']
  });

  useEffect(() => {
    // Load admin's products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem(`admin_products_${user?.id}`) || '[]');
    setProducts(savedProducts);
  }, [user]);

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem(`admin_products_${user?.id}`, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description,
      category: formData.category,
      adminId: user?.id
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
    } else {
      updatedProducts = [...products, newProduct];
    }

    saveProducts(updatedProducts);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: 'groceries'
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  className="input-field mt-1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleFormChange}
                  className="input-field mt-1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleFormChange}
                  className="input-field mt-1"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="input-field mt-1"
                >
                  <option value="groceries">Groceries</option>
                  <option value="shoes">Shoes</option>
                  <option value="dresses">Dresses</option>
                  <option value="cosmetics">Cosmetics</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleFormChange}
                  className="input-field mt-1"
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2 flex space-x-4">
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              My Products ({products.length})
            </h2>
          </div>
          
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">You haven't added any products yet.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary mt-4"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;