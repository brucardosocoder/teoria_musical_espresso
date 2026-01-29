
const app = {
    currentPage: 'home',
    sidebarOpen: false,
    currentExercise: null,
    userAnswers: [],
    showGabarito: false,
    

    userData: JSON.parse(localStorage.getItem('espresso_user_data')) || {
        completedExercises: {}, // { id: { score: 100, date: '...' } }
        totalTests: 0,
        studyTime: 0,
        streak: 0,
        lastActive: null,
        history: [],
        performance: [45, 52, 65, 72, 85, 0] // Mock inicial + valor atual
    },


    exercises: [
        {
            id: 'tom-semitom',
            title: 'Tom e Semitom',
            questionsCount: 10,
            description: 'Aprenda os conceitos fundamentais de tom e semitom na música',
            icon: '🎵',
            locked: false,
            questions: [
                { q: "Qual a menor distância entre duas notas na música ocidental?", a: "Semitom", options: ["Tom", "Semitom", "Terça", "Quarta"] },
                { q: "Quantos semitons formam um tom inteiro?", a: "2", options: ["1", "2", "3", "4"] },
                { q: "De Dó para Dó#, qual o intervalo?", a: "Semitom cromático", options: ["Tom", "Semitom cromático", "Semitom diatônico", "Terça"] },
                { q: "De Mi para Fá, qual o intervalo?", a: "Semitom diatônico", options: ["Tom", "Semitom cromático", "Semitom diatônico", "Segunda Maior"] },
                { q: "De Dó para Ré, qual o intervalo?", a: "Tom", options: ["Tom", "Semitom", "Trítono", "Quinta"] },
                { q: "Onde ocorrem os semitons na escala maior?", a: "3º/4º e 7º/8º graus", options: ["1º/2º e 5º/6º graus", "3º/4º e 7º/8º graus", "2º/3º e 6º/7º graus", "4º/5º e 1º/2º graus"] },
                { q: "De Sol para Lá, temos um tom ou semitom?", a: "Tom", options: ["Tom", "Semitom", "Dissonância", "Uníssono"] },
                { q: "De Si para Dó, temos um tom ou semitom?", a: "Semitom", options: ["Tom", "Semitom", "Trítono", "Oitava"] },
                { q: "Qual nota está um tom acima de Mi?", a: "Fá#", options: ["Fá", "Fá#", "Sol", "Sol#"] },
                { q: "Qual nota está um semitom acima de Si?", a: "Dó", options: ["Dó", "Dó#", "Si#", "Lá"] }
            ]
        },
        {
            id: 'intervalos',
            title: 'Intervalos Musicais',
            questionsCount: 10,
            description: 'Entenda os intervalos entre notas e suas classificações',
            icon: '📏',
            locked: true,
            questions: [
                { q: "Qual o nome do intervalo entre Dó e Sol?", a: "Quinta Justa", options: ["Quarta Justa", "Quinta Justa", "Sexta Maior", "Terça Maior"] },
                { q: "Quantos semitons existem em uma Terça Maior?", a: "4", options: ["2", "3", "4", "5"] },
                { q: "Um intervalo de 7 semitons é classificado como?", a: "Quinta Justa", options: ["Quarta Justa", "Quinta Justa", "Quinta Diminuta", "Sexta Menor"] },
                { q: "O intervalo de Trítono possui quantos semitons?", a: "6", options: ["5", "6", "7", "8"] },
                { q: "Qual a inversão de uma Terça Maior?", a: "Sexta Menor", options: ["Sexta Maior", "Sexta Menor", "Quinta Justa", "Sétima Menor"] },
                { q: "Intervalos de 4ª, 5ª e 8ª são chamados de?", a: "Justos", options: ["Maiores", "Menores", "Justos", "Aumentados"] },
                { q: "Um intervalo melódico ocorre quando as notas são tocadas...?", a: "Sequencialmente", options: ["Simultaneamente", "Sequencialmente", "Em oitavas", "Com vibrato"] },
                { q: "Qual o intervalo entre Ré e Fá#?", a: "Terça Maior", options: ["Terça Menor", "Terça Maior", "Quarta Justa", "Segunda Maior"] },
                { q: "A soma de um intervalo original com sua inversão resulta em...?", a: "9", options: ["7", "8", "9", "10"] },
                { q: "O intervalo de Segunda Menor é considerado consonante ou dissonante?", a: "Dissonante", options: ["Consonante", "Dissonante", "Neutro", "Justo"] }
            ]
        },
        {
            id: 'escalas-maiores',
            title: 'Escalas Maiores e Armadura de Clave',
            questionsCount: 10,
            description: 'Domine as escalas maiores, o círculo de quintas e armaduras de clave',
            icon: '🎼',
            locked: true,
            questions: [
                { q: "Qual a fórmula da escala maior?", a: "T-T-S-T-T-T-S", options: ["T-S-T-T-S-T-T", "T-T-S-T-T-T-S", "T-T-T-S-T-T-S", "S-T-T-T-S-T-T"] },
                { q: "Quantos sustenidos tem a escala de Sol Maior?", a: "1", options: ["0", "1", "2", "3"] },
                { q: "Qual a ordem dos sustenidos?", a: "Fá-Dó-Sol-Ré-Lá-Mi-Si", options: ["Si-Mi-Lá-Ré-Sol-Dó-Fá", "Fá-Dó-Sol-Ré-Lá-Mi-Si", "Dó-Sol-Ré-Lá-Mi-Si-Fá", "Sol-Ré-Lá-Mi-Si-Fá-Dó"] },
                { q: "Se o último sustenido na armadura é Ré#, qual a tonalidade?", a: "Mi Maior", options: ["Ré Maior", "Mi Maior", "Fá# Maior", "Sol Maior"] },
                { q: "Qual a ordem dos bemóis?", a: "Si-Mi-Lá-Ré-Sol-Dó-Fá", options: ["Si-Mi-Lá-Ré-Sol-Dó-Fá", "Fá-Dó-Sol-Ré-Lá-Mi-Si", "Lá-Ré-Sol-Dó-Fá-Si-Mi", "Mi-Lá-Ré-Sol-Dó-Fá-Si"] },
                { q: "Qual a tonalidade com 2 bemóis (Si e Mi)?", a: "Sib Maior", options: ["Fá Maior", "Sib Maior", "Mib Maior", "Láb Maior"] },
                { q: "No círculo de quintas, subir uma quinta justa no sentido horário adiciona um...?", a: "Sustenido", options: ["Sustenido", "Bemol", "Bequadro", "Acorde"] },
                { q: "A escala de Dó Maior possui quantos acidentes?", a: "Zero", options: ["Zero", "Um", "Dois", "Sete"] },
                { q: "Qual a 7ª nota da escala de Ré Maior?", a: "Dó#", options: ["Dó", "Dó#", "Ré", "Si"] },
                { q: "O penúltimo bemol na armadura indica a tonalidade em escalas com...?", a: "Bemóis", options: ["Sustenidos", "Bemóis", "Tritonos", "Nenhuma"] }
            ]
        },
        {
            id: 'escalas-menores',
            title: 'Escalas Menores (Natural, Harmônica e Melódica)',
            questionsCount: 10,
            description: 'Aprenda os três tipos de escalas menores e suas características',
            icon: '🎶',
            locked: true,
            questions: [
                { q: "Qual a relativa menor de Dó Maior?", a: "Lá Menor", options: ["Sol Menor", "Lá Menor", "Mi Menor", "Ré Menor"] },
                { q: "Qual a fórmula da escala menor natural?", a: "T-S-T-T-S-T-T", options: ["T-T-S-T-T-T-S", "T-S-T-T-S-T-T", "T-S-T-T-T-S-T", "S-T-T-S-T-T-T"] },
                { q: "O que caracteriza a escala menor harmônica?", a: "7º grau elevado", options: ["6º grau elevado", "7º grau elevado", "6º e 7º graus elevados", "3º grau abaixado"] },
                { q: "Na escala menor melódica ascendente, quais graus são elevados?", a: "6º e 7º", options: ["7º apenas", "6º e 7º", "3º e 6º", "2º e 5º"] },
                { q: "A escala menor melódica descendente é igual a qual escala?", a: "Menor Natural", options: ["Menor Harmônica", "Menor Natural", "Maior", "Cromática"] },
                { q: "Qual o intervalo entre o 6º e 7º grau na escala menor harmônica?", a: "Segunda Aumentada", options: ["Segunda Maior", "Segunda Menor", "Segunda Aumentada", "Terça Menor"] },
                { q: "Qual a relativa menor de Sol Maior?", a: "Mi Menor", options: ["Lá Menor", "Si Menor", "Mi Menor", "Ré Menor"] },
                { q: "Qual a nota alterada na escala de Lá Menor Harmônica?", a: "Sol#", options: ["Fá#", "Sol#", "Sol", "Dó#"] },
                { q: "A escala menor natural começa em qual grau da sua relativa maior?", a: "6º grau", options: ["2º grau", "4º grau", "6º grau", "7º grau"] },
                { q: "Qual a fórmula da menor melódica ascendente?", a: "T-S-T-T-T-T-S", options: ["T-S-T-T-S-T-T", "T-S-T-T-T-T-S", "T-T-S-T-T-T-S", "T-S-T-S-T-S-T"] }
            ]
        },
        {
            id: 'triades',
            title: 'Tríades (Formação de Acordes)',
            questionsCount: 10,
            description: 'Aprenda a construir acordes básicos com tríades',
            icon: '🎹',
            locked: true,
            questions: [
                { q: "Quais graus formam uma tríade básica?", a: "1º, 3º e 5º", options: ["1º, 2º e 3º", "1º, 3º e 5º", "1º, 4º e 5º", "1º, 3º e 7º"] },
                { q: "Uma tríade maior é formada por quais intervalos a partir da tônica?", a: "3ª Maior e 5ª Justa", options: ["3ª Menor e 5ª Justa", "3ª Maior e 5ª Justa", "3ª Maior e 5ª Aumentada", "3ª Menor e 5ª Diminuta"] },
                { q: "Qual a estrutura de intervalos (semitons) de uma tríade menor?", a: "3 + 4", options: ["4 + 3", "3 + 4", "3 + 3", "4 + 4"] },
                { q: "Uma tríade diminuta possui qual tipo de quinta?", a: "Quinta Diminuta", options: ["Quinta Justa", "Quinta Aumentada", "Quinta Diminuta", "Sexta"] },
                { q: "Quais as notas da tríade de Dó Maior?", a: "Dó, Mi, Sol", options: ["Dó, Mi, Sol", "Dó, Mib, Sol", "Dó, Mi, Sol#", "Dó, Mib, Solb"] },
                { q: "Na primeira inversão de uma tríade, qual nota fica no baixo?", a: "A Terça", options: ["A Tônica", "A Terça", "A Quinta", "A Sétima"] },
                { q: "Qual a característica sonora de uma tríade aumentada?", a: "Tensão/Suspense", options: ["Alegre", "Triste", "Tensão/Suspense", "Estável"] },
                { q: "Uma tríade com 3 semitons entre Tônica/Terça e 3 semitons entre Terça/Quinta é...?", a: "Diminuta", options: ["Maior", "Menor", "Diminuta", "Aumentada"] },
                { q: "As notas Mi-Sol-Dó formam qual inversão de Dó Maior?", a: "1ª Inversão", options: ["Estado Fundamental", "1ª Inversão", "2ª Inversão", "3ª Inversão"] },
                { q: "Qual a 5ª da tríade de Sol Aumentado?", a: "Ré#", options: ["Ré", "Ré#", "Réb", "Mi"] }
            ]
        },
        {
            id: 'campo-harmonico',
            title: 'Campo Harmônico Maior e Menor',
            questionsCount: 10,
            description: 'Entenda a progressão harmônica em tonalidades maiores e menores',
            icon: '🎸',
            locked: true,
            questions: [
                { q: "Qual a sequência de qualidades no Campo Harmônico Maior?", a: "M, m, m, M, M, m, dim", options: ["M, m, m, M, M, m, dim", "m, dim, M, m, m, M, M", "M, M, m, m, M, m, dim", "M, m, M, m, M, m, dim"] },
                { q: "Qual o acorde do V grau em Dó Maior?", a: "Sol Maior", options: ["Fá Maior", "Sol Maior", "Lá Menor", "Ré Menor"] },
                { q: "O VII grau do Campo Harmônico Maior é sempre...?", a: "Diminuto", options: ["Maior", "Menor", "Diminuto", "Aumentado"] },
                { q: "Quais graus possuem função de Tônica no Campo Harmônico Maior?", a: "I, III, VI", options: ["I, IV, V", "II, IV", "I, III, VI", "V, VII"] },
                { q: "O IV e II graus possuem qual função harmônica?", a: "Subdominante", options: ["Tônica", "Subdominante", "Dominante", "Preparação"] },
                { q: "No Campo Harmônico de Lá Menor Natural, qual o acorde do V grau?", a: "Mi Menor", options: ["Mi Maior", "Mi Menor", "Ré Menor", "Sol Maior"] },
                { q: "Para ter função de Dominante forte em tom menor, o V grau deve ser...?", a: "Maior/7", options: ["Menor", "Maior/7", "Diminuto", "Suspenso"] },
                { q: "Qual o acorde do II grau em Dó Maior?", a: "Ré Menor", options: ["Ré Maior", "Ré Menor", "Mi Menor", "Si Diminuto"] },
                { q: "Qual a função do acorde de Sol em Dó Maior?", a: "Dominante", options: ["Tônica", "Subdominante", "Dominante", "Relativa"] },
                { q: "O acorde de Fá em Dó Maior tem função de...?", a: "Subdominante", options: ["Tônica", "Subdominante", "Dominante", "Sensível"] }
            ]
        },
        {
            id: 'funcoes-harmonicas',
            title: 'Funções Harmônicas e Cadências',
            questionsCount: 10,
            description: 'Aprenda sobre funções harmônicas e as principais cadências musicais',
            icon: '🎺',
            locked: true,
            questions: [
                { q: "Qual a cadência formada por V -> I?", a: "Perfeita", options: ["Plagal", "Perfeita", "Enganosa", "Meia Cadência"] },
                { q: "A cadência IV -> I é conhecida como...?", a: "Plagal", options: ["Perfeita", "Plagal", "Enganosa", "Imperfeita"] },
                { q: "Quando uma progressão termina no V grau, chamamos de...?", a: "Meia Cadência", options: ["Cadência Final", "Meia Cadência", "Cadência de Picardia", "Suspensão"] },
                { q: "Qual a sensação da Cadência Enganosa (V -> VI)?", a: "Surpresa/Desvio", options: ["Conclusão", "Surpresa/Desvio", "Repouso suave", "Tensão máxima"] },
                { q: "Qual função harmônica representa repouso e estabilidade?", a: "Tônica", options: ["Tônica", "Subdominante", "Dominante", "Relativa"] },
                { q: "O acorde de sétima da dominante (V7) exerce qual função?", a: "Dominante", options: ["Tônica", "Subdominante", "Dominante", "Supertônica"] },
                { q: "A cadência 'Amém' é um exemplo de qual cadência?", a: "Plagal", options: ["Perfeita", "Plagal", "Enganosa", "Meia"] },
                { q: "Qual a diferença entre cadência perfeita e imperfeita?", a: "Inversão ou nota da melodia", options: ["O volume", "O tempo", "Inversão ou nota da melodia", "O instrumento"] },
                { q: "O movimento de tensão para repouso é a base da harmonia...?", a: "Funcional", options: ["Cromática", "Funcional", "Atonal", "Modal"] },
                { q: "Qual o acorde substituto principal da Tônica (I)?", a: "VI ou III", options: ["V", "IV", "VI ou III", "II"] }
            ]
        },
    ],


    achievements: [
        { id: 'first-step', title: 'Primeiro Passo', description: 'Complete seu primeiro teste', icon: '🚀' },
        { id: 'apprentice', title: 'Aprendiz', description: 'Complete 5 testes', icon: '📚' },
        { id: 'perfection', title: 'Perfeição', description: 'Obtenha 100% em um teste', icon: '⭐' },
        { id: 'master', title: 'Mestre', description: 'Complete todas as 7 doses', icon: '👑' },
    ],

    tips: [
        { title: 'Estude Regularmente', description: 'A consistência é a chave para o aprendizado musical.', icon: '📚' },
        { title: 'Mire na Perfeição', description: 'Você só avança para o próximo nível com 100% de acerto.', icon: '🎯' },
        { title: 'Teoria e Prática', description: 'Tente tocar os exemplos no seu instrumento.', icon: '🎹' },
    ],
};


