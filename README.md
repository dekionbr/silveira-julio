# Julio Silveira — Portfólio

Site institucional/portfólio de **Julio Cesar Domingos da Silveira Jr.**, Senior Software Engineer e Desenvolvedor Fullstack.

Feito em **HTML, CSS e JavaScript puro**, sem frameworks nem etapa de build.

## Conceito

Visual institucional em azul-marinho, com animações suaves de entrada e rolagem:

- **Tema escuro e claro**: botão no cabeçalho; a escolha fica salva no navegador e, sem escolha, segue o tema do sistema
- **Início**: apresentação com nome, cargo e áreas de atuação
- **01 – Sobre**: perfil profissional e números de destaque
- **02 – Experiência**: linha do tempo horizontal fixada na rolagem (vertical no celular)
- **03 – Competências**: tecnologias, domínios e gestão
- **04 – Projetos**: projetos web com prévia que segue o cursor
- **05 – Formação & certificações**, incluindo palestra
- **06 – Contato**

Respeita `prefers-reduced-motion` e é responsivo.

## Estrutura

```
index.html
css/style.css
js/main.js
assets/certificado-aspnetcore-angular.pdf
```

## Rodando localmente

Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
python3 -m http.server 8080
```

## Publicação

Publicado no **GitHub Pages** a partir do branch `gh-pages`: https://dekionbr.github.io/silveira-julio/
