// Lógica de la calculadora. Los datos están en datos.js.
(() => {
    const STORAGE_KEY = 'calculadora-colectivos-v1';
    const TRASLADOS_KM = {
        'ida-noria': KM_LA_NORIA,
        'ida-117': KM_117,
        'vuelta-noria': KM_LA_NORIA,
        'vuelta-117': KM_117
    };

    const $ = (id) => document.getElementById(id);
    const selectorLinea = $('selector-linea');
    const selectIda = $('select-ida');
    const selectVuelta = $('select-vuelta');
    const contenedor = $('vueltas-container');
    const errorMsg = $('error-msg');
    const checksTraslado = document.querySelectorAll('[data-traslado]');

    // Orden en que se muestran las líneas (JS ordena solo las claves numéricas, por eso se fija acá)
    const LINEAS = ['188', ...Object.keys(rutasData).filter(l => l !== '188')];
    let estado = { linea: LINEAS[0], traslados: {}, vueltas: [] };

    const fmt = (n) => n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // ---------- Guardado (para no perder la planilla al recargar) ----------
    function guardar() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(estado)); } catch (e) { /* sin almacenamiento */ }
    }
    function cargar() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data && rutasData[data.linea] && Array.isArray(data.vueltas)) estado = data;
        } catch (e) { /* ignorar */ }
    }

    // ---------- Helpers ----------
    function tramosDe(linea, ramal, sentido) {
        if (ramal === 'NINGUNO') return [];
        const lista = sentido === 'IDA' ? rutasData[linea][ramal].ida : rutasData[linea][ramal].vuelta;
        return lista.map(t => ({ ...t, realizado: true }));
    }

    function opcionesRamal(linea, seleccionado, textoNinguno) {
        let html = `<option value="NINGUNO"${seleccionado === 'NINGUNO' ? ' selected' : ''}>${textoNinguno}</option>`;
        Object.keys(rutasData[linea]).forEach(r => {
            html += `<option value="${r}"${seleccionado === r ? ' selected' : ''}>${rutasData[linea][r].nombre}</option>`;
        });
        return html;
    }

    function calcularKmSentido(tramos) {
        let total = 0, realizado = 0;
        tramos.forEach(t => { total += t.km; if (t.realizado) realizado += t.km; });
        return { total, realizado, perdido: Math.max(0, total - realizado) };
    }

    function calcVuelta(v) {
        const ida = calcularKmSentido(v.tramosIda);
        const vta = calcularKmSentido(v.tramosVuelta);
        return { total: ida.total + vta.total, realizado: ida.realizado + vta.realizado, perdido: ida.perdido + vta.perdido };
    }

    // ---------- Render de la configuración ----------
    function renderLinea() {
        selectorLinea.innerHTML = LINEAS.map(l =>
            `<button type="button" role="radio" aria-checked="${l === estado.linea}" data-linea="${l}">Línea ${l}</button>`
        ).join('');
        const primero = Object.keys(rutasData[estado.linea])[0];
        selectIda.innerHTML = opcionesRamal(estado.linea, primero, '— No hizo ida —');
        selectVuelta.innerHTML = opcionesRamal(estado.linea, primero, '— No hizo vuelta —');
    }

    function renderTraslados() {
        checksTraslado.forEach(c => { c.checked = !!estado.traslados[c.dataset.traslado]; });
    }

    // ---------- Render de las vueltas ----------
    function renderSentido(v, vi, sentido) {
        const esIda = sentido === 'IDA';
        const ramal = esIda ? v.ramalIda : v.ramalVuelta;
        const tramos = esIda ? v.tramosIda : v.tramosVuelta;
        const titulo = esIda ? '➡ Ida' : '⬅ Vuelta';

        let html = `
        <div class="sentido">
            <div class="sentido__head">
                <span class="sentido__titulo">${titulo}</span>
                ${ramal !== 'NINGUNO' ? `
                <div class="sentido__acciones">
                    <button type="button" class="btn btn--sm btn--ok" data-accion="todo" data-v="${vi}" data-s="${sentido}" data-valor="1">Todo ✓</button>
                    <button type="button" class="btn btn--sm btn--bad" data-accion="todo" data-v="${vi}" data-s="${sentido}" data-valor="0">Todo ✕</button>
                </div>` : ''}
            </div>
            <select data-accion="ramal" data-v="${vi}" data-s="${sentido}" aria-label="Ramal de ${esIda ? 'ida' : 'vuelta'}">
                ${opcionesRamal(v.linea, ramal, esIda ? '— Sin ida —' : '— Sin vuelta —')}
            </select>`;

        if (ramal !== 'NINGUNO') {
            tramos.forEach((t, ti) => {
                html += `
                <button type="button" class="tramo ${t.realizado ? 'tramo--ok' : 'tramo--bad'}" data-accion="tramo" data-v="${vi}" data-s="${sentido}" data-t="${ti}" aria-pressed="${t.realizado}">
                    <span class="tramo__check">${t.realizado ? '✓' : '✕'}</span>
                    <span class="tramo__nombre"><small>Sección ${ti + 1}</small>${t.name}</span>
                    <span class="tramo__km">${fmt(t.km)}</span>
                </button>`;
            });
        }
        return html + '</div>';
    }

    function renderVueltas() {
        if (estado.vueltas.length === 0) {
            contenedor.innerHTML = `
                <div class="vacio">
                    <div class="vacio__icon">Sin vueltas cargadas</div>
                    Elegí los ramales y tocá <b>Agregar vuelta</b>.<br>
                    Después podés marcar cada sección como hecha o perdida.
                </div>`;
        } else {
            contenedor.innerHTML = estado.vueltas.map((v, vi) => {
                const c = calcVuelta(v);
                return `
                <article class="card vuelta">
                    <div class="vuelta__head">
                        <div><small>Línea ${v.linea}</small><h2>Vuelta ${vi + 1}</h2></div>
                        <button type="button" class="btn btn--icon" data-accion="borrar" data-v="${vi}" aria-label="Borrar vuelta ${vi + 1}">Borrar</button>
                    </div>
                    <div class="resumen">
                        <div><span>Programado</span><strong>${fmt(c.total)}</strong></div>
                        <div class="ok"><span>Realizado</span><strong>${fmt(c.realizado)}</strong></div>
                        <div class="bad"><span>Perdido</span><strong>${fmt(c.perdido)}</strong></div>
                    </div>
                    ${renderSentido(v, vi, 'IDA')}
                    ${renderSentido(v, vi, 'VUELTA')}
                </article>`;
            }).join('');
        }
        actualizarTotales();
    }

    function actualizarTotales() {
        // Con 3 o más vueltas, en PC la página usa todo el ancho de la pantalla
        document.querySelector('.app').classList.toggle('app--ancha', estado.vueltas.length >= 3);
        const traslados = Object.keys(TRASLADOS_KM).reduce((s, k) => s + (estado.traslados[k] ? TRASLADOS_KM[k] : 0), 0);
        let total = traslados, realizados = traslados;
        estado.vueltas.forEach(v => { const c = calcVuelta(v); total += c.total; realizados += c.realizado; });

        $('count-vueltas').textContent = estado.vueltas.length;
        $('res-total').textContent = fmt(total);
        $('res-realizados').textContent = fmt(realizados);
        $('res-perdidos').textContent = fmt(Math.max(0, total - realizados));
        guardar();
    }

    // ---------- Eventos ----------
    selectorLinea.addEventListener('click', (e) => {
        const b = e.target.closest('[data-linea]');
        if (!b) return;
        estado.linea = b.dataset.linea;
        renderLinea();
        guardar();
    });

    // Traslados: solo uno por ida y uno por vuelta (al marcar uno se desmarca el otro del mismo grupo)
    checksTraslado.forEach(c => c.addEventListener('change', () => {
        if (c.checked) {
            checksTraslado.forEach(otro => {
                if (otro !== c && otro.dataset.grupo === c.dataset.grupo) {
                    otro.checked = false;
                    estado.traslados[otro.dataset.traslado] = false;
                }
            });
        }
        estado.traslados[c.dataset.traslado] = c.checked;
        actualizarTotales();
    }));

    $('btn-agregar').addEventListener('click', () => {
        const ramalIda = selectIda.value, ramalVuelta = selectVuelta.value;
        if (ramalIda === 'NINGUNO' && ramalVuelta === 'NINGUNO') {
            errorMsg.hidden = false;
            setTimeout(() => { errorMsg.hidden = true; }, 3500);
            return;
        }
        errorMsg.hidden = true;
        estado.vueltas.push({
            id: Date.now(),
            linea: estado.linea,
            ramalIda, ramalVuelta,
            tramosIda: tramosDe(estado.linea, ramalIda, 'IDA'),
            tramosVuelta: tramosDe(estado.linea, ramalVuelta, 'VUELTA')
        });
        renderVueltas();
        const ultima = contenedor.lastElementChild;
        if (ultima) {
            // En PC las vueltas van en fila: se desplaza hacia la derecha hasta la nueva
            const pc = window.matchMedia('(min-width: 960px)').matches;
            ultima.scrollIntoView({ behavior: 'smooth', block: pc ? 'nearest' : 'start', inline: 'nearest' });
        }
    });

    $('btn-limpiar').addEventListener('click', () => {
        if (estado.vueltas.length && !confirm('¿Borrar todas las vueltas y traslados?')) return;
        estado.vueltas = [];
        estado.traslados = {};
        renderTraslados();
        renderVueltas();
    });

    contenedor.addEventListener('click', (e) => {
        const el = e.target.closest('[data-accion]');
        if (!el || el.tagName === 'SELECT') return;
        const v = estado.vueltas[+el.dataset.v];
        const esIda = el.dataset.s === 'IDA';

        switch (el.dataset.accion) {
            case 'tramo': {
                const t = (esIda ? v.tramosIda : v.tramosVuelta)[+el.dataset.t];
                t.realizado = !t.realizado;
                break;
            }
            case 'todo':
                (esIda ? v.tramosIda : v.tramosVuelta).forEach(t => { t.realizado = el.dataset.valor === '1'; });
                break;
            case 'borrar':
                estado.vueltas.splice(+el.dataset.v, 1);
                break;
            default: return;
        }
        renderVueltas();
    });

    contenedor.addEventListener('change', (e) => {
        const el = e.target;
        if (el.dataset.accion !== 'ramal') return;
        const v = estado.vueltas[+el.dataset.v];
        if (el.dataset.s === 'IDA') {
            v.ramalIda = el.value;
            v.tramosIda = tramosDe(v.linea, el.value, 'IDA');
        } else {
            v.ramalVuelta = el.value;
            v.tramosVuelta = tramosDe(v.linea, el.value, 'VUELTA');
        }
        renderVueltas();
    });

    // ---------- Tema claro / oscuro ----------
    const btnTema = $('btn-tema');
    const oscuroSistema = window.matchMedia('(prefers-color-scheme: dark)');
    const temaActual = () => document.documentElement.dataset.theme || (oscuroSistema.matches ? 'dark' : 'light');

    function pintarBotonTema() {
        const oscuro = temaActual() === 'dark';
        btnTema.textContent = oscuro ? 'Claro' : 'Oscuro';
        btnTema.setAttribute('aria-label', oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    }
    btnTema.addEventListener('click', () => {
        const nuevo = temaActual() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = nuevo;
        try { localStorage.setItem('tema', nuevo); } catch (e) { /* sin almacenamiento */ }
        pintarBotonTema();
    });
    oscuroSistema.addEventListener('change', pintarBotonTema);

    // ---------- Inicio ----------
    cargar();
    renderLinea();
    renderTraslados();
    renderVueltas();
    pintarBotonTema();
})();
