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

    public function edit(Language $language): Response
    {
        $baseTranslations = Language::where('code', config('app.fallback_locale'))
            ->value('translations') ?? [];

        return Inertia::render('Admin/Languages/Edit', [
            'language' => $language,
            'baseTranslations' => $baseTranslations,
        ]);
    }

    public function update(Request $request, Language $language): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string',
            'code' => 'required|string|unique:languages,code,' . $language->id,
            'direction' => 'required|in:ltr,rtl',
            'translations' => 'nullable|json',
        ]);

        if (isset($data['translations'])) {
            $data['translations'] = json_decode($data['translations'], true);
        }

        $language->update($data);

        return Redirect::route('admin.languages.index')
            ->with('success', __('messages.language_updated'));
    }

    public function destroy(Language $language): RedirectResponse
    {
        $language->delete();

        return Redirect::back()->with('success', __('messages.language_deleted'));
    }
}
