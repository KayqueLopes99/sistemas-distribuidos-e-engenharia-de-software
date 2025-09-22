# Guia rápido: Vite + Tailwind CSS

```bash
// Permite execução de scripts PowerShell para o usuário atual
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned 

// Cria um novo projeto Vite
npm create vite@latest

// Instala Tailwind CSS e plugin do Vite
npm install tailwindcss @tailwindcss/vite            

// Entra na pasta do projeto (exemplo: tarefaX)
cd tarefaX        

// Instala as dependências do projeto
npm install   

// Gera os arquivos de build
npm run build     

// Inicia o servidor de desenvolvimento
npm run dev                       
````

🔗 Documentação oficial: [Tailwind + Vite](https://tailwindcss.com/docs/installation/using-vite)

---

## Passos detalhados

### \[1] Criar o projeto

```bash
npm create vite@latest my-project
cd my-project
```

+ Cria e entra no diretório do projeto.

### \[2] Instalar Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

+ Instala o Tailwind CSS e plugin para Vite.

### \[3] Configurar plugin no Vite

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

+ Adiciona o plugin Tailwind no arquivo `vite.config.js`.

### \[4] Importar Tailwind no CSS

```css
@import "tailwindcss";
```

+ Importa Tailwind dentro do seu arquivo CSS principal.

### \[5] Iniciar servidor

```bash
npm run dev
```

+ Sobe o projeto no modo de desenvolvimento.

### \[6] Usar Tailwind no HTML

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

+ Teste inicial com classes do Tailwind.

---

📌 **Obs.:** O `App.jsx` pode ser ajustado copiando o exemplo direto do site do Tailwind.

