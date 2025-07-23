<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use App\Models\ReviewLike;
use App\Notifications\ReviewReplied;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request, Product $product)
    {
        $reviews = Review::with(['user', 'replies.user', 'likes'])
            ->where('product_id', $product->id)
            ->whereNull('parent_id')
            ->latest()
            ->paginate(5);

        return response()->json($reviews);
    }

    public function store(Request $request, Product $product)
    {
        $data = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'body' => 'required|string',
        ]);

        $review = $product->reviews()->create(array_merge($data, [
            'user_id' => $request->user()->id,
        ]));

        return response()->json($review->load('user'));
    }

    public function reply(Request $request, Review $review)
    {
        $data = $request->validate([
            'body' => 'required|string',
        ]);

        $reply = $review->replies()->create([
            'user_id' => $request->user()->id,
            'product_id' => $review->product_id,
            'rating' => $review->rating,
            'body' => $data['body'],
        ]);

        $review->user->notify(new ReviewReplied($reply));

        return response()->json($reply->load('user'));
    }

    public function destroy(Request $request, Review $review)
    {
        if ($review->user_id !== $request->user()->id) {
            abort(403);
        }

        $review->delete();

        return response()->noContent();
    }

    public function like(Request $request, Review $review)
    {
        $like = ReviewLike::updateOrCreate([
            'user_id' => $request->user()->id,
            'review_id' => $review->id,
        ], [
            'is_like' => true,
        ]);

        return response()->json($like);
    }

    public function dislike(Request $request, Review $review)
    {
        $like = ReviewLike::updateOrCreate([
            'user_id' => $request->user()->id,
            'review_id' => $review->id,
        ], [
            'is_like' => false,
        ]);

        return response()->json($like);
    }
}
