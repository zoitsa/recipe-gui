import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { FormGroup, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  form: FormGroup;

  public selectedIndex = 1;
    public items: Array<string>;
 
    constructor() {
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }
    }
 
    public onChange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
 
    public onOpen() {
        console.log("Drop Down opened.");
    }
 
    public onClose() {
        console.log("Drop Down closed.");
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

}
