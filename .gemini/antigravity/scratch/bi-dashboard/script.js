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
    primary:   '#3b82f6', // Blue
    primaryBg: 'rgba(59, 130, 246, 0.2)',
    purple:    '#8b5cf6',
    purpleBg:  'rgba(139, 92, 246, 0.2)',
    emerald:   '#10b981',
    emeraldBg: 'rgba(16, 185, 129, 0.2)',
    pink:      '#ec4899',
    amber:     '#f59e0b',
    cyan:      '#06b6d4',
    slate:     '#64748b'
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
        legend: { position: 'right', labels: { boxWidth: 12, padding: 15, font: {size: 11} } }
    },
    cutout: '65%' // Makes it a doughnut
};

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
    values.sort((a,b) => a - b);
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
     // Search for Custom Fields, trimming as there might be a leading space
    const idxCustom = headers.findIndex(h => h.trim() === 'Custom Fields');

    let totalCargaMinutos = 0;
    let durations = [];
    
    // Aggregators
    const weekdays = [0,0,0,0,0,0,0]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
    const docentes = {};
    const turmas = {};
    const componentes = {};
    const recursos = {};
    const atividades = {};
    
    let validRecords = 0;

    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split('\t');
        if (cols.length < Math.max(idxDate, idxCustomer, idxDuration, idxCustom)) continue;
        
        // Duration
        const duration = parseInt(cols[idxDuration]) || 0;
        
        // Count all rows as records even if duration 0
        validRecords++;
        
        totalCargaMinutos += duration;
        durations.push(duration);
        
        // Date Time (DD/MM/YYYY HH:mm) -> To extract weekday
        const dateStr = cols[idxDate];
        if (dateStr) {
            const parts = dateStr.split(' ');
            if (parts.length > 0) {
                const dateParts = parts[0].split('/');
                if (dateParts.length === 3) {
                    const day = parseInt(dateParts[0]);
                    const month = parseInt(dateParts[1]) - 1;
                    const year = parseInt(dateParts[2]);
                    const dateObj = new Date(year, month, day);
                    if (!isNaN(dateObj.getTime())) {
                        weekdays[dateObj.getDay()]++;
                    }
                }
            }
        }
        
        // Docentes
        const customer = cols[idxCustomer];
        if (customer && customer.trim() !== '') {
            docentes[customer] = (docentes[customer] || 0) + 1;
        }

        // Custom Fields
        const customJSONStr = cols[idxCustom];
        if (customJSONStr && customJSONStr.trim() !== '') {
            try {
                const customObj = JSON.parse(customJSONStr);
                
                const pub = customObj["Público"];
                if (pub) turmas[pub] = (turmas[pub] || 0) + 1;
                
                const comp = customObj["Componente"];
                if (comp) componentes[comp] = (componentes[comp] || 0) + 1;
                
                const recurso = customObj["PRINCIPAL RECURSO"];
                if (recurso) recursos[recurso] = (recursos[recurso] || 0) + 1;
                
                const ativ = customObj["TIPO DE ATIVIDADE"];
                if (ativ) atividades[ativ] = (atividades[ativ] || 0) + 1;
            } catch (e) {
                // Ignore parse errors for specific rows
                console.warn('Invalid JSON in row', i, customJSONStr);
            }
        }
    }

    // Update KPIs
    document.getElementById('kpi-agendamentos').textContent = validRecords;
    document.getElementById('kpi-carga').textContent = (totalCargaMinutos / 60).toFixed(2);
    document.getElementById('kpi-duracao').textContent = median(durations);

    // Render Charts
    renderCharts({ weekdays, docentes, turmas, componentes, recursos, atividades });
}

function sortObject(obj) {
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function prepareScrollContainer(canvasId, itemsLength) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const parent = canvas.parentElement;
    parent.style.overflowY = 'auto';
    
    let inner = parent.querySelector('.chart-inner');
    if (!inner) {
        inner = document.createElement('div');
        inner.className = 'chart-inner';
        parent.appendChild(inner);
        inner.appendChild(canvas);
    }
    
    const reqHeight = Math.max(250, itemsLength * 35);
    inner.style.position = 'relative';
    inner.style.height = reqHeight + 'px';
    inner.style.width = '100%';
}

function renderCharts(data) {
    // 1. Weekday
    const wdLabels = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    new Chart(document.getElementById('chartWeekday'), {
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

    // 2. Docentes
    const docArr = sortObject(data.docentes);
    prepareScrollContainer('chartDocentes', docArr.length);
    new Chart(document.getElementById('chartDocentes'), {
        type: 'bar',
        data: {
            labels: docArr.map(d => d[0]),
            datasets: [{
                label: 'Agendamentos',
                data: docArr.map(d => d[1]),
                backgroundColor: getPaletteColors(docArr.length),
                borderRadius: 4
            }]
        },
        options: barOptionsX
    });

    // 3. Turmas (Público)
    const turmasArr = sortObject(data.turmas);
    prepareScrollContainer('chartPublico', turmasArr.length);
    new Chart(document.getElementById('chartPublico'), {
        type: 'bar',
        data: {
            labels: turmasArr.map(d => d[0]),
            datasets: [{
                label: 'Agendamentos',
                data: turmasArr.map(d => d[1]),
                backgroundColor: getPaletteColors(turmasArr.length),
                borderRadius: 4
            }]
        },
        options: barOptionsX
    });

    // 4. Componentes
    const compArr = sortObject(data.componentes);
    prepareScrollContainer('chartComponentes', compArr.length);
    new Chart(document.getElementById('chartComponentes'), {
        type: 'bar',
        data: {
            labels: compArr.map(d => d[0]),
            datasets: [{
                label: 'Agendamentos',
                data: compArr.map(d => d[1]),
                backgroundColor: getPaletteColors(compArr.length),
                borderRadius: 4
            }]
        },
        options: barOptionsX
    });

    // 5. Recursos
    const recArr = sortObject(data.recursos);
    prepareScrollContainer('chartRecursos', recArr.length);
    new Chart(document.getElementById('chartRecursos'), {
        type: 'bar',
        data: {
            labels: recArr.map(d => d[0]),
            datasets: [{
                label: 'Agendamentos',
                data: recArr.map(d => d[1]),
                backgroundColor: getPaletteColors(recArr.length),
                borderRadius: 4
            }]
        },
        options: barOptionsX
    });

    // 6. Atividades
    const ativArr = sortObject(data.atividades);
    prepareScrollContainer('chartAtividades', ativArr.length);
    new Chart(document.getElementById('chartAtividades'), {
        type: 'bar',
        data: {
            labels: ativArr.map(d => d[0]),
            datasets: [{
                label: 'Agendamentos',
                data: ativArr.map(d => d[1]),
                backgroundColor: getPaletteColors(ativArr.length),
                borderRadius: 4
            }]
        },
        options: barOptionsX
    });
}
