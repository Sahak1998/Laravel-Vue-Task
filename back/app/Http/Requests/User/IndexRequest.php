<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'lastName'          => ['string'],
            'firstName'         => ['string'],
            'dateOfBirth'       => ['date'],
            'country'           => ['string'],
            'profession'        => ['string'],
            'yearsInProfession' => ['integer', 'min:0'],
        ];
    }
}
