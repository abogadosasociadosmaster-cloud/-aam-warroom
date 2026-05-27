/**
 * ============================================================
 * AAM26 MEGA ESTRUCTURA — FRONT-END SYSTEM CORTEX V4
 * ARQUITECTURA UNIFICADA, SEGURA, MODULAR Y ULTRA-MODERNA
 * ============================================================
 */

'use strict';

// ══════════════════════════════════════════════════════════
// CONFIGURACIÓN GLOBAL
// ══════════════════════════════════════════════════════════
const CFG = {
  ENDPOINT: 'https://script.google.com/macros/s/AKfycbxNthU585zRC4iWhcpwRqoMecLWqzybCvWhjD7pSYx0ro5Xu6EkTnv38blpVbsn8clo/exec',
  VERSION: 'Mega Estructura Pro v4.0 · 2026',
  REFETCH_INTERVAL: 300000 // Refrescar cada 5 min de fondo
};

// ══════════════════════════════════════════════════════════
// CATÁLOGOS BASE
// ══════════════════════════════════════════════════════════
const CAT_USUARIOS = {
  'abogadosasociadosmaster@gmail.com':     { nombre: 'Juan Manuel Barrionuevo', rol: 'SUPERVISOR_GRAL', sub: 'CENTRAL' },
  'gestionaamza@gmail.com':                { nombre: 'Martin Barrionuevo',        rol: 'SUPERVISOR_OP',  sub: 'CENTRAL' },
  'recepcionaasociados@gmail.com':         { nombre: 'Franco Puente',             rol: 'CARGA',          sub: 'CENTRAL' },
  'legalesmendozasiniestros@gmail.com':    { nombre: 'Daniel Armitano',           rol: 'ABOGADO',        sub: 'SUB_B'   },
  'abogados.mendoza@gmail.com':            { nombre: 'Guillermo Rossel',          rol: 'ABOGADO',        sub: 'SUB_C'   },
  'abogadosasociadosmaster.arg@gmail.com': { nombre: 'Aristides Agüero',          rol: 'ABOGADO',        sub: 'SUB_D'   }
};

const PERMISOS = {
  SUPERVISOR_GRAL: { verTodo: true, editar: true, crear: true, eliminar: true, verMontos: true, verNeto: true, power: true },
  SUPERVISOR_OP:   { verTodo: true, editar: true, crear: true, eliminar: false, verMontos: true, verNeto: false, power: false },
  CARGA:           { verTodo: true, editar: 'solo_docs', crear: true, eliminar: false, verMontos: false, verNeto: false, power: false },
  ABOGADO:         { verTodo: false, editar: 'condicional', crear: false, eliminar: false, verMontos: false, verNeto: false, power: false }
};

const CAT_ESTADOS = {
  INGRESADO:              { label: 'Ingresado', color: '#6b7280', resp: 'CARGA' },
  PENDIENTE_DOCS:         { label: 'Pendiente Documentación', color: '#f59e0b', resp: 'CARGA' },
  DOCS_COMPLETOS:         { label: 'Documentación Completa', color: '#10b981', resp: 'SUPERVISOR_OP' },
  EN_GESTION_ADMIN:       { label: 'En Gestión Administrativa', color: '#06b6d4', resp: 'SUPERVISOR_OP' },
  PRESENTADO_CIA:         { label: 'Presentado a Cía', color: '#3b82f6', resp: 'SUPERVISOR_OP' },
  ESPERA_RESPUESTA:       { label: 'Espera Respuesta', color: '#8b5cf6', resp: 'SUPERVISOR_OP' },
  OFERTA_RECIBIDA:        { label: 'Oferta Recibida', color: '#ec4899', resp: 'SUPERVISOR_OP' },
  ACEPTADO_ADMIN:         { label: 'Aceptado Administrativo', color: '#10b981', resp: 'SUPERVISOR_OP' },
  RECHAZADO_ESCALA:       { label: 'Rechazado p/Escalar', color: '#ef4444', resp: 'SUPERVISOR_OP' },
  COBRADO_ADMIN:          { label: 'Cobrado Administrativo', color: '#8b5cf6', esFinal: true },
  
  DEMANDA_PREPARACION:    { label: 'Demanda en Preparación', color: '#9ca3af', resp: 'ABOGADO' },
  DEMANDA_PRESENTADA:     { label: 'Demanda Presentada', color: '#3b82f6', resp: 'ABOGADO' },
  TRASLADO_DEMANDA:       { label: 'Traslado de Demanda', color: '#2563eb', resp: 'ABOGADO' },
  CONTESTACION_DEMANDA:   { label: 'Contestación de Demanda', color: '#1d4ed8', resp: 'ABOGADO' },
  APERTURA_PRUEBA:        { label: 'Apertura a Prueba', color: '#06b6d4', resp: 'ABOGADO' },
  PRODUCCION_PRUEBA:      { label: 'Producción de Prueba', color: '#0891b2', resp: 'ABOGADO' },
  CIERRE_PRUEBA:          { label: 'Cierre de Prueba', color: '#0e7490', resp: 'ABOGADO' },
  ALEGATOS:               { label: 'Alegatos', color: '#a855f7', resp: 'ABOGADO' },
  LLAMADO_AUTOS_SENTENCIA:{ label: 'Autos para Sentencia', color: '#f59e0b', resp: 'ABOGADO' },
  SENTENCIA:              { label: 'Sentencia', color: '#eab308', resp: 'ABOGADO' },
  APELACION:              { label: 'Apelación', color: '#f43f5e', resp: 'ABOGADO' },
  RESOLUCION_CAMARA:      { label: 'Resolución de Cámara', color: '#ec4899', resp: 'ABOGADO' },
  FIRME:                  { label: 'Firme', color: '#10b981', resp: 'SUPERVISOR_OP' },
  EJECUCION_COBRO:        { label: 'Ejecución de Cobro', color: '#d946ef', resp: 'SUPERVISOR_OP' },
  COBRADO_JUDICIAL:       { label: 'Cobrado Judicial', color: '#8b5cf6', esFinal: true },
  
  SUSPENDIDO:             { label: 'Suspendido', color: '#6b7280', resp: 'SUPERVISOR_GRAL' },
  ARCHIVADO:              { label: 'Archivado', color: '#4b5563', esFinal: true }
};

const DOCS_LIST = [
  // Fase Administrativa
  { id: 'RAT_POD', label: 'Ratificación de Poder' },
  { id: 'PACTO_CL', label: 'Pacto Cuota Litis' },
  { id: 'DNI_DOC', label: 'DNI Cliente' },
  { id: 'ACTA_FISC', label: 'Acta Fiscal / Constatación' },
  { id: 'LIC', label: 'Licencia de Conducir' },
  { id: 'TV', label: 'Tarjeta Verde / Cédula' },
  { id: 'DCIA_SEG', label: 'Denuncia de Seguro' },
  { id: 'CERT_COB', label: 'Certificado de Cobertura' },
  { id: 'SANID', label: 'Certificado Médico / Sanidad' },
  { id: 'LESION', label: 'Certificado de Lesiones' },
  { id: 'PRESUPUESTO', label: 'Presupuesto Reparación' },
  { id: 'FOTOS', label: 'Fotos Siniestro / Daños' },
  { id: 'OTROS', label: 'Otros Documentos Admin' },
  
  // Fase Judicial
  { id: 'ESCRITO_DEMANDA', label: 'Escrito de Demanda' },
  { id: 'BONO_DF', label: 'Bono Derecho Fijo' },
  { id: 'TASA_JUSTICIA', label: 'Comprobante Tasa Justicia' },
  { id: 'PODER_JUDICIAL', label: 'Poder Judicial' },
  { id: 'PRUEBA_DOCUMENTAL', label: 'Prueba Documental' },
  { id: 'PUNTOS_PERICIA', label: 'Puntos de Pericia' },
  { id: 'ALEGATO', label: 'Alegato Presentado' },
  { id: 'CARGO_DIGITAL', label: 'Cargo Digital (MEV)' }
];

const CAMPOS_FECHA = [
  'FECHA_INGRESO', 'FECHA_HECHO', 'FECHA_PRESENTACION_CIA', 'FECHA_OFERTA',
  'FECHA_COBRO_ADMIN', 'FECHA_DEMANDA', 'FECHA_TRASLADO', 'FECHA_CONTESTACION',
  'FECHA_APERTURA_PRUEBA', 'FECHA_CIERRE_PRUEBA', 'FECHA_ALEGATOS', 'FECHA_SENTENCIA',
  'FECHA_APELACION', 'FECHA_RESOLUCION_CAMARA', 'FECHA_FIRME', 'FECHA_COBRO_JUD'
];

// ══════════════════════════════════════════════════════════
// ESTADO OPERATIVO CENTRAL (CORTEX)
// ══════════════════════════════════════════════════════════
const STATE = {
  usuario: null,         // Datos del operador actual
  causas: [],           // Listado de causas en memoria
  causaActual: null,     // Causa abierta en el panel lateral
  vista: 'ops',          // Vista actual ('ops', 'legal', 'contable', 'auditoria')
  params: { cpccyt: {}, feriados: [] },
  syncLock: false,
  modoDirector: false,
  reglas: [],            // Catálogo de reglas cargado dinámicamente
  headers: {}            // Headers de la hoja de cálculo
};

// ══════════════════════════════════════════════════════════
// INICIALIZACIÓN Y EVENTOS DOM
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  inicializarEventos();
  intentarAutologin();
});

