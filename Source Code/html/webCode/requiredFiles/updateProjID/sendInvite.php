<?php

require("config.php");
require("../../PHPMailer/PHPMailerAutoload.php");

if(empty($_SESSION['user']))
{
    header("Location: ../../index.html");
    die("Redirecting to ../../index.html");
}

$projectID=-1;
$query = "SELECT 1 FROM project_permissions WHERE permission_level>=3 AND user_id=:user_id AND project_id=:project_id";
$query_params = array(':user_id' => $_SESSION['user'],
	':project_id' => $projectID);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);
$row = $stmt->fetch();
if(!$row)
{
	$data = array("result"=>false, "message"=>"You do not have permission to invite collaborators to the '." . $project_name . "' web portal.");
	echo(json_encode($data));
	return;
}

$emailObj = $_POST['e'];
$emails = json_decode($emailObj, true);
$message = $_POST['m'];
$permission_level = $_POST['pl'];
$time = date("Y-m-d H:i:s");

$query = "SELECT project_name FROM projects WHERE project_id=:project_id";
$query_params = array(':project_id' => $projectID);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);
$row = $stmt->fetch();
$project_name = $row['project_name'];

$query = "SELECT first_name, last_name FROM users WHERE id=:id";
$query_params = array(':id' => $_SESSION['user']);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);
$row = $stmt->fetch();
$first_name = $row['first_name'];
$last_name = $row['last_name'];


$used_emails = array();
$insert_array = array();
$sent_emails = array();

foreach($emails as $entry)
{
	if(!array_key_exists($entry, $used_emails))
	{
		$used_emails[$entry] = "";
		$unique_code = randomKey(20);
		while (true) {
			if(!DatabaseContainsKey($unique_code, $db))
			{
				break;
			}
			$unique_code = randomKey(20);
		}
		array_push($insert_array, array( $projectID, $_SESSION['user'], $permission_level, $entry, $message, $unique_code, 1, $time, 0));
	}
}

$chunked_array = array_chunk($insert_array, 2000);

	foreach ($chunked_array as $chunk) {
		$row_length = count($chunk[0]);
		$nb_rows = count($chunk);
		$length = $row_length * $nb_rows;
		$args = implode(',', array_map(
			function($el) { return '('.implode(',', $el).')'; },
			array_chunk(array_fill(0, $length, '?'), $row_length)
			));

		$query_params = array();
		foreach($chunk as $array)
		{
			foreach($array as $value)
			{
				$query_params[] = $value;
			}
		}
		$insertText = "INSERT INTO project_invitations (project_id, sending_user_id, permission_level, email, message, unique_code, invitation_sent, invitation_send_time, invitation_accepted) VALUES " . $args;
		try{
			$stmt = $db->prepare($insertText);
			$result = $stmt->execute($query_params);
			//need to send email here
			foreach ($chunk as $array)
			{
			     sendMessage($project_name, $message, $array[3], $array[5], $first_name, $last_name);
			}

		}
		catch (PDOException $ex) {
			echo($ex->getMessage());
		}
	}

$data = array("result"=>true, "message"=>"Project invitations sent to your collaborators! You can monitor the invitation list here to see who has accepted your invitation to the '" . $project_name . "' web portal.");
	echo(json_encode($data));
	return;

