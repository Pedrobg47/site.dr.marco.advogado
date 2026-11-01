# Fontes locais

Arquivos WOFF2 oficiais do Google Fonts, subset latino, obtidos em 30/10/2026. Os binários foram preservados sem conversão ou alteração. O carregamento no site pode ser inteiramente local, sem requisições ao Google Fonts.

| Arquivo | Família CSS | Estilo | Eixo variável real `wght` | Versão interna | Tamanho |
| --- | --- | --- | --- | --- | --- |
| `cormorant-garamond-latin.woff2` | Cormorant Garamond | normal | 300–700; padrão 300 | 4.001 | 37.776 bytes |
| `inter-latin.woff2` | Inter | normal | 100–900; padrão 400 | 4.001; git-66647c0bb | 48.432 bytes |

Os pesos 400, 500 e 600 aprovados para o site estão presentes nos dois arquivos. Para `@font-face`, usar a faixa real de cada arquivo (`font-weight: 300 700` e `font-weight: 100 900`), `font-style: normal` e `font-display: swap`. Nenhum arquivo de itálico foi incluído.

## Origem oficial

- [Consulta à API CSS2 do Google Fonts](https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400..600&family=Inter:wght@400..600&display=swap). Os blocos `latin` responderam com `font-style: normal` e `font-weight: 400 600`; a leitura da tabela `fvar` confirmou que os binários fornecidos contêm as faixas mais amplas indicadas acima.
- [WOFF2 Cormorant Garamond, CDN oficial](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2).
- [WOFF2 Inter, CDN oficial](https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2).

## Português e validação

Os dois arquivos foram abertos e decodificados com fontTools; assinatura WOFF2, comprimento declarado, tabelas de nomes, eixo `wght` e mapa de caracteres foram conferidos. Cormorant Garamond contém 373 glifos e 229 pontos Unicode mapeados; Inter contém 518 glifos e 230 pontos Unicode mapeados.

Foi confirmada a presença dos caracteres portugueses pré-compostos `ÀÁÂÃÄÇÉÊÍÓÔÕÚÜàáâãäçéêíóôõúü`, dos ordinais `ºª` e da pontuação `–—“”‘’•`. O conteúdo deve usar Unicode NFC; o subset latino não inclui todos os sinais combinantes para texto decomposto. Não é um pacote completo para todos os alfabetos.

SHA-256 dos binários:

```text
5d618c462b7a5b74f442e1548880086af71764d9cc7d35c16ab45353da934621  cormorant-garamond-latin.woff2
c940764593d0fe5d596be327ca7558855e018039fb78509aa21921fd3644c3e4  inter-latin.woff2
```

## Licenças

Ambas as famílias são distribuídas sob a SIL Open Font License 1.1. Os textos integrais oficiais acompanham os arquivos e devem ser preservados na distribuição:

- `OFL-Cormorant-Garamond.txt`: Copyright 2015 the Cormorant Project Authors. [Origem oficial no repositório Google Fonts](https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt).
- `OFL-Inter.txt`: Copyright 2020 The Inter Project Authors. [Origem oficial no repositório Google Fonts](https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt).
