<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NotificationController extends Controller
{
    public function markAllRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return Redirect::back();
    }
}
