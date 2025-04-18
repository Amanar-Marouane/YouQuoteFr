import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import QuoteCard from "../../components/QuoteCard";

const Show = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch(`${HOST}/quote/${id}`, {
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Quote not found');
                }

                const res = await response.json();
                setQuote(res.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, [id]);

    if (loading) {
        return (
            <UserLayout>
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-gray-500">
                            Loading quote details...
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
                                onClick={() => navigate('/home')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Back to Home
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
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <button
                                onClick={() => navigate('/home')}
                                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                            >
                                <span className="mr-2">←</span> Back to Quotes
                            </button>
                        </div>
                        {quote && <QuoteCard quote={quote} />}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Show; 