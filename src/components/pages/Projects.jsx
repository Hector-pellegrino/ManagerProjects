const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


import styles from './Projects.module.css'

import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Conteiner from '../layouts/Conteiner'
import LinkButton from '../layouts/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Message from '../layouts/Message'
import Loading from '../layouts/Loading'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)

  const [projectMessage, setProjectMessage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      fetch(`${API_URL}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          setProjects(data)
          setRemoveLoading(true)
        })
        .catch((erro) => console.log(erro))
    }, 500)
  }, [])

  const location = useLocation()
  let message = ''

  if (location.state) {
    message = location.state.message
  }

  function removeProject(id) {
    fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage('Projeto removido com sucesso')
      })
      .catch((erro) => console.log(erro))
  }
  return (
    <div className={styles.project_conteiner}>
      <div className={styles.title_conteiner}>
        <h1>Meus Projetos</h1>
        <LinkButton to='/novoProjeto' text='Criar Projeto' />
      </div>
      {message && <Message msg={message} type='success' />}
      {projectMessage && <Message msg={projectMessage} type='success' />}

      <Conteiner customClass='start'>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category?.name}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && <p>Não há projetos cadastrados!</p>}
      </Conteiner>
    </div>
  )
}
