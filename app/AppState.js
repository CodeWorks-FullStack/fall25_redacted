import { CaseFile } from './models/CaseFile.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {


  /** @type {CaseFile[]} */
  caseFiles = [
    new CaseFile({
      agency: 'NFS🙊',
      body: 'I saw bigfoot',
      reportedDate: '2024-08-01'
    }),
    new CaseFile({
      agency: 'SPC👽',
      body: 'I Drove a small grey alien to McDonalds for the infamous McDonald Land McDonald Shake + Exclusive Collectors tin for $17.99',
      reportedDate: '2025-08-01'
    }),
    new CaseFile({
      agency: 'USPS📨',
      body: 'Im pretty sure someone is trying to mail bootleg JoJo figurines. Seems like a scam. I would know.',
      reportedDate: '2023-03-24'
    }),
  ]

}

export const AppState = createObservableProxy(new ObservableAppState())