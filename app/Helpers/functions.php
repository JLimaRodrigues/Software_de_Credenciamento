<?php 

use App\Enums\Usuario\{PerfilUsuario, StatusUsuario};

if(!function_exists('getPerfilUsuario')){
    function getPerfilUsuario(string $perfil): string 
    {
        return PerfilUsuario::fromValue($perfil);
    }
}

if(!function_exists('getStatusUsuario')){
    function getStatusUsuario(string $status): string 
    {
        return StatusUsuario::fromValue($status);
    }
}