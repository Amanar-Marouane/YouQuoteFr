import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import QuoteCard from "../../components/QuoteCard";

const Index = () => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [quotes, setQuotes] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchColumn, setSearchColumn] = useState("author");
    const [searchResults, setSearchResults] = useState(null);
    const [randomQuote, setRandomQuote] = useState(null);
    const [popularQuotes, setPopularQuotes] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

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

    const Index = async () => {
        try {
            const response = await fetch(`${HOST}/quote`, {
                credentials: 'include',
            });
            const res = await response.json();
            setQuotes(res.data);
            setSearchResults(res.data);
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

    useEffect(() => {
        Index();
        fetchRandomQuote();
        fetchPopularQuotes();
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            handleSearch(searchTerm);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, searchColumn]);

    return (
        <UserLayout>
            <section className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4 flex justify-center flex-col items-center">
                    <div className="bg-white p-8 rounded-lg shadow-md mb-8 w-fit">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Make Your Day with a Random Quote</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {randomQuote ? (
                                <QuoteCard quote={randomQuote} />
                            ) : (
                                <div className="text-center text-gray-500">
                                    Loading random quote...
                                </div>
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
                                    <div className="col-span-full text-center text-gray-500">
                                        No popular quotes available.
                                    </div>
                                )
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    Loading popular quotes...
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults ? (
                            searchResults.length > 0 ? (
                                searchResults.map((quote) => (
                                    <QuoteCard key={quote.id} quote={quote} />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    No quotes found matching your search.
                                </div>
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
