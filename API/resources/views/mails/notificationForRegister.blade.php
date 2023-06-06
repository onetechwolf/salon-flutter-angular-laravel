<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bunitas</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p> Registering Request information is below. </p>
      <div style="display: flex">
          <div style="width: 40%">
              <p> First Name: {{ $first_name }} </p><br/>
              <p> Last Name: {{ $last_name }} </p><br/>
              <p> Email: {{ $email }} </p><br/>
          </div>
          <div style="width: 60%">
              <img src="data:image/jpeg;base64,{{ $cover_src }}" alt="Cover" />
          </div>
      </div>
              
      <p> Phone Number: {{ $country_code + $mobile }} </p><br/>
      <p> Postal Code: {{ $zipcode }} </p><br/>
      <p> About you / your salon: {{ $about }} </p><br/>
      <p> Address: {{ $address }} </p><br/>
      <p> DOB: {{ $dob }} </p><br/>
      @if (!empty($id_card))
      <p> Id Card: </p>
      <img src="data:image/jpeg;base64,{{ $id_card_src }}" alt="Id Card" />
      @endif
      @if (!empty($qualification))
      <p> Qualification: </p>
      <img src="data:image/jpeg;base64,{{ $qualification_src }}" alt="Qualification" />
      @endif
  
      <p style="font-size:0.9em;">Regards,<br /> Bunitas </p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p> Bunitas </p>
      </div>
    </div>
  </div>
  