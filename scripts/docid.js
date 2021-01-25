// document.getElementById("preloader").style.display = "block";

window.onload = function () {


    // document.getElementById("preloader").style.display = "none";
    document.getElementById("submit-btn").addEventListener("click", () => {
        var natid = document.getElementById("natid").value;
        var pracid = document.getElementById("pracid").value;

        let status = [];

        if (natid.length <= 1) {
            document.getElementById("natid").style.borderColor = "red";
            document.getElementById("natid").value = "";
            document.getElementById("labelnatid").innerHTML = "Please enter valid National Id";
            status.push("false");
        } else {
            status.push("true");
        }

        if (pracid.length < 1) {
            document.getElementById("pracid").style.borderColor = "red";
            document.getElementById("pracid").value = "";
            document.getElementById("labelpracid").innerHTML =
                "Please enter valid Practioner Id";
            status.push("false");
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            return false;
        } else {
            document.getElementById("submit-btn").value = "Please wait...";

            console.log({
                doctorId: pracid,
                nationalId: natid,
            })

            fetch("https://medalysis.herokuapp.com/govt/get/id?q", {
                method: "GET",
                headers: new Headers({ "content-type": "application/json" }),
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
                            text: `Your Medalysis Id has been successfully generated :  ${res.id}`,
                        });
                        document.getElementById("submit-btn").value = "Submit";

                        let content = "";
                        content = `<div class="card" id="medid">
                        <h5 class="card-header" style="background-color: gainsboro;">Your Medalysis Id</h5>
                        <div class="card-body">
                            <p class="card-text">
                            <div style="font-weight:bolder;padding:2px">${res.id}</div>
                            </p>
                        </div>
                    </div>`
                        document.getElementById('medid').innerHTML = content;
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops..",
                            text: "The Id is already generated!",
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
