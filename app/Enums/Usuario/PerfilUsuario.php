<?php 

namespace App\Enums\Usuario;

enum PerfilUsuario: string
{
    case Admin      = "Administrador Geral";
    case AdmParcial = "Administrador Parcial";
    case Usuario    = "Usuário Comum";

    public static function fromValue(string $name): string 
    {
        foreach(self::cases() as $status){
            if($name === $status->name){
                return $status->value;
            }
        }

        throw new \ValueError("$name is not a valid");
    }
}
?>