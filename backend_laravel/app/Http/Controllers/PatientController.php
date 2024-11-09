<?php

namespace App\Http\Controllers;

use App\Models\PasienModel;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function SendPatientsToArduino()
    {
        $dataPatients = PasienModel::all();
        return response()->json($dataPatients, 200);
    }

    public function PatientsData()
    {
        $patients = PasienModel::with(['heartrate' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }, 'oxygenSaturation' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }, 'temperature' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->get();
        return response()->json($patients, 200);
    }
    // function PatientsData()
    // {
    //     $patients = PasienModel::with('heartrate', 'oxygenSaturation')->orderBy('updated_at', 'desc')->get();
    //     return response()->json($patients, 200);
    // }
    public function PatientDataDetail($slug)
    {
        $patient = PasienModel::where('slug', $slug)->first();
        return response()->json($patient, 200);
    }

    public function ProfilePatient(Request $request)
    {
        $pasien = $request->user();
        if ( $pasien ) {
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'pasien_data' => $pasien,
                'access_token' => $request->bearerToken()
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
                'is_login' => 0,
            ], 401);
        }
    }

    // Update Profile Pasien dari sisi perawat
    public function UpdateProfile( Request $request, $slug )
    {
        $pasienProfile = PasienModel::where('slug', $slug)->first();
        $pasienProfile->update($request->all());
        if ($pasienProfile->wasChanged()) {
            return response()->json([
                'success' => true,
                'message' => 'Profilemu berhasil diubah'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Profilemu tidak ada perubahan'
            ], 500);
        }
    }

    // Update Profile Pasien dari sisi pasien
    public function UpdateProfileMobile( Request $request )
    {
        $pasienProfile = $request->user();
        $pasienProfile->update($request->all());
        if ($pasienProfile->wasChanged()) {
            return response()->json([
                'success' => true,
                'message' => 'Profilemu berhasil diubah'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Profilemu tidak mengalami perubahan'
            ], 200);
        }
    }
}
