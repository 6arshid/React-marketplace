import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, useForm, Link } from '@inertiajs/react';
import Editor from 'react-simple-wysiwyg';
import { useTranslation } from 'react-i18next';

export default function Create() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('seller.pages.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('New Page')}</h2>}>
            <Head title={t('New Page')} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                        <div>
                            <InputLabel htmlFor="title" value={t('Title')} />
                            <TextInput id="title" value={data.title} className="mt-1 block w-full" onChange={e=>setData('title', e.target.value)} />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="description" value={t('Description')} />
                            <Editor id="description" value={data.description} onChange={e=>setData('description', e.target.value)} containerProps={{className:'min-h-[120px] border rounded'}} />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="images" value={t('Images')} />
                            <FileDropzone name="images" multiple value={data.images} onChange={f=>setData('images', f)} />
                            <InputError message={errors.images} className="mt-2" />
                        </div>
                        <div className="flex justify-between">
                            <Link href={route('seller.pages.index')} className="text-gray-600 hover:underline">{t('Cancel')}</Link>
                            <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
