import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from '@inertiajs/react';

// Custom SVG Icons
const SaveIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17,21 17,13 7,13 7,21"/>
        <polyline points="7,3 7,8 15,8"/>
    </svg>
);

const CancelIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

const EditIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

const BackIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7"/>
        <path d="M19 12H5"/>
    </svg>
);

const ImageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
);

const TextIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4,7 4,4 20,4 20,7"/>
        <line x1="9" y1="20" x2="15" y2="20"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
);

const HistoryIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
        <path d="M12 7v5l4 2"/>
    </svg>
);

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        icon: category.icon ?? '',
    });


const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // افزودن فیلدهای متنی
    formData.append('name', data.name);

    // اگر فایل جدیدی انتخاب شده، ارسالش کن
    if (data.icon && typeof data.icon !== 'string') {
        formData.append('icon', data.icon);
    }

    // برای پشتیبانی از method PUT در Laravel
    formData.append('_method', 'PUT');

    // ارسال با Inertia
    Inertia.post(route('categories.update', category.slug), formData, {
        preserveScroll: true,
        onError: (errors) => {
            console.log('Validation Errors:', errors);
        },
        onSuccess: () => {
            console.log('Category updated successfully!');
        },
    });
};


    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('categories.index')}
                            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        >
                            <BackIcon />
                            Back
                        </Link>
                        <div className="h-6 border-l border-gray-300"></div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                                <EditIcon />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Edit Category</h2>
                                <p className="text-sm text-gray-600">Modify "{category.name}" category</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Edit ${category.name}`} />
            
            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Current Category Info */}
                    <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                {category.icon ? (
                                    <img
                                        src={`/storage/${category.icon}`}
                                        alt={category.name}
                                        className="w-8 h-8 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-amber-900">Current Category</h3>
                                <p className="text-amber-800 font-medium">{category.name}</p>
                                <p className="text-sm text-amber-700">Slug: {category.slug}</p>
                            </div>
                            <div className="flex items-center gap-2 text-amber-700 text-sm">
                                <HistoryIcon />
                                Editing
                            </div>
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Update Category Details</h3>
                            <p className="text-sm text-gray-600 mt-1">Modify the information below to update your category</p>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={submit} className="p-8 space-y-8" encType="multipart/form-data">
                            {/* Category Name Field */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="p-1.5 bg-blue-50 rounded-lg">
                                        <TextIcon />
                                    </div>
                                    <InputLabel 
                                        htmlFor="name" 
                                        value="Category Name" 
                                        className="text-base font-medium text-gray-900"
                                    />
                                </div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    placeholder="Enter category name..."
                                    className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 text-base transition-all duration-200"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                                {data.name && data.name !== category.name && (
                                    <div className="flex items-center gap-2 mt-2 p-3 bg-blue-50 rounded-lg">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M12 6v6l4 2"/>
                                        </svg>
                                        <p className="text-xs text-blue-700">
                                            New slug will be: <span className="font-medium">{data.name.toLowerCase().replace(/\s+/g, '-')}</span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Category Icon Field */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="p-1.5 bg-indigo-50 rounded-lg">
                                        <ImageIcon />
                                    </div>
                                    <InputLabel 
                                        htmlFor="icon" 
                                        value="Category Icon" 
                                        className="text-base font-medium text-gray-900"
                                    />
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Optional</span>
                                </div>
                                
                                {/* Current Icon Preview */}
                                {category.icon && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Current Icon:</p>
                                        <img
                                            src={`/storage/${category.icon}`}
                                            alt="Current category icon"
                                            className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                        />
                                    </div>
                                )}
                                
                                <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-300">
                                    <FileDropzone
                                        name="icon"
                                        value={data.icon}
                                        onChange={(file) => setData('icon', file)}
                                        className="border-0 bg-transparent p-0"
                                    />
                                </div>
                                <InputError message={errors.icon} className="mt-2" />
                                <p className="text-xs text-gray-500">
                                    {category.icon ? 'Upload a new icon to replace the current one' : 'Upload an icon to represent this category'}. Recommended size: 64x64px
                                </p>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <Link
                                    href={route('categories.index')}
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                                >
                                    <CancelIcon />
                                    Cancel
                                </Link>
                                
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 disabled:hover:scale-100"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" fill="none"/>
                                                <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <SaveIcon />
                                            Update Category
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Update Tips Card */}
                    <div className="mt-8 bg-amber-50 rounded-2xl border border-amber-100 p-6">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                            Important notes about editing
                        </h4>
                        <ul className="text-sm text-amber-800 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 mt-0.5">•</span>
                                Changing the category name will update its URL slug
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 mt-0.5">•</span>
                                Uploading a new icon will replace the existing one
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 mt-0.5">•</span>
                                All existing content in this category will remain unchanged
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}