import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Edit2, Trash2 } from 'lucide-react';

interface ProductForm {
    title: string,
    id: string,
    desc: string,
    price: number,
    url: string
}

const initialState: ProductForm = {
    title: "",
    id: uuidv4(),
    price: 0,
    desc: "",
    url: ""
}

const Home = () => {
    const [form, setForm] = useState<ProductForm>(initialState)
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: () => {
            return axios
                .get('https://676de1f5df5d7dac1cc940e9.mockapi.io/products')
                .then(res => res.data)
        }
    });

    const createProduct = useMutation({
        mutationFn: (newProduct: ProductForm) => {
            return axios.post('https://676de1f5df5d7dac1cc940e9.mockapi.io/products', newProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        }
    });

    const updateProduct = useMutation({
        mutationFn: (updatedProduct: ProductForm) => {
            return axios.put(`https://676de1f5df5d7dac1cc940e9.mockapi.io/products/${updatedProduct.id}`, updatedProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        }
    });

    const deleteProduct = useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`https://676de1f5df5d7dac1cc940e9.mockapi.io/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditing) {
            updateProduct.mutate(form);
            setIsEditing(false);
        } else {
            createProduct.mutate(form);
        }
        setForm(initialState);
    }

    const handleEdit = (product: ProductForm) => {
        setForm(product);
        setIsEditing(true);
    }

    const handleDelete = (id: string) => {
        deleteProduct.mutate(id);
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-purple-300">Product Manager</h1>
                
                <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-purple-400">{isEditing ? 'Update Product' : 'Create Product'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="title" className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50" placeholder="Title..." value={form.title} onChange={handleChange} />
                        <input type="number" name="price" className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50" placeholder="Price..." value={form.price} onChange={handleChange} />
                        <input type="text" name="url" className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50" placeholder="Image URL..." value={form.url} onChange={handleChange} />
                        <input type="text" name="desc" className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50" placeholder="Description..." value={form.desc} onChange={handleChange} />
                    </div>
                    <button className="mt-4 w-full px-4 py-2 font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 active:scale-95">
                        {isEditing ? 'Update Product' : 'Create Product'}
                    </button>
                </form>

                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-purple-400">Product List</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data?.map((product: ProductForm) => (
                            <div key={product.id} className="bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col">
                                <img src={product.url} alt={product.title} className="w-full h-40 object-cover" />
                                <div className="p-4 flex-grow flex flex-col">
                                    <h3 className="font-bold text-lg text-purple-300 mb-1 truncate">{product.title}</h3>
                                    <p className="text-green-400 font-semibold mb-2">${product.price}</p>
                                    <p className="text-gray-300 text-sm mb-4 flex-grow overflow-hidden">{product.desc}</p>
                                    <div className="flex justify-between mt-auto">
                                        <button onClick={() => handleEdit(product)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors duration-300 flex items-center text-sm">
                                            <Edit2 size={14} className="mr-1" />
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition-colors duration-300 flex items-center text-sm">
                                            <Trash2 size={14} className="mr-1" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

