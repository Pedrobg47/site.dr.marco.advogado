# Histórico das etapas — Marco Roberto dos Santos Advocacia

> Registro anterior à revisão final, preservado em 31/10/2026. As pendências e descrições abaixo retratam cada etapa e não o estado atual. Consulte o README da raiz e FINAL_REVIEW.md nesta pasta para os resultados atuais.

Website estático em desenvolvimento por etapas, com aprovação do responsável.

## Estado atual

**Etapa 3.9 — Rodapé.** Seções anteriores, Contato e WhatsApp aprovados; rodapé institucional implementado para revisão. Endereço nº **180** e WhatsApp **(11) 94352-4167** mantidos. Fontes web oficiais e revisão visual completa continuam pendentes. Diferenciais seguem omitidos. Não houve publicação.

- `index.html`: seções aprovadas, rodapé institucional e botão flutuante do WhatsApp, com um único H1.
- `style.css`: fundação aprovada e estilos responsivos das seções implementadas.
- `script.js`: sincronização do Maps, navegação, animações e proteção contra sobreposição do botão de WhatsApp; sem bibliotecas ou CDN.
- `preview.html` e `preview.css`: revisão interna das seções e amostra da fundação, com o mesmo rodapé ao final; não integram o website final.
- `assets/fonts/`: instruções e espaço reservado aos WOFF2 oficiais e suas licenças; downloads ainda não concluídos.
- `assets/images/`: reservado a imagens oficiais e autorizadas.
- `assets/icons/`: SVG local do WhatsApp, licença CC0 do Simple Icons e referência da origem.

## Visualizar

Abra `index.html` para ver o website com todas as seções previstas, exceto Diferenciais, omitida conforme a análise. Rodapé está em revisão. A `preview.html` mantém a amostra da fundação antes do rodapé, com avisos internos de revisão. Não há instalação, build ou dependências de execução. Para uma prévia HTTP local, use, a partir desta pasta:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Depois acesse `http://127.0.0.1:8000/preview.html`. Encerre o servidor com Ctrl+C.

## Header implementado

- Identificação tipográfica simples MRS com aviso visível de marca provisória, nome e identificação Advocacia. O monograma original não foi redesenhado.
- Navegação horizontal a partir de 75rem. Abaixo desse breakpoint, painel mobile de navegação comum; não é menu de aplicação nem modal.
- Header fixo com transparência discreta, blur quando suportado e fundo mais opaco após rolagem. Sem suporte a blur, a base grafite mantém a leitura.
- Altura medida para compensar o Header fixo e posicionar âncoras sem sobreposição; atualização em redimensionamento e ResizeObserver quando disponível.
- Menu mobile abre pelo botão, aceita Seta para baixo, fecha com Escape (devolvendo foco), seleção de link, clique fora, saída de foco e mudança de breakpoint.
- Tab segue a ordem natural e pode sair do painel. Foco em link cancela a animação de abertura; movimento reduzido desativa a animação.
- Sem JavaScript, o botão permanece oculto e toda a navegação fica visível no fluxo normal.
- Todos os links do menu e o CTA do Header apontam para destinos existentes e focáveis. Contato foi ativado em #contato nesta etapa.
- O indicador aria-current acompanha a âncora da URL no carregamento e em hashchange, inclusive ao voltar no histórico. A âncora #inicio também representa o link Início. Isso não é scrollspy e não altera a URL durante a rolagem manual.
- A prévia interna contém uma cópia idêntica do Header real para testar rolagem; manter a cópia sincronizada enquanto a prévia existir.

## Hero implementado

