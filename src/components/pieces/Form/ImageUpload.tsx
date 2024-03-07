"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import ImagePreview from './ImagePreview';

interface ImageUploaderProps {
    label: string;
    onImageChange: (imageDataUrl: string | null) => void;
    imageDataUrlExisting: string | null
    setFile: (f: File) => void
    label_max?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onImageChange, imageDataUrlExisting, setFile, label_max }) => {
    const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
    useEffect(() => {
        if (imageDataUrlExisting) {
            setImageDataUrl(imageDataUrlExisting);
        }
    }, [imageDataUrlExisting]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                setImageDataUrl(dataUrl);
                onImageChange(dataUrl);
            };
            reader.readAsDataURL(file);
            setFile(file)
        } else {
            setImageDataUrl(null);
            onImageChange(null);
        }
    };

    return (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                <input type="file" onChange={handleFileChange} className="mb-2" />
                {imageDataUrl && (
                    <ImagePreview imageUrl={imageDataUrl} />
                )}
            </div>
            <div>
                {label_max && <span className='text-xs text-red-500'>{label_max}</span>}
            </div>
        </>
    );
};

export default ImageUploader;
