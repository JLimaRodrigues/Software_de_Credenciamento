@if ($errors->any())
    @foreach($errors->all() as $error)
        {{ $error }}
    @endforeach
@endif

<form action="{{ route('usuario.registrar') }}" method="POST">
    @include('usuarios.partials.form')
</form>