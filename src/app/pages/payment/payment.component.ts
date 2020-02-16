import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  searchName: string;
  arrData: Array<any> = [
    {
      id: 1,
      firstName: 'ivan',
      lastName: 'ivanov',
      city: 'lviv',
      dateOfRegister: new Date(),
      company: 'SoftServe',
      salary: '400',
      position: 'trainee',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet omnis, veritatis reprehenderit suscipit, quis nulla veniam nostrum accusantium quisquam, nesciunt ex fuga culpa soluta tempore assumenda a modi rerum?'
    },
    {
      id: 2,
      firstName: 'petro',
      lastName: 'petriv',
      city: 'lviv',
      dateOfRegister: new Date(),
      company: 'SoftServe',
      salary: '1000',
      position: 'junior',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet omnis, veritatis reprehenderit suscipit, quis nulla veniam nostrum accusantium quisquam, nesciunt ex fuga culpa soluta tempore assumenda a modi rerum?'
    }

  ];

  constructor() { }

  ngOnInit() {
  }

}
