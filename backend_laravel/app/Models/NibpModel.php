<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NibpModel extends Model
{
    use HasFactory;
    protected $table = "nibp";
    protected $guarded = [];

    public function patient()
    {
        return $this->belongsTo(PasienModel::class, "patient_id");
    }
}
