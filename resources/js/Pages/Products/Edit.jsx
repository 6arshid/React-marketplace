import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

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
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Product</h2>}>
            <Head title="Edit Product" />
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
                                        <TextInput placeholder="Title" value={attr.title} onChange={(e) => updateAttr(index, 'title', e.target.value)} />
                                        <TextInput placeholder="Option" value={attr.option} onChange={(e) => updateAttr(index, 'option', e.target.value)} />
                                        <TextInput placeholder="Price" type="number" value={attr.price} onChange={(e) => updateAttr(index, 'price', e.target.value)} />
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
