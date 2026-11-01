# Revisão final — 31/10/2026

## Estado

As correções técnicas observadas foram aplicadas à prévia local. A revisão não publicou o website. Identificação tipográfica provisória mantida até o recebimento do logo oficial MRS.

## Alterações aplicadas

1. Retirado o item Contato duplicado do cabeçalho; o CTA Entrar em contato é o único acesso de contato nessa navegação.
2. Mantidas três chamadas principais distintas: contato, áreas de atuação e rota. Abrir no Google Maps tornou-se um link textual sob o iframe. Retirados atalhos repetidos de localização e de voltar ao início no contato/rodapé; a navegação institucional permanece disponível.
3. O WhatsApp flutuante também se recolhe quando um link equivalente do conteúdo está inteiramente visível abaixo do cabeçalho. Mantida a proteção contra sobreposição do mapa/detalhes de contato e contra ocultar um botão já focado.
4. Instaladas fontes WOFF2 oficiais, locais: Cormorant Garamond variável 300–700 e Inter variável 100–900, com preload, swap e licenças OFL. Acentos portugueses e metadados dos arquivos conferidos com fontTools.
5. Corrigido um excesso de 11 px observado na descrição de um card em 320 px com fonte a 200%, permitindo quebra de palavras quando necessária.
6. Acrescentados links textuais às políticas dos serviços externos efetivamente usados: Google e WhatsApp.

## Renderização no Chrome

O diagnóstico interno carrega o HTML real em iframes com larguras definidas e aguarda fontes e renderização. Resultado após a correção dos cards:

| Caso | Largura efetiva | Fonte raiz | Excesso horizontal | Elementos fora da largura |
| --- | ---: | ---: | ---: | --- |
| Mobile | 320 px | 16 px | 0 px | Nenhum |
| Tablet | 768 px | 16 px | 0 px | Nenhum |
| Desktop | 1440 px | 16 px | 0 px | Nenhum |
| Texto ampliado | 320 px | 32 px (200%) | 0 px | Nenhum |

Nos quatro casos: um H1, Cormorant Garamond e Inter com status `loaded`, os três destinos do Maps contendo exatamente o endereço confirmado nº 180, zero erros de execução capturados pelos listeners instalados e nenhuma resposta HTTP com erro observável nas entradas de recursos.

Foi obtida uma captura visual do cabeçalho e Hero em desktop: tipografia, navegação, CTA e WhatsApp aparecem legíveis e sem sobreposição nessa captura. A automação nativa apresentou mudanças de janela e timeouts em outras tentativas; isso limita a inspeção visual completa de todas as seções e interações. As medições dos iframes são evidência de geometria real, não uma revisão visual exaustiva.

Reprodução: servir a pasta por HTTP local e abrir `review/qa.html`. Essa página é somente interna e deve ser excluída da publicação.

## Código, navegação e acessibilidade

- **94 cenários lógicos passaram**, executando o JavaScript real no JavaScriptCore com DOM simulado: menu e foco (28), reveals e movimento reduzido (16), Maps (7), sobreposição do WhatsApp (25) e alternativa de WhatsApp visível (18).
- **111 verificações estáticas passaram**: IDs, destinos das âncoras, referências ARIA, H1 único, contatos, horários, recursos locais, atributos de segurança de links e cópias sincronizadas da prévia.
- Menu mobile: Escape com retorno de foco, Seta para baixo, fechamento por seleção/clique fora/saída de foco, mudança de breakpoint e fallback sem JavaScript examinados nos cenários lógicos.
- Conteúdo permanece visível sem JavaScript. Animações respeitam movimento reduzido e são canceladas quando o conteúdo recebe foco.
- Contrastes de texto examinados: entre **5,51:1 e 15,63:1**. Ícone branco do WhatsApp sobre o verde: **4,14:1**.
- Skip link, foco visível, títulos, destinos focáveis, ícones decorativos e cabeçalhos de linha da tabela estão presentes.

Não foi feita certificação por leitor de tela, teste completo de teclado em navegador real nem matriz de navegadores/dispositivos. Testes lógicos e auditoria estática não substituem esses testes.

## Endereço, mapa e contato

Endereço vigente: **Rua Joaquim Gutier Navarro Filho, 180 — Bonança, Osasco/SP, CEP 06266-200, Brasil**. O usuário confirmou usar o nº 180 do perfil da advocacia no Google Maps. Texto, dataset, rota, pesquisa e iframe usam esse endereço completo.

A rota e a pesquisa seguem as [URLs universais do Google Maps](https://developers.google.com/maps/documentation/urls/get-started), com `api=1` e endereço codificado. O iframe usa consulta pública; não é a Maps Embed API v1 autenticada por chave. Há título, dimensões reservadas, lazy loading e um link externo de contingência. Os testes de parâmetros confirmam os destinos configurados; não comprovam a precisão física do pin sobre a fachada MRS. Essa correspondência visual exata continua sem comprovação conclusiva.

WhatsApp: **(11) 94352-4167**, destino `5511943524167`, confirmado pelo usuário. Mensagem inicial: “Olá, gostaria de informações sobre o atendimento.” A conversa segue o formato de [clique para conversar do WhatsApp](https://faq.whatsapp.com/5913398998672934); não houve envio de mensagem. Telefone fixo: **(11) 4384-0245**.

Horários preservados: segunda a sábado, **08:00–17:00**; domingo fechado. Aviso de possível alteração nos feriados, inclusive Finados.

## Performance, SEO e conteúdo

- HTML, CSS e JavaScript sem framework ou dependência de execução. Fontes e ícone locais, script deferido, mapa lazy e dimensões de mídia reservadas. Nenhum score de Lighthouse ou resultado de Core Web Vitals foi medido; o custo dos serviços externos depende do Google e da conexão.
- Conferência HTTP local final: HTML, CSS, JavaScript, os dois WOFF2 e o SVG responderam 200, com conteúdo idêntico aos arquivos do projeto.
- Title, description, Open Graph básico, idioma pt-BR e viewport presentes. `noindex, nofollow` mantido para a prévia. URL canônica, `og:url`, imagem social e favicon de marca dependem de domínio/logo e da futura publicação.
- Nome, OAB e áreas provêm do briefing, sem validação cadastral externa da inscrição. Não há profissionais, fotos, formação, experiência, depoimentos ou resultados inventados. Diferenciais continuam omitidos.
- Auditoria do texto não encontrou promessa de resultado, comparação, preços ou alegação de especialização. Referências examinadas: [Provimento OAB 205/2021](https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021), especialmente arts. 1º, 3º e 4º, e [Código de Ética](https://www.oab.org.br/publicacoes/AbrirPDF?LivroId=0000004085), art. 44. Essa auditoria de conteúdo não certifica conformidade jurídica e preserva a revisão do advogado prevista no briefing.
- Sem formulário, analytics, cookies ou storage próprios no código público. O iframe carrega conteúdo do Google e o clique no WhatsApp abre serviço externo. Links para as políticas do [Google](https://policies.google.com/privacy?hl=pt-BR) e [WhatsApp](https://www.whatsapp.com/legal/privacy-policy?lang=pt_BR) constam do rodapé. Não foi criada política fictícia do escritório; o tratamento da futura hospedagem ainda é desconhecido.

## Handoff

Materiais externos restantes: logo oficial MRS e domínio/hospedagem para a publicação. Manter as licenças dos assets. Excluir `review/`, `preview.html`, `preview.css` e a documentação interna do pacote público. Não declarar a publicação concluída, a inscrição profissional validada ou o pin físico confirmado com base nesta revisão.
