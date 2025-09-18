import styles from '../project/ProjectForm.module.css'

import { useState, useEffect } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

export default function serviceForm({handleSubmit, btnText, projectData}) {

  const [service, setService] = useState()
  function submit(evento) {
    evento.preventDefault()
    projectData.servicos.push(service)
    handleSubmit(projectData)
  }

  function handleChange(evento) {
    setService({ ...service, [evento.target.name]: evento.target.value })
  }
  return (
    <div>
      <form onSubmit={submit} className={styles.form}>
        <Input
          type='text'
          text='Nome do serviço'
          name='name'
          placeholder='Insira o nome do serviço'
          handleOnchange={handleChange}
        />
        <Input
          type='number'
          text='Custo do serviço'
          name='custo'
          placeholder='Insira o valor total'
          handleOnchange={handleChange}
        />
        <Input
          type='text'
          text='Descrição do serviço'
          name='description'
          placeholder='Descreva o serviço'
          handleOnchange={handleChange}
        />
        <SubmitButton text={btnText}/>
      </form>
    </div>
  )
}
