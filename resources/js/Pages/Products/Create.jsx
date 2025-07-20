import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ categories }) {
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

    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">New Product</h2>}>
            <Head title="New Product" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput id="title" value={data.title} className="mt-1 block w-full" onChange={(e) => setData('title', e.target.value)} />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea id="description" value={data.description} className="mt-1 block w-full" onChange={(e) => setData('description', e.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput id="price" type="number" value={data.price} className="mt-1 block w-full" onChange={(e) => setData('price', e.target.value)} />
                                <InputError message={errors.price} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="category_id" value="Category" />
                                <select id="category_id" value={data.category_id} className="mt-1 block w-full" onChange={(e) => setData('category_id', e.target.value)}>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={data.is_digital} onChange={(e) => setData('is_digital', e.target.checked)} />
                                    <span className="ms-2">Digital Product</span>
                                </label>
                            </div>
                            {!data.is_digital && (
                                <div>
                                    <InputLabel htmlFor="shipping_cost" value="Shipping Cost" />
                                    <TextInput id="shipping_cost" type="number" value={data.shipping_cost} className="mt-1 block w-full" onChange={(e) => setData('shipping_cost', e.target.value)} />
                                    <InputError message={errors.shipping_cost} className="mt-2" />
                                </div>
                            )}
                            {data.is_digital && (
                                <div className="space-y-2">
                                    <div>
                                        <InputLabel htmlFor="demo_file" value="Demo File" />
                                        <FileDropzone
                                            value={data.demo_file}
                                            onChange={(file) => setData('demo_file', file)}
                                            className="mt-1"
                                        />
                                        <InputError message={errors.demo_file} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="main_file" value="Main File" />
                                        <FileDropzone
                                            value={data.main_file}
                                            onChange={(file) => setData('main_file', file)}
                                            className="mt-1"
                                        />
                                        <InputError message={errors.main_file} className="mt-2" />
                                    </div>
                                </div>
                            )}
                            <div>
                                <InputLabel htmlFor="images" value="Images" />
                                <FileDropzone
                                    multiple
                                    value={data.images}
                                    onChange={(files) => setData('images', files)}
                                    className="mt-1"
                                />
                                <InputError message={errors.images} className="mt-2" />
                            </div>
                            <div>
                                <button type="button" onClick={addAttribute} className="text-sm text-blue-500">Add Attribute</button>
                                {attributeInputs.map((attr, index) => (
                                    <div key={index} className="mt-2 grid grid-cols-3 gap-2">
                                        <TextInput placeholder="Title" value={attr.title} onChange={(e) => {
                                            const copy = [...attributeInputs];
                                            copy[index].title = e.target.value;
                                            setAttributeInputs(copy);
                                            setData('attributes', copy);
                                        }} />
                                        <TextInput placeholder="Option" value={attr.option} onChange={(e) => {
                                            const copy = [...attributeInputs];
                                            copy[index].option = e.target.value;
                                            setAttributeInputs(copy);
                                            setData('attributes', copy);
                                        }} />
                                        <TextInput placeholder="Price" type="number" value={attr.price} onChange={(e) => {
                                            const copy = [...attributeInputs];
                                            copy[index].price = e.target.value;
                                            setAttributeInputs(copy);
                                            setData('attributes', copy);
                                        }} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                <PrimaryButton as={Link} href={route('products.index')} type="button" className="bg-gray-200 text-black hover:bg-gray-300">Cancel</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