function inicializarEventos() {
  // Login
  document.getElementById('btn-login').addEventListener('click', handlerLogin);
  document.getElementById('login-email').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handlerLogin();
  });

  // Navegación Sidebar
  document.querySelectorAll('#sidebar .nav-menu .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const viewName = item.getAttribute('data-view');
      switchView(viewName);
    });
  });

  // Nueva Causa
  document.getElementById('btn-nueva-causa-sidebar').addEventListener('click', openDrawerNuevaCausa);
  document.getElementById('btn-nueva-causa-ops').addEventListener('click', openDrawerNuevaCausa);

  // Recarga manual
  document.getElementById('btn-recargar-datos').addEventListener('click', () => {
    fetchDataCore(false);
  });

  // Búsqueda global reactiva
  document.getElementById('global-search-input').addEventListener('input', () => {
    renderVistaActiva(); // Filtra dinámicamente según la vista en la que se esté
  });

  // Filtros dinámicos secundarias por vista
  document.getElementById('filter-ops-abogado').addEventListener('change', applyFiltersOps);
  document.getElementById('filter-ops-estado').addEventListener('change', applyFiltersOps);
  document.getElementById('filter-ops-aseguradora').addEventListener('change', applyFiltersOps);

  document.getElementById('filter-legal-abogado').addEventListener('change', applyFiltersLegal);
  document.getElementById('filter-legal-semaforo').addEventListener('change', applyFiltersLegal);

  // Pestañas locales del Drawer (Slide Ficha)
  document.querySelectorAll('.drawer-tabs .drawer-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const tabName = tabBtn.getAttribute('data-tab');
      switchDrawerTab(tabName);
    });
  });

  // Escuchar cambios para sugerencia de estados automáticos (Mente Maestra)
  const drawerForm = document.getElementById('drawer-form');
  if (drawerForm) {
    drawerForm.addEventListener('change', evaluarEstadoSugeridoFronend);
    drawerForm.addEventListener('input', evaluarEstadoSugeridoFronend);
  }
}

// Lógica de cambio de pestañas dentro de la ficha del Drawer
function switchDrawerTab(tabName) {
  // Cambiar pestaña activa
  document.querySelectorAll('.drawer-tabs .drawer-tab').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    }
  });

  // Cambiar visibilidad de contenido
  document.querySelectorAll('.drawer-body .drawer-tab-content').forEach(content => {
    content.classList.remove('active');
  });

  const activeContent = document.getElementById('tab-' + tabName);
  if (activeContent) {
    activeContent.classList.add('active');
  }
}

// ══════════════════════════════════════════════════════════
// AUTENTICACIÓN Y SEGURIDAD (FRONTEND)
// ══════════════════════════════════════════════════════════
function handlerLogin() {
  const emailInput = document.getElementById('login-email').value.trim().toLowerCase();
  const errorEl = document.getElementById('login-error');
  
  if (!emailInput || !emailInput.includes('@')) {
    errorEl.textContent = 'Por favor, ingrese un email válido.';
    return;
  }

  const user = CAT_USUARIOS[emailInput];
  if (!user) {
    errorEl.textContent = 'Acceso denegado. Este email no está registrado como operador.';
    return;
  }

  // Establecer sesión
  STATE.usuario = { email: emailInput, ...user };
  localStorage.setItem('AAM26_OPERADOR_EMAIL_V3', emailInput);
  
  entrarAlApp();
}

function intentarAutologin() {
  const emailGuardado = localStorage.getItem('AAM26_OPERADOR_EMAIL_V3');
  if (emailGuardado && CAT_USUARIOS[emailGuardado]) {
    STATE.usuario = { email: emailGuardado, ...CAT_USUARIOS[emailGuardado] };
    entrarAlApp();
  }
}

function entrarAlApp() {
  // Ajustar interfaz según rol
  document.getElementById('user-nombre').textContent = STATE.usuario.nombre;
  document.getElementById('user-rol').textContent = STATE.usuario.rol.replace(/_/g, ' ');
  
  // Mostrar / Ocultar controles según privilegios
  const esSuperior = (STATE.usuario.rol === 'SUPERVISOR_GRAL' || STATE.usuario.rol === 'SUPERVISOR_OP');
  
  if (esSuperior) {
    document.getElementById('btn-director-mode').style.display = 'flex';
  } else {
    document.getElementById('btn-director-mode').style.display = 'none';
    STATE.modoDirector = false;
  }

  // Configuración de enmascaramiento contable inicial
  aplicarEnmascaramientoVisual(!esSuperior);

  // Ocultar login y mostrar app
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  // Cargar datos
  fetchDataCore(true);
  fetchReglasYHeaders();
}

function toggleDirectorMode() {
  if (STATE.usuario.rol !== 'SUPERVISOR_GRAL' && STATE.usuario.rol !== 'SUPERVISOR_OP') return;
  
  STATE.modoDirector = !STATE.modoDirector;
  const btn = document.getElementById('btn-director-mode');
  
  if (STATE.modoDirector) {
    btn.innerHTML = '🔒 BLOQUEADO';
    btn.style.background = 'rgba(16, 185, 129, 0.15)';
    btn.style.borderColor = 'var(--verde)';
    btn.style.color = 'var(--verde)';
    showToast('Modo Director activado. Datos financieros visibles en este navegador.');
    aplicarEnmascaramientoVisual(false);
  } else {
    btn.innerHTML = '🔑 SUPERVISOR';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
    showToast('Modo Director desactivado. Datos financieros protegidos.');
    aplicarEnmascaramientoVisual(true);
  }
  
  // Re-renderizar para aplicar el cambio
  renderVistaActiva();
}

function aplicarEnmascaramientoVisual(debeEnmascarar) {
  const kpis = ['kpi-total-ofertado-mask', 'kpi-total-ingresos-mask', 'kpi-total-gastos-mask', 'kpi-total-neto-mask'];
  const values = ['kpi-total-ofertado', 'kpi-total-ingresos', 'kpi-total-gastos', 'kpi-total-neto'];
  
  kpis.forEach((maskId, idx) => {
    const mask = document.getElementById(maskId);
    const val = document.getElementById(values[idx]);
    if (mask && val) {
      if (debeEnmascarar) {
        mask.classList.remove('hidden');
        val.classList.add('masked-amount');
      } else {
        mask.classList.add('hidden');
        val.classList.remove('masked-amount');
      }
    }
  });
}

// ══════════════════════════════════════════════════════════
// CONEXIÓN CON EL SERVIDOR (HTTP PROXY / JSONP)
// ══════════════════════════════════════════════════════════
function getApiEndpoint(qs = '') {
  const isLocal = (window.location.port === '8100' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const path = isLocal ? '/proxy/api' : CFG.ENDPOINT;
  return path + (qs ? '?' + qs : '');
}

function fetchDataCore(cargarLoader = false) {
  if (STATE.syncLock) return;
  STATE.syncLock = true;

  const statusDot = document.querySelector('.status-dot');
  const statusText = document.getElementById('status-text');
  
  if (statusText) statusText.textContent = 'Conectando con Data Core...';
  if (statusDot) statusDot.style.background = 'var(--amarillo)';

  if (cargarLoader) {
    document.getElementById('tbody-ops').innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--gold);">⚙️ Sincronizando Matriz Operativa...</td></tr>`;
  }

  const isLocal = (window.location.port === '8100' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocal) {
    fetch(getApiEndpoint(`email=${encodeURIComponent(STATE.usuario.email)}&_t=${Date.now()}`))
      .then(res => res.json())
      .then(response => {
        STATE.syncLock = false;
        if (statusDot) statusDot.style.background = 'var(--verde)';
        if (statusText) statusText.textContent = 'Conectado a GAS API V43';
        
        if (response && response.status === 'success') {
          processDataCoreResponse(response);
        } else {
          showToast('Error de sincronización de datos.', 'error');
        }
      })
      .catch(err => {
        STATE.syncLock = false;
        showToast('Error al conectar con el colector local.', 'error');
      });
  } else {
    // Usamos JSONP para evitar bloqueos CORS en servidor remoto
    const cb = 'cbDataGES_' + Date.now();
    window[cb] = (response) => {
      STATE.syncLock = false;
      if (statusDot) statusDot.style.background = 'var(--verde)';
      if (statusText) statusText.textContent = 'Conectado a GAS API V43';
      
      if (response && response.status === 'success') {
        processDataCoreResponse(response);
      } else {
        showToast('Error de sincronización de datos.', 'error');
      }
      
      const scriptEl = document.getElementById(cb);
      if (scriptEl) scriptEl.remove();
    };

    const script = document.createElement('script');
    script.id = cb;
    script.src = getApiEndpoint(`email=${encodeURIComponent(STATE.usuario.email)}&callback=${cb}&_t=${Date.now()}`);
    document.head.appendChild(script);
  }
}

function processDataCoreResponse(response) {
  STATE.causas = response.data.map(normalizarFechasCausa);
  
  // Actualizar contadores sidebar
  document.getElementById('badge-ops').textContent = STATE.causas.length;
  
  const urgentesCount = STATE.causas.filter(c => c.SEMAFORO === 'ROJO').length;
  const badgeLegal = document.getElementById('badge-legal-alertas');
  badgeLegal.textContent = urgentesCount;
  badgeLegal.style.display = urgentesCount > 0 ? 'inline-block' : 'none';

  // Contar Revisiones Pendientes
  let pendingRevisions = 0;
  STATE.causas.forEach(c => {
    DOCS_LIST.forEach(doc => {
      const val = c[doc.id];
      if (val && typeof val === 'string' && val.startsWith('EN_REVISION')) {
        pendingRevisions++;
      }
    });
  });
  const badgeRev = document.getElementById('badge-revisiones');
  if (badgeRev) {
    badgeRev.textContent = pendingRevisions;
    badgeRev.style.display = pendingRevisions > 0 ? 'inline-block' : 'none';
  }

  // Rellenar selectores de filtros una vez al cargar
  llenarSelectoresFiltros();
  
  // Renderizar la vista actual
  renderVistaActiva();

  // Verificar si hay notificaciones de WhatsApp pendientes de envío
  verificarWhatsAppPendientePostSync();
}

function verificarWhatsAppPendientePostSync() {
  if (!STATE.pendingWhatsAppPrompt) return;
  const p = STATE.pendingWhatsAppPrompt;
  STATE.pendingWhatsAppPrompt = null; // Evitar llamadas repetidas
  
  let causa = null;
  if (!p.isNew && p.tempCausa && p.tempCausa.ID && p.tempCausa.ID !== 'NUEVO') {
    causa = STATE.causas.find(x => x.ID === p.tempCausa.ID);
  }
  
  if (!causa && p.clientName) {
    const clientCausas = STATE.causas.filter(x => x.CLIENTE === p.clientName);
    if (clientCausas.length > 0) {
      causa = clientCausas[clientCausas.length - 1];
    }
  }
  
  if (causa) {
    const estLabel = CAT_ESTADOS[causa.ESTADO] ? CAT_ESTADOS[causa.ESTADO].label : causa.ESTADO;
    const mensajeConfirm = p.isNew 
      ? `¿Desea enviar una notificación de WhatsApp al cliente informando sobre el ingreso de su causa?`
      : `Se ha guardado el expediente. ¿Desea enviar una notificación de WhatsApp al cliente con el estado actualizado?`;
    
    if (confirm(mensajeConfirm)) {
      const tel = formatTelefonoWA(causa.TELEFONO);
      const text = generarNarrativaWhatsApp(causa, p.oldCausa);
      
      const constancia = `\n[Reporte de evolución WhatsApp enviado al cliente el ${new Date().toLocaleString()}]`;
      fetch(getApiEndpoint(), {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          action: 'editarCausa',
          email: STATE.usuario.email,
          idCausa: causa.ID,
          datos: { BITACORA: (causa.BITACORA || '') + constancia }
        })
      });
      
      const url = tel ? `https://wa.me/${tel}?text=${text}` : `https://wa.me/?text=${text}`;
      window.open(url, '_blank');
    }
  }
}

function normalizarFechasCausa(c) {
  CAMPOS_FECHA.forEach(campo => {
    if (c[campo]) {
      try {
        let d = new Date(c[campo]);
        if (!isNaN(d.getTime())) {
          c[campo] = d.toISOString().split('T')[0];
        }
      } catch (e) {
        c[campo] = '';
      }
    } else {
      c[campo] = '';
    }
  });
  return c;
}

// Llenar dinámicamente abogados y aseguradoras en filtros
function llenarSelectoresFiltros() {
  const abogados = new Set();
  const aseguradoras = new Set();
  const estados = new Set();

  STATE.causas.forEach(c => {
    if (c.ABOGADO) abogados.add(c.ABOGADO.trim());
    if (c.RECLAMADO_A) aseguradoras.add(c.RECLAMADO_A.trim());
    if (c.ESTADO) estados.add(c.ESTADO.trim());
  });

  // Selector abogados OPS
  const selAboOps = document.getElementById('filter-ops-abogado');
  let hAbo = '<option value="">[ TODOS LOS ABOGADOS ]</option>';
  [...abogados].sort().forEach(a => {
    const usrKey = Object.keys(CAT_USUARIOS).find(k => CAT_USUARIOS[k].nombre === a);
    const label = usrKey ? CAT_USUARIOS[usrKey].nombre : a;
    hAbo += `<option value="${a}">${label}</option>`;
  });
  selAboOps.innerHTML = hAbo;

  // Selector abogados LEGAL
  const selAboLeg = document.getElementById('filter-legal-abogado');
  selAboLeg.innerHTML = hAbo.replace('TODOS LOS ABOGADOS', 'FILTRAR POR ABOGADO');

  // Selector Aseguradoras
  const selAseOps = document.getElementById('filter-ops-aseguradora');
  let hAse = '<option value="">[ TODAS LAS CIA ]</option>';
  [...aseguradoras].sort().forEach(cia => {
    hAse += `<option value="${cia}">${cia}</option>`;
  });
  selAseOps.innerHTML = hAse;

  // Selector Estados
  const selEstOps = document.getElementById('filter-ops-estado');
  let hEst = '<option value="">[ TODOS LOS ESTADOS ]</option>';
  Object.keys(CAT_ESTADOS).forEach(est => {
    hEst += `<option value="${est}">${CAT_ESTADOS[est].label}</option>`;
  });
  selEstOps.innerHTML = hEst;
}

// ══════════════════════════════════════════════════════════
// ROUTER DE VISTAS (SHELL DYNAMIC)
// ══════════════════════════════════════════════════════════
function switchView(viewName) {
  STATE.vista = viewName;
  
  // Cambiar menú activo
  document.querySelectorAll('#sidebar .nav-menu .nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-view') === viewName) {
      item.classList.add('active');
    }
  });

  // Ocultar todas las vistas y mostrar la seleccionada
  document.querySelectorAll('#main-content .view').forEach(view => {
    view.classList.remove('active');
  });
  
  const targetView = document.getElementById('view-' + viewName);
  if (targetView) targetView.classList.add('active');

  // Cambiar títulos y subtítulos en la cabecera
  const titleMain = document.getElementById('view-title-main');
  const subtitleMain = document.getElementById('view-subtitle-main');
  
  switch (viewName) {
    case 'ops':
      titleMain.innerHTML = 'Workspace <span>AAM26</span>';
      subtitleMain.textContent = 'Matriz General Operativa';
      break;
    case 'revisiones':
      titleMain.innerHTML = 'Cargas del <span>Cliente</span>';
      subtitleMain.textContent = 'Revisiones Pendientes de Documentación';
      break;
    case 'legal':
      titleMain.innerHTML = 'Agenda Judicial <span>Ley 9001</span>';
      subtitleMain.textContent = 'Control de Semáforos de Plazos Mendoza';
      break;
    case 'contable':
      titleMain.innerHTML = 'Motor <span>Contable</span>';
      subtitleMain.textContent = 'Liquidación de Expedientes y Caja Neta';
      break;
    case 'auditoria':
      titleMain.innerHTML = 'Trazabilidad <span>Bitácora CRM</span>';
      subtitleMain.textContent = 'Historial General y Auditoría de Procesos';
      break;
  }

  renderVistaActiva();
}

function renderVistaActiva() {
  switch (STATE.vista) {
    case 'ops':
      renderVistaOps();
      break;
    case 'revisiones':
      renderVistaRevisiones();
      break;
    case 'legal':
      renderVistaLegal();
      break;
    case 'contable':
      renderVistaContable();
      break;
    case 'auditoria':
      renderVistaAuditoria();
      break;
  }
}

