document.addEventListener("DOMContentLoaded", function() {
    // Inicializar EmailJS
    emailjs.init("Oj8oQZ4ZpCWgCT-hm"); // Seu USER ID do EmailJS

    // Elementos do DOM
    const form = document.getElementById("preOrderForm");
    const shirtOptions = document.querySelectorAll(".shirt-option");
    const modeloInput = document.getElementById("modelo");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const pixConfirmCheckbox = document.getElementById("pixConfirm");
    const submitBtn = document.querySelector(".submit-btn");

    // Seleção do modelo da camisa
    shirtOptions.forEach(option => {
        option.addEventListener("click", function () {
            shirtOptions.forEach(opt => opt.classList.remove("selected"));
            this.classList.add("selected");
            modeloInput.value = this.getAttribute("data-color");
        });
    });

    // Envio do formulário
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Coleta dos valores
        const nome = document.getElementById("nome").value.trim();
        const sobrenome = document.getElementById("sobrenome").value.trim();
        const email = document.getElementById("email").value.trim();
        const tamanho = document.getElementById("tamanho").value;
        const modelo = modeloInput.value;
        const bilhete = document.getElementById("bilhete").value.trim() || "Não informado";

        // Validação
        if (!nome || !sobrenome || !email || !tamanho || !modelo) {
            alert("Por favor, preencha todos os campos obrigatórios e selecione um modelo de camisa.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        if (!pixConfirmCheckbox.checked) {
            alert("Por favor, confirme que você realizou o pagamento via Pix.");
            return;
        }

        // Envio
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        const templateParams = {
            nome,
            sobrenome,
            email,
            tamanho,
            modelo,
            bilhete,
            pixConfirm: "Sim",
            data_cadastro: new Date().toLocaleString("pt-BR")
        };

        emailjs.send("service_ranltqp", "template_nmknmqy", templateParams)
            .then(response => {
                console.log("Email enviado com sucesso!", response.status, response.text);
                showThankYouMessage();
            })
            .catch(error => {
                console.error("Erro ao enviar email:", error);
                alert("Erro ao enviar cadastro. Tente novamente.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Finalizar Cadastro";
            });
    });

    // Mensagem de agradecimento
    function showThankYouMessage() {
        thankYouMessage.classList.remove("hidden");
        setTimeout(hideThankYouMessage, 5000);
        thankYouMessage.addEventListener("click", e => {
            if (e.target === thankYouMessage) hideThankYouMessage();
        });
    }

    function hideThankYouMessage() {
        thankYouMessage.classList.add("hidden");
        form.reset();
        shirtOptions.forEach(opt => opt.classList.remove("selected"));
        modeloInput.value = "";
        pixConfirmCheckbox.checked = false;
    }

    // Validação em tempo real
    const inputs = form.querySelectorAll("input[required], select[required]");
    inputs.forEach(input => {
        input.addEventListener("blur", () => validateField(input));
    });

    function validateField(field) {
        const value = field.value.trim();
        const isEmail = field.type === "email";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if ((isEmail && !emailRegex.test(value)) || (!isEmail && !value)) {
            field.style.borderColor = "#ff4444";
            return false;
        }

        field.style.borderColor = "var(--color-border)";
        return true;
    }

    // Scroll visual no header
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        header.style.boxShadow = window.scrollY > 50 ? "0 2px 10px var(--color-shadow)" : "none";
    });
});
