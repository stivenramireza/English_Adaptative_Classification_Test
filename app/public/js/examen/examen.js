// Obtiene la 1era pregunta
var req = new XMLHttpRequest();
var doc_type = localStorage.getItem("doctype");
var tmp_doc_type = localStorage.setItem("doc_type", doc_type);
var doc_number = localStorage.getItem("docnumber");
var doc_clasificador = "1039472987";
var params = 'doctype='+doc_type+'&docnumber='+doc_number+'&clasificador='+doc_clasificador;
req.responseType = 'json';
req.open("GET", '/test/prestart'+'?'+params, true);
req.setRequestHeader("Content-type", "application/json");
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        var idEx = texto.examen;
        localStorage.setItem("idEx", idEx);
        console.log(texto);
        var title = texto.question.title;
        document.getElementById("qidc").innerHTML = title;
        var opcionA = texto.question.responses[0];
        document.getElementById("opcionA").innerHTML = opcionA;
        var opcionB = texto.question.responses[1];
        document.getElementById("opcionB").innerHTML = opcionB;
        var opcionC = texto.question.responses[2];
        document.getElementById("opcionC").innerHTML = opcionC;
        var id = texto.question.n_item;
        localStorage.setItem("n_item", id);
    }
}

// Obtiene las siguientes preguntas
let questionPost = function (id, answer) {
    var idExam = localStorage.getItem("idEx")
    console.log("ID examen recibido: " , idExam);
    var sendData = "{ \"_id\": \""+ idExam +"\", \"n_item\" : " + id + ", \"n_response\" : " + answer + "  }"
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open("POST", '/test/next_question', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(sendData);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var texto = req.response;
            var title = texto.question.title;
            document.getElementById("qidc").innerHTML = title;
            var opcionA = texto.question.responses[0];
            document.getElementById("opcionA").innerHTML = opcionA;
            var opcionB = texto.question.responses[1];
            document.getElementById("opcionB").innerHTML = opcionB;
            var opcionC = texto.question.responses[2];
            document.getElementById("opcionC").innerHTML = opcionC;
            var id = texto.question.n_item;
            localStorage.setItem("n_item", id);
        }
    }
}