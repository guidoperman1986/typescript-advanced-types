
//intersection
type Admin = {
    name:string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
}

// interface ElevatedEmployee extends Employee, Admin{}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Guido',
    privileges: ['ADMIN'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Guards
function add(a:number, b:number): number  // function overload
function add(a:string, b:string): string
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }

    return a + b;
}

const result = add('Guido', ' Perman');
result.split(' ');


// in
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);

    if ('startDate' in emp) {
        console.log('Privileges: ', +emp.startDate);

    }
}

printEmployeeInformation({name: 'Guido', startDate: new Date()});


// guard: instanceof

class Car {
    drive() {
        console.log('driving... ');
    }
}

class Truck {
    drive() {
        console.log('driving truck... ');
    }

    loadCargo(amount: number) {
        console.log('loading cargo... ',amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    
    // if ('loadCargo' in vehicle) {
        // vehicle.loadCargo(1000);
    // }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);


// discriminated unions

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving with speed ' + speed);
}

moveAnimal({type:"bird", flyingSpeed: 10});

// type casting

// const userInput = <HTMLInputElement>document.getElementById('user-input')!;
const userInput = document.getElementById('user-input') as HTMLInputElement; // de esta forma tambien se le dice que nunca va a recibir valores nulos, no haria falta el !

userInput.value = 'Hi';

//otra forma seria la siguiente
const userInput2 = document.getElementById('user-input');

if (userInput2) { // si no estoy seguro si recibe nulos o no, consulto aca si el valor es null
    (userInput2 as HTMLInputElement).value = 'Hi';
}

// index properties
interface ErrorContainer { // {email: 'Not a valid email', username: 'Must start with ...'}
    // id: string;
    [key: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with ...'
}

//optional chaninng
const fetchedUserData = {
    id: '1',
    name: 'Guido',
    job: {title: 'CEO', description: 'Bosta'}
}

console.log(fetchedUserData?.job?.title);

//nullish coallesing

const userInputAux = null;

const storedData = userInputAux ?? 'DEFAULT';

console.log(storedData);
