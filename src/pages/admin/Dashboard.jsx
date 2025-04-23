import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AdminQuoteCard from "../../components/AdminQuoteCard";

const Dashboard = () => {
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [pendingQuotes, setPendingQuotes] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPendingQuotes = async () => {
        try {
            const response = await fetch(`${HOST}/quotes/pending`, {
                credentials: 'include',
            });
            const res = await response.json();
            setPendingQuotes(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pending quotes:', error);
            setLoading(false);
        }
    };

    const handleValidateQuote = async (quoteId) => {
        try {
            const response = await fetch(`${HOST}/quotes/${quoteId}/validate`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                fetchPendingQuotes();
            }
        } catch (error) {
            console.error('Error validating quote:', error);
        }
    };

    const handleRejectQuote = async (quoteId) => {
        try {
            const response = await fetch(`${HOST}/quotes/${quoteId}/reject`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                fetchPendingQuotes();
            }
        } catch (error) {
            console.error('Error rejecting quote:', error);
        }
    };

    useEffect(() => {
        fetchPendingQuotes();
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-6">Pending Quotes</h2>
                    {pendingQuotes && pendingQuotes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingQuotes.map((quote) => (
                                <div key={quote.id} className="border rounded-lg p-4">
                                    <AdminQuoteCard quote={quote} />
                                    <div className="mt-4 flex justify-end space-x-4">
                                        <button
                                            onClick={() => handleValidateQuote(quote.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                        >
                                            Validate
                                        </button>
                                        <button
                                            onClick={() => handleRejectQuote(quote.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No pending quotes to review</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard; 