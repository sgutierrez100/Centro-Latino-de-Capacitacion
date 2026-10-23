# App de Centro Latino de Capacitación

App para Android y iPhone hecha con [Capacitor](https://capacitorjs.com). Abre el sitio
`https://centrolatinodecapacitacion.com/` dentro de la app. Los cambios que se hagan en el
sitio aparecen en la app sin publicar una versión nueva.

- **Nombre:** Centro Latino
- **Identificador:** `com.centrolatinodecapacitacion.app`
- **Navegación:**
  - Dentro de la app: .com, .net y .org.
  - Fuera de la app: WhatsApp, teléfono y otros sitios se abren en su app normal.
- **Sin internet:** muestra la pantalla `www/sin-conexion.html`.
- **Ícono y pantalla de inicio:** están en `assets/`. Si cambian, se regeneran con `npm run assets`.

## Requisitos

- Node 20 o más nuevo.
- Para Android: JDK 21 y el Android SDK (o Android Studio).
- Para iPhone: una Mac con Xcode, o un servicio de compilación en la nube con Mac (por ejemplo Codemagic o GitHub Actions).

## Comandos

```bash
npm install
npx cap sync              # copia la configuración a android/ e ios/
npm run android:debug     # APK de prueba: android/app/build/outputs/apk/debug/app-debug.apk
npm run android:release   # paquete para Google Play (.aab), requiere la llave de firma
npx cap open ios          # abre el proyecto en Xcode (en una Mac)
```

## Publicar en Google Play

1. Crear una cuenta de desarrollador de Google Play ($25, un solo pago).
2. Crear la **llave de firma** (upload key) y guardarla en un lugar seguro.
   - Si se pierde, no se pueden publicar actualizaciones con esa llave.
   - **Nunca** se sube al repositorio. El `.gitignore` ya excluye `*.jks`, `*.keystore` y `keystore.properties`.
3. Compilar con `npm run android:release` y subir el `.aab` en Play Console.
4. Llenar la ficha de la tienda:
   - Capturas, descripción y política de privacidad (`/politica-de-privacidad`).
   - Formulario de seguridad de datos y clasificación de contenido.

## Publicar en App Store

1. Crear una cuenta de Apple Developer ($99 al año).
2. En una Mac:
   - `npx cap open ios`
   - Elegir el equipo de firma.
   - Ir a Product → Archive y subir a App Store Connect.
3. Apple puede rechazar apps que solo muestran un sitio web (regla 4.2, "funcionalidad mínima").
   - Para mejorar las probabilidades conviene agregar funciones propias de app, por ejemplo **notificaciones**.

## Importante: venta de cursos dentro de la app

Las tiendas tienen reglas sobre la venta de **contenido digital**, y los cursos en línea lo son:

- **Apple:** normalmente exige usar su sistema de pagos, con comisión de 15–30 %.
- **Google:** tiene reglas parecidas.

En EE. UU. estas reglas han cambiado recientemente, así que hay que **revisar las reglas vigentes antes de publicar**. Opciones comunes:

- Ocultar la compra dentro de la app y que los estudiantes compren en el sitio web.
- Usar el sistema de pagos de cada tienda.
