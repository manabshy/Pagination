import { Component, OnInit, Input, Output } from '@angular/core';
import { FormDataService } from '../form-service/form-data.service';
import { FieldControlService } from '../form-service/field-control.service';
import { CreateCaseService } from '../../../create-case/create-case.service';
import { FieldBase } from '../field-templates/field-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions} from "@angular/http"
import { Observable } from 'rxjs/Rx';
import { metaData,metadataMap} from '../../../create-case/metadata.model';  
import { AppMessage,MessageType } from '../../../shared/notification/notification.model';

import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css'],
  providers: [FormDataService, FieldControlService,CreateCaseService]
})
export class FormGeneratorComponent implements OnInit {
  @Input() formId: string;
  @Input() caseId: string;
  @Input() fields: FieldBase<any>[] = [];
  @Input() title: string;
  info: AppMessage;
  status: AppMessage;
  form: FormGroup;
  public formData = '';
  casePostResponse: string;

  constructor(private _service: FormDataService, 
              private _fcs: FieldControlService , 
              private _ccs: CreateCaseService, private _http: Http) {  }

  ngOnInit() {
    this.getForm();
    this.info = new AppMessage(MessageType.info, '', "Case: " + this.caseId);
  }

   getForm(){
    this._service.getData(this.formId).subscribe(data => {
      this.fields = data;
      this.form = this._fcs.toFormGroup(this.fields);
    });
   }

   onSubmit() {
      const metaDataObj = new metaData;
      metaDataObj.type = this.formId.toString();
      metaDataObj.metadataMap = this.getMetaMap()
      this.formData = JSON.stringify(metaDataObj);
      this._ccs.createCaseXHR(this.formData, this.caseId)
      .subscribe(data => {
        this.casePostResponse = JSON.stringify(data['status']);
        this.status = new AppMessage(MessageType.success,'',"Status:" + this.casePostResponse)
    },(error:any)=> { 
      this.casePostResponse = 'true';
      if(error) {
        // error = error.json();
        let errorMsg = error.validationErrors[0].failureMessage;
        errorMsg = JSON.parse(errorMsg);
        this.status = new AppMessage(MessageType.danger,'',errorMsg.message);
      } else {
        this.status = new AppMessage(MessageType.success,'','Case successfully created!');
      }
     
    });
    
  }

  getMetaMap(){
      const metaDataObj = new metaData;
      if (this.formId === "cf_case_folder") {  // use your formId here for - case
        
          metaDataObj.metadataMap = new metadataMap();
          metaDataObj.metadataMap.caseCreator = this.form.value.caseCreator;
          metaDataObj.metadataMap.caseTeam = this.form.value.caseTeam;
          metaDataObj.metadataMap.caseStatus = this.form.value.caseStatus;       
      }
      else if (this.formId === "fileUpload"){ // use your formId here for - file upload

      }
      return metaDataObj.metadataMap;
  }
}
