@csrf()
<input class="form-control mb-3" type="text" name="nome_evento" placeholder="Nome do Evento" value="{{ $evento->nome_evento ?? old('nome_evento') }}">
<input class="form-control mb-3" type="text" name="nome_empresa" placeholder="Nome Empresa" value="{{ $evento->nome_empresa ?? old('nome_empresa') }}">
<input class="form-control mb-3" type="date" name="dt_evento" value="{{ $evento->dt_evento ?? old('dt_evento') }}">
<button class="btn btn-success bt-lg" type="submit">Enviar</button>