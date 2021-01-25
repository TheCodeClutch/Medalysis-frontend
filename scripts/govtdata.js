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
        var name = document.getElementById("name").value;
        var natid = document.getElementById("natid").value;
        var pracid = document.getElementById("pracid").value;
        var clinicname = document.getElementById("clinicname").value;

        let status = [];

        if (name.length <= 1) {
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("name").value = "";
            document.getElementById("labelname").innerHTML = "Please enter your name";
            status.push("false");
        } else {
            status.push("true");
        }

        if (natid.length < 1) {
            document.getElementById("natid").style.borderColor = "red";
            document.getElementById("natid").value = "";
            document.getElementById("labelnatid").innerHTML =
                "Please enter valid National ID";
            status.push("false");
        } else {
            status.push("true");
        }

        if (pracid.length <= 1) {
            document.getElementById("pracid").style.borderColor = "red";
            document.getElementById("pracid").value = "";
            document.getElementById("labelpracid").innerHTML =
                "Please enter valid National ID";
            status.push("false");
        } else {
            status.push("true");
        }

        if (clinicname.length <= 1) {
            document.getElementById("clinicname").style.borderColor = "red";
            document.getElementById("clinicname").value = "";
            document.getElementById("labelclinicname").innerHTML =
                "Please enter valid National ID";
            status.push("false");
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            return false;
        } else {
            document.getElementById("submit-btn").value = "Please wait...";

            console.log({
                name,
                natid,
                pracid,
                clinicname,
            })

            fetch("https://medalysis.herokuapp.com/govt/save/clinics", {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    doctorName: name,
                    nationalId: natid,
                    doctorId: pracid,
                    clinicName: clinicname,
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
