// @flow

$(()=>{
    $( "#content_container" ).draggable({
        containment: "#containment-wrapper"
    }).resizable({
        minHeight: 285,
        minWidth: 255,
    });
});

$(document).ready(()=>{
   $.ajax({
       url: '/set/settings',
       type: 'GET',
       success: (settings)=>{
           if (settings){
               let date = new Date(settings.date);
               let day = ("0" + date.getDate()).slice(-2);
               let month = ("0" + (date.getMonth() + 1)).slice(-2);
               let date_str = date.getFullYear()+"-"+(month)+"-"+(day) ;
               $("#start_time").val(settings.time);
               $("#sell_time").val(settings.sell_timeout);
               $("#examine_time").val(settings.info_interval);
               $("#start_date").val(date_str);
           }
       }
   })
});

function clear_gallery() {
    $.ajax({
        url: '/set/gallery',
        method: 'DELETE',
        success: ()=>{
            location.reload();
        }
    });
}

function clear_settings() {
    $.ajax({
        url: '/set/settings',
        method: 'DELETE',
        success: ()=>{
            location.reload();
        }
    });
}