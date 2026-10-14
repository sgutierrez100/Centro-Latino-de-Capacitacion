"""Lista de cursos de la página principal (centrolatinodecapacitacion.com), agrupados por área.
Cada curso: (nombre, archivo de imagen nueva sin extensión, enlace en el .net)."""

N = 'https://centrolatinodecapacitacion.net/'

ICONOS = {
    'doc': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    'pluma': '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    'escudo': '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    'globo': '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    'calc': '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 10h2M12 10h2M16 10h0M8 14h2M12 14h2M8 18h8"/>',
    'pc': '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    'auto': '<path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>',
    'video': '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3"/>',
    'banco': '<path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18M12 3 3 8h18l-9-5z"/>',
    'id': '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M14 10h4M14 13h3"/>',
    'carrito': '<path d="M3 4h2l2.5 11h11L21 7H7"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
    'libro': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M8 7h8M8 11h6"/>',
    'sello': '<path d="M9 3h6v5l2 3H7l2-3z"/><path d="M5 14h14v3H5zM4 21h16"/>',
    'idioma': '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
    'anillos': '<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="m9 6 1.5-3h-3zM15 6l1.5-3h-3z"/>',
    'balanza': '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7h6zM19 7l-3 7h6z"/>',
    'casa': '<path d="M3 21h18M5 21V10l7-6 7 6v11M10 21v-5h4v5"/>',
    'grafica': '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-6"/>',
    'chispa': '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    'nomina': '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
    'familia': '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 21c.5-4 2.8-6 5.5-6s5 2 5.5 6M13.5 21c.4-3 1.8-4.5 3.5-4.5s3.1 1.5 3.5 4.5"/>',
    'bandera': '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    'lupa': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6"/>',
}

AREAS = [
    ('income-tax', 'Income Tax', 'doc', 'verde', [
        ('Curso de Income Tax Online', 'curso-de-income-tax-online', 'doc', 'curso-de-income-tax'),
        ('Curso de Income Tax por Zoom', 'curso-de-income-tax-por-zoom', 'video', 'curso-de-income-tax-por-zoom/'),
        ('Curso de Impuestos Corporativos', 'curso-de-impuestos-corporativos', 'casa', 'curso-corporativo-de-income-tax/'),
        ('Software de Income Tax', 'software-de-income-tax', 'pc', 'software-de-income-tax-programa-de-impuestos/'),
        ('Curso Agente ITIN (CAA)', 'curso-agente-itin-caa', 'id', 'course/agente-de-aceptacion-itin-irs/'),
        ('Productos Bancarios (Refund)', 'productos-bancarios-refund', 'banco', 'registro-productos-bancarios/'),
        ('Cursos CTEC 60 y 20 horas', 'cursos-ctec-california', 'libro', 'registracion-ctec-california-60-horas-o-20-horas/'),
        ('Bond CTEC California', 'bond-ctec-california', 'escudo', 'california-tax-preparer-bond'),
        ('Curso de Sales Tax', 'curso-de-sales-tax', 'carrito', 'course/curso-practico-impuestos-de-venta-sales-tax/'),
        ('Examen de Income Tax de Maryland', 'examen-income-tax-maryland', 'bandera', 'licencia-de-income-tax-de-maryland'),
        ('Webinar Nueva Forma 1040 y Schedule C', 'webinar-nueva-forma-1040-schedule-c', 'video', 'course/webinar-nueva-forma-1040-del-irs-y-nuevo-schedule-c-de-carga-publica/'),
    ]),
    ('notarios', 'Notarios', 'pluma', 'celeste', [
        ('Curso de Notario Público', 'curso-de-notario-publico', 'sello', 'curso-de-notario-publico/'),
        ('Las Herramientas del Notario', 'herramientas-del-notario', 'sello', 'las-herramientas-del-notario/'),
        ('Curso de Notario Remoto', 'curso-de-notario-remoto', 'pc', 'curso-de-notario-remoto/'),
        ('Notario de Firmas Hipotecarias', 'notario-de-firmas-hipotecarias', 'casa', 'curso-notario-de-firmas-hipotecarias/'),
        ('Traducción de Documentos', 'curso-traduccion-de-documentos', 'idioma', 'course/curso-traduccion-de-documentos/'),
        ('Curso de Divorcio Simple', 'curso-de-divorcio-simple', 'balanza', 'course/curso-divorcio-simple/'),
        ('Curso de Oficiante de Bodas', 'curso-de-oficiante-de-bodas', 'anillos', 'curso-oficiante-de-bodas/'),
    ]),
    ('seguros', 'Agente de Seguros', 'escudo', 'verde', [
        ('Curso de Agente / Broker de Seguros', 'curso-de-agente-de-seguros', 'escudo', 'licencia-agente-de-seguros/'),
        ('Análisis de tu Examen de Seguros', 'analisis-examen-de-seguros', 'lupa', 'analisis-resultados-examen-seguros/'),
    ]),
    ('migracion', 'Migración', 'globo', 'celeste', [
        ('Curso Intensivo de Inmigración', 'curso-intensivo-de-inmigracion', 'globo', 'membership/curso-inmigracion-todos-los-modulos/'),
        ('Inmigración · Módulo 1', 'curso-inmigracion-modulo-1', 'globo', 'course/curso-inmigracion-modulo-1/'),
        ('Inmigración · Módulo 2', 'curso-inmigracion-modulo-2', 'globo', 'course/curso-inmigracion-modulo-2/'),
        ('Inmigración · Módulo 3', 'curso-inmigracion-modulo-3', 'globo', 'course/curso-inmigracion-modulo-3/'),
        ('Taller de Naturalización N-400', 'taller-naturalizacion-n-400', 'bandera', 'course/curso-actualizacion-n-400-ciudadania/'),
        ('Taller de Visa Juvenil', 'taller-visa-juvenil', 'id', 'course/taller-especializado-visa-juvenil/'),
        ('Taller de Mociones', 'taller-de-mociones', 'balanza', 'course/taller-de-mociones/'),
        ('Petición Familiar Online', 'peticion-familiar-online', 'familia', 'course/curso-aplicacion-online-peticion-familiar/'),
    ]),
    ('contabilidad', 'Contabilidad', 'calc', 'verde', [
        ('Curso de QuickBooks Online', 'curso-de-quickbooks-online', 'grafica', 'aprende-contabilidad-con-quickbooks/'),
        ('Curso de QuickBooks Desktop', 'curso-de-quickbooks-desktop', 'pc', 'aprende-contabilidad-con-quickbooks/'),
        ('Contabilidad con Inteligencia Artificial', 'contabilidad-con-inteligencia-artificial', 'chispa', 'course/curso-contabilidad-con-inteligencia-artificial/'),
        ('Nóminas de Pago (Payroll)', 'curso-de-nominas-payroll', 'nomina', 'aprende-a-crear-nominas-de-pago-payroll/'),
        ('Creación de Empresas', 'curso-creacion-de-empresas', 'casa', 'curso-creacion-de-empresas/'),
    ]),
    ('tecnologia', 'Tecnología', 'pc', 'celeste', [
        ('Webinar de ChatGPT', 'webinar-de-chatgpt', 'chispa', 'course/webinar-chat-gpt/'),
        ('Webinar de CapCut', 'webinar-de-capcut', 'video', 'course/webinar-capcut/'),
        ('Webinar de Notion', 'webinar-de-notion', 'libro', 'course/webinar-notion/'),
        ('Webinar de Canva', 'webinar-de-canva', 'pluma', 'course/webinar-canva/'),
        ('Negocios Digitales con IA', 'negocios-digitales-con-ia', 'chispa', 'course/sistema-de-negocios-digitales-con-ia/'),
    ]),
    ('dealer', 'Dealer de Autos', 'auto', 'verde', [
        ('Curso de Dealer de Autos', 'curso-de-dealer-de-autos', 'auto', 'curso-dealer-de-autos'),
    ]),
]
