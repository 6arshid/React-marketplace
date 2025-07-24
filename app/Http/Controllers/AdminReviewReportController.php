<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\ReviewReport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminReviewReportController extends Controller
{
    public function index(): Response
    {
        $reports = ReviewReport::with('reporter', 'review.user', 'review.product')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/ReviewReports/Index', [
            'reports' => $reports,
        ]);
    }

    public function suspend(Review $review): RedirectResponse
    {
        $review->update(['suspended_at' => now()]);

        return Redirect::back();
    }

    public function unsuspend(Review $review): RedirectResponse
    {
        $review->update(['suspended_at' => null]);

        return Redirect::back();
    }

    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return Redirect::back();
    }
}
