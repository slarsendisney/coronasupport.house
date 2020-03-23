let firebase;
if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export const isLoggedIn = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return true;
  }
  return false;
};
