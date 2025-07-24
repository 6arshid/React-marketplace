<?php

namespace App\Http\Controllers;

use App\Models\SocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SocialLinkController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->socialLinks()->get(['id', 'label', 'url', 'icon']));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label' => 'required|string',
            'url' => 'required|string',
            'icon' => 'nullable|file',
        ]);

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('icons', 'public');
        }

        $link = $request->user()->socialLinks()->create($data);

        return back()->with('success', __('messages.social_link_created'))->withJson($link);
    }

    public function update(Request $request, SocialLink $socialLink)
    {
        if ($socialLink->user_id !== $request->user()->id) {
            abort(403);
        }

        $data = $request->validate([
            'label' => 'required|string',
            'url' => 'required|string',
            'icon' => 'nullable',
        ]);

        if ($request->hasFile('icon')) {
            if ($socialLink->icon) {
                Storage::disk('public')->delete($socialLink->icon);
            }
            $data['icon'] = $request->file('icon')->store('icons', 'public');
        } elseif ($request->input('icon') === null) {
            if ($socialLink->icon) {
                Storage::disk('public')->delete($socialLink->icon);
            }
            $data['icon'] = null;
        }

        $socialLink->update($data);

        // return response()->json($socialLink);
        return back()->with('success', __('messages.social_link_updated'))->withJson($socialLink);
    }

    public function destroy(Request $request, SocialLink $socialLink)
    {
        if ($socialLink->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($socialLink->icon) {
            Storage::disk('public')->delete($socialLink->icon);
        }

        $socialLink->delete();

        // return response()->json(['success' => true]);
        return back()->with('success', __('messages.social_link_deleted'));
    }
}
