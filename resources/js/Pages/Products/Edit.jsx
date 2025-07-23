import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

// Custom SVG Icons
const EditIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4z"/>
    </svg>
);

const SaveIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17,21 17,13 7,13 7,21"/>
        <polyline points="7,3 7,8 15,8"/>
    </svg>
);

const CancelIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

const PlusIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);

const TrashIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3,6 5,6 21,6"/>
        <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1 2-2h4a2,2 0 0,1 2,2v2"/>
    </svg>
);

const ImageIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
);

const FileIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"/>
        <polyline points="14,2 14,8 20,8"/>
    </svg>
);

export default function Edit({ product, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        title: product.title,
        slug: product.slug,
        description: product.description ?? '',
        price: product.price,
        category_id: product.category_id,
        is_digital: product.is_digital,
        shipping_cost: product.shipping_cost ?? '',
        demo_file: product.demo_file ?? '',
        main_file: product.main_file ?? '',
        images: product.images ?? [],
        attributes: product.attributes ?? [],
    });

    const [attributeInputs, setAttributeInputs] = useState(product.attributes ?? []);

    const addAttribute = () => {
        setAttributeInputs([...attributeInputs, { title: '', option: '', price: '' }]);
    };

    const removeAttribute = (index) => {
        const copy = [...attributeInputs];
        copy.splice(index, 1);
        setAttributeInputs(copy);
    };

    const submit = (e) => {
        e.preventDefault();
        setData('attributes', attributeInputs);
        put(route('products.update', product.slug), { forceFormData: true });
    };

    const updateAttr = (index, field, value) => {
        const copy = [...attributeInputs];
        copy[index][field] = value;
        setAttributeInputs(copy);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />
            
            {/* Header Section */}
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="relative overflow-hidden bg-white shadow-sm border-b border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
                    <div className="relative px-6 py-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <EditIcon />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                                    <p className="text-sm text-gray-500 mt-1">Update your product information</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-8 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100">
                            <div className="p-8">
                                <form onSubmit={submit} className="space-y-8" encType="multipart/form-data">
                                    
                                    {/* Basic Information Section */}
                                    <div className="space-y-6">
                                        <div className="border-b border-gray-100 pb-4">
                                            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                                            <p className="text-sm text-gray-500 mt-1">Essential product details</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <InputLabel htmlFor="title" value="Product Title" className="text-sm font-medium text-gray-700" />
                                                <TextInput 
                                                    id="title" 
                                                    value={data.title} 
                                                    className="mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200" 
                                                    onChange={(e) => setData('title', e.target.value)} 
                                                    placeholder="Enter product title..."
                                                />
                                                <InputError message={errors.title} className="mt-2" />
                                            </div>

                                            <div className="md:col-span-2">
                                                <InputLabel htmlFor="description" value="Description" className="text-sm font-medium text-gray-700" />
                                                <Editor
                                                    id="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    placeholder="Describe your product..."
                                                    containerProps={{
                                                        className:
                                                            'mt-2 w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 min-h-[120px]'
                                                    }}
                                                />
                                                <InputError message={errors.description} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="price" value="Price" className="text-sm font-medium text-gray-700" />
                                                <div className="relative mt-2">
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                                    <TextInput 
                                                        id="price" 
                                                        type="number" 
                                                        value={data.price} 
                                                        className="pl-8 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200" 
                                                        onChange={(e) => setData('price', e.target.value)}
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                                <InputError message={errors.price} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="category_id" value="Category" className="text-sm font-medium text-gray-700" />
                                                <select 
                                                    id="category_id" 
                                                    value={data.category_id} 
                                                    className="mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200" 
                                                    onChange={(e) => setData('category_id', e.target.value)}
                                                >
                                                    {categories.map((c) => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                                <InputError message={errors.category_id} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Type Section */}
                                    <div className="space-y-6">
                                        <div className="border-b border-gray-100 pb-4">
                                            <h2 className="text-lg font-semibold text-gray-900">Product Type</h2>
                                            <p className="text-sm text-gray-500 mt-1">Configure product delivery method</p>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                            <input 
                                                type="checkbox" 
                                                id="is_digital"
                                                checked={data.is_digital} 
                                                onChange={(e) => setData('is_digital', e.target.checked)}
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor="is_digital" className="ml-3 text-sm font-medium text-gray-700">
                                                This is a digital product
                                            </label>
                                        </div>

                                        {!data.is_digital && (
                                            <div className="animate-fadeIn">
                                                <InputLabel htmlFor="shipping_cost" value="Shipping Cost" className="text-sm font-medium text-gray-700" />
                                                <div className="relative mt-2">
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                                    <TextInput 
                                                        id="shipping_cost" 
                                                        type="number" 
                                                        value={data.shipping_cost} 
                                                        className="pl-8 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200" 
                                                        onChange={(e) => setData('shipping_cost', e.target.value)}
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                                <InputError message={errors.shipping_cost} className="mt-2" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Digital Files Section */}
                                    {data.is_digital && (
                                        <div className="space-y-6 animate-fadeIn">
                                            <div className="border-b border-gray-100 pb-4">
                                                <h2 className="text-lg font-semibold text-gray-900">Digital Files</h2>
                                                <p className="text-sm text-gray-500 mt-1">Upload demo and main product files</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <InputLabel htmlFor="demo_file" value="Demo File" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                        <FileIcon />
                                                        Demo File
                                                    </InputLabel>
                                                    <FileDropzone
                                                        name="demo_file"
                                                        value={data.demo_file}
                                                        onChange={(file) => setData('demo_file', file)}
                                                        className="mt-2 rounded-xl"
                                                    />
                                                    <InputError message={errors.demo_file} className="mt-2" />
                                                </div>
                                                
                                                <div>
                                                    <InputLabel htmlFor="main_file" value="Main File" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                        <FileIcon />
                                                        Main File
                                                    </InputLabel>
                                                    <FileDropzone
                                                        name="main_file"
                                                        value={data.main_file}
                                                        onChange={(file) => setData('main_file', file)}
                                                        className="mt-2 rounded-xl"
                                                    />
                                                    <InputError message={errors.main_file} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Images Section */}
                                    <div className="space-y-6">
                                        <div className="border-b border-gray-100 pb-4">
                                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                <ImageIcon />
                                                Product Images
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">Upload product photos and gallery images</p>
                                        </div>
                                        
                                        <FileDropzone
                                            name="images"
                                            multiple
                                            value={data.images}
                                            onChange={(files) => setData('images', files)}
                                            className="rounded-xl"
                                        />
                                        <InputError message={errors.images} className="mt-2" />
                                    </div>

                                    {/* Attributes Section */}
                                    <div className="space-y-6">
                                        <div className="border-b border-gray-100 pb-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-lg font-semibold text-gray-900">Product Attributes</h2>
                                                    <p className="text-sm text-gray-500 mt-1">Add variants, options, and pricing</p>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={addAttribute} 
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                                                >
                                                    <PlusIcon />
                                                    Add Attribute
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {attributeInputs.length > 0 && (
                                            <div className="space-y-4">
                                                {attributeInputs.map((attr, index) => (
                                                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-sm font-medium text-gray-700">Attribute {index + 1}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeAttribute(index)}
                                                                className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                            >
                                                                <TrashIcon />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <TextInput 
                                                                placeholder="Attribute name (e.g., Size)" 
                                                                value={attr.title} 
                                                                onChange={(e) => updateAttr(index, 'title', e.target.value)}
                                                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                            />
                                                            <TextInput 
                                                                placeholder="Option (e.g., Large)" 
                                                                value={attr.option} 
                                                                onChange={(e) => updateAttr(index, 'option', e.target.value)}
                                                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                            />
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                                                                <TextInput 
                                                                    placeholder="Additional price" 
                                                                    type="number" 
                                                                    value={attr.price} 
                                                                    onChange={(e) => updateAttr(index, 'price', e.target.value)}
                                                                    className="pl-8 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {attributeInputs.length === 0 && (
                                            <div className="text-center py-12 text-gray-500">
                                                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                                                    <PlusIcon />
                                                </div>
                                                <p>No attributes added yet</p>
                                                <p className="text-sm mt-1">Click "Add Attribute" to create product variants</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                                        <Link 
                                            href={route('products.index')}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
                                        >
                                            <CancelIcon />
                                            Cancel
                                        </Link>
                                        
                                        <PrimaryButton 
                                            disabled={processing} 
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <SaveIcon />
                                            )}
                                            {processing ? 'Saving...' : 'Save Changes'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}