
function getmethod(){
    var method=document.getElementById('method').value;
    var fields=document.getElementById('data');
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var age = document.getElementById("age");
    var ID = document.getElementById("id1");
    var genderfield=document.getElementById("gender");
    var chooseanoption =document.getElementById("Choose an option");
   
    if (method=="Get_all"){
        fields.style.display="none";

    } else if(method=="Get_by_ID"){
        fields.style.display="block";
        name.style.display="none";
        email.style.display="none";
        age.style.display="none";
        genderfield.style.display="none";
    }else if(method=="Post_new"){
        fields.style.display="block";
        name.style.display="block";
        email.style.display="block";
        age.style.display="block";
        id1.style.display="none";
        genderfield.style.display="block";
    }else if(method=="Update_By_ID"){
        fields.style.display="block";
        name.style.display="block";
        email.style.display="block";
        age.style.display="block";
        id1.style.display="block";
        genderfield.style.display="block";
    }else if(method=="Delete_by_ID"){
        fields.style.display="block";
        name.style.display="none";
        email.style.display="none";
        age.style.display="none";
        id1.style.display="block";
        genderfield.style.display="none";
   }else{
    alert("CHOOSE FUNCTION");
    fields.style.display="block";
    name.style.display="block";
    email.style.display="block";
    age.style.display="block";
    id1.style.display="block";
    genderfield.style.display="block";
}
    

}
function getdata(){
    const data = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value
      };
      const jsonString = JSON.stringify(data);
      console.log(jsonString);
}
function funupdate(){
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var age=document.getElementById('age').value;
}
function getgender() {
    var ele = document.getElementsByName('gender');
    var genderval;
    for (i = 0; i < ele.length; i++) {
        if (ele[0].checked)
            genderval= ele[0].value;
        else if(ele[1].checked)
            genderval=ele[1].value;
    }
    return genderval;
}

function submits(){
    var methodeselected=document.getElementById("method").value;
    if(methodeselected=="Post_new"){
        const url = 'http://localhost:3000/persons'; 
        var data = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            gender: getgender()
        };
        fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(person => {
        // Handle the response data
        console.log(person);
        const output = document.getElementById('output');
      output.innerHTML = `<p>Server response: ${JSON.stringify(person)}</p>`;
        })
        .catch(error => {
        // Handle any errors
        console.error(error);
        });
    }else if(methodeselected=="Update_By_ID"){
        var id=document.getElementById('id1').value;
        
        const url = `http://localhost:3000/persons/${id}`;
        const updatedData = {
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                email: document.getElementById('email').value,
                gender: getgender()
        };

        fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Request failed with status ' + response.status);
            }
        })
        .then(data => {
            console.log(data); // Handle the response data
            const output = document.getElementById('output');
      output.innerHTML = `<p>Server response: ${JSON.stringify(data)}</p>`;
        })
        .catch(error => {
            console.error(error); // Handle any errors
        });

      
    }else if(methodeselected=="Get_all"){
        fetch('http://localhost:3000/persons')
            .then(response => response.json())
            .then(data => {
            // Process the response data
            console.log(data);
            const output = document.getElementById('output');
      output.innerHTML = `<p>Server response: ${JSON.stringify(data)}</p>`;
         })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });


    }else if(methodeselected=="Get_by_ID"){
        var id=document.getElementById('id1').value;
        

        fetch(`http://localhost:3000/persons/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Error: ' + response.status);
            }
        })
        .then(person => {
            // Handle the person data
            console.log(person);
            const output = document.getElementById('output');
      output.innerHTML = `<p>Server response: ${JSON.stringify(person)}</p>`;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

    }else if(methodeselected=="Delete_by_ID"){
        var id=document.getElementById('id1').value; 
        
fetch(`http://localhost:3000/persons/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (response.ok) {
    console.log(`Person with ID ${id} has been deleted.`);
    const output = document.getElementById('output');
      output.innerHTML = `<p>Server response: Person with ID ${id} has been deleted.</p>`;
  } else {
    throw new Error('Error: ' + response.status);
  }
})
.catch(error => {
  console.error(error);
});
    }
}

