import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Statistics({ topProducts = [], totalViews = 0, profileViews = 0 }) {
    const { t } = useTranslation();

    // Sample chart data using total views spread over last 12 months
    const labels = Array.from({ length: 12 }, (_, i) => t('Month') + ' ' + (i + 1));
    const productData = {
        labels,
        datasets: [
            {
                label: t('Product Views'),
                data: labels.map(() => Math.floor(totalViews / 12)),
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const profileData = {
        labels,
        datasets: [
            {
                label: t('Profile Views'),
                data: labels.map(() => Math.floor(profileViews / 12)),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.3,
            },
        ],
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('Statistics')}</h2>}>
            <Head title={t('Statistics')} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">{t('Product Views')}</h3>
                        <Line data={productData} />
                    </div>
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">{t('Profile Views')}</h3>
                        <Line data={profileData} />
                    </div>
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">{t('Top 10 Products')}</h3>
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">{t('Product')}</th>
                                    <th className="px-4 py-2 text-right">{t('Views')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((p) => (
                                    <tr key={p.id} className="border-b">
                                        <td className="px-4 py-2">
                                            <Link href={route('products.show', p.slug)} className="text-blue-600 hover:underline">
                                                {p.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 text-right">{p.views}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