function sendMessage($projectName, $userMessage, $email, $code, $firstName, $lastName)
{
  $subject = "Invitation to the '" . $projectName . "' Data Visualization Portal";
  $userMessage = nl2br($userMessage);
  $message = "";


  $message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!--[if IE]><html xmlns="https://www.w3.org/1999/xhtml" class="ie"><![endif]--><!--[if !IE]><!--><html style="margin: 0;padding: 0;" xmlns="https://www.w3.org/1999/xhtml"><!--<![endif]--><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge" /><!--<![endif]-->
    <meta name="viewport" content="width=device-width" /><style type="text/css">
    @media only screen and (min-width: 620px){.wrapper{min-width:600px !important}.wrapper h1{}.wrapper h1{font-size:64px !important;line-height:63px !important}.wrapper h2{}.wrapper h2{font-size:30px !important;line-height:38px !important}.wrapper h3{}.wrapper h3{font-size:22px !important;line-height:31px !important}.column{}.wrapper .size-8{font-size:8px !important;line-height:14px !important}.wrapper .size-9{font-size:9px !important;line-height:16px !important}.wrapper .size-10{font-size:10px !important;line-height:18px !important}.wrapper .size-11{font-size:11px !important;line-height:19px !important}.wrapper .size-12{font-size:12px !important;line-height:19px !important}.wrapper .size-13{font-size:13px !important;line-height:21px !important}.wrapper .size-14{font-size:14px !important;line-height:21px !important}.wrapper .size-15{font-size:15px !important;line-height:23px 
    !important}.wrapper .size-16{font-size:16px !important;line-height:24px !important}.wrapper .size-17{font-size:17px !important;line-height:26px !important}.wrapper .size-18{font-size:18px !important;line-height:26px !important}.wrapper .size-20{font-size:20px !important;line-height:28px !important}.wrapper .size-22{font-size:22px !important;line-height:31px !important}.wrapper .size-24{font-size:24px !important;line-height:32px !important}.wrapper .size-26{font-size:26px !important;line-height:34px !important}.wrapper .size-28{font-size:28px !important;line-height:36px !important}.wrapper .size-30{font-size:30px !important;line-height:38px !important}.wrapper .size-32{font-size:32px !important;line-height:40px !important}.wrapper .size-34{font-size:34px !important;line-height:43px !important}.wrapper .size-36{font-size:36px !important;line-height:43px !important}.wrapper 
    .size-40{font-size:40px !important;line-height:47px !important}.wrapper .size-44{font-size:44px !important;line-height:50px !important}.wrapper .size-48{font-size:48px !important;line-height:54px !important}.wrapper .size-56{font-size:56px !important;line-height:60px !important}.wrapper .size-64{font-size:64px !important;line-height:63px !important}}
    </style>
    <style type="text/css">
  body {
    margin: 0;
    padding: 0;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
  }
  * {
    line-height: inherit;
  }
  [x-apple-data-detectors],
  [href^="tel"],
  [href^="sms"] {
    color: inherit !important;
    text-decoration: none !important;
  }
  .wrapper .footer__share-button a:hover,
  .wrapper .footer__share-button a:focus {
    color: #ffffff !important;
  }
  .btn a:hover,
  .btn a:focus,
  .footer__share-button a:hover,
  .footer__share-button a:focus,
  .email-footer__links a:hover,
  .email-footer__links a:focus {
    opacity: 0.8;
  }
  .preheader,
  .header,
  .layout,
  .column {
    transition: width 0.25s ease-in-out, max-width 0.25s ease-in-out;
  }
  .layout,
  div.header {
    max-width: 400px !important;
    -fallback-width: 95% !important;
    width: calc(100% - 20px) !important;
  }
  div.preheader {
    max-width: 360px !important;
    -fallback-width: 90% !important;
    width: calc(100% - 60px) !important;
  }
  .snippet,
  .webversion {
    Float: none !important;
  }
  .column {
    max-width: 400px !important;
    width: 100% !important;
  }
  .fixed-width.has-border {
    max-width: 402px !important;
  }
  .fixed-width.has-border .layout__inner {
    box-sizing: border-box;
  }
  .snippet,
  .webversion {
    width: 50% !important;
  }
  .ie .btn {
    width: 100%;
  }
  [owa] .column div,
  [owa] .column button {
    display: block !important;
  }
  .ie .column,
  [owa] .column,
  .ie .gutter,
  [owa] .gutter {
    display: table-cell;
    float: none !important;
    vertical-align: top;
  }
  .ie div.preheader,
  [owa] div.preheader,
  .ie .email-footer,
  [owa] .email-footer {
    max-width: 560px !important;
    width: 560px !important;
  }
  .ie .snippet,
  [owa] .snippet,
  .ie .webversion,
  [owa] .webversion {
    width: 280px !important;
  }
  .ie div.header,
  [owa] div.header,
  .ie .layout,
  [owa] .layout,
  .ie .one-col .column,
  [owa] .one-col .column {
    max-width: 600px !important;
    width: 600px !important;
  }
  .ie .fixed-width.has-border,
  [owa] .fixed-width.has-border,
  .ie .has-gutter.has-border,
  [owa] .has-gutter.has-border {
    max-width: 602px !important;
    width: 602px !important;
  }
  .ie .two-col .column,
  [owa] .two-col .column {
    max-width: 300px !important;
    width: 300px !important;
  }
  .ie .three-col .column,
  [owa] .three-col .column,
  .ie .narrow,
  [owa] .narrow {
    max-width: 200px !important;
    width: 200px !important;
  }
  .ie .wide,
  [owa] .wide {
    width: 400px !important;
  }
  .ie .two-col.has-gutter .column,
  [owa] .two-col.x_has-gutter .column {
    max-width: 290px !important;
    width: 290px !important;
  }
  .ie .three-col.has-gutter .column,
  [owa] .three-col.x_has-gutter .column,
  .ie .has-gutter .narrow,
  [owa] .has-gutter .narrow {
    max-width: 188px !important;
    width: 188px !important;
  }
  .ie .has-gutter .wide,
  [owa] .has-gutter .wide {
    max-width: 394px !important;
    width: 394px !important;
  }
  .ie .two-col.has-gutter.has-border .column,
  [owa] .two-col.x_has-gutter.x_has-border .column {
    max-width: 292px !important;
    width: 292px !important;
  }
  .ie .three-col.has-gutter.has-border .column,
  [owa] .three-col.x_has-gutter.x_has-border .column,
  .ie .has-gutter.has-border .narrow,
  [owa] .has-gutter.x_has-border .narrow {
    max-width: 190px !important;
    width: 190px !important;
  }
  .ie .has-gutter.has-border .wide,
  [owa] .has-gutter.x_has-border .wide {
    max-width: 396px !important;
    width: 396px !important;
  }
  .ie .fixed-width .layout__inner {
    border-left: 0 none white !important;
    border-right: 0 none white !important;
  }
  .ie .layout__edges {
    display: none;
  }
  .mso .layout__edges {
    font-size: 0;
  }
  .layout-fixed-width,
  .mso .layout-full-width {
    background-color: #ffffff;
  }
  @media only screen and (min-width: 620px) {
    .column,
    .gutter {
      display: table-cell;
      Float: none !important;
      vertical-align: top;
    }
    div.preheader,
    .email-footer {
      max-width: 560px !important;
      width: 560px !important;
    }
    .snippet,
    .webversion {
      width: 280px !important;
    }
    div.header,
    .layout,
    .one-col .column {
      max-width: 600px !important;
      width: 600px !important;
    }
    .fixed-width.has-border,
    .fixed-width.ecxhas-border,
    .has-gutter.has-border,
    .has-gutter.ecxhas-border {
      max-width: 602px !important;
      width: 602px !important;
    }
    .two-col .column {
      max-width: 300px !important;
      width: 300px !important;
    }
    .three-col .column,
    .column.narrow {
      max-width: 200px !important;
      width: 200px !important;
    }
    .column.wide {
      width: 400px !important;
    }
    .two-col.has-gutter .column,
    .two-col.ecxhas-gutter .column {
      max-width: 290px !important;
      width: 290px !important;
    }
    .three-col.has-gutter .column,
    .three-col.ecxhas-gutter .column,
    .has-gutter .narrow {
      max-width: 188px !important;
      width: 188px !important;
    }
    .has-gutter .wide {
      max-width: 394px !important;
      width: 394px !important;
    }
    .two-col.has-gutter.has-border .column,
    .two-col.ecxhas-gutter.ecxhas-border .column {
      max-width: 292px !important;
      width: 292px !important;
    }
    .three-col.has-gutter.has-border .column,
    .three-col.ecxhas-gutter.ecxhas-border .column,
    .has-gutter.has-border .narrow,
    .has-gutter.ecxhas-border .narrow {
      max-width: 190px !important;
      width: 190px !important;
    }
    .has-gutter.has-border .wide,
    .has-gutter.ecxhas-border .wide {
      max-width: 396px !important;
      width: 396px !important;
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
    .fblike {
      background-image: url(https://i3.createsend1.com/static/eb/master/13-the-blueprint-3/images/fblike@2x.png) !important;
    }
    .tweet {
      background-image: url(https://i4.createsend1.com/static/eb/master/13-the-blueprint-3/images/tweet@2x.png) !important;
    }
    .linkedinshare {
      background-image: url(https://i5.createsend1.com/static/eb/master/13-the-blueprint-3/images/lishare@2x.png) !important;
    }
    .forwardtoafriend {
      background-image: url(https://i6.createsend1.com/static/eb/master/13-the-blueprint-3/images/forward@2x.png) !important;
    }
  }
  @media (max-width: 321px) {
    .fixed-width.has-border .layout__inner {
      border-width: 1px 0 !important;
    }
    .layout,
    .column {
      min-width: 320px !important;
      width: 320px !important;
    }
    .border {
      display: none;
    }
  }
  .mso div {
    border: 0 none white !important;
  }
  .mso .w560 .divider {
    Margin-left: 260px !important;
    Margin-right: 260px !important;
  }
  .mso .w360 .divider {
    Margin-left: 160px !important;
    Margin-right: 160px !important;
  }
  .mso .w260 .divider {
    Margin-left: 110px !important;
    Margin-right: 110px !important;
  }
  .mso .w160 .divider {
    Margin-left: 60px !important;
    Margin-right: 60px !important;
  }
  .mso .w354 .divider {
    Margin-left: 157px !important;
    Margin-right: 157px !important;
  }
  .mso .w250 .divider {
    Margin-left: 105px !important;
    Margin-right: 105px !important;
  }
  .mso .w148 .divider {
    Margin-left: 54px !important;
    Margin-right: 54px !important;
  }
  .mso .footer__share-button p {
    margin: 0;
  }
  .mso .size-8,
  .ie .size-8 {
    font-size: 8px !important;
    line-height: 14px !important;
  }
  .mso .size-9,
  .ie .size-9 {
    font-size: 9px !important;
    line-height: 16px !important;
  }
  .mso .size-10,
  .ie .size-10 {
    font-size: 10px !important;
    line-height: 18px !important;
  }
  .mso .size-11,
  .ie .size-11 {
    font-size: 11px !important;
    line-height: 19px !important;
  }
  .mso .size-12,
  .ie .size-12 {
    font-size: 12px !important;
    line-height: 19px !important;
  }
  .mso .size-13,
  .ie .size-13 {
    font-size: 13px !important;
    line-height: 21px !important;
  }
  .mso .size-14,
  .ie .size-14 {
    font-size: 14px !important;
    line-height: 21px !important;
  }
  .mso .size-15,
  .ie .size-15 {
    font-size: 15px !important;
    line-height: 23px !important;
  }
  .mso .size-16,
  .ie .size-16 {
    font-size: 16px !important;
    line-height: 24px !important;
  }
  .mso .size-17,
  .ie .size-17 {
    font-size: 17px !important;
    line-height: 26px !important;
  }
  .mso .size-18,
  .ie .size-18 {
    font-size: 18px !important;
    line-height: 26px !important;
  }
  .mso .size-20,
  .ie .size-20 {
    font-size: 20px !important;
    line-height: 28px !important;
  }
  .mso .size-22,
  .ie .size-22 {
    font-size: 22px !important;
    line-height: 31px !important;
  }
  .mso .size-24,
  .ie .size-24 {
    font-size: 24px !important;
    line-height: 32px !important;
  }
  .mso .size-26,
  .ie .size-26 {
    font-size: 26px !important;
    line-height: 34px !important;
  }
  .mso .size-28,
  .ie .size-28 {
    font-size: 28px !important;
    line-height: 36px !important;
  }
  .mso .size-30,
  .ie .size-30 {
    font-size: 30px !important;
    line-height: 38px !important;
  }
  .mso .size-32,
  .ie .size-32 {
    font-size: 32px !important;
    line-height: 40px !important;
  }
  .mso .size-34,
  .ie .size-34 {
    font-size: 34px !important;
    line-height: 43px !important;
  }
  .mso .size-36,
  .ie .size-36 {
    font-size: 36px !important;
    line-height: 43px !important;
  }
  .mso .size-40,
  .ie .size-40 {
    font-size: 40px !important;
    line-height: 47px !important;
  }
  .mso .size-44,
  .ie .size-44 {
    font-size: 44px !important;
    line-height: 50px !important;
  }
  .mso .size-48,
  .ie .size-48 {
    font-size: 48px !important;
    line-height: 54px !important;
  }
  .mso .size-56,
  .ie .size-56 {
    font-size: 56px !important;
    line-height: 60px !important;
  }
  .mso .size-64,
  .ie .size-64 {
    font-size: 64px !important;
    line-height: 63px !important;
  }
  .footer__share-button p {
    margin: 0;
  }
  </style>
      
    <!--[if !mso]><!--><style type="text/css">
  @import url(https://fonts.googleapis.com/css?family=Oswald:400,700,400italic);
  </style><link href="https://fonts.googleapis.com/css?family=Oswald:400,700,400italic" rel="stylesheet" type="text/css" /><!--<![endif]--><style type="text/css">
  body{background-color:#fff}.logo a:hover,.logo a:focus{color:#859bb1 !important}.mso .layout-has-border{border-top:1px solid #ccc;border-bottom:1px solid #ccc}.mso .layout-has-bottom-border{border-bottom:1px solid #ccc}.mso .border,.ie .border{background-color:#ccc}.mso h1,.ie h1{}.mso h1,.ie h1{font-size:64px !important;line-height:63px !important}.mso h2,.ie h2{}.mso h2,.ie h2{font-size:30px !important;line-height:38px !important}.mso h3,.ie h3{}.mso h3,.ie h3{font-size:22px !important;line-height:31px !important}.mso .layout__inner,.ie .layout__inner{}.mso .footer__share-button p{}.mso .footer__share-button p{font-family:sans-serif}
  </style><meta name="robots" content="noindex,nofollow" />
  <meta property="og:title" content="My First Campaign" />
  </head>
  <!--[if mso]>
    <body class="mso">
  <![endif]-->
  <!--[if !mso]><!-->
    <body class="no-padding" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;">
  <!--<![endif]-->
      <table class="wrapper" style="border-collapse: collapse;table-layout: fixed;min-width: 320px;width: 100%;background-color: #fff;" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td>
        <div role="banner">
          <div class="preheader" style="Margin: 0 auto;max-width: 560px;min-width: 280px; width: 280px;width: calc(28000% - 167440px);">
            <div style="border-collapse: collapse;display: table;width: 100%;">
            <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 280px" valign="top"><![endif]-->
              <div class="snippet" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 140px; width: 140px;width: calc(14000% - 78120px);padding: 10px 0 5px 0;color: #adb3b9;font-family: sans-serif;">
                
              </div>
            <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->
              <div class="webversion" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 139px; width: 139px;width: calc(14100% - 78680px);padding: 10px 0 5px 0;text-align: right;color: #adb3b9;font-family: sans-serif;">
                
              </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </div>
          </div>
          
        </div>
        <div role="section">
        <div style="background-color: #134263;background-position: 0px 0px;background-repeat: repeat;">
          <div class="layout one-col" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
            <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-full-width" style="background-color: #4b5462;background-position: 0px 0px;background-repeat: repeat;"><td class="layout__edges">&nbsp;</td><td style="width: 600px" class="w560"><![endif]-->
              <div class="column" style="max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);text-align: left;color: #8e959c;font-size: 14px;line-height: 21px;font-family: sans-serif;">
              
                <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="line-height:40px;font-size:1px">&nbsp;</div>
      </div>
              
          <div style="font-size: 12px;font-style: normal;font-weight: normal;" align="center">
            <img style="border: 0;display: block;height: auto;width: 100%;max-width: 83px;" alt="" width="83" src="https://coonlabdatadev.com/CLDO_Logo-034.png" />
          </div>
        
                <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 20px;">
        <p class="size-48" style="Margin-top: 0;Margin-bottom: 20px;font-family: oswald,avenir next condensed,arial narrow,ms ui gothic,sans-serif;font-size: 36px;line-height: 43px;text-align: center;" lang="x-size-48"><span class="font-oswald"><font color="#ffffff">Invitation to Explore \'' . $projectName . '\' at Coon Lab Data Online&nbsp;</font></span></p>
      </div>
              
                <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="line-height:40px;font-size:1px">&nbsp;</div>
      </div>
              
                <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="line-height:5px;font-size:1px">&nbsp;</div>
      </div>
              
              </div>
            <!--[if (mso)|(IE)]></td><td class="layout__edges">&nbsp;</td></tr></table><![endif]-->
            </div>
          </div>
        </div>
    
        <div style="line-height:15px;font-size:15px;">&nbsp;</div>
    
        <div class="layout one-col fixed-width" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;">
          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 600px" class="w560"><![endif]-->
            <div class="column" style="text-align: left;color: #8e959c;font-size: 14px;line-height: 21px;font-family: sans-serif;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);">
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="line-height:18px;font-size:1px">&nbsp;</div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        
  <p class="size-20" style="Margin-top: 0;Margin-bottom: 0;font-family: avenir,sans-serif;font-size: 20px;line-height: 26px;text-align: center;" lang="x-size-18"><span class="font-avenir"><span style="color:#000000"><strong>Hey There!</strong></span></span></p><p class="size-20" style="Margin-top: 20px;Margin-bottom: 0;font-family: avenir,sans-serif;font-size: 17px;line-height: 26px;text-align: center;" lang="x-size-20"><span class="font-avenir"><span style="color:#000000">This is an invitation from '.$firstName . ' ' . $lastName . ' to explore a brand new data visualization portal for the project \''. $projectName .'\' at Argonaut. '.$firstName.' has designed&nbsp;a custom web portal around the \''. $projectName .'\' dataset filled with interactive charts, graphs, and tables to help you analyze your data as fast as possible. All you have to do now is log on to your collaborator\'s Argonaut Portal, enter the code below, and you are ready to go!</span></span></p><p class="size-20" style="Margin-top: 30px;Margin-bottom: 0;font-family: avenir,sans-serif;font-size: 17px;line-height: 26px;text-align: center;" lang="x-size-18"><span class="font-avenir"><span style="color:#000000"><strong>Project Invitation Code:</strong> '.$code.'</span></span></p><p class="size-20" style="Margin-top: 30px;Margin-bottom: 0;font-family: avenir,sans-serif;font-size: 20px;line-height: 26px;text-align: left;" lang="x-size-18"><span class="font-avenir"><span style="color:#000000">Here is a message from '.$firstName.':</span></span></p><p class="size-20" style="Margin-top: 20px;Margin-bottom: 20px;font-family: avenir,sans-serif;font-size: 17px;line-height: 26px;text-align: center;" lang="x-size-20"><span class="font-avenir"><em><font color="#000000">'. $userMessage .'</font></em></span></p>
      </div>        
            </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </div>
        </div>
    
        <div style="line-height:20px;font-size:20px;">&nbsp;</div>
    
        
        <div role="contentinfo">
          <div class="layout email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
            <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;">
            <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-email-footer"><td style="width: 400px;" valign="top" class="w360"><![endif]-->
              <div class="column wide" style="text-align: left;font-size: 12px;line-height: 19px;color: #adb3b9;font-family: sans-serif;Float: left;max-width: 400px;min-width: 320px; width: 320px;width: calc(8000% - 47600px);">
                <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 10px;Margin-bottom: 10px;">
                  
                  <div style="font-size: 12px;line-height: 19px;">
                    
                  </div>
                  <div style="font-size: 12px;line-height: 19px;Margin-top: 18px;">
                    
                  </div>
                </div>
              </div>
            <!--[if (mso)|(IE)]></td><td style="width: 200px;" valign="top" class="w160"><![endif]-->
              <div class="column narrow" style="text-align: left;font-size: 12px;line-height: 19px;color: #adb3b9;font-family: sans-serif;Float: left;max-width: 320px;min-width: 200px; width: 320px;width: calc(72200px - 12000%);">
                <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 10px;Margin-bottom: 10px;">
                  
                </div>
              </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="line-height:40px;font-size:40px;">&nbsp;</div>
      </div></td></tr></tbody></table>
    
  </body></html>';

  $headers = 'From: Coon Lab Data Online <coonlabdata@coonlabdatadev.com>' . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  // mail($to, $subject, $message, $headers);

  $mail = new PHPMailer();
  $mail->IsSMTP(); // set mailer to use SMTP

  $mail->From = "argonautdataportal@gmail.com";
    $mail->FromName = "Argonaut";
    $mail->Host = "smtp.gmail.com"; // specif smtp server
    $mail->SMTPSecure= "tls"; // Used instead of TLS when only POP mail is selected
    $mail->Port = 587; // Used instead of 587 when only POP mail is selected
    $mail->SMTPAuth = true;
    $mail->Username = "argonautdataportal@gmail.com"; // SMTP username
    $mail->Password = ">Pe2-YPGTDNu}4'="; // SMTP password
    $mail->AddAddress($email); //replace myname and mypassword to yours

  $mail->IsHTML(true); // set email format to HTML
  $mail->Subject = "Invitation to the '" . $projectName . "' Data Visualization Portal";
  $mail->Body = $message;

  $mail->send();
}

function randomKey($length) {
	$pool = array_merge(range(0,9), range('a', 'z'),range('A', 'Z'));
	$key = "";
	for($i=0; $i < $length; $i++) {
		$key .= $pool[mt_rand(0, count($pool) - 1)];
	}
	return $key;
}

function DatabaseContainsKey($key, $db)
{
	$query = "SELECT unique_invitation_id FROM project_invitations WHERE unique_code=:code";
	$query_params = array(':code' => $key);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);
	$row = $stmt->fetch();
	if(!$row)
	{
		return false;
	}
	return true;
}
