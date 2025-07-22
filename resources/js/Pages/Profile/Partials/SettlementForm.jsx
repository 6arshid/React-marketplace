import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function SettlementForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            trc20_usdt_wallet: user.trc20_usdt_wallet || '',
            iban: user.iban || '',
            swift_code: user.swift_code || '',
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.settlement.update'), { preserveScroll: true });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Settlement Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your settlement information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="trc20_usdt_wallet" value="TRC20 USDT Wallet" />
                    <TextInput
                        id="trc20_usdt_wallet"
                        className="mt-1 block w-full"
                        value={data.trc20_usdt_wallet}
                        onChange={(e) => setData('trc20_usdt_wallet', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.trc20_usdt_wallet} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="iban" value="IBAN" />
                    <TextInput
                        id="iban"
                        className="mt-1 block w-full"
                        value={data.iban}
                        onChange={(e) => setData('iban', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.iban} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="swift_code" value="SWIFT Code" />
                    <TextInput
                        id="swift_code"
                        className="mt-1 block w-full"
                        value={data.swift_code}
                        onChange={(e) => setData('swift_code', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.swift_code} className="mt-2" />
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
