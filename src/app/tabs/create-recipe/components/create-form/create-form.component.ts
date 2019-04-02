import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, ViewChildren, Output, EventEmitter } from '@angular/core';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as imagepicker from "nativescript-imagepicker";
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import {Folder, path, knownFolders} from "tns-core-modules/file-system";
import * as camera from "nativescript-camera";

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
      steps: new FormArray([new FormControl(null)]),
      imageNames: new FormArray([])
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
                that.imageAssets.push(fileName);                        
                for(let asset of that.imageAssets){
                  console.log(asset);
                }
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
                                  console.log("Image saved successfully!");         
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
