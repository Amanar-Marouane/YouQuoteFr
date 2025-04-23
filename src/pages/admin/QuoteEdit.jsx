import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import TagsInput from "../../components/TagsInput";

const QuoteEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [quote, setQuote] = useState(null);
    const [types, setTypes] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        quote: '',
        author: '',
        category_id: [],
        tags: [],
        year: '',
        publisher: '',
        page_range: '',
        issue: '',
        volume: '',
        url: ''
    });

    const fetchQuote = async () => {
        try {
            const response = await fetch(`${HOST}/quote/${id}`, {
                credentials: 'include',
            });
            const res = await response.json();
            console.log('Fetched quote data:', res.data);
            console.log('Quote categories:', res.data.categories);
            setQuote(res.data);

            // Map category names to IDs
            const initialCategories = res.data.categories.map(categoryName => {
                const category = categories?.find(cat => cat.name === categoryName);
                console.log('Mapping category:', categoryName, 'to:', category);
                return category?.id;
            }).filter(id => id !== undefined);

            console.log('Initial category IDs:', initialCategories);
            setFormData(prev => ({
                ...prev,
                type: res.data.type.type,
                quote: res.data.quote,
                author: res.data.author,
                category_id: initialCategories,
                tags: res.data.tags,
                year: res.data.content.year || '',
                publisher: res.data.content.publisher || '',
                page_range: res.data.content.page_range || '',
                issue: res.data.content.issue || '',
                volume: res.data.content.volume || '',
                url: res.data.content.url || ''
            }));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching quote:', error);
            setError('Failed to fetch quote');
            setLoading(false);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await fetch(`${HOST}/type`, {
                credentials: 'include',
            });
            const res = await response.json();
            setTypes(res.data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${HOST}/category`, {
                credentials: 'include',
            });
            const res = await response.json();
            setCategories(...res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedValues = selectedOptions.map(option => option.value);
        setFormData(prev => ({
            ...prev,
            category_id: selectedValues
        }));
    };

    const handleTagsChange = (newTags) => {
        setFormData(prev => ({
            ...prev,
            tags: newTags
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${HOST}/quote/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/dashboard/quotes');
            } else {
                const res = await response.json();
                console.error('Error updating quote:', res);
                alert('Failed to update quote');
            }
        } catch (error) {
            console.error('Error updating quote:', error);
            alert('Failed to update quote');
        }
    };

    useEffect(() => {
        fetchQuote();
        fetchTypes();
        fetchCategories();
    }, [id]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-gray-500">
                            Loading quote details...
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={() => navigate('/dashboard/quotes')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Back to Quotes
                            </button>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Quote</h1>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>Select Type</option>
                                {types?.map(type => (
                                    <option key={type.id} value={type.type}>
                                        {type.type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            type="textarea"
                            name="quote"
                            label="Quote"
                            value={formData.quote}
                            placeholder="Enter your quote here"
                            onChange={handleInputChange}
                        />

                        <Input
                            type="text"
                            name="author"
                            label="Author"
                            value={formData.author}
                            placeholder="Enter author name"
                            onChange={handleInputChange}
                        />

                        <TagsInput
                            value={formData.tags}
                            onChange={handleTagsChange}
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Categories</label>
                            <select
                                multiple
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleCategoryChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                {categories?.map(category => {
                                    const isSelected = formData.category_id.includes(category.id);
                                    console.log(`Category ${category.name} (${category.id}) is selected:`, isSelected);
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            selected={isSelected}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <label className="block text-sm font-medium text-gray-700">
                                Categories <span className="text-gray-400">(Hold Ctrl or Cmd to select multiple)</span>
                            </label>
                        </div>

                        <Input
                            type="number"
                            name="year"
                            label="Year"
                            value={formData.year}
                            placeholder="Enter publication year"
                            onChange={handleInputChange}
                        />

                        {formData.type === 'Book' && (
                            <Input
                                type="text"
                                name="publisher"
                                label="Publisher"
                                value={formData.publisher}
                                placeholder="Enter publisher name"
                                onChange={handleInputChange}
                            />
                        )}

                        {formData.type === 'Article' && (
                            <>
                                <Input
                                    type="number"
                                    name="page_range"
                                    label="Page Range"
                                    value={formData.page_range}
                                    placeholder="Enter page range"
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type="text"
                                    name="issue"
                                    label="Issue"
                                    value={formData.issue}
                                    placeholder="Enter issue number"
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type="text"
                                    name="volume"
                                    label="Volume"
                                    value={formData.volume}
                                    placeholder="Enter volume number"
                                    onChange={handleInputChange}
                                />
                            </>
                        )}

                        {formData.type === 'Website' && (
                            <Input
                                type="url"
                                name="url"
                                label="URL"
                                value={formData.url}
                                placeholder="Enter website URL"
                                onChange={handleInputChange}
                            />
                        )}

                        <div className="flex gap-4">
                            <SubmitButton>
                                Update Quote
                            </SubmitButton>
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard/quotes')}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default QuoteEdit; 