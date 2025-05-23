console.log("--- script.js INICIADO ---"); // Log inicial absoluto

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado. Iniciando script..."); // Log inicial

    // Frete Form Elements
    const freteForm = document.getElementById("frete-form");
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

    // Lead Capture Form Elements
    const leadCaptureSection = document.getElementById("lead-capture-section");
    const leadForm = document.getElementById("lead-form");
    const leadNomeInput = document.getElementById("lead-nome");
    const leadCelularInput = document.getElementById("lead-celular");
    const leadConsentCheckbox = document.getElementById("lead-consent");
    const btnEnviarLead = document.getElementById("btn-enviar-lead");
    const leadStatusDiv = document.getElementById("lead-status");

    // Hidden fields in lead form
    const leadCepOrigemHidden = document.getElementById("lead-cep-origem");
    const leadCepDestinoHidden = document.getElementById("lead-cep-destino");
    const leadFormatoHidden = document.getElementById("lead-formato");
    const leadPesoHidden = document.getElementById("lead-peso");
    const leadDimensoesHidden = document.getElementById("lead-dimensoes");
    const leadValorHidden = document.getElementById("lead-valor");

    // Verificação inicial dos elementos
    if (!freteForm || !leadCaptureSection || !resultsSection) {
        console.error("Erro crítico: Um dos elementos principais (freteForm, leadCaptureSection, resultsSection) não foi encontrado!");
        return; // Impede a execução do resto do script se elementos essenciais faltarem
    }
    console.log("Elementos principais encontrados.");

    // --- Máscaras --- 
    try {
        // Verifica se IMask está definido ANTES de usá-lo
        if (typeof IMask === 'undefined') {
            throw new Error("Biblioteca IMask não carregada ou não encontrada.");
        }
        const cepMaskOptions = { mask: "00000-000" };
        const celularMaskOptions = { mask: "(00) 00000-0000" };
        const cepOrigemMask = IMask(cepOrigemInput, cepMaskOptions);
        const cepDestinoMask = IMask(cepDestinoInput, cepMaskOptions);
        const leadCelularMask = IMask(leadCelularInput, celularMaskOptions);
        console.log("Máscaras IMask aplicadas.");
    } catch (error) {
        console.error("Erro ao aplicar máscaras IMask:", error);
        // Não impede o resto do script de rodar, mas loga o erro
    }

    // --- Validação Frete Form --- 
    const freteRequiredInputs = [
        cepOrigemInput, cepDestinoInput, pesoInput, 
        alturaInput, larguraInput, comprimentoInput
    ];

    function validateFreteForm() {
        let isValid = true;
        freteRequiredInputs.forEach(input => {
            if (!input.disabled && (!input.value || (input.pattern && !input.checkValidity()))) {
                isValid = false;
            }
            if (!input.disabled && input.type === "number" && parseFloat(input.value) <= 0) {
                 isValid = false;
            }
        });
        // Verifica se as máscaras existem e foram inicializadas antes de acessar 'masked'
        if (typeof cepOrigemMask !== 'undefined' && cepOrigemMask.masked && !cepOrigemMask.masked.isComplete) {
            isValid = false;
        }
         if (typeof cepDestinoMask !== 'undefined' && cepDestinoMask.masked && !cepDestinoMask.masked.isComplete) {
            isValid = false;
        }
        // Verifica se btnCalcular existe antes de modificar disabled
        if(btnCalcular) btnCalcular.disabled = !isValid;
    }

    freteRequiredInputs.forEach(input => {
        // Verifica se input existe
        if(input) {
            input.addEventListener("input", validateFreteForm);
            input.addEventListener("blur", () => { input.classList.add("touched"); validateFreteForm(); });
        }
    });

    // --- Ajuste para Formato Envelope ---
    function handleFormatoChange() {
        // Verifica se os elementos existem
        if (!formatoSelect || !alturaInput || !larguraInput || !comprimentoInput) {
            console.error("Erro: Elementos do formulário de formato/dimensão não encontrados.");
            return;
        }
        const isEnvelope = formatoSelect.value === 'envelope';
        alturaInput.disabled = isEnvelope;
        larguraInput.disabled = isEnvelope;
        comprimentoInput.disabled = isEnvelope;
        if (isEnvelope) {
            alturaInput.value = 1; larguraInput.value = 21; comprimentoInput.value = 30;
            alturaInput.classList.remove("touched"); larguraInput.classList.remove("touched"); comprimentoInput.classList.remove("touched");
        }
        validateFreteForm();
    }
    // Verifica se formatoSelect existe
    if(formatoSelect) formatoSelect.addEventListener("change", handleFormatoChange);

    // --- Limpar Campos Frete ---
    // Verifica se btnLimpar existe
    if(btnLimpar) btnLimpar.addEventListener("click", () => {
        if(freteForm) freteForm.reset();
        if (typeof cepOrigemMask !== 'undefined') cepOrigemMask.updateValue(); 
        if (typeof cepDestinoMask !== 'undefined') cepDestinoMask.updateValue();
        freteRequiredInputs.forEach(input => { if(input) { input.classList.remove("touched"); input.disabled = false; } });
        handleFormatoChange();
        if(resultadoDiv) resultadoDiv.innerHTML = "";
        if(resultsSection) resultsSection.style.display = "none";
        if(leadCaptureSection) leadCaptureSection.style.display = "none"; // Hide lead form too
        if(leadForm) leadForm.reset(); // Reset lead form
        if (typeof leadCelularMask !== 'undefined') leadCelularMask.updateValue(); // Limpa máscara do lead
        if(leadStatusDiv) leadStatusDiv.innerHTML = "";
        validateFreteForm();
        console.log("Campos limpos.");
    });

    // --- API Awesome CEP (Gratuita) para Coordenadas ---
    async function getCoordsFromCEP(cep) {
        const cepNumerico = cep.replace("-", "");
        const url = https://cep.awesomeapi.com.br/json/${cepNumerico};
        console.log(Buscando coordenadas para CEP: ${cepNumerico});
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(CEP não encontrado ou API falhou: ${response.status});
            const data = await response.json();
            if (data.lat && data.lng) {
                console.log(Coordenadas encontradas para ${cepNumerico}:, data.lat, data.lng);
                return { lat: parseFloat(data.lat), lon: parseFloat(data.lng) };
            } else {
                 throw new Error("Coordenadas não encontradas na resposta da API.");
            }
        } catch (error) {
            console.error(Erro ao buscar coordenadas para CEP ${cep}:, error);
            return null;
        }
    }

    // --- Cálculo de Distância Haversine (Linha Reta) ---
    function haversineDistance(coords1, coords2) {
        function toRad(x) { return x * Math.PI / 180; }
        const R = 6371;
        const dLat = toRad(coords2.lat - coords1.lat);
        const dLon = toRad(coords2.lon - coords1.lon);
        const lat1 = toRad(coords1.lat); const lat2 = toRad(coords2.lat);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        console.log(Distância Haversine calculada: ${distance.toFixed(1)} km);
        return distance;
    }

    // --- Cálculo de Frete (Simulado com Distância Haversine e Novos Valores) ---
    // Verifica se freteForm existe
    if(freteForm) freteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Formulário de frete submetido.");
        if (btnCalcular && btnCalcular.disabled) {
            console.log("Cálculo bloqueado, botão desabilitado.");
            return;
        }

        if(spinner) spinner.style.display = "inline-block"; 
        if(btnText) btnText.style.display = "none";
        if(btnCalcular) btnCalcular.disabled = true; 
        if(btnLimpar) btnLimpar.disabled = true;
        if(resultadoDiv) resultadoDiv.innerHTML = ""; 
        if(resultsSection) resultsSection.style.display = "none";
        if(leadCaptureSection) leadCaptureSection.style.display = "none"; // Hide lead form initially
        console.log("Iniciando cálculo de frete...");

        const origemCEP = cepOrigemInput ? cepOrigemInput.value : '';
        const destinoCEP = cepDestinoInput ? cepDestinoInput.value : '';
        const pesoKg = pesoInput ? parseFloat(pesoInput.value) : 0;
        const alturaCm = alturaInput ? parseFloat(alturaInput.value) : 0;
        const larguraCm = larguraInput ? parseFloat(larguraInput.value) : 0;
        const comprimentoCm = comprimentoInput ? parseFloat(comprimentoInput.value) : 0;
        const formato = formatoSelect ? formatoSelect.value : 'caixa';
        const dimensoesStr = ${alturaCm}x${larguraCm}x${comprimentoCm};

        const coordsOrigem = await getCoordsFromCEP(origemCEP);
        const coordsDestino = await getCoordsFromCEP(destinoCEP);

        if(spinner) spinner.style.display = "none"; 
        if(btnText) btnText.style.display = "inline-block";
        validateFreteForm(); 
        if(btnLimpar) btnLimpar.disabled = false;

        if (!coordsOrigem || !coordsDestino) {
            console.error("Falha ao obter coordenadas. Exibindo erro.");
            mostrarResultado("Não foi possível obter as coordenadas para um ou ambos os CEPs. Verifique os CEPs e tente novamente.", true);
            return;
        }
        console.log("Coordenadas obtidas com sucesso.");

        const distanciaKm = haversineDistance(coordsOrigem, coordsDestino);
        let valorFinal;

        if (formato === 'envelope') {
            const taxaBaseEnvelope = 5.00; const custoKmEnvelope = 1.80;
            valorFinal = taxaBaseEnvelope + (distanciaKm * custoKmEnvelope);
            valorFinal = Math.max(taxaBaseEnvelope + custoKmEnvelope, valorFinal); // Garante valor mínimo
            console.log(Cálculo para envelope: R$ ${valorFinal.toFixed(2)});
        } else { // Caixa / Pacote
            const taxaBaseCaixa = 18.00; const custoPorKmCaixa = 1.20;
            let fatorPeso = 1 + (pesoKg / 10);
            let volumeCm3 = alturaCm * larguraCm * comprimentoCm;
            let fatorVolume = 1 + (volumeCm3 / 50000);
            fatorPeso = Math.max(1, Math.min(fatorPeso, 3)); // Limita fator
            fatorVolume = Math.max(1, Math.min(fatorVolume, 3)); // Limita fator
            valorFinal = (taxaBaseCaixa + (distanciaKm * custoPorKmCaixa)) * fatorPeso * fatorVolume;
            valorFinal = Math.max(25.00, valorFinal); // Garante valor mínimo para caixa
            console.log(Cálculo para caixa/pacote: R$ ${valorFinal.toFixed(2)} (fatorPeso: ${fatorPeso.toFixed(2)}, fatorVolume: ${fatorVolume.toFixed(2)}));
        }

        const valorFinalStr = valorFinal.toFixed(2);

        // Mostrar resultado
        console.log("Chamando mostrarResultado...");
        mostrarResultado(
            Origem: <strong>${origemCEP}</strong> | Destino: <strong>${destinoCEP}</strong><br> +
            Distância (linha reta): <strong>${distanciaKm.toFixed(1)} km</strong><br> +
            (formato === 'envelope' ? Formato: <strong>Envelope</strong> (Dimensões Padrão)<br> :
            Peso: <strong>${pesoKg.toFixed(2)} kg</strong> | Dimensões: <strong>${dimensoesStr} cm</strong><br> +
            Formato: <strong>Caixa/Pacote</strong><br>) +
            <strong>Valor do Frete: R$ ${valorFinalStr}</strong>
        );

        // Preencher campos ocultos do lead form
        try {
            if(leadCepOrigemHidden) leadCepOrigemHidden.value = origemCEP;
            if(leadCepDestinoHidden) leadCepDestinoHidden.value = destinoCEP;
            if(leadFormatoHidden) leadFormatoHidden.value = formato;
            if(leadPesoHidden) leadPesoHidden.value = pesoKg.toFixed(2);
            if(leadDimensoesHidden) leadDimensoesHidden.value = dimensoesStr;
            if(leadValorHidden) leadValorHidden.value = valorFinalStr;
            console.log("Campos ocultos do lead preenchidos.");
        } catch (error) {
            console.error("Erro ao preencher campos ocultos do lead:", error);
        }

        // Mostrar formulário de lead
        console.log("Tentando exibir leadCaptureSection...");
        if (leadCaptureSection) {
             leadCaptureSection.style.display = "block";
             console.log("leadCaptureSection.style.display definido como 'block'.");
             // Adiciona um pequeno delay antes de rolar, pode ajudar em alguns navegadores
             setTimeout(() => {
                 leadCaptureSection.scrollIntoView({ behavior: "smooth", block: "start" });
                 console.log("scrollIntoView chamado para leadCaptureSection.");
             }, 100);
        } else {
             console.error("Elemento leadCaptureSection não encontrado no momento de exibir!");
        }
    });

    function mostrarResultado(mensagem, isError = false) {
        console.log(Função mostrarResultado chamada. isError: ${isError});
        if(resultadoDiv) {
            resultadoDiv.innerHTML = mensagem;
            resultadoDiv.className = isError ? "error" : "";
        }
        if(resultsSection) {
            resultsSection.style.display = "block";
            console.log("Resultado exibido, resultsSection.style.display definido como 'block'.");
            // A rolagem agora é feita após exibir o lead form, se não for erro
            if (isError) {
                console.log("Rolando para a seção de resultados (erro).");
                resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }

    // --- Submissão do Formulário de Lead (usando Formspree) ---
    // Verifica se leadForm existe
    if(leadForm) leadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Formulário de lead submetido.");
        if(leadStatusDiv) {
            leadStatusDiv.innerHTML = "Enviando...";
            leadStatusDiv.className = "lead-status";
        }
        if(btnEnviarLead) btnEnviarLead.disabled = true;

        const formData = new FormData(leadForm);
        const formAction = leadForm.action; // Get action URL from HTML
        console.log(Enviando dados para: ${formAction});

        try {
            const response = await fetch(formAction, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                console.log("Envio do lead bem-sucedido.");
                if(leadStatusDiv) {
                    leadStatusDiv.innerHTML = "Obrigado! Entraremos em contato em breve.";
                    leadStatusDiv.classList.add("success");
                }
                leadForm.reset(); // Limpa o formulário de lead
                if (typeof leadCelularMask !== 'undefined') leadCelularMask.updateValue(); // Limpa máscara
            } else {
                console.error("Erro na resposta do Formspree:", response.status, response.statusText);
                response.json().then(data => {
                    console.error("Detalhes do erro Formspree:", data);
                    if(leadStatusDiv) {
                        if (Object.hasOwn(data, 'errors')) {
                            leadStatusDiv.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            leadStatusDiv.innerHTML = "Oops! Houve um problema ao enviar seus dados (servidor).";
                        }
                        leadStatusDiv.classList.add("error");
                    }
                }).catch(jsonError => {
                    console.error("Erro ao processar JSON de erro do Formspree:", jsonError);
                    if(leadStatusDiv) {
                        leadStatusDiv.innerHTML = "Oops! Houve um problema ao enviar seus dados (resposta inválida).";
                        leadStatusDiv.classList.add("error");
                    }
                });
            }
        } catch (error) {
            console.error("Erro de rede ao enviar lead form:", error);
            if(leadStatusDiv) {
                leadStatusDiv.innerHTML = "Oops! Houve um problema de rede ao enviar seus dados.";
                leadStatusDiv.classList.add("error");
            }
        }

        if(btnEnviarLead) btnEnviarLead.disabled = false;
    });

    // Validação inicial
    console.log("Executando validação inicial e handleFormatoChange...");
    handleFormatoChange();
    validateFreteForm();
    console.log("Script carregado e pronto.");
});
