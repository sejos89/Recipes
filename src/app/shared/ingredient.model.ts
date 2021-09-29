export class Ingredient {
    constructor(public name: string, public amount: number) {}
}

///// Another way to declarate it

// export class Ingredient {
//     public name: string;
//     public amount: number;

//     constructor(name: string, amount: number) {
//         this.name = name;
//         this.amount = amount;
//     }
// }