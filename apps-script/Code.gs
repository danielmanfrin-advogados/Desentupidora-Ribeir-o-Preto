/**
* Registra os cliques dos sites de leads em uma planilha Google.
* Aceita GET e POST. Cada clique vira uma linha na aba "Cliques".
*
* Como usar:
* 1. Abra a planilha, vá em Extensões > Apps Script e cole este código.
* 2. Implantar > Gerenciar implantações > editar a implantação existente > Nova versão.
* (Assim a URL /exec continua a mesma.)
* 3. Acesso: "Qualquer pessoa".
*/
var ABA = 'Cliques';
var CABECALHO = ['Data', 'Hora', 'Site', 'Nicho', 'Ação', 'Local do botão', 'Página', 'Título',
'Origem', 'UTM source', 'UTM medium', 'UTM campaign', 'UTM term', 'Google Ads',
'Dispositivo', 'Tela', 'Idioma', 'Sessão', 'Mensagem'];
 
function registrar_(p) {
var planilha = SpreadsheetApp.getActiveSpreadsheet();
var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
if (aba.getLastRow() === 0) {
aba.appendRow(CABECALHO);
aba.setFrozenRows(1);
aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
}
var agora = new Date();
var fuso = 'America/Sao_Paulo';
aba.appendRow([
Utilities.formatDate(agora, fuso, 'dd/MM/yyyy'),
Utilities.formatDate(agora, fuso, 'HH:mm:ss'),
p.site || '', p.nicho || '', p.acao || '', p.local || '', p.pagina || '', p.titulo || '',
p.origem || '', p.utm_source || '', p.utm_medium || '', p.utm_campaign || '', p.utm_term || '',
p.gclid || '', p.dispositivo || '', p.tela || '', p.idioma || '', p.sessao || '', p.detalhe || ''
]);
}
 
function doGet(e) {
var p = (e && e.parameter) || {};
if (p.acao) {
var trava = LockService.getScriptLock();
trava.waitLock(10000);
try { registrar_(p); } finally { trava.releaseLock(); }
}
return ContentService.createTextOutput('ok');
}
 
function doPost(e) {
return doGet(e);
}
