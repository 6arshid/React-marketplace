import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ProPanel({ config, proUsers }) {
    const { data, setData, post, processing, errors } = useForm({
        price: config?.price || 10,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.pro-panel.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pro Panel</h2>}>
            <Head title="Pro Panel" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white p-4 shadow sm:rounded-lg space-y-2">
                        <div>
                            <InputLabel htmlFor="price" value="Monthly Price ($)" />
                            <TextInput id="price" value={data.price} className="mt-1 block w-full" onChange={(e) => setData('price', e.target.value)} />
                        </div>
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
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
