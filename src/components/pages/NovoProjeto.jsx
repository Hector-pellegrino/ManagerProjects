const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
import { Navigate, useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './novoProjeto.module.css'

export default function NovoProjeto() {

  const history = useNavigate()

  function createPost(projeto) {
    // iniciando o custo e os serviços
    projeto.custo = 0
    projeto.servicos = []
    
    fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto)
    }
    ).then((resposta) => resposta.json()).then((data) => history('/projects', {state: {message: 'Projeto criado com sucesso!'}})).catch((erro) => console.log(erro))
  }
  return (
    <div className={styles.newproject_conteiner}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText = "Criar projeto"/>
    </div>
  )
}
