# 🌐 distritozlg-site

Site do projeto **Distrito ZLG**, desenvolvido com foco em performance, design moderno e fácil manutenção.  
O projeto utiliza **React**, **Vite** e **Tailwind CSS**, com componentes reutilizáveis e estilização consistente para garantir uma experiência fluida e profissional.

---

## 🧰 Tecnologias utilizadas

- ⚡ **Vite** — bundler e dev server ultra rápido  
- ⚛️ **React** — interface declarativa e componentizada  
- 💅 **Tailwind CSS** — estilização moderna e responsiva  
- 🧩 **TypeScript** — tipagem estática para mais segurança  
- 🧠 **shadcn/ui** — biblioteca de componentes estilizados e acessíveis  

---

## 🚀 Como executar o projeto localmente

Clone o repositório e instale as dependências para rodar o site em ambiente de desenvolvimento:

```bash
# 1. Clone o repositório
git clone https://github.com/AlysonCamargo/distritozlg-site.git

# 2. Acesse o diretório do projeto
cd distritozlg-site

# 3. Instale as dependências
npm install
# ou
pnpm install
# ou
yarn install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 📦 Scripts disponíveis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera o build de produção na pasta `dist` |
| `npm run preview` | Visualiza localmente o build gerado |
| `npm run lint` | Executa análise de código (ESLint) |
| `npm run format` | Formata o código com Prettier (se configurado) |

---

## 📂 Estrutura de diretórios

```
/
├─ public/                # Arquivos públicos (ícones, imagens, etc)
├─ src/                   # Código-fonte principal
│  ├─ components/         # Componentes reutilizáveis
│  ├─ pages/              # Páginas principais do site
│  ├─ assets/             # Imagens, ícones e recursos estáticos
│  ├─ hooks/              # Hooks personalizados
│  └─ main.tsx            # Ponto de entrada do React
├─ package.json
├─ tailwind.config.ts
├─ vite.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 🌍 Deploy

O site pode ser facilmente hospedado em plataformas como **Vercel**, **Netlify** ou **GitHub Pages**.

### 🔧 Build de produção
```bash
npm run build
```

Os arquivos prontos para deploy serão gerados na pasta `dist/`.

Se estiver usando **Vercel**, basta conectar o repositório e definir:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 🤝 Como contribuir

Contribuições são sempre bem-vindas! 💡

1. Faça um **fork** deste repositório  
2. Crie uma **branch** para sua feature ou correção:  
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça suas alterações e rode localmente  
4. Envie um **Pull Request** com uma boa descrição do que foi feito  

---

## 📝 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar, modificar e distribuir conforme desejar.

```
MIT License © 2025 Alyson Camargo
```

---

Feito com 💙 por [Alyson Camargo](https://github.com/AlysonCamargo)
