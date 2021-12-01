import React from 'react'
import { connect } from 'react-redux'
import { doLoginWithGoogleAction, dologoutAction } from '../../redux/userDuck'
import styles from './login.module.css'

const LoginPage = ({ fetching, logged, doLoginWithGoogleAction, dologoutAction }) => {

    const handleClickLogin = () => {
        doLoginWithGoogleAction()
    }

    const handleClickLogout = () => {
        dologoutAction()
    }

    if (fetching) return <h2>Cargando</h2>

    return (
        <div className={styles.container}>
            {
                logged ? (
                    <>
                        <h1>
                            Cierra tu sesión
                        </h1>
                        <button onClick={handleClickLogout}>
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <h1>
                            Inicia Sesión con Google
                        </h1>
                        <button onClick={handleClickLogin}>
                            Iniciar
                        </button>
                    </>
                )
            }
        </div>
    )
}

const mapStateToProps = function ({ user: { fetching, logged } }) {
    return {
        fetching,
        logged
    }
}

export default connect(mapStateToProps, { doLoginWithGoogleAction, dologoutAction })(LoginPage);