// ══════════════════════════════════════════════════════════
// RENDER MÓDULO REVISIONES PENDIENTES (AAM26-REVISIONES)
// ══════════════════════════════════════════════════════════
function renderVistaRevisiones() {
  const tbody = document.getElementById('tbody-revisiones');
  if (!tbody) return;

  const revisiones = [];
  STATE.causas.forEach(c => {
    DOCS_LIST.forEach(doc => {
      const val = c[doc.id];
      if (val && typeof val === 'string' && val.startsWith('EN_REVISION')) {
        const parts = val.split('|');
        const url = parts.length > 1 ? parts[1].trim() : '';
        revisiones.push({
          idCausa: c.ID,
          cliente: c.CLIENTE || '—',
          docId: doc.id,
          docLabel: doc.label,
          url: url
        });
      }
    });
  });

  if (revisiones.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 40px; color: var(--text-dim); font-size: 14px;">🔍 No hay cargas de clientes pendientes de revisión en este momento.</td></tr>`;
    return;
  }

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  let html = '';
  revisiones.forEach(rev => {
    html += `
      <tr>
        <td style="font-family: var(--font-mono); font-weight: 700; color: var(--gold);">
          <a href="#" onclick="window.abrirFichaCausaEnTabDrive('${rev.idCausa}'); return false;" style="color: inherit; text-decoration: underline;">${rev.idCausa}</a>
        </td>
        <td>${esc(rev.cliente)}</td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-weight: 600;">${esc(rev.docLabel)}</span>
            <span style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);">${rev.docId}</span>
          </div>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 8px; justify-content: center; align-items: center;">
            <a href="${rev.url}" target="_blank" class="btn-solid" style="padding: 4px 10px; font-size: 11px; background-color: var(--primary); text-decoration: none; border-radius: var(--radius-sm); display: inline-flex; align-items: center;">Ver</a>
            <button type="button" onclick="window.aprobarDocumento('${rev.idCausa}', '${rev.docId}', '${rev.url}')" class="btn-solid" style="padding: 4px 10px; font-size: 11px; background-color: var(--verde); border-radius: var(--radius-sm);">Aprobar</button>
            <button type="button" onclick="window.rechazarDocumento('${rev.idCausa}', '${rev.docId}')" class="btn-outline" style="padding: 4px 10px; font-size: 11px; border-color: var(--rojo); color: var(--rojo); border-radius: var(--radius-sm);">Rechazar</button>
          </div>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

window.abrirFichaCausaEnTabDrive = function(idCausa) {
  openDrawerFicha(idCausa);
  switchDrawerTab('archivos');
};

// ══════════════════════════════════════════════════════════
// RENDER MÓDULO OPERATIVO (AAM26-OPS)
// ══════════════════════════════════════════════════════════
function renderVistaOps() {
  applyFiltersOps();
}

function applyFiltersOps() {
  const term = document.getElementById('global-search-input').value.toLowerCase().trim();
  const filterAbo = document.getElementById('filter-ops-abogado').value;
  const filterEst = document.getElementById('filter-ops-estado').value;
  const filterAse = document.getElementById('filter-ops-aseguradora').value;

  const filtered = STATE.causas.filter(c => {
    // Búsqueda libre
    if (term) {
      const match = String(c.CLIENTE || '').toLowerCase().includes(term) ||
                    String(c.ID || '').toLowerCase().includes(term) ||
                    String(c.DNI_NRO || '').toLowerCase().includes(term) ||
                    String(c.RECLAMADO_A || '').toLowerCase().includes(term) ||
                    String(c.BITACORA || '').toLowerCase().includes(term);
      if (!match) return false;
    }

    // Selector abogado
    if (filterAbo && c.ABOGADO !== filterAbo) return false;
    // Selector estado
    if (filterEst && c.ESTADO !== filterEst) return false;
    // Selector aseguradora
    if (filterAse && c.RECLAMADO_A !== filterAse) return false;

    return true;
  });

  const tbody = document.getElementById('tbody-ops');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">No se encontraron expedientes con los filtros aplicados.</td></tr>`;
    return;
  }

  let html = '';
  filtered.forEach(c => {
    const estadoObj = CAT_ESTADOS[c.ESTADO] || { label: c.ESTADO, color: '#4b5563' };
    
    // Simplificar visualización de días en estado
    const dias = c.DIAS_EN_ESTADO || 0;

    html += `<tr onclick="openDrawerFicha('${c.ID}')">
      <td class="cell-id">${c.ID}</td>
      <td class="cell-cliente">${c.CLIENTE || '—'}</td>
      <td>${c.RECLAMADO_A || '—'}</td>
      <td>
        ${c.ESTADO === 'PENDIENTE_DOCS' ? `
          <span class="status-chip clickable-wa-status" 
                style="background: ${estadoObj.color}12; border-color: ${estadoObj.color}25; color: ${estadoObj.color};"
                onclick="event.stopPropagation(); window.solicitarFaltantesDesdeTabla('${c.ID}')"
                title="Solicitar documentación faltante por WhatsApp">
            ${estadoObj.label} 💬
          </span>
        ` : `
          <span class="status-chip" style="background: ${estadoObj.color}12; border-color: ${estadoObj.color}25; color: ${estadoObj.color}">
            ${estadoObj.label}
          </span>
        `}
      </td>
      <td><span class="sem-badge sem-${c.SEMAFORO || 'VERDE'}">${c.SEMAFORO || 'VERDE'}</span></td>
      <td style="font-family: var(--font-mono);">${dias} d</td>
      <td>${c.ABOGADO || 'Estudio AAM'}</td>
      <td style="text-align: right;" onclick="event.stopPropagation()">
        <button class="btn-outline" style="padding: 6px 12px; font-size: 11px;" onclick="openDrawerFicha('${c.ID}')">⚙️ GESTIÓN</button>
      </td>
    </tr>`;
  });
  tbody.innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// RENDER MÓDULO LEGAL Y PLAZOS (AAM26-LEGAL)
// ══════════════════════════════════════════════════════════
function renderVistaLegal() {
  applyFiltersLegal();
}

function applyFiltersLegal() {
  const term = document.getElementById('global-search-input').value.toLowerCase().trim();
  const filterAbo = document.getElementById('filter-legal-abogado').value;
  const filterSem = document.getElementById('filter-legal-semaforo').value;

  const filtered = STATE.causas.filter(c => {
    // Solo mostramos causas que tengan un semáforo válido cargado
    if (!c.SEMAFORO) return false;

    if (term) {
      const match = String(c.CLIENTE || '').toLowerCase().includes(term) ||
                    String(c.ID || '').toLowerCase().includes(term) ||
                    String(c.NRO_EXPEDIENTE || '').toLowerCase().includes(term);
      if (!match) return false;
    }

    if (filterAbo && c.ABOGADO !== filterAbo) return false;
    if (filterSem && c.SEMAFORO !== filterSem) return false;

    return true;
  });

  const grid = document.getElementById('legal-alert-grid');
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: span 3; text-align: center; padding: 40px; color: var(--text-muted);">
      No hay alertas o plazos pendientes para los filtros seleccionados.
    </div>`;
    return;
  }

  // Ordenar de más urgentes (ROJO) a menos urgentes (VERDE)
  filtered.sort((a, b) => {
    const weights = { ROJO: 3, AMARILLO: 2, VERDE: 1 };
    return (weights[b.SEMAFORO] || 0) - (weights[a.SEMAFORO] || 0);
  });

  let html = '';
  filtered.forEach(c => {
    const limite = c.FECHA_VENCIMIENTO ? new Date(c.FECHA_VENCIMIENTO).toLocaleDateString('es-AR') : 'Sin fecha';
    const diasTotal = c.PLAZO_ESTADO_ACTUAL || '—';
    const diasPasados = c.DIAS_EN_ESTADO || 0;
    
    html += `
      <div class="alert-card alert-${c.SEMAFORO}" onclick="openDrawerFicha('${c.ID}')" style="cursor: pointer;">
        <div class="alert-card-header">
          <span class="alert-card-time">${c.SEMAFORO}</span>
          <span style="font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);">${c.ID}</span>
        </div>
        <div class="alert-card-title">${c.CLIENTE || 'Sin Cliente'}</div>
        <div class="alert-card-sub">Expediente: ${c.NRO_EXPEDIENTE || 'No Judicializado'}</div>
        <div class="alert-card-sub" style="margin-top: 6px;">
          Estado actual: <strong style="color: var(--gold);">${(c.ESTADO || '').replace(/_/g, ' ')}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px; border-top: 1px solid var(--border); padding-top: 10px; font-size: 11px;">
          <div>Transcurrido: <strong>${diasPasados}</strong> / ${diasTotal} días</div>
          <div>Límite: <strong style="color: #fff;">${limite}</strong></div>
        </div>
        <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; text-align: right;">
          Resp: ${c.ABOGADO || 'Sin abogado'}
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// RENDER MÓDULO CONTABLE Y LIQUIDACIÓN (AAM26-CONTABLE)
// ══════════════════════════════════════════════════════════
function renderVistaContable() {
  const term = document.getElementById('global-search-input').value.toLowerCase().trim();
  const esSuperior = (STATE.usuario.rol === 'SUPERVISOR_GRAL' || STATE.usuario.rol === 'SUPERVISOR_OP');
  const mostrarCajas = esSuperior || STATE.modoDirector;

  // 1. Filtrar causas si hay búsqueda global
  const filteredCausas = STATE.causas.filter(c => {
    if (term) {
      return String(c.CLIENTE || '').toLowerCase().includes(term) ||
             String(c.ID || '').toLowerCase().includes(term);
    }
    return true;
  });

  // 2. Calcular Totales para KPI Cards (siempre basado en el total de causas cargadas, no solo las filtradas)
  let totalOfertado = 0;
  let totalIngresos = 0;
  let totalGastos = 0;
  let totalNeto = 0;

  STATE.causas.forEach(c => {
    totalOfertado += parseMonto(c.MONTO_OFERTA);
    totalIngresos += parseMonto(c.TOTAL_INGRESOS_CAUSA);
    totalGastos += parseMonto(c.TOTAL_GASTOS);
    totalNeto += parseMonto(c.RESULTADO_NETO);
  });

  // Imprimir KPIs
  document.getElementById('kpi-total-ofertado').textContent = formatMonto(totalOfertado);
  document.getElementById('kpi-total-ingresos').textContent = formatMonto(totalIngresos);
  document.getElementById('kpi-total-gastos').textContent = formatMonto(totalGastos);
  document.getElementById('kpi-total-neto').textContent = formatMonto(totalNeto);

  // Asegurar ocultación si no es supervisor
  aplicarEnmascaramientoVisual(!mostrarCajas);

  // 3. Renderizar Tabla Contable
  const tbody = document.getElementById('tbody-contable');
  let html = '';

  if (filteredCausas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">No se encontraron causas.</td></tr>`;
    return;
  }

  filteredCausas.forEach(c => {
    const cobradoAdmin = parseMonto(c.MONTO_COBRADO_ADMIN);
    const cobradoJud = parseMonto(c.MONTO_COBRADO_JUD);
    const gastos = parseMonto(c.TOTAL_GASTOS);
    const ingresos = parseMonto(c.TOTAL_INGRESOS_CAUSA);
    const neto = parseMonto(c.RESULTADO_NETO);

    // Enmascarar columnas del listado general
    let cellCobradoAdmin = formatMonto(cobradoAdmin);
    let cellCobradoJud = formatMonto(cobradoJud);
    let cellGastos = formatMonto(gastos);
    let cellIngresos = formatMonto(ingresos);
    let cellNeto = formatMonto(neto);

    if (!mostrarCajas) {
      cellCobradoAdmin = `<span class="masked-amount">$ ***</span>`;
      cellCobradoJud = `<span class="masked-amount">$ ***</span>`;
      cellGastos = `<span class="masked-amount">$ ***</span>`;
      cellIngresos = `<span class="masked-amount">$ ***</span>`;
      cellNeto = `<span class="masked-amount">$ ***</span>`;
    }

    html += `<tr onclick="openDrawerFicha('${c.ID}')">
      <td class="cell-id">${c.ID}</td>
      <td class="cell-cliente">${c.CLIENTE || '—'}</td>
      <td><span style="font-size: 11px; opacity:0.8;">${(c.ESTADO || '').replace(/_/g, ' ')}</span></td>
      <td class="cell-monto">${cellCobradoAdmin}</td>
      <td class="cell-monto">${cellCobradoJud}</td>
      <td class="cell-monto">${cellGastos}</td>
      <td class="cell-monto" style="font-weight: 700;">${cellIngresos}</td>
      <td class="cell-monto" style="font-weight: 700; color: #10b981;">${cellNeto}</td>
    </tr>`;
  });

  tbody.innerHTML = html;
}

function parseMonto(val) {
  if (!val) return 0;
  const num = Number(String(val).replace(/[^0-9.\-]/g, ''));
  return isNaN(num) ? 0 : num;
}

function formatMonto(num) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(num);
}

// ══════════════════════════════════════════════════════════
// RENDER MÓDULO AUDITORÍA Y CRM (AAM26-AUDIT)
// ══════════════════════════════════════════════════════════
function renderVistaAuditoria() {
  applyFiltersAudit();
}

function applyFiltersAudit() {
  const term = document.getElementById('global-search-input').value.toLowerCase().trim();
  const tbody = document.getElementById('tbody-auditoria');
  
  let logs = [];
  STATE.causas.forEach(c => {
    if (c.BITACORA) {
      logs.push({
        id: c.ID,
        cliente: c.CLIENTE,
        abogado: c.ABOGADO,
        bitacora: c.BITACORA,
        fechaCambio: c.FECHA_CAMBIO_ESTADO || c.FECHA_ALTA_SISTEMA || ''
      });
    }
  });

  // Filtrar
  if (term) {
    logs = logs.filter(l => {
      return String(l.id || '').toLowerCase().includes(term) ||
             String(l.cliente || '').toLowerCase().includes(term) ||
             String(l.bitacora || '').toLowerCase().includes(term) ||
             String(l.abogado || '').toLowerCase().includes(term);
    });
  }

  if (logs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">No hay bitácoras cargadas.</td></tr>`;
    return;
  }

  let html = '';
  logs.forEach(l => {
    const f = l.fechaCambio ? new Date(l.fechaCambio).toLocaleString('es-AR') : '—';
    html += `
      <tr onclick="openDrawerFicha('${l.id}')">
        <td class="cell-id">${l.id}</td>
        <td style="font-family: var(--font-mono); font-size: 11px;">${f}</td>
        <td>${l.abogado || 'Estudio AAM'}</td>
        <td><span class="status-chip" style="color: var(--gold); border-color: rgba(255,215,0,0.2);">CRM</span></td>
        <td style="font-size: 12px; color: var(--text-muted);">${l.bitacora}</td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// CONTROLADOR DEL DRAWER (SLIDE-OVER LATERAL)
// ══════════════════════════════════════════════════════════
function openDrawerNuevaCausa() {
  STATE.causaActual = null;
  document.getElementById('drawer-title-nombre').textContent = 'NUEVO EXPEDIENTE';
  document.getElementById('drawer-title-id').textContent = 'Alta de Causa';
  document.getElementById('drawer-estado').textContent = 'INGRESADO';
  document.getElementById('drawer-semaforo').style.display = 'none';

  // Limpiar formulario
  const form = document.getElementById('drawer-form');
  form.reset();
  document.getElementById('form-ID_CAUSA').value = '';
  
  // Re-inicializar selector de estados
  llenarSelectorEstadosForm('');
  
  // Inicializar checklist vacío
  renderChecklistDocumental({});

  // Timeline CRM vacío
  document.getElementById('drawer-crm-timeline').innerHTML = `<div class="empty-log">La bitácora se inicializará al dar de alta.</div>`;

  // Forzar ir a la primera pestaña (Identidad) al abrir
  switchDrawerTab('identidad');

  const btnWaDrawer = document.getElementById('btn-wa-drawer');
  if (btnWaDrawer) btnWaDrawer.style.display = 'none';

  // Abrir panel
  document.getElementById('drawer-overlay').classList.add('active');
  document.getElementById('drawer-ficha').classList.add('open');

  evaluarEstadoSugeridoFronend();
  aplicarRestriccionesRolFicha();
}

function openDrawerFicha(idCausa) {
  const c = STATE.causas.find(x => x.ID === idCausa);
  if (!c) return;

  STATE.causaActual = c;
  
  // Actualizar Títulos de Ficha
  document.getElementById('drawer-title-nombre').textContent = c.CLIENTE || 'EXPEDIENTE';
  document.getElementById('drawer-title-id').textContent = `ID: ${c.ID}`;
  document.getElementById('drawer-estado').textContent = (c.ESTADO || 'INGRESADO').replace(/_/g, ' ');
  
  const sem = document.getElementById('drawer-semaforo');
  sem.style.display = 'inline-block';
  sem.textContent = c.SEMAFORO || 'VERDE';
  sem.className = `sem-badge sem-${c.SEMAFORO || 'VERDE'}`;

  // Completar formulario con datos
  const form = document.getElementById('drawer-form');
  form.reset();
  
  // Cargar inputs por ID coincidente
  for (const key in c) {
    const el = document.getElementById('form-' + key);
    if (el) {
      el.value = c[key] || '';
    }
  }

  // Rellenar selector de estados y marcar el actual
  llenarSelectorEstadosForm(c.ESTADO);

  // Generar checklist documental
  renderChecklistDocumental(c);

  // Cargar timeline CRM desde el servidor de GAS
  fetchCrmTimeline(c.ID);

  // Proteger campos contables sensibles en el Drawer según privilegios
  protegerCamposContablesDrawer();

  // Forzar ir a la primera pestaña (Identidad) al abrir
  switchDrawerTab('identidad');

  const btnWaDrawer = document.getElementById('btn-wa-drawer');
  if (btnWaDrawer) btnWaDrawer.style.display = 'inline-flex';

  // Abrir panel
  document.getElementById('drawer-overlay').classList.add('active');
  document.getElementById('drawer-ficha').classList.add('open');

  evaluarEstadoSugeridoFronend();
  aplicarRestriccionesRolFicha();
}

function closeDrawerFicha() {
  document.getElementById('drawer-overlay').classList.remove('active');
  document.getElementById('drawer-ficha').classList.remove('open');
}

function llenarSelectorEstadosForm(estadoActual) {
  const sel = document.getElementById('form-ESTADO');
  let h = '';
  Object.keys(CAT_ESTADOS).forEach(est => {
    h += `<option value="${est}" ${est === estadoActual ? 'selected' : ''}>${CAT_ESTADOS[est].label}</option>`;
  });
  sel.innerHTML = h;
}

function renderChecklistDocumental(c) {
  const container = document.getElementById('docs-checklist-container');
  let html = '';
  
  DOCS_LIST.forEach(doc => {
    const val = c[doc.id] ? String(c[doc.id]).trim() : '';
    const isRevision = val.startsWith('EN_REVISION');
    const checked = (val !== '' && val !== 'FALTA' && val !== 'PENDIENTE' && !isRevision) ? 'checked' : '';
    
    if (isRevision) {
      const fileUrl = val.split(' | ')[1] || '';
      html += `
        <div style="display: flex; flex-direction: column; gap: 4px; padding: 8px 10px; background: rgba(234, 179, 8, 0.08); border: 1px solid rgba(234, 179, 8, 0.25); border-radius: 6px; margin-bottom: 8px;">
          <div style="font-size: 12.5px; font-weight: 600; color: #854d0e; display: flex; align-items: center; justify-content: space-between;">
            <span>🔍 ${doc.label}</span>
            <span style="font-size: 9px; font-family: monospace; background: #eab308; color: #fff; padding: 2px 5px; border-radius: 3px; font-weight: bold;">EN REVISIÓN</span>
          </div>
          <div style="display: flex; gap: 6px; margin-top: 6px;">
            <a href="${fileUrl}" target="_blank" class="btn-director-mode" style="padding: 4px 8px; font-size: 11px; background: #4b5563; color: #fff; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-weight: 500;">
              👀 Ver
            </a>
            <button type="button" onclick="window.aprobarDocumento('${c.ID}', '${doc.id}', '${fileUrl}')" style="padding: 4px 8px; font-size: 11px; background: #16a34a; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
              ✓ Aprobar
            </button>
            <button type="button" onclick="window.rechazarDocumento('${c.ID}', '${doc.id}')" style="padding: 4px 8px; font-size: 11px; background: #dc2626; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
              ✗ Rechazar
            </button>
          </div>
        </div>
      `;
    } else {
      const hasUrl = val.startsWith('http');
      const verLink = hasUrl ? ` <a href="${val}" target="_blank" style="color: #2563eb; font-size: 11px; text-decoration: underline; margin-left: 6px; font-weight: 500;">[Ver]</a>` : '';
      
      html += `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 2px 0;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #334155; font-weight: normal; cursor: pointer; text-transform: none; margin: 0; flex: 1;">
            <input type="checkbox" name="${doc.id}" value="${val || 'COMPLETO'}" ${checked} style="width: auto; cursor: pointer;">
            ${doc.label}
          </label>
          ${verLink}
        </div>
      `;
    }
  });
  
  container.innerHTML = html;
}

window.aprobarDocumento = function(idCausa, docId, fileUrl) {
  if (STATE.syncLock) return;
  if (!confirm(`¿Está seguro de aprobar el documento "${docId}"?`)) return;

  document.body.classList.add('saving-shield');
  STATE.syncLock = true;

  const bodyData = {
    action: 'editarCausa',
    email: STATE.usuario.email,
    idCausa: idCausa,
    datos: {
      [docId]: fileUrl,
      BITACORA_NUEVA: `[SISTEMA] Documento aprobado: ${docId}`
    }
  };

  fetch(getApiEndpoint(), {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData)
  })
  .then(() => {
    showToast('Documento aprobado con éxito.');
    setTimeout(() => {
      document.body.classList.remove('saving-shield');
      STATE.syncLock = false;
      
      if (STATE.causaActual && STATE.causaActual.ID === idCausa) {
        STATE.causaActual[docId] = fileUrl;
        renderChecklistDocumental(STATE.causaActual);
      }
      
      fetchDataCore(false);
    }, 1500);
  })
  .catch(err => {
    document.body.classList.remove('saving-shield');
    STATE.syncLock = false;
    showToast('Error al aprobar documento: ' + err.message, 'error');
  });
};

window.rechazarDocumento = function(idCausa, docId) {
  if (STATE.syncLock) return;
  if (!confirm(`¿Está seguro de rechazar el documento "${docId}"? Se eliminará el registro y se pedirá re-subida.`)) return;

  document.body.classList.add('saving-shield');
  STATE.syncLock = true;

  const bodyData = {
    action: 'editarCausa',
    email: STATE.usuario.email,
    idCausa: idCausa,
    datos: {
      [docId]: '',
      BITACORA_NUEVA: `[SISTEMA] Documento rechazado: ${docId}`
    }
  };

  fetch(getApiEndpoint(), {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData)
  })
  .then(() => {
    showToast('Documento rechazado con éxito.');
    setTimeout(() => {
      document.body.classList.remove('saving-shield');
      STATE.syncLock = false;
      
      if (STATE.causaActual && STATE.causaActual.ID === idCausa) {
        STATE.causaActual[docId] = '';
        renderChecklistDocumental(STATE.causaActual);
      }
      
      fetchDataCore(false);
      
      setTimeout(() => {
        if (confirm("¿Desea enviar una notificación de WhatsApp al cliente informando del rechazo?")) {
          const c = STATE.causaActual;
          if (c) {
            const tel = formatTelefonoWA(c.TELEFONO);
            const text = encodeURIComponent(`*Estudio AAM - Novedad de tu Expediente N° ${c.ID}*\n\nHola ${c.CLIENTE || ''},\n\nRevisamos el documento que subiste (*${docId.replace(/_/g, ' ')}*) y no es del todo legible o correcto. Por favor, volvelo a subir desde tu enlace personal:\n\nhttps://abogadosasociadosmaster-cloud.github.io/-aam-portal/?id=${c.ID}&action=docs&nombre=${encodeURIComponent(c.CLIENTE)}&estado=${c.ESTADO || ''}&docs=${docId}\n\nMuchas gracias.`);
            const url = tel ? `https://wa.me/${tel}?text=${text}` : `https://wa.me/?text=${text}`;
            window.open(url, '_blank');
          }
        }
      }, 500);
    }, 1500);
  })
  .catch(err => {
    document.body.classList.remove('saving-shield');
    STATE.syncLock = false;
    showToast('Error al rechazar documento: ' + err.message, 'error');
  });
};

function protegerCamposContablesDrawer() {
  const esSuperior = (STATE.usuario.rol === 'SUPERVISOR_GRAL' || STATE.usuario.rol === 'SUPERVISOR_OP');
  const puedeVerMonto = esSuperior || STATE.modoDirector;

  // Elementos calculados contables en el drawer
  const campos = ['TOTAL_GASTOS', 'TOTAL_INGRESOS_CAUSA', 'RESULTADO_NETO'];
  
  campos.forEach(c => {
    const el = document.getElementById('form-' + c);
    if (el) {
      if (!puedeVerMonto) {
        el.value = '*****';
        el.style.filter = 'blur(4px)';
      } else {
        el.value = STATE.causaActual ? STATE.causaActual[c] || '' : '';
        el.style.filter = '';
      }
    }
  });
}

function fetchCrmTimeline(idCausa) {
  const container = document.getElementById('drawer-crm-timeline');
  container.innerHTML = `<div class="empty-log">Sincronizando novedades...</div>`;

  const isLocal = (window.location.port === '8100' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocal) {
    fetch(getApiEndpoint(`action=getInteracciones&idCausa=${idCausa}&_t=${Date.now()}`))
      .then(res => res.json())
      .then(response => {
        if (response && response.status === 'success') {
          renderTimelineHtml(container, response.data || []);
        } else {
          container.innerHTML = `<div class="empty-log" style="color: var(--rojo);">Error al cargar CRM.</div>`;
        }
      })
      .catch(err => {
        container.innerHTML = `<div class="empty-log" style="color: var(--rojo);">Error al cargar CRM.</div>`;
      });
  } else {
    // Fallback JSONP
    const cb = 'cbTimeline_' + Date.now();
    window[cb] = (response) => {
      if (response && response.status === 'success') {
        renderTimelineHtml(container, response.data || []);
      } else {
        container.innerHTML = `<div class="empty-log" style="color: var(--rojo);">Error al cargar CRM.</div>`;
      }
      const scriptEl = document.getElementById(cb);
      if (scriptEl) scriptEl.remove();
    };

    const script = document.createElement('script');
    script.id = cb;
    script.src = getApiEndpoint(`action=getInteracciones&idCausa=${idCausa}&callback=${cb}`);
    document.head.appendChild(script);
  }
}

