import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownService } from './dropdown.service';
import { DropdownObj } from './dropdown.shared';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() field;
  @Input() form: FormGroup;
  fieldList : Array<Object>;
  selectedItem : any;

  constructor( private ds:DropdownService ) {  }

  ngOnInit() {
    this.ds.getRegister().subscribe( (options : DropdownObj) => {
      
      let found = this.canAccept(options);
      if(found.length) {
        this.selectedItem = '0';
        let fieldName = found[0].field;
        this.fieldList = this.field.options.filter( function(item){
          return item[fieldName] == options.value[fieldName];
        }, this);
      } 

    });

    this.fieldList = this.field.options;
  }

  canAccept(options:any) {
    return options.target.filter(function(item) {
      return item.key == this.field.key;
    }, this);
  }

  onChange($event) {
    let dp = new DropdownObj();
   
    // filter by selected key 
    dp.value = this.field.options.find( function(value) { return value.key == $event.target.value});
    
    if(dp.value) {
      dp.target = this.field.dependent;
      this.ds.notify( dp );
    }
  }

}
