export default function doesInfoWork(info) {
  let toSend = info;
  if (toSend.firstName === "" || toSend.lastName === "") {
    return "Please enter in a Full Name";
  }
  if (toSend.country === "") {
    return "Please enter in a country";
  }
  if (toSend.province === "") {
    return "Please enter in a Province/State";
  }
  if (toSend.city === "") {
    return "Please enter in a city";
  }
  if (toSend.postalCode === "") {
    return "Please enter in a Postal Code";
  }
  if (toSend.address === "") {
    return "Please enter an address";
  }
  if (toSend.phoneNum === "") {
    return "Please enter in a phone number";
  }
  if (!/^\d+$/.test(toSend.phoneNum)) {
    return "Please input only numbers for the phone number";
  }

  let failedZip = false;
  let code = toSend.postalCode;
  console.log(toSend.country);
  if (toSend.country === "Canada") {
    if (code.length < 6) {
      failedZip = true;
    }
    if (code.length > 7) {
      failedZip = true;
    }

    if (code.length > 6) {
      code = code.slice(0, 3) + code.slice(4, 7);
    }

    for (let i = 0; i < 6; i++) {
      //canadian zip codes alternate between letter and number
      //a1a1a1 like that
      if (i % 2 === 0) {
        //if current is not letter
        if (!code.slice(i, i + 1).match("[a-zA-Z]+")) {
          failedZip = true;
          break;
        }
      } else if (i % 2 === 1) {
        //if current is not number
        if (isNaN(code.slice(i, i + 1))) {
          failedZip = true;
          break;
        }
      }
    }
  } else if (toSend.country === "United States") {
    if (code.length === 10) {
      failedZip = true;
      // Its either 11111-1111
      // Or 1111-11111
      // As in 5-4 or 4-5

      // This means first four
      let fFour = code.slice(0, 4);
      //hyphen
      let fifth = code.slice(4, 5);
      //last 5
      let lFive = code.slice(5, 10);

      let fFive = code.slice(0, 5);
      let sixth = code.slice(5, 6);
      let lFour = code.slice(6, 10);

      if (/^\d+$/.test(fFour) && fifth === "-" && /^\d+$/.test(lFive)) {
        //youre good, do nothing
        failedZip = false;
      } else if (/^\d+$/.test(fFive) && sixth === "-" && /^\d+$/.test(lFour)) {
        //youre good, do nothing
        failedZip = false;
      } else {
        failedZip = true;
      }
    } else {
      failedZip = true;
    }
  }

  if (failedZip) {
    return "Please input a valid Postal/Zip code";
  }

  return "success";
}
