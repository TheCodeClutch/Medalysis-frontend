// document.getElementById("preloader").style.display = "block";

let latitude;
let longitude;

function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude;
}

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  // document.getElementById("preloader").style.display = "none";
  document.getElementById("submit-btn").addEventListener("click", () => {
    var age = document.getElementById("age").value;
    var symptoms = document.getElementById("symptoms").value;
    var gender = document.getElementById("genderList").value;
    var organ = document.getElementById("organList").value;
    var severity = document.getElementById("severityList").value;
    var medid = document.getElementById("subId").value;

    let status = [];

    if (age.length <= 1) {
      document.getElementById("age").style.borderColor = "red";
      document.getElementById("age").value = "";
      document.getElementById("labelAge").innerHTML = "Please enter valid age";
      status.push("false");
    } else {
      status.push("true");
    }

    if (symptoms.length < 1) {
      document.getElementById("symptoms").style.borderColor = "red";
      document.getElementById("symptoms").value = "";
      document.getElementById("labelsymptoms").innerHTML =
        "Please enter valid Symptoms";
      status.push("false");
    } else {
      status.push("true");
    }

    if (gender.length <= 1) {
      document.getElementById("genderList").style.borderColor = "red";
      status.push("false");
    } else {
      status.push("true");
    }

    if (organ.length <= 1) {
      document.getElementById("organList").style.borderColor = "red";
      status.push("false");
    } else {
      status.push("true");
    }

    if (severity.length <= 1) {
      document.getElementById("severityList").style.borderColor = "red";
      status.push("false");
    } else {
      status.push("true");
    }

    if (status.includes("false")) {
      return false;
    } else {
      document.getElementById("submit-btn").value = "Please wait...";

      console.log({
        submissionid : medid,
        gender,
        age,
        latitude,
        longitude,
        severity,
        symptoms,
        organ,
      })

      fetch("https://medalysis.herokuapp.com/core/save/data", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          submissionId : medid,
          gender,
          age,
          latitude,
          longitude,
          severity,
          symptoms,
          organ,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          if (res.message) {
            Swal.fire({
              icon: "success",
              title: "Yayyy",
              text: "Your details have been successfully posted!",
            });
            document.getElementById("submit-btn").value = "Submit";
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "There was some error. Please try again!",
            });
            document.getElementById("submit-btn").value = "Submit";
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There was some error from our side. Please try again later",
          });
          document.getElementById("submit-btn").value = "Submit";
        });
    }
  });
};
