import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, useForm, Link } from '@inertiajs/react';
import Editor from 'react-simple-wysiwyg';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';

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

    if (Array.isArray(data.images)) {
        data.images.forEach((file, i) => {
            if (file instanceof File) {
                formData.append(`images[${i}]`, file);
            }
        });
    }

    formData.append('_method', 'PUT');

    Inertia.post(route('admin.pages.update', page.slug), formData, {
        preserveScroll: true,
        onError: (errors) => console.log(errors),
        onSuccess: () => {
            console.log('Page updated successfully!');
        }
    });
};


    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Edit Page')}</h2>}>
            <Head title={t('Edit Page')} />
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
                            <Link href={route('admin.pages.index')} className="text-gray-600 hover:underline">{t('Cancel')}</Link>
                            <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
