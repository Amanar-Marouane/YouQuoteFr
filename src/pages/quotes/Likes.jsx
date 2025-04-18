import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import QuoteCard from "../../components/QuoteCard";

const Likes = () => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [likes, setLikes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLikes = async () => {
        try {
            const response = await fetch(`${HOST}/quote/likes`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch likes');
            }

            const res = await response.json();
            setLikes(res.data);
        } catch (error) {
            console.error('Error fetching likes:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLikes();
    }, []);

    if (loading) {
        return (
            <UserLayout>
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-gray-500">
                            Loading your liked quotes...
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    if (error) {
        return (
            <UserLayout>
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Liked Quotes</h1>

                    {likes && likes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {likes.map((quote) => (
                                <QuoteCard
                                    key={quote.id}
                                    quote={quote}
                                    onUpdate={fetchLikes}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <p className="text-gray-600 mb-4">You haven't liked any quotes yet.</p>
                            <a
                                href="/home"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors inline-block"
                            >
                                Browse Quotes
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
};

export default Likes; 