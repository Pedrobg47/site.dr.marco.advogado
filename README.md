# Marco Roberto dos Santos — Advocacia

Website institucional estático em HTML, CSS e JavaScript puro. As seções aprovadas estão implementadas e os ajustes da revisão final estão aplicados. **Prévia local; não publicado.**

## Visualizar

Na pasta do projeto, execute:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8000/index.html`. Não há instalação, build ou dependências de execução. Encerre o servidor com Ctrl+C.

## Dados configurados

- Dr. Marco Roberto dos Santos, Advogado, OAB/SP **439.884**, conforme o briefing.
- **Rua Joaquim Gutier Navarro Filho, 180 — Bonança, Osasco/SP, CEP 06266-200.** Número 180 confirmado pelo usuário após consulta ao perfil do escritório no Google Maps.
- WhatsApp **(11) 94352-4167**, confirmado pelo usuário; destino internacional `5511943524167`.
- Telefone **(11) 4384-0245**, conforme o briefing e o DDD conferido no perfil do escritório.
- Segunda a sábado, **08:00–17:00**; domingo fechado. Aviso de possível alteração nos feriados, inclusive Finados.
- Atuação em Direito Cível, de Família, Previdenciário e Trabalhista. Sem biografia, credenciais adicionais, depoimentos ou resultados inventados.

## Resultado da revisão

- Três chamadas principais com aparência de botão: contato no cabeçalho, áreas no Hero e rota na localização. A pesquisa do Maps permanece como link discreto sob o mapa; foram retirados atalhos repetidos.
- WhatsApp no canto inferior direito, com ícone local. Recolhe quando pode sobrepor o mapa/contato ou quando um link de WhatsApp do conteúdo já está inteiramente visível. O foco no botão é preservado.
- Fontes oficiais Cormorant Garamond e Inter em WOFF2 local, com preload, `font-display: swap` e licenças incluídas.
- Corrigida uma quebra de texto que produzia excesso horizontal em 320 px com fonte a 200%.
- Medições no Chrome: 320, 768 e 1440 px, além de 320 px com fonte a 200%, sem excesso horizontal, fontes carregadas e sem erros de execução capturados pelo diagnóstico.
- **94 cenários de comportamento** em JavaScriptCore com DOM simulado e **111 verificações estáticas** passaram. Isso não equivale a uma certificação de acessibilidade ou a um teste em todos os navegadores.

Evidências, alcance e limites estão em [review/FINAL_REVIEW.md](review/FINAL_REVIEW.md). O histórico das etapas anteriores foi preservado em [review/DEVELOPMENT_HISTORY.md](review/DEVELOPMENT_HISTORY.md).

## Arquivos e manutenção

- `index.html`: conteúdo público, metadados, navegação, mapa, horários, contato e rodapé.
- `style.css`: tipografia, cores, layout responsivo, foco e movimento reduzido.
- `script.js`: quatro módulos independentes para Maps, menu, animações e proteção do WhatsApp. Sem biblioteca ou CDN.
- `assets/fonts/`: WOFF2, licenças OFL e documentação de origem.
- `assets/icons/`: SVG do WhatsApp, origem e licença CC0.
- `preview.html` e `preview.css`: quadro de aprovação interno, sincronizado com o site.
- `review/qa.html` e `review/qa.js`: diagnóstico interno de renderização. Acesse por HTTP local; não integra o site público.

Ao alterar endereço, atualize o texto visível, `data-office-address` e os fallbacks completos dos três URLs no HTML. O script sincroniza rota, pesquisa e iframe a partir do dataset; os fallbacks preservam o funcionamento sem JavaScript. Mantenha a cópia das seções em `preview.html` sincronizada enquanto ela for utilizada.

O WhatsApp usa `wa.me` com uma mensagem inicial discreta. O clique abre uma conversa; não envia mensagem automaticamente. O mapa é um iframe público por consulta, sem chave de API. A rota e a pesquisa usam as URLs universais do Google Maps. Não há formulário, analytics ou armazenamento próprio no código público. Os serviços externos têm links para suas políticas no rodapé.

## Materiais e publicação

O **logo oficial MRS ainda precisa ser fornecido**. A identificação atual é tipográfica e marcada como provisória; o monograma não foi redesenhado. Não foi criado favicon de marca sem o arquivo oficial.

Antes de publicar, definir domínio e identidade final, revisar o conteúdo com o responsável e configurar os metadados que dependem do domínio. `noindex, nofollow` está mantido para esta prévia; não é controle de acesso. A publicação não foi realizada nesta revisão.

O pacote público deve conter apenas `index.html`, `style.css`, `script.js` e os recursos necessários em `assets/`, preservando suas licenças. **Excluir `preview.html`, `preview.css`, `review/` e os documentos de revisão da hospedagem pública.**
