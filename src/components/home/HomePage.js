import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterAction } from '../../redux/charsDuck'

const Home = ({ characters, removeCharacterAction }) => {

    function renderCharacter() {
        let char = characters[0]
        return (
            <Card leftClick={removeCharacter} {...char} />
        )
    }

    function removeCharacter() {
        removeCharacterAction();
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
        characters: state.character.characters
    }
}

export default connect(mapStateToProps, { removeCharacterAction })(Home);
