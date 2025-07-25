import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm, Link } from '@inertiajs/react';
import Editor from 'react-simple-wysiwyg';
import { useTranslation } from 'react-i18next';

// Custom SVG Icons - Mobile Responsive
const EditIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4z"/>
    </svg>
);

const TitleIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);

const DescriptionIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ImageIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const SaveIcon = () => (
    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const BackIcon = () => (
    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

export default function Edit({ page }) {
    const { t } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        description: page.description || '',
        images: page.images || [],
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);

        // تصاویر
        if (Array.isArray(data.images)) {
            data.images.forEach((file, i) => {
                if (file instanceof File) {
                    formData.append(`images[${i}]`, file);
                }
            });
        }

        // برای درخواست PUT در لاراول
        formData.append('_method', 'PUT');

        Inertia.post(route('seller.pages.update', page.slug), formData, {
            preserveScroll: true,
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg text-white">
                        <EditIcon />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                        {t('Edit Page')}
                    </h2>
                </div>
            }
        >
            <Head title={t('Edit Page')} />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-100 py-4 sm:py-8">
                <div className="mx-auto max-w-4xl px-3 sm:px-4 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-4 sm:px-8 py-4 sm:py-6">
                            <h3 className="text-white text-base sm:text-lg font-semibold flex items-center space-x-2">
                                <EditIcon />
                                <span>{t('Edit Page Information')}</span>
                            </h3>
                        </div>

                        <form onSubmit={submit} className="p-4 sm:p-8 space-y-6 sm:space-y-8" encType="multipart/form-data">
                            {/* Basic Information Section */}
                            <div className="space-y-4 sm:space-y-6">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center space-x-2 border-b border-gray-200 pb-2">
                                    <TitleIcon />
                                    <span>{t('Basic Information')}</span>
                                </h4>
                                
                                <div>
                                    <InputLabel 
                                        htmlFor="title" 
                                        value={t('Page Title')}
                                        className="flex items-center space-x-2 text-gray-700 font-medium mb-2 text-sm sm:text-base"
                                    />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <TitleIcon />
                                        </div>
                                        <TextInput 
                                            id="title" 
                                            value={data.title} 
                                            className="pl-8 sm:pl-10 w-full rounded-lg sm:rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base py-2.5 sm:py-3" 
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder={t('Enter page title...')}
                                        />
                                    </div>
                                    <InputError message={errors.title} className="mt-2 text-red-500 text-sm" />
                                </div>

                                <div>
                                    <InputLabel 
                                        htmlFor="description" 
                                        value={t('Page Content')}
                                        className="flex items-center space-x-2 text-gray-700 font-medium mb-2 text-sm sm:text-base"
                                    />
                                    <Editor
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder={t('Update your page content...')}
                                        containerProps={{
                                            className:
                                                'w-full rounded-lg sm:rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white min-h-[120px] sm:min-h-[150px]'
                                        }}
                                    />
                                    <InputError message={errors.description} className="mt-2 text-red-500 text-sm" />
                                </div>
                            </div>

                            {/* Images Section */}
                            <div className="space-y-4 sm:space-y-6">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center space-x-2 border-b border-gray-200 pb-2">
                                    <ImageIcon />
                                    <span>{t('Page Images')}</span>
                                </h4>
                                
                                <div>
                                    <InputLabel 
                                        htmlFor="images" 
                                        value={t('Update Images')}
                                        className="flex items-center space-x-2 text-gray-700 font-medium mb-2 text-sm sm:text-base"
                                    />
                                    <FileDropzone
                                        name="images"
                                        multiple
                                        value={data.images}
                                        onChange={(files) => setData('images', files)}
                                        className="rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors duration-200"
                                    />
                                    <InputError message={errors.images} className="mt-2 text-red-500 text-sm" />
                                </div>
                            </div>

                            {/* Action Buttons - Mobile Responsive */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-6 sm:pt-8 border-t border-gray-200 space-y-3 sm:space-y-0 sm:space-x-4">
                                <Link 
                                    href={route('seller.pages.index')} 
                                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all duration-200 border border-gray-200 text-sm sm:text-base order-2 sm:order-1"
                                >
                                    <BackIcon />
                                    <span>{t('Cancel')}</span>
                                </Link>
                                
                                <PrimaryButton 
                                    disabled={processing} 
                                    className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                                >
                                    {processing ? (
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <SaveIcon />
                                    )}
                                    <span>{processing ? t('Saving...') : t('Save Changes')}</span>
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}