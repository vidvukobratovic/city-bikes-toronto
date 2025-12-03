// components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4">
            <p className="font-semibold">Error:</p>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;

