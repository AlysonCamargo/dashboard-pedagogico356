// Global Configuration for Chart.js
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.9)';
Chart.defaults.plugins.tooltip.titleColor = '#fff';
Chart.defaults.plugins.tooltip.bodyColor = '#cbd5e1';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.1)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;

const colors = {
    primary: '#3b82f6', // Blue
    primaryBg: 'rgba(59, 130, 246, 0.2)',
    purple: '#8b5cf6',
    purpleBg: 'rgba(139, 92, 246, 0.2)',
    emerald: '#10b981',
    emeraldBg: 'rgba(16, 185, 129, 0.2)',
    pink: '#ec4899',
    amber: '#f59e0b',
    cyan: '#06b6d4',
    slate: '#64748b'
};

const repeatedPalette = [colors.primary, colors.purple, colors.pink, colors.cyan, colors.emerald, colors.amber, colors.slate];

function getPaletteColors(length) {
    const res = [];
    for (let i = 0; i < length; i++) {
        res.push(repeatedPalette[i % repeatedPalette.length]);
    }
    return res;
}

// Common options for bar charts without grid
const barOptionsY = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { grid: { display: false, color: 'rgba(255,255,255,0.05)' }, border: { display: false }, beginAtZero: true },
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false } }
    }
};

const barOptionsX = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, beginAtZero: true },
        y: { grid: { display: false }, border: { display: false } }
    }
};

const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'right', labels: { boxWidth: 12, padding: 15, font: { size: 11 } } }
    },
    cutout: '65%' // Makes it a doughnut
};

let allRecords = [];
let chartInstances = {};

// Data processing
window.addEventListener('load', async () => {
    try {
        const response = await fetch('BookingsReportingData.tsv');
        if (!response.ok) throw new Error('Não foi possível carregar os dados.');
        const tsvText = await response.text();
        processData(tsvText);
    } catch (e) {
        console.error('Erro ao carregar TSV:', e);
    }
});

function median(values) {
    if (values.length === 0) return 0;
    values.sort((a, b) => a - b);
    var half = Math.floor(values.length / 2);
    if (values.length % 2) return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}

function processData(tsv) {
    const lines = tsv.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length < 2) return;

    const headers = lines[0].split('\t');
    const idxDate = headers.indexOf('Date Time');
    const idxCustomer = headers.indexOf('Customer Name');
    const idxDuration = headers.indexOf('Duration (mins.)');
    const idxCustom = headers.findIndex(h => h.trim() === 'Custom Fields');

    allRecords = [];

    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split('\t');
        if (cols.length < Math.max(idxDate, idxCustomer, idxDuration, idxCustom)) continue;

        const duration = parseInt(cols[idxDuration]) || 0;
        
        let weekday = null;
        let dateObjStr = cols[idxDate];
        if (dateObjStr) {
            const parts = dateObjStr.split(' ');
            if (parts.length > 0) {
                const dateParts = parts[0].split('/');
                if (dateParts.length === 3) {
                    const day = parseInt(dateParts[0]);
                    const month = parseInt(dateParts[1]) - 1;
                    const year = parseInt(dateParts[2]);
                    const dateObj = new Date(year, month, day);
                    if (!isNaN(dateObj.getTime())) {
                        weekday = dateObj.getDay();
                    }
                }
            }
        }

        const customer = cols[idxCustomer] ? cols[idxCustomer].trim() : '';
        
        let pub = null, comp = null, recurso = null, ativ = null;
        const customJSONStr = cols[idxCustom];
        if (customJSONStr && customJSONStr.trim() !== '') {
            try {
                const customObj = JSON.parse(customJSONStr);
                pub = customObj["Público"] || null;
                comp = customObj["Componente"] || null;
                recurso = customObj["PRINCIPAL RECURSO"] || null;
                ativ = customObj["TIPO DE ATIVIDADE"] || null;
            } catch (e) {
                console.warn('Invalid JSON in row', i, customJSONStr);
            }
        }

        allRecords.push({
            duration,
            weekday,
            professor: customer,
            turma: pub,
            componente: comp,
            recurso: recurso,
            atividade: ativ
        });
    }

    populateFilters();
    applyFilters();
}

function aggregateData(records) {
    let totalCargaMinutos = 0;
    let durations = [];
    const weekdays = [0, 0, 0, 0, 0, 0, 0];
    const docentes = {};
    const turmas = {};
    const componentes = {};
    const recursos = {};
    const atividades = {};

    let validRecords = 0;

    for (const rec of records) {
        validRecords++;
        totalCargaMinutos += rec.duration;
        durations.push(rec.duration);

        if (rec.weekday !== null) weekdays[rec.weekday]++;
        if (rec.professor !== '') docentes[rec.professor] = (docentes[rec.professor] || 0) + 1;
        if (rec.turma) turmas[rec.turma] = (turmas[rec.turma] || 0) + 1;
        if (rec.componente) componentes[rec.componente] = (componentes[rec.componente] || 0) + 1;
        if (rec.recurso) recursos[rec.recurso] = (recursos[rec.recurso] || 0) + 1;
        if (rec.atividade) atividades[rec.atividade] = (atividades[rec.atividade] || 0) + 1;
    }

    document.getElementById('kpi-agendamentos').textContent = validRecords;
    document.getElementById('kpi-carga').textContent = (totalCargaMinutos / 60).toFixed(2);
    document.getElementById('kpi-duracao').textContent = median(durations);

    renderCharts({ weekdays, docentes, turmas, componentes, recursos, atividades });
}

