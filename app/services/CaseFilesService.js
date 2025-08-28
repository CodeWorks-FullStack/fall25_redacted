import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js";



class CaseFilesService {

  // NOTE this param is TOTALLY not needed at all! but can be a nice quality of life addition, helps you safegaurd against using "types" wrong
  /** @/param {{agency: string, reportedDate: string}} caseFileData data coming from the form in our controller */

  createCaseFile(caseFileData) {
    console.log('➕🕵️📁🐕‍🦺', caseFileData);
    // NOTE caseFileData is just a POJO (plain old javascript object)
    // the casFileData must be backed by a class BEFORE we add it to our AppState
    let caseFile = new CaseFile(caseFileData)
    console.log('➕📁🕵️✨', caseFile);

    AppState.caseFiles.push(caseFile)
  }


}

export const caseFilesService = new CaseFilesService()