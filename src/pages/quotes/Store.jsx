import { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import Input from "../../components/Input";
import TagsInput from "../../components/TagsInput";

const Store = () => {
    const navigate = useNavigate();
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [types, setTypes] = useState(null);
    const [categories, setCategories] = useState(null);
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

    const Types = async () => {
        try {
            const response = await fetch(`${HOST}/type`, {
                credentials: 'include',
            })

            const res = await response.json();
            setTypes([...res.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const Categories = async () => {
        try {
            const response = await fetch(`${HOST}/category`, {
                credentials: 'include',
            })

            const res = await response.json();
            setCategories(...res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Types();
        Categories();
    }, [])

    const handleInputChange = (e) => {
        const { name, value, selectedOptions } = e.target;

        if (name === 'type_id') {
            setFormData(prev => ({
                ...prev,
                type: value,
            }));
        } else if (name === 'category_id[]') {
            const selectedValues = Array.from(selectedOptions).map(option => option.value);
            setFormData(prev => ({
                ...prev,
                category_id: selectedValues,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleCategoryChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
            category_id: selectedValues
        }));
    }

    const handleTagsChange = (newTags) => {
        setFormData(prev => ({
            ...prev,
            tags: newTags
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch(`${HOST}/quote`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            document.querySelectorAll('.error').forEach(error => error.innerHTML = '');
            if (response.status === 201) return navigate('/home');
            if (response.status === 422) {
                const res = await response.json();
                console.log(res.errors);
                Object.entries(res.errors).forEach(([field, messages]) => {
                    const errorElement = document.querySelector(`.${field}-error`);
                    if (errorElement) {
                        errorElement.innerHTML = messages[0];
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppLayout>
            <section className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Publish A Quote</h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                    <div className="space-y-2 px-6">
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type_id"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" selected disabled>Select Type</option>
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

                    <div className="space-y-2 px-6">
                        <label className="block text-sm font-medium text-gray-700">Categories</label>
                        <select
                            multiple
                            name="category_id[]"
                            value={formData.category_id}
                            onChange={handleCategoryChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
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

                    <div className="pt-4 px-6">
                        <SubmitButton>
                            Submit Quote
                        </SubmitButton>
                    </div>
                </form>
            </section>
        </AppLayout>
    )
}

export default Store