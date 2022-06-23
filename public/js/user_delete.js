$(document).ready(function() {
    const form = $("#itemDeleteForm")
    const resMsg = $("#resDelMsg")
    const elementEmail = $("#elementEmail")
    const emailDelete = $("#emailDeleteField")

    const deleteModal = document.getElementById('deleteModal');
    deleteModal.addEventListener('show.bs.modal', function (event) {
        elementEmail.html("Email: " + $('#userEmail').html().replace('Email: ', ''))
    })

    deleteModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let deleteItem = function (event) {
        let formData =  { 'email': emailDelete.val() }
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            headers: {'Accept': 'application/json'},
            data: formData
        })
            .done((res) => {
                resMsg.attr('style', 'color: green')
                resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(res.message)
                resMsg.removeAttr('hidden')

                setTimeout(reloadPage, 699)
                function reloadPage(){ location.href = "/" }
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                resMsg.attr('style', 'color: red')
                resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(errorData.message)
                resMsg.removeAttr('hidden')
            })
        event.preventDefault()
    }

    form[0].addEventListener("submit", deleteItem, true)
})