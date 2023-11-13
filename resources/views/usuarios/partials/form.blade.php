@csrf()
<input class="form-control mb-3" type="text" name="nome" placeholder="Nome" value="{{ $usuario->nome ?? old('nome') }}">
<input class="form-control mb-3" type="text" name="cpf" placeholder="CPF" value="{{ $usuario->cpf ?? old('cpf') }}">
<input class="form-control mb-3" type="text" name="nr_inscricao" placeholder="N° de inscrição" value="{{ $usuario->nr_inscricao ?? old('nr_inscricao') }}">
<input class="form-control mb-3" type="text" name="nome_empresa" placeholder="Nome da Empresa" value="{{ $usuario->nome_empresa ?? old('nome_empresa') }}">
<input class="form-control mb-3" type="text" name="email" placeholder="Email" value="{{ $usuario->email ?? old('email') }}">
<input class="form-control mb-3" type="password" name="senha" placeholder="Senha" value="{{ $usuario->senha ?? old('senha') }}">
<button class="btn btn-success bt-lg" type="submit">Enviar</button>