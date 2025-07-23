import GuestLayout from '@/Layouts/GuestLayout';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';
import Cropper from 'react-easy-crop';
import { useEffect, useRef, useState } from 'react';

export default function Profile({ user, categories, products, isOwner }) {
    const [visible, setVisible] = useState(10);
    const loadMoreRef = useRef(null);
    const fileInputRef = useRef();
    const [cropSrc, setCropSrc] = useState(null);
    const [cropMode, setCropMode] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisible(v => Math.min(v + 10, products.length));
            }
        });
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [products.length]);

    const onCropComplete = (_, pixels) => {
        setCroppedAreaPixels(pixels);
    };

    const selectFile = (mode) => {
        setCropMode(mode);
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setCropSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const getCroppedBlob = async () => {
        const image = await createImage(cropSrc);
        const canvas = document.createElement('canvas');
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', (err) => reject(err));
            img.src = url;
        });

    const saveCropped = async () => {
        const blob = await getCroppedBlob();
        const formData = new FormData();
        formData.append(cropMode, blob, 'image.jpg');
        router.post(route(`profile.${cropMode}`), formData);
        setCropSrc(null);
    };

    const addToCart = (slug) => {
        router.post(route('cart.add', slug));
    };

    return (
        <GuestLayout>
            <Head title={`${user.name} Profile`} />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <div className="mb-4 relative">
                <div className="h-40 bg-gray-300 relative">
                    {user.cover ? (
                        <img
                            src={`/storage/${user.cover}`}
                            alt="cover"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200" />
                    )}
                    {isOwner && (
                        <button
                            onClick={() => selectFile('cover')}
                            className="absolute top-2 right-2 bg-white/75 px-2 py-1 text-xs rounded"
                        >
                            Change Cover
                        </button>
                    )}
                </div>
                <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold absolute -bottom-10 left-6 overflow-hidden">
                    {user.logo ? (
                        <img
                            src={`/storage/${user.logo}`}
                            alt="logo"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>{user.name.charAt(0).toUpperCase()}</span>
                    )}
                    {isOwner && (
                        <button
                            onClick={() => selectFile('logo')}
                            className="absolute bottom-0 right-0 bg-white/75 px-1 py-px text-[10px] rounded"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-12 px-6">
                <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(c => (
                            <Link
                                key={c.id}
                                href={route('store.categories.show', [user.username, c.slug])}
                                className="px-3 py-1 bg-blue-100 rounded-full text-sm"
                            >
                                {c.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.slice(0, visible).map(p => (
                        <div key={p.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                            {p.images && p.images.length > 0 && (
                                <Link href={route('products.show', p.slug)}>
                                    <img
                                        src={`/storage/${p.images[0]}`}
                                        alt={p.title}
                                        className="h-40 w-full object-cover rounded-md mb-2"
                                    />
                                </Link>
                            )}
                            <Link
                                href={route('products.show', p.slug)}
                                className="font-semibold hover:text-blue-600"
                            >
                                {p.title}
                            </Link>
                            <div className="text-sm text-gray-600 mb-4">${p.price}</div>
                            <button
                                onClick={() => addToCart(p.slug)}
                                className="mt-auto px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                {visible < products.length && <div ref={loadMoreRef} className="h-10"></div>}
            </div>
            <Modal show={Boolean(cropSrc)} onClose={() => setCropSrc(null)}>
                {cropSrc && (
                    <div className="p-4 space-y-4">
                        <div className="relative h-80 w-full">
                            <Cropper
                                image={cropSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={cropMode === 'logo' ? 1 : 1024 / 300}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <PrimaryButton type="button" onClick={saveCropped}>Save</PrimaryButton>
                            <button
                                type="button"
                                onClick={() => setCropSrc(null)}
                                className="px-4 py-2 text-sm rounded bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </GuestLayout>
    );
}
