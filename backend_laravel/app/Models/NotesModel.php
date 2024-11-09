<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotesModel extends Model
{
    use HasFactory;
    protected $table = 'notes';
    protected $guarded = [];

    public function patient()
    {
        return $this->belongsTo(PasienModel::class, "patient_id");
    }
}
