// Проверка кода
document.getElementById('auth-check-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const code = this.querySelector('input').value;
  const resultBlock = document.getElementById('result-block');
  const resultText = document.getElementById('result-text');
document.getElementById('auth-check-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = document.querySelector('input').value;
  
  const response = await fetch(`/verify.php?code=${encodeURIComponent(code)}`);
  const data = await response.json();

  if (data.valid) {
    alert(data.is_original ? "✅ Оригинал" : "❌ Подделка");
  } else {
    alert("Код не найден");
  }
});

  // Пример проверки (в реальности - запрос к API)
  if (code.startsWith("CLG-") && code.length === 10) {
    resultText.textContent = "✅ Ваш товар подлинный. Благодарим за покупку!";
    resultText.style.color = "green";
  } else {
    resultText.textContent = "❌ Код недействителен. Возможна подделка.";
    resultText.style.color = "red";
  }

  resultBlock.classList.remove('hidden');
});

// Кнопка "Новая проверка"
document.getElementById('new-check').addEventListener('click', function() {
  document.getElementById('auth-check-form').reset();
  document.getElementById('result-block').classList.add('hidden');
});

// QR-сканер (заглушка)
document.getElementById('open-qr-scanner').addEventListener('click', function(e) {
  e.preventDefault();
  alert("В реальном сайте здесь будет сканер камеры. Для примера введите код вручную.");
scanner.addListener('scan', function(content) {
  // Отправляем код на сервер для проверки
  fetch('/api/verify?code=' + content)
    .then(response => response.json())
    .then(data => {
      if(data.valid) {
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    });
});
});
async function checkProduct(code) {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  
  // Ищем товар по коду (имитация)
  const product = products.find(p => p.id === parseInt(code));
  
  if (product) {
    console.log("Найден товар:", product.title);
    return true;
  }
  return false;
}