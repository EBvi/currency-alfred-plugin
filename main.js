var app = Application.currentApplication();
app.includeStandardAdditions = true;

var html = app.doShellScript('curl http://info.finance.naver.com/marketindex/exchangeList.nhn')
// var html = app.doShellScript('cat ~/Desktop/test.txt')
    .split(/<!--.*?-->/).join('')
    .split(/[\r\t]/).join(''),
    tbody = (html.match(/<tbody>.*<\/tbody>/)[0]||'')
    .split(/ class=\".*?\"/).join('')
    .split(/ style=\".*?\"/).join('');

var items = [];
tbody.match(/<tr>.*?<\/tr>/g).map(function(tr){
    var arr = tr.match(/<td>(.*?)<\/td>/g).map(function(td){
        return td.split(/<[\/]?.*?>/).join('').trim();
    });
    (arr.length > 1) && (function(arg){ items.push({
        title:`${arr[0]} : ${arr[1]}`,
        arg: arg,
        text: { copy: arg }
    }) })(arr[1].split(',').join(''));
});