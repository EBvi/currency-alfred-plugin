var app = Application.currentApplication();
app.includeStandardAdditions = true;

var html = app.doShellScript('curl http://info.finance.naver.com/marketindex/exchangeList.nhn')
// var html = app.doShellScript('cat ~/Desktop/test.txt')
    .split(/<!--.*?-->/).join('')
    .split(/[\r\t]/).join(''),
    tbody = (html.match(/<tbody>.*<\/tbody>/)[0]||'')
    .split(/ class=\".*?\"/).join('')
    .split(/ style=\".*?\"/).join('');

var arr = [];
tbody.match(/<tr>.*?<\/tr>/g).map(function(tr){
    arr.push( tr.match(/<td>(.*?)<\/td>/g).map(function(td){
        return td.split(/<[\/]?.*?>/).join('').trim();
    }) );
});

var r = '<items>';
arr.map(function(v){
    r += `<item><title>${v[0]} : ${v[1]}</title><subtitle></subtitle></item>`;
});
r += '</items>';