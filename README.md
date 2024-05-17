# Iniciando projeto com Electron + React + TypeScript

Esse é um projeto de software de credenciamento de eventos utilizando Electron, React e TypeScript.

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

### `npm start:web`

Rodando a aplicação em modo de desenvolvimento.\
Acesse [http://localhost:3000](http://localhost:3000) para acessar no navegador web.

A página atualiza conforme faz as modificações no código.\
Você também verá erros de lint no console.

### `npm start:desktop`

Rodando a aplicação em modo de desenvolvimento.\
Acesse via App que abre via electron.

### `npm run build:web`

Cria o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a construção para obter o melhor desempenho.

A compilação é reduzida e os nomes dos arquivos incluem os hashes.\
Seu aplicativo está pronto para ser implantado!

### `npm run build:desktop`

### `npm run eject`

**Observação: esta é uma operação unidirecional. Depois de `ejetar`, você não pode voltar!**

Se você não estiver satisfeito com a ferramenta de construção e as opções de configuração, você pode `ejetar` a qualquer momento. Este comando removerá a dependência de compilação única do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc) diretamente no seu projeto para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, ainda funcionarão, mas apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto você está sozinho.

Você nunca precisa usar `ejetar`. O conjunto de recursos selecionados é adequado para implantações pequenas e médias e você não deve se sentir obrigado a usar esse recurso. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estiver pronto para isso.
