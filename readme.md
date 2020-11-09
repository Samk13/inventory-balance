# Case statement stock balance

## Basic task

The basic task consists of writing a console application to manage inventory balances.

The user interface must contain three functions:

- To sell x number. This is done by typing S and then the number + enter, e.g. "S5".

- To submit x number. This is done by typing I and then the number + enter, e.g. "I5".

- Show current stock. This is done by typing "L" + enter.

When a sale or delivery is made, the number of stock must be counted down or up by the specified number. When the program starts, the number is always 0 and data does not need to be stored in any other way than in the primary memory.

Remember to structure the code so that the presentation is separated from the calculation logic. The logic can be reused e.g. in a web application.

Addition

- Write an alternative algorithm that makes automatic delivery of the double number at sale. That is, if you sell 5, 10 are automatically delivered.

- Implement a mechanism for switching between the algorithm in the previous point and the original version.

- Add more than one product and handle product numbers at sales and delivery.

- Add the possibility to sell item packages that are predefined in the code, eg "SP1" means "sell 1 of package 1" where package 1 can contain one or more products (and then all must be counted down in stock at sale).

- Add item prices and show total amounts at sale.

- Add discounts, e.g. buy three and get one for free.

- Create unit tests for calculation logic.

# install

```zsh
npx stock-balance
```