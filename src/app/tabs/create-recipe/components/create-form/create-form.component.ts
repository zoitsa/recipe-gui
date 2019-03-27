import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, ViewChildren, Output, EventEmitter } from '@angular/core';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as imagepicker from "nativescript-imagepicker";
// import { Page } from 'ui/page';





@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() categories;
  @Input() categoryTypes;
  @ViewChild('category') categoryDropDown: ElementRef;
  @ViewChild('type') typeDropDown: ElementRef;
  @Output() category: EventEmitter<any> = new EventEmitter();

  public selectedIndex = 1;
    public items: Array<string>;
 
    constructor() {
  
    }
 
    // public onChange(args: SelectedIndexChangedEventData) {
    //     this.typeDropDown.nativeElement.isEnabled = true;
    //     console.log('changed!');
    // }
 
    ngOnChanges(changes: SimpleChanges) {
     
      if(changes.categoryTypes) {
    
        this.typeDropDown.nativeElement.isEnabled = true;
      }
    }

  ngOnInit() {
    this.form = new FormGroup({  
      name: new FormControl(null, {updateOn: 'blur'}),
      description: new FormControl(null, {updateOn: 'blur'}),
      ingredients: new FormArray([new FormControl(null)]),
      steps: new FormArray([new FormControl(null)])
    });  
  }

  onAddIngredient() {
    const control = new FormControl(null);
    (<FormArray>this.form.get('ingredients')).push(control);
  }

  onAddStep() {
    const control = new FormControl(null);
    (<FormArray>this.form.get('steps')).push(control);
  }

  onSubmit() {
    console.log(this.form.get('category'));
  }

  onCategoryOpen() {
    
  }

  onCategoryChange(args: SelectedIndexChangedEventData) {
    console.log("Category chosen!");
    // console.log(data);
    this.typeDropDown.nativeElement.items = [];
    this.typeDropDown.nativeElement.selectedIndex = "0";
    this.category.emit(args.newIndex);
   
  }


}
