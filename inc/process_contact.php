<?php
require_once 'connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get and sanitize form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    $marketing = isset($_POST['Checkbox']) ? 1 : 0;

    // Validate required fields
    if (empty($name) || empty($email) || empty($message) || empty($phone)) {
        throw new Exception('Required fields are missing');
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }

    // Prepare and execute the SQL query
    $stmt = $pdo->prepare("
        INSERT INTO contact_submissions (name, company, email, phone, message, marketing_consent)
        VALUES (:name, :company, :email, :phone, :message, :marketing)
    ");

    $stmt->execute([
        'name' => $name,
        'company' => $company,
        'email' => $email,
        'phone' => $phone,
        'message' => $message,
        'marketing' => $marketing
    ]);

    echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
