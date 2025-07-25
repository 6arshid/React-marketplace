<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminLanguageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Languages', [
            'languages' => Language::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string',
            'code' => 'required|string|unique:languages,code',
            'direction' => 'required|in:ltr,rtl',
        ]);

        Language::create($data);

        return Redirect::back()->with('success', __('messages.language_added'));
    }

    public function destroy(Language $language): RedirectResponse
    {
        $language->delete();

        return Redirect::back()->with('success', __('messages.language_deleted'));
    }
}
