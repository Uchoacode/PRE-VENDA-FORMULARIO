document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("Oj8oQZ4ZpCWgCT-hm");

    const form = document.getElementById("preOrderForm");
    const shirtOptions = document.querySelectorAll(".shirt-option");
    const modeloInput = document.getElementById("modelo");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const pixConfirmCheckbox = document.getElementById("pixConfirm");
    const submitBtn = document.querySelector(".submit-btn");

    // Botão de copiar chave Pix
    const copiarPixBtn = document.getElementById("copiarPix");
    const chavePixEl = document.getElementById("chavePix");

    copiarPixBtn.addEventListener("click", function () {
        const chave = chavePixEl.textContent;
        navigator.clipboard.writeText(chave).then(() => {
            copiarPixBtn.textContent = "Copiado!";
            setTimeout(() => {
                copiarPixBtn.textContent = "Copiar";
            }, 2000);
        }).catch(err => {
            alert("Erro ao copiar: " + err);
        });
    });

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

        const nome = document.getElementById("nome").value.trim();
        const sobrenome = document.getElementById("sobrenome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const tamanho = document.getElementById("tamanho").value;
        const modelo = modeloInput.value;
        const bilhete = document.getElementById("bilhete").value.trim() || "Não informado";
        const comprovante = document.getElementById("comprovante").files[0];

        if (!nome || !sobrenome || !email || !telefone || !tamanho || !modelo || !comprovante) {
            alert("Por favor, preencha todos os campos obrigatórios e anexe o comprovante.");
            return;
        }

        const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
        if (!telefoneRegex.test(telefone)) {
            alert("Por favor, insira um telefone válido.");
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

        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("sobrenome", sobrenome);
        formData.append("email", email);
        formData.append("telefone", telefone);
        formData.append("tamanho", tamanho);
        formData.append("modelo", modelo);
        formData.append("bilhete", bilhete);
        formData.append("pixConfirm", "Sim");
        formData.append("data_cadastro", new Date().toLocaleString("pt-BR"));
        formData.append("comprovante", comprovante);

        emailjs.send("service_ranltqp", "template_nmknmqy", formData)
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

    // Validação de campos ao sair do foco
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

    // Efeito sombra no scroll
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        header.style.boxShadow = window.scrollY > 50 ? "0 2px 10px var(--color-shadow)" : "none";
    });
});
