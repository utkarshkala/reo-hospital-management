import axios from "axios";
import { SERVER_URL } from "../constants";

export const patientLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    axios
      .post(SERVER_URL + "/authentication/login/patient", credentials)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response.data);
        } else reject();
      });
  });
};

export const hospitalLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    axios
      .post(SERVER_URL + "/authentication/login/hospital", credentials)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response.data);
        } else {
          reject(err);
        }
      });
  });
};

export const patientSignUp = (credentials) => {
  return new Promise((resolve, reject) => {
    axios
      .post(SERVER_URL + "/authentication/signup/patient", credentials)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response.data);
        } else {
          reject(err);
        }
      });
  });
};
