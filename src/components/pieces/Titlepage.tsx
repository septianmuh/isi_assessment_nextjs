import React from 'react';

interface TitlePageProps {
    title: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ title }) => {
    return (
        <div className="text-2xl font-bold mb-4">
            <h1>{title}</h1>
        </div>
    );
};

export default TitlePage;
