import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {GetContentService} from '../../services/getContent.service';

@Component({
  selector: 'change-content',
  templateUrl: './change-content.component.html',
  styleUrls: ['./change-content.component.css']
})
export class ChangeContentComponent implements OnInit {
	
	@Output() titleChange:EventEmitter<String> =new EventEmitter<String>(); 
 
	newTitle = 'Este es el titulo modificado por otro componente';
  	hasError = false;
  	hasContent = false;


	constructor(private service: GetContentService) { 
	}

	ngOnInit() {

	}

	changeTitle() {
    	console.log("ingresa al hijo");
    	this.titleChange.emit(this.newTitle);
  	}

	callApi(){
		this.service.getContent().subscribe(res => {
			console.log(res);
			this.hasContent = true;
		},err => {
			console.error(err);
			this.hasError = true;
		})

	}

	handleCallApi(){
		console.log("llamo al api");
		this.callApi();
	}

}
