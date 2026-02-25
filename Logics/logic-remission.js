const galones = document.querySelectorAll(".galones");
const tipos = document.querySelectorAll(".tipo");

const totalBiodiesel = document.getElementById("totalBiodiesel");
const totalCorriente = document.getElementById("totalCorriente");
const totalExtra = document.getElementById("totalExtra");
const granTotal = document.getElementById("granTotal");

/* ================= CONTADOR REMISION ================= */

const inputRemision = document.getElementById("numeroRemision");
let numeroRemisionActual = "";

function generarNumeroRemision() {
    let contador = localStorage.getItem("contadorRemision");
    if (!contador) {
        contador = 1;
    } else {
        contador = Number(contador) + 1;
    }
    localStorage.setItem("contadorRemision", contador);
    const numeroFormateado = "#" + String(contador).padStart(7, "0");
    inputRemision.value = numeroFormateado;
    numeroRemisionActual = numeroFormateado;
}

function generarNumeroRemisionR() {
    localStorage.removeItem("contadorRemision");
    alert("Contador de remisión reiniciado");
    numeroRemisionActual = "";
}

function calcular() {
    let biodiesel = 0;
    let corriente = 0;
    let extra = 0;

    tipos.forEach((select, i) => {
        const tipo = select.value;
        const valor = Number(galones[i].value || 0);

        if (tipo === "BIODIESEL") biodiesel += valor;
        if (tipo === "GASOLINA CORRIENTE") corriente += valor;
        if (tipo === "GASOLINA EXTRA") extra += valor;
    });

    totalBiodiesel.value = biodiesel;
    totalCorriente.value = corriente;
    totalExtra.value = extra;
    granTotal.value = biodiesel + corriente + extra;
}

galones.forEach(g => g.addEventListener("input", calcular));
tipos.forEach(t => t.addEventListener("change", calcular));

generarNumeroRemision();
calcular();

/* FIRMA */
const canvas = document.getElementById("firma");
const ctx = canvas.getContext("2d");
let dibujando = false;

function pos(e) {
    const r = canvas.getBoundingClientRect();
    return {
        x: (e.touches ? e.touches[0].clientX : e.clientX) - r.left,
        y: (e.touches ? e.touches[0].clientY : e.clientY) - r.top
    };
}

canvas.addEventListener("mousedown", e => {
    dibujando = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
});
canvas.addEventListener("mousemove", e => {
    if (!dibujando) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
});
canvas.addEventListener("mouseup", () => dibujando = false);

canvas.addEventListener("touchstart", e => {
    dibujando = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
});
canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!dibujando) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
});
canvas.addEventListener("touchend", () => dibujando = false);

function limpiar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const elemento = document.getElementById("remision");
    const canvasImg = await html2canvas(elemento, {
        scale: 2,
        useCORS: true
    });
    const imgData = canvasImg.toDataURL("image/png");
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = canvasImg.height * imgWidth / canvasImg.width;
    let finalWidth = imgWidth;
    let finalHeight = imgHeight;

    if (imgHeight > pageHeight) {
        const scale = pageHeight / imgHeight;
        finalWidth = imgWidth * scale;
        finalHeight = imgHeight * scale;
    }
    const x = (pageWidth - finalWidth) / 2;
    const y = 0;
    doc.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
    doc.save(`Remision_${numeroRemisionActual}.pdf`);
    //generarNumeroRemision();
    window.location.href = "success.html";
}

window.addEventListener('load', function() {
        if (!sessionStorage.getItem('fromPortada')) {
            window.location.href = 'welcome.html';
        } else {
            sessionStorage.removeItem('fromPortada');
        }
    });
