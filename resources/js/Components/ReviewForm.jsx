import { useForm } from '@inertiajs/react';
import StarRating from './StarRating';

export default function ReviewForm({ productId, onCreated }) {
    const { data, setData, post, processing, reset } = useForm({
        rating: 5,
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('reviews.store', productId), {
            preserveScroll: true,
            onSuccess: (res) => {
                onCreated(res.props ?? res);
                reset();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-2">
            <StarRating rating={data.rating} onChange={(r) => setData('rating', r)} />
            <textarea
                value={data.body}
                onChange={(e) => setData('body', e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Write a review..."
            />
            <button type="submit" disabled={processing} className="px-3 py-1 bg-blue-500 text-white rounded">
                Submit
            </button>
        </form>
    );
}
