<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationsModel extends Model
{
    use HasFactory;
    protected $table = "notifications";
    protected $guarded = [];

    public function patient()
    {
        return $this->belongsTo(PasienModel::class, 'patient_id');
    }
}
