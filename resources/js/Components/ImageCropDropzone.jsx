import {useDropzone} from 'react-dropzone';
import Cropper from 'react-easy-crop';
import {useState} from 'react';
import Modal from './Modal';

export default function ImageCropDropzone({ value, onChange, name, aspect = 1, width = 256, height = 256 }) {
    const [cropSrc, setCropSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDrop: files => {
            if (files[0]) {
                setCropSrc(URL.createObjectURL(files[0]));
            }
        }
    });

    const onCropComplete = (_, pixels) => {
        setCroppedAreaPixels(pixels);
    };

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', (err) => reject(err));
            img.src = url;
        });

    const getCroppedBlob = async () => {
        const image = await createImage(cropSrc);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        ctx.drawImage(
            image,
            croppedAreaPixels.x * scaleX,
            croppedAreaPixels.y * scaleY,
            croppedAreaPixels.width * scaleX,
            croppedAreaPixels.height * scaleY,
            0,
            0,
            width,
            height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
    };

    const saveCropped = async () => {
        const blob = await getCroppedBlob();
        const file = new File([blob], 'icon.png', { type: 'image/png' });
        onChange(file);
        setCropSrc(null);
    };

    const removeFile = () => onChange(null);

    const files = value ? [value] : [];

    return (
        <div>
            <div
                {...getRootProps()}
                className={`rounded border border-dashed p-4 text-center ${isDragActive ? 'bg-gray-100' : ''}`}
            >
                <input {...getInputProps({ name })} />
                {files.length > 0 ? (
                    <div className="flex items-center justify-between">
                        <span>{files[0].name || files[0]}</span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFile();
                            }}
                            className="ml-2 text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                ) : (
                    <p>Drag & drop image here, or click to select</p>
                )}
            </div>
            <Modal show={Boolean(cropSrc)} onClose={() => setCropSrc(null)}>
                {cropSrc && (
                    <div className="p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Crop Image</h3>
                        <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
                            <Cropper
                                image={cropSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">Zoom:</span>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(e.target.value)}
                                    className="w-32"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setCropSrc(null)}
                                    className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={saveCropped}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
