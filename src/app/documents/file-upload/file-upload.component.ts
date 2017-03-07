import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppMessage, MessageType } from '../../shared/notification/notification.model';
import { DocumentService } from '../shared/document.service';
import { FieldsModel } from '../../shared/fields/fields.model';

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

  constructor(private documentService: DocumentService, private activatedRoute: ActivatedRoute) { }

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
    this.form.controls['fileType'].setValue(event.target.files[0].type);
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
    formData.append('metaData', JSON.stringify(metaData) );

    this.documentService.postDocument(this.caseId, formData)
      .subscribe( (data:any) => {
        this.status = new AppMessage(MessageType.success,'Document successfully uploaded',
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

}
