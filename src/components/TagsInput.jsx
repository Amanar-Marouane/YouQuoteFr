import React, { useState } from 'react';

const TagsInput = ({ value = [], onChange }) => {
    const [tagInput, setTagInput] = useState('');

    const handleInputChange = (e) => {
        const input = e.target.value;
        setTagInput(input);

        // Check for comma
        if (input.includes(',')) {
            const newTags = input
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag && !value.includes(tag));
            
            if (newTags.length > 0) {
                onChange([...value, ...newTags]);
                setTagInput('');
            }
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="w-full px-6 flex flex-col gap-1">
            <label className="text-[#374151] text-lg font-semibold p-1">
                Tags
            </label>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                    {value.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    value={tagInput}
                    onChange={handleInputChange}
                    placeholder="Type tags separated by commas (e.g., tag1, tag2, tag3)"
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    );
};

export default TagsInput; 