import {firebase} from "../../commonfunctions/firebase"
import "firebase/compat/auth";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

export const fireBaseLoginApi = async (setGeneratedOtp,phoneNumber) => {
  try {
    if (phoneNumber === "" || phoneNumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");

    const auth = getAuth();

    let result = await signInWithPhoneNumber(auth, phoneNumber, verify);
    console.log(result,phoneNumber);
    setGeneratedOtp(result);
  } catch (err) {
    console.error("Error calling firebase login api");
    throw new Error(err);
  }
};
