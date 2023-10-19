<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LoanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);



Route::middleware('auth:sanctum')->group(function (){
    Route::get('user',function (Request $request) {
        return $request->user();
    });

    Route::post('logout',[AuthController::class,'logout']);

    Route::apiResource('loans', LoanController::class);

    Route::post('/loan-calculator', [LoanController::class,'computeInterest']);
});