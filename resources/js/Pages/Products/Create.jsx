import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from 'react-simple-wysiwyg';

// Custom SVG Icons
const Icons = {
    Package: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3" />
        </svg>
    ),
    Description: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    ),
    Price: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
    ),
    Category: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
    ),
    Digital: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    Shipping: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    File: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    Image: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    Plus: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    ),
    Save: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    Back: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    ),
    Settings: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
    )
};

export default function Create({ categories }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: '',
        category_id: categories.length ? categories[0].id : '',
        is_digital: false,
        shipping_cost: '',
        demo_file: null,
        main_file: null,
        images: [],
        attributes: [],
    });

    const [attributeInputs, setAttributeInputs] = useState([]);

    const addAttribute = () => {
        setAttributeInputs([...attributeInputs, { title: '', option: '', price: '' }]);
    };

    const removeAttribute = (index) => {
        const copy = attributeInputs.filter((_, i) => i !== index);
        setAttributeInputs(copy);
        setData('attributes', copy);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                        <Icons.Package />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {t('Create New Product')}
                    </h2>
                </div>
            }
        >
            <Head title={t('New Product')} />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                            <h3 className="text-white text-lg font-semibold flex items-center space-x-2">
                                <Icons.Package />
                                <span>{t('Product Information')}</span>
                            </h3>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-8" encType="multipart/form-data">
                            {/* Basic Information Section */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2 border-b border-gray-200 pb-2">
                                    <Icons.Description />
                                    <span>{t('Basic Information')}</span>
                                </h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <InputLabel 
                                            htmlFor="title" 
                                            value={t('Product Title')}
                                            className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <Icons.Package />
                                            </div>
                                            <TextInput 
                                                id="title" 
                                                value={data.title} 
                                                className="pl-10 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white" 
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder={t('Enter product title...')}
                                            />
                                        </div>
                                        <InputError message={errors.title} className="mt-2 text-red-500" />
                                    </div>

                                    <div className="group">
                                        <InputLabel 
                                            htmlFor="category_id" 
                                            value={t('Category')}
                                            className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <Icons.Category />
                                            </div>
                                            <select 
                                                id="category_id" 
                                                value={data.category_id} 
                                                className="pl-10 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white" 
                                                onChange={(e) => setData('category_id', e.target.value)}
                                            >
                                                {categories.map((c) => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <InputLabel 
                                        htmlFor="description" 
                                        value={t('Description')}
                                        className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                    />
                                    <Editor
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder={t('Describe your product...')}
                                        containerProps={{
                                            className:
                                                'w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white min-h-[120px]'
                                        }}
                                    />
                                    <InputError message={errors.description} className="mt-2 text-red-500" />
                                </div>
                            </div>

                            {/* Pricing Section */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2 border-b border-gray-200 pb-2">
                                    <Icons.Price />
                                    <span>{t('Pricing & Delivery')}</span>
                                </h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel 
                                            htmlFor="price" 
                                            value={t('Price ($)')}
                                            className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <Icons.Price />
                                            </div>
                                            <TextInput 
                                                id="price" 
                                                type="number" 
                                                value={data.price} 
                                                className="pl-10 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white" 
                                                onChange={(e) => setData('price', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <InputError message={errors.price} className="mt-2 text-red-500" />
                                    </div>

                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-all duration-200">
                                            <input 
                                                type="checkbox" 
                                                checked={data.is_digital} 
                                                onChange={(e) => setData('is_digital', e.target.checked)}
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Icons.Digital />
                                                <span className="font-medium text-gray-700">{t('Digital Product')}</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {!data.is_digital && (
                                    <div>
                                        <InputLabel 
                                            htmlFor="shipping_cost" 
                                            value={t('Shipping Cost ($)')}
                                            className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                        />
                                        <div className="relative max-w-md">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <Icons.Shipping />
                                            </div>
                                            <TextInput 
                                                id="shipping_cost" 
                                                type="number" 
                                                value={data.shipping_cost} 
                                                className="pl-10 w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white" 
                                                onChange={(e) => setData('shipping_cost', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <InputError message={errors.shipping_cost} className="mt-2 text-red-500" />
                                    </div>
                                )}
                            </div>

                            {/* Digital Files Section */}
                            {data.is_digital && (
                                <div className="space-y-6">
                                    <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2 border-b border-gray-200 pb-2">
                                        <Icons.File />
                                        <span>{t('Digital Files')}</span>
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel 
                                                htmlFor="demo_file" 
                                                value={t('Demo File')}
                                                className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                            />
                                            <FileDropzone
                                                name="demo_file"
                                                value={data.demo_file}
                                                onChange={(file) => setData('demo_file', file)}
                                                className="rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200"
                                            />
                                            <InputError message={errors.demo_file} className="mt-2 text-red-500" />
                                        </div>

                                        <div>
                                            <InputLabel 
                                                htmlFor="main_file" 
                                                value={t('Main File')}
                                                className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                            />
                                            <FileDropzone
                                                name="main_file"
                                                value={data.main_file}
                                                onChange={(file) => setData('main_file', file)}
                                                className="rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200"
                                            />
                                            <InputError message={errors.main_file} className="mt-2 text-red-500" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Images Section */}
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2 border-b border-gray-200 pb-2">
                                    <Icons.Image />
                                    <span>{t('Product Images')}</span>
                                </h4>
                                
                                <div>
                                    <InputLabel 
                                        htmlFor="images" 
                                        value={t('Upload Images')}
                                        className="flex items-center space-x-2 text-gray-700 font-medium mb-2"
                                    />
                                    <FileDropzone
                                        name="images"
                                        multiple
                                        value={data.images}
                                        onChange={(files) => setData('images', files)}
                                        className="rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200"
                                    />
                                    <InputError message={errors.images} className="mt-2 text-red-500" />
                                </div>
                            </div>

                            {/* Attributes Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                                        <Icons.Settings />
                                        <span>{t('Product Attributes')}</span>
                                    </h4>
                                    
                                    <button 
                                        type="button" 
                                        onClick={addAttribute} 
                                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        <Icons.Plus />
                                        <span>{t('Add Attribute')}</span>
                                    </button>
                                </div>
                                
                                {attributeInputs.length > 0 && (
                                    <div className="space-y-4">
                                        {attributeInputs.map((attr, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                                    <TextInput 
                                                        placeholder={t('Attribute title...')}
                                                        value={attr.title} 
                                                        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            const copy = [...attributeInputs];
                                                            copy[index].title = e.target.value;
                                                            setAttributeInputs(copy);
                                                            setData('attributes', copy);
                                                        }} 
                                                    />
                                                    <TextInput 
                                                        placeholder={t('Option value...')}
                                                        value={attr.option} 
                                                        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            const copy = [...attributeInputs];
                                                            copy[index].option = e.target.value;
                                                            setAttributeInputs(copy);
                                                            setData('attributes', copy);
                                                        }} 
                                                    />
                                                    <TextInput 
                                                        placeholder={t('Additional price...')}
                                                        type="number" 
                                                        value={attr.price} 
                                                        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            const copy = [...attributeInputs];
                                                            copy[index].price = e.target.value;
                                                            setAttributeInputs(copy);
                                                            setData('attributes', copy);
                                                        }} 
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAttribute(index)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                                    >
                                                        {t('Remove')}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                                <Link 
                                    href={route('products.index')} 
                                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 border border-gray-200"
                                >
                                    <Icons.Back />
                                    <span>{t('Cancel')}</span>
                                </Link>
                                
                                <PrimaryButton 
                                    disabled={processing} 
                                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Icons.Save />
                                    <span>{processing ? t('Saving...') : t('Save Product')}</span>
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}