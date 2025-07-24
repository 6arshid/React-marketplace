import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileDropzone from '@/Components/FileDropzone';
import { Head, useForm } from '@inertiajs/react';

export default function Appearance({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        app_logo: null,
        welcome_footer_text: settings.welcome_footer_text || '',
        privacy_url: settings.footer_privacy_url || '',
        terms_url: settings.footer_terms_url || '',
        support_url: settings.footer_support_url || '',
        guest_footer_payment_label: settings.guest_footer_payment_label || '',
        payment_icon1: null,
        payment_icon2: null,
        payment_icon3: null,
        payment_icon4: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.appearance.update'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Appearance</h2>}>
            <Head title="Appearance" />
            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                        <div>
                            <InputLabel htmlFor="app_logo" value="Application Logo (SVG)" />
                            <FileDropzone name="app_logo" accept="image/svg+xml" value={data.app_logo} onChange={(f) => setData('app_logo', f)} />
                            <InputError message={errors.app_logo} className="mt-2" />
                            {settings.app_logo && !data.app_logo && (
                                <img src={`/storage/${settings.app_logo}`} alt="Current logo" className="h-16 mt-2" />
                            )}
                        </div>
                        <div>
                            <InputLabel htmlFor="welcome_footer_text" value="Welcome Footer Text" />
                            <TextInput id="welcome_footer_text" value={data.welcome_footer_text} className="mt-1 block w-full" onChange={(e) => setData('welcome_footer_text', e.target.value)} />
                            <InputError message={errors.welcome_footer_text} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel value="Footer Links" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <TextInput placeholder="Privacy URL" value={data.privacy_url} onChange={(e) => setData('privacy_url', e.target.value)} />
                                <TextInput placeholder="Terms URL" value={data.terms_url} onChange={(e) => setData('terms_url', e.target.value)} />
                                <TextInput placeholder="Support URL" value={data.support_url} onChange={(e) => setData('support_url', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <InputLabel htmlFor="guest_footer_payment_label" value="Guest Footer Payment Label" />
                            <TextInput id="guest_footer_payment_label" value={data.guest_footer_payment_label} className="mt-1 block w-full" onChange={(e) => setData('guest_footer_payment_label', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel value="Payment Icons (SVG)" />
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {['payment_icon1','payment_icon2','payment_icon3','payment_icon4'].map((k,idx) => (
                                    <FileDropzone key={k} name={k} accept="image/svg+xml" value={data[k]} onChange={(f) => setData(k, f)} />
                                ))}
                            </div>
                            <div className="flex space-x-2 mt-2">
                                {['payment_icon1','payment_icon2','payment_icon3','payment_icon4'].map((k) => (
                                    settings[k] && !data[k] ? <img key={k} src={`/storage/${settings[k]}`} alt="icon" className="h-6" /> : null
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