document.addEventListener('DOMContentLoaded', () => {
    // Atualizar bloqueios baseados no progresso
    updateLockedStatus();
    renderApp();
    setupEventListeners();
});

function updateLockedStatus() {
    for (let i = 1; i < app.exercises.length; i++) {
        const prevId = app.exercises[i-1].id;
        if (app.userData.completedExercises[prevId] && app.userData.completedExercises[prevId].score === 100) {
            app.exercises[i].locked = false;
        } else {
            app.exercises[i].locked = true;
        }
    }
}

function saveData() {
    localStorage.setItem('espresso_user_data', JSON.stringify(app.userData));
}


function renderApp() {
    const appElement = document.getElementById('app');
    appElement.innerHTML = `
        <div class="app-container">
            ${renderSidebar()}
            <div class="main-content">
                ${renderTopBar()}
                <div class="content-area">
                    ${renderPage()}
                </div>
            </div>
        </div>
    `;
    
    if (app.currentPage === 'home') {
        renderCharts();
    }
}


function renderSidebar() {
    const navItems = [
        { label: 'Visão Geral', icon: '📊', page: 'home' },
        { label: 'Exercícios', icon: '📝', page: 'exercises' },
        { label: 'Histórico', icon: '📋', page: 'history' },
        { label: 'Conquistas', icon: '🏆', page: 'achievements' },
    ];

    const navItemsHtml = navItems.map(item => `
        <a class="nav-item ${app.currentPage === item.page ? 'active' : ''}" data-page="${item.page}">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
        </a>
    `).join('');

    return `
        <div class="sidebar-overlay ${app.sidebarOpen ? 'active' : ''}" id="sidebar-overlay"></div>
        <div class="sidebar ${app.sidebarOpen ? 'open' : ''}">
            <div class="sidebar-header">
                <div class="sidebar-logo">
                    <span class="sidebar-logo-icon">☕</span>
                    <div>
                        <div class="sidebar-logo-text">Teoria Musical</div>
                        <div class="sidebar-logo-subtitle">ESPRESSO</div>
                    </div>
                </div>
            </div>
            <nav class="sidebar-nav">
                ${navItemsHtml}
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                    <a href="https://brucardosocoder.github.io/teoria_musical_espresso/" class="external-link-button">
                        <span class="nav-icon">📚</span>
                        <span>Voltar às doses</span>
                    </a>
                </div>
            </nav>
            <div class="daily-tip">
                <div class="daily-tip-label">💡 Dica do Dia</div>
                <div class="daily-tip-text">Para avançar, você precisa acertar todas as questões de um tópico!</div>
            </div>
        </div>
    `;
}


