export class MetaDataModel {
  constructor(
    public customerId: string,
    public sourceSystem: string,
    public contentType: string,
    public receivedDate: Date
    ) { }
    public UTR: string;
};


export class MetaDataResponseModel extends MetaDataModel {
  metadata: MetaDataModel;
  responseCode: string;
  totalExecutionTime: string;
  documentId: string;
  uploadDate: Date;
  version: string;
  constructor(private _metaData: MetaDataModel){ super(_metaData.customerId, _metaData.sourceSystem, _metaData.contentType, _metaData.receivedDate)}
}

export class FileDocument {
  file: File;
  type: string;
  name: string;
  size: string;
  customer: string;
  receivedDate: Date;
  creationDate: Date;
  uploadDate: Date;
}
