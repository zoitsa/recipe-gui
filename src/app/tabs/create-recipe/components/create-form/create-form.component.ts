import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as imagepicker from "nativescript-imagepicker";
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import {Folder, path, knownFolders, File} from "tns-core-modules/file-system";
import * as camera from "nativescript-camera";
import { ApiService } from '~/app/services/api.service';

// import { Image } from "tns-core-modules/ui/image";
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
  imageAssets = [];
  imageUris = [];
  captureAssets = [];
  captureUris = [];
  imageSrc: any;
  imageIndex = 1;
  captureIndex = 1;

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
      photo: new FormArray([])
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
    // if(typeof this.imageUris[0].path === "string") {
    //   console.log("string");
    // }
    // console.log(typeof this.imageUris[0].path)
    
    const recipeForm = { 
      name: this.form.get('name').value, 
      description: this.form.get('description').value, 
      photo: this.imageUris[0].name, 
      ingredients: this.form.get('ingredients').value, 
      steps: [{ recipeStep: 'step 1'}],
      tag: 'poultry recipe'
    };
    // console.log(this.form.value)
    this.apiService.postRecipe(recipeForm).subscribe(res => console.log(res));
  }

  onCategoryChange(args: SelectedIndexChangedEventData) {
    console.log("Category chosen!!");
    // console.log(data);
    this.typeDropDown.nativeElement.items = [];
    this.typeDropDown.nativeElement.selectedIndex = "0";
    this.category.emit(args.newIndex);
   
  }

  onSelectImage() {
    let that = this;    

    let context = imagepicker.create({
      mode: "single" // use "multiple" for multiple selection
    });

    context
    .authorize()
    .then(function() {       
        that.imageSrc = null;
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
                // that.imageAssets.push(fileName);                        
                // for(let asset of that.imageAssets){
                //   console.log(asset);
                // }
                const file: File = File.fromPath(filePath);
                console.log(file);
                that.imageIndex++;
            }           
          
              
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
                      }

                  // },
                  // function failure() {
                  //     dialogs.alert("Permission Denied").then(()=> {
                  //         console.log("Dialog closed!");
                  //     });
                  // }

              )
      }
  }
  

}
