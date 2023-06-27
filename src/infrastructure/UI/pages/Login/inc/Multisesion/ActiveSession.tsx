import { HubConnectionBuilder } from '@microsoft/signalr'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../../redux/actions/loginActions'
import { authenticationService } from '../../../../../../domain/services/User.service'
import './multisesion.scss'

// Icons
import { InactivitySVG } from '../../../../utils/getIcons'

const ActiveSession = (): JSX.Element => {
    // states definition
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const state = useSelector((stateRef: any) => stateRef)

    // event handlers
    const handleClose = (): void => setShow(false)

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/ReceiveMsj`)
            .build()
        connection
            .start()
            .then(function () {
                console.log('conect full')
            })
            .catch(function (err) {
                console.error(err)
            })
        connection.on('ReceiveMsj' + state.auth.multisesion, function (msj) {
            setMessage(msj)
            setShow(true)
            logOut()
        })
    }, [])

    const logOut = (): void => {
        setTimeout(() => {
            setShow(true)
            loggout()
        }, 10000)
    }
    const loggout = async (): Promise<void> => {
        const tokenSave = state.auth.token
        await authenticationService
            .getLogin('/api/Authorization/LogOut', tokenSave)
            .then((response) => {
                if (response) {
                    dispatch(logout())
                }
            })
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-contact-footer"
                centered
            >
                <Modal.Header closeButton className="modal-header-multi"></Modal.Header>
                <Modal.Body className="modal-body-multi">
                    <div className="body-modal-logout center">
                        <img src={InactivitySVG} alt="" />
                        <p className="title-modal">{message.split('|')[0]}</p>
                        <p className="text-modal">{message.split('|')[1]}</p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ActiveSession
