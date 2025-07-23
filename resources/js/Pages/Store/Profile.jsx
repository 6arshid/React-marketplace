import GuestLayout from '@/Layouts/GuestLayout';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AddToCartPrompt from '@/Components/AddToCartPrompt';
import { Head, Link, router } from '@inertiajs/react';
import Cropper from 'react-easy-crop';
import { useEffect, useRef, useState } from 'react';

export default function Profile({ user, categories, products, isOwner, socialLinks = [] }) {
    const [visible, setVisible] = useState(10);
    const loadMoreRef = useRef(null);
    const fileInputRef = useRef();
    const [cropSrc, setCropSrc] = useState(null);
    const [cropMode, setCropMode] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCartPrompt, setShowCartPrompt] = useState(false);
    const [linksModal, setLinksModal] = useState(false);
    const [linkData, setLinkData] = useState({ id: null, label: '', url: '', icon: null });
    const iconInputRef = useRef();

    const deleteField = (field) => {
        if (!confirm('Delete this information?')) return;
        router.post(
            route('profile.contact.update'),
            { _method: 'patch', [field]: '' },
            {
                onSuccess: () => router.reload({ only: ['user'] }),
            }
        );
    };

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
        router.post(route('cart.add', slug), {}, {
            onSuccess: () => setShowCartPrompt(true),
        });
    };

    const openNewLink = () => {
        setLinkData({ id: null, label: '', url: '', icon: null });
        setLinksModal(true);
    };

    const editLink = (link) => {
        setLinkData({ id: link.id, label: link.label, url: link.url, icon: null });
        setLinksModal(true);
    };

    const handleIconChange = (e) => {
        setLinkData({ ...linkData, icon: e.target.files[0] });
    };

    const saveLink = () => {
        const formData = new FormData();
        formData.append('label', linkData.label);
        formData.append('url', linkData.url);
        if (linkData.icon) formData.append('icon', linkData.icon);

        if (linkData.id) {
            formData.append('_method', 'put');
            router.post(route('social-links.update', linkData.id), formData, {
                forceFormData: true,
                onSuccess: () => {
                    setLinksModal(false);
                    router.reload({ only: ['socialLinks'] });
                },
            });
        } else {
            router.post(route('social-links.store'), formData, {
                forceFormData: true,
                onSuccess: () => {
                    setLinksModal(false);
                    router.reload({ only: ['socialLinks'] });
                },
            });
        }
    };

    const deleteLink = (id) => {
        if (!confirm('Delete this link?')) return;
        router.delete(route('social-links.destroy', id), {
            onSuccess: () => router.reload({ only: ['socialLinks'] }),
        });
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
                {user.about && (
                    <p className="mb-4 whitespace-pre-line text-gray-700">{user.about}</p>
                )}
                <div className="mb-4 flex flex-wrap items-center gap-4">
                    {user.whatsapp_number && (
                        <a href={`https://wa.me/${user.whatsapp_number}`} target="_blank" className="flex items-center gap-1 text-green-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16.59 7.58a6.54 6.54 0 00-9.29 9.21l-1.3 3.77 3.89-1.28a6.52 6.52 0 006.7-11.7z"/>
                            </svg>
                        </a>
                    )}
                    {user.telegram_username && (
                        <a href={`https://t.me/${user.telegram_username}`} target="_blank" className="flex items-center gap-1 text-blue-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9.04 15.16l-.38 3.56a.75.75 0 001.17.74l2.87-2.1 3.64 2.66a.75.75 0 001.18-.45l2.94-13.13a.75.75 0 00-1-0.86L3.67 9.12a.75.75 0 00.06 1.42l3.91 1.3 8.94-5.6-7.54 8.92z"/>
                            </svg>
                        </a>
                    )}
                    {user.instagram_username && (
                        <a href={`https://instagram.com/${user.instagram_username}`} target="_blank" className="text-pink-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z"/>
                            </svg>
                        </a>
                    )}
                    {user.facebook_username && (
                        <a href={`https://facebook.com/${user.facebook_username}`} target="_blank" className="text-blue-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 3h4a1 1 0 011 1v3a1 1 0 01-1 1h-2v3h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v8h-3v-8H9v-3h2V9a4 4 0 014-4z"/>
                            </svg>
                        </a>
                    )}
                    {user.public_email && (
                        <a href={`mailto:${user.public_email}`} className="text-gray-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2 4h20v16H2z" fill="none"/><path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                        </a>
                    )}
                {socialLinks.map(link => (
                    <span key={link.id} className="flex items-center">
                        <a href={link.url} target="_blank">
                            {link.icon ? (
                                <img src={`/storage/${link.icon}`} alt={link.label} className="w-5 h-5" />
                            ) : (
                                <span className="text-sm">{link.label}</span>
                            )}
                        </a>
                        {isOwner && (
                            <button onClick={() => deleteLink(link.id)} className="ml-1 text-red-500 text-xs">&times;</button>
                        )}
                    </span>
                ))}
                {isOwner && (
                    <button onClick={openNewLink} className="px-2 py-1 bg-gray-200 text-sm rounded">Add Link</button>
                )}
            </div>
            {isOwner && (
                <div className="mb-4 space-y-1 text-sm">
                    <div>
                        {user.about ? (
                            <>
                                <Link href={route('profile.edit')} className="text-blue-600">Edit About</Link>
                                <button onClick={() => deleteField('about')} className="ml-2 text-red-600">Delete</button>
                            </>
                        ) : (
                            <Link href={route('profile.edit')} className="text-blue-600">Add About</Link>
                        )}
                    </div>
                    <div>
                        {user.whatsapp_number ? (
                            <>
                                <Link href={route('profile.edit')} className="text-blue-600">Edit WhatsApp</Link>
                                <button onClick={() => deleteField('whatsapp_number')} className="ml-2 text-red-600">Delete</button>
                            </>
                        ) : (
                            <Link href={route('profile.edit')} className="text-blue-600">Add WhatsApp</Link>
                        )}
                    </div>
                    <div>
                        {user.telegram_username ? (
                            <>
                                <Link href={route('profile.edit')} className="text-blue-600">Edit Telegram</Link>
                                <button onClick={() => deleteField('telegram_username')} className="ml-2 text-red-600">Delete</button>
                            </>
                        ) : (
                            <Link href={route('profile.edit')} className="text-blue-600">Add Telegram</Link>
                        )}
                    </div>
                    <div>
                        {user.instagram_username ? (
                            <>
                                <Link href={route('profile.edit')} className="text-blue-600">Edit Instagram</Link>
                                <button onClick={() => deleteField('instagram_username')} className="ml-2 text-red-600">Delete</button>
                            </>
                        ) : (
                            <Link href={route('profile.edit')} className="text-blue-600">Add Instagram</Link>
                        )}
                    </div>
                    <div>
                        {user.public_email ? (
                            <>
                                <Link href={route('profile.edit')} className="text-blue-600">Edit Email</Link>
                                <button onClick={() => deleteField('public_email')} className="ml-2 text-red-600">Delete</button>
                            </>
                        ) : (
                            <Link href={route('profile.edit')} className="text-blue-600">Add Email</Link>
                        )}
                    </div>
                </div>
            )}
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
            <Modal show={linksModal} onClose={() => setLinksModal(false)}>
                <div className="p-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="label" value="Label" />
                        <TextInput
                            id="label"
                            className="mt-1 block w-full"
                            value={linkData.label}
                            onChange={(e) => setLinkData({ ...linkData, label: e.target.value })}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="url" value="URL" />
                        <TextInput
                            id="url"
                            className="mt-1 block w-full"
                            value={linkData.url}
                            onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="icon" value="Icon" />
                        <input
                            type="file"
                            id="icon"
                            ref={iconInputRef}
                            className="mt-1 block w-full"
                            onChange={handleIconChange}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <PrimaryButton type="button" onClick={saveLink}>Save</PrimaryButton>
                        <button
                            type="button"
                            onClick={() => setLinksModal(false)}
                            className="px-4 py-2 text-sm rounded bg-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <AddToCartPrompt
                show={showCartPrompt}
                onClose={() => setShowCartPrompt(false)}
                onGoToCart={() => router.visit(route('cart.show'))}
            />
        </GuestLayout>
    );
}
