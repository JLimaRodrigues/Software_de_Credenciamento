<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RelatorioController extends Controller
{
    public function index(Request $request)
    {
        return view('relatorio.index');
    }
}
