import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { getFormData } from "../utils/FormHandler.js";



export class CaseFilesController {
  constructor() {
    console.log('📁🕵️🎮');
    this.drawCaseFilesList()
    this.drawActiveCaseFile()
    AppState.on('caseFiles', this.drawCaseFilesList)
    AppState.on('activeCaseFile', this.drawActiveCaseFile)
    // load data from local
    caseFilesService.loadCaseFilesFromLocal()
  }

  drawCaseFilesList() {
    const caseFileListElement = document.getElementById('case-file-list')
    caseFileListElement.innerHTML = ''
    AppState.caseFiles.forEach((caseFile) => {
      // caseFileListElement.innerHTML += `<p>${caseFile.body}</p>` // start small
      caseFileListElement.innerHTML += caseFile.listCardTemplate
    })
  }

  drawActiveCaseFile() {
    const activeCaseFileElement = document.getElementById('active-case-file')
    const activeCaseFile = AppState.activeCaseFile
    if (activeCaseFile != null) {
      // activeCaseFileElement.innerHTML = activeCaseFile.body // start small
      activeCaseFileElement.innerHTML = activeCaseFile.activeCaseFileTemplate
    } else {
      activeCaseFileElement.innerHTML = `
      <div class="card text-secondary p-4">
        <h2>Please Select a CaseFile to get Started</h2>
      </div>
      `
    }
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
    // @ts-ignore
    form.reset() // clears out the forms inputs, so you can start fresh
  }

  selectActiveCaseFile(caseFileId) {
    console.log('👉🕵️📁', caseFileId);
    caseFilesService.selectActiveCaseFile(caseFileId)
  }

  saveActiveCaseFile() {
    console.log('💾📁🕵️');
    event.preventDefault()
    let form = event.target
    console.log('💾🎯', form);
    let formData = getFormData(form)
    console.log('💾📝', formData)
    caseFilesService.saveTheActiveCaseFile(formData)
  }


  redactActiveCaseFile() {
    console.log('⬛⬛📁🕵️');
    caseFilesService.redactActiveCaseFile()
  }
}