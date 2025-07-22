import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash;
    const cart = usePage().props.cart;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-white transition-transform duration-200 ease-in-out sm:relative sm:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}
            >
                <div className="flex h-16 items-center justify-between border-b px-4">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                    <button
                        className="sm:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="mt-4 space-y-1 px-4">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('products.index')} active={route().current('products.index')}>
                        Products
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('categories.index')} active={route().current('categories.index')}>
                        Categories
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('cart.show')} active={route().current('cart.show')}>
                        Cart ({cart.count})
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('transactions.index')} active={route().current('transactions.index')}>
                        Transactions
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('orders.index')} active={route().current('orders.index')}>
                        Orders
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('sales.index')} active={route().current('sales.index')}>
                        Sales
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('orders.downloads')} active={route().current('orders.downloads')}>
                        Downloads
                    </ResponsiveNavLink>
                    {user.is_admin && (
                        <ResponsiveNavLink href={route('admin.index')} active={route().current('admin.index')}>
                            Admin
                        </ResponsiveNavLink>
                    )}
                </div>

            </aside>

            <div className="flex min-h-screen flex-1 flex-col">
                <div className="flex items-center justify-between border-b bg-white p-2">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none sm:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                >
                                    {user.name}
                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                {flash.success && (
                    <div className="bg-green-100 p-2 text-center text-sm text-green-800">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="bg-red-100 p-2 text-center text-sm text-red-800">
                        {flash.error}
                    </div>
                )}

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
