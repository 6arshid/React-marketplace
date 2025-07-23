import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { component, url, props } = usePage();
    const isAuthPage = component && component.startsWith('Auth/');

    const isProfilePage = /^\/[a-zA-Z0-9_-]+$/.test(url);
    const isProductPage = url.startsWith('/products/');
    const isCartPage = url === '/cart';
    const isCategoryPage = url.includes('/store/categories/');

    const hideLogo = isProfilePage || isProductPage || isCartPage || isCategoryPage;

    const user = props?.auth?.user;
    const userInitial = user?.name?.charAt(0)?.toUpperCase();
    const profileUrl = user ? `/${user.username}` : '/profile';

    if (isAuthPage) {
        return (
            <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="mb-4 flex justify-between items-center">
                {!hideLogo ? (
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-12 fill-current text-gray-500" />
                    </Link>
                ) : user ? (
                    <Link href={profileUrl} className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 text-lg font-semibold overflow-hidden">
                        {user.logo ? (
                            <img
                                src={`/storage/${user.logo}`}
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span>{userInitial}</span>
                        )}
                    </Link>
                ) : null}

                <Link href="/cart" className="text-blue-600 hover:underline">
                    Cart
                </Link>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}