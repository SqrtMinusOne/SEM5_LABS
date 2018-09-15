function saveName() {
    let name = document.getElementById("name").value;
    localStorage["tetris.username"] = name;
}