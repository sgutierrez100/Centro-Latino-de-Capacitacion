// Encabezado nuevo (diseño "banda de color") en los cursos activos de LifterLMS.
// Datos por curso: título, área, modalidad, instructor, teléfonos (en el orden indicado), widgets del encabezado viejo a ocultar y CSS extra.
// CLC_CAB_PRUEBA en true: solo se ve con ?clc_cab=1 en la URL (para probar cambios).
if ( ! defined( 'CLC_CAB_PRUEBA' ) ) { define( 'CLC_CAB_PRUEBA', false ); }

function clc_cab_datos() {
	return array(
		142 => array( 'Curso de Income Tax para Principiantes', 'Income Tax', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', 'ca0248f,33f309a,eb6c846', '' ),
		3105 => array( 'California 20 horas CTEC', 'Income Tax', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '5fd7816', '' ),
		7746 => array( 'Curso de Notario Público para Georgia', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', 'c0cbab8,9fbd181,4191597', '' ),
		17831 => array( 'Agente de Aceptación ITIN – IRS', 'Income Tax', 'Online', 'Francisco Arce', '760-553-3256,909-344-0703,909-788-0445', 'b8d4f02', '' ),
		23035 => array( 'Curso Computarizado de Bookkeeper', 'Contabilidad', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '6831b37,f763391', '' ),
		29152 => array( 'Curso Corporación C-1120', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '6546a8a0,73f13436,9df3b26', '' ),
		29155 => array( 'Curso Corporación S-1120S', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '25881793,262bd395,61077e6a', '' ),
		29519 => array( 'Curso Sociedades 1065', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '03d764c,61374296,6938eb10', '' ),
		40467 => array( 'Curso de Inmigración – Módulo 1', 'Migración', 'Zoom', 'Lissette Quintana', '786-300-5926', '9e049f4,a1093d2', '' ),
		40600 => array( 'Curso de Inmigración – Módulo 2', 'Migración', 'Zoom', 'Lissette Quintana', '786-300-5926', 'ca197b2,7bc3b97', '' ),
		41025 => array( 'Curso de Inmigración – Módulo 3', 'Migración', 'Zoom', 'Lissette Quintana', '786-300-5926', 'e585480,e9203af', '' ),
		55917 => array( 'Curso Práctico de Impuestos de Venta – Sales Tax', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '', '' ),
		56437 => array( 'Curso de Traducción de Documentos', 'Notarios', 'Zoom', 'Jose Perez', '786-300-5926', '1e2b93a,db28bb5,b6e48a6', '' ),
		57078 => array( 'Material de Estudio Notario Público para California', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		59212 => array( 'Material de Estudio Licencia de Seguros Propiedad y Pérdida – Sección Federal y Estatal', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '124c029', '' ),
		64552 => array( 'Aprende a Utilizar el Programa de Impuestos (Software de Income Tax)', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '56c3e9c,2d259a99', '' ),
		67874 => array( 'Preparación Examen Vida y/o Salud', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '02ddfcf,988183f,197216e', '' ),
		78577 => array( 'Curso de Divorcio Simple', 'Notarios', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '2c684bd,79658ad', '' ),
		81004 => array( 'Curso QuickBooks Desktop', 'Contabilidad', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '6f49a5d,8c5fe9f', '' ),
		83819 => array( 'Curso de Matrimonios por Notarios', 'Notarios', 'Zoom', 'Mariolga Ruiz', '786-300-5926', 'd1f42da,a133650', '' ),
		111620 => array( 'Taller de Naturalización N-400', 'Migración', 'Zoom', 'Lissette Quintana', '786-300-5926', '848feb3,05fb281,00c4953', '' ),
		129931 => array( 'Curso de Taxes Personales por Zoom', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '8cfb1aa,539589d,458904d', '' ),
		152361 => array( 'Curso de Notario Público para Arkansas', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		183043 => array( 'Curso de Notario Público para Maryland', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '6ae3e4954a7eb', '' ),
		153680 => array( 'Material de Estudio Licencia de Seguros P&C – Líneas Personales', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-788-0445,909-344-0703', '618142a1,377da65c,571b41a5', '' ),
		156885 => array( 'Webinar: Cómo Abrir un Negocio de Preparación de Impuestos', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '73146b5,60cd809,4b9764a', '' ),
		158024 => array( 'Taller Especializado: Visa Juvenil', 'Migración', 'Zoom', 'Lissette Quintana', '786-300-5926', 'c87d96a,280cc3f', '' ),
		159254 => array( 'Taller de Mociones', 'Migración', 'Zoom', 'Lissette Quintana', '786-300-5926', '926cea2,5daedec,ade496f', '' ),
		169668 => array( 'Curso Licencia de Seguros 4-40', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '3fff829,2fa1395,7be4b80', '' ),
		169699 => array( 'Curso de Educación Continua (CE) Licencia de Seguros', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '42617fa,756b291,4b9026f', '' ),
		170349 => array( 'Curso de Contabilidad con Inteligencia Artificial', 'Contabilidad', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '6831b37,f763391', '' ),
		171698 => array( 'Curso Aplicación Online Petición Familiar', 'Migración', 'Zoom', 'Lissette Quintana', '786-300-5926', 'c87d96a,280cc3f', '' ),
		175758 => array( 'Webinar: Nueva Forma 1040 del IRS y Nuevo Schedule 3-A', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', 'ec0c7fc,caf8858,d9dbe13', '' ),
		157510 => array( 'Webinar de Actualización para la Nueva Temporada de Impuestos', 'Income Tax', 'Zoom', 'Mariolga Ruiz', '786-300-5926', '21e2ee7', '', array( 'En este webinar de actualización te presentaremos toda la información más reciente y relevante para la nueva temporada de impuestos. Revisaremos los cambios más importantes establecidos por el IRS, nuevas regulaciones que afectan tanto a contribuyentes como a preparadores de impuestos, y ajustes clave que debes conocer para presentar declaraciones de manera precisa y conforme a la ley.', 'Clase por videoconferencia Zoom · Equipo requerido: computadora con conexión a internet', 'https://centrolatinodecapacitacion.net/calendario-de-cursos', 'Ver la fecha de la clase →' ) ),
		1387 => array( 'California 60 horas CTEC', 'Income Tax', 'Online', '', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		2461 => array( 'Programa de Certificación IRS / AFSP', 'Income Tax', 'Online', '', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		6928 => array( 'Curso Dealer de Autos para Florida', 'Dealer de Autos', 'Online', '', '909-344-0703,760-553-3256,909-788-0445', '', '.elementor-element-d9c3c06 .dfl-band,.elementor-element-d9c3c06 .dfl-eyebrow,.elementor-element-d9c3c06 .dfl-label,.elementor-element-d9c3c06 .dfl-title,.elementor-element-d9c3c06 .dfl-subtitle,.elementor-element-d9c3c06 .dfl-graphic{display:none!important}' ),
		10437 => array( 'Preparación para el Examen de Income Tax de Maryland', 'Income Tax', 'Online', '', '909-344-0703,760-553-3256,909-788-0445', '1bdbc63', '' ),
		29559 => array( 'Curso de Notario Público para Arizona', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '723230a,80d06f7,13a67240', '' ),
		42161 => array( 'Material de Estudio Notario Público para New York', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		52048 => array( 'Material de Estudio Licencia de Seguros P&C – Utah', 'Agente de Seguros', 'Online', '', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		65059 => array( 'Curso de Notario Público para Pennsylvania', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		113270 => array( 'Curso de Notario de Firmas Hipotecarias', 'Notarios', 'Online', 'Sebastian Gutierrez', '760-553-3256', '', '' ),
		154740 => array( 'Renovación Licencia de Income Tax de Maryland', 'Income Tax', 'Online', '', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		164290 => array( 'Curso de Oficiante de Bodas California', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		170766 => array( 'Seguros Vida y/o Salud', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		170957 => array( 'Preparación Examen de Seguros P&C California', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		172337 => array( 'Florida – Prelicencia de Seguros P&C', 'Agente de Seguros', 'Online', 'Francisco Arce', '760-553-3256,909-344-0703,909-788-0445', '1421b44', '' ),
		173802 => array( 'Prelicencia de Seguros P&C California', 'Agente de Seguros', 'Online', 'Francisco Arce', '760-553-3256,909-344-0703', '', '' ),
		174506 => array( 'Material de Estudio para el Examen de Salud', 'Agente de Seguros', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		179623 => array( 'Contabilidad para Dealers de Autos en Florida', 'Contabilidad', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		1716 => array( 'Curso de Notario Público para Illinois', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		61489 => array( 'Curso de Notario Público para Maryland', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		17733 => array( 'Curso de Notario Público para California', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '.elementor-element-248fc7a .nca-top{display:none!important}' ),
		356 => array( 'Curso de Notario Público para Florida', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '.elementor-element-87fa0e5 .nhc-top{display:none!important}' ),
		35048 => array( 'Curso de Notario Público para New York', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		68294 => array( 'Curso de Notario Público para Tennessee', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '785bffc,6380fcd,960a1b4,5252871', '' ),
		1142 => array( 'Curso de Notario Público para Texas', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '.elementor-element-179aeab .ntc-top{display:none!important}' ),
		162977 => array( 'Curso de Notario Público de Maryland', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		146954 => array( 'Curso de Notario Público para Iowa', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '1cc4a39,511c15a,ffdb63c,8ab933a', '' ),
		22188 => array( 'Curso de Notario Público para Nevada', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		136200 => array( 'Curso de Notario Público para New Mexico', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		38394 => array( 'Curso de Notario Público para New Jersey', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '', '' ),
		111340 => array( 'Renovación de Notario Público para Florida', 'Notarios', 'Online', 'Francisco Arce', '909-344-0703,760-553-3256,909-788-0445', '79bdc91,f9bddb1,9ac932f', '' ),
		110285 => array( 'Curso de Notario Remoto – Florida', 'Notarios', 'Online', 'Sebastian Gutierrez', '760-553-3256', '', '' ),
		121086 => array( 'Curso de Notario Remoto – New Jersey', 'Notarios', 'Online', 'Sebastian Gutierrez', '760-553-3256', '', '' ),
		123255 => array( 'Curso de Notario Remoto – New York', 'Notarios', 'Online', 'Sebastian Gutierrez', '760-553-3256', '', '' ),
		122651 => array( 'Curso de Notario Remoto – Pennsylvania', 'Notarios', 'Online', 'Sebastian Gutierrez', '760-553-3256', '', '' ),
		108555 => array( 'Curso de Notario Remoto – Texas', 'Notarios', 'Online', 'Sebastian Gutierrez', '760-553-3256', '', '' ),
	);
}

function clc_cab_activo() {
	if ( ! is_singular( 'course' ) ) { return false; }
	$d = clc_cab_datos();
	if ( ! isset( $d[ get_queried_object_id() ] ) ) { return false; }
	// Cursos en revisión: solo con ?clc_cab=1 hasta que se aprueben.
	$prueba = in_array( get_queried_object_id(), array(), true );
	return ! ( CLC_CAB_PRUEBA || $prueba ) || isset( $_GET['clc_cab'] );
}

function clc_cab_tel( $t ) {
	$n = preg_replace( '/\D/', '', $t );
	if ( strlen( $n ) !== 10 ) { return esc_html( $t ); }
	$v = '(' . substr( $n, 0, 3 ) . ') ' . substr( $n, 3, 3 ) . '-' . substr( $n, 6 );
	return '<a href="tel:+1' . $n . '">' . $v . '</a>';
}

function clc_cab_html( $id ) {
	$d = clc_cab_datos();
	list( $titulo, $area, $modo, $inst, $tels ) = $d[ $id ];
	$iconos = array(
		'Income Tax'        => '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
		'Notarios'          => '<path d="M9 3h6v5l3 3H6l3-3z"/><path d="M5 14h14v3H5zM4 20h16"/>',
		'Agente de Seguros' => '<path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
		'Migración'         => '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
		'Contabilidad'      => '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M8 15h2M12 15h4"/>',
		'Dealer de Autos'   => '<path d="M5 16h14l-1.5-6.5A2 2 0 0 0 15.6 8H8.4a2 2 0 0 0-1.9 1.5z"/><circle cx="8" cy="16.5" r="2"/><circle cx="16" cy="16.5" r="2"/>',
	);
	$ico   = isset( $iconos[ $area ] ) ? $iconos[ $area ] : $iconos['Income Tax'];
	$zoom  = ( 'Zoom' === $modo );
	$celdas = '';
	if ( is_user_logged_in() ) {
		$u   = wp_get_current_user();
		$nom = trim( $u->first_name . ' ' . $u->last_name );
		if ( '' === $nom ) { $nom = $u->display_name; }
		$ini = strtoupper( mb_substr( $u->first_name ?: $nom, 0, 1 ) . mb_substr( $u->last_name, 0, 1 ) );
		$celdas .= '<div class="cx-celda"><i>' . esc_html( $ini ) . '</i><div><span>Estudiante</span><b>' . esc_html( $nom ) . '</b></div></div>';
	}
	if ( $inst ) {
		$celdas .= '<div class="cx-celda"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></i><div><span>Instructor</span><b>' . esc_html( $inst ) . '</b></div></div>';
	}
	$t = array_map( 'clc_cab_tel', array_filter( array_map( 'trim', explode( ',', $tels ) ) ) );
	$celdas .= '<div class="cx-celda"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg></i><div><span>Contacto · lunes a sábado, 1 a 7 pm</span><small>' . implode( ' · ', $t ) . '</small></div></div>';
	$n = substr_count( $celdas, 'cx-celda' );
	$h  = '<header class="clc-cc" aria-label="Encabezado del curso"><div class="cx-banda"><div class="cx-dentro"><div>';
	$h .= '<p class="cx-ruta">' . ( $zoom ? 'Clases en vivo por Zoom' : 'Curso en línea' ) . ' · ' . esc_html( $area ) . '</p>';
	$h .= '<h1 class="cx-h1">' . esc_html( $titulo ) . '</h1>';
	$h .= '<div class="cx-etqs"><span>' . ( $zoom ? 'Por Zoom' : 'Online' ) . '</span><span>100% en español</span><span>' . esc_html( $area ) . '</span></div>';
	$h .= '</div><div class="cx-icono" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' . $ico . '</svg></div></div></div>';
	$h .= '<div class="cx-barra cx-n' . $n . '">' . $celdas . '</div>';
	// Opcional: descripción, detalle y enlace a la fecha de la clase, debajo de la barra.
	if ( ! empty( $d[ $id ][7] ) ) {
		list( $desc, $det, $url, $txt ) = $d[ $id ][7];
		$h .= '<div class="cx-info"><p>' . esc_html( $desc ) . '</p><div class="cx-pie"><small>' . esc_html( $det ) . '</small>';
		$h .= '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' . esc_html( $txt ) . '</a></div></div>';
	}
	$h .= '</header>';
	return $h;
}

add_filter( 'the_content', function ( $c ) {
	static $hecho = false;
	if ( $hecho || ! clc_cab_activo() || ! in_the_loop() || ! is_main_query() ) { return $c; }
	$hecho = true;
	return clc_cab_html( get_queried_object_id() ) . $c;
}, 1000 );

add_action( 'wp_head', function () {
	if ( ! clc_cab_activo() ) { return; }
	$d   = clc_cab_datos();
	$fil = $d[ get_queried_object_id() ];
	$ocu = '';
	foreach ( array_filter( explode( ',', $fil[5] ) ) as $w ) { $ocu .= '.elementor-element-' . $w . ','; }
	echo '<style id="clc-cab">';
	if ( $ocu ) { echo rtrim( $ocu, ',' ) . '{display:none!important}'; }
	echo $fil[6];
	?>
.single-course .entry-header,.single-course .llms-instructor-info{display:none!important}
.clc-cc{--texto:#1F2A33;--suave:#5A6878;--borde:#DDE8F0;--verde:#61CE70;--verde-osc:#237A35;--verde-med:#2E9E44;--azul:#1B7FAE;max-width:1176px;margin:10px auto 34px;font-family:'Nunito Sans',sans-serif;color:var(--texto);line-height:1.55;text-align:left}
.clc-cc *,.clc-cc *::before,.clc-cc *::after{box-sizing:border-box}
.clc-cc p,.clc-cc h1{margin:0}
.clc-cc a{text-decoration:none}
.clc-cc .cx-banda{position:relative;overflow:hidden;border-radius:28px;padding:40px 48px 92px;color:#fff;background:linear-gradient(120deg,#2E9E44 0%,#1B7FAE 62%,#3FA9D6 100%)}
.clc-cc .cx-banda::before{content:"";position:absolute;inset:0;opacity:.35;background-image:radial-gradient(rgba(255,255,255,.35) 1px,transparent 1px);background-size:22px 22px;-webkit-mask-image:linear-gradient(90deg,transparent 35%,#000);mask-image:linear-gradient(90deg,transparent 35%,#000)}
.clc-cc .cx-banda::after{content:"";position:absolute;right:-90px;bottom:-140px;width:380px;height:380px;border-radius:50%;background:rgba(255,255,255,.10)}
.clc-cc .cx-dentro{position:relative;z-index:1;display:flex;justify-content:space-between;gap:30px;align-items:center}
.clc-cc .cx-ruta{font-family:Poppins,sans-serif;font-size:12.5px;font-weight:600;letter-spacing:1.3px;text-transform:uppercase;color:#fff!important;opacity:.92}
.clc-cc .cx-h1{font-family:Poppins,sans-serif!important;font-size:40px!important;font-weight:700!important;letter-spacing:-.5px;line-height:1.12!important;margin:10px 0 0!important;color:#fff!important;max-width:820px}
.clc-cc .cx-etqs{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.clc-cc .cx-etqs span{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:5px 14px;font-family:Poppins,sans-serif;font-size:13px;font-weight:600;color:#fff}
.clc-cc .cx-icono{flex:none;display:grid;place-items:center;width:130px;height:130px;border-radius:34px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.4);box-shadow:0 20px 40px rgba(0,0,0,.12);transform:rotate(6deg)}
.clc-cc .cx-icono svg{width:62px;height:62px;transform:rotate(-6deg)}
.clc-cc .cx-barra{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr 1.5fr;margin:-58px 28px 0;background:#fff;border:1px solid var(--borde);border-radius:20px;box-shadow:0 18px 40px rgba(15,40,60,.10)}
.clc-cc .cx-barra.cx-n2{grid-template-columns:1fr 1.6fr}.clc-cc .cx-barra.cx-n1{grid-template-columns:1fr}
.clc-cc .cx-celda{display:flex;gap:14px;align-items:center;padding:20px 24px;min-width:0}
.clc-cc .cx-celda+.cx-celda{border-left:1px solid var(--borde)}
.clc-cc .cx-celda>i{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;flex:none;background:#EFFAF1;color:var(--verde-med);font-style:normal;font-family:Poppins,sans-serif;font-weight:700;font-size:15px}
.clc-cc .cx-celda>i svg{width:22px;height:22px}
.clc-cc .cx-celda span{display:block;font-family:Poppins,sans-serif;font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--suave)}
.clc-cc .cx-celda b{display:block;font-family:Poppins,sans-serif;font-size:16px;font-weight:700;color:var(--texto);line-height:1.3}
.clc-cc .cx-celda small{display:block;font-size:15px;color:var(--suave);line-height:1.5}
.clc-cc .cx-celda a{color:var(--azul)!important;font-weight:700;white-space:nowrap}
.clc-cc .cx-celda a:hover{color:var(--verde-osc)!important;text-decoration:underline}
.clc-cc .cx-info{margin:22px 28px 0;padding:22px 26px;background:#F7FBFD;border:1px solid var(--borde);border-radius:18px}
.clc-cc .cx-info p{font-size:16px;color:var(--texto)}
.clc-cc .cx-pie{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px 20px;margin-top:14px;padding-top:14px;border-top:1px solid var(--borde)}
.clc-cc .cx-pie small{font-size:14px;color:var(--suave)}
.clc-cc .cx-pie a{display:inline-block;padding:10px 20px;border-radius:999px;background:var(--verde-med);color:#fff!important;font-family:Poppins,sans-serif;font-size:14px;font-weight:600}
.clc-cc .cx-pie a:hover{background:var(--verde-osc)}
@media (max-width:900px){.clc-cc .cx-info{margin:18px 14px 0}.clc-cc .cx-banda{padding:32px 26px 84px}.clc-cc .cx-icono{display:none}.clc-cc .cx-h1{font-size:32px!important}.clc-cc .cx-barra,.clc-cc .cx-barra.cx-n2{grid-template-columns:1fr;margin:-52px 14px 0}.clc-cc .cx-celda+.cx-celda{border-left:0;border-top:1px solid var(--borde)}}
@media (max-width:560px){.clc-cc .cx-banda{border-radius:20px;padding:26px 20px 80px}.clc-cc .cx-h1{font-size:26px!important}.clc-cc .cx-barra{margin:-50px 8px 0}.clc-cc .cx-celda{padding:15px 16px}}
	<?php
	echo '</style>';
} );