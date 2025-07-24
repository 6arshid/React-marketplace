import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

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

const FolderPlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
        <line x1="12" y1="10" x2="12" y2="16"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
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

export default function Create() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        icon: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('categories.store'), { forceFormData: true });
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
                            {t('Back')}
                        </Link>
                        <div className="h-6 border-l border-gray-300"></div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                                <FolderPlusIcon />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">{t('New Category')}</h2>
                                <p className="text-sm text-gray-600">{t('Create a new content category')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={t('New Category')} />
            
            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Main Form Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">{t('Category Details')}</h3>
                            <p className="text-sm text-gray-600 mt-1">{t('Fill in the information below to create your category')}</p>
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
                                        value={t('Category Name')}
                                        className="text-base font-medium text-gray-900"
                                    />
                                </div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    placeholder={t('Enter category name...')}
                                    className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 text-base transition-all duration-200"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                                {data.name && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        {t('Slug will be:')} <span className="font-medium text-gray-700">{data.name.toLowerCase().replace(/\s+/g, '-')}</span>
                                    </p>
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
                                        value={t('Category Icon')}
                                        className="text-base font-medium text-gray-900"
                                    />
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{t('Optional')}</span>
                                </div>
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
                                    {t('Upload an icon to represent this category. Recommended size: 64x64px')}
                                </p>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <Link
                                    href={route('categories.index')}
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                                >
                                    <CancelIcon />
                                    {t('Cancel')}
                                </Link>
                                
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 disabled:hover:scale-100"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" fill="none"/>
                                                <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            {t('Creating...')}
                                        </>
                                    ) : (
                                        <>
                                            <SaveIcon />
                                            {t('Create Category')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Tips Card */}
                    <div className="mt-8 bg-blue-50 rounded-2xl border border-blue-100 p-6">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                <path d="M12 17h.01"/>
                            </svg>
                            {t('Tips for creating categories')}
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                {t('Use descriptive names that clearly represent the content type')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                {t('Icons help users quickly identify categories at a glance')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                {t('Category names will be automatically converted to URL-friendly slugs')}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}