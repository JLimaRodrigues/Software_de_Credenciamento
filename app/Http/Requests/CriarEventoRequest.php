<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CriarEventoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome_evento' => 'required|min:3',
            'nome_empresa' => 'required|min:3',
            'dt_evento'   => 'required'
        ];
    }
}
