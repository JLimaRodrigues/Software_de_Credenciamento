<?php

namespace App\Http\Controllers;

use App\Models\Eventos;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    public function index(Eventos $evento)
    {
        $eventos = $evento->all();

        return view('eventos.index', compact('eventos'));
    }

    public function criar(Request $request)
    {
        return view('eventos.criar');
    }
    
    public function mostrar(string|int $id)
    {
        if(!$evento = Eventos::find($id)){
            return back();
        }
        //dd($evento);
        return view('eventos.dadosEvento', compact('evento'));
    }

    public function registrar(Request $request, Eventos $evento)
    {
        $data = $request->all();

        $evento = $evento->create($data);
        
        return redirect()->route('evento.index');
    }
}
