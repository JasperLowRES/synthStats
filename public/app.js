window.addEventListener('load', () => {

  console.log("Client side js is loaded!");

  fetch('/gear')
  .then(response => response.json())
  .then(data => {
      console.log(data);

      let stats = data.gear;
      let database = document.getElementById('database');
      //Loop through data and append to the page
      for (let i = 0; i < stats.length; i++){
        let currentName = stats[i].name;
        let dimensions = `${stats[i].dimensions.w}x${stats[i].dimensions.d}x${stats[i].dimensions.h}`;
        let vesa = stats[i].vesamounts ? 'VESA Mounts: Yes' : 'VESA Mounts: No';
        let corners = stats[i].corners ? 'Corners: Squared' : 'Corners: Not Squared';
        
        let currentEl = document.createElement('p');
        currentEl.innerHTML = `${currentName} - Dimensions: ${dimensions} - ${vesa} - ${corners}`;        
        database.appendChild(currentEl);
      }
//Create an event listener to collect and POST data
let submitButton = document.getElementById('stats-submit');
submitButton.addEventListener('click', () => {
    console.log("Button was clicked!");
    let nameInput = document.getElementById('gear-input').value;
    let width = document.querySelector('.dimensions[placeholder="W"]').value;
    let depth = document.querySelector('.dimensions[placeholder="D"]').value;
    let height = document.querySelector('.dimensions[placeholder="H"]').value;
    let vesaMounts = document.getElementById('vesamounts').checked;
    let cornersSquared = document.getElementById('corners').checked;
    
    let gearData = {
      name: nameInput,
      dimensions: {
        w: width,
        d: depth,
        h: height
      },
      vesamounts: vesaMounts,
      corners: cornersSquared
    };
    
    console.log(gearData);

    let gearDataJSON = JSON.stringify(gearData);
    console.log(gearDataJSON);
    
    fetch('/newEntry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: gearDataJSON
  })
  .then(response => response.json())
  .then(data => {
      console.log("Did this work?");
      console.log(data);

      let database = document.getElementById('database');
      let currentEl = document.createElement('p');
      currentEl.innerHTML = `${gearData.name} - Dimensions: ${gearData.dimensions.w}x${gearData.dimensions.d}x${gearData.dimensions.h} - VESA Mounts: ${gearData.vesamounts ? 'Yes' : 'No'} - Corners: ${gearData.corners ? 'Squared' : 'Not Squared'}`;
      database.appendChild(currentEl);

      document.getElementById('gear-input').value = '';
      document.querySelectorAll('.dimensions').forEach(input => input.value = '');
      document.getElementById('vesamounts').checked = false;
      document.getElementById('corners').checked = false;
  })
  .catch(error => {
    console.log(error);
  });

});
      
      });
      
  })
  


