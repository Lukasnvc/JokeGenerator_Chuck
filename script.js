
      

let arr=JSON.parse(localStorage.getItem('jokes')) || [];

function obj(joke, date, picture, color){
  this.joke= joke;
  this.date= date;
  this.picture= picture;
  this.color= color;
}

let index = Math.floor(Math.random() * (20 - 0) + 0)
Promise.all([
  fetch(`https://api.chucknorris.io/jokes/random`),
  fetch(`https://picsum.photos/v2/list?page=${index}`)
]).then(function (responses) {
  return Promise.all(responses.map(function (response) {
    return response.json();
  }));
}).then(function (data) {
  
  const jokes = data[0];
  const pictures = data[1];
  picture= pictures[index];
  store(jokes, picture)
}).catch(function (error) {
  console.log(error);
})


  const store = (jokes, picture) => {
    const btn = document.querySelector('#newJoke');
    btn.addEventListener('click', (e)=>{
      e.preventDefault()

      let jokeToArray = new obj(`${jokes}`, `${picture}`, `${Date()}`);
      jokeToArray.date=Date();
      jokeToArray.joke=jokes.value;
      jokeToArray.picture=picture.download_url
      arr.push(jokeToArray);
      localStorage.setItem('jokes', JSON.stringify(arr))

      draw(arr)
      location.reload();
    })
  }

  const draw = (jokes) => {
    jokes.forEach(element => {
      console.log()
      const div = document.createElement('div');
      div.setAttribute('class', 'div');
      generate(div);

      const btnDelete = document.createElement('button');
      btnDelete.setAttribute('class', 'delBtn')
      btnDelete.textContent= 'Delete';

      const randomColor = document.createElement('button');
      randomColor.setAttribute('class', 'randomColor')
      randomColor.textContent= 'Random card color';
      
      const pic = document.createElement('img');
      pic.src=element.picture;
      


      const p = document.createElement('p');
      p.setAttribute('class', 'joke')
      p.textContent= element.joke;

      const date = document.createElement('p');
      date.setAttribute('class', 'date');
      date.textContent= element.date;

      div.appendChild(pic)
      div.appendChild(p);
      div.appendChild(date)
      div.appendChild(randomColor)
      div.appendChild(btnDelete)
      const allJokes = document.querySelector('#allJokes');
      allJokes.appendChild(div)

      randomColor.addEventListener('click', () => {
        generate(div)
      })
    
      btnDelete.addEventListener('click', () => {
        deleteOne(element)
      })

    });
  }
  
  draw(arr)
 
  function createHex() {
    var hexCode1 = "";
    var hexValues1 = "0123456789abcdef";
    
    for ( var i = 0; i < 6; i++ ) {
      hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
    }
    return hexCode1;
  }
  
  function generate(place) {
    
    var deg = Math.floor(Math.random() *360);
    
    var gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() +")";
    
   place.style.background = gradient;
  }

  const clear = document.querySelector('#clear');
  clear.addEventListener('click', ()=> {
    let ask = confirm('Are you sure you wanna delete all jokes?')
    if (ask=== true){
    localStorage.clear()
    location.reload();
  }
  })
  
  const jokeN = document.querySelector('#jokesN');
  jokeN.textContent=`Total jokes: ${arr.length}`;

  const deleteOne = (element) => {
    const index = arr.indexOf(element);
    arr.splice(index, 1);
    localStorage.setItem('jokes', JSON.stringify(arr));
    location.reload();
  }

  const letters = () => {
    let number =0;
    arr.forEach(item => {
     number +=item.joke.length 
     const lettersCounter = document.querySelector('#letters');
     lettersCounter.textContent= `Total letters: ${number}`;
    })
  }
  letters()

  


 