import { Component,OnInit,QueryList,ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppMessage, MessageType } from '../../shared/notification/notification.model';
import { DocumentService } from '../shared/document.service';
import { FieldsModel } from '../../shared/fields/fields.model';
import { FileDocument } from '../shared/filedata.model'
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})

export class FileUploadComponent implements OnInit {
  form: FormGroup;
  caseId: string;
  metaDataFieldsList: Array<FieldsModel> = [];
  metaDataFormGroup: FormGroup;
  status: AppMessage;
  private docTypes: String[]
  files: Array<FileDocument>;
  isFileSelect: boolean = false;
  constructor(private documentService: DocumentService, 
              private activatedRoute: ActivatedRoute,
              private elementRef: ElementRef) { }


/******* */
 
    activeColor: string = '#0080ff';
    baseColor: string = '#ccc';
    overlayColor: string = 'rgba(255,255,255,0.5)';
    
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: string = '';
    
    handleDragEnter() {
        this.dragging = true;
        console.log('handleDragEnter:' + this.dragging);
    }
    
    handleDragLeave() {
        this.dragging = false;
         console.log('handleDragLeave:' + this.dragging);
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        console.log('handleDrop:calling onFileChange');
        this.onFileChange(e);
    }
    
 /****** */
  ngOnInit() {
        

    this.activatedRoute.params.subscribe((params: Params) => {
      this.caseId = params['id'];
    });
    this.form = new FormGroup({
      file: new FormControl(''),
      fileType: new FormControl('', Validators.required),
      documentType: new FormControl('', Validators.required),
      metaData: new FormGroup({})
    });

    this.metaDataFormGroup = <FormGroup>this.form.controls['metaData'];
    this.getDocTypes();
  }

  onFileChange(event) {

    if(event.target){
      if(event.dataTransfer){
          this.form.controls['fileType'].setValue(event.dataTransfer.files[0].type);      
      }
      else{
          this.form.controls['fileType'].setValue(event.target.files[0].type);
      }
    }
    if (this.files) {
      //console.log('old files', this.files);
      let file = event.target.files || event.dataTransfer.files;
      let selectedFiles: Array<File> = <Array<File>>file;
      for (let document of selectedFiles) {
        this.files.push(this.getFileDocument(document));
      }
    }
    else {
      this.files = new Array<FileDocument>();
      let file = event.target.files || event.dataTransfer.files;
      let selectedFiles: Array<File> = <Array<File>>file;
      for (let document of selectedFiles) {
        this.files.push(this.getFileDocument(document));
      }
      this.isFileSelect = true;
      console.log('files:', this.files);
    }
  }

  getFileDocument(document: File): FileDocument {
    let fileDoc: FileDocument = new FileDocument();
    fileDoc.type = document.type;
    fileDoc.name = document.name;
    fileDoc.size = document.size.toString();
    fileDoc.uploadDate = new Date(Date.now());
    return fileDoc;
  }

  onDocTypeChange(event) {
    if (event.target.value == '') return;

    this.documentService.getMetaDataFields(event.target.value).subscribe(data => {
      this.updateMetaDataFields(data);
    });
  }

  onSubmit(event) {
    let metaData = {
      type: this.form.controls['documentType'].value,
      metadataMap: this.form.controls['metaData'].value
    };

    let formData: FormData = new FormData();
    formData.append('fileType', this.form.controls['fileType'].value, null);
    formData.append('file', event.srcElement[0].files[0], 'fileName');
    formData.append('metaData', JSON.stringify(metaData));

    this.documentService.postDocument(this.caseId, formData)
      .subscribe((data: any) => {
        this.status = new AppMessage(MessageType.success, 'Document successfully uploaded',
          "Document ID:" + data.documentId);
      });
  }

  private getDocTypes() {
    this.documentService.getDocTypes().subscribe(types => {
      this.docTypes = types;
    });
  }

  private updateMetaDataFields(data) {
    this.metaDataFieldsList = [];
    let group: any = {};

    data['fieldDefinitions'].forEach((item) => {
      const fieldControl = new FormControl('');
      group[item.name] = fieldControl;

      const field = new FieldsModel();

      field.value = item.value;
      field.defaultValue = item.defaultValue;
      field.label = item.name;
      field.mandatory = item.mandatory;
      field.name = item.name;
      field.type = item.type;
      field.updatable = item.updatable;

      this.metaDataFieldsList.push(field);
    });

    this.form.setControl('metaData', new FormGroup(group));
    this.metaDataFormGroup = <FormGroup>this.form.controls['metaData'];
  }

	// file drag hover
	FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	FileSelectHandler(e) {

		// cancel event and hover styling
		this.FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

	}

}
