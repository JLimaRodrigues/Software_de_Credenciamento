<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioRequest extends FormRequest
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
            'nome'         => 'required|min:3',
            'cpf'          => 'required|min:11|max:11|unique:usuarios',
            'nr_inscricao' => 'required|min:11|max:12',
            'nome_empresa' => 'required|min:5',
            'email' => 'required|unique:usuarios',
            'senha' => 'required|min:8'
        ];
    }
}
