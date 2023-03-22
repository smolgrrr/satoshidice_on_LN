# Lightning Satoshi Dice

Imagine the original satoshi dice ↓ but with the lightning network!

![image](https://user-images.githubusercontent.com/104137257/226908593-6d90a295-de16-4777-8519-34f9e0c5d741.png)

## How it works
1. You bet a certain amount of satoshis
2. You roll the dice, and generate a number using a provably fair method
3. If you win, you get your bet back plus the amount you bet x the multiplier
4. If you lose, you lose your bet
5. You verify the results were fair with the server seed, and your payment hash later on

## How to play
Pretty self explanatory, but it does require webLN atm.

I'm looking to play around with bolt12 and LNURL to resolve this, but it is what it is.

Also want to build a nostr bot for this- let me know if you can help!

## How to run
1. Clone the repo
2. `yarn install`
3. add your lightning node's connection string to the `backend/.env` file using example.env as a template
4. `yarn start` in frontend folder
5. `yarn dev` in backend folder
6. Go to `localhost:3000`!

sorry there is some random hosting stuff in here, i need to clean this up
