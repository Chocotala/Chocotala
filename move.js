const fs = require('fs');
let html = fs.readFileSync('c:/Users/Leo/.gemini/antigravity/scratch/chocotala/index.html', 'utf8');

// 1. Extract the section
const turismoStart = html.indexOf('        <!-- Touristic Experience Section -->');
const turismoEnd = html.indexOf('        <!-- Testimonials Section -->');
if (turismoStart === -1 || turismoEnd === -1) {
    console.error("Could not find section markers");
    process.exit(1);
}
const turismoBlock = html.substring(turismoStart, turismoEnd);

// Remove it from original position
html = html.substring(0, turismoStart) + html.substring(turismoEnd);

// Find insertion point
const experienceStart = html.indexOf('        <!-- Experience Section -->');
if (experienceStart === -1) {
    console.error("Could not find Experience Section marker");
    process.exit(1);
}

// Insert it
html = html.substring(0, experienceStart) + turismoBlock + html.substring(experienceStart);

// 2. Update Nav
let navOld = `<nav class="nav-links">
                <a href="#inicio">Inicio</a>
                <a href="#experiencia">La Experiencia</a>
                <a href="#productos">Chocobombas</a>
                <a href="#fotografia">Fotografía</a>
                <a href="#turismo">Turismo</a>
                <a href="#contacto" class="btn btn-outline-gold">Pedir Ahora</a>
            </nav>`;
let navOldNormalized = navOld.replace(/\r\n/g, '\n');
let htmlNormalized = html.replace(/\r\n/g, '\n');

let navNew = `<nav class="nav-links">
                <a href="#inicio">Inicio</a>
                <a href="#turismo">ChocoMomentos</a>
                <a href="#experiencia">El Ritual</a>
                <a href="#productos">Catálogo</a>
                <a href="#fotografia">Fotografía</a>
                <a href="#contacto" class="btn btn-outline-gold">Pedir Ahora</a>
            </nav>`;

if (htmlNormalized.indexOf(navOldNormalized) !== -1) {
    htmlNormalized = htmlNormalized.replace(navOldNormalized, navNew);
} else {
    console.error("Could not find nav block");
}

// 3. Update Footer
let footerOld = `<ul>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#experiencia">Experiencia</a></li>
                    <li><a href="#productos">Productos</a></li>
                    <li><a href="#turismo">Turismo</a></li>
                </ul>`;

let footerNew = `<ul>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#turismo">ChocoMomentos</a></li>
                    <li><a href="#experiencia">El Ritual</a></li>
                    <li><a href="#productos">Catálogo</a></li>
                </ul>`;

if (htmlNormalized.indexOf(footerOld) !== -1) {
    htmlNormalized = htmlNormalized.replace(footerOld, footerNew);
} else {
    console.error("Could not find footer block");
}

// 4. Update Header "La Experiencia Chocotala" -> "El Ritual Chocotala"
htmlNormalized = htmlNormalized.replace('<h2 class="section-title">La Experiencia Chocotala</h2>', '<h2 class="section-title">El Ritual Chocotala</h2>');

fs.writeFileSync('c:/Users/Leo/.gemini/antigravity/scratch/chocotala/index.html', htmlNormalized);
console.log("Success");
