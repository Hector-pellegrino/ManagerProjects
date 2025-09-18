import styles from './Home.module.css'
import savins from '../../assets/savings.svg'
import LinkButton from '../layouts/LinkButton'
export default function Home() {
  return (
    <section className={styles.home_conteiner}>
      <h1>Bem vindo </h1>
      <p>Comece a gerenciar seus projetos agora mesmo !</p>
      <LinkButton to='/novoProjeto' text="Criar projeto"/>
      <img src={savins} alt="" />
    </section>
  )
}
