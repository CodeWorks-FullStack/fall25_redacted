import { generateId } from "../utils/GenerateId.js"


export class CaseFile {
  constructor(data) {
    this.id = data.id || generateId()
    this.agency = data.agency
    this.caseNumber = this.id.slice(this.id.length - 4).toUpperCase()
    this.body = data.body || ''
    // for reported date there will always be one, so this is safe
    this.reportedDate = new Date(data.reportedDate)

    // NOTE because there won't always be a redacted date, specifically on newer case files. we can't create a new Date from 'null' or 'undefined' to we use a ternary to only construct the date, IF(?) there is one
    // Ternary is like an inline 'if' statement, takeing a true or false value based on a condition
    // .................          condition      ?  val if true : val if false
    this.redactedDate = data.redactedDate == undefined ? null : new Date(data.redactedDate)
    // if there is NO redacted date (data.redactedDate IS undefined), the ternary will resolve with the first position 'null'
    // if there is a redacted date (data.redacted IS NOT undefined), the ternary will resolve with the second position 'new Date(data.redactedDate)', constructing a new Date object in the process
  }


  get listCardTemplate() {
    return `
      <article class="mb-2 card py-1 case-file-card" onclick="app.caseFilesController.selectActiveCaseFile('${this.id}')">
        <b>${this.agency}-<span class="text-success-emphasis">${this.caseNumber}</span></b>
        <div class="d-flex">
          <span class="text-secondary">${this.shortReportedDate}</span>
        </div>
      </article>
    `
  }


  get activeCaseFileTemplate() {
    return `
      <article class="card">
        <div class="card-body">
        <h2>${this.agency}-${this.caseNumber}</h2>
        <div class="text-secondary" title="Reported Date"><i class="mdi mdi-calendar-plus"></i>${this.longReportDate}</div>
        <div class="text-secondary" title="Redacted Date"><i class="mdi mdi-calendar-badge"></i>${this.redactedFormatDate}</div>

        <form onsubmit="app.caseFilesController.saveActiveCaseFile()">
          <textarea id="case-file-body" name="body" class="form-control case-file-body">${this.body}</textarea>
          <button class="btn btn-teal mt-2">Save<i class="mdi mdi-content-save"></i></button>
          </form>
          <button onclick="app.caseFilesController.redactActiveCaseFile()" class="btn btn-danger mt-2 w-100">REDACT</i></button>
        </div>
      </article>
    `
  }


  // NOTE using date objects can be a very powerful way to display "Dates". They come with all sorts of built in methods to get the date back in sorts of ways. Here are a couple ways you could use it.
  get shortReportedDate() {
    return this.reportedDate.toLocaleDateString()
  }

  get longReportDate() {
    // ⚠️ WARNING : this is an example of what you *can* format you date like, showing off many values. if you copy and paste this and use it in your check point 😏👈👉 I'll be watching you...
    return this.reportedDate.toLocaleDateString('en-US', {
      year: "numeric",
      month: 'long',
      weekday: 'long',
      day: '2-digit',
      dayPeriod: 'long',
      era: 'long'
    })
  }

  get redactedFormatDate() {
    if (this.redactedDate == null) {
      return "not redacted"
    }
    return this.redactedDate.toLocaleDateString()
  }
}