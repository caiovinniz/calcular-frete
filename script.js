document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("frete-form");
    const cepOrigemInput = document.getElementById("cep-origem");
    const cepDestinoInput = document.getElementById("cep-destino");
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const larguraInput = document.getElementById("largura");
    const comprimentoInput = document.getElementById("comprimento");
    const formatoSelect = document.getElementById("formato");
    const btnCalcular = document.getElementById("btn-calcular");
    const btnLimpar = document.getElementById("btn-limpar");
    const resultadoDiv = document.getElementById("resultado");
    const resultsSection = document.getElementById("results-section");
    const spinner = btnCalcular.querySelector(".spinner");
    const btnText = btnCalcular.querySelector(".btn-text");

    // --- Máscara de CEP ---
    const cepMaskOptions = {
        mask: "00000-000",
    };
    const cepOrigemMask = IMask(cepOrigemInput, cepMaskOptions);
    const cepDestinoMask = IMask(cepDestinoInput, cepMaskOptions);

    // --- Validação --- 
    const requiredInputs = [
        cepOrigemInput,
        cepDestinoInput,
        pesoInput,
        alturaInput,
        larguraInput,
        comprimentoInput,
    ];

    function validateForm() {
        let isValid = true;
        requiredInputs.forEach(input => {
            if (!input.disabled && (!input.value || (input.pattern && !input.checkValidity()))) {
                isValid = false;
            }
            if (!input.disabled && input.type === "number" && parseFloat(input.value) <= 0) {
                 isValid = false;
            }
        });
        if (!cepOrigemMask.masked.isComplete || !cepDestinoMask.masked.isComplete) {
            isValid = false;
        }
        btnCalcular.disabled = !isValid;
    }

    requiredInputs.forEach(input => {
        input.addEventListener("input", validateForm);
        input.addEventListener("blur", () => {
            input.classList.add("touched");
            validateForm();
        });
    });

    // --- Ajuste para Formato Envelope ---
    function handleFormatoChange() {
        const isEnvelope = formatoSelect.value === 'envelope';
        alturaInput.disabled = isEnvelope;
        larguraInput.disabled = isEnvelope;
        comprimentoInput.disabled = isEnvelope;

        if (isEnvelope) {
            alturaInput.value = 1;
            larguraInput.value = 21;
            comprimentoInput.value = 30;
            alturaInput.classList.remove("touched");
            larguraInput.classList.remove("touched");
            comprimentoInput.classList.remove("touched");
        } 
        validateForm();
    }

    formatoSelect.addEventListener("change", handleFormatoChange);

    // --- Limpar Campos ---
    btnLimpar.addEventListener("click", () => {
        form.reset();
        cepOrigemMask.updateValue();
        cepDestinoMask.updateValue();
        requiredInputs.forEach(input => {
            input.classList.remove("touched");
            input.disabled = false;
        });
        handleFormatoChange();
        resultadoDiv.innerHTML = "";
        resultsSection.style.display = "none";
        validateForm();
    });

    // --- API Awesome CEP (Gratuita) para Coordenadas ---
    async function getCoordsFromCEP(cep) {
        const cepNumerico = cep.replace("-", "");
        const url = `https://cep.awesomeapi.com.br/json/${cepNumerico}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`CEP não encontrado ou API falhou: ${response.status}`);
            }
            const data = await response.json();
            if (data.lat && data.lng) {
                return { lat: parseFloat(data.lat), lon: parseFloat(data.lng) };
            } else {
                throw new Error("Coordenadas não encontradas para o CEP.");
            }
        } catch (error) {
            console.error(`Erro ao buscar coordenadas para CEP ${cep}:`, error);
            return null;
        }
    }

    // --- Cálculo de Distância Haversine (Linha Reta) ---
    function haversineDistance(coords1, coords2) {
        function toRad(x) {
            return x * Math.PI / 180;
        }
        const R = 6371;
        const dLat = toRad(coords2.lat - coords1.lat);
        const dLon = toRad(coords2.lon - coords1.lon);
        const lat1 = toRad(coords1.lat);
        const lat2 = toRad(coords2.lat);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    // --- Cálculo de Frete (Simulado com Distância Haversine e Novos Valores) ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (btnCalcular.disabled) return;

        spinner.style.display = "inline-block";
        btnText.style.display = "none";
        btnCalcular.disabled = true;
        btnLimpar.disabled = true;

        resultadoDiv.innerHTML = "";
        resultsSection.style.display = "none";

        const origemCEP = cepOrigemInput.value;
        const destinoCEP = cepDestinoInput.value;
        const pesoKg = parseFloat(pesoInput.value);
        const alturaCm = parseFloat(alturaInput.value);
        const larguraCm = parseFloat(larguraInput.value);
        const comprimentoCm = parseFloat(comprimentoInput.value);
        const formato = formatoSelect.value;

        const coordsOrigem = await getCoordsFromCEP(origemCEP);
        const coordsDestino = await getCoordsFromCEP(destinoCEP);

        spinner.style.display = "none";
        btnText.style.display = "inline-block";
        validateForm();
        btnLimpar.disabled = false;

        if (!coordsOrigem || !coordsDestino) {
            mostrarResultado("Não foi possível obter as coordenadas para um ou ambos os CEPs. Verifique os CEPs e tente novamente.", true);
            return;
        }

        const distanciaKm = haversineDistance(coordsOrigem, coordsDestino);
        let valorFinal;

        if (formato === 'envelope') {
            // Novos valores para envelope
            const taxaBaseEnvelope = 5.00;
            const custoKmEnvelope = 1.80; 
            valorFinal = taxaBaseEnvelope + (distanciaKm * custoKmEnvelope);
            // Garantir um valor mínimo (ex: taxa base + 1km)
            valorFinal = Math.max(taxaBaseEnvelope + custoKmEnvelope, valorFinal); 
        } else { // Caixa / Pacote
            // Novos valores para caixa/pacote
            const taxaBaseCaixa = 18.00; 
            const custoPorKmCaixa = 1.20; 
            let fatorPeso = 1 + (pesoKg / 10); // Mantendo a mesma lógica de fator
            let volumeCm3 = alturaCm * larguraCm * comprimentoCm;
            let fatorVolume = 1 + (volumeCm3 / 50000); // Mantendo a mesma lógica de fator
            
            fatorPeso = Math.max(1, Math.min(fatorPeso, 3)); // Limitando fatores
            fatorVolume = Math.max(1, Math.min(fatorVolume, 3));

            valorFinal = (taxaBaseCaixa + (distanciaKm * custoPorKmCaixa)) * fatorPeso * fatorVolume;
            // Garantir um valor mínimo para caixa
            valorFinal = Math.max(25.00, valorFinal); // Aumentei um pouco o mínimo da caixa
        }

        // Exibição simplificada
        mostrarResultado(
            `Origem: <strong>${origemCEP}</strong> | Destino: <strong>${destinoCEP}</strong><br>` +
            `Distância (linha reta): <strong>${distanciaKm.toFixed(1)} km</strong><br>` +
            (formato === 'envelope' ? `Formato: <strong>Envelope</strong> (Dimensões Padrão)<br>` : 
            `Peso: <strong>${pesoKg.toFixed(2)} kg</strong> | Dimensões: <strong>${alturaCm}x${larguraCm}x${comprimentoCm} cm</strong><br>` +
            `Formato: <strong>Caixa/Pacote</strong><br>`) +
            `<strong>Valor do Frete: R$ ${valorFinal.toFixed(2)}</strong>`
        );
    });

    function mostrarResultado(mensagem, isError = false) {
        resultadoDiv.innerHTML = mensagem;
        resultadoDiv.className = isError ? "error" : "";
        resultsSection.style.display = "block";
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    handleFormatoChange();
    validateForm();
});
