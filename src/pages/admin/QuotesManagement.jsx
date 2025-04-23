import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AdminQuoteCard from "../../components/AdminQuoteCard";
import { useNavigate } from "react-router-dom";

const QuotesManagement = () => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const navigate = useNavigate();
    const [quotes, setQuotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuotes = async () => {
        try {
            const response = await fetch(`${HOST}/quote`, {
                credentials: 'include',
            });
            const res = await response.json();
            setQuotes(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            setError('Failed to fetch quotes');
            setLoading(false);
        }
    };

    const handleDelete = async (quoteId) => {
        if (!window.confirm('Are you sure you want to delete this quote?')) {
            return;
        }

        try {
            const response = await fetch(`${HOST}/quote/${quoteId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setQuotes(quotes.filter(quote => quote.id !== quoteId));
            } else {
                throw new Error('Failed to delete quote');
            }
        } catch (error) {
            console.error('Error deleting quote:', error);
            alert('Failed to delete quote');
        }
    };

    const handleEdit = (quoteId) => {
        navigate(`/quote/${quoteId}/edit`);
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-gray-500">
                            Loading quotes...
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
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Try Again
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Quotes Management</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quotes && quotes.length > 0 ? (
                            quotes.map((quote) => (
                                <div key={quote.id} className="border rounded-lg p-4 bg-white shadow-md flex flex-col justify-between items-center gap-4">
                                    <AdminQuoteCard quote={quote} />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(quote.id)}
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
                                No quotes found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default QuotesManagement; 