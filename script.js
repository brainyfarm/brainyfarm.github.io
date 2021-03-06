$(document).ready(() => { 
  $('#address-form').on('submit', (e) => {
    e.preventDefault();
    const formData = {};
    $('#address-form').serializeArray().map(input => { formData[input.name]  = input.value });
    const clientKey = '24452420731202627';
    const authID = 'd73d3614-f1d3-f9f6-d7df-7d7414ad4895';
    const authInfo = `auth-id=${authID}&auth-token=${clientKey}`;
    const queriesUS  = $('#address-form').serialize();
    const baseUrlUS = `https://us-street.api.smartystreets.com/street-address?${authInfo}&`;
    const baseUrlInt = `https://international-street.api.smartystreets.com/verify?${authInfo}&`
    const requestUrlUS = `${baseUrlUS}${queriesUS}`;
    const requestUrlInt = `${baseUrlInt}country=${formData.country}&locality=${formData.city}&administrative_area=${formData.state}&address1=${formData.street}&postal_code=${formData.zipcode}&address-type=international-street-components`
    if ( formData.country === 'United States' )  {
      $.getJSON(requestUrlUS, response => {
        if ( !response.length ) {
          alert('Unable to validate address');
        } else {
          $('#valid').fadeIn('2000', () => {
            setTimeout(() => {
              $('#valid').fadeOut('slow');
            }, 3000);
          });
          $('#street').val(response[0].delivery_line_1);
          $('#city').val(response[0].components.city_name);
          $('#zipcode').val(response[0].components.zipcode + '-' + response[0].components.plus4_code);
          $('#state').val(response[0].components.state_abbreviation);
          $('#json').JSONView(response);
        }
      });
    } else {
      console.log('Where are we')
      $.getJSON(requestUrlInt, response => {
        if ( !response.length ) {
          alert('Unable to validate address');
        } else {
          $('#valid').fadeIn('2000', () => {
            setTimeout(() => {
              $('#valid').fadeOut('slow');
            }, 3000);
          });
          $('#json').JSONView(response);
        }
      });
    }
  })
});
