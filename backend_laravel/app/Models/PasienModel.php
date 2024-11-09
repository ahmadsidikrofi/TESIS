<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class PasienModel extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
    use Sluggable;
    protected $table = "users";
    protected $guarded = [];

    public function heartrate()
    {
        return $this->hasOne(HeartrateModel::class, 'patient_id');
    }
    public function oxygenSaturation()
    {
        return $this->hasOne(OxygenSaturationModel::class, "patient_id");
    }
    public function nibp()
    {
        return $this->hasOne(NibpModel::class, "patient_id");
    }
    public function temperature()
    {
        return $this->hasOne(TemperatureModel::class, "patient_id");
    }
    public function notifications()
    {
        return $this->hasMany(NotificationsModel::class, "patient_id");
    }
    public function notes()
    {
        return $this->hasMany(NotesModel::class, "patient_id");
    }
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'nama_lengkap'
            ]
        ];
    }

    // Rest omitted for brevity
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
