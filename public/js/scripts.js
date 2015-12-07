function show_hide(_element_id) {
 var element = document.getElementById(_element_id);
 if (element) {
 element.style.display = element.style.display == 'table' ? 'none' : 'table';
 }
}
function limitText(limitField, limitCount, limitNum)
{ 
    if (limitField.value.length > limitNum)
    { 
        limitField.value = limitField.value.substring(0, limitNum); 
    }

    else
    { 
         limitCount.value = limitNum - limitField.value.length; 
    } 
}