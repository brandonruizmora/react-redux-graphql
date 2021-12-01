import React from 'react'
import { connect } from 'react-redux'
import { doLoginWithGoogleAction } from '../../redux/userDuck'
import styles from './login.module.css'

const LoginPage = ({ fetching, doLoginWithGoogleAction }) => {

    const handleClickLogin = () => {
        doLoginWithGoogleAction()
    }

    if (fetching) return <h2>Cargando</h2>

    return (
        <div className={styles.container}>
            <h1>
                Inicia Sesión con Google
            </h1>
            <h1>
                Cierra tu sesión
            </h1>
            <button onClick={ handleClickLogin }>
                Iniciar
            </button>
            <button>
                Cerrar Sesión
            </button>
        </div>
    )
}

const mapStateToProps = function ({ user: { fetching }}) {
    return {
        fetching
    }
}

export default connect(mapStateToProps, { doLoginWithGoogleAction })(LoginPage);