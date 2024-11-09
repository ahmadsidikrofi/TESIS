<?php

namespace App\Jobs;

use App\Models\HeartrateModel;
use App\Models\NibpModel;
use App\Models\OxygenSaturationModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class StoreDataEwsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $dataToStore;
    /**
     * Create a new job instance.
     */
    public function __construct(array $dataToStore)
    {
        $this->dataToStore = $dataToStore;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->storeHeartrate();
        $this->storeOxygenSaturation();
        $this->storeNibp();
    }
    /**
     * Store heartrate data.
     */
    protected function storeHeartrate(): void
    {
        $heart_beats = $this->dataToStore['heart_beats'];
        $patient_id = $this->dataToStore['patient_id'];

        $heartrateCount = new HeartrateModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;

        HeartrateModel::create([
            'heart_beats' => $heart_beats,
            'patient_id' => $patient_id
        ]);

        $heartrateModel = HeartrateModel::where('heart_beats', $heart_beats)->first();
        if ($heartrateModel) {
            if ($heart_beats > 40 && $heart_beats <= 50) {
                $heartrateModel->update(['score' => $yellowColor]);
            } elseif ($heart_beats > 50 && $heart_beats <= 90) {
                $heartrateModel->update(['score' => $greenColor]);
            } elseif ($heart_beats > 90 && $heart_beats <= 110) {
                $heartrateModel->update(['score' => $yellowColor]);
            } elseif ($heart_beats > 110 && $heart_beats <= 130) {
                $heartrateModel->update(['score' => $orangeColor]);
            } else {
                $heartrateModel->update(['score' => $redColor]);
            }
        }
        if ($heartrateCount->count() > 100) {
            HeartrateModel::orderBy('created_at')->limit(50)->delete();
        }
    }
    /**
     * Store Oxygen Saturation.
     */
    protected function storeOxygenSaturation(): void
    {
        $blood_oxygen = $this->dataToStore['blood_oxygen'];
        $patient_id = $this->dataToStore['patient_id'];

        $oxygenSaturationCount = new OxygenSaturationModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;

        OxygenSaturationModel::create([
            'blood_oxygen' => $blood_oxygen,
            'patient_id' => $patient_id
        ]);

        $oxygenSaturationModel = OxygenSaturationModel::where('blood_oxygen', $blood_oxygen)->first();
        if ($oxygenSaturationModel) {
            if ($blood_oxygen >= 92 && $blood_oxygen <= 93) {
                $oxygenSaturationModel->update(['score' => $orangeColor]);
            } elseif ($blood_oxygen >= 94 && $blood_oxygen <= 95) {
                $oxygenSaturationModel->update(['score' => $yellowColor]);
            } elseif ($blood_oxygen <= 91) {
                $oxygenSaturationModel->update(['score' => $redColor]);
            } elseif ($blood_oxygen >= 96) {
                $oxygenSaturationModel->update(['score' => $greenColor]);
            }
        }
        if ($oxygenSaturationCount->count() > 100) {
            $oxygenSaturationCount->orderBy('created_at')->limit(50)->delete();
        }
    }
    /**
     * Store Nibp data.
     */
    protected function storeNibp(): void
    {
        $systolic = $this->dataToStore['systolic'];
        $patient_id = $this->dataToStore['patient_id'];
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;
        $nibpCount = new NibpModel();
        NibpModel::create([
            'systolic' => $systolic,
            'patient_id' => $patient_id
        ]);

        $nibpModel = NibpModel::where('systolic', $systolic)->first();
        if ($nibpModel) {
            if ($systolic <= 91 && $systolic <= 100) {
                $nibpModel->update(['score' => $orangeColor]);
            } elseif ($systolic > 100 && $systolic <= 110) {
                $nibpModel->update(['score' => $yellowColor]);
            } elseif ($systolic > 110 && $systolic <= 219) {
                $nibpModel->update(['score' => $greenColor]);
            } else {
                $nibpModel->update(['score' => $redColor]);
            }
        }
        if ($nibpCount->count() > 100) {
            $nibpCount->orderBy('created_at')->limit(50)->delete();
        }
    }
}
