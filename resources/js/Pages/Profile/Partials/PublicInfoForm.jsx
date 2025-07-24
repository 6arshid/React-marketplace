import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FileDropzone from '@/Components/FileDropzone';
import { Transition } from '@headlessui/react';
import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PublicInfoForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            about: user.about || '',
            instagram_username: user.instagram_username || '',
            facebook_username: user.facebook_username || '',
        });

    const [logo, setLogo] = useState(user.logo ?? '');
    const [cover, setCover] = useState(user.cover ?? '');

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.contact.update'), {
            preserveScroll: true,
            onSuccess: () => {
                if (logo instanceof File) {
                    const formData = new FormData();
                    formData.append('logo', logo);
                    router.post(route('profile.logo'), formData, { forceFormData: true });
                } else if (logo === null && user.logo) {
                    router.delete(route('profile.logo.delete'));
                }
                if (cover instanceof File) {
                    const formData = new FormData();
                    formData.append('cover', cover);
                    router.post(route('profile.cover'), formData, { forceFormData: true });
                } else if (cover === null && user.cover) {
                    router.delete(route('profile.cover.delete'));
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">{t('Public Information')}</h2>
                <p className="mt-1 text-sm text-gray-600">{t('Update your profile and social links.')}</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="about" value={t('About')} />
                    <textarea
                        id="about"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.about}
                        onChange={(e) => setData('about', e.target.value)}
                    />
                    <InputError message={errors.about} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="instagram_username" value={t('Instagram')} />
                    <TextInput
                        id="instagram_username"
                        className="mt-1 block w-full"
                        value={data.instagram_username}
                        onChange={(e) => setData('instagram_username', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.instagram_username} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="facebook_username" value={t('Facebook')} />
                    <TextInput
                        id="facebook_username"
                        className="mt-1 block w-full"
                        value={data.facebook_username}
                        onChange={(e) => setData('facebook_username', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.facebook_username} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="logo" value={t('Logo')} />
                    {logo && typeof logo === 'string' && (
                        <div className="mt-2 mb-2 relative w-24 h-24">
                            <img
                                src={`/storage/${logo}`}
                                alt="logo"
                                className="h-24 w-24 object-cover rounded-full border"
                            />
                            <button
                                type="button"
                                onClick={() => setLogo(null)}
                                className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                    <FileDropzone
                        name="logo"
                        value={logo}
                        onChange={setLogo}
                        className="mt-2"
                    />
                    <InputError message={errors.logo} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="cover" value={t('Cover')} />
                    {cover && typeof cover === 'string' && (
                        <div className="mt-2 mb-2 relative">
                            <img
                                src={`/storage/${cover}`}
                                alt="cover"
                                className="h-32 w-full object-cover rounded border"
                            />
                            <button
                                type="button"
                                onClick={() => setCover(null)}
                                className="absolute top-2 right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                    <FileDropzone
                        name="cover"
                        value={cover}
                        onChange={setCover}
                        className="mt-2"
                    />
                    <InputError message={errors.cover} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">{t('Saved.')}</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
