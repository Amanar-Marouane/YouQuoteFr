import UserLayout from "../../layouts/UserLayout"
import { Context } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import QuoteCard from "../../components/QuoteCard";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import TagsInput from "../../components/TagsInput";
import AdminQuoteCard from "../../components/AdminQuoteCard";
const Index = () => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const { user } = useContext(Context);
    const [quotes, setQuotes] = useState(null);
    const [pendingQuotes, setPendingQuotes] = useState(null);
    const [editingQuote, setEditingQuote] = useState(null);
    const [types, setTypes] = useState(null);
    const [categories, setCategories] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        type_id: '',
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

    const Request = async () => {
        try {
            const response = await fetch(`${HOST}/quote/me`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });
            const res = await response.json();
            setQuotes(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPendingQuotes = async () => {
        try {
            const response = await fetch(`${HOST}/quote/me/pending`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });
            const res = await response.json();
            setPendingQuotes(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTypes = async () => {
        try {
            const response = await fetch(`${HOST}/type`, {
                credentials: 'include',
            });
            const res = await response.json();
            setTypes(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${HOST}/category`, {
                credentials: 'include',
            });
            const res = await response.json();
            setCategories(...res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (quoteId) => {
        if (!window.confirm('Are you sure you want to delete this quote?')) return;

        try {
            const response = await fetch(`${HOST}/quote/${quoteId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setQuotes(quotes.filter(quote => quote.id !== quoteId));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (quote) => {
        setEditingQuote(quote);
        setFormData({
            type: quote.type.type,
            quote: quote.quote,
            author: quote.author,
            category_id: quote.categories.map(cat => cat.id),
            tags: quote.tags,
            year: quote.content.year || '',
            publisher: quote.content.publisher || '',
            page_range: quote.content.page_range || '',
            issue: quote.content.issue || '',
            volume: quote.content.volume || '',
            url: quote.content.url || ''
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'type_id') {
            setFormData(prev => ({
                ...prev,
                type: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categorySelect = e.target.querySelector('select[name="category_id[]"]');
        const selectedValues = Array.from(categorySelect.selectedOptions).map(option => option.value);

        const submitData = {
            ...formData,
            category_id: selectedValues
        };

        console.log('Submitting data:', submitData);

        try {
            const response = await fetch(`${HOST}/quote/${editingQuote.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                setEditingQuote(null);
                Request();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        selectedOptions.forEach(option => {
            option.selected = true;
        });
    };

    const handleTagsChange = (newTags) => {
        setFormData(prev => ({
            ...prev,
            tags: newTags
        }));
    };

    useEffect(() => {
        Request();
        fetchPendingQuotes();
        fetchTypes();
        fetchCategories();
    }, [])

    return (
        <UserLayout>
            <section className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
                        <div className="text-gray-600 space-y-2">
                            <p><strong>Name:</strong> {user ? user.name : 'Loading ...'}</p>
                            <p><strong>Email:</strong> {user ? user.email : 'Loading ...'}</p>
                        </div>
                    </div>

                    {editingQuote && (
                        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Quote</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <select
                                        name="type_id"
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="" disabled>Select Type</option>
                                        {types?.map(type => {
                                            const isSelected = editingQuote?.type.type === type.type;
                                            return (
                                                <option
                                                    key={type.id}
                                                    value={type.type}
                                                    selected={isSelected}
                                                >
                                                    {type.type}
                                                </option>
                                            );
                                        })}
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
                                        name="category_id[]"
                                        onChange={handleCategoryChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        {categories?.map(category => {
                                            const isSelected = editingQuote?.categories.some(cat => cat === category.name);
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

                                {formData.type && (formData.type === 'Book' || formData.type === 'Article') && (
                                    <Input
                                        type="number"
                                        name="year"
                                        label="Year"
                                        value={formData.year}
                                        placeholder="Enter publication year"
                                        onChange={handleInputChange}
                                    />
                                )}

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
                                        onClick={() => setEditingQuote(null)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Quotes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingQuotes ? (
                                pendingQuotes.length > 0 ? (
                                    pendingQuotes.map((quote) => (
                                        <div key={quote.id} className="border rounded-lg p-4 bg-white shadow-md flex flex-col justify-between items-center gap-4">
                                            <AdminQuoteCard quote={quote} />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(quote)}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(quote.id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        You don't have any pending quotes.
                                    </div>
                                )
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    Loading your pending quotes...
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Quotes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quotes ? (
                                quotes.length > 0 ? (
                                    quotes.map((quote) => (
                                        <QuoteCard
                                            key={quote.id}
                                            quote={quote}
                                            showActions={true}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        You haven't published any quotes yet.
                                    </div>
                                )
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    Loading your quotes...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}

export default Index