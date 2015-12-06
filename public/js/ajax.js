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
    realty_type = realty_type=='Всі типи'?'':realty_type;
    price = price==' < 500 $' ? 500:price=='від 500 до 1 000 $' ?999: price==' > 1 000 $'?1000:'';

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

function encodeImageFileAsURL(){

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            var newImage = document.createElement('img');
            newImage.src = srcData;

            document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            var base64 = document.getElementById("imgTest").innerHTML;
            srcData = srcData.replace("data:image/jpeg;base64,", "");
            srcData = srcData.replace("data:image/png;base64,", "");
            srcData = srcData.replace("data:image/gif;base64,", "");
            srcData = srcData.replace("data:image/jpg;base64,", "");
            console.log(typeof srcData);
            console.log(srcData);
            document.getElementById("base64").value = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}

$(function(){
    var referrer =  document.referrer;
    $('#referrer').val(referrer);
});