- Composição editorial em grafite, sem fotografias, novos monogramas ou dados adicionais.
- H1 único: Dr. Marco Roberto dos Santos. Nome em linhas fluidas, sem largura ou altura fixa que impeça quebra e leitura em telas pequenas.
- Identificação Advocacia, localização Osasco/SP e OAB/SP 439.884 conforme o briefing; esses dados não representam verificação cadastral externa.
- Frase aprovada na análise: “Atuação em Direito Cível, de Família, Previdenciário e Trabalhista.”
- CTA “Conheça as áreas de atuação” ativo para #areas-de-atuacao desde a etapa 3.4. Atributos e aviso de indisponibilidade foram removidos.
- Nome com máscara temporária de animação, texto com entrada suave, CTA com opacidade e linha inferior com expansão horizontal. Sem animação, todo conteúdo fica naturalmente visível.
- A altura usa um mínimo adaptado ao viewport, não altura fixa. O texto pode aumentar a seção; não há recorte permanente da tipografia.
- O Hero da prévia é idêntico ao real. O título de amostra da fundação foi convertido para H2 para preservar um único H1.

## Sobre implementado

- Seção off-white, com título H2 à esquerda e apresentação factual à direita no desktop; uma coluna em telas pequenas.
- Texto aprovado na análise: “O escritório de Dr. Marco Roberto dos Santos atua em Osasco, São Paulo, nas áreas de Direito Cível, de Família, Previdenciário e Trabalhista.”
- Nenhuma história, data, valor institucional, qualificação ou informação adicional foi criada.
- Título, texto e linha usam as animações existentes, sem nova dependência. O conteúdo permanece visível sem JavaScript e respeita movimento reduzido.
- Link Sobre ativado com href="#sobre"; a seção tem tabindex="-1" para receber o foco na navegação mobile.
- Hero preservado literalmente. O Header manteve a estrutura aprovada; apenas o item Sobre foi habilitado e seu indicador foi sincronizado por hash.
- A seção e o Header estão sincronizados na prévia interna.

## Áreas de atuação implementadas

- Quatro artigos semânticos com H3: Direito Cível, Direito de Família, Direito Previdenciário e Direito Trabalhista.
- Descrições gerais dos ramos do Direito, sem promessas ou atribuição de serviços específicos adicionais ao escritório. Os textos integram esta etapa de aprovação.
- SVGs lineares inline, decorativos e não focáveis, com dimensões explícitas; não exigem CDN ou carregamento de imagens.
- Grid em uma coluna no mobile, duas a partir de 42rem e quatro a partir de 78rem, sem altura fixa ou corte de texto.
- Cards não clicáveis, com hover apenas de cor e borda. Não há cursor de ação, links fictícios ou foco artificial nos cards.
- Revelação em sequência pela configuração existente de data-stagger. Movimento reduzido desativa as animações e transições; sem JavaScript, o conteúdo segue visível.
- Link do menu e CTA do Hero ativos para #areas-de-atuacao, com destino focável. O JavaScript existente já atende a nova âncora; nenhum código ou dependência adicional foi necessário.
- Sobre preservado literalmente. Header alterado somente no link Áreas; Hero alterado somente na ativação do CTA e remoção do aviso pendente. Prévia sincronizada.

### Referências dos textos informativos

As descrições de Cível e Família usam terminologia geral do [Código Civil — texto atualizado na Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html), incluindo obrigações, contratos, responsabilidade civil e relações familiares.

A descrição de Previdenciário se apoia na [Lei nº 8.213/1991 — texto atualizado na Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/lei/1991/lei-8213-24-julho-1991-363650-normaatualizada-pl.html), em especial as espécies de prestações previdenciárias do artigo 18.

A descrição de Trabalhista usa conceitos da [CLT — texto atualizado na Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html), relativos a relações de trabalho, contrato, remuneração e jornada. As descrições são informativas e continuam sujeitas à aprovação do advogado antes da publicação.

## Advogado responsável implementado

- Seção #advogado-responsavel com H2 e referência acessível, em composição tipográfica sobre grafite.
- Conteúdo profissional restrito a Dr. Marco Roberto dos Santos e OAB/SP 439.884, conforme o briefing; não foi feita validação cadastral externa.
- Nome, linha divisória e inscrição organizados em layout fluido, com uma coluna em telas pequenas e duas a partir de 56rem.
- Sem retrato, selo de verificação, formação, biografia ou outros dados não fornecidos.
- Animações e sequência de entrada reutilizam a base existente. Sem nova dependência, arquivo de imagem ou alteração de JavaScript.
- Header, Hero, Sobre e Áreas preservados literalmente; seção sincronizada na prévia interna.
- Diferenciais permanecem omitidos, como definido na análise, por ausência de informações comprovadas e aprovadas.

