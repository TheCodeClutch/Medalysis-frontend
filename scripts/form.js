// document.getElementById("preloader").style.display = "block";


window.onload = function () {
    // document.getElementById("preloader").style.display = "none";
    document.getElementById("submit-btn").addEventListener("click", () => {
        var age = document.getElementById("age").value;
        var symptoms = document.getElementById("symptoms").value;
        var gender = document.getElementById("genderList").value;
        var organ = document.getElementById("organList").value;
        var severity = document.getElementById("severityList").value;

        let status = [];

        if (age.length <= 1) {
            document.getElementById("age").style.borderColor = "red";
            document.getElementById("age").value = "";
            document.getElementById("labelAge").innerHTML =
                "Please enter valid age";
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

            fetch("https://medalysis.herokuapp.com/core/save/data", {
                        method: 'POST',
                        headers: new Headers({ 'content-type': 'application/json' }),
                        body: JSON.stringify({
                            gender: gender,
                            age: age,
                            latitude: latitude,
                            longitude: longitude,
                            severity: severity,
                            symptoms: symptoms,
                            organ: organ,
                            medicines: medicines
                        }),
                    })

                        .then(function (response) {
                            return response.json();
                        })
                        .then(res => {
                            console.log(res)
                            if (res.message) {
                                
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Yayyy',
                                    text: 'Your details have been successfully posted!',

                                })
                                document.getElementById("submit-btn").value = "Submit";

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops..',
                                    text: 'There was some error. Please try again!',
                                })
                                document.getElementById("submit-btn").value = "Submit";
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "There was some error from our side. Please try again later",
                            })
                            document.getElementById("submit-btn").value = "Submit";
                            
                        })




























            fetch(`https://api.meaningcloud.com/sentiment-2.1?key=cdd3596a15c1debe314b912a6895cefd&of=json&txt=${encodeURI(pname + " " + pdesc)}&lang=en`)
                .then(res => res.json())
                .then(res => {
                    document.getElementById("submit-btn").value = "Submit";
                    if (res.score_tag === "N" || res.score_tag === "N+" || res.score_tag === "NEU") {
                        Swal.fire({
                            icon: "error",
                            title: "Submission failed",
                            text: "Please do not spread hate!!",
                        });
                    } else {
                        fetch("https://pragati-api.herokuapp.com/products/add", {
                            method: "POST",
                            headers: new Headers({
                                Authorization: token,
                            }),
                            body: formData,
                        })
                            .then(function (response) {
                                return response.json();
                            })
                            .then((res) => {
                                if (res.isloggedin && !res.isloggedin) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Please login first :)",
                                    })
                                        .then(res => {
                                            window.location.href = "login.html";
                                        })
                                    return;
                                }
                                console.log("This is the response", res);
                                document.getElementById("submit-btn").value = "Submit";

                                if (res.message) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Yayyy',
                                        text: 'Your product has been successfully posted!',

                                    })
                                    // window.location.href = "buyprod.html";
                                    document.getElementById("submit-btn").value = "Submit";
                                    resetInputValues();
                                } else if (res.isloggedin && !res.isloggedin) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops..',
                                        text: 'Please login to post product',
                                    })
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops..',
                                        text: 'There was an error posting your product. Please try again!',
                                    })
                                }
                            })
                            .catch((err) => {

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops..',
                                    text: 'There was an error posting your product. Please try again!',

                                })
                                document.getElementById("submit-btn").value = "Submit";
                            });
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "There was some error, contact pragatiathome@gmail.com.",
                    })
                    document.getElementById("submit-btn").value = "Submit";
                });
        }
    });
};

