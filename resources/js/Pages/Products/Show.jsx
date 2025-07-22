import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ product }) {
    const [selected, setSelected] = useState(null);

    const addAttributeToCart = (id) => {
        router.post(route('cart.add', product.id), { attribute_id: id }, {
            onSuccess: () => alert('Added to cart'),
        });
        setSelected(id);
    };

    const addToCart = () => {
        router.post(route('cart.add', product.id), {}, {
            onSuccess: () => alert('Added to cart'),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{product.title}</h2>}>
            <Head title={product.title} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-2 bg-white p-4 shadow sm:rounded-lg">
                        <p><strong>Category:</strong> {product.category?.name}</p>
                        <p>
                            <strong>Price:</strong>{' '}
                            <span className={selected ? 'line-through text-gray-400' : ''}>
                                ${product.price}
                            </span>
                        </p>
                        {product.description && <p><strong>Description:</strong> {product.description}</p>}
                        {product.images && product.images.length > 0 && (
                            <div>
                                <strong>Images:</strong>
                                <ul className="list-disc ml-6">
                                    {product.images.map((img, idx) => (
                                        <li key={idx}>
                                            <a href={`/storage/${img}`} target="_blank" rel="noopener">
                                                {img}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {product.is_digital && (
                            <div>
                                {product.demo_file && (
                                    <p>
                                        <strong>Demo File:</strong>{' '}
                                        <a href={`/storage/${product.demo_file}`}>{product.demo_file}</a>
                                    </p>
                                )}
                                {product.main_file && (
                                    <p>
                                        <strong>Main File:</strong>{' '}
                                        <a href={`/storage/${product.main_file}`}>{product.main_file}</a>
                                    </p>
                                )}
                            </div>
                        )}
                        {product.attributes && product.attributes.length > 0 && (
                            <div>
                                <strong>Attributes:</strong>
                                <ul className="list-disc ml-6">
                                    {product.attributes.map((a) => (
                                        <li key={a.id}>
                                            <button
                                                type="button"
                                                onClick={() => addAttributeToCart(a.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {a.title} - {a.option} (${a.price})
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {!product.attributes?.length && (
                            <PrimaryButton type="button" onClick={addToCart} className="mt-2">
                                Add to Cart
                            </PrimaryButton>
                        )}
                        <PrimaryButton as={Link} href={route('products.index')} type="button" className="mt-4">
                            Back
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
