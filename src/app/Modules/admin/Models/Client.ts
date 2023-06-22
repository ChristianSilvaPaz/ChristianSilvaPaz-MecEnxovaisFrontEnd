export interface Client {
    id: string
    name: string
    phoneNumber1: string
    phoneNumber2: string
    cpf: string
    birthDate: string
    maritalStatus: string
    sex: string
    rg: string
    dispatchingAgency: string

    referenceName1: string
    referenceName2: string
    referenceName3: string

    referencePhone1: string
    referencePhone2: string
    referencePhone3: string
    dateRegistration: string
    dateUpdate: string
    
    address?: Address
  }
  
  export interface Address {
    id: string
    publicPlace: string
    neighborhood: string
    city: string
    zipCode: string
    pointReference: string
    dateRegistration: string
    dateUpdate: string
    clientId: string
  }
  