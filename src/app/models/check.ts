import {Provider} from "./provider";

export class Check {
  id: number;
  number: number;
  solde: number;
  provider: Provider;
  date: Date;

  constructor(id: number, number: number, solde: number, provider: Provider, date: Date) {
    this.id = id;
    this.number = number;
    this.solde = solde;
    this.provider = provider;
    this.date= date;
  }
}
