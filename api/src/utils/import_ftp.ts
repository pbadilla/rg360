//////////// UNIVERSKATE ////////////
<?php

if (!defined('_PS_ADMIN_DIR_')) {
    define('_PS_ADMIN_DIR_', __DIR__);
}
include _PS_ADMIN_DIR_.'/../../config/config.inc.php';

function sendEmailNotification($subject, $message) {
    // Email recipient
    $to = 'ventasonline@rollergrind360.com'; // Replace with your email address
    $headers = 'From: rollergrind360@gmail.com' . "\r\n" . // Replace with your domain
               'Reply-To: rollergrind360@gmail.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send email
    if(mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}

function downloadFile($url, $path)
{

$ch = curl_init($url);
$fp = fopen($path, 'wb');
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_exec($ch);
curl_close($ch);
fclose($fp);

//file_put_contents($path, file_get_contents($url));

/*
    $in=    fopen($url, "rb");
    $out=   fopen($path, "wb");
    while ($chunk = fread($in,8192))
    {
        fwrite($out, $chunk, 8192);
    }
    fclose($in);
    fclose($out);
*/
/*
    $newfname = $path;
    $file = fopen($url, 'rb');
    if ($file) {
        $newf = fopen($newfname, 'wb');
        if ($newf) {
            while (!feof($file)) {
                fwrite($newf, fread($file, 1024 * 8), 1024 * 8);
            }
        }
    }
    if ($file) {
        fclose($file);
    }
    if ($newf) {
        fclose($newf);
    }
    */
}

function getFileCSVUniverskate(){
    $username='csvuniverskate';
    $password='ZeF1@TENbu';
    $usernamePassword = $username . ':' . $password;
    $headers = array('Authorization: Basic ' . base64_encode($usernamePassword));

    //URL
    $url= 'https://csvshops.universkate.com/UniverskateStock.csv';

    //DOWNLOAD PATH
    $path = _PS_ADMIN_DIR_.'/universkate.csv';

    //FOLDER PATH
    $fp = fopen($path, 'w');

    //SETTING UP CURL REQUEST
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $data = curl_exec($ch);

    //CONNECTION CLOSE
    curl_close($ch);
    fclose($fp);

    return true;
}

function processProduct($row){
   $csvreference = "US-".$row["Reference"];
   $csvean = $row["Ean"];
   $csvprix = $row["Prix"];
   $csvstock = $row["Stock"];
   $csvimage = $row["Image"];
   $csvmarque = $row["Marque"];
   $csvrefmere = $row["Refmere"];

   $idproduct = Product::getIdByReference($csvreference);

   if ($idproduct!=0){
       var_dump($idproduct);
        StockAvailable::setQuantity($idproduct, 0, (int)$csvstock, 1);
   }
}    

function removeFirstRow($file_path) {
    $lines = file($file_path); // Read file into an array
    array_shift($lines); // Remove the first row
    file_put_contents($file_path, implode("", $lines)); // Save back without the first row
}


function importFile($file_path) {
    try {
        if (file_exists($file_path)) {
            if (($handle = fopen($file_path, "r")) !== FALSE) {
                $i = 0;
                $cabecera = [];

                while (($data = fgetcsv($handle, 0, ";")) !== FALSE) {
                    if ($i == 0) {
                        // Ignorar la primera fila (fecha de actualización)
                        $i++;
                        continue;
                    } elseif ($i == 1) {
                        // La segunda fila es la cabecera
                        $cabecera = $data;
                    } else {
                        // Asociar cada fila con la cabecera
                        $fila = [];
                        for ($c = 0; $c < count($cabecera); $c++) {
                            $fila[$cabecera[$c]] = $data[$c] ?? ""; // Evita errores si faltan datos
                        }

                        try {
                            processProduct($fila);
                        } catch (Throwable $t) {
                            echo "Error procesando fila $i: " . $t->getMessage();
                        }
                    }
                    $i++;
                }
                fclose($handle);
            }
        } else {
            echo 'No se ha encontrado el fichero ' . $file_path;
        }

        return true;

    } catch (Exception $e) {
        echo 'importFile - ERROR: ', $e->getMessage(), '\n';
        echo '$file_path -> ' . $file_path;
    }
}


/*
if (getFileCSVUniverskate()){

    importFile(_PS_ADMIN_DIR_.'/universkate.csv');
}
*/

getFileCSVUniverskate();
importFile(_PS_ADMIN_DIR_.'/universkate.csv');
removeFirstRow(_PS_ADMIN_DIR_.'/universkate.csv');

echo "Acaba";

sendEmailNotification('Universkate Import Cron', 'Proceso de importación completado correctamente.');



//////////// ROLLERBLADE ////////////
<?php

if (!defined('_PS_ADMIN_DIR_')) {
    define('_PS_ADMIN_DIR_', __DIR__);
}
include _PS_ADMIN_DIR_.'/../../config/config.inc.php';

function sendNotification($status){
    // Parámetros del correo
    $to = "ventasonline@rollergrind360.com"; // Cambia esto por tu correo
    $subject = "BMSportech Import Cron";
    $message = "El procesamiento del archivo CSV ha terminado con el siguiente estado: $status";
    $headers = "From: rollergrind360@gmail.com"; // Cambia esto por el remitente que prefieras

    // Enviar correo
    mail($to, $subject, $message, $headers);
}

function getDataCurl(){


$fp = fopen(_PS_ADMIN_DIR_.'/stock_BMSPORTECH.csv', 'w');


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "ftps://ftp.bmsportech.com/stocks.csv");
curl_setopt($ch, CURLOPT_PORT, 22);
curl_setopt($ch, CURLOPT_USERPWD, "cliente_rollergrind360:aue9kpr@DPV.hgp7ufz");

curl_setopt($ch, CURLOPT_UPLOAD, 0);
curl_setopt($ch, CURLOPT_FILE, $fp);

//SSL stuff
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);  //use for development only; unsecure 
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);  //use for development only; unsecure
curl_setopt($ch, CURLOPT_FTP_SSL, CURLFTPSSL_TRY);
curl_setopt($ch, CURLOPT_FTPSSLAUTH, CURLFTPAUTH_TLS); 


//curl_setopt($ch, CURLOPT_SSLVERSION, CURL_SSLVERSION_DEFAULT); 



//end SSL
curl_setopt($ch, CURLOPT_VERBOSE, TRUE);
curl_setopt($ch, CURLOPT_STDERR, $stderr);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

curl_exec ($ch);

$error_no = curl_errno($ch);
$error_msg = curl_error($ch);

curl_close ($ch);
fclose($fp);
fclose($stderr);

if ($error_no == 0) 
{
    $status = "Success";
} 
else
{
    $status = "Failed"; 

}

echo "FTP RESULT: <BR/>error_no: ".$error_no . "<br/>msg: " . $error_msg;


}


function GetData(){



$ctx = stream_context_create(['ssl' => [
    'verify_peer' => false
]]);




    return file_get_contents('ftps://cliente_rollergrind360:aue9kpr@DPV.hgp7ufz@ftp.bmsportech.com/stocks.csv', FALSE, $ctx);

}


function getFileCSV(){

    $ftp_server = 'ftp://bmsportech.com/stocks.csv';
    $fp = fopen("stocks.csv", 'w+');
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $ftp_server);
    curl_setopt($curl, CURLOPT_FTPLISTONLY, 0);
    curl_setopt($curl, CURLOPT_PORT, 21);
    curl_setopt($curl, CURLOPT_USERPWD, "cliente_rollergrind360:aue9kpr@DPV.hgp7ufz");
    curl_setopt($curl, CURLOPT_VERBOSE, TRUE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); 
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE); 
    curl_setopt($curl, CURLOPT_FTP_SSL, CURLFTPSSL_ALL);
    curl_setopt($curl, CURLOPT_FTPSSLAUTH, CURLFTPAUTH_TLS);
    curl_setopt($curl, CURLOPT_USE_SSL, TRUE);
    curl_setopt($curl, CURLOPT_UPLOAD, 0);
    curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_FILE, $fp);

    $result = curl_exec($curl);
    $error_no = curl_errno($curl);
    curl_close($curl);

    fputs($fp, $result);

    fclose($fp);
