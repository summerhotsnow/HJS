'use strict';
var songContent = '[00:01.92]La Vie En Rose   Daniela Andrade\n[00:11.00]Hold me close and hold me fast\n[00:15.17]The magic spell you cast\n[00:18.29]This is la vie en rose\n[00:21.00]When you kiss me heaven sighs\n[00:25.57]And though I close my eyes\n[00:28.42]I see la vie en rose\n[00:32.85]When you press me to your heart\n[00:36.00]I am in a world apart\n[00:38.41]A world where roses bloom\n[00:43.01]And when you speak Angels sing from above\n[00:48.56]Everyday words seems\n[00:50.57]To turn into love song\n[00:55.49]Give your heart and soul to me\n[00:59.54]And life will always be la vie en rose\n[01:15.73]And when you speak Angels sing from above\n[01:20.78]Everyday words seems\n[01:23.49]To turn into love song\n[01:28.00]Give your heart and soul to me\n[01:33.00]And life will always be la vie en rose';
function parseLyric(text) {
    //将文本分隔成一行一行，存入数组
    var lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        //保存最终结果的数组
        result = [];
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
        time.forEach(function(v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
        return a[0] - b[0];
    });
    return result;
}
