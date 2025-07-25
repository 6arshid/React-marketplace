import { usePage } from '@inertiajs/react';

export default function ApplicationLogo(props) {
    const settings = usePage().props.settings || {};
    const logo = settings.app_logo;

    if (logo) {
        return <img {...props} src={`/storage/${logo}`} alt="Logo" />;
    }

    return (
        <svg {...props} viewBox="0 0 316 316" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h316v316H0z" fill="currentColor" />
        </svg>
    );
}
