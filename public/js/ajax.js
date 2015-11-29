//$.ajax({
//    url: '/api/advert?id=2',             // указываем URL и
//    dataType : "json",                     // тип загружаемых данных
//    success: function (data, textStatus) { // вешаем свой обработчик на функцию success
//            console.log(data.price);
//    }
//});
$( "#myselect option:selected" ).text();
function filter() {
    var deal_type = $('#edit-field-deal-type option:selected').text(),
        realty_type = $('#edit-field-realty_type option:selected').text(),
        price = $('#edit-field-price option:selected').text();

    $.getJSON( "/api/advertajax?deal="+deal_type+"&realty="+ realty_type+"&price="+price+"", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            $('.news').detach();
            var divnews = $('<div/>', {
                'class': 'news'
            }).appendTo($('#contentArea'));
            var divTittle = $('<div/>', {
                'class': 'title'
            }).appendTo(divnews);
            var h2Tittle = $('<h2/>').html(val.tittle).appendTo(divTittle);
            var h2Price = $('<h2/>').html('Price '+val.price+'$').appendTo(divTittle);
            var img = $('<img/>', {
                'src':'data:image/png;base64,'+val.image
            }).appendTo(divnews);
            var p  = $('<p/>').html(val.description).appendTo(divnews);
            var a = $('<a/>', {
                'href': '/advert?id='+val.advert_id
            }).html('See more...').appendTo(divnews);
        })
    });
}



