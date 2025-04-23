import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import QuoteCard from "../../components/QuoteCard";

const NoQuotes = ({ message = "There are no quotes available at the moment. Please try again later or check your search criteria." }) => (
    <div className="col-span-full text-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Quotes Found</h3>
            <p className="mt-1 text-sm text-gray-500">
                {message}
            </p>
        </div>
    </div>
);

const Index = () => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [quotes, setQuotes] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchColumn, setSearchColumn] = useState("author");
    const [searchResults, setSearchResults] = useState(null);
    const [randomQuote, setRandomQuote] = useState(null);
    const [popularQuotes, setPopularQuotes] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [tagSearchTerm, setTagSearchTerm] = useState("");
    const [allTags, setAllTags] = useState([]);

    const fetchRandomQuote = async () => {
        try {
            const response = await fetch(`${HOST}/quote/random/1`, {
                credentials: 'include',
            });
            const res = await response.json();
            setRandomQuote(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPopularQuotes = async () => {
        try {
            const response = await fetch(`${HOST}/quote/popular`, {
                credentials: 'include',
            });
            const res = await response.json();
            setPopularQuotes(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${HOST}/category`, {
                credentials: 'include',
            });
            const res = await response.json();
            console.log('Categories data structure:', res.data);
            setCategories(...res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const Index = async () => {
        try {
            const response = await fetch(`${HOST}/quote`, {
                credentials: 'include',
            });
            const res = await response.json();
            console.log('Quotes data structure:', res.data);
            setQuotes(res.data);
            setSearchResults(res.data);

            const tags = new Set();
            res.data.forEach(quote => {
                quote.tags.forEach(tag => tags.add(tag));
            });
            console.log('All unique tags:', Array.from(tags));
            setAllTags(Array.from(tags));
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = async (value) => {
        if (!value.trim()) {
            setSearchResults(quotes);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(`${HOST}/quote/${searchColumn}/${value}`, {
                credentials: 'include',
            });
            const res = await response.json();
            setSearchResults(res.data);
        } catch (error) {
            console.log(error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const filterQuotes = (quotesToFilter) => {
        if (!quotesToFilter) return [];

        console.log('Filtering quotes with:', {
            selectedCategory,
            tagSearchTerm,
            totalQuotes: quotesToFilter.length
        });

        return quotesToFilter.filter(quote => {
            const matchesCategory = !selectedCategory ||
                quote.categories.includes(categories.find(cat => cat.id === parseInt(selectedCategory))?.name);

            const matchesTag = !tagSearchTerm ||
                quote.tags.some(tag => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()));

            console.log('Quote filter result:', {
                quoteId: quote.id,
                quoteCategories: quote.categories,
                selectedCategoryName: categories.find(cat => cat.id === parseInt(selectedCategory))?.name,
                matchesCategory,
                quoteTags: quote.tags,
                tagSearchTerm,
                matchesTag,
                finalResult: matchesCategory && matchesTag
            });

            return matchesCategory && matchesTag;
        });
    };

    useEffect(() => {
        Index();
        fetchRandomQuote();
        fetchPopularQuotes();
        fetchCategories();
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm) {
                handleSearch(searchTerm);
            } else {
                setSearchResults(filterQuotes(quotes));
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, searchColumn]);

    useEffect(() => {
        if (quotes) {
            if (searchTerm) {
                return;
            }
            setSearchResults(filterQuotes(quotes));
        }
    }, [selectedCategory, tagSearchTerm]);

    return (
        <UserLayout>
            <section className="min-h-screen bg-gray-100 py-8 pb-0">
                <div className="container mx-auto px-4 flex justify-center flex-col items-center">
                    <div className="bg-white p-8 rounded-lg shadow-md mb-8 w-fit">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Make Your Day with a Random Quote</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {randomQuote ? (
                                <QuoteCard quote={randomQuote} />
                            ) : (
                                <NoQuotes message="Unable to fetch a random quote at the moment. Please try again later." />
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Popular Quotes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularQuotes ? (
                                popularQuotes.length > 0 ? (
                                    popularQuotes.map((quote) => (
                                        <QuoteCard key={quote.id} quote={quote} />
                                    ))
                                ) : (
                                    <NoQuotes message="No popular quotes available at the moment." />
                                )
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    Loading popular quotes...
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-8 w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <select
                                    value={searchColumn}
                                    onChange={(e) => setSearchColumn(e.target.value)}
                                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="quote">Quote</option>
                                    <option value="author">Author</option>
                                </select>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder={`Search by ${searchColumn}...`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        {isSearching ? '⌛' : '🔍'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tag</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search by tag..."
                                            value={tagSearchTerm}
                                            onChange={(e) => setTagSearchTerm(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            🔍
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults ? (
                            searchResults.length > 0 ? (
                                searchResults.map((quote) => (
                                    <QuoteCard key={quote.id} quote={quote} />
                                ))
                            ) : (
                                <NoQuotes message="No quotes found matching your search criteria. Try adjusting your filters or search terms." />
                            )
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                Loading quotes...
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default Index;
