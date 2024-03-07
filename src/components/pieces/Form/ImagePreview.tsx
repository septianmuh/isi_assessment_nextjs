import React from 'react';

interface ImagePreviewProps {
    imageUrl: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image Preview</label>
            {imageUrl ? (
                <div className='h-[250px] mb-2 border-2 flex items-center justify-center' style={{ width: 'fit-content' }}>
                    <img
                        src={imageUrl}
                        alt="Preview"
                        className="max-w-full max-h-full mb-2 border-2 rounded object-cover"
                    />
                </div>
            ) : (
                <p className="text-sm">No image selected</p>
            )}
        </div>
    );
};
  
export default ImagePreview;
