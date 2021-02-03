libAttribute.push(
    {'attr': 'globalize', 'func': 'globalize'}
);

libPreload.push(
    {'func': 'globalizePreload'}
);

var trans = "";

function globalizePreload(){
    globalizeChangeLanguage(core.getParams()['lang']);
}


function globalizeChangeLanguage(q){
    if (q) {
        client.get(globalUrl + "assets/json/globalize/" + q + ".json", function(response) {
            if (core.isJson(response)) {
                app.storage("lang", q)
                app.storage(q, response)
                var lang = app.storage("lang");
                trans = app.storage(lang) ? JSON.parse(app.storage(lang)) : '';
            }
        }, false);
        core.rerunLibAttributes("globalize");
    }else if (q == "") {
        app.storage("lang", null)
    }else if (app.storage("lang")) {
        var lang = app.storage("lang");
        trans = JSON.parse(app.storage(lang));
    }
}

function globalize(e){
    var value = e.getAttribute("globalize");
    
    if (trans['translations'] && trans['translations'][value]){
        var children = e.childElementCount;
        if (children > 0) {
            var child = e.firstChild;
            while (child) {
                if (child.nodeType == 3) {
                    child.data = trans['translations'][value];;
                    break;
                }
                child = child.nextSibling;
            }
        }else{
            e.textContent = trans['translations'][value];
        }
    }
}