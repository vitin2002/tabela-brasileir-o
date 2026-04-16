let times = [
    { nome: "Palmeiras", p: 25, v: 8, e: 1, d: 1, sg: 11 },
    { nome: "São Paulo", p: 20, v: 6, e: 2, d: 2, sg: 8 },
    { nome: "Fluminense", p: 20, v: 6, e: 2, d: 2, sg: 6 },
    { nome: "Flamengo", p: 17, v: 5, e: 2, d: 2, sg: 7 },
    { nome: "Bahia", p: 17, v: 5, e: 2, d: 2, sg: 4 },
    { nome: "Athletico-PR", p: 16, v: 5, e: 1, d: 4, sg: 2 },
    { nome: "Coritiba", p: 15, v: 4, e: 3, d: 3, sg: 1 },
    { nome: "Atlético-MG", p: 14, v: 4, e: 2, d: 4, sg: 2 },
    { nome: "Bragantino", p: 14, v: 4, e: 2, d: 4, sg: 0 },
    { nome: "Botafogo", p: 12, v: 4, e: 0, d: 5, sg: -3 },
    { nome: "Grêmio", p: 12, v: 3, e: 3, d: 4, sg: 0 },
    { nome: "Vasco da Gama", p: 12, v: 3, e: 3, d: 4, sg: -1 },
    { nome: "Internacional", p: 12, v: 3, e: 3, d: 4, sg: -1 },
    { nome: "EC Vitória", p: 11, v: 3, e: 2, d: 4, sg: -5 },
    { nome: "Santos", p: 10, v: 2, e: 4, d: 4, sg: -3 },
    { nome: "Corinthians", p: 10, v: 2, e: 4, d: 4, sg: -3 },
    { nome: "Chapecoense", p: 8, v: 1, e: 5, d: 3, sg: -6 },
    { nome: "Remo", p: 7, v: 1, e: 4, d: 5, sg: -7 },
    { nome: "Cruzeiro", p: 7, v: 1, e: 4, d: 5, sg: -8 },
    { nome: "Mirassol", p: 6, v: 1, e: 3, d: 5, sg: -4 }
];

const todasRodadas = {
    11: [
        { casa: "EC Vitória", fora: "São Paulo" }, { casa: "Remo", fora: "Vasco da Gama" },
        { casa: "Fluminense", fora: "Flamengo" }, { casa: "Internacional", fora: "Grêmio" },
        { casa: "Santos", fora: "Atlético-MG" }, { casa: "Corinthians", fora: "Palmeiras" },
        { casa: "Cruzeiro", fora: "Bragantino" }, { casa: "Botafogo", fora: "Coritiba" },
        { casa: "Athletico-PR", fora: "Chapecoense" }, { casa: "Mirassol", fora: "Bahia" }
    ],
    12: [
        { casa: "Chapecoense", fora: "Botafogo" },
        { casa: "Vasco da Gama", fora: "São Paulo" },
        { casa: "EC Vitória", fora: "Corinthians" },
        { casa: "Cruzeiro", fora: "Grêmio" },
        { casa: "Internacional", fora: "Mirassol" },
        { casa: "Coritiba", fora: "Atlético-MG" },
        { casa: "Santos", fora: "Fluminense" },
        { casa: "Palmeiras", fora: "Athletico-PR" },
        { casa: "Bragantino", fora: "Remo" },
        { casa: "Flamengo", fora: "Bahia" }
    ],
    13: [
        { casa: "Botafogo", fora: "Internacional" },
        { casa: "Remo", fora: "Cruzeiro" },
        { casa: "Bahia", fora: "Santos" },
        { casa: "São Paulo", fora: "Mirassol" },
        { casa: "Grêmio", fora: "Coritiba" },
        { casa: "Corinthians", fora: "Vasco da Gama" },
        { casa: "Bragantino", fora: "Palmeiras" },
        { casa: "Athletico-PR", fora: "EC Vitória" },
        { casa: "Atlético-MG", fora: "Flamengo" },
        { casa: "Fluminense", fora: "Chapecoense" }
    ]
};

function popularSeletor() {
    const select = document.getElementById('select-rodada');
    if (!select) return;
    select.innerHTML = ""; // Limpa antes de popular
    for (let i = 11; i <= 13; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = `Rodada ${i}`;
        select.appendChild(opt);
    }
}

function atualizarTabela() {
    const corpo = document.getElementById('tabela-corpo');
    if (!corpo) return;
    corpo.innerHTML = "";
    // Ordenação: Pontos -> Vitórias -> Saldo de Gols
    times.sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);
    
    times.forEach((t, i) => {
        let zona = i < 4 ? "g4" : (i > 15 ? "z4" : "");
        corpo.innerHTML += `<tr class="${zona}">
            <td>${i+1}º</td>
            <td style="text-align:left">${t.nome}</td>
            <td><strong>${t.p}</strong></td>
            <td>${t.v}</td>
            <td>${t.e}</td>
            <td>${t.d}</td>
            <td>${t.sg}</td>
        </tr>`;
    });
}

function mudarRodada() {
    const select = document.getElementById('select-rodada');
    const lista = document.getElementById('lista-jogos');
    if (!select || !lista) return;

    const r = select.value;
    lista.innerHTML = "";
    todasRodadas[r].forEach((j, i) => {
        lista.innerHTML += `
            <div class="jogo-item">
                <span style="text-align:right; width: 120px; display: inline-block;">${j.casa}</span>
                <input type="number" id="gc-${i}" value="0" style="width: 40px"> x 
                <input type="number" id="gf-${i}" value="0" style="width: 40px">
                <span style="text-align:left; width: 120px; display: inline-block;">${j.fora}</span>
            </div>`;
    });
}

function processarRodada() {
    const r = document.getElementById('select-rodada').value;
    todasRodadas[r].forEach((j, i) => {
        const gc = parseInt(document.getElementById(`gc-${i}`).value) || 0;
        const gf = parseInt(document.getElementById(`gf-${i}`).value) || 0;
        const tC = times.find(t => t.nome === j.casa);
        const tF = times.find(t => t.nome === j.fora);

        if (tC && tF) {
            // Atualiza Saldo de Gols
            tC.sg += (gc - gf); 
            tF.sg += (gf - gc);
            
            if (gc > gf) { 
                tC.p += 3; tC.v += 1; tF.d += 1; 
            } else if (gf > gc) { 
                tF.p += 3; tF.v += 1; tC.d += 1; 
            } else { 
                tC.p += 1; tC.e += 1; tF.p += 1; tF.e += 1; 
            }
        }
    });
    atualizarTabela();
}

// Inicialização
window.onload = () => {
    popularSeletor();
    atualizarTabela();
    mudarRodada();
};