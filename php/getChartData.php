<?php
require_once 'db_connect.php';
require_once 'prepareRequestData.php';

$user_name = str_replace(array('\n','\r\n'), '', $_POST['userName']);
$li_parameter = str_replace(array('\n','\r\n'), '', $_POST['liParameter']);
$start_date = str_replace(array('\n','\r\n'), '', $_POST['startDate']);
$end_date = str_replace(array('\n','\r\n'), '', $_POST['endDate']);

$user_id = (sanitizeMySQL($con,$user_name) == "Kate") ? 1 : 2;
$li_parameter = sanitizeMySQL($con,$li_parameter);
$start_date = sanitizeMySQL($con,$start_date);
$end_date = sanitizeMySQL($con,$end_date);

$query = "
          select t1.report_date,
                 t1.parameter_value
            from body_parameters_values as t1
            join body_parameters        as t2 on t2.parameter_id = t1.parameter_id
                                             and t2.parameter_li = '".$li_parameter.     
         "' where t1.user_id = ".$user_id.
         "   and t1.report_date between '".$start_date."' and '".$end_date.
         "' order by t1.report_date";

$result=mysqli_query($con,$query);
$report_date = array();
$parameter_value = array();
$json = array();
    if(mysqli_num_rows($result)){
        while($row=mysqli_fetch_assoc($result)){
                $report_date[]=$row["report_date"];
                $parameter_value[]=$row["parameter_value"];
        }
    }
mysqli_close($con);
$json[0] = $report_date;
$json[1] = $parameter_value;
echo json_encode($json, JSON_NUMERIC_CHECK);
?>
