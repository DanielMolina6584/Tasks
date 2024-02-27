import React, { ChangeEvent, useState } from 'react'
//--Interfaz del form--//
interface FormState {
    [key: string]: string;
}
//--interfaz del Custom Hook--//
interface FormUse {
    formValues: FormState,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    reset: () => void
}

//--creacion del hook--//
const useForm = (initialState: FormState):FormUse => {
  //--Inicializacion del estado del form--//
  const [formValues, setFormValues] = useState<FormState>(initialState)
  //--Funcion que me maneja los cambios en los campos del form--//

  const handleChange =  (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormValues({...formValues,  [name]:value})
  }
  const reset = () => {
    setFormValues(initialState)
  }

  return {
    formValues,
    handleChange,
    reset
  }
}

export default useForm