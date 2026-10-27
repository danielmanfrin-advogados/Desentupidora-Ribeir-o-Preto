/**
 * REGISTRO DE LEADS E CLIQUES NA PLANILHA GOOGLE
 * Portal: Desentupidora em Ribeirão Preto
 * 
 * INSTRUÇÕES RÁPIDAS:
 * 1. Cole todo este código no editor (Extensões > Apps Script na sua planilha).
 * 2. Selecione a função "testar" no topo e clique em "Executar".
 *    - O Google pedirá autorização na primeira vez (clique em Avançado > Acessar).
 *    - Uma linha de teste será gravada imediatamente na aba "Cliques".
 * 3. Clique em "Implantar" > "Nova implantação" (ou Gerenciar implantações > Editar > Nova versão).
 *    - Tipo: App da Web
 *    - Executar como: Eu (seu e-mail)
 *    - Quem pode acessar: Qualquer pessoa (essencial para receber os cliques anônimos do site)
 * 4. Copie a URL gerada (termina com /exec) e cole no arquivo config.js do site no campo "endpoint".
 */

var ABA = 'Cliques';
var CABECALHO = [
  'Data', 'Hora', 'Site', 'Nicho', 'Ação', 'Local do botão', 'Página', 'Título',
  'Origem', 'UTM source', 'UTM medium', 'UTM campaign', 'UTM term', 'Google Ads',
  'Dispositivo', 'Tela', 'Idioma', 'Sessão', 'Mensagem'
];

function registrar_(p) {
  var nomeAba = (typeof ABA !== 'undefined' && ABA) ? ABA : 'Cliques';
  var colunas = (typeof CABECALHO !== 'undefined' && CABECALHO) ? CABECALHO : [
    'Data', 'Hora', 'Site', 'Nicho', 'Ação', 'Local do botão', 'Página', 'Título',
    'Origem', 'UTM source', 'UTM medium', 'UTM campaign', 'UTM term', 'Google Ads',
    'Dispositivo', 'Tela', 'Idioma', 'Sessão', 'Mensagem'
  ];
  
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(nomeAba);
  if (!aba) {
    aba = planilha.insertSheet(nomeAba);
  }
  
  if (aba.getLastRow() === 0) {
    aba.appendRow(colunas);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, colunas.length).setFontWeight('bold');
    aba.getRange(1, 1, 1, colunas.length).setBackground('#ebf3f7');
  }
  
  var agora = new Date();
  var fuso = 'America/Sao_Paulo';
  aba.appendRow([
    Utilities.formatDate(agora, fuso, 'dd/MM/yyyy'),
    Utilities.formatDate(agora, fuso, 'HH:mm:ss'),
    p.site || '',
    p.nicho || '',
    p.acao || '',
    p.local || '',
    p.pagina || '',
    p.titulo || '',
    p.origem || '',
    p.utm_source || '',
    p.utm_medium || '',
    p.utm_campaign || '',
    p.utm_term || '',
    p.gclid || '',
    p.dispositivo || '',
    p.tela || '',
    p.idioma || '',
    p.sessao || '',
    p.detalhe || ''
  ]);
}

function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    if (p.acao) {
      var trava = LockService.getScriptLock();
      trava.waitLock(10000);
      try {
        registrar_(p);
      } finally {
        trava.releaseLock();
      }
    }
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', gravado: !!p.acao }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'erro', mensagem: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  return doGet(e);
}

/**
 * Função para testar diretamente dentro do Google Apps Script.
 * Clique em Executar com esta função selecionada para validar permissões e criar a aba.
 */
function testar() {
  registrar_({
    site: 'desentupidoraribeiraopreto',
    nicho: 'desentupidora',
    acao: 'whatsapp',
    local: 'teste-apps-script',
    pagina: '/',
    titulo: 'Teste Manual Apps Script',
    dispositivo: 'computador',
    tela: '1920x1080',
    idioma: 'pt-BR',
    sessao: 'teste123',
    detalhe: 'Teste de gravação direta na planilha'
  });
  Logger.log('Sucesso! Linha gravada na aba Cliques.');
}
