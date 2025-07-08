document.addEventListener("DOMContentLoaded", function () {
    // Inicializa EmailJS com seu User ID
    emailjs.init("Oj8oQZ4ZpCWgCT-hm"); // substitua se necessário
  
    const form = document.getElementById("preOrderForm");
    const shirtOptions = document.querySelectorAll(".shirt-option");
    const modeloInput = document.getElementById("modelo");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const pixConfirmCheckbox = document.getElementById("pixConfirm");
    const submitBtn = document.querySelector(".submit-btn");
  
    // Copiar chave Pix
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
  
    // Selecionar modelo da camisa
    shirtOptions.forEach(option => {
      option.addEventListener("click", function () {
        shirtOptions.forEach(opt => opt.classList.remove("selected"));
        this.classList.add("selected");
        modeloInput.value = this.getAttribute("data-color");
      });
    });
  
    // Enviar formulário
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nome = document.getElementById("nome").value.trim();
      const sobrenome = document.getElementById("sobrenome").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const tamanho = document.getElementById("tamanho").value;
      const modelo = modeloInput.value;
      const bilhete = document.getElementById("bilhete").value.trim() || "Não informado";
  
      // Validações mínimas
      if (!nome || !sobrenome || !email || !telefone || !tamanho || !modelo) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!telefoneRegex.test(telefone)) {
        alert("Por favor, insira um telefone válido.");
        return;
      }
  
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
      }
  
      if (!pixConfirmCheckbox.checked) {
        alert("Por favor, confirme que você realizou o pagamento via Pix.");
        return;
      }
  
      // Desabilita botão enquanto envia
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
  
      // Parâmetros para o EmailJS
      const templateParams = {
        nome,
        sobrenome,
        email,
        telefone,
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
          alert("Erro ao enviar. Tente novamente.");
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Finalizar Cadastro";
        });
    });
  
    // Exibir mensagem de agradecimento
    function showThankYouMessage() {
      thankYouMessage.classList.remove("hidden");
      setTimeout(hideThankYouMessage, 5000);
  
      thankYouMessage.addEventListener("click", e => {
        if (e.target === thankYouMessage) hideThankYouMessage();
      });
    }
  
    // Ocultar mensagem e resetar
    function hideThankYouMessage() {
      thankYouMessage.classList.add("hidden");
      form.reset();
      shirtOptions.forEach(opt => opt.classList.remove("selected"));
      modeloInput.value = "";
      pixConfirmCheckbox.checked = false;
    }
  
    // Validação visual ao sair do campo
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
  
    // Sombra no scroll do header
    window.addEventListener("scroll", function () {
      const header = document.querySelector(".header");
      header.style.boxShadow = window.scrollY > 50 ? "0 2px 10px var(--color-shadow)" : "none";
    });
  });
  const nomes = [
    "João - BA",
    "Amanda - BA",
    "Lucas - BA",
    "Mariana - BA",
    "Felipe - BA",
    "Letícia - BA",
    "Bruno - BA",
    "Camila - BA",
    "Rafael - BA",
    "Sara - BA"
  ];
  
  const mensagens = [
    "adquiriu a camisa."
  ];
  
  
  function mostrarPopup() {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
  
    const popup = document.getElementById("popup-notification");
    const popupText = document.getElementById("popup-text");
  
    popupText.textContent = `✅ ${nome} ${msg}`;
    popup.classList.add("show");
  
    setTimeout(() => {
      popup.classList.remove("show");
    }, 6000);
  }
  
  // Exibir popup a cada 15 segundos
  setInterval(mostrarPopup, 15000);

  //ALARME
  function iniciarContadorVisual() {
    const fim = new Date("2025-07-15T23:59:59").getTime();

    function atualizar() {
      const agora = new Date().getTime();
      const restante = fim - agora;

      if (restante < 0) {
        document.getElementById("cronometro-hora").innerText = "00:00:00";
        document.querySelector(".cronometro-alerta").innerText = "⛔ Tempo esgotado!";
        return;
      }

      const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((restante % (1000 * 60)) / 1000);

      const formatado = 
        String(horas).padStart(2, '0') + ':' +
        String(minutos).padStart(2, '0') + ':' +
        String(segundos).padStart(2, '0');

      document.getElementById("cronometro-hora").innerText = formatado;
    }

    atualizar();
    setInterval(atualizar, 1000);
  }

  document.addEventListener("DOMContentLoaded", iniciarContadorVisual);
  
