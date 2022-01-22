import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() {}
  showFinalists: boolean = false;
  @ViewChildren('accordion') accordion!: QueryList<ElementRef>;
  finalistData = [
    {
      stateName: 'Maharashtra',
      studentDetails: [
        {
          categoryName: 'Students with Visually impairment',
          studentList: [
            { name: 'Shraddha Samadder', school: 'Father Agnel' },
            { name: 'Yash Jadhav', school: 'Victoria Memorial' },
            { name: 'Rudra Dhokle', school: 'NAB' },
            { name: 'Athaan Cornello', school: 'NAB' },
            { name: 'Taha Contractor', school: 'NAB' },
            { name: 'Sahil Dabre', school: 'NAB' },
          ],
        },
        {
          categoryName: 'Students with Hearing impairment',
          studentList: [
            {
              name: 'Devaansh Dinesh Bhoi',
              school: 'The Stephen High school for Deaf and Aphasic',
            },
            {
              name: 'Amaamur Rehman Siddiqui',
              school: 'The Stephen High school for Deaf and Aphasic',
            },
            {
              name: 'Ayan Khan',
              school: 'KDN Shruti School',
            },
            {
              name: 'Harshada Yalaguri Sudibavi',
              school: 'Vikas Vidyalaya',
            },
            {
              name: 'Suraj Pandey',
              school: 'Bombay Institution for Deaf and Mutes',
            },
            {
              name: 'Suraj Wankhede',
              school: 'ETC',
            },
          ],
        },
      ],
    },
    {
      stateName: 'TamilNadu',
      studentDetails: [
        {
          categoryName: 'Students with Visually impairment',
          studentList: [
            {
              name: 'STS Gughan',
              school: 'Sethu Bhaskara Matriculation School',
            },
            { name: 'V. Alli', school: 'Nethrodaya' },
            {
              name: 'Ayyappan',
              school:
                'Government Higher Secondary School for Visually Impaired',
            },
            { name: 'Madan Kumar', school: 'Nethrodaya' },
            {
              name: 'Manikandan',
              school: 'St. Louis Institute for Deaf & Blind',
            },
            {
              name: 'Roshan Kumar',
              school: 'Sethu Bhaskara Matriculation School',
            },
          ],
        },
        {
          categoryName: 'Students with Hearing impairment',
          studentList: [
            {
              name: 'M. Karthick',
              school: 'Dr. MGR Home and Higher Secondary School',
            },
            {
              name: 'Vanathi Devi. E',
              school: 'Little Flower Convent Hr. Sec. School for the Deaf',
            },
            {
              name: 'Poorvika',
              school:
                'Mary Club Wala Jadhav Spl Hr Sec School for Hearing Impaired',
            },
            {
              name: 'Diwaker',
              school: 'St. Louis Institute for Deaf & Blind',
            },
            {
              name: 'Mouwlesh Annamalai',
              school: 'Ajay Deaf School',
            },
            {
              name: 'Nikil',
              school: 'Vidya Sagar',
            },
          ],
        },
      ],
    },
    {
      stateName: 'Karnataka',
      studentDetails: [
        {
          categoryName: 'Students with Visually impairment',
          studentList: [
            {
              name: 'Riya',
              school: 'BGS School for the Blind, Ramanagara',
            },
            {
              name: 'Nisha',
              school:
                'Chetana special School,Govt school for the Blind Children, Mysuru',
            },
            {
              name: 'Uday Kumar',
              school: 'Govt school for the Blind Children, Mysuru',
            },
            {
              name: 'Venkatesh',
              school: 'BGS School for the Blind Children, Ramanagara',
            },
            {
              name: 'Mayappa Mirji',
              school: 'Govt School for the Blind Children, Mysuru',
            },
            {
              name: 'G.T. Deepa',
              school: 'Govt School for the Blind Children, Davanagere',
            },
            {
              name: 'Nitish',
              school: 'Roman and Catherine Lobo School for the Blind',
            },
            {
              name: 'Varuna. V',
              school: 'Shree Ramana Maharishi Academy for the Blind, Bengaluru',
            },
          ],
        },
        {
          categoryName: 'Students with Hearing impairment',
          studentList: [
            {
              name: 'Fahima Khanum',
              school: 'Shradhanjali Integrated Primary School, Bengaluru',
            },
            {
              name: 'Ganesh Naik',
              school: 'Government school for the Deaf Children, Mysuru',
            },
            {
              name: 'Rithvika',
              school: 'Chetana Special School, Karkala',
            },
            {
              name: 'Lokesh. K. P',
              school: 'Jnanavikasa deaf & dumb School, Chinakurali',
            },
            {
              name: 'Mamatha. M',
              school: 'Shiela Kothwala Institute for the Deaf, Bengaluru',
            },
            {
              name: 'Anju',
              school:
                'Smt. Puttaveeramma Residential School for the Deaf Girls, Mysuru',
            },
          ],
        },
      ],
    },
  ];
  ngOnInit() {}
  ngAfterViewInit() {
    const firstAccordion = this.accordion.first.nativeElement;
    firstAccordion.setAttribute('open', 'true');
  }
  openFinalists() {
    this.showFinalists = true;
  }
  hideFinalists() {
    this.showFinalists = false;
  }
  toggleAccordion(index: number) {
    this.accordion.forEach((item, currentIndex: number) => {
      if (index != currentIndex) {
        item.nativeElement.removeAttribute('open');
      }
    });
  }
}
