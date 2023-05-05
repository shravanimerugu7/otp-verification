import React, { useState, useRef } from "react";
import './styles.css'

function PhoneVerificationPopup() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, event) => {
    if (event.keyCode === 8 && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("Text");
    const otpArray = clipboardData.match(/[0-9]{1}/g) || [];

    const newOtp = [...otp];
    otpArray.forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });

    setOtp(newOtp);
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="phone-verification-popup">
      <p>Enter the OTP you received on 89206-6XXXX</p>
      <div className="otp-input-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChange={(event) => handleOtpChange(index, event.target.value)}
            onKeyDown={(event) => handleBackspace(index, event)}
            onPaste={(event) => handlePaste(event)}
          />
        ))}
      </div>
      <div>
      <p className="change-number">Change Number</p>
      <p className="re-send">Re-send OTP</p>
      </div>
      <button className = "verify" onClick={handleClose}>Verify Phone Number</button>
    </div>
  );
}

function Model() {
  const [showPhoneVerificationPopup, setShowPhoneVerificationPopup] =
    useState(false);

  const handleVerificationButtonClick = () => {
    setShowPhoneVerificationPopup(true);
  };

  return (
    <div className="App">
      <button onClick={handleVerificationButtonClick}>
       Phone Verification
      </button>
      {showPhoneVerificationPopup && <PhoneVerificationPopup />}
    </div>
  );
}

export default Model;
