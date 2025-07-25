<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()
            ->notifications()
            ->latest()
            ->paginate(10);

        $notifications->getCollection()->transform(function (DatabaseNotification $n) {
            return [
                'id' => $n->id,
                'data' => $n->data,
                'created_at' => $n->created_at->diffForHumans(),
            ];
        });

        return response()->json($notifications);
    }

    public function markAllRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return Redirect::back()->with('success', __('messages.notifications_marked_read'));
    }
}
