import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReviewList({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [next, setNext] = useState(null);

    const loadReviews = (url = route('reviews.index', productId)) => {
        axios.get(url).then((res) => {
            setReviews((prev) => [...prev, ...res.data.data]);
            setNext(res.data.next_page_url);
        });
    };

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <div className="space-y-4">
            {reviews.map((r) => (
                <div key={r.id} className="border p-2 rounded">
                    <div className="font-semibold">{r.user.name} - {r.rating}★</div>
                    <p>{r.body}</p>
                </div>
            ))}
            {next && (
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => loadReviews(next)}>
                    Load more
                </button>
            )}
        </div>
    );
}
