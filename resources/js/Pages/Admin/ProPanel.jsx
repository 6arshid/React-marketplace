import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ProPanel({ config, proUsers }) {
    const {
        data: priceData,
        setData: setPriceData,
        post: postPrice,
        processing: priceProcessing,
        errors: priceErrors,
    } = useForm({
        price: config?.price || 10,
    });

    const {
        data: userData,
        setData: setUserData,
        post: postUser,
        processing: userProcessing,
        errors: userErrors,
        reset: resetUser,
    } = useForm({
        email: '',
        expires_at: '',
    });

    const submitPrice = (e) => {
        e.preventDefault();
        postPrice(route('admin.pro-panel.update'));
    };

    const submitUser = (e) => {
        e.preventDefault();
        postUser(route('admin.pro-panel.user'), {
            preserveScroll: true,
            onSuccess: () => resetUser('email', 'expires_at'),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pro Panel</h2>}>
            <Head title="Pro Panel" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    <form onSubmit={submitPrice} className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                        <div>
                            <InputLabel htmlFor="price" value="Monthly Price ($)" />
                            <TextInput id="price" value={priceData.price} className="mt-1 block w-full" onChange={(e) => setPriceData('price', e.target.value)} />
                            {priceErrors.price && <p className="text-sm text-red-600 mt-2">{priceErrors.price}</p>}
                        </div>
                        <PrimaryButton disabled={priceProcessing}>Save</PrimaryButton>
                    </form>

                    <form onSubmit={submitUser} className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                        <div>
                            <InputLabel htmlFor="email" value="User Email" />
                            <TextInput id="email" type="email" value={userData.email} className="mt-1 block w-full" onChange={(e) => setUserData('email', e.target.value)} required />
                            {userErrors.email && <p className="text-sm text-red-600 mt-2">{userErrors.email}</p>}
                        </div>
                        <div>
                            <InputLabel htmlFor="expires_at" value="Expires At" />
                            <TextInput id="expires_at" type="date" value={userData.expires_at} className="mt-1 block w-full" onChange={(e) => setUserData('expires_at', e.target.value)} required />
                            {userErrors.expires_at && <p className="text-sm text-red-600 mt-2">{userErrors.expires_at}</p>}
                        </div>
                        <PrimaryButton disabled={userProcessing}>Add / Update User</PrimaryButton>
                    </form>

                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">User</th>
                                    <th className="px-3 py-2 text-sm font-semibold text-gray-700">Expires At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {proUsers.data.map((u) => (
                                    <tr key={u.id}>
                                        <td className="px-3 py-2 text-sm text-gray-900">{u.name}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900">{u.pro_panel_expires_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 flex gap-2">
                            {proUsers.links.map((l, idx) => (
                                <Link key={idx} href={l.url || '#'} className={l.active ? 'font-bold' : ''} dangerouslySetInnerHTML={{ __html: l.label }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
