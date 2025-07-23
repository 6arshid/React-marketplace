import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicInfoForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            about: user.about || '',
            whatsapp_number: user.whatsapp_number || '',
            telegram_username: user.telegram_username || '',
            instagram_username: user.instagram_username || '',
            facebook_username: user.facebook_username || '',
        });

    const [logo, setLogo] = useState(null);
    const [cover, setCover] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.contact.update'), {
            preserveScroll: true,
            onSuccess: () => {
                if (logo) {
                    const formData = new FormData();
                    formData.append('logo', logo);
                    router.post(route('profile.logo'), formData, { forceFormData: true });
                }
                if (cover) {
                    const formData = new FormData();
                    formData.append('cover', cover);
                    router.post(route('profile.cover'), formData, { forceFormData: true });
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Public Information</h2>
                <p className="mt-1 text-sm text-gray-600">Update your profile and social links.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="about" value="About" />
                    <textarea
                        id="about"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.about}
                        onChange={(e) => setData('about', e.target.value)}
                    />
                    <InputError message={errors.about} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="whatsapp_number" value="WhatsApp Number" />
                    <TextInput
                        id="whatsapp_number"
                        className="mt-1 block w-full"
                        value={data.whatsapp_number}
                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.whatsapp_number} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="telegram_username" value="Telegram Username" />
                    <TextInput
                        id="telegram_username"
                        className="mt-1 block w-full"
                        value={data.telegram_username}
                        onChange={(e) => setData('telegram_username', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.telegram_username} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="instagram_username" value="Instagram" />
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
                    <InputLabel htmlFor="facebook_username" value="Facebook" />
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
                    <InputLabel htmlFor="logo" value="Logo" />
                    <input
                        id="logo"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setLogo(e.target.files[0])}
                    />
                    <InputError message={errors.logo} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="cover" value="Cover" />
                    <input
                        id="cover"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setCover(e.target.files[0])}
                    />
                    <InputError message={errors.cover} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
