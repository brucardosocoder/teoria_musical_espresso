# Teoria Musical ESPRESSO - Versão Standalone

Uma aplicação web completa de teoria musical com dashboard interativo, portal de exercícios, histórico de resultados e sistema de conquistas.

## 📋 Arquivos Inclusos

- **index.html** - Arquivo HTML principal (17 linhas)
- **styles.css** - Folha de estilos completa (1.028 linhas)
- **script.js** - Lógica JavaScript da aplicação (567 linhas)
- **README.md** - Este arquivo

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Baixe os três arquivos (index.html, styles.css, script.js)
2. Coloque-os na mesma pasta
3. Abra o arquivo `index.html` no seu navegador

### Opção 2: Usar em um Servidor Web
1. Faça upload dos três arquivos para seu servidor web
2. Acesse o arquivo `index.html` através da URL do seu servidor

### Opção 3: Usar com Python (Local)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Depois acesse: `http://localhost:8000`

### Opção 4: Usar com Node.js
```bash
# Instale http-server globalmente
npm install -g http-server

# Execute na pasta do projeto
http-server
```

## 🎨 Características

### Páginas
- **Visão Geral (Dashboard)**: Estatísticas, gráficos de desempenho e atividades recentes
- **Portal de Exercícios**: 7 tópicos de teoria musical (1 desbloqueado)
- **Histórico de Resultados**: Rastreamento de testes realizados
- **Conquistas e Badges**: Sistema de 8 badges para desbloquear

### Design
- **Paleta de Cores**: Laranja queimado (#D2691E) e marrom chocolate (#8B4513)
- **Tipografia**: Merriweather (títulos) e Poppins (corpo)
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Animações**: Transições suaves e efeitos visuais

### Gráficos
- Gráfico de linha: Evolução de desempenho (últimas 6 semanas)
- Gráfico de rosca: Domínio por tópico
- Ambos renderizados com Chart.js

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Desktop**: Layout com sidebar fixa
- **Tablet**: Layout adaptado com grid responsivo
- **Mobile**: Layout empilhado com navegação otimizada

## 🔧 Personalização

### Mudar Cores
Edite as variáveis CSS no arquivo `styles.css`:
```css
:root {
    --primary: #D2691E;        /* Cor primária */
    --primary-dark: #8B4513;   /* Cor primária escura */
    --background: #F5F5DC;     /* Fundo */
    /* ... outras cores */
}
```

### Adicionar Exercícios
No arquivo `script.js`, adicione novos exercícios ao array `app.exercises`:
```javascript
{
    id: 'novo-topico',
    title: 'Novo Tópico',
    questions: 10,
    description: 'Descrição do novo tópico',
    icon: '🎵',
    locked: false,
    badge: '1',
}
```

### Modificar Dados
Todos os dados (exercícios, conquistas, dicas) estão no objeto `app` no arquivo `script.js`.

## 📊 Estrutura de Dados

### Exercícios
```javascript
{
    id: string,
    title: string,
    questions: number,
    description: string,
    icon: emoji,
    locked: boolean,
    badge: string|number
}
```

### Conquistas
```javascript
{
    id: string,
    title: string,
    description: string,
    icon: emoji,
    locked: boolean
}
```

## 🌐 Compatibilidade

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## 📦 Dependências Externas

- **Chart.js 3.9.1**: Para renderizar gráficos
- **Google Fonts**: Merriweather e Poppins

Ambas são carregadas via CDN, portanto não requerem instalação local.

## 💡 Dicas de Uso

1. **Offline**: A aplicação funciona offline após o primeiro carregamento (fonts podem não carregar)
2. **Customização**: Todos os textos, cores e dados podem ser facilmente modificados
3. **Expansão**: Adicione novas páginas duplicando a estrutura das páginas existentes
4. **Dados Persistentes**: Para salvar dados, integre com localStorage ou um backend

## 📝 Licença

Esta aplicação é fornecida como está para uso educacional e comercial.

## 🤝 Suporte

Para modificações ou dúvidas sobre a estrutura do código, consulte os comentários no arquivo `script.js` e `styles.css`.

---

**Versão**: 1.0.0  
**Última Atualização**: Janeiro 2026  
**Desenvolvido com**: HTML5, CSS3, JavaScript Vanilla
