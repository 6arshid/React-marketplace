import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function ReplyForm({ reviewId, onCreated }) {
    const { data, setData, reset } = useForm({ body: '' });
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!data.body.trim()) return;
        setProcessing(true);
        try {
            const res = await axios.post(route('reviews.reply', reviewId), data);
            onCreated(res.data);
            reset();
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={submit} className="mt-2 space-y-2">
            <textarea
                value={data.body}
                onChange={(e) => setData('body', e.target.value)}
                className="w-full border rounded p-2 text-sm"
                placeholder="Write a reply..."
            />
            <button type="submit" disabled={processing} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                Reply
            </button>
        </form>
    );
}
