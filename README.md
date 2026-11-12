# Julio Silveira — Portfólio

Site institucional e portfólio de **Julio Cesar D. da Silveira Jr.**, Backend Engineer com mais de 20 anos de experiência em .NET (C#), Node.js, Python e Go, APIs, microsserviços e sistemas de pagamento.

🔗 **Acesse:** https://silveirajulio.com.br

Desenvolvido em **HTML, CSS e JavaScript puros**, sem frameworks, bibliotecas ou etapa de build.

## Seções

| # | Seção | Conteúdo |
|---|-------|----------|
| — | Início | Nome, cargo e principais áreas de atuação |
| 01 | Sobre | Perfil profissional e números de destaque |
| 02 | Experiência | Linha do tempo com as empresas, de 2006 até hoje |
| 03 | Competências | Tecnologias, pagamentos e finanças, arquitetura e práticas |
| 04 | Projetos | Projetos desenvolvidos e mantidos, incluindo o AutoTEF (Stone) e o app de vendas do Grupo Mateus |
| 05 | Depoimentos | Recomendações de Claudia Mere (com tradução do inglês), Daniel Fontoura e George De Luca |
| 06 | Formação & certificações | Formação acadêmica, certificações, palestras, idiomas e cursos |
| 07 | Contato | E-mail, LinkedIn, GitHub, YouTube e WhatsApp |

## Recursos

- **Tema escuro e claro**: botão no cabeçalho; a escolha fica salva no navegador e, enquanto nenhuma for feita, o site segue o tema do sistema operacional.
- **Animações de entrada e rolagem**: texto que se revela palavra por palavra, contadores animados e linha do tempo horizontal fixada na rolagem.
- **Responsivo**: no celular, a linha do tempo passa a ser vertical e o menu abre em tela cheia.
- **Acessibilidade**: respeita `prefers-reduced-motion`, oferece foco visível no teclado e rótulos ARIA nos botões.

## Estrutura

```
.
├── index.html                              # conteúdo e marcação
├── css/style.css                           # estilos e temas (variáveis em :root)
├── js/main.js                              # tema, animações e interações
└── assets/certificado-aspnetcore-angular.pdf
```

## Como executar localmente

Abra o `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8080
# acesse http://localhost:8080
```

## Personalização

- **Textos**: todo o conteúdo está em `index.html`.
- **Cores**: as variáveis de cada tema ficam no início de `css/style.css`, em `:root[data-theme="dark"]` e `:root[data-theme="light"]`.
- **Logos das empresas** (marca d'água nos cards de experiência): salve em `assets/logos/` uma silhueta com fundo transparente (SVG ou PNG grande) e, no `index.html`, troque o `<span class="card-xp__mark">` da empresa por um com a classe `card-xp__mark--logo` e `style="mask-image: url(assets/logos/arquivo.png)"` (veja o exemplo da CMCorp). A logo é tingida com a cor do tema. Também é possível usar um SVG inline com a classe `card-xp__mark--icon` (como no card da Fulllab).
- **Capturas dos projetos** (prévia flutuante ao passar o mouse): salve a imagem em `assets/projects/` (~900px de largura, WebP; ela aparece ao fundo, cortada e tingida pela cor do projeto) e adicione `data-image="assets/projects/arquivo.webp"` ao `<li class="work__item">`. Para uma logo na prévia, use `data-logo` e `data-logo-alt`.
- **Fontes**: Fraunces (títulos), Inter (texto) e JetBrains Mono (detalhes), carregadas do Google Fonts.

## Publicação

O site é publicado pelo **GitHub Pages** a partir do branch `gh-pages`, no domínio próprio **silveirajulio.com.br** (definido no arquivo `CNAME`, que deve existir em todos os branches publicados). Para atualizar, envie as alterações para esse branch:

```bash
git push origin HEAD:gh-pages
```

Ao alterar `css/style.css` ou `js/main.js`, atualize o parâmetro `?v=` nos links do `index.html` para que os navegadores não usem a versão antiga em cache.

## Contato

- LinkedIn: [julio-silveira-dev](https://www.linkedin.com/in/julio-silveira-dev/)
- GitHub: [@dekionbr](https://github.com/dekionbr)
- YouTube: [@JulioSilveiraDev](https://www.youtube.com/@JulioSilveiraDev)
