import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef, 
  Input, 
  OnChanges, 
  SimpleChanges, 
  Output,   
  EventEmitter, 
  ViewChildren, 
  QueryList, 
  AfterViewInit, 
  OnDestroy } from '@angular/core';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as imagepicker from "nativescript-imagepicker";
import {ImageSource } from "tns-core-modules/image-source";
import {path, knownFolders, File} from "tns-core-modules/file-system";
import * as camera from "nativescript-camera";
import { ApiService } from '~/app/services/api.service';
import { Subscription } from 'rxjs';
import * as dialogs from "tns-core-modules/ui/dialogs";




@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  form: FormGroup;
  @Input() categories;
  @Input() categoryTypes;
  @ViewChild('category') categoryDropDown: ElementRef;
  @ViewChild('type') typeDropDown: ElementRef;
  @ViewChild('scrollCtrl') scrollCtrl: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChildren('ingredientsEl') ingredients: QueryList<ElementRef>;
  @ViewChildren('stepsEl') steps: QueryList<ElementRef>;
  @Output() category: EventEmitter<any> = new EventEmitter();
  tags = ['Vegan', 'Vegetarian', 'Dairy-free', 'Gluten-free', 'Paleo' ];
  imageAssets = [];
  imageUris = [];
  base64images = [];
  captureAssets = [];
  captureUris = [];
  imageSrc: any;
  imageIndex = 1;
  captureIndex = 1;
  ingredient: Subscription;
  step: Subscription;
  selectedImage: File;
  recipeType: number;

  public selectedIndex = 1;
    public items: Array<string>;
 
    constructor(private apiService:ApiService) {
  
    }
 

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
      steps: new FormArray([new FormControl(null)]),
      photo: new FormArray([]),
      tags: new FormGroup({})
    });  
    this.tags.forEach(tag => {
      (<FormGroup>this.form.get('tags')).addControl(tag, new FormControl(false));
    })
  }

  ngAfterViewInit() {
    this.ingredient = this.ingredients.changes.subscribe(() => {
      if(this.ingredients.length > 1){
        this.ingredients.last.nativeElement.focus();
      }
    });

    this.step = this.steps.changes.subscribe(() => {
      if(this.steps.length > 1){
        this.steps.last.nativeElement.focus();
      }      
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

  onCreateRecipe() {
    
    const recipeForm = { 
      name: this.form.get('name').value, 
      description: this.form.get('description').value, 
      ingredients: this.form.get('ingredients').value,   
      steps: this.form.get('steps').value,
      // tag: 'poultry recipe'
      type: this.recipeType,
      photo: this.imageUris[0]
    };



    this.apiService.postRecipe(recipeForm).subscribe(res => console.log(res));

    dialogs.alert("Recipe Created!").then(()=> {
      this.form.reset();
      const ingredients = (<FormArray>this.form.get('ingredients'));
      const steps = (<FormArray>this.form.get('steps'));
      while(ingredients.length > 1) {
        ingredients.removeAt(0);
      }
      while(steps.length > 1) {
        steps.removeAt(0);
      }

      this.scrollCtrl.nativeElement.scrollToVerticalOffset(0);
      this.imageUris = [];
      this.captureUris = [];
      this.categoryDropDown.nativeElement.selectedIndex = "0";
      this.typeDropDown.nativeElement.selectedIndex = "0";
      this.name.nativeElement.focus();
    });

  }

  onCategoryChange(args: SelectedIndexChangedEventData) {

    this.typeDropDown.nativeElement.items = [];
    this.typeDropDown.nativeElement.selectedIndex = "0";
    this.category.emit(args.newIndex);
   
  }

  onTypeChange(args: SelectedIndexChangedEventData) {
    this.recipeType = args.newIndex;
  }

  onSelectImage() {
    let that = this;    

    let context = imagepicker.create({
      mode: "single" // use "multiple" for multiple selection
    });

    context
    .authorize()
    .then(function() {       
        return context.present();
    })
    .then(function(selection) {
        selection.forEach(function(selected) {
              // process the selected image
          
            const source = new ImageSource();
            source.fromAsset(selected)
            .then((imageSource: ImageSource) => {
             const folderPath: string = knownFolders.documents().path;
            const fileName = `test${that.imageIndex}.png`;
            const filePath = path.join(folderPath, fileName);
            console.log(filePath);
            that.imageUris.push(filePath);            
            const saved: boolean = imageSource.saveToFile(filePath, "png");
            if (saved) {
                console.log("Image saved successfully!"); 
                // that.selectedImage = File.fromPath(filePath);
                // that.imageAssets.push(fileName);                        
                // for(let asset of that.imageAssets){
                //   console.log(asset);
                // }
                // that.selectedImage = File.fromPath(filePath);
                // console.log(this.selectedImage);
                that.imageIndex++;
            }              
              
          })
          .catch(function(e) {
            console.log(e);
          })
        })        
    }).catch(function (e) {
        // process error
        console.log(e);
    });

    
  }

  onCaptureImage() {
        let that = this;
          if(camera.isAvailable()){
              camera.requestPermissions().then(
                  // function success() {
                      () => {
                          camera.takePicture()
                          .then((imageAsset) => {
                              const source = new ImageSource();
                              // source.fromAsset(imageAsset);
                              
                              source.fromAsset(imageAsset).then((imageSource: ImageSource) => {
                                const folderPath: string = knownFolders.documents().path;
                                const fileName = `capture${that.captureIndex}.png`;
                                const filePath = path.join(folderPath, fileName);
                                that.captureUris.push(filePath);                                
                                const saved: boolean = imageSource.saveToFile(filePath, "png"); 
                                if (saved) {
                                  console.log("Image saved successfully!!");         
                                  // that.captureAssets.push(fileName);                        
                                  // for(let asset of that.imageAssets){
                                  //   console.log(asset);
                                  // }

                                  that.captureIndex++;
                                }  
                              }, (err) => {
                                      console.log("Error -> " + err.message);
                              });


                           })
                          .catch((err) => {
                              console.log("Error -> " + err.message);
                          });
                      })
      }
  }

      
  ngOnDestroy() {
    this.ingredient.unsubscribe();
    this.step.unsubscribe();
  }

}
