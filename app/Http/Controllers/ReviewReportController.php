<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\ReviewReport;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ReviewReportController extends Controller
{
    public function store(Request $request, Review $review): RedirectResponse
    {
        $data = $request->validate([
            'reason' => ['required', 'string'],
            'evidence' => ['nullable', 'file', 'mimes:jpg,jpeg,png,gif,mov,mp4'],
        ]);

        $path = null;
        if ($request->hasFile('evidence')) {
            $path = $request->file('evidence')->store('review-reports', 'public');
        }

        ReviewReport::create([
            'reporter_id' => $request->user()?->id,
            'review_id' => $review->id,
            'reason' => $data['reason'],
            'evidence' => $path,
        ]);

        return Redirect::back()->with('success', __('messages.review_report_submitted'));
    }
}
