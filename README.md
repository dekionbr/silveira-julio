# Julio Silveira — Portfólio

Site institucional e portfólio de **Julio Cesar Domingos da Silveira Jr.**, Backend Engineer com mais de 20 anos de experiência em .NET (C#), Node.js, Python e Go, APIs, microsserviços e sistemas de pagamento.

🔗 **Acesse:** https://dekionbr.github.io/silveira-julio/

Desenvolvido em **HTML, CSS e JavaScript puros**, sem frameworks, bibliotecas ou etapa de build.

## Seções

| # | Seção | Conteúdo |
|---|-------|----------|
| — | Início | Nome, cargo e principais áreas de atuação |
| 01 | Sobre | Perfil profissional e números de destaque |
| 02 | Experiência | Linha do tempo com as empresas, de 2006 até hoje |
| 03 | Competências | Tecnologias, pagamentos e finanças, arquitetura e práticas |
| 04 | Projetos | Projetos web desenvolvidos e mantidos |
| 05 | Formação & certificações | Formação acadêmica, certificações, palestras, idiomas e cursos |
| 06 | Contato | E-mail, LinkedIn, GitHub, YouTube e WhatsApp |

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
- **Fontes**: Fraunces (títulos), Inter (texto) e JetBrains Mono (detalhes), carregadas do Google Fonts.

## Publicação

O site é publicado pelo **GitHub Pages** a partir do branch `gh-pages`. Para atualizar, envie as alterações para esse branch:

```bash
git push origin HEAD:gh-pages
```

## Contato

- LinkedIn: [julio-silveira-dev](https://www.linkedin.com/in/julio-silveira-dev/)
- GitHub: [@dekionbr](https://github.com/dekionbr)
- YouTube: [@JulioSilveiraDev](https://www.youtube.com/@JulioSilveiraDev)
