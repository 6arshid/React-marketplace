import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import StarRating from './StarRating';

export default function ReviewForm({ productId, onCreated }) {
    const { data, setData, reset } = useForm({
        rating: 5,
        body: '',
    });
    const [processing, setProcessing] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const res = await axios.post(route('reviews.store', productId), data);
            onCreated(res.data);
            setShowToast(true);
            reset();
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="space-y-2">
            {showToast && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">Review submitted successfully!</span>
                    </div>
                </div>
            )}
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
        </div>
    );
}
