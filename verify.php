<?php
header('Content-Type: application/json');

// Подключение к БД
$servername = "localhost";
$username = "hibinsky";
$password = "qwerty5678";
$dbname = "product_verification";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die(json_encode(['error' => 'Connection failed']));
}

// Получаем код из запроса
$code = $_GET['code'] ?? '';

// Запрос к БД
$stmt = $conn->prepare("SELECT * FROM products WHERE code = ?");
$stmt->bind_param("s", $code);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  echo json_encode([
    'valid' => true,
    'is_original' => (bool)$row['is_original'],
    'product' => $row['product_name']
  ]);
} else {
  echo json_encode(['valid' => false]);
}

$conn->close();
?>