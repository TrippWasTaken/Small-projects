//Represents a contact
class Person {
    constructor(name, phone, email) {
      this.name = name;
      this.phone = phone;
      this.email = email;
    }
  }

  // Handle UI
class UI {
    static displayPeople() {
      const storedPeople = [];

      const people = storedPeople;
  
      people.forEach((person) => UI.addPersonToList(person));
    }
  
    static addPersonToList(person) {
      const list = document.querySelector('#people-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${person.name}</td>
        <td>${person.phone}</td>
        <td>${person.email}</td>
      `;

      list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#person').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#email').value = '';
    }
}

//Store Class: Handles Storage

//Displays People
document.addEventListener('DOMContentLoaded', UI.displayPeople)

//Adds a person
document.querySelector('#person-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#person').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;

    const person = new Person(name, phone, email);

    console.log(person);

    UI.addPersonToList(person);
    UI.clearFields();
});

//Searching function
function search(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("contact-list");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++)
    {
        td = tr[i].getElementsByTagName("td")[1];
        if(td)
        {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) !== -1){
                tr[i].style.display="";
                document.getElementById("no-result").style.visibility = "hidden"; 
            }
            else
            {
                tr[i].style.display="none";
                document.getElementById("no-result").style.visibility = "visible"; 
            }
        }
    }
}

//Sorting Function
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("contact-list");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
                }
            }
        } 
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
            }
        }
    }
}