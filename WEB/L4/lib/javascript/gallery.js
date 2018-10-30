//      

$(()=>{
    $( "#content_container" ).draggable({
        containment: "#containment-wrapper"
    }).resizable({
        minHeight: 150,
        minWidth: 550
    });
});

$(()=>{
    $( "#picture_info_content" ).draggable();
});


$(document).ready(()=>{
    $.ajax({
        url: '/set/gallery',
        method: 'GET',
        success: (gallery)=>{
            let table=$("#user_table");
            gallery.forEach((picture)=>{
                let row = $("<tr>");
                let name = $("<td>").text(picture.name);
                let author = $("<td>").text(picture.author);
                let start_price = $("<td>").text(picture.start_price);
                let sold_price = $("<td>").text(picture.sold_price>0 ? picture.sold_price : '-');
                let buyer = $("<td>").text(picture.sold_price>0 ? picture.buyer : '-');
                let info_button = $("<button>").addClass('w3-button w3-green').text('Информация')
                    .attr('onclick', 'show_info("'+picture._id+'")');
                row.append(name, author, start_price, sold_price, buyer, info_button);
                table.append(row);
            })
        }
    })
});

function show_info(id){
    $.ajax({
        url: '/set/picture/' + id,
        method: 'GET',
        success: (picture)=>{
            $("#output_image").prop("src", picture.url);
            $("#name_input").val(picture.name);
            $("#author_input").val(picture.author);
            $("#description_input").text(picture.description);
            $("#url_input").val(picture.url);
            $("#start_price_input").val(picture.start_price);
            $("#min_step_input").val(picture.min_step);
            $("#max_step_input").val(picture.max_step);
            $("#for_auction_checkbox").prop('checked', picture.for_auction);
            $("#buyer_input").val(picture.sold_price>0 ? picture.buyer : '-');
            $("#sold_price_input").val(picture.sold_price);
            $("#picture_info").css('display', 'block')
        }
    });
}