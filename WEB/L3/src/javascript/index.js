let gallery;

function get_gallery() {
    $.get("/gallery", {parameters: "to", server: "side"})
        .done((data)=>{
            gallery = data;
            set_gallery(gallery)
        })
}

function set_gallery(gallery){
    let table = $('#gallery_table');
    for (let i = 0; i < gallery.length; i++){
        let row = $('<tr>').attr("scope", "row");
        let number = $('<th>').text(i);
        let name = $('<td>').text(gallery[i]["name"]);
        let author = $('<td>').text(gallery[i]["author"]);
        let button = $('<td>').append(
            $('<button>').addClass("btn").addClass("white_button").text("Информация")
                .attr("onclick", "show_info(" + i + ")")
        );
        row.append(number).append(name).append(author).append(button);
        table.append(row);
    }
}

function show_info(i){
    $("#image_output").prop("src", gallery[i]["url"]).show();
    $("#name_input").val(gallery[i]["name"]);
    $("#url_input").val(gallery[i]["url"]);
    $("#author_input").val(gallery[i]["author"]);
    $("#description_input").text(gallery[i]["description"]);
    $("#price_input").val(gallery[i]["start_price"]);
    $("#min_step_input").val(gallery[i]["min_step"]);
    $("#max_step_input").val(gallery[i]["max_step"]);
    $("#forSaleCheckBox").prop('checked', gallery[i]["for_auction"]);
    $("#picture_info_title").text("Информация о картине: ");
    $("#picture_info_index").text(i.toString());
    $("#picture_info").modal('toggle');
}

function show_add_image(){
    $("#image_output").prop("display", 'none').hide();
    $("#name_input").val("");
    $("#url_input").val("");
    $("#author_input").val("");
    $("#description_input").text("");
    $("#price_input").val(0);
    $("#min_step_input").val(0);
    $("#max_step_input").val(0);
    $("#picture_info_title").text("Добавить картину");
    $("#picture_info_index").text("");
    $("#picture_info").modal('toggle');
}

function add_image(){
    let image = {};
    image.name = $("#name_input").val();
    image.url = $("#url_input").val();
    image.author = $("#author_input").val();
    image.description = $("#description_input").val();
    image.start_price = parseInt($("#price_input").val());
    image.min_step = parseInt($("#min_step_input").val());
    image.max_step = parseInt($("#max_step_input").val());
    image.for_auction = $("#forSaleCheckBox").is(":checked");
    let obj = {
        "img": image
    };
    let id = $("#picture_info_index").text();
    if (id !== "")
        obj.id = parseInt(id);
    else
        obj.id = -1;
    $.ajax({
        url: "/",
        method: "PUT",
        data: obj,
        success: () =>{
            location.reload();
        }
    })
}

function delete_image(){
    let id = $("#picture_info_index").text();
    $.ajax({
        url: "/" + id.toString(),
        method: "DELETE",
        success: () =>{
            location.reload();
        }
    })
}

get_gallery();