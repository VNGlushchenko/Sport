<?php
require_once 'db_connect.php';
require_once 'prepareRequestData.php';

$user_name = str_replace(array('\n','\r\n'), '', $_POST['userName']);
$user_id = (sanitizeMySQL($con,$user_name) == "Kate") ? 1 : 2;

$query = "
          select distinct
                 t1.parameter_name,
                 t1.parameter_li
            from body_parameters        as t1
            join body_parameters_values as t2 on t2.parameter_id = t1.parameter_id
                                             and t2.user_id = ".$user_id.
         " order by t1.parameter_id";
         
$result=mysqli_query($con,$query);
$parameter_name = array();
$parameter_li = array();
$json = array();
    if(mysqli_num_rows($result)){
        while($row=mysqli_fetch_assoc($result)){
                $parameter_name[]=$row["parameter_name"];
                $parameter_li[]=$row["parameter_li"];
        }
    }
mysqli_close($con);
$json[0] = $parameter_name;
$json[1] = $parameter_li;
echo json_encode($json);
?>