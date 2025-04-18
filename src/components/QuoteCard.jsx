import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuoteCard = ({ quote, onDelete, onEdit, showActions = false }) => {
    const navigate = useNavigate();
    const HOST = import.meta.env.VITE_HOST_BASE;
    const [likes, setLikes] = useState(quote.likes);
    const [favorites, setFavorites] = useState(quote.favorites);
    const [isLiked, setIsLiked] = useState(quote.isLiked);
    const [isFavorited, setIsFavorited] = useState(quote.isFavorited);

    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            const response = await fetch(`${HOST}/quote/like/${quote.id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                if (isLiked) {
                    setLikes(prev => prev - 1);
                } else {
                    setLikes(prev => prev + 1);
                }
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error('Error liking quote:', error);
        }
    };

    const handleFavorite = async (e) => {
        e.stopPropagation();
        try {
            const response = await fetch(`${HOST}/quote/favorite/${quote.id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                if (isFavorited) {
                    setFavorites(prev => prev - 1);
                } else {
                    setFavorites(prev => prev + 1);
                }
                setIsFavorited(!isFavorited);
            }
        } catch (error) {
            console.error('Error favoriting quote:', error);
        }
    };

    const handleCardClick = () => {
        navigate(`/quote/${quote.id}`);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(quote);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(quote.id);
    };

    const isUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const renderContentValue = (value) => {
        if (isUrl(value)) {
            return (
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {value}
                </a>
            );
        }
        return value || 'N/A';
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="mb-4 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words">{quote.quote}</h3>
                <p className="text-gray-600 italic break-words">- {quote.author}</p>
            </div>

            <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Content Details:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(quote.content).map(([key, value]) => (
                        <div key={key} className="flex flex-wrap">
                            <span className="font-medium text-gray-600 capitalize min-w-[100px]">{key.replace('_', ' ')}:</span>
                            <span className="ml-2 text-gray-700 break-all">
                                {renderContentValue(value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {quote.categories.map((category, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded break-words">
                        {category}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {quote.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded break-words">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-auto">
                <div className="flex items-center flex-wrap gap-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}
                    >
                        <span className="mr-1">❤️</span>
                        <span>{likes}</span>
                    </button>
                    <button
                        onClick={handleFavorite}
                        className={`flex items-center hover:text-yellow-500 transition-colors ${isFavorited ? 'text-yellow-500' : ''}`}
                    >
                        <span className="mr-1">⭐</span>
                        <span>{favorites}</span>
                    </button>
                    <span className="flex items-center">
                        <span className="mr-1">👁️</span>
                        <span>{quote.frequency}</span>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-xs whitespace-nowrap">
                        {new Date(quote.created_at).toLocaleDateString()}
                    </div>
                    {showActions && (
                        <div className="flex gap-2 ml-4">
                            <button
                                onClick={handleEdit}
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-800 transition-colors"
                            >
                                🗑️
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuoteCard; 