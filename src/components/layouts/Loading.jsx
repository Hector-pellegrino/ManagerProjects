import styles from './Loading.module.css'
import loading from '../../assets/loading.svg'

export default function Loading() {
  return (
    <div className={styles.loader_conteiner}>
      <img className={styles.loader} src={loading} alt="Loading" />
    </div>
  )
}
