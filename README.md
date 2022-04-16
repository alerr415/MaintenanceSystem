# MaintenanceSystem
## Advanced System Design project
### Procedures

### Bejelentkezes
<p>IN: username (varchar), pass (varchar), qualification</p>
<p>OUT: qualification (varchar), resultcode (int) !!Here qualification refers to specialist, operator or device supervisor</p>
<p>Perfoms log in</p>

### Eszkoz_hozzaadasa
<p>IN: device_name VARCHAR(50), device_category_name VARCHAR(50), descrip LONGTEXT, location LONGTEXT</p>
<p>OUT: resultcode INT</p>
  
### EszkozKategoria_hozzaadasa
<p>IN: device_category_name VARCHAR(50), qualification INT, period VARCHAR(50), norm_time INT, steps_descrip LONGTEXT, parent VARCHAR(50)</p>
<p>OUT: resultcode INT</p>

### Kategoriak_listazasa
<p>List category names</p>

### Kepesitesek_listazasa
<p>List qualification IDs and names

### Kepesites_hozzaadasa
<p>IN: qualification_name VARCHAR(50)</p>
<p>OUT: resultcode INT</p>

### Karbantartok_listazasa
<p>List all attributes of maintenance specialists</p>

### Karbantarto_hozzaadasa
<p>IN: last_name VARCHAR(50), first_name VARCHAR(50), qualification INT</p>
<p>OUT: resultcode INT</p>

### Eszkozok_listazasa
<p>List all attributes of devices</p>

### Feladat_hozzaadasa
<p>IN: device_ID INT, task_name VARCHAR(50), status INT, no_justification LONGTEXT, maint_specialist_ID INT, task_start DATETIME, task_end DATETIME, norm_time VARCHAR(50), steps_descrip LONGTEXT</p>

### Feladatok_listazasa
<p>List all attributes of maintenance task + device location</p>

### Idoszakos_feladat_hozzaadasa
<p>IN: device_category_name VARCHAR(50), task_name VARCHAR(50), status INT, maint_specialist_ID INT, task_start DATETIME, task_end DATETIME, norm_time VARCHAR(50), steps_descrip LONGTEXT, ref_date DATETIME</p>

### Idoszakos_feladat_listazasa
<p>List all attributes of periodic maintenance tasks</p>
