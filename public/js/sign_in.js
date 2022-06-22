$(document).ready(function() {
    const signInForm = $("#mainForm")
    const emailField = $("#emailField")

    let validateForm = function (event) {
        let formData = {
            "email": emailField.val()
        }

        $.ajax({
            url: signInForm.attr('action'),
            type: signInForm.attr('method'),
            headers: {'Accept': 'application/json'},
            data: formData
        })
            .done(() => {
                location.href = "/user"
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                /*resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(errorData.message)
                resMsg.removeAttr('hidden')*/
            })
        event.preventDefault()
    }
    signInForm[0].addEventListener("submit", validateForm, true)
})