import { CaseFilesController } from "./controllers/CaseFilesController.js"

class App {

  caseFilesController = new CaseFilesController()

}

window['app'] = new App()


