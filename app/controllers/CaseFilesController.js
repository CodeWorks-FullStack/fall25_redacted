import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { getFormData } from "../utils/FormHandler.js";



export class CaseFilesController {
  constructor() {
    console.log('📁🕵️🎮');
    this.drawCaseFilesList()
    AppState.on('caseFiles', this.drawCaseFilesList)
  }

  drawCaseFilesList() {
    const caseFileListElement = document.getElementById('case-file-list')
    caseFileListElement.innerHTML = ''
    AppState.caseFiles.forEach((caseFile) => {
      // caseFileListElement.innerHTML += `<p>${caseFile.body}</p>` // start small
      caseFileListElement.innerHTML += caseFile.listCardTemplate
    })
  }

  createCaseFile() {
    console.log('➕📁🕵️');
    event.preventDefault() // prevents the default action
    // for forms, when submitting, the default action is to take you away to a new page, OR reload the page with url "query parameters"
    let form = event.target
    console.log('🎯', event, form);
    // console.log(form.agency.value, form.reportedDate.value);
    // let caseFileData = {
    //   agency: form.agency.value,
    //   reportedDate: form.reportedDate.value
    // }
    // NOTE getFormData is from the utilities folder, it pulls data out of a form into an object, based on input name attributes
    let caseFileData = getFormData(form)
    console.log('📝', caseFileData) // ‼️Very important to look ad this console log after getting the form data and VERIFY it looks good before moving on

    caseFilesService.createCaseFile(caseFileData)

  }
}