<?php
require_once 'db_connect.php';
$user_id = ($_POST['userName']=="Kate") ? 1 : 2;
$li_parameter = $_POST['liParameter'];
$start_date = $_POST['startDate'];
$end_date = $_POST['endDate'];
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
