$html = Get-Content -Raw -Encoding UTF8 index.html
$html = $html -replace "`r`n", "`n"

$turisStart = $html.IndexOf("        <!-- Touristic Experience Section -->")
$turisEnd = $html.IndexOf("        <!-- Testimonials Section -->")
$turismoBlock = $html.Substring($turisStart, $turisEnd - $turisStart)
$html = $html.Remove($turisStart, $turisEnd - $turisStart)

$expStart = $html.IndexOf("        <!-- Experience Section -->")
$html = $html.Insert($expStart, $turismoBlock)

$navOld = "<nav class=`"nav-links`">
                <a href=`"#inicio`">Inicio</a>
                <a href=`"#experiencia`">La Experiencia</a>
                <a href=`"#productos`">Chocobombas</a>
                <a href=`"#fotografia`">Fotografía</a>
                <a href=`"#turismo`">Turismo</a>
                <a href=`"#contacto`" class=`"btn btn-outline-gold`">Pedir Ahora</a>
            </nav>"
$navNew = "<nav class=`"nav-links`">
                <a href=`"#inicio`">Inicio</a>
                <a href=`"#turismo`">ChocoMomentos</a>
                <a href=`"#experiencia`">El Ritual</a>
                <a href=`"#productos`">Catálogo</a>
                <a href=`"#fotografia`">Fotografía</a>
                <a href=`"#contacto`" class=`"btn btn-outline-gold`">Pedir Ahora</a>
            </nav>"

$html = $html.Replace($navOld.Replace("`r`n","`n"), $navNew.Replace("`r`n","`n"))

$html = $html.Replace("<h2 class=`"section-title`">La Experiencia Chocotala</h2>", "<h2 class=`"section-title`">El Ritual Chocotala</h2>")

$footerOld = "<ul>
                    <li><a href=`"#inicio`">Inicio</a></li>
                    <li><a href=`"#experiencia`">Experiencia</a></li>
                    <li><a href=`"#productos`">Productos</a></li>
                    <li><a href=`"#turismo`">Turismo</a></li>
                </ul>"
$footerNew = "<ul>
                    <li><a href=`"#inicio`">Inicio</a></li>
                    <li><a href=`"#turismo`">ChocoMomentos</a></li>
                    <li><a href=`"#experiencia`">El Ritual</a></li>
                    <li><a href=`"#productos`">Catálogo</a></li>
                </ul>"

$html = $html.Replace($footerOld.Replace("`r`n","`n"), $footerNew.Replace("`r`n","`n"))

Set-Content -Path index.html -Value $html -Encoding UTF8
Write-Host "Success"
