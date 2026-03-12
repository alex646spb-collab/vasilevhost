<?php
// Прячем системные ошибки PHP, чтобы они не ломали ответ сайту
ini_set('display_errors', 0);
error_reporting(0);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

// === ВАШИ ДАННЫЕ ===
$token = "8363528727:AAHehZCVe4GQKQFYP68K8rC5NfnyCK-H4Y8"; // Пример: "123456789:ABCdefGHIjkl..."
$chat_id = "1389330369";   // Пример: "12345678"

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

if (!empty($name) && !empty($phone)) {
    
    $text = "📩 <b>Новая заявка на свадьбу!</b>\n\n";
    $text .= "👤 <b>Имя:</b> " . htmlspecialchars($name) . "\n";
    $text .= "📞 <b>Связь:</b> " . htmlspecialchars($phone);

    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data =[
        'chat_id' => $chat_id,
        'text' => $text,
        'parse_mode' => 'HTML'
    ];

    // ИСПОЛЬЗУЕМ cURL (Работает везде)
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, false);
    
    $result = curl_exec($ch);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $curl_error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Пустые данные']);
}
