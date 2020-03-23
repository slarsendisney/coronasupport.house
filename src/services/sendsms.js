const server = "https://corona-support.herokuapp.com";
// const dummy = "http://localhost:3000";
export function sendText(name, cb) {
  fetch(server + "/send", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name
    })
  }).then(function(response) {
    cb();
  });
}
