<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeartrateModel extends Model
{
    use HasFactory;
    protected $table = "heartrate";
    protected $guarded = [];

    public function patient()
    {
        return $this->belongsTo(PasienModel::class, 'patient_id');
    }
}
