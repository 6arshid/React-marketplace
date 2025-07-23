import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, useForm, Link } from '@inertiajs/react';
import Editor from 'react-simple-wysiwyg';

export default function Edit({ page }) {
    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        description: page.description || '',
        images: page.images || [],
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('seller.pages.update', page.slug), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Page</h2>}>
            <Head title="Edit Page" />
            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                        <div>
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput id="title" value={data.title} className="mt-1 block w-full" onChange={e=>setData('title', e.target.value)} />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <Editor id="description" value={data.description} onChange={e=>setData('description', e.target.value)} containerProps={{className:'min-h-[120px] border rounded'}} />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="images" value="Images" />
                            <FileDropzone name="images" multiple value={data.images} onChange={f=>setData('images', f)} />
                            <InputError message={errors.images} className="mt-2" />
                        </div>
                        <div className="flex justify-between">
                            <Link href={route('seller.pages.index')} className="text-gray-600 hover:underline">Cancel</Link>
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
