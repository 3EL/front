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
        var name = e.localName;
        var globalized = trans['translations'][value];

        if (children > 0 && (name == "a" || name == "button")) {
            var child = e.firstChild;
            while (child) {
                if (child.nodeType == 3) {
                    child.data = globalized;
                    break;
                }
                child = child.nextSibling;
            }
        }else if(name == "textarea"){
            e.placeholder = globalized;
        }else{
            e.innerHTML = globalized;
        }
    }
}