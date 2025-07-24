<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(?int $index = null)
    {
        $items = collect();

        $users = User::orderByDesc('id')->get(['username', 'updated_at']);
        foreach ($users as $user) {
            $items->push([
                'loc' => url(route('profile.show', $user->username, false)),
                'lastmod' => $user->updated_at->toAtomString(),
            ]);
        }

        $products = Product::orderByDesc('id')->get(['slug', 'updated_at']);
        foreach ($products as $product) {
            $items->push([
                'loc' => url(route('products.show', $product->slug, false)),
                'lastmod' => $product->updated_at->toAtomString(),
            ]);
        }

        $perPage = 999;
        $total = $items->count();
        $pages = (int) ceil($total / $perPage);

        if ($index) {
            if ($index < 1 || $index > $pages) {
                abort(404);
            }
            $slice = $items->slice(($index - 1) * $perPage, $perPage);
            $xml = new \SimpleXMLElement('<urlset/>');
            $xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
            foreach ($slice as $item) {
                $url = $xml->addChild('url');
                $url->addChild('loc', $item['loc']);
                $url->addChild('lastmod', $item['lastmod']);
            }
            return response($xml->asXML(), 200)->header('Content-Type', 'application/xml');
        }

        if ($total > $perPage) {
            $xml = new \SimpleXMLElement('<sitemapindex/>');
            $xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
            for ($i = 1; $i <= $pages; $i++) {
                $sitemap = $xml->addChild('sitemap');
                $sitemap->addChild('loc', url("/sitemap{$i}.xml"));
            }
            return response($xml->asXML(), 200)->header('Content-Type', 'application/xml');
        }

        $xml = new \SimpleXMLElement('<urlset/>');
        $xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        foreach ($items as $item) {
            $url = $xml->addChild('url');
            $url->addChild('loc', $item['loc']);
            $url->addChild('lastmod', $item['lastmod']);
        }
        return response($xml->asXML(), 200)->header('Content-Type', 'application/xml');
    }
}