function renderTimelineHtml(container, data) {
  if (data.length === 0) {
    container.innerHTML = `<div class="empty-log">Sin registro de interacciones aún.</div>`;
  } else {
    let html = '';
    data.forEach(it => {
      const dateStr = it.fecha ? new Date(it.fecha).toLocaleString('es-AR') : '—';
      const type = it.tipo || 'SISTEMA';
      html += `
        <div class="timeline-item">
          <div class="timeline-meta">
            <span class="timeline-date">${dateStr}</span>
            <span class="timeline-type ${type}">${type}</span>
          </div>
          <div style="font-size: 10px; color: var(--gold); margin-bottom: 2px;">Resp: ${it.operador || 'Sistema'}</div>
          <div class="timeline-desc">${it.contenido}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  }
}

// ══════════════════════════════════════════════════════════
// PERSISTENCIA Y ESCRITURA EN GOOGLE SHEETS
// ══════════════════════════════════════════════════════════
function saveCausaData() {
  if (STATE.syncLock) return;

  const form = document.getElementById('drawer-form');
  const fd = new FormData(form);
  const data = {};
  
  fd.forEach((val, key) => {
    data[key] = val;
  });

  // Los checkboxes no tildados no se envían en FormData, hay que forzarlos como vacíos si no están en payload
  DOCS_LIST.forEach(doc => {
    if (!data[doc.id]) {
      data[doc.id] = ''; // Pendiente
    }
  });

  // Interceptar coherencia de estado (Mente Maestra)
  const estadoActualForm = data.ESTADO;
  const estadoSugerido = inferirEstadoFronend();
  if (estadoSugerido && estadoSugerido !== estadoActualForm) {
    const labelSugerido = CAT_ESTADOS[estadoSugerido] ? CAT_ESTADOS[estadoSugerido].label : estadoSugerido;
    if (confirm(`🧠 MENTE MAESTRA:\nDetectamos que según los datos ingresados, el estado procesal coherente debería ser:\n\n👉 "${labelSugerido}"\n\n¿Desea actualizar el estado automáticamente antes de guardar?`)) {
      data.ESTADO = estadoSugerido;
      const selectEstado = document.getElementById('form-ESTADO');
      if (selectEstado) selectEstado.value = estadoSugerido;
    }
  }

  // Capturar novedad
  const novedad = document.getElementById('form-BITACORA_NEW').value.trim();
  if (novedad) {
    data.BITACORA_NUEVA = novedad;
  }

  // Identificar acción (Alta vs Edición)
  const idCausa = document.getElementById('form-ID_CAUSA').value;
  const isEdit = idCausa !== '';
  const action = isEdit ? 'editarCausa' : 'crearCausa';

  // Capturar estado previo para narrativa WA
  const oldCausa = STATE.causaActual ? Object.assign({}, STATE.causaActual) : null;
  const isNew = !isEdit;
  const oldEstado = oldCausa ? oldCausa.ESTADO : '';
  const newEstado = data.ESTADO;
  const statusChanged = isNew || (oldEstado !== newEstado) || novedad;

  if (statusChanged) {
    STATE.pendingWhatsAppPrompt = {
      isNew: isNew,
      oldCausa: oldCausa,
      clientName: data.CLIENTE,
      clientPhone: data.TELEFONO,
      tempCausa: Object.assign({ ID: idCausa || 'NUEVO' }, oldCausa || {}, data)
    };
  } else {
    STATE.pendingWhatsAppPrompt = null;
  }

  // Blindar interfaz
  document.body.classList.add('saving-shield');
  STATE.syncLock = true;

  // Construir cuerpo de petición POST
  const bodyData = {
    action: action,
    email: STATE.usuario.email,
    idCausa: idCausa,
    datos: data
  };

  // Como la petición POST a GAS es no-cors, la enviamos directamente
  fetch(getApiEndpoint(), {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData)
  }).then(() => {
    showToast(isEdit ? 'Cambios solicitados correctamente.' : 'Alta de causa solicitada correctamente.');
    document.getElementById('form-BITACORA_NEW').value = '';
    
    // Esperar un segundo para que se procese en la nube y refrescar
    setTimeout(() => {
      document.body.classList.remove('saving-shield');
      STATE.syncLock = false;
      closeDrawerFicha();
      fetchDataCore(false);
    }, 1500);
  }).catch(err => {
    document.body.classList.remove('saving-shield');
    STATE.syncLock = false;
    showToast('Error al enviar datos: ' + err.message, 'error');
  });
}

// ══════════════════════════════════════════════════════════
// WHATSAPP NARRATIVO Y DOCUMENTAL
// ══════════════════════════════════════════════════════════
function formatTelefonoWA(tel) {
  if (!tel) return '';
  let clean = String(tel).replace(/\D/g, '');
  if (clean.length === 0) return '';
  if (clean.startsWith('549')) return clean;
  if (clean.startsWith('54')) return '9' + clean;
  if (clean.startsWith('0')) clean = clean.slice(1);
  return '549' + clean;
}

function safeFormatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('es-AR');
  } catch (e) {
    return '';
  }
}

function safeFormatCurrency(val) {
  const num = Number(val);
  if (isNaN(num) || num <= 0) return '';
  return '$' + num.toLocaleString('es-AR');
}

function generarNarrativaWhatsApp(c, previous) {
  const id = c.ID || c.ID_CAUSA;
  const cli = c.CLIENTE || 'estimado cliente';
  const estLabel = CAT_ESTADOS[c.ESTADO] ? CAT_ESTADOS[c.ESTADO].label : c.ESTADO;
  
  // Detectar cambios clave
  let cambios = [];
  const camposClave = {
    "MONTO_OFERTA": "Monto de Oferta",
    "ESTADO": "Estado Procesal",
    "FECHA_COBRO_ADMIN": "Fecha de Cobro Administrativo",
    "FECHA_COBRO_JUD": "Fecha de Cobro Judicial",
    "ABOGADO": "Abogado Asignado",
    "NRO_EXPEDIENTE": "Número de Expediente"
  };
  
  if (previous) {
    for (let k in camposClave) {
      if (c[k] && String(c[k]) !== String(previous[k] || "")) {
        cambios.push(camposClave[k]);
      }
    }
  }
  
  let novActual = cambios.length > 0 ? `Se actualizó: ${cambios.join(", ")}` : "Actualización de rutina";
  if (!previous) {
    novActual = "Alta de legajo e inicio de gestión";
  }

  const queryID = c.NRO_EXPEDIENTE || id;
  const urlConsultas = `https://wwwnoti.jus.mendoza.gov.ar/listas/proveidos/resultados.php?v_expediente=${queryID}`;

  let msg = `📁 *Legajo N° ${id}*\n`;
  msg += `🕒 ${novActual}\n\n`;

  if (c.ESTADO === 'COBRADO_ADMIN' || c.ESTADO === 'COBRADO_JUDICIAL' || c.ESTADO === 'ACEPTADO_ADMIN' || c.ESTADO === 'FIRME') {
    msg += `Hola *${cli}* 😊. ¡Tenemos noticias muy positivas sobre su expediente!\n\n`;
  } else {
    msg += `Hola *${cli}* 👋, le escribimos para informarle sobre la última evolución registrada.\n\n`;
  }

  msg += `📌 *ESTADO ACTUAL:* *${estLabel.toUpperCase()}*\n\n`;

  // BLOQUE ADMINISTRATIVO (Solo si aplica)
  if (c.RECLAMADO_A || c.FECHA_PRESENTACION_CIA || c.FECHA_COBRO_ADMIN || c.MONTO_OFERTA) {
    msg += `───────────────────────\n`;
    msg += `🏛️ *INSTANCIA ADMINISTRATIVA*\n`;
    if (c.RECLAMADO_A) msg += `• Reclamado a: ${c.RECLAMADO_A}\n`;
    if (c.FECHA_PRESENTACION_CIA) msg += `• Presentación: ${safeFormatDate(c.FECHA_PRESENTACION_CIA)}\n`;
    if (c.FECHA_COBRO_ADMIN) msg += `• Fecha Cobro: ${safeFormatDate(c.FECHA_COBRO_ADMIN)}\n`;
    
    const ofertaFmt = safeFormatCurrency(c.MONTO_OFERTA);
    if (ofertaFmt) msg += `• Oferta Vigente: ${ofertaFmt}\n`;
    
    const cobradoAdminFmt = safeFormatCurrency(c.MONTO_COBRADO_ADMIN);
    if (cobradoAdminFmt) msg += `• Total Percibido: ${cobradoAdminFmt}\n`;
  }

  // BLOQUE JUDICIAL (Solo si aplica)
  if (c.FECHA_DEMANDA || c.NRO_EXPEDIENTE || c.FECHA_COBRO_JUD || c.MONTO_SENTENCIA) {
    msg += `\n⚖️ *INSTANCIA JUDICIAL*\n`;
    if (c.NRO_EXPEDIENTE) {
      msg += `• Expediente: ${c.NRO_EXPEDIENTE}\n`;
      msg += `🌐 *Seguimiento Online:* ${urlConsultas}\n`;
    }
    if (c.FECHA_DEMANDA) msg += `• Inicio Demanda: ${safeFormatDate(c.FECHA_DEMANDA)}\n`;
    if (c.FECHA_SENTENCIA) msg += `• Sentencia: ${safeFormatDate(c.FECHA_SENTENCIA)}\n`;
    
    const sentenciaFmt = safeFormatCurrency(c.MONTO_SENTENCIA);
    if (sentenciaFmt) msg += `• Monto a Cobrar: ${sentenciaFmt}\n`;

    if (c.FECHA_COBRO_JUD) {
      let fP = new Date(c.FECHA_COBRO_JUD);
      let hoy = new Date(); hoy.setHours(0,0,0,0);
      if (fP > hoy) {
        msg += `• PAGO PROGRAMADO: ${safeFormatDate(c.FECHA_COBRO_JUD)} ⏳\n`;
      } else {
        msg += `• FECHA DE PAGO: ${safeFormatDate(c.FECHA_COBRO_JUD)} ✅\n`;
      }
    }
    
    const cobradoJudFmt = safeFormatCurrency(c.MONTO_COBRADO_JUD);
    if (cobradoJudFmt) msg += `• TOTAL COBRADO: ${cobradoJudFmt} 💰\n`;
  }

  msg += `───────────────────────\n\n`;
  msg += `Quedamos a su disposición.\n*AAM26 · Gestión Jurídica*`;
  return encodeURIComponent(msg);
}

function enviarReporteWhatsApp() {
  if (!STATE.causaActual) return;
  const c = STATE.causaActual;
  
  // Capturar datos en tiempo real del formulario para la narrativa (pre-guardado)
  const form = document.getElementById('drawer-form');
  const fd = new FormData(form);
  const formData = {};
  fd.forEach((val, key) => {
    formData[key] = val;
  });
  
  const mergedCausa = Object.assign({}, c, formData);
  
  const tel = formatTelefonoWA(mergedCausa.TELEFONO);
  const text = generarNarrativaWhatsApp(mergedCausa, c);
  
  // Guardar log en el CRM localmente
  const constancia = `\n[Reporte de evolución WhatsApp enviado al cliente el ${new Date().toLocaleString()}]`;
  
  // Realizar POST rápido al servidor para asentar constancia
  fetch(getApiEndpoint(), {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      action: 'editarCausa',
      email: STATE.usuario.email,
      idCausa: c.ID,
      datos: { BITACORA: (c.BITACORA || '') + constancia }
    })
  });

  const url = tel ? `https://wa.me/${tel}?text=${text}` : `https://wa.me/?text=${text}`;
  window.open(url, '_blank');
}

function abrirLinkCanalDirecto() {
  if (STATE.causaActual && STATE.causaActual.TELEFONO) {
    const tel = formatTelefonoWA(STATE.causaActual.TELEFONO);
    window.open(`https://wa.me/${tel}`, '_blank');
  } else {
    // Si no hay causa abierta, abre WhatsApp Web general
    window.open(`https://web.whatsapp.com/`, '_blank');
  }
}

async function ejecutarEnvioWhatsAppFaltantes(c, missing) {
  if (missing.length === 0) {
    showToast('Todos los documentos están completos.', 'warning');
    return;
  }

  // 1. Armar link dinámico del portal
  const portalBaseUrl = 'https://abogadosasociadosmaster-cloud.github.io/-aam-portal/';
  let driveId = String(c.LINK_DOC || c.URL_DRIVE || '').trim();
  const folderMatch = driveId.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) driveId = folderMatch[1];

  const docsParam = missing.map(d => d.id).join('|');
  const linkPortal = portalBaseUrl
    + '?id=' + encodeURIComponent(c.ID)
    + '&action=docs'
    + '&nombre=' + encodeURIComponent(c.CLIENTE || '')
    + '&estado=' + encodeURIComponent(c.ESTADO || 'INGRESADO')
    + (driveId ? '&drive=' + encodeURIComponent(driveId) : '')
    + (docsParam ? '&docs=' + encodeURIComponent(docsParam) : '');

  // Intentar acortar el link llamando a la API
  let linkFinal = linkPortal;
  showToast('Generando enlace corto...', 'warning');
  try {
    const res = await fetch(getApiEndpoint(`action=shorten&url=${encodeURIComponent(linkPortal)}`));
    const data = await res.json();
    if (data && data.status === 'success' && data.shortUrl) {
      linkFinal = data.shortUrl;
    }
  } catch (err) {
    console.error('Error al acortar link:', err);
  }

  // 2. Construir mensaje
  const cli = c.CLIENTE || 'estimado cliente';
  let msg = `Estimado/a *${cli}*,\n\n`;
  msg += `Le escribimos de *AAM Abogados Asociados* en relación a su expediente *N° ${c.ID}*.\n\n`;
  msg += `Para continuar con el trámite, requerimos que nos facilite la siguiente documentación pendiente:\n`;
  
  missing.forEach(d => {
    msg += `• *${d.label}*\n`;
  });
  
  msg += `\nPuede subir los archivos o fotos de manera rápida y segura desde su celular ingresando al siguiente enlace:\n`;
  msg += `${linkFinal}\n\n`;
  msg += `Quedamos a su disposición.\n*AAM · Gestión Jurídica*`;

  const tel = formatTelefonoWA(c.TELEFONO);
  const url = tel ? `https://wa.me/${tel}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  
  // Registrar aviso en la bitácora de la causa mediante fetch rápido (POST)
  const constancia = `\n[Recordatorio de documentación faltante enviado al cliente por WhatsApp el ${new Date().toLocaleString()}]`;
  fetch(getApiEndpoint(), {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      action: 'editarCausa',
      email: STATE.usuario.email,
      idCausa: c.ID,
      datos: { BITACORA: (c.BITACORA || '') + constancia }
    })
  });

  window.open(url, '_blank');
}

window.solicitarFaltantesDesdeTabla = function(idCausa) {
  const c = STATE.causas.find(x => x.ID === idCausa);
  if (!c) return;
  
  const missing = [];
  DOCS_LIST.forEach(doc => {
    const val = c[doc.id] ? String(c[doc.id]).trim() : '';
    const isRevision = val.startsWith('EN_REVISION');
    const checked = (val !== '' && val !== 'FALTA' && val !== 'PENDIENTE' && !isRevision);
    if (!checked) {
      missing.push(doc);
    }
  });
  
  ejecutarEnvioWhatsAppFaltantes(c, missing);
};

function enviarFaltantesWhatsAppActual() {
  if (!STATE.causaActual) return;
  const c = STATE.causaActual;
  
  const missing = [];
  DOCS_LIST.forEach(doc => {
    const checkbox = document.querySelector(`input[name="${doc.id}"]`);
    if (checkbox) {
      if (!checkbox.checked) {
        missing.push(doc);
      }
    } else {
      const val = c[doc.id] ? String(c[doc.id]).trim() : '';
      const isRevision = val.startsWith('EN_REVISION');
      const checked = (val !== '' && val !== 'FALTA' && val !== 'PENDIENTE' && !isRevision);
      if (!checked) {
        missing.push(doc);
      }
    }
  });
  
  ejecutarEnvioWhatsAppFaltantes(c, missing);
}

function abrirCarpetaDrive() {
  const url = document.getElementById('form-URL_DRIVE').value;
  if (url && url.startsWith('http')) {
    window.open(url, '_blank');
  } else {
    showToast('No hay una carpeta de Drive creada para esta causa.', 'warning');
  }
}

// ══════════════════════════════════════════════════════════
// AUXILIARES Y SOPORTE DE CACHÉ
// ══════════════════════════════════════════════════════════
function limpiarCacheLocal() {
  localStorage.clear();
  showToast('Caché del navegador limpia. El sistema se reiniciará.');
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.style.background = type === 'error' ? 'var(--rojo)' : type === 'warning' ? 'var(--amarillo)' : 'var(--bg-sidebar)';
  toast.style.border = type === 'error' ? '1px solid rgba(239, 68, 68, 0.4)' : type === 'warning' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-active)';
  
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function fetchReglasYHeaders() {
  const isLocal = (window.location.port === '8100' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  if (isLocal) {
    fetch(getApiEndpoint(`email=${encodeURIComponent(STATE.usuario.email)}&action=getReglas&_t=${Date.now()}`))
      .then(res => res.json())
      .then(res => {
        if (res && res.status === 'success') {
          STATE.reglas = res.data;
        }
      });
    fetch(getApiEndpoint(`email=${encodeURIComponent(STATE.usuario.email)}&action=getHeaders&_t=${Date.now()}`))
      .then(res => res.json())
      .then(res => {
        if (res && res.status === 'success') {
          STATE.headers = res.data;
        }
      });
  } else {
    const cbReglas = 'cbReglas_' + Date.now();
    window[cbReglas] = (res) => {
      if (res && res.status === 'success') {
        STATE.reglas = res.data;
      }
      const scriptEl = document.getElementById(cbReglas);
      if (scriptEl) scriptEl.remove();
    };
    const scriptReglas = document.createElement('script');
    scriptReglas.id = cbReglas;
    scriptReglas.src = getApiEndpoint(`email=${encodeURIComponent(STATE.usuario.email)}&action=getReglas&callback=${cbReglas}&_t=${Date.now()}`);
    document.head.appendChild(scriptReglas);

    const cbHeaders = 'cbHeaders_' + Date.now();
    window[cbHeaders] = (res) => {
      if (res && res.status === 'success') {
        STATE.headers = res.data;
      }
      const scriptEl = document.getElementById(cbHeaders);
      if (scriptEl) scriptEl.remove();
    };
    const scriptHeaders = document.createElement('script');
    scriptHeaders.id = cbHeaders;
    scriptHeaders.src = getApiEndpoint(`email=${encodeURIComponent(STATE.usuario.email)}&action=getHeaders&callback=${cbHeaders}&_t=${Date.now()}`);
    document.head.appendChild(scriptHeaders);
  }
}

function inferirEstadoFronend() {
  const form = document.getElementById('drawer-form');
  if (!form) return null;
  const fd = new FormData(form);
  const causaDespues = {};
  fd.forEach((val, key) => {
    causaDespues[key] = val;
  });
  
  DOCS_LIST.forEach(doc => {
    const input = form.querySelector(`input[name="${doc.id}"]`);
    if (input) {
      causaDespues[doc.id] = input.checked ? (input.value || 'COMPLETO') : '';
    }
  });

  const causaAntes = STATE.causaActual || {};
  const estadoActual = causaAntes.ESTADO || 'INGRESADO';

  const reglas = STATE.reglas && STATE.reglas.length > 0 ? STATE.reglas : [];
  if (reglas.length === 0) return null;

  const camposModificados = [];
  Object.keys(causaDespues).forEach(key => {
    if (key.indexOf('_') === 0) return;
    const valAntes = causaAntes[key];
    const valDespues = causaDespues[key];
    
    const strAntes = valAntes !== undefined && valAntes !== null ? String(valAntes).trim() : '';
    const strDespues = valDespues !== undefined && valDespues !== null ? String(valDespues).trim() : '';

    if (strDespues !== strAntes) {
      camposModificados.push({
        columna: key,
        valorAntes: valAntes,
        valorNuevo: valDespues
      });
    }
  });

  const reglasOrdenadas = reglas.slice().sort((a, b) => {
    const prioA = parseInt(a.PRIORIDAD) || 10;
    const prioB = parseInt(b.PRIORIDAD) || 10;
    return prioA - prioB;
  });

  for (let i = 0; i < reglasOrdenadas.length; i++) {
    const regla = reglasOrdenadas[i];
    const triggerCol = (regla.COLUMNA_TRIGGER || '').trim();
    if (!triggerCol) continue;

    const modificacion = camposModificados.find(m => m.columna === triggerCol);
    if (modificacion) {
      if (regla.REQ_ESTADO_PREVIO && regla.REQ_ESTADO_PREVIO.trim() !== '' && regla.REQ_ESTADO_PREVIO.trim() !== '—') {
        const estadosPreviosPermitidos = regla.REQ_ESTADO_PREVIO.split(',').map(s => s.trim());
        if (estadosPreviosPermitidos.indexOf(estadoActual) === -1) {
          continue;
        }
      }

      const valNuevo = modificacion.valorNuevo;
      if (cumpleCondicionRegla(valNuevo, regla.CONDICION)) {
        let nuevoEst = regla.NUEVO_ESTADO;
        if (nuevoEst === '(ESTADO_PREVIO)') {
          nuevoEst = 'INGRESADO';
        }
        return nuevoEst;
      }
    }
  }

  return null;
}

function evaluarEstadoSugeridoFronend() {
  const suggestedState = inferirEstadoFronend();
  const selectEstado = document.getElementById('form-ESTADO');
  const sugDiv = document.getElementById('form-ESTADO-suggestion');
  if (!sugDiv) return;

  if (suggestedState && selectEstado && suggestedState !== selectEstado.value) {
    const label = CAT_ESTADOS[suggestedState]?.label || suggestedState;
    sugDiv.style.display = 'block';
    sugDiv.innerHTML = `
      <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 6px; padding: 10px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #d4af37; margin-top: 8px; font-family: var(--font-sans);">
        <span>💡 Sugerido: <strong>${label}</strong></span>
        <button type="button" class="btn-solid" onclick="window.aplicarEstadoSugerido('${suggestedState}')" style="padding: 4px 8px; font-size: 11px; background: #d4af37; color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">APLICAR</button>
      </div>
    `;
  } else {
    sugDiv.style.display = 'none';
    sugDiv.innerHTML = '';
  }
}

window.aplicarEstadoSugerido = function(est) {
  const selectEstado = document.getElementById('form-ESTADO');
  if (selectEstado) {
    selectEstado.value = est;
    evaluarEstadoSugeridoFronend();
    showToast(`Estado sugerido aplicado: ${CAT_ESTADOS[est]?.label || est}`);
  }
};

function cumpleCondicionRegla(valor, condicionRaw) {
  if (valor === undefined || valor === null) valor = '';
  const valStr = String(valor).trim();
  let cond = String(condicionRaw || '').trim();

  if (cond === '#NAME?') {
    cond = 'COMPLETO';
  }

  if (cond === '') return false;

  function esFecha(v) {
    if (!v) return false;
    if (v instanceof Date) return !isNaN(v.getTime());
    if (/^\d+$/.test(v)) return false; 
    const t = Date.parse(v);
    return !isNaN(t);
  }

  function esVacio(v) {
    return v === '';
  }

  if (cond.toLowerCase() === 'fecha') {
    return esFecha(valStr);
  }

  if (cond.toLowerCase() === 'no vacío' || cond.toLowerCase() === 'no vacio') {
    return !esVacio(valStr);
  }
  if (cond.toLowerCase() === 'vacío' || cond.toLowerCase() === 'vacio') {
    return esVacio(valStr);
  }

  const matchNoVacioDiferente = cond.match(/^(no vac[ií]o)\s*(?:≠|!=)\s*(.+)$/i);
  if (matchNoVacioDiferente) {
    const target = matchNoVacioDiferente[2].trim();
    return !esVacio(valStr) && valStr.toUpperCase() !== target.toUpperCase();
  }

  const matchDiferente = cond.match(/^(?:≠|!=)\s*(.+)$/);
  if (matchDiferente) {
    const target = matchDiferente[1].trim();
    return !esVacio(valStr) && valStr.toUpperCase() !== target.toUpperCase();
  }

  const matchNumeric = cond.match(/^(?:n[uú]mero\s*)?([><=]=?)\s*([+-]?\d+(?:\.\d+)?)$/i);
  if (matchNumeric) {
    const op = matchNumeric[1];
    const limit = parseFloat(matchNumeric[2]);
    const valNum = parseFloat(valStr.replace(',', '.'));
    if (isNaN(valNum)) return false;
    if (op === '>') return valNum > limit;
    if (op === '<') return valNum < limit;
    if (op === '>=') return valNum >= limit;
    if (op === '<=') return valNum <= limit;
    if (op === '=' || op === '==') return valNum === limit;
  }

  return valStr.toUpperCase() === cond.toUpperCase();
}

function aplicarRestriccionesRolFicha() {
  const form = document.getElementById('drawer-form');
  if (!form) return;

  const isEdit = STATE.causaActual !== null;
  const user = STATE.usuario;
  if (!user) return;

  const esCarga = user.rol === 'CARGA';
  const esAbogado = user.rol === 'ABOGADO';

  // Habilitar todos por defecto primero
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.disabled = false;
    el.readOnly = false;
  });

  // Si es un operador de CARGA editando una causa existente
  if (esCarga && isEdit) {
    form.querySelectorAll('input, select, textarea').forEach(el => {
      const name = el.getAttribute('name') || el.id.replace('form-', '');
      const esDoc = DOCS_LIST.some(d => d.id === name);
      const esPermitido = esDoc || name === 'OBSERVACIONES' || name === 'DOCS_ESPECIFICOS' || name === 'BITACORA_NEW';
      
      if (!esPermitido) {
        el.disabled = true;
      }
    });
  }

  // Si es un ABOGADO editando una causa
  if (esAbogado && isEdit) {
    const camposBloqueados = [
      'RESULTADO_NETO', 'CUOTA_LITIS_PCTJE', 'HONORARIOS_PCTJE_ADMIN',
      'TOTAL_A_COBRAR_ADMIN', 'TOTAL_COBRADO_ADMIN', 'SALDO_PENDIENTE_ADMIN',
      'MONTO_ACUERDO_ADMIN', 'COBRADO_CUOTALITIS_ADMIN', 'COBRADO_HONORARIOS_ADMIN'
    ];
    camposBloqueados.forEach(c => {
      const el = document.getElementById('form-' + c);
      if (el) el.disabled = true;
    });
  }
}
