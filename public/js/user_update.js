$(document).ready(function() {
    const mainForm = $("#itemUpdateForm")
    const firstNameField = $("#firstNameUpdateField")
    const lastNameField = $("#lastNameUpdateField")
    const emailField = $("#emailUpdateField")
    const oldEmailField = $("#oldEmailField")

    const resMsg = $("#resUpdateMsg")
    const oldEmail = $('#userEmail').html().replace('Email: ', '')

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        emailField.val($('#userEmail').html().replace('Email: ', ''))
        firstNameField.val($('#userFirstName').html().replace('First name: ', ''))
        lastNameField.val($('#userLastName').html().replace('Last name: ', ''))
        oldEmailField.val(oldEmail)
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let validateForm = function (event) {

        let formData = new FormData()
        let image = $('#imageUpdateField')[0].files

        formData.append('image', image[0])
        formData.append("oldEmail", oldEmail)
        formData.append("email", emailField.val())
        formData.append("firstName", firstNameField.val())
        formData.append("lastName", lastNameField.val())

        $.ajax({
            url: mainForm.attr('action'),
            type: mainForm.attr('method'),
            contentType: false,
            processData: false,
            data: formData
        })
            .done((res) => {
                resMsg.attr('style', 'color: green')
                resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(res.message)
                resMsg.removeAttr('hidden')

                $('#userEmail').html(`Email: ${res.email}`)
                $('#userFirstName').html(`First name: ${res.firstName}`)
                $('#userLastName').html(`Last name: ${res.lastName}`)
                $('#userImage').attr('src', `../../uploads/${res.image}`)
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                console.log(errorData.message)
            })
        event.preventDefault()
    }
    mainForm[0].addEventListener("submit", validateForm, true)
})