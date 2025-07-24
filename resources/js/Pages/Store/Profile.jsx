import GuestLayout from '@/Layouts/GuestLayout';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AddToCartPrompt from '@/Components/AddToCartPrompt';
import { Head, Link, router } from '@inertiajs/react';
import Cropper from 'react-easy-crop';
import { useEffect, useRef, useState } from 'react';

export default function Profile({ user, pages = [], categories, products, isOwner, socialLinks = [] }) {
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

            {/* Hero Section with Cover & Avatar */}
            <div className="relative">
                <div className="h-64 md:h-80 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
                    {user.cover ? (
                        <img
                            src={`/storage/${user.cover}`}
                            alt="cover"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm" />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {isOwner && (
                        <button
                            onClick={() => selectFile('cover')}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Change Cover
                        </button>
                    )}
                </div>

                {/* Avatar */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-white p-1 shadow-2xl">
                            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                {user.logo ? (
                                    <img
                                        src={`/storage/${user.logo}`}
                                        alt="logo"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <span className="text-3xl font-bold text-white">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {isOwner && (
                            <button
                                onClick={() => selectFile('logo')}
                                className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-20 pb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{user.name}</h1>
                    
                    {user.about && (
                        <div className="max-w-3xl mx-auto">
                            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                {user.about}
                            </p>
                        </div>
                    )}

                    {/* Social Links */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        {user.whatsapp_number && (
                            <a href={`https://wa.me/${user.whatsapp_number}`} target="_blank" 
                               className="p-3 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                            </a>
                        )}
                        
                        {user.telegram_username && (
                            <a href={`https://t.me/${user.telegram_username}`} target="_blank" 
                               className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                </svg>
                            </a>
                        )}
                        
                        {user.instagram_username && (
                            <a href={`https://instagram.com/${user.instagram_username}`} target="_blank" 
                               className="p-3 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        )}
                        
                        {user.facebook_username && (
                            <a href={`https://facebook.com/${user.facebook_username}`} target="_blank" 
                               className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        )}
                        
                        {user.public_email && (
                            <a href={`mailto:${user.public_email}`} 
                               className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        )}

                        {socialLinks.map(link => (
                            <div key={link.id} className="relative group">
                                <a href={link.url} target="_blank" 
                                   className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg flex items-center justify-center">
                                    {link.icon ? (
                                        <img src={`/storage/${link.icon}`} alt={link.label} className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm font-medium">{link.label.slice(0, 2).toUpperCase()}</span>
                                    )}
                                </a>
                                {isOwner && (
                                    <button 
                                        onClick={() => deleteLink(link.id)} 
                                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        
                        {isOwner && (
                            <button 
                                onClick={openNewLink} 
                                className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Owner Edit Controls */}
                {isOwner && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Edit</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">About</span>
                                <div className="flex gap-2">
                                    <Link href={route('profile.edit')} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                                        {user.about ? 'Edit' : 'Add'}
                                    </Link>
                                    {user.about && (
                                        <button onClick={() => deleteField('about')} className="text-red-500 hover:text-red-600 text-sm">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">WhatsApp</span>
                                <div className="flex gap-2">
                                    <Link href={route('profile.edit')} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                                        {user.whatsapp_number ? 'Edit' : 'Add'}
                                    </Link>
                                    {user.whatsapp_number && (
                                        <button onClick={() => deleteField('whatsapp_number')} className="text-red-500 hover:text-red-600 text-sm">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Telegram</span>
                                <div className="flex gap-2">
                                    <Link href={route('profile.edit')} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                                        {user.telegram_username ? 'Edit' : 'Add'}
                                    </Link>
                                    {user.telegram_username && (
                                        <button onClick={() => deleteField('telegram_username')} className="text-red-500 hover:text-red-600 text-sm">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Instagram</span>
                                <div className="flex gap-2">
                                    <Link href={route('profile.edit')} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                                        {user.instagram_username ? 'Edit' : 'Add'}
                                    </Link>
                                    {user.instagram_username && (
                                        <button onClick={() => deleteField('instagram_username')} className="text-red-500 hover:text-red-600 text-sm">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Email</span>
                                <div className="flex gap-2">
                                    <Link href={route('profile.edit')} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                                        {user.public_email ? 'Edit' : 'Add'}
                                    </Link>
                                    {user.public_email && (
                                        <button onClick={() => deleteField('public_email')} className="text-red-500 hover:text-red-600 text-sm">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pages Section */}
                {pages.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pages</h2>
                        <div className="flex flex-wrap gap-3">
                            {pages.map(p => (
                                <Link
                                    key={p.id}
                                    href={route('store.pages.show', [user.username, p.slug])}
                                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-medium"
                                >
                                    {p.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories Section */}
                {categories.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
                        <div className="flex flex-wrap gap-3">
                            {categories.map(c => (
                                <Link
                                    key={c.id}
                                    href={route('store.categories.show', [user.username, c.slug])}
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    {c.icon && (
                                        <img
                                            src={`/storage/${c.icon}`}
                                            alt={c.name}
                                            className="w-5 h-5"
                                        />
                                    )}
                                    <span>{c.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.slice(0, visible).map(p => (
                            <div key={p.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                {p.images && p.images.length > 0 && (
                                    <Link href={route('products.show', p.slug)} className="block">
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={`/storage/${p.images[0]}`}
                                                alt={p.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>
                                )}
                                
                                <div className="p-6">
                                    <Link
                                        href={route('products.show', p.slug)}
                                        className="block font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200 mb-2 line-clamp-2"
                                    >
                                        {p.title}
                                    </Link>
                                    
                                    <div className="text-2xl font-bold text-indigo-600 mb-2">
                                        ${p.price}
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>{p.views}</span>
                                    </div>
                                    
                                    <button
                                        onClick={() => addToCart(p.slug)}
                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {visible < products.length && (
                        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Crop Modal */}
            <Modal show={Boolean(cropSrc)} onClose={() => setCropSrc(null)}>
                {cropSrc && (
                    <div className="p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Crop {cropMode === 'logo' ? 'Profile Picture' : 'Cover Photo'}
                        </h3>
                        
                        <div className="relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
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
                                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Social Links Modal */}
            <Modal show={linksModal} onClose={() => setLinksModal(false)}>
                <div className="p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {linkData.id ? 'Edit Social Link' : 'Add Social Link'}
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="label" value="Label" className="text-gray-700 font-medium" />
                            <TextInput
                                id="label"
                                className="mt-2 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                value={linkData.label}
                                onChange={(e) => setLinkData({ ...linkData, label: e.target.value })}
                                placeholder="e.g. LinkedIn, Portfolio, etc."
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="url" value="URL" className="text-gray-700 font-medium" />
                            <TextInput
                                id="url"
                                className="mt-2 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                value={linkData.url}
                                onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                                placeholder="https://example.com"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="icon" value="Icon (Optional)" className="text-gray-700 font-medium" />
                            <input
                                type="file"
                                id="icon"
                                ref={iconInputRef}
                                className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                onChange={handleIconChange}
                                accept="image/*"
                            />
                            <p className="mt-1 text-sm text-gray-500">Upload a small icon for your link (optional)</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => setLinksModal(false)}
                            className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={saveLink}
                            disabled={!linkData.label || !linkData.url}
                            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200"
                        >
                            {linkData.id ? 'Update Link' : 'Add Link'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add to Cart Prompt */}
            <AddToCartPrompt
                show={showCartPrompt}
                onClose={() => setShowCartPrompt(false)}
                onGoToCart={() => router.visit(route('cart.show'))}
            />
        </GuestLayout>
    );
}