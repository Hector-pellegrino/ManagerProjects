const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layouts/Loading'
import Conteiner from '../layouts/Conteiner'
import ProjectForm from '../project/ProjectForm'
import Message from '../layouts/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

export default function Project() {
  const { id } = useParams()

  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [messageKey, setMessageKey] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      fetch(`${API_URL}/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application.json',
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          setProject(data)
          setServices(data.servicos)
        })
        .catch((erro) => console.log(erro))
    }, 300)
  }, [id])

  function editPost(project) {
    if (project.budget < project.custo) {
      setMessage('O orçamento não pode ser menor que o custo do projeto')
      setType('error')
      return false
    }

    fetch(`${API_URL}/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(project),
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado')
        setType('success')
        setMessageKey(Date.now())
      })
      .catch((erro) => console.log(erro))
  }

  function createService(project) {
    const lastService = project.servicos[project.servicos.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.custo

    const newCost = parseFloat(project.custo) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      setMessageKey(Date.now())
      project.servicos.pop()
      return false
    }

    project.custo = newCost

    fetch(`${API_URL}/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(project),
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setServices(data.servicos)
        setShowServiceForm(!showServiceForm)
        setMessageKey(Date.now())
        setMessage('Serviço adicionado!')
        setType('success')
      })
      .catch((erro) => console.log(erro))
  }

  function removeService(id, cost) {
    const servicesUpdated = project.servicos.filter((service) => service.id !== id)

    const projectUpdated = project
    projectUpdated.servicos = servicesUpdated

    projectUpdated.custo = parseFloat(projectUpdated.custo) - parseFloat(cost)

    fetch(`${API_URL}/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessageKey(Date.now())
        setMessage('Serviço removido com sucesso')
        setType('success')
      })
      .catch((erro) => console.log(erro))
  }

  function toogleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }
  function toogleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Conteiner customClass='column'>
            {message && <Message key={messageKey} type={type} msg={message} />}
            <div className={styles.details_conteiner}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toogleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.custo}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText='Concluir edição'
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_conteiner}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toogleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText='Adicionar serviço'
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Conteiner customClass='start'>
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.custo}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Conteiner>
          </Conteiner>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