## Localização e horários implementados

- **Endereço confirmado e configurado:** Rua Joaquim Gutier Navarro Filho, **180** — Bonança, Osasco/SP, CEP **06266-200**, Brasil. O usuário confirmou expressamente: “Usar 180, conforme o perfil da advocacia”. Texto, dataset, iframe e botões foram corrigidos em conjunto.
- O endereço visível, o atributo data-office-address, a rota, a pesquisa e a consulta do iframe usam o mesmo endereço completo, com número, bairro e CEP.
- Botões “Como chegar” e “Abrir no Google Maps” utilizam as [URLs universais documentadas pelo Google](https://developers.google.com/maps/documentation/urls/get-started), com api=1 e codificação por encodeURIComponent. A rota não fixa a origem; o visitante pode usar sua localização ou informar um ponto de partida no Maps.
- Hrefs completos estão no HTML, com target=_blank e rel=noopener noreferrer. O JavaScript sincroniza os destinos pelo data-office-address, mas os links também funcionam sem ele.
- Mapa por iframe público de consulta ao Google Maps, sem chave exposta. Não se trata de configuração da Maps Embed API v1 autenticada por chave. O iframe tem título acessível, loading=lazy, dimensões reservadas, política de referência e controles/atribuição do Google preservados.
- O mapa fica fora dos reveals. Há indicação permanente para usar os botões externos se o iframe não carregar; não há mensagem automática de sucesso baseada no evento load.
- Tabela semanal com cabeçalhos de linha: segunda a sábado, **08:00–17:00**; domingo, **Fechado**. Intervalos podem quebrar entre os horários em fonte ampliada.
- Nota: “Os horários podem ser diferentes em feriados, inclusive no Dia de Finados.” O texto copiado sobre a segunda-feira de Finados não foi transformado em garantia de abertura nesse feriado nem em rótulo permanente de toda segunda-feira.
- Header alterado apenas para habilitar Localização; seções anteriores preservadas e prévia sincronizada.

### Validação do endereço e do mapa

- Na implementação preliminar, iframe e botão “Como chegar” foram testados no Chrome por HTTP local e funcionaram para o endereço então configurado. Esse teste anterior não equivale a uma conferência visual da versão corrigida para nº 180.
- Pesquisa, rota e iframe foram auditados por decodificação dos parâmetros: os três correspondem exatamente ao endereço vigente. Não foi inserido Place ID ou coordenada para tentar comprovar o estabelecimento.
- Após a confirmação do nº 180, a auditoria dos dois HTMLs confirmou endereço completo, bairro e CEP nos três destinos, ausência do número anterior no conteúdo, prévia idêntica e preservação exata dos horários e das seções aprovadas. A revisão visual do iframe corrigido para nº 180 permanece pendente; a tentativa no Chrome foi interrompida por mudança da guia em uso.
- **Divergência resolvida:** o perfil “ADVOCACIA - DR. MARCO ROBERTO DOS SANTOS” no Google Maps exibe nº **180**. O número que aparecia no título do Street View não foi tratado como prova cadastral. Após essa conferência, o usuário confirmou adotar **180** em todo o site.
- **Limite:** o endereço configurado corresponde ao cadastro consultado e à confirmação do usuário. A correspondência física exata do pin com a fachada preta MRS ainda não foi comprovada visualmente; não apresentar uma verificação cadastral/visual mais ampla do que a realizada.
- O acesso nativo ao Chrome voltou a funcionar nesta etapa, mas apresentou interrupções/timeouts durante a revisão. Não houve revisão completa de responsividade, zoom ou console em todos os tamanhos.

## Contato e WhatsApp implementados

- Seção #contato com H2, canais com H3, nome acessível dos links e destino focável. Menu e CTA do Header levam à seção.
- WhatsApp confirmado expressamente pelo usuário: **(11) 94352-4167**. Link internacional: **https://wa.me/5511943524167**, com mensagem codificada “Olá, gostaria de informações sobre o atendimento.”
- Formato do link e mensagem inicial seguem a [documentação de clique para conversar do WhatsApp](https://faq.whatsapp.com/5913398998672934). O clique abre o canal com texto inicial; o visitante decide enviá-lo. Não há envio automático nem automação de mensagens.
- Telefone fixo: **(11) 4384-0245**, com tel:+551143840245. O número consta do briefing e o DDD foi conferido no perfil do escritório no Google Maps consultado durante a etapa anterior.
- Endereço nº **180**, Bonança, Osasco/SP, CEP06266-200 mantido; link interno para localização e horários. Nenhum e-mail, formulário ou disponibilidade adicional foi criado.
- Botão flutuante no canto inferior direito, 56px, safe-area, foco visível em dois tons e ícone SVG local do WhatsApp. Origem e licença em assets/icons/README.md.
- O botão não tem pulsos, contador ou animação de atenção. Ele abre nova guia com rel=noopener noreferrer e nome acessível contendo canal e telefone.
- Há espaço reservado no fim da página. O IIFE novo verifica interseção com o mapa e os detalhes de Contato e recolhe o botão se houver sobreposição. Um botão já focado nunca é ocultado; ao sair do foco, a geometria é reavaliada.
- Scroll, resize, load e foco são agrupados por requestAnimationFrame; ResizeObserver é opcional. As falhas de medição/API mantêm o link disponível. Sem JavaScript, os hrefs completos seguem funcionais, mas a proteção dinâmica de sobreposição não atua.
- Header alterado somente nos links de Contato. Hero, Sobre, Áreas, Advogado responsável, Localização e horários preservados literalmente. O JavaScript anterior foi mantido, com apenas um novo IIFE ao final.
- Um favicon vazio (data:,) evita a requisição automática inexistente a /favicon.ico. Favicon personalizado continua aguardando o logo oficial aprovado.

## Rodapé implementado

- Footer semântico fora do main, com identificação de Dr. Marco Roberto dos Santos, identificação Advogado e OAB/SP 439.884.
- Navegação institucional com cinco destinos reais; telefone fixo, WhatsApp confirmado e endereço nº 180, Bonança, Osasco/SP, CEP06266-200.
- Link para localização e horários e opção de voltar ao início. WhatsApp usa o mesmo número e mensagem já aprovados, com nova guia e rel seguro.
- Direitos reservados com ano de criação do projeto, 2026. Não representa data de fundação ou tempo de exercício profissional; não exige JavaScript.
- Layout em uma, duas ou quatro colunas, com quebra de texto e contraste da paleta escura. Links têm área mínima de 44px e foco visível.
- Faixa lateral reservada para o WhatsApp até 88rem; acima dessa largura, o limite de 78rem do container já oferece espaço suficiente. O rodapé substitui o preenchimento final do body para manter o fundo grafite até o fim da página.
- Nenhum perfil de rede social, e-mail, política de privacidade ou destino fictício foi criado. A pertinência e o conteúdo das informações de privacidade serão avaliados na revisão final com os serviços efetivamente utilizados.
- Header e seis seções aprovadas preservados literalmente. JavaScript, WhatsApp e horários mantidos. Footer idêntico na prévia; a revisão visual completa ainda está pendente.

## Convenções de animação

- `data-reveal="fade"`: entrada com opacidade e deslocamento de 28px.
- `data-reveal="opacity"`: entrada somente com opacidade, usada no CTA do Hero.
- `data-reveal="title"`: revelação com máscara e deslocamento de 24px.
- `data-reveal="line"`: expansão horizontal de linha.
- `data-stagger` no contêiner: intervalo de 80ms entre descendentes animados, limitado a 240ms.
- `data-reveal-delay`: atraso explícito, em milissegundos, limitado a 240ms.

As animações são apenas uma melhoria visual. O conteúdo permanece visível sem JavaScript, sem suporte às APIs ou em caso de erro. Alterar a preferência de movimento reduzido cancela as animações ativas. Receber foco por teclado também cancela a animação do contêiner correspondente. Não há rolagem controlada por biblioteca.

## Verificações realizadas

- HTML: idioma, IDs únicos, destinos das âncoras e referências locais verificados.
- JavaScript: sintaxe e nove cenários de comportamento passaram no JavaScriptCore, com DOM simulado. Incluem preferência de movimento reduzido inicial e alterada, foco antes e durante a animação, ausência das APIs, falha de animação e página sem elementos animados.
- Prévia HTTP local: resposta 200.
- Revisão estática de acessibilidade: contraste dos textos, foco, skip link e melhoria progressiva verificados.
- A automação do navegador ficou indisponível; responsividade visual, zoom e carregamento visual das fontes ainda precisam de conferência no navegador. Os testes com DOM simulado não substituem essa revisão.
- O download de Cormorant Garamond e Inter falhou no sandbox por DNS. A repetição com pedido de autorização foi interrompida antes de concluir. Não foram obtidos arquivos; a prévia informa o fallback e não solicita fontes ausentes. A tipografia definitiva permanece pendente.
- Header: 19 cenários lógicos passaram no JavaScriptCore com DOM simulado, executando o script real. Foram verificados inicialização sem reveals, abertura/fechamento, Escape com foco dentro e fora do Header, retorno de foco, clique fora, saída por Tab, seleção de âncora, links pendentes, Seta para baixo, transições de breakpoint, movimento reduzido, cancelamento ao focar, falhas/ausência de Web Animations, estado de rolagem e independência dos reveals.
- HTML do Header: IDs, aria-controls, destinos reais, fallback sem JS e estados indisponíveis verificados; cópia da prévia idêntica ao index e breakpoint CSS/JS alinhado em 75rem.
- Layout mobile revisado no CSS para permitir quebra em espaço extremo e fonte ampliada. Isso não constitui validação visual: o navegador conectado permanece indisponível.
- Hero: H1 único nos dois HTMLs, IDs e referências acessíveis válidas, recursos locais existentes, CTA pendente sem destino falso e apenas a seção autorizada no index. Header aprovado preservado literalmente e Hero sincronizado na prévia.
- Hero: seis cenários lógicos passaram no JavaScriptCore com DOM simulado, cobrindo opacidade sem deslocamento, atraso, cancelamento ao receber foco, foco anterior à animação, movimento reduzido e ausência das APIs de animação/observação.
- Contraste do Hero sobre grafite: champagne 6,41:1, off-white 15,63:1 e texto secundário 9,51:1. Revisão visual de responsividade/zoom ainda pendente no navegador.
- Sobre: referências locais e acessíveis, H1 único, IDs únicos, destino real e focável, sincronização da prévia e preservação literal do Hero verificados.
- Navegação para Sobre: cinco cenários lógicos passaram no JavaScriptCore com DOM simulado, cobrindo carregamento direto, mudança de âncora/retorno, alias #inicio, hash não mapeado e fechamento do menu mobile com foco no destino. Não houve validação visual no navegador.
- Áreas de atuação: checados H1 e IDs únicos, referências acessíveis e locais, destinos do menu/CTA, remoção do aviso pendente, preservação de Sobre e sincronização da prévia. Revisão independente confirmou semântica dos cards, ausência de ações fictícias e escopo das alterações em Header/Hero.
- Os testes de comportamento das etapas anteriores permanecem como registro dessas etapas; não foram repetidos na 3.4, pois o JavaScript não mudou. Responsividade e interação visual continuam pendentes de verificação no navegador.
- Advogado responsável: revisão independente confirmou preservação literal de Header, Hero, Sobre, Áreas e script.js, nova seção idêntica na prévia, H1 único, H2/IDs/referências acessíveis válidos e dados fiéis ao briefing.
- Não foram adicionados testes de comportamento na etapa 3.5: a seção usa as animações já existentes e o JavaScript permaneceu inalterado. A revisão visual de responsividade e zoom continua pendente no navegador.
- Localização: parâmetros de rota/pesquisa/iframe auditados, endereço completo e CEP consistentes, sem chave/origem/coordenadas no código, IDs/âncoras e referências acessíveis válidos, links externos seguros e horários conferidos. Após a confirmação do usuário, os três destinos foram corrigidos para nº 180.
- Localização: cinco cenários lógicos no JavaScriptCore passaram para sincronização UTF-8 dos três destinos, não recarregar iframe já correto, ausência de iframe, ausência de seção e configuração vazia com preservação do fallback HTML.
- Revisão independente confirmou preservação das seções anteriores, mudança do Header somente no link Localização e prévia sincronizada. Iframe e rota também foram testados no Chrome conforme detalhado acima.
- Contato/WhatsApp: número internacional, mensagem UTF-8, tel do fixo, atributos acessíveis, hrefs/recursos locais, H1/IDs e destino de Contato conferidos. Maps continua consistente no nº180 e os horários não mudaram. SVG analisado como XML, com apenas elementos svg/title/path e sem conteúdo ativo.
- Proteção do botão: **25 cenários lógicos passaram** no JavaScriptCore com DOM simulado, incluindo interseção positiva, bordas encostadas, foco preservado, saída de foco, retorno da visibilidade, agrupamento de eventos e falhas das APIs. Não houve envio de mensagem.
- A prévia de Contato foi servida pelo servidor local e aberta no Chrome; a captura/observação visual seguinte expirou. Não declarar concluída a revisão visual de posição, sobreposição, mobile ou zoom.
- Rodapé: revisão independente confirmou H1 único, IDs/ARIA e âncoras válidos, contatos e destinos seguros, recursos locais existentes e sincronização da prévia. Header, seis seções aprovadas e JavaScript preservados por comparação de hashes.
- Não foram adicionados testes de comportamento nesta etapa estática: a navegação e o WhatsApp utilizam os mecanismos já existentes. Conferência visual de responsividade/zoom e conclusão das demais pendências pertencem à revisão final.

## Pendências e limites

- Logo oficial ainda não fornecido; não foi reconstruído monograma nem criado favicon.
- Nome, inscrição e áreas usados nos metadados provêm do briefing; não representam validação cadastral externa.
- WhatsApp (11) 94352-4167 confirmado pelo usuário. Telefone fixo e DDD constam das fontes identificadas acima; os contatos finais continuam sujeitos à revisão do responsável antes da publicação.
- Endereço confirmado: Rua Joaquim Gutier Navarro Filho, **180** — Bonança, Osasco/SP, CEP **06266-200**. A escolha do número está resolvida; a correspondência física exata do pin com a fachada MRS ainda não foi comprovada visualmente.
- Não há formulário. O mapa faz requisições ao Google e os links de WhatsApp abrem serviço externo quando acionados; revisar as informações de privacidade pertinentes antes da publicação.
- Os textos finais e a publicação dependem da aprovação prevista no briefing.
- `noindex, nofollow` é temporário durante a revisão. Não equivale a controle de acesso; revisar antes da publicação aprovada.
- URL canônica, `og:url`, imagem Open Graph e favicon aguardam domínio e identidade oficial.
- O champagne não é cor oficial confirmada. Em fundo claro, textos pequenos usam marrom por contraste.
- A prévia e sua folha de estilo devem ser excluídas do pacote público final.

## Próxima etapa

Após aprovação do rodapé, executar a **Etapa 4 — Revisão final**: responsividade, teclado/foco, contraste, animações, links, Maps nº180, WhatsApp, fontes, SEO, privacidade pertinente, console e desempenho. Corrigir problemas observados e registrar com precisão o que foi validado e o que depende de material oficial ou de aprovação do responsável antes da publicação.
