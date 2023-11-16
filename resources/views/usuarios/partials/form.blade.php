@csrf()
<label for="nome">Nome</label>
<input class="form-control mb-3" type="text" name="nome" placeholder="Nome" value="{{ $usuario->nome ?? old('nome') }}">

<label for="cpf">CPF</label>
<input class="form-control mb-3" type="text" name="cpf" placeholder="CPF" value="{{ $usuario->cpf ?? old('cpf') }}">

<label for="nr_inscricao">N° de Inscrição</label>
<input class="form-control mb-3" type="text" name="nr_inscricao" placeholder="N° de inscrição" value="{{ $usuario->nr_inscricao ?? old('nr_inscricao') }}">

<label for="nome_empresa">Nome da Empresa</label>
<input class="form-control mb-3" type="text" name="nome_empresa" placeholder="Nome da Empresa" value="{{ $usuario->nome_empresa ?? old('nome_empresa') }}">

<label for="email">Email</label>
<input class="form-control mb-3" type="text" name="email" placeholder="Email" value="{{ $usuario->email ?? old('email') }}">

<label for="senha">Senha</label>
<input class="form-control mb-3" type="password" name="senha" placeholder="Senha" value="{{ $usuario->senha ?? old('senha') }}">
<button class="btn btn-success bt-lg" type="submit">Enviar</button>