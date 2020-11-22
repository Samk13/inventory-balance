# Case statement stock balance

## Basic task

The basic task consists of writing a console application to manage inventory balances.

The user interface must contain three functions:

[x] To sell x number. This is done by typing S and then the number + enter, e.g. "S5".

[x] To deliver x number. This is done by typing I and then the number + enter, e.g. "I5".

[x] Show current stock. This is done by typing "L" + enter.

[x] When a sale or delivery is made, the number of stock must be counted down or up by the specified number.

[x] When the program starts, the number is always 0

[x] data does not need to be stored in any other way than in the primary memory.

[x] Remember to structure the code so that the presentation is separated from the calculation logic. The logic can be reused e.g. in a web application.

## Addition

[x] Write an alternative algorithm that makes automatic delivery of the double number at sale. That is, if you sell S5,10 are automatically delivered.

[x] Implement a mechanism for switching between the algorithm in the previous point and the original version.

[x] Add more than one product and handle product numbers at sales and delivery.

[x] Add the possibility to sell item packages that are predefined in the code, eg "SP1" means "sell 1 of package 1" where package 1 can contain one or more products (and then all must be counted down in stock at sale).

[x] Add item prices and show total amounts at sale.

[x] Add discounts, e.g. buy three and get one for free.

[x] Create unit tests for calculation logic.

[x] add babel for backwards compatibility

[x] add esLint for code consistency

# install && run

```zsh

git clone https://github.com/Samk13/inventory-balance.git

cd inventory-balance

npm install
node src/index.js
```

## for backwards compatible version of JavaScript

```zsh
npm run build
node dist/index.js
```

## to run tests

```zsh
npm run test
```

## App features

- The application is case sensitive, make sure to enter commands with upperCase.
- Then initializing the app, the store will be empty and you will get a message :

```zsh
? What action you wanna take?
```

- This is basically the main menu, everything is straight forward, otherwise here is a brief explanation:
- Press enter or any char that is not part of application commands, it will show a message with all available commands.

```zsh
I didn't get your command!

Here is all available commands that I can understand for now:

And Yes! it's case Sensitive

{
  createNewProduct: 'C',
  listProduct: 'L',
  sellProduct: 'S',
  deliverProduct: 'I',
  sellPackage: 'SP'
}
? What action you wanna take?
```

- `sellProduct => S, deliverProduct => I, sellPackage=> SP` can accept number after the command
  for example: `S1, I33 or SP3`

- Start with any command other than Create 'C', it will route you to create a new product and if you enter any numbers those numbers will be ignored

```zsh
? What action you want to take?
S5

Seems like you have no stocks yet!

? CreateNewStock: (Y/n)
```

- When every command is executed, you will be routed back the main menu question:
  `? What action you wanna take?`

- If you choose Y for creating new product, you will be asked 6 questions: every input is validated, all inputs except name have default values, thus you can press enter to finish.

## C = Create new Product:

- Product name: should be a string start with char, accept numbers, spaces, Swedish chars like `äöå` and rejects special chars, min 4, max 16 chars.

- Product ID: is auto generated based on now() and random math
- Product count: is a number between 1 and quantityMaxVal that you can edit in central file: (config.js)[https://github.com/Samk13/inventory-balance/blob/main/src/config.js]
- Package number: you have 2 options only 1 or 2
- Product price in SEK: minimum 0 and max
- Product sold : between 0 and priceMaxVal in config.js
- Product delivered between 0 and priceMaxVal in config.js
  then you will see a table of all products

```zsh
? Please enter your product name: yourProductName01
? Enter product count 100
? Enter product package number 1
? Enter product price in SEK 10
? How many have been sold? 0
? How many have been delivered? 0
```

- When you create your first product, you will be able to perform other commands like list, sell, sell package or deliver

## L = List Products:

Will create a table of all products in the store array and add kr to price and total, X to quantity and delivered

## S = Sell product S{N}

If you have no products you will be redirected to create new product logic, then:
you have couple options:
all these available command will works:
S, S5, S5, 5, S5-3, S2.5, S4 4,

- If you enter double value like S12,12 and you choose to sell without auto delivery, the second value will get ignored with no errors for better user experience.

> Sell without delivery
> Sell with auto delivery

Both options will lead to ask you to choose between available products in the stocks store

- If you did not enter your selling amount, you will have a question to enter a selling number
- If you choose with auto delivery and you didn't provide the delivery amount, you will see a question regarding that

- The selling amount cannot exceed the product amount, if you will try to do that you will get an error

## I = delIver product I{N}

As the selling product command, you will be prompted to choose the product you want to deliver.

- The deliver amount should not exceed the selling amount or you will get an error

## SP = sell package SP{N}

There are 2 available packages you can choose between and the number after SP is the amount you want to sell

- It will change the quantity for all packages items and change the total
  if the selling amount is more then 3 items you will get a discount

## discount

I built the discount logic in order for you to be able to change how much percentage you wish, and after how many sells from config.js, for the convenient

## testing

You can test by run

```zsh
npm run test
```

## extra backwards compatibility feature:

Adding babel in order for you to can change the ES target
to build the dist files:

```zsh
npm run build
```