function renderTopBar() {
    const titles = {
        home: 'Visão Geral',
        exercises: 'Portal de Exercícios',
        history: 'Histórico de Resultados',
        achievements: 'Conquistas e Badges',
        quiz: 'Realizando Exercício'
    };

    return `
        <div class="top-bar">
            <div style="display: flex; align-items: center; gap: 15px;">
                <button class="menu-toggle" id="menu-toggle">☰</button>
                <div class="top-bar-title">${titles[app.currentPage]}</div>
            </div>
            <a class="back-button" data-page="home">Início</a>
        </div>
    `;
}


function renderPage() {
    switch (app.currentPage) {
        case 'home': return renderHomePage();
        case 'exercises': return renderExercisesPage();
        case 'history': return renderHistoryPage();
        case 'achievements': return renderAchievementsPage();
        case 'quiz': return renderQuizPage();
        default: return renderHomePage();
    }
}


function renderHomePage() {
    const completedCount = Object.keys(app.userData.completedExercises).length;
    const avgScore = completedCount > 0 ? Math.round(Object.values(app.userData.completedExercises).reduce((a, b) => a + b.score, 0) / completedCount) : 0;

    return `
        <div class="page-header">
            <h1 class="page-title">Olá, Estudante!</h1>
            <p class="page-subtitle">Acompanhe seu progresso na jornada musical.</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-content">
                    <div class="stat-label">Média Geral</div>
                    <div class="stat-value">${avgScore}%</div>
                </div>
                <div class="stat-icon">📊</div>
            </div>
            <div class="stat-card">
                <div class="stat-content">
                    <div class="stat-label">Doses Concluídas</div>
                    <div class="stat-value">${completedCount}/7</div>
                </div>
                <div class="stat-icon">✅</div>
            </div>
            <div class="stat-card">
                <div class="stat-content">
                    <div class="stat-label">Total de Testes</div>
                    <div class="stat-value">${app.userData.totalTests}</div>
                </div>
                <div class="stat-icon">📝</div>
            </div>
            <div class="stat-card">
                <div class="stat-content">
                    <div class="stat-label">Sequência</div>
                    <div class="stat-value">${app.userData.streak} dias</div>
                </div>
                <div class="stat-icon">🔥</div>
            </div>
        </div>

        <div class="charts-grid">
            <div class="chart-card">
                <h2 class="chart-title">Evolução de Desempenho</h2>
                <div class="chart-container">
                    <canvas id="performanceChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2 class="chart-title">Dicas</h2>
                <div class="topic-legend">
                    ${app.tips.map(tip => `
                        <div class="legend-item" style="margin-bottom: 15px; display: block;">
                            <div style="font-weight: 700; color: var(--primary);">${tip.icon} ${tip.title}</div>
                            <div style="font-size: 0.8rem; color: var(--text-secondary);">${tip.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="activities-card">
            <h2 class="chart-title">Atividades Recentes</h2>
            ${app.userData.history.length === 0 ? '<p>Nenhuma atividade registrada ainda.</p>' : 
                app.userData.history.slice(-3).reverse().map(h => `
                <div class="activity-item">
                    <div style="display: flex; align-items: center;">
                        <span class="activity-icon">🎵</span>
                        <div class="activity-content">
                            <div class="activity-title">${h.title}</div>
                            <div class="activity-time">${h.date}</div>
                        </div>
                    </div>
                    <div class="activity-score" style="color: ${h.score === 100 ? 'var(--accent)' : 'red'}">${h.score}%</div>
                </div>
            `).join('')}
        </div>
    `;
}


function renderExercisesPage() {
    const cardsHtml = app.exercises.map(ex => {
        const completed = app.userData.completedExercises[ex.id];
        const badge = ex.locked ? '🔒' : (completed ? '✅' : '7');
        
        return `
            <div class="exercise-card ${ex.locked ? 'locked' : ''}" data-id="${ex.id}">
                <div class="exercise-header">
                    <span class="exercise-icon">${ex.icon}</span>
                    <span class="exercise-badge">${badge}</span>
                </div>
                <h3 class="exercise-title">${ex.title}</h3>
                <p class="exercise-description">${ex.description}</p>
                <div class="exercise-footer">
                    <span class="exercise-meta">${ex.questionsCount} questões</span>
                    ${ex.locked ? '' : `<button class="start-button" data-id="${ex.id}">Começar</button>`}
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="page-header">
            <h1 class="page-title">Doses de Conhecimento</h1>
            <p class="page-subtitle">Complete cada dose com 100% para desbloquear a próxima.</p>
        </div>
        <div class="exercises-grid">
            ${cardsHtml}
        </div>
    `;
}


function renderQuizPage() {
    const ex = app.currentExercise;
    if (!ex) return '';

    if (app.showGabarito) {
        return renderGabarito();
    }

    const questionsHtml = ex.questions.map((q, idx) => `
        <div class="quiz-question-card">
            <p style="font-weight: 600; margin-bottom: 15px;">${idx + 1}. ${q.q}</p>
            <div class="options-grid">
                ${q.options.map(opt => `
                    <label>
                        <input type="radio" name="q${idx}" value="${opt}" required>
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');

    return `
        <div class="quiz-container">
            <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <h2 class="page-title" style="margin-bottom: 0;">${ex.title}</h2>
                <div style="background: var(--primary); color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">100% DE ACERTO NECESSÁRIO</div>
            </div>
            <form id="quiz-form">
                ${questionsHtml}
                <button type="submit" class="cta-button" style="width: 100%; padding: 1rem; font-size: 1.1rem; margin-top: 10px; box-shadow: var(--shadow-md);">Finalizar e Ver Gabarito</button>
            </form>
        </div>
    `;
}

function renderGabarito() {
    const ex = app.currentExercise;
    let correctCount = 0;
    
    const resultsHtml = ex.questions.map((q, idx) => {
        const userAns = app.userAnswers[idx];
        const isCorrect = userAns === q.a;
        if (isCorrect) correctCount++;
        
        return `
            <div style="padding: 15px; border-bottom: 1px solid var(--border-color); ${isCorrect ? 'background: #f0fff0;' : 'background: #fff0f0;'}">
                <p style="font-weight: 600;">${idx + 1}. ${q.q}</p>
                <p style="font-size: 0.9rem;">Sua resposta: <span style="color: ${isCorrect ? 'green' : 'red'}">${userAns || 'Não respondida'}</span></p>
                ${!isCorrect ? `<p style="font-size: 0.9rem; color: green; font-weight: 600;">Resposta correta: ${q.a}</p>` : ''}
            </div>
        `;
    }).join('');

    const score = (correctCount / ex.questions.length) * 100;
    const passed = score === 100;

   
    app.userData.totalTests++;
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    
    app.userData.history.push({
        title: ex.title,
        score: score,
        date: dateStr
    });

    if (passed) {
        app.userData.completedExercises[ex.id] = {
            score: 100,
            date: dateStr
        };
        // Atualizar performance chart data
        app.userData.performance[5] = 100; // Valor simplificado
    } else {
        app.userData.performance[5] = Math.max(app.userData.performance[5], score);
    }
    
    saveData();
    updateLockedStatus();

    return `
        <div class="gabarito-container" style="background: white; padding: 30px; border-radius: 10px; box-shadow: var(--shadow-md);">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 2rem; margin-bottom: 10px;">${passed ? '🎉 Parabéns!' : '😅 Quase lá!'}</h2>
                <div style="font-size: 3rem; font-weight: 900; color: ${passed ? 'var(--accent)' : 'red'}">${score}%</div>
                <p style="color: var(--text-secondary);">${passed ? 'Você desbloqueou o próximo nível!' : 'Você precisa de 100% para avançar.'}</p>
            </div>
            
            <div style="margin-bottom: 30px; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden;">
                <h3 style="padding: 15px; background: #f8f8f8; border-bottom: 1px solid var(--border-color);">Gabarito Detalhado</h3>
                ${resultsHtml}
            </div>

            <div style="display: flex; gap: 15px;">
                <button class="cta-button" id="btn-voltar-exercicios" style="flex: 1;">Voltar aos Exercícios</button>
                ${!passed ? `<button class="cta-button" id="btn-tentar-novamente" style="flex: 1; background: var(--text-secondary);">Tentar Novamente</button>` : ''}
            </div>
        </div>
    `;
}


function renderHistoryPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Seu Histórico</h1>
            <p class="page-subtitle">Veja seu desempenho ao longo do tempo.</p>
        </div>
        <div class="activities-card">
            ${app.userData.history.length === 0 ? '<p>Nenhuma atividade registrada.</p>' : 
                app.userData.history.slice().reverse().map(h => `
                <div class="activity-item">
                    <div style="display: flex; align-items: center;">
                        <span class="activity-icon">📋</span>
                        <div class="activity-content">
                            <div class="activity-title">${h.title}</div>
                            <div class="activity-time">${h.date}</div>
                        </div>
                    </div>
                    <div class="activity-score" style="color: ${h.score === 100 ? 'var(--accent)' : 'red'}">${h.score}%</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAchievementsPage() {
    const completedCount = Object.keys(app.userData.completedExercises).length;
    const has100 = Object.values(app.userData.completedExercises).some(e => e.score === 100);

    const achievementsStatus = {
        'first-step': app.userData.totalTests > 0,
        'apprentice': app.userData.totalTests >= 5,
        'perfection': has100,
        'master': completedCount === 7
    };

    return `
        <div class="page-header">
            <h1 class="page-title">Suas Conquistas</h1>
            <p class="page-subtitle">Badges e marcos da sua jornada.</p>
        </div>
        <div class="exercises-grid">
            ${app.achievements.map(a => `
                <div class="exercise-card ${achievementsStatus[a.id] ? '' : 'locked'}" style="text-align: center; align-items: center;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">${a.icon}</div>
                    <h3 class="exercise-title">${a.title}</h3>
                    <p class="exercise-description">${a.description}</p>
                    <div style="margin-top: 15px; font-weight: 700; color: ${achievementsStatus[a.id] ? 'var(--accent)' : 'var(--muted)'}">
                        ${achievementsStatus[a.id] ? 'DESBLOQUEADO' : 'BLOQUEADO'}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}


function setupEventListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.id === 'menu-toggle') {
            app.sidebarOpen = !app.sidebarOpen;
            renderApp();
            return;
        }

        if (e.target.id === 'sidebar-overlay') {
            app.sidebarOpen = false;
            renderApp();
            return;
        }

        const navItem = e.target.closest('.nav-item');
        if (navItem) {
            app.currentPage = navItem.dataset.page;
            app.showGabarito = false;
            app.sidebarOpen = false;
            renderApp();
            return;
        }

        const backBtn = e.target.closest('.back-button');
        if (backBtn) {
            app.currentPage = 'home';
            app.showGabarito = false;
            renderApp();
            return;
        }

        const startBtn = e.target.closest('.start-button');
        if (startBtn) {
            const id = startBtn.dataset.id;
            app.currentExercise = app.exercises.find(ex => ex.id === id);
            app.currentPage = 'quiz';
            app.showGabarito = false;
            renderApp();
            return;
        }

        if (e.target.id === 'btn-voltar-exercicios') {
            app.currentPage = 'exercises';
            app.showGabarito = false;
            renderApp();
            return;
        }

        if (e.target.id === 'btn-tentar-novamente') {
            app.showGabarito = false;
            renderApp();
            return;
        }
    });

    document.addEventListener('submit', (e) => {
        if (e.target.id === 'quiz-form') {
            e.preventDefault();
            const formData = new FormData(e.target);
            app.userAnswers = [];
            app.currentExercise.questions.forEach((_, idx) => {
                app.userAnswers.push(formData.get(`q${idx}`));
            });
            app.showGabarito = true;
            renderApp();
        }
    });
}


function renderCharts() {
    const perfCtx = document.getElementById('performanceChart');
    if (perfCtx) {
        new Chart(perfCtx, {
            type: 'line',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Atual'],
                datasets: [{
                    label: 'Desempenho %',
                    data: app.userData.performance,
                    borderColor: '#D2691E',
                    backgroundColor: 'rgba(210, 105, 30, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#D2691E',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }
}
