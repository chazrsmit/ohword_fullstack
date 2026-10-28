<?php
// source: https://github.com/laravel/docs/blob/13.x/authentication.md + Claude

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Displaying the login page
    public function create(): Response {
        return Inertia::render('Login');
    }

    // Handling the login form
    public function store(Request $request): RedirectResponse {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string']
        ]);

        if (!Auth::attempt($credentials)) {
            return back()->withErrors(['email' => 'The email or password is incorrect'])
                         ->onlyInput('email');
        }

        // After a successful login, we regenerate the session
        $request->session()->regenerate();

        return redirect()->intended('/');
    }

    // Log out
    public function destroy(Request $request): RedirectResponse {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
