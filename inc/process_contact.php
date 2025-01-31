<?php
require_once 'connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $errors = []; // array to collect all errors

    // get and sanitize form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    $marketing = isset($_POST['Checkbox']) ? 1 : 0;

    // validate required fields
    if (empty($name) || empty($email) || empty($message) || empty($phone)) {
        $errors[] = 'Required fields are missing';
    }

    // validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format';
    }

    // validate phone number format
    if (!preg_match('/^(?:(?:\+44\s?|0)(?:1|2|3|7)(?:\d\s?){8,9})$/', $phone)) {
        $errors[] = 'Invalid UK phone number format';
    }
    
    // message length - greater than 1 so that it doesnt trigger empty field exception
    if (strlen($message) >=1 && strlen($message) < 5) {
        $errors[] = 'Message must be at least 5 characters';
    }

    // throw all errors at once
    if (!empty($errors)) {
        throw new Exception(json_encode($errors));
    }
    // prepare and execute the sql
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
    $errorMessage = $e->getMessage();
    // check if message is json array
    $decodedErrors = json_decode($errorMessage, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo json_encode(['errors' => $decodedErrors]);
    } else {
        echo json_encode(['errors' => [$errorMessage]]);
    }
}
