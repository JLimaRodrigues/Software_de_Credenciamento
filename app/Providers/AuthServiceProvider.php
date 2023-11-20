<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('permission', function(User $user){
            if($user->permission == 2){
                return 'Admin';
            } else if($user->permission == 1){
                return 'Cadastrador';
            } else {
                return 'Usuário Comum';
            }
        });
    }
}
