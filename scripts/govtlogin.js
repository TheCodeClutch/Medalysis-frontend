window.onload = () => {
    document.getElementById("sub").addEventListener("click", function (e) {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        let status = [];

        if (username.length < 1) {
            document.getElementById("username").style.borderColor = "red";
            document.getElementById("username").value = "";
            document.getElementById("label1").innerHTML =
                "Please enter your username";

            status.push("false");

            document.getElementById("username").classList.add("red");
        } else {
            status.push("true");
        }

        var len = password.length;
        if (len <= 6) {
            status.push("false");
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password").value = "";
            document.getElementById("label2").innerHTML =
                "Please enter valid password more than 6 characters";
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            
            return false;
        } else {
            
            document.getElementById("sub").value = "Loading...";

            fetch("https://medalysis.herokuapp.com/auth/login", {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    userId: username,
                    password: password,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    
                    if (res.token) {
                        localStorage.setItem("token", res.token);
                        window.location.href = "docid.html";
                        document.getElementById("sub").value = "LogIn";
                    } else if (res.noSuchUser){
            
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No such user exist try signing up first'
                        });
                    
                        document.getElementById("sub").value = "LogIn";
                    } else if(res.wrongPassword){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'The password entered by the user was wrong',
                        });
                        document.getElementById("sub").value = "LogIn";
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please enter correct username and password.',
                        });
                        document.getElementById("sub").value = "LogIn";
                    }
                })
                .catch((err) => {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There was an issue from our side. Please try again',
                    });
                    document.getElementById("sub").value = "LogIn";
                });
        }
    });
};