function populateFilters() {
    const profs = new Set(), turmas = new Set(), comps = new Set(), recs = new Set(), ativs = new Set();
    
    for (const rec of allRecords) {
        if (rec.professor) profs.add(rec.professor);
        if (rec.turma) turmas.add(rec.turma);
        if (rec.componente) comps.add(rec.componente);
        if (rec.recurso) recs.add(rec.recurso);
        if (rec.atividade) ativs.add(rec.atividade);
    }

    const fillSelect = (id, set) => {
        const select = document.getElementById(id);
        const sorted = Array.from(set).sort();
        const first = select.options[0];
        select.innerHTML = '';
        select.appendChild(first);
        sorted.forEach(val => {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = val;
            select.appendChild(opt);
        });
    };

    fillSelect('filter-professor', profs);
    fillSelect('filter-turma', turmas);
    fillSelect('filter-componente', comps);
    fillSelect('filter-recurso', recs);
    fillSelect('filter-atividade', ativs);
    
    const selects = ['filter-professor', 'filter-turma', 'filter-componente', 'filter-recurso', 'filter-atividade'];
    selects.forEach(id => {
        document.getElementById(id).addEventListener('change', applyFilters);
    });

    document.getElementById('btn-clear-filters').addEventListener('click', () => {
        selects.forEach(id => document.getElementById(id).value = '');
        applyFilters();
    });
}

function applyFilters() {
    const prof = document.getElementById('filter-professor').value;
    const turma = document.getElementById('filter-turma').value;
    const comp = document.getElementById('filter-componente').value;
    const rec = document.getElementById('filter-recurso').value;
    const ativ = document.getElementById('filter-atividade').value;

    const filtered = allRecords.filter(r => {
        if (prof && r.professor !== prof) return false;
        if (turma && r.turma !== turma) return false;
        if (comp && r.componente !== comp) return false;
        if (rec && r.recurso !== rec) return false;
        if (ativ && r.atividade !== ativ) return false;
        return true;
    });

    aggregateData(filtered);
}

function sortObject(obj) {
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function prepareScrollContainer(canvasId, itemsLength, isHorizontal) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const parent = canvas.parentElement;
    
    let inner = parent.querySelector('.chart-inner');
    if (!inner) {
        inner = document.createElement('div');
        inner.className = 'chart-inner';
        parent.appendChild(inner);
        inner.appendChild(canvas);
    }
    
    if (isHorizontal && itemsLength > 4) {
        parent.style.overflowY = 'auto';
        const reqHeight = Math.max(250, itemsLength * 35);
        inner.style.position = 'relative';
        inner.style.height = reqHeight + 'px';
        inner.style.width = '100%';
    } else {
        parent.style.overflowY = 'hidden';
        inner.style.position = 'relative';
        inner.style.height = '100%';
        inner.style.width = '100%';
    }
}

function renderSmartChart(canvasId, objData, fallbackType, maxForFallback) {
    const dataArr = sortObject(objData);
    const labels = dataArr.map(d => d[0]);
    const values = dataArr.map(d => d[1]);
    
    let chartType = 'bar';
    let chartOptions = barOptionsX; 
    let isHorizontal = true;

    if (labels.length <= maxForFallback) {
        if (fallbackType === 'pie' || fallbackType === 'doughnut') {
            chartType = fallbackType;
            chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { padding: 12, boxWidth: 12, font: {size: 11, family: "'Inter', sans-serif"} } }
                },
                cutout: fallbackType === 'doughnut' ? '65%' : '0%'
            };
            isHorizontal = false;
        } else if (fallbackType === 'vertical') {
            chartType = 'bar';
            chartOptions = barOptionsY;
            isHorizontal = false;
        }
    }

    prepareScrollContainer(canvasId, labels.length, isHorizontal);

    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(document.getElementById(canvasId), {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Agendamentos',
                data: values,
                backgroundColor: getPaletteColors(labels.length),
                borderWidth: chartType === 'pie' || chartType === 'doughnut' ? 0 : undefined,
                borderRadius: chartType === 'bar' ? (isHorizontal ? 4 : 6) : 0,
                hoverOffset: chartType === 'pie' || chartType === 'doughnut' ? 6 : 0
            }]
        },
        options: chartOptions
    });
}

function renderCharts(data) {
    // 1. Weekday - Sem Scroll, sempre Vertical
    const wdLabels = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    prepareScrollContainer('chartWeekday', 5, false);
    
    if (chartInstances['chartWeekday']) {
        chartInstances['chartWeekday'].destroy();
    }
    
    chartInstances['chartWeekday'] = new Chart(document.getElementById('chartWeekday'), {
        type: 'bar',
        data: {
            labels: wdLabels.slice(1, 6),
            datasets: [{
                label: 'Agendamentos',
                data: data.weekdays.slice(1, 6),
                backgroundColor: [colors.primary, colors.cyan, colors.emerald, colors.purple, colors.pink],
                borderWidth: 0,
                borderRadius: 6
            }]
        },
        options: barOptionsY
    });

    // Gráficos Inteligentes (Decidem ser Barras com Scroll se houverem muitos itens)
    renderSmartChart('chartDocentes', data.docentes, 'horizontal', 0); // Sempre horizontal devido aos nomes longos
    renderSmartChart('chartPublico', data.turmas, 'pie', 6);
    renderSmartChart('chartComponentes', data.componentes, 'doughnut', 5);
    renderSmartChart('chartRecursos', data.recursos, 'horizontal', 0); // Geralmente melhor horizontal
    renderSmartChart('chartAtividades', data.atividades, 'doughnut', 4); // Doughnut apenas se for pouco
}
