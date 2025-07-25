<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class InstallController extends Controller
{
    public function show()
    {
        return inertia('Install');
    }

    public function store(Request $request)
    {
        $request->validate([
            'host' => 'required',
            'database' => 'required',
            'username' => 'required',
            'password' => 'nullable',
        ]);

        // Update .env file with provided credentials and file session driver
        $envPath = base_path('.env');
        $env = File::get($envPath);
        $env = preg_replace('/^DB_HOST=.*/m', 'DB_HOST='.$request->host, $env);
        $env = preg_replace('/^DB_DATABASE=.*/m', 'DB_DATABASE='.$request->database, $env);
        $env = preg_replace('/^DB_USERNAME=.*/m', 'DB_USERNAME='.$request->username, $env);
        $env = preg_replace('/^DB_PASSWORD=.*/m', 'DB_PASSWORD='.$request->password, $env);
        $env = preg_replace('/^SESSION_DRIVER=.*/m', 'SESSION_DRIVER=file', $env);
        File::put($envPath, $env);

        // Configure runtime to use the new settings
        config([
            'database.connections.mysql.host' => $request->host,
            'database.connections.mysql.database' => $request->database,
            'database.connections.mysql.username' => $request->username,
            'database.connections.mysql.password' => $request->password,
        ]);
        DB::purge('mysql');
        DB::reconnect('mysql');

        // Import SQL dump
        $sqlFile = public_path('marketplacereact.sql');
        if (File::exists($sqlFile)) {
            DB::unprepared(File::get($sqlFile));
        }

        // create public/storage symlink if it doesn't exist
        $storageLink = public_path('storage');
        if (! File::exists($storageLink)) {
            try {
                @symlink(storage_path('app/public'), $storageLink);
            } catch (\Throwable $e) {
                if (function_exists('exec')) {
                    Artisan::call('storage:link');
                } else {
                    File::copyDirectory(storage_path('app/public'), $storageLink);
                }
            }
        }

        File::put(storage_path('installed'), now()->toDateTimeString());

        return redirect()->route('login')
            ->with('status', 'Admin email: admin@admin.com, password: admin@admin.com. You can log in at /login.');
    }
}
