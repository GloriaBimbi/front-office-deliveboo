## Ragionamento sul funzionamento del carrello:

- clicco sul tasto "+" per aggiungere il piatto al carello
- con una funzione aggiungo l'attributo 'into-cart=true' e l'attributo 'quantity=1',

  - ora appare anche il tasto '-',

- se riclicco sul tasto '+' -> solo l'attributo quantity si aggiorna: 'quantity++',

- se clicco sul tasto '-' -> l'attributo quantity si aggiorna: 'quantity--',

  - se 'quantity' = 0 -> l'attributo 'into-cart'= false

- tutti i piatti che hanno l'attributo 'into-cart' = true vengono stampati nel carrello
  - il prezzo viene calcolato come dish.price\*quantity
