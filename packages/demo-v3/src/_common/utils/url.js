/**
 * Created by Liu.Jun on 2020/11/11 22:24.
 */

export function openNewPage(url, target = '_blank') {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.target = target;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 解析当前url的query 参数
export function getUrlQuery(href) {
    const url = String(href === undefined ? window.location.href : href).replace(/#.*$/, '');
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        const query = String(decodeURIComponent($2));
        obj[name] = query;
        return rs;
    });
    return obj;
}
