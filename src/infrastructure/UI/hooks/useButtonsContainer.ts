/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'

export const useButtonsContainer = () => {
    const [showDetailMovement, setShowDetailMovement] = useState({
        detail: false,
        movement: false,
    })

    const [showForm, setShowForm] = useState(true)

    const handleOpenDetails = (): void => {
        if (showDetailMovement.detail === true) {
            setShowForm(true)
            setShowDetailMovement({
                ...showDetailMovement,
                detail: false,
                movement: false,
            })
        } else {
            setShowForm(false)
            setShowDetailMovement({
                ...showDetailMovement,
                detail: true,
                movement: false,
            })
        }
    }

    const handleOpenMovements = (): void => {
        if (showDetailMovement.movement === true) {
            setShowForm(true)
            setShowDetailMovement({
                ...showDetailMovement,
                detail: false,
                movement: false,
            })
        } else {
            setShowForm(false)
            setShowDetailMovement({
                ...showDetailMovement,
                detail: false,
                movement: true,
            })
        }
    }

    return {
        handleOpenDetails,
        handleOpenMovements,
        showForm,
        showDetailMovement,
    }
}
