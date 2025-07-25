import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

export default function Installed() {
    return (
        <GuestLayout>
            <Head title="Installation Complete" />
            <div className="space-y-4 text-center">
                <h1 className="text-2xl font-bold">Installation Complete</h1>
                <p>Admin email: <strong>admin@admin.com</strong></p>
                <p>Password: <strong>admin@admin.com</strong></p>
                <Link href="/login">
                    <PrimaryButton>Go to Login</PrimaryButton>
                </Link>
            </div>
        </GuestLayout>
    );
}

