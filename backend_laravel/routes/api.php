<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EWSController;
use App\Http\Controllers\HeartrateController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\PatientController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/test', function() {
    return response()->json([
        'success' => true,
        'message' => 'Testing API Berhasil'
    ]);
});

// AUTH
// Route::get('/logged-in/{token}', [AuthController::class, "IsLoggedIn"]);
Route::post('/auth/signup', [AuthController::class, "SignupPasien"]);
Route::post('/auth/signin', [AuthController::class, "SigninPasien"]);
Route::post('/auth/lupa-password', [AuthController::class, "LupaPassword"]);
Route::delete('/auth/logout', [AuthController::class, "LogoutPasien"]);

Route::middleware('api')->group(function () {
    // Patients
    Route::get('/patients', [PatientController::class, "PatientsData"]);
    Route::get('/patient/{slug}', [PatientController::class, "PatientDataDetail"]);
    Route::get('/profile', [PatientController::class, "ProfilePatient"]);
    Route::put('/profile', [PatientController::class, "UpdateProfileMobile"]); // digunakan oleh Pasien
    Route::put('/patient/{slug}/profile', [PatientController::class, "UpdateProfile"]); // digunakan oleh Perawat
    // Arduino
    // Route::get('/patients-data', [PatientController::class, "SendPatientsToArduino"]);
    Route::get('/vital-sign', [EWSController::class, "StoreEWS"]);

    // Web Chart
    Route::get('/heartrate-patient/{slug}', [EWSController::class, "HeartratePatientDetail"]);
    Route::get('/oxymeter-patient/{slug}', [EWSController::class, "OxymeterPatientDetail"]);
    Route::get('/temp-patient/{slug}', [EWSController::class, "TempPatientDetail"]);
    // Mobile Chart
    Route::get('/heartrate-patient-mobile', [EWSController::class, "HeartratePatientMobileDetail"]);
    Route::get('/oxymeter-patient-mobile', [EWSController::class, "OxymeterPatientMobileDetail"]);
    Route::get('/temp-patient-mobile', [EWSController::class, "TempPatientMobileDetail"]);

    // Notification WEB
    Route::get('/notifications', [EWSController::class, "EWSNotification"]);
    // Notification Mobile
    Route::get('/notifications-mobile', [EWSController::class, "EWSNotificationMobile"]);

    // Notes WEB
    Route::get('/notes/{slug}', [NotesController::class, "GetNotesData"]); // API note berdasarkan user slug
    Route::post('/note/{slug}', [NotesController::class, "StoreNote"]);
    Route::get('/note/{id}', [NotesController::class, "DetailNote"]);
    Route::put('/note/{id}', [NotesController::class, "UpdateNote"]);
    Route::delete('/note/{id}', [NotesController::class, "DeleteNotes"]);

    // Notes Mobile
    Route::get('/notes-mobile', [NotesController::class, "GetNotesMobile"]);
    Route::get('/note-mobile/{id}', [NotesController::class, "GetNotesMobileById"]);
    Route::put('/reply-note/{id}', [NotesController::class, "ReplyNoteById"]);
});
