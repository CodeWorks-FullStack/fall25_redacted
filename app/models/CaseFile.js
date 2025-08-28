import { generateId } from "../utils/GenerateId.js"


export class CaseFile {
  constructor(data) {
    this.id = generateId()
    this.agency = data.agency
    this.caseNumber = this.id.slice(this.id.length - 4).toUpperCase()
    this.body = data.body
    this.reportedDate = data.reportedDate
    this.redactedDate = data.redactedDate
  }


  get listCardTemplate() {
    return `
      <article class="mb-2 card py-1">
        <b>${this.agency}-<span class="text-success-emphasis">${this.caseNumber}</span></b>
        <div class="d-flex">
          <span class="text-secondary">${this.reportedDate}</span>
        </div>
      </article>
    `
  }
}