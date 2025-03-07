<?php
require("config.php");
$submitted_username = '';
if (!empty($_POST)) {
    $query = "
            SELECT 
                id, 
                username, 
                first_name, 
                last_name,
                password, 
                salt, 
                email, 
                creation_date,
                privleged_user
            FROM users 
            WHERE 
                username = :username 
        ";
    $query_params = array(
        ':username' => $_POST['username']
    );

    try {
        $stmt = $db->prepare($query);
        $result = $stmt->execute($query_params);
    } catch (PDOException $ex) {
        die("Failed to run query: " . $ex->getMessage());
    }
    $login_ok = false;
    $row = $stmt->fetch();
    if ($row) {
        $check_password = hash('sha256', $_POST['password'] . $row['salt']);
        for ($round = 0; $round < 65536; $round++) {
            $check_password = hash('sha256', $check_password . $row['salt']);
        }

        if ($check_password === $row['password']) {
            $login_ok = true;
        }
    }

    if ($login_ok) {
        unset($row['salt']);
        unset($row['password']);
        $_SESSION['user'] = $row['id'];
        $_SESSION['username']=$row['username'];
        $_SESSION['pref']=$row['first_name'];
        $_SESSION['last']=$row['last_name'];
        $_SESSION['privleged_user']=$row['privleged_user'];
        header("Location: main.php");
        die("Redirecting to: main.php");
    } else {
        print("Login Failed.");
        $submitted_username = htmlentities($_POST['username'], ENT_QUOTES, 'UTF-8');
    }
}
?> 