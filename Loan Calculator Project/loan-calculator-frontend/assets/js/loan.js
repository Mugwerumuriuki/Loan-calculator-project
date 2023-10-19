$(document).ready(function () {
    sessionStorage.getItem('user')
    if (sessionStorage.getItem('token') != null && sessionStorage.getItem('user') != null){
        if (! $('#welcome-container').hasClass('visually-hidden')) {
            $('#welcome-container').addClass('visually-hidden');
        }

        if (! $('#login').hasClass('visually-hidden')) {
            $('#login').addClass('visually-hidden');
        }

        if (! $('#register').hasClass('visually-hidden')) {
            $('#register').addClass('visually-hidden');
        }

        if ($('#dashboard').hasClass('visually-hidden')) {
            $('#dashboard').removeClass('visually-hidden');
        }

        if ($('#user').hasClass('visually-hidden')) {
            $('#user').removeClass('visually-hidden');
        }

        if ($('#logout').hasClass('visually-hidden')) {
            $('#logout').removeClass('visually-hidden');
        }

        if ($('#dashboard-container').hasClass('visually-hidden')) {
            $('#dashboard-container').removeClass('visually-hidden');
        }

        let user = sessionStorage.getItem('user');
        user = user.replace(/['"]+/g, '')
        $('#user').html(user);
    }

    $('#login').on('click', function (event) {
        event.preventDefault();
        if (! $('#welcome-container').hasClass('visually-hidden')) {
            $('#welcome-container').addClass('visually-hidden');
        }

        if (! $('#register-container').hasClass('visually-hidden')) {
            $('#register-container').addClass('visually-hidden');
        }

        if ($('#login-container').hasClass('visually-hidden')) {
            $('#login-container').removeClass('visually-hidden');
        }
        if (! $('#dashboard').hasClass('visually-hidden')) {
            $('#dashboard').addClass('visually-hidden');
        }
    })

    $('#register').on('click', function (event) {
        event.preventDefault();

        if (! $('#welcome-container').hasClass('visually-hidden')) {
            $('#welcome-container').addClass('visually-hidden');
        }

        if (! $('#login-container').hasClass('visually-hidden')) {
            $('#login-container').addClass('visually-hidden');
        }

        if ($('#register-container').hasClass('visually-hidden')) {
            $('#register-container').removeClass('visually-hidden');
        }
        if (! $('#dashboard').hasClass('visually-hidden')) {
            $('#dashboard').addClass('visually-hidden');
        }
    });

    $('.home').on('click', function (event) {
        event.preventDefault();

        if (! $('#login-container').hasClass('visually-hidden')) {
            $('#login-container').addClass('visually-hidden');
        }

        if (! $('#register-container').hasClass('visually-hidden')) {
            $('#register-container').addClass('visually-hidden');
        }

        if ($('#welcome-container').hasClass('visually-hidden')) {
            $('#welcome-container').removeClass('visually-hidden');
        }

        if (! $('#dashboard-container').hasClass('visually-hidden')) {
            $('#dashboard-container').addClass('visually-hidden');
        }
    });

    $('#dashboard').on('click', function (event) {
        event.preventDefault();

        if (! $('#login-container').hasClass('visually-hidden')) {
            $('#login-container').addClass('visually-hidden');
        }

        if (! $('#register-container').hasClass('visually-hidden')) {
            $('#register-container').addClass('visually-hidden');
        }

        if (! $('#welcome-container').hasClass('visually-hidden')) {
            $('#welcome-container').addClass('visually-hidden');
        }

        if ($('#dashboard-container').hasClass('visually-hidden')) {
            $('#dashboard-container').removeClass('visually-hidden');
        }

    })

    // register
    $('#registerForm').on('click','#registerBtn', function (event) {
        event.preventDefault();

        let data = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        }

        $.ajax({
            method: "post",
            url: "http://localhost:8000/api/register",
            headers: {
                'Content-Type': 'application/json',
            },
            dataType: 'json',
            data: data,
            success: function (response) {

                sessionStorage.setItem('token', JSON.stringify(response.token));
                sessionStorage.setItem('user', JSON.stringify(response.user.name));

                if (! $('#login').hasClass('visually-hidden')) {
                    $('#login').addClass('visually-hidden');
                }

                if (! $('#register').hasClass('visually-hidden')) {
                    $('#register').addClass('visually-hidden');
                }

                if ($('#user').hasClass('visually-hidden')) {
                    $('#user').removeClass('visually-hidden');
                }

                if ($('#logout').hasClass('visually-hidden')) {
                    $('#logout').removeClass('visually-hidden');
                }

                if (! $('#register-container').hasClass('visually-hidden')) {
                    $('#register-container').addClass('visually-hidden');
                }

                if (! $('#login-container').hasClass('visually-hidden')) {
                    $('#login-container').addClass('visually-hidden');
                }

                if ($('#dashboard-container').hasClass('visually-hidden')) {
                    $('#dashboard-container').removeClass('visually-hidden');
                }

                let user = sessionStorage.getItem('user');
                user = user.replace(/['"]+/g, '')
                $('#user').html(user);

                $('#name').val('')
                $('#email').val('')
                $('#password').val('')
            },
            error: function (error) {
                console.log(error);
            }
        })
    });

  $('#loginForm').on('click','#loginBtn', function (event) {
      event.preventDefault();

      let data = {
          email: $('#lemail').val().trim(),
          password: $('#lpassword').val().trim()
      }

      $.ajax({
          method: 'post',
          url: 'http://localhost:8000/api/login',
          data: data,
          cache: false,
          success: function (response) {
              sessionStorage.setItem('token', JSON.stringify(response.token));
              sessionStorage.setItem('user', JSON.stringify(response.user.name));

              if (! $('#login').hasClass('visually-hidden')) {
                  $('#login').addClass('visually-hidden');
              }

              if (! $('#register').hasClass('visually-hidden')) {
                  $('#register').addClass('visually-hidden');
              }

              if ($('#logout').hasClass('visually-hidden')) {
                  $('#logout').removeClass('visually-hidden');
              }
              if ($('#dashboard').hasClass('visually-hidden')) {
                  $('#dashboard').removeClass('visually-hidden');
              }

              if ($('#user').hasClass('visually-hidden')) {
                  $('#user').removeClass('visually-hidden');
              }

              if (! $('#register-container').hasClass('visually-hidden')) {
                  $('#register-container').addClass('visually-hidden');
              }

              if (! $('#login-container').hasClass('visually-hidden')) {
                  $('#login-container').addClass('visually-hidden');
              }

              if ($('#dashboard-container').hasClass('visually-hidden')) {
                  $('#dashboard-container').removeClass('visually-hidden');
              }

              let user = sessionStorage.getItem('user');
              user = user.replace(/['"]+/g, '')
              $('#user').html(user);

              $('#lemail').val('')
              $('#lpassword').val('')
          },
          error: function (error) {
              console.log(error)
          }
      })
  });

    $('#logout').on('click', function (event) {
        event.preventDefault();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        if ($('#login').hasClass('visually-hidden')) {
            $('#login').removeClass('visually-hidden');
        }

        if ($('#register').hasClass('visually-hidden')) {
            $('#register').removeClass('visually-hidden');
        }

        if (! $('#logout').hasClass('visually-hidden')) {
            $('#logout').addClass('visually-hidden');
        }

        if (! $('#dashboard').hasClass('visually-hidden')) {
            $('#dashboard').addClass('visually-hidden');
        }

        if (! $('#dashboard-container').hasClass('visually-hidden')) {
            $('#dashboard-container').addClass('visually-hidden');
        }

        if (! $('#register-container').hasClass('visually-hidden')) {
            $('#register-container').addClass('visually-hidden');
        }

        if (! $('#welcome-container').hasClass('visually-hidden')) {
            $('#welcome-container').addClass('visually-hidden');
        }

        if ($('#login-container').hasClass('visually-hidden')) {
            $('#login-container').removeClass('visually-hidden');
        }

        if (! $('#user').hasClass('visually-hidden')) {
            $('#user').addClass('visually-hidden');
        }
        $('#user').html('')
    });

    $('#interestForm').on('click','#computeInterestBtn', function (event) {
        event.preventDefault();

        let data = {
            'amount_to_borrow': $('#amount_to_amount').val().trim(),
            'payment_frequency': $('#payment_frequency').val().trim(),
            'loan_period': $('#loan_period').val().trim(),
            'start_date': $('#start_date').val().trim(),
            'interest_type': $('#interest_type').val().trim()
        }
        let token = sessionStorage.getItem('token')
            token = token.replace(/['"]+/g, '')
        $.ajax({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/loan-calculator',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            dataType: 'json',
            data: data,
            cache: false,
            success: function (response) {
                let interest_type = response.interest_type
                let bank_a = response.bank_a
                let bank_b = response.bank_b
                let processingFee = bank_a.processing_fee
                let exciseDuty = bank_a.excise_duty
                let legalFee = bank_a.legal_fee
                let takeHome = bank_a.take_home

                let bankADiv = printBankHeading(bank_a, interest_type, processingFee, exciseDuty, legalFee, takeHome)
                let bankBDiv = printBankHeading(bank_b, interest_type, processingFee, exciseDuty, legalFee, takeHome)
                let bankFooter = printFooter(processingFee, exciseDuty, legalFee, takeHome)

                $('#bankAHeading').html(bankADiv)
                $('#bankBheading').html(bankBDiv)
                $('#bankFooter').html(bankFooter)

                let bankAInstallments = response.bank_a.installments;
                let bankBInstallments = response.bank_b.installments

                $('#bankAcontainer').html(printInstallments(bankAInstallments,'bank_a_table'))
                $('#bankBcontainer').html(printInstallments(bankBInstallments,'bank_b_table'))

                let tableA = new DataTable('#bank_a_table',{
                    order: [[ 1, 'asc']]
                });

                let tableB = new DataTable('#bank_b_table',{
                    order: [[ 1, 'asc']]
                });

                if ($('#result-container').hasClass('visually-hidden')) {
                    $('#result-container').removeClass('visually-hidden')
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    });
    window.jsPDF = window.jspdf.jsPDF;
    $('#generatePDF').on('click', function (event) {
        var doc = new jsPDF({
            orientation: 'landscape'
        });
       // doc.html($(20,20,$('#installments')))
       // doc.text(20, 20, 'Hello world!');
   // doc.text(20, 30, 'This is client-side Javascript to generate a PDF.');

// Add new page
      // doc.addPage();
    //  doc.text(20, 20, 'Visit CodexWorld.com');

// Save the PDF
        var elementHTML = $('#installments').html()

        let fileName = Math.random().toString(36).substring(2,7);
        fileName = `${fileName}.pdf`
        doc.html(elementHTML, {
            callback: function(doc) {
                // Save the PDF
                doc.save(fileName);
            },
            x: 15,
            y: 15,
            width: 170, //target width in the PDF document
            windowWidth: 650 //window width in CSS pixels
        });
       // doc.save('document.pdf');
    })






});

function printBankHeading(bank, interestType) {
    let div = `<div class='row'><div class='col-3'><p>Bank Name:<span class="fw-bold">${bank.bank_name}</span></p></div>
<div class="col-5"><p>Interest Type:<span class="fw-bold">${interestType}</span></p></div></div></div>`

    return div;
}

function printFooter(processingFee, exciseDuty, legalFee, takeHome) {
    let div = `
<div class="col-3">Processing Fee:<span class="fw-bold">${processingFee.toFixed(2)}</span></div>
<div class="col-3">Excise Duty:<span class="fw-bold">${exciseDuty.toFixed(2)}</span></div>
<div class="col-3">Legal Fee:<span class="fw-bold">${legalFee.toFixed(2)}</span></div>
<div class="col-3">Take Home:<span class="fw-bold">${takeHome.toFixed(2)}</span></div>`

    return div;
}
function printInstallments(installments, tableId) {
    let bankATable = `<table class='table' id='${tableId}'><thead><tr><th>Installments</th><th>Next payment Date</th><th>Amount (kshs)</th></tr></thead><tbody>`

    for (let count in installments) {
        bankATable += `<tr><td>Installment ${installments[count].installment}</td><td>${installments[count].date}</td><td>${parseFloat(installments[count].interest).toFixed(2)}</td></tr>`
    }
    bankATable += `</tbody></table>`

    return bankATable
}
