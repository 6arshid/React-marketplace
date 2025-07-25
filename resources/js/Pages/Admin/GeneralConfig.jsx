import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import ImageCropDropzone from '@/Components/ImageCropDropzone';
import { Head, useForm } from '@inertiajs/react';

export default function GeneralConfig({ env }) {
    const { data, setData, post, processing, errors } = useForm({
        APP_NAME: env.APP_NAME || '',
        APP_ENV: env.APP_ENV || 'local',
        APP_DEBUG: String(env.APP_DEBUG) === 'false' ? 'false' : 'true',
        APP_LOCALE: env.APP_LOCALE || 'en',
        APP_FALLBACK_LOCALE: env.APP_FALLBACK_LOCALE || 'en',
        APP_FAKER_LOCALE: env.APP_FAKER_LOCALE || 'en_US',
        SESSION_DRIVER: env.SESSION_DRIVER || 'database',
        SESSION_LIFETIME: env.SESSION_LIFETIME || '',
        SESSION_ENCRYPT: String(env.SESSION_ENCRYPT) === 'true' ? 'true' : 'false',
        SESSION_PATH: env.SESSION_PATH || '/',
        SESSION_DOMAIN: env.SESSION_DOMAIN || '',
        MAIL_MAILER: env.MAIL_MAILER || 'log',
        MAIL_SCHEME: env.MAIL_SCHEME || '',
        MAIL_HOST: env.MAIL_HOST || '',
        MAIL_PORT: env.MAIL_PORT || '',
        MAIL_USERNAME: env.MAIL_USERNAME || '',
        MAIL_PASSWORD: env.MAIL_PASSWORD || '',
        MAIL_FROM_ADDRESS: env.MAIL_FROM_ADDRESS || '',
        MAIL_FROM_NAME: env.MAIL_FROM_NAME || '',
        AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID || '',
        AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY || '',
        AWS_DEFAULT_REGION: env.AWS_DEFAULT_REGION || '',
        AWS_BUCKET: env.AWS_BUCKET || '',
        AWS_USE_PATH_STYLE_ENDPOINT: String(env.AWS_USE_PATH_STYLE_ENDPOINT) === 'true' ? 'true' : 'false',
        VITE_APP_NAME: env.VITE_APP_NAME || '',
        GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID || '',
        GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET || '',
        MAX_UPLOAD_SIZE_MB: env.MAX_UPLOAD_SIZE_MB || '',
        
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.general-config.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">General Config</h2>}>
            <Head title="General Config" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
                            <div>
                                <InputLabel htmlFor="APP_NAME" value="APP_NAME" />
                                <TextInput id="APP_NAME" value={data.APP_NAME} className="mt-1 block w-full" onChange={e => setData('APP_NAME', e.target.value)} />
                                <InputError message={errors.APP_NAME} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="APP_ENV" value="APP_ENV" />
                                <select id="APP_ENV" value={data.APP_ENV} onChange={e => setData('APP_ENV', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                    <option value="local">local</option>
                                    <option value="production">production</option>
                                </select>
                                <InputError message={errors.APP_ENV} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="APP_DEBUG" value="APP_DEBUG" />
                                <select id="APP_DEBUG" value={data.APP_DEBUG} onChange={e => setData('APP_DEBUG', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                                <InputError message={errors.APP_DEBUG} className="mt-2" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="APP_LOCALE" value="APP_LOCALE" />
                                    <TextInput id="APP_LOCALE" value={data.APP_LOCALE} className="mt-1 block w-full" onChange={e => setData('APP_LOCALE', e.target.value)} />
                                    <InputError message={errors.APP_LOCALE} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="APP_FALLBACK_LOCALE" value="APP_FALLBACK_LOCALE" />
                                    <TextInput id="APP_FALLBACK_LOCALE" value={data.APP_FALLBACK_LOCALE} className="mt-1 block w-full" onChange={e => setData('APP_FALLBACK_LOCALE', e.target.value)} />
                                    <InputError message={errors.APP_FALLBACK_LOCALE} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="APP_FAKER_LOCALE" value="APP_FAKER_LOCALE" />
                                    <TextInput id="APP_FAKER_LOCALE" value={data.APP_FAKER_LOCALE} className="mt-1 block w-full" onChange={e => setData('APP_FAKER_LOCALE', e.target.value)} />
                                    <InputError message={errors.APP_FAKER_LOCALE} className="mt-2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="SESSION_DRIVER" value="SESSION_DRIVER" />
                                    <select
                                        id="SESSION_DRIVER"
                                        value={data.SESSION_DRIVER}
                                        onChange={e => setData('SESSION_DRIVER', e.target.value)}
                                        className="mt-1 block w-full rounded border-gray-300"
                                    >
                                        <option value="file">file</option>
                                        <option value="database">database</option>
                                    </select>
                                    <InputError message={errors.SESSION_DRIVER} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="SESSION_LIFETIME" value="SESSION_LIFETIME" />
                                    <TextInput id="SESSION_LIFETIME" value={data.SESSION_LIFETIME} className="mt-1 block w-full" onChange={e => setData('SESSION_LIFETIME', e.target.value)} />
                                    <InputError message={errors.SESSION_LIFETIME} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="SESSION_ENCRYPT" value="SESSION_ENCRYPT" />
                                    <select id="SESSION_ENCRYPT" value={data.SESSION_ENCRYPT} onChange={e => setData('SESSION_ENCRYPT', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </select>
                                    <InputError message={errors.SESSION_ENCRYPT} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="SESSION_PATH" value="SESSION_PATH" />
                                    <TextInput id="SESSION_PATH" value={data.SESSION_PATH} className="mt-1 block w-full" onChange={e => setData('SESSION_PATH', e.target.value)} />
                                    <InputError message={errors.SESSION_PATH} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="SESSION_DOMAIN" value="SESSION_DOMAIN" />
                                    <TextInput id="SESSION_DOMAIN" value={data.SESSION_DOMAIN} className="mt-1 block w-full" onChange={e => setData('SESSION_DOMAIN', e.target.value)} />
                                    <InputError message={errors.SESSION_DOMAIN} className="mt-2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="MAIL_MAILER" value="MAIL_MAILER" />
                                    <TextInput id="MAIL_MAILER" value={data.MAIL_MAILER} className="mt-1 block w-full" onChange={e => setData('MAIL_MAILER', e.target.value)} />
                                    <InputError message={errors.MAIL_MAILER} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAIL_SCHEME" value="MAIL_SCHEME" />
                                    <TextInput id="MAIL_SCHEME" value={data.MAIL_SCHEME} className="mt-1 block w-full" onChange={e => setData('MAIL_SCHEME', e.target.value)} />
                                    <InputError message={errors.MAIL_SCHEME} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAIL_HOST" value="MAIL_HOST" />
                                    <TextInput id="MAIL_HOST" value={data.MAIL_HOST} className="mt-1 block w-full" onChange={e => setData('MAIL_HOST', e.target.value)} />
                                    <InputError message={errors.MAIL_HOST} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAIL_PORT" value="MAIL_PORT" />
                                    <TextInput id="MAIL_PORT" value={data.MAIL_PORT} className="mt-1 block w-full" onChange={e => setData('MAIL_PORT', e.target.value)} />
                                    <InputError message={errors.MAIL_PORT} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAIL_USERNAME" value="MAIL_USERNAME" />
                                    <TextInput id="MAIL_USERNAME" value={data.MAIL_USERNAME} className="mt-1 block w-full" onChange={e => setData('MAIL_USERNAME', e.target.value)} />
                                    <InputError message={errors.MAIL_USERNAME} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAIL_PASSWORD" value="MAIL_PASSWORD" />
                                    <TextInput id="MAIL_PASSWORD" type="password" value={data.MAIL_PASSWORD} className="mt-1 block w-full" onChange={e => setData('MAIL_PASSWORD', e.target.value)} />
                                    <InputError message={errors.MAIL_PASSWORD} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAIL_FROM_ADDRESS" value="MAIL_FROM_ADDRESS" />
                                    <TextInput id="MAIL_FROM_ADDRESS" value={data.MAIL_FROM_ADDRESS} className="mt-1 block w-full" onChange={e => setData('MAIL_FROM_ADDRESS', e.target.value)} />
                                    <InputError message={errors.MAIL_FROM_ADDRESS} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAIL_FROM_NAME" value="MAIL_FROM_NAME" />
                                    <TextInput id="MAIL_FROM_NAME" value={data.MAIL_FROM_NAME} className="mt-1 block w-full" onChange={e => setData('MAIL_FROM_NAME', e.target.value)} />
                                    <InputError message={errors.MAIL_FROM_NAME} className="mt-2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="AWS_ACCESS_KEY_ID" value="AWS_ACCESS_KEY_ID" />
                                    <TextInput id="AWS_ACCESS_KEY_ID" value={data.AWS_ACCESS_KEY_ID} className="mt-1 block w-full" onChange={e => setData('AWS_ACCESS_KEY_ID', e.target.value)} />
                                    <InputError message={errors.AWS_ACCESS_KEY_ID} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="AWS_SECRET_ACCESS_KEY" value="AWS_SECRET_ACCESS_KEY" />
                                    <TextInput id="AWS_SECRET_ACCESS_KEY" value={data.AWS_SECRET_ACCESS_KEY} className="mt-1 block w-full" onChange={e => setData('AWS_SECRET_ACCESS_KEY', e.target.value)} />
                                    <InputError message={errors.AWS_SECRET_ACCESS_KEY} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="AWS_DEFAULT_REGION" value="AWS_DEFAULT_REGION" />
                                    <TextInput id="AWS_DEFAULT_REGION" value={data.AWS_DEFAULT_REGION} className="mt-1 block w-full" onChange={e => setData('AWS_DEFAULT_REGION', e.target.value)} />
                                    <InputError message={errors.AWS_DEFAULT_REGION} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="AWS_BUCKET" value="AWS_BUCKET" />
                                    <TextInput id="AWS_BUCKET" value={data.AWS_BUCKET} className="mt-1 block w-full" onChange={e => setData('AWS_BUCKET', e.target.value)} />
                                    <InputError message={errors.AWS_BUCKET} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="AWS_USE_PATH_STYLE_ENDPOINT" value="AWS_USE_PATH_STYLE_ENDPOINT" />
                                    <select id="AWS_USE_PATH_STYLE_ENDPOINT" value={data.AWS_USE_PATH_STYLE_ENDPOINT} onChange={e => setData('AWS_USE_PATH_STYLE_ENDPOINT', e.target.value)} className="mt-1 block w-full rounded border-gray-300">
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </select>
                                    <InputError message={errors.AWS_USE_PATH_STYLE_ENDPOINT} className="mt-2" />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="VITE_APP_NAME" value="VITE_APP_NAME" />
                                <TextInput id="VITE_APP_NAME" value={data.VITE_APP_NAME} className="mt-1 block w-full" onChange={e => setData('VITE_APP_NAME', e.target.value)} />
                                <InputError message={errors.VITE_APP_NAME} className="mt-2" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="GOOGLE_CLIENT_ID" value="GOOGLE_CLIENT_ID" />
                                    <TextInput id="GOOGLE_CLIENT_ID" value={data.GOOGLE_CLIENT_ID} className="mt-1 block w-full" onChange={e => setData('GOOGLE_CLIENT_ID', e.target.value)} />
                                    <InputError message={errors.GOOGLE_CLIENT_ID} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="GOOGLE_CLIENT_SECRET" value="GOOGLE_CLIENT_SECRET" />
                                    <TextInput id="GOOGLE_CLIENT_SECRET" value={data.GOOGLE_CLIENT_SECRET} className="mt-1 block w-full" onChange={e => setData('GOOGLE_CLIENT_SECRET', e.target.value)} />
                                    <InputError message={errors.GOOGLE_CLIENT_SECRET} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="MAX_UPLOAD_SIZE_MB" value="MAX_UPLOAD_SIZE_MB" />
                                    <TextInput id="MAX_UPLOAD_SIZE_MB" value={data.MAX_UPLOAD_SIZE_MB} className="mt-1 block w-full" onChange={e => setData('MAX_UPLOAD_SIZE_MB', e.target.value)} />
                                <InputError message={errors.MAX_UPLOAD_SIZE_MB} className="mt-2" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

