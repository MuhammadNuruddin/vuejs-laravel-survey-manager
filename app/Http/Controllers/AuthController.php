<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token,
            'success' => true
        ],201);
    }

    // Login
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',
            ],
            'remember' => 'boolean'
        ]);
        $remeber = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remeber)) {
            return response([
                'error' => 'Your login credentials are not valid'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
            'success' => true
        ],200);

    }
    // Logout
    public function logout() {
        $user = Auth::user();
        // revoke access token
        $user->currentAccessToken()->delete();
        return response([
            'success' => true
        ]);
    }
    // forgot password
    public function forgot_password(Request $request) {
        $validate = $request->validate([
            'email' => 'required|email|exists:users',
            'route' => 'required|string'
        ]);
        if(!$validate) {
            return response([
                'error' => 'Invalid request, please try again...'
            ], 422);
        }
        $token = Str::random(64);

        DB::table('password_resets')->insert([
            'email' => $request->email, 
            'token' => $token, 
            'created_at' => Carbon::now()->addMinutes(20)
          ]);

        $mail = Mail::send('email.emailForgotPassword', ['token' => $token, 'route' => $request->route], function($message) use($request){
            $message->to($request->email);
            $message->subject('Reset Password');
        });
        if($mail) {
            return response([
                'success' => true,
            ],201);
        }
    }

    public function reset_password(Request $request)
    {
        $request->validate([
            'password' => ['required',
            'min:8',
            'confirmed',
            'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/'],
            'password_confirmation' => 'required',
            'token' => 'required|string|exists:password_resets,token'
        ]);

        $updatePassword = DB::table('password_resets')
                            ->where([
                              'token' => $request->token
                            ])
                            ->first();
        if(!$updatePassword){
            return response([
                'error' => 'Invalid Token'
            ], 422);
        }
        // check token expiry 
        // Current date and time
        $datetime = date("Y-m-d H:i:s");
        if($datetime > $updatePassword->created_at) {
            return response([
                'error' => 'Token Expired'
            ], 403);
        }
        $user = User::where('email', $updatePassword->email)
                    ->update(['password' => Hash::make($request->password)]);

        DB::table('password_resets')->where(['email'=> $updatePassword->email])->delete();
        if($user) {
            return response([
                'success' => true,
            ], 201);
        }

    }
}