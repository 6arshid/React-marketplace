export default function StarRating({ rating = 0, onChange }) {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div className="flex space-x-1">
            {stars.map((star) => (
                <svg
                    key={star}
                    onClick={() => onChange && onChange(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={rating >= star ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer text-yellow-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.063 6.319a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.907a1 1 0 00-.364 1.118l2.063 6.318c.3.922-.755 1.688-1.54 1.118l-5.379-3.906a1 1 0 00-1.175 0l-5.379 3.906c-.784.57-1.838-.196-1.539-1.118l2.062-6.318a1 1 0 00-.364-1.118L2.803 11.746c-.783-.57-.38-1.81.588-1.81h6.647a1 1 0 00.95-.69l2.061-6.319z"
                    />
                </svg>
            ))}
        </div>
    );
}