/*
    if ($error_no == 0) {
        echo 'Connection made';
    } else {
        echo 'Connection failed: ' . $error_no;
    }
*/
    return true;

 

    /*

    $conn = ftp_ssl_connect("ftp.bmsportech.com");

    if ($conn){
        
        if (ftp_login($conn, "cliente_rollergrind360", "aue9kpr@DPV.hgp7ufz")){
            dump(ftp_pasv($conn, true));
            dump(ftp_rawlist($conn, '.'));

            dump(ftp_pwd($ftp));
            
            $filemaxdate ="stocks.csv";
            
            echo _PS_ADMIN_DIR_.'/stock_BMSPORTECH.csv';

            if (ftp_get($conn, _PS_ADMIN_DIR_.'/stock_BMSPORTECH.csv', $filemaxdate, FTP_BINARY)){
                echo "llega4";
                ftp_close($conn); 
                return true;
            }
            else{
                
                ftp_close($conn); 
                return false;
            }

            

        }  
        else{
            ftp_close($conn); 
            return false;
        }
    }
    else{
        ftp_close($conn); 
        return false;

    }

    */
}

function getIdByReference($reference)
    {
        if (empty($reference)) {
            return 0;
        }

        $query = new DbQuery();
        $query->select('pa.id_product_attribute');
        $query->from('product_attribute', 'pa');
        $query->where('pa.reference = \'' . pSQL($reference) . '\'');
        
        return (int) Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query);
    }


function processProduct($fila){
    
    $idProductAttribute = getIdByReference($fila["Código Completo (SKU)"]);
    $sku = $fila["Código Completo (SKU)"];
    echo "SKU ".$sku."<br>" ;

    if ($idProductAttribute>0){
        $idproduct = Db::getInstance()->getValue("SELECT id_product from "._DB_PREFIX_."product_attribute where id_product_attribute=".$idProductAttribute);
        StockAvailable::setQuantity($idproduct, $idProductAttribute, (int)$fila["Stock"], 1);
        echo "'.$idproduct.' - '.$idProductAttribute.' - '.$sku.'<br>" ;
    }
  


}


function importFile($file_path) {
    try {
        if (file_exists($file_path)) {
            

            if (($handle = fopen($file_path, "r")) !== FALSE) {
                $i=0;
                $cabecera = "";
                while (($data = fgetcsv($handle, 0, ";")) !== FALSE) {

                    if ($i==0){
                        $cabecera = $data;
                        $i=1;
                    }
                    else{

                        $fila = [];

                        for ($c=0; $c < count($cabecera); $c++) {
                            $fila[$cabecera[$c]] = $data[$c];
                        }

                        processProduct($fila);

                        

                    }

                }
                fclose($handle);
            }



            
        } else {
            echo 'No se ha encontrado el fichero '.$file_path;
            
        }

        return true;

    } catch (Exception $e) {
        echo 'importFile - ERROR: ',  $e->getMessage(), '\n';
        echo '$file_path -> '.$file_path;
        
    }
}


//dump(GetData());
//getDataCurl();


echo "Step 1: Starting script...<br>";
if (getFileCSV()) {
    echo "Step 2: File downloaded successfully.<br>";
    importFile(_PS_ADMIN_DIR_.'/stocks.csv');
    echo "Step 3: Import completed.<br>";
    sendNotification("Proceso de importación completado correctamente.");
} else {
    sendNotification("Error en la descarga del archivo CSV.");
    die("Step 2: File download failed.");
}
echo "Step 4: Script completed successfully.<br>";


// importFile(_PS_ADMIN_DIR_.'/stocks.csv');
