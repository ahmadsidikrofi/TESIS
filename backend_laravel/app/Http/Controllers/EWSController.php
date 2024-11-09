<?php

namespace App\Http\Controllers;

use App\Jobs\StoreDataEwsJob;
use App\Models\HeartrateModel;
use App\Models\NibpModel;
use App\Models\NotificationsModel;
use App\Models\OxygenSaturationModel;
use App\Models\PasienModel;
use App\Models\TemperatureModel;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EWSController extends Controller
{
    public function StoreEWS( Request $request )
    {
        $heart_beats = $request->input('hr');
        $blood_oxygen = $request->input('SpO2');
        $AuthPatient = auth()->user();

        if (!$AuthPatient) {return response()->json(['message' => 'Pasien sedang tidak berada di masa login'], 401);}

        $patient = PasienModel::find($AuthPatient->id);
        if ($patient) {
            if ($patient->is_login == '1' && $patient->is_active == 'active') {
                // Heartrate data
                $this->StoreHeartrate($patient, $heart_beats);
                // Oxygen Saturation data
                $this->StoreOxygenSaturation($patient, $blood_oxygen);

                $heartrateScore = $patient->heartrate()->orderBy('created_at', 'desc')->first()->score;
                $oxygenScore = $patient->oxygenSaturation()->orderBy('created_at', 'desc')->first()->score;
                $total_score = $heartrateScore + $oxygenScore;
                $EWS_message = "";
                if ($total_score >= 0 && $total_score <= 4) {
                    $EWS_message = "Perform escalation of monitoring care every 4-6 hours.";
                } else if ($total_score >= 5 && $total_score < 7) {
                    $EWS_message = "Perform hourly monitoring maintenance escalation.";
                } else if ($total_score >= 7 && $total_score <= 9) {
                    $EWS_message = "Inform the Attending Physician. Response time within 10 minutes.";
                }
                NotificationsModel::create([
                    'patient_id' => $AuthPatient->id,
                    'total_score' => $total_score
                ]);
                return response()->json([
                    'success' => true,
                    'message' => 'Vital sign successfully sent',
                    'EWS_score' => $total_score,
                    'heartrate_score' => $heartrateScore,
                    'SpO2_score' => $oxygenScore,
                    'EWS_message' => $EWS_message,
                ], 200);
                return response()->json([
                    'message' => 'Data berhasil disimpan',
                    'EWS_score' => $total_score
                ], 200);
            } else {
                return response()->json(['message' => 'Pasien tidak berada pada masa login atau sedang tidak aktif, Data gagal disimpan'], 401);
            }
        } else  {
            return response()->json(['message' => 'Pasien tidak terdaftar pada database rumah sakit'], 401);
        }
    }

    public function StoreHeartrate( $patient, $heart_beats )
    {
        $heartrateCount = new HeartrateModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;
        // if ($heart_beats > 110) {
        //     $heart_beats = 110;
        // }
        $patient->heartrate()->create(['heart_beats' => $heart_beats]);
        if ($heart_beats > 40 && $heart_beats <= 50) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $yellowColor]); // Kuning
        } else if ( $heart_beats > 50 && $heart_beats <= 90  ) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $greenColor ]); // hijau
        } else if ( $heart_beats > 90 && $heart_beats <= 110 ) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $yellowColor]); // Kuning
        } else if ( $heart_beats > 110 && $heart_beats <= 130 ) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $orangeColor ]); // orange
        } else {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $redColor ]); // merah
        };

        if ($heartrateCount->count() > 100) {
            $heartrateCount->orderBy('created_at')->limit(50)->delete();
        }
    }

    public function StoreOxygenSaturation( $patient, $blood_oxygen )
    {
        $oxygenSaturationCount = new OxygenSaturationModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;

        $patient->oxygenSaturation()->create(['blood_oxygen' => $blood_oxygen]);
        if ($blood_oxygen >= 92 && $blood_oxygen <= 93) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $orangeColor]);
        } else if ($blood_oxygen >= 94 && $blood_oxygen <= 95) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $yellowColor]);
        } else if ($blood_oxygen <= 91) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $redColor]);
        } else if ($blood_oxygen >= 96) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $greenColor]);
        }
        if ($oxygenSaturationCount->count() > 100) {
            $oxygenSaturationCount->orderBy('created_at')->limit(50)->delete();
        }
    }

    // WEB
    function HeartratePatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $heartrate = HeartrateModel::where('patient_id', $pasienId)->get();
        return response()->json($heartrate, 200);
    }
    public function OxymeterPatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $spo2 = OxygenSaturationModel::where('patient_id', $pasienId)->get();
        return response()->json($spo2, 200);
    }
    public function TempPatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $temp = TemperatureModel::where('patient_id', $pasienId)->get();
        return response()->json($temp, 200);
    }

    // MOBILE
    public function HeartratePatientMobileDetail(Request $request)
    {
        $pasien = $request->user();
        if ( $pasien ) {
            $heartrate = HeartrateModel::where('patient_id', $pasien->id)->orderBy('created_at', 'desc')
                ->take(20)
                ->get()
                ->toArray();
            $heartrate = array_reverse($heartrate);
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'heartrate' => $heartrate
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
            ], 401);
        }
    }

    public function OxymeterPatientMobileDetail( Request $request )
    {
        $pasien = $request->user();
        if ($pasien) {
            $spo2 = OxygenSaturationModel::where('patient_id', $pasien->id)->orderBy('created_at', 'desc')
                ->take(20)
                ->get()
                ->toArray();
            $spo2 = array_reverse($spo2);
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'oxygen' => $spo2,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
            ], 401);
        }
    }

    public function TempPatientMobileDetail( Request $request )
    {
        $pasien = $request->user();
        if ($pasien) {
            $temp = TemperatureModel::where('patient_id', $pasien->id)->orderBy('created_at', 'desc')
                ->take(20)
                ->get()
                ->toArray();
            $temp = array_reverse($temp);
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'patient_temp' => $temp
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login'
            ], 401);
        }
    }

    // Notification Perawat
    public function EWSNotification()
    {
        $notifications = PasienModel::with(['notifications' => function($query) {
            $query->orderBy('created_at', 'desc');
        }])->get();
        $dataPasien = $notifications->map(function($pasien) {
            $namaLengkap = $pasien->nama_lengkap;
            $message = [];
            foreach ($pasien->notifications as $notification) {
                $message[] = [
                    'nama_lengkap' => $namaLengkap,
                    'total_score' => $notification->total_score,
                    'created_at' => Carbon::parse($notification->created_at)->diffForHumans(),
                ];
            }
            return $message;
        });

        return response()->json($dataPasien, 200);
    }

    // Notification Pasien
    public function EWSNotificationMobile( Request $request )
    {
        $pasien = $request->user();
        if ($pasien !== null ) {
            $notifications = NotificationsModel::where('patient_id', $pasien->id)
            ->where('total_score', '>=', 5)->latest()->get();
            return response()->json($notifications, 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pasien tidak berada pada masa login'
            ], 401);
        }
    }
}
