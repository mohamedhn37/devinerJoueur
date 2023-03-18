function startGame() {
  fetch('js/player.json')
    .then(response => response.json())
    .then(data => {
      
      let joueur = data[Math.floor(Math.random() * data.length)];
      let nomJoueur = joueur.name.toUpperCase();
      
      let descJoueur = joueur.description;
      let divDescription = document.getElementById('description');
      divDescription.innerText = descJoueur;

      let lettresJoueur = nomJoueur.split('');

      let divLettres = document.getElementById('word');
      divLettres.innerHTML = ''; // réinitialise l'affichage du mot caché
      lettresJoueur.forEach(lettre => {
        let divLettre = document.createElement('div');
        divLettre.innerText = '_';
        divLettres.appendChild(divLettre);
      });

      let divClavier = document.getElementById('keyboard');
      divClavier.innerHTML = ''; // réinitialise l'affichage du clavier

      let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZéè'.split('');
      alphabet.forEach(lettre => {
        let boutonLettre = document.createElement('button');
        boutonLettre.innerText = lettre;
        divClavier.appendChild(boutonLettre);

        boutonLettre.addEventListener('click', () => {
      
          if (lettresJoueur.includes(lettre)) {

            lettresJoueur.forEach((lettreJoueur, index) => {
              if (lettreJoueur === lettre) {
                divLettres.childNodes[index].innerText = lettre;
              }
            });

            let lettresTrouvees = Array.from(divLettres.childNodes).map(divLettre => divLettre.innerText);
            if (!lettresTrouvees.includes('_')) {
              alert('Bravo, vous avez gagné !');
              startGame(); 
            }
          } else {
            alert(`La lettre ${lettre} n'est pas dans le nom du joueur.`);
          }
        });
      });
    })
    .catch(error => console.error(error));
}

startGame();

let boutonRejouer = document.createElement('button');
boutonRejouer.innerText = 'Rejouer';
document.body.appendChild(boutonRejouer);
boutonRejouer.addEventListener('click', () => {
  startGame(); 
});
