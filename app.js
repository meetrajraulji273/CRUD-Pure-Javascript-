function validateForm() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const subject = document.getElementById("subject").value;

  var nameErrorDiv = document.getElementById("nameErrorDiv");
  var emailErrorDiv = document.getElementById("emailErrorDiv");
  var addressErrorDiv = document.getElementById("addressErrorDiv");
  var subjectErrorDiv = document.getElementById("subjectErrorDiv");

  var nameSuccessDiv = document.getElementById("nameSuccessDiv");
  var emailSuccessDiv = document.getElementById("emailSuccessDiv");
  var addressSuccessDiv = document.getElementById("addressSuccessDiv");
  var subjectSuccessDiv = document.getElementById("subjectSuccessDiv");

  var isValid = true;

  if (name.trim() === "") {
    nameErrorDiv.style.display = "block";
    nameSuccessDiv.style.display = "none";
    isValid = false;
  } else {
    nameErrorDiv.style.display = "none";
    nameSuccessDiv.style.display = "block";
  }

  if (email.trim() === "") {
    emailErrorDiv.style.display = "block";
    emailSuccessDiv.style.display = "none";
    isValid = false;
  } else if (!email.includes("@")) {
    emailErrorDiv.textContent = "Invalid email address.";
    emailErrorDiv.style.display = "block";
    emailSuccessDiv.style.display = "none";
    isValid = false;
  } else {
    emailErrorDiv.style.display = "none";
    emailSuccessDiv.style.display = "block";
  }

  if (address.trim() === "") {
    addressErrorDiv.style.display = "block";
    addressSuccessDiv.style.display = "none";
    isValid = false;
  } else {
    addressErrorDiv.style.display = "none";
    addressSuccessDiv.style.display = "block";
  }

  if (subject.trim() === "") {
    subjectErrorDiv.style.display = "block";
    subjectSuccessDiv.style.display = "none";
    isValid = false;
  } else {
    subjectErrorDiv.style.display = "none";
    subjectSuccessDiv.style.display = "block";
  }
  return isValid;
  
}

function showData() {
  let userData;
  if (localStorage.getItem("userData") == null) {
    userData = [];
  } else {
    userData = JSON.parse(localStorage.getItem("userData"));
  }

  let finalData = "";

  userData.forEach((el, idx) => {
    finalData += "<tr>";
    finalData += "<td>" + el.name + "</td>";
    finalData += "<td>" + el.email + "</td>";
    finalData += "<td>" + el.address + "</td>";
    finalData += "<td>" + el.subject + "</td>";
    finalData += `<td><button onclick="deleteData(${idx}
      
      )" class="btn btn-danger">Delete</button><button onclick="editData(
      ${idx})" class="btn btn-warning m-2">Edit</button></td>`;
    finalData += "</tr>";
  });

  document.querySelector(".tableBody").innerHTML = finalData;
  
}

document.onload = showData();


function AddData(e) {

  console.log(e)

  if (validateForm() === true) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const subject = document.getElementById("subject").value;

    let userData;
    if (localStorage.getItem("userData") == null) {
      userData = [];
    } else {
      userData = JSON.parse(localStorage.getItem("userData"));
    }

    userData.push({
      name: name,
      email: email,
      address: address,
      subject: subject,
    });

    localStorage.setItem("userData", JSON.stringify(userData));
    showData();
    
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("subject").value = "";

    nameErrorDiv.style.display = "none";
    nameSuccessDiv.style.display = "none";
    emailErrorDiv.style.display = "none";
    emailSuccessDiv.style.display = "none";
    addressErrorDiv.style.display = "none";
    addressSuccessDiv.style.display = "none";
    subjectErrorDiv.style.display = "none";
    subjectSuccessDiv.style.display = "none";
    
  }
}

function editData(idx) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("edit").style.display = "block";

  let userData;
  if (localStorage.getItem("userData") == null) {
    userData = [];
  } else {
    userData = JSON.parse(localStorage.getItem("userData"));
  }

  document.getElementById("name").value = userData[idx].name;
  document.getElementById("email").value = userData[idx].email;
  document.getElementById("address").value = userData[idx].address;
  document.getElementById("subject").value = userData[idx].subject;

  document.querySelector("#edit").onclick = function () {
    if (validateForm() == true) {
      userData[idx].name = document.getElementById("name").value;
      userData[idx].email = document.getElementById("email").value;
      userData[idx].address = document.getElementById("address").value;
      userData[idx].subject = document.getElementById("subject").value;

      localStorage.setItem("userData", JSON.stringify(userData));

      showData();
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("address").value = "";
      document.getElementById("subject").value = "";

      document.getElementById("submit").style.display = "block";
      document.getElementById("edit").style.display = "none";

      nameErrorDiv.style.display = "none";
      nameSuccessDiv.style.display = "none";
      emailErrorDiv.style.display = "none";
      emailSuccessDiv.style.display = "none";
      addressErrorDiv.style.display = "none";
      addressSuccessDiv.style.display = "none";
      subjectErrorDiv.style.display = "none";
      subjectSuccessDiv.style.display = "none";
    }
  };
}

function deleteData(idx) {
  let userData;
  if (localStorage.getItem("userData") == null) {
    userData = [];
  } else {
    userData = JSON.parse(localStorage.getItem("userData"));
  }

  userData.splice(idx, 1);
  localStorage.setItem("userData", JSON.stringify(userData));
  showData();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("subject").value = "";

  document.getElementById("submit").style.display = "block";
  document.getElementById("edit").style.display = "none";
}

