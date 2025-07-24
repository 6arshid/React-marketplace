import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import ReplyForm from './ReplyForm';
import ReviewReportModal from './ReviewReportModal';

export default function ReviewList({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [next, setNext] = useState(null);
    const [replying, setReplying] = useState(null);
    const [reporting, setReporting] = useState(null);
    const userId = usePage().props.auth?.user?.id;

    const loadReviews = (url = route('reviews.index', productId)) => {
        axios.get(url).then((res) => {
            setReviews((prev) => [...prev, ...res.data.data]);
            setNext(res.data.next_page_url);
        });
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleLike = (id, like) => {
        axios.post(route(like ? 'reviews.like' : 'reviews.dislike', id)).then((res) => {
            setReviews((prev) =>
                prev.map((rv) =>
                    rv.id === id
                        ? {
                              ...rv,
                              likes: [...(rv.likes || []).filter((l) => l.user_id !== res.data.user_id), res.data],
                          }
                        : rv
                )
            );
        });
    };

    const handleReplyCreated = (id, reply) => {
        setReviews((prev) =>
            prev.map((rv) => (rv.id === id ? { ...rv, replies: [...(rv.replies || []), reply] } : rv))
        );
        setReplying(null);
    };

    const likeCount = (r) => r.likes.filter((l) => l.is_like).length;
    const dislikeCount = (r) => r.likes.filter((l) => !l.is_like).length;

    const userReaction = (r) => r.likes.find((l) => l.user_id === userId)?.is_like;

    return (
        <div className="space-y-4">
            {reviews.map((r) => (
                <div key={r.id} className="border p-2 rounded">
                    <div className="font-semibold">{r.user.name} - {r.rating}★</div>
                    <p>{r.body}</p>
                    <div className="flex space-x-2 text-sm mt-1">
                        <button
                            className={
                                'flex items-center space-x-1 ' + (userReaction(r) === true ? 'text-green-600' : '')
                            }
                            onClick={() => handleLike(r.id, true)}
                        >
                            <span>Like</span>
                            <span>({likeCount(r)})</span>
                        </button>
                        <button
                            className={
                                'flex items-center space-x-1 ' + (userReaction(r) === false ? 'text-red-600' : '')
                            }
                            onClick={() => handleLike(r.id, false)}
                        >
                            <span>Dislike</span>
                            <span>({dislikeCount(r)})</span>
                        </button>
                        <button onClick={() => setReplying(replying === r.id ? null : r.id)}>Reply</button>
                        <button onClick={() => setReporting(r.id)}>Report</button>
                    </div>
                    {replying === r.id && <ReplyForm reviewId={r.id} onCreated={(reply) => handleReplyCreated(r.id, reply)} />}
                    {r.replies.map((rep) => (
                        <div key={rep.id} className="ml-4 mt-2 border-l pl-2">
                            <div className="font-semibold">{rep.user.name}</div>
                            <p className="text-sm">{rep.body}</p>
                        </div>
                    ))}
                </div>
            ))}
            {next && (
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => loadReviews(next)}>
                    Load more
                </button>
            )}
            <ReviewReportModal reviewId={reporting} show={Boolean(reporting)} onClose={() => setReporting(null)} />
        </div>
    );
}
