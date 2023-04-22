import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {

	private title:any;
	private body:any;
	private footer: any;


  constructor(private contService: ContentService,) { }

  ngOnInit() {
  	this.loadData();
  }

  loadData(): void{
  	this.contService.getTitle().subscribe( (titulo) => this.title = titulo);
  	this.contService.getBody().subscribe( (dato) => this.body = dato);
  	this.contService.getFooter().subscribe( (dato) => this.footer = dato);
  }

  update(title:String) {
    console.log(title);
    this.title = title;
    //alert("Customer Saved")
  }

}
