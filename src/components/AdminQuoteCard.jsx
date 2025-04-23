import { Link } from "react-router-dom";

const AdminQuoteCard = ({ quote }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
                <div className="flex-grow">
                    <p className="text-gray-800 text-lg mb-4 italic">"{quote.quote}"</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">By: {quote.author}</p>
                            {quote.categories && quote.categories.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {quote.categories.map((category, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {quote.tags && quote.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminQuoteCard; 