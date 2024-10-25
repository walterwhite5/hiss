const prompt = require('prompt-sync')({ sigint: true });

class Elevator {
  constructor() {
    this.currentFloor = 3;
  }

  async moveToFloor(floor) {
    let travelTime = 0;

    if (this.currentFloor === floor) {
      console.log(`Hissen är redan på våning ${floor}.`);
    } else {
      travelTime = Math.abs(this.currentFloor - floor) * 5;
      console.log(`Hissen åker till våning ${floor}. Detta tar ${travelTime} sekunder.`);
      await this.wait(travelTime);
      this.currentFloor = floor;
      console.log(`Hissen är framme på våning ${floor}.`);
    }
  }

  async wait(seconds) {
    console.log(`Väntar i ${seconds} sekunder`);
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  async callElevator() {
    const callElevator = prompt("Vill du kalla på hissen till våning 1? (ja/nej): ");
    if (callElevator.toLowerCase() === 'ja') {
      console.log("Användaren kallar hissen till våning 1.");
      await this.moveToFloor(1);
      await this.wait(10);
      await this.userEntry();
      await this.selectFloor();
    }
  }

  async userEntry() {
    const enterElevator = prompt("Vill du gå in i hissen? (ja/nej): ");
    if (enterElevator.toLowerCase() === 'ja') {
      console.log("Användaren går in i hissen.");
      await this.selectFloor();
    } else {
      await this.callElevator();
    }
  }

  async userExit() {
    console.log("Användaren går ut ur hissen. Hissdörren stängs.");
  }

  async selectFloor() {
    const floor = prompt("Välj våning: 1, 2 eller 3: ");
    if ([1, 2, 3].includes(Number(floor))) {
      await this.moveToFloor(Number(floor));
      await this.userExit();
      const returnToElevator = prompt("Vill du gå tillbaka till hissen? (ja/nej): ");
      if (returnToElevator.toLowerCase() === 'ja') {
        await this.userEntry();
      } else {
        console.log("Användaren har lämnat hissen.");
      }
    } else {
      console.log("Ogiltigt val. Försök igen.");
      await this.selectFloor();
    }
  }
}

const elevator = new Elevator();
elevator.callElevator();