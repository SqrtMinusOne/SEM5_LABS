function saveBook(book_update_info){
    const xhttp = new XMLHttpRequest();
    const url = "/book";
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            res = JSON.parse(this.responseText);
            if (res.ok)
                location.reload();
        }

    };
    const data = JSON.stringify(book_update_info);
    xhttp.send(data);
}

function deleteBook(id){
    const xhttp = new XMLHttpRequest();
    const url = "/book/" + id;
    xhttp.open("DELETE", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            res = JSON.parse(this.responseText);
            if (res.ok)
                window.open('/index', '_self');
        }

    };
    xhttp.send(null);
}

function deleteReader(id_book, id_reader){
    const xhttp = new XMLHttpRequest();
    const url = "/book/" + id_book + "/" + id_reader;
    xhttp.open("DELETE", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            res = JSON.parse(this.responseText);
            if (res.ok)
                location.reload();
        }

    };
    xhttp.send(null);
}

function addReader(id_book, reader){
    console.log(id_book, reader); //TODO
}