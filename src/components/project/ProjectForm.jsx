const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

import { use, useEffect, useState } from 'react'

import styles from './ProjectForm.module.css'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

export default function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => setCategories(data))
      .catch((erro) => console.log(erro))
  }, [])

  const submit = (evento) => {
    evento.preventDefault()
    handleSubmit(project)
  }

  function handleChange(evento) {
    setProject({ ...project, [evento.target.name]: evento.target.value })
  }

  function handleCategoria(evento) {
    setProject({
      ...project,
      category: {
        id: evento.target.value,
        name: evento.target.options[evento.target.selectedIndex].text,
      },
    })
  }
  return (
    <form onSubmit={submit} className={styles.form}>
      <div>
        <Input
          type='text'
          text='Nome do projeto'
          name='name'
          placeholder='Insira o nome do projeto'
          handleOnchange={handleChange}
          value={project.name}
        />
      </div>
      <div>
        <Input
          type='number'
          text='Orçamento do projeto'
          name='budget'
          placeholder='Insira o orçamento total'
          handleOnchange={handleChange}
          value={project.budget}
        />
      </div>
      <div>
        <Select
          name='category_id'
          text='Selecione a categoria'
          options={categories}
          handleOnchange={handleCategoria}
          value={project.category ? project.category.id : ''}
        />
      </div>
      <SubmitButton text={btnText}/>
    </form>
  )
}
