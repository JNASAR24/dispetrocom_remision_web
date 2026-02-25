# Dispetrocom Remission Web

**Digitalización del modelo de remisión físico de Dispetrocom.**

Este proyecto permite generar, visualizar y descargar remisiones digitales en formato PDF, reemplazando el proceso manual en papel. Está diseñado para ser intuitivo, eficiente y compatible con los flujos de trabajo de la empresa.

---

## Estructura del Proyecto

dispetrocom_remision_web/
│── Front/
    │── index.html
    │── remission.html
    │── success.html
│── Logics/
    │── logic-index.js
    │── logic-remission.js
│── Styles/
    │── styles-index.css
    │── styles-remission.css
    │── styles-success.css
│── Imagenes/
    │── logoDispetrocom.png
│── README.md


---

## Requisitos

Para ejecutar este proyecto localmente, solo necesitas:
- Un navegador web moderno (Chrome, Firefox, Edge, etc.).
- No requiere instalación de dependencias externas, ya que utiliza librerías CDN:
  - [html2canvas](https://html2canvas.hertzen.com/) para capturar el contenido como imagen.
  - [jsPDF](https://parall.ax/products/jspdf) para generar el PDF.

---

## Cómo Ejecutar el Proyecto

1. **Clona el repositorio** (Está en GitHub):
   ```bash
   git clone https://github.com/JNASAR24/dispetrocom_remision_web.git

## Tecnologías Utilizadas

HTML5: Estructura del contenido.
CSS3: Estilos y diseño responsivo.
JavaScript: Lógica del formulario, cálculos y generación de PDF.
Librerías externas:

html2canvas: Para capturar el contenido HTML como imagen.
jsPDF: Para generar el PDF a partir de la imagen capturada.

## Instrucciones de Uso


Portada (index.html):

Página de bienvenida con el logo de Dispetrocom.
Redirige automáticamente al formulario de remisión después de 5 segundos.


Formulario de Remisión (remission.html):

Completa los campos requeridos (cliente, fecha, tipo de combustible, galones, etc.).
Los totales se calculan automáticamente.
Haz clic en "Exportar PDF" para generar y descargar el documento.
Si refrescas la página, serás redirigido a la portada.


Página de Éxito (success.html):

Confirma que el PDF se generó correctamente.
Incluye un botón para volver a la portada.


## Notas Importantes

Contador de Remisiones: El sistema lleva un contador automático de remisiones generadas, que se guarda en el localStorage del navegador.
Protección contra refrescos: Si el usuario refresca la página del formulario sin venir de la portada, será redirigido automáticamente a index.html.
Diseño responsivo: Optimizado para visualización en computadoras.

## Licencia
Este proyecto es de uso interno para Dispetrocom y no está sujeto a licencia abierta.