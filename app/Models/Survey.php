<?php

namespace App\Models;

use App\Models\SurveyAnswer;
use Spatie\Sluggable\HasSlug;
use App\Models\SurveyQuestion;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Survey extends Model
{
    use HasFactory, HasSlug;
    const TYPE_TEXT = 'text';
    const TYPE_CHECKBOX = 'checkbox';
    const TYPE_SELECT = 'select';
    const TYPE_RADIO = 'radio';
    const TYPE_TEXTAREA = 'textarea';

    protected $fillable = ['user_id', 'title', 'image', 'slug', 'status', 'description', 'expire_date'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('title')->saveSlugsTo('slug');
    }

    public function questions() {
        return $this->hasMany(SurveyQuestion::class);
    }

    public function answers() {
        return $this->hasMany(SurveyAnswer::class);
    }
}
