import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js";
import { REDACT } from "../utils/REDACT.js";
import { loadState, saveState } from "../utils/Store.js";



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
    this.saveCaseFilesToLocal()
  }

  selectActiveCaseFile(caseFileId) {
    console.log('👉📁🕵️🐕‍🦺', caseFileId);
    let selectedCaseFile = AppState.caseFiles.find((caseFile) => caseFile.id == caseFileId)
    console.log('👉', selectedCaseFile);
    AppState.activeCaseFile = selectedCaseFile
    console.log(AppState.activeCaseFile);
  }

  saveTheActiveCaseFile(updatedData) {
    const activeCaseFile = AppState.activeCaseFile
    console.log('active:', activeCaseFile);
    console.log('updatedData:', updatedData);
    activeCaseFile.body = updatedData.body
    this.saveCaseFilesToLocal()
  }

  redactActiveCaseFile() {
    const activeCaseFile = AppState.activeCaseFile
    activeCaseFile.body = REDACT(activeCaseFile.body)
    activeCaseFile.redactedDate = new Date()
    // AppState.activeCaseFile = AppState.activeCaseFile
    AppState.emit('activeCaseFile') // triggers observers attached to 'activeCaseFile'
    this.saveCaseFilesToLocal()
  }

  saveCaseFilesToLocal() {
    let caseFiles = AppState.caseFiles
    saveState('case-files', caseFiles)
    saveState('secret', 'shhhhhh, 🧛⏰🌍')
  }

  loadCaseFilesFromLocal() {
    // [CaseFile] means the data coming out of local storage should be an ARRAY of CaseFile backed objects
    let caseFiles = loadState('case-files', [CaseFile])
    console.log('💾Loaded Data', caseFiles);
    AppState.caseFiles = caseFiles
  }


}

export const caseFilesService = new CaseFilesService()