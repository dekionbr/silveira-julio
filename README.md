# Julio Silveira — Portfólio

Site institucional/portfólio de **Julio Cesar Domingos da Silveira Jr.**, Senior Software Engineer e Desenvolvedor Fullstack.

Feito em **HTML, CSS e JavaScript puro**, sem frameworks nem etapa de build.

## Conceito

Design cinematográfico, como um filme em cenas:

- **Abertura**: contagem regressiva de película (3·2·1) e barras de *letterbox* que se abrem
- **Grão de filme** e vinheta sobre toda a página, com feixes de luz no hero
- **Cena 01 – Sobre**: texto que "acende" palavra por palavra ao rolar e números animados
- **Cena 02 – Trajetória**: linha do tempo horizontal fixada na rolagem (vertical no celular)
- **Cena 03 – Stack**: o "elenco técnico"
- **Cena 04 – Filmografia**: projetos com prévia flutuante que segue o cursor
- **Cena 05 – Formação, certificados e palestra**
- **Cena 06 – Créditos finais**: contato

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

Por ser estático, pode ser publicado diretamente no **GitHub Pages** (Settings → Pages → branch `master`, pasta `/root`), Netlify ou Vercel.
