
function checkScrollableDiv() {
  const scrollableDiv = document.getElementById('scrollableDiv');
  const contentHeight = scrollableDiv.scrollHeight;
  const containerHeight = scrollableDiv.clientHeight;

  if (contentHeight >= containerHeight) {
    scrollableDiv.style.overflowY = 'auto';
  } else {
    scrollableDiv.style.overflowY = 'hidden';
  }
}
window.addEventListener('resize', checkScrollableDiv);
document.addEventListener('DOMContentLoaded', checkScrollableDiv);

let error_name = "Username must be at least 3 characters long";
let error_email = "Email must be of form 'johndoe@email.com'";
let error_terms = "Agree to terms and conditions";
let error_dob = "Age must be between 18 and 55 years";
let empty = "This is a required field";

let getElement = (id) => document.getElementById(id);

let userName = getElement("name");
let  email = getElement("email");
let  pass = getElement("password");
let  dob = getElement("dob");
let  terms = getElement("acceptTerms");
let  form = getElement("form");
let  submit = getElement("submit");

function populateTable(){
  let data = localStorage.getItem("entry");
  if (data) {
    data = JSON.parse(data);
  } else {
    data = [];
  }
  return data;
}
let detail = populateTable();

function error(itm, event, bool) {
  if (!bool) {
    itm.setCustomValidity(event);
    itm.reportValidity();
  } else {
    itm.style.border = "";
    itm.setCustomValidity("");
  }
}

userName.addEventListener("input", (event) => {
  let x = userName.value.length >= 3;
  event.preventDefault();
  error(userName, error_name, x);
});

email.addEventListener("input", (event) => {
  let x = email.value.includes("@") && email.value.includes(".");
  event.preventDefault();
  error(email, error_email, x);
});

dob.addEventListener("input", (event) => {
  let age =
    Number(new Date().getFullYear()) -
    Number(new Date(dob.value).getFullYear());
  let x = age >= 18 && age <= 55;
  event.preventDefault();
  error(dob, error_dob, x);
});

function objectCreation() {
  let object = {
    name: userName.value,
    email: email.value,
    password: pass.value,
    dob: dob.value,
    checked: terms.checked,
  };
  return object;
}

function getData() {
  let table = getElement("entry-table");
  let items = detail;
  let rows = `<caption><b>Entries</b></caption>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;

  for (let i = 0; i < items.length; i++) {
    rows += `<tr>
                    <td>${items[i].name}</td>
                    <td>${items[i].email}</td>
                    <td>${items[i].password}</td>
                    <td>${items[i].dob}</td>
                    <td>${items[i].checked}</td>
                </tr>\n`;
  }
  table.innerHTML = rows;
}

form.addEventListener("submit", (event) => {
  let x = !terms.checked;
  event.preventDefault();
  if (!x) {
    let obj = objectCreation();
    detail.push(obj);
    localStorage.setItem("entry", JSON.stringify(detail));
  }
  getData();
  window.location.reload();
});

window.onload = (event) => {
  getData();
};
console.log(detail);