/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ManageProvider as ManageInProvider } from './context'

// redux resources
import { getMessagesAction } from '../../../../redux/manage'
import { actions as onboardingActions } from '../../../../redux/onboarding'
import { messagesSelector, onboardingSelector } from '../../../../selectors'

// custom hooks
import { useAuthRoute } from '../../../hooks'

type ManageProviderProps = {
    children: React.ReactNode
}

const ManageProvider = ({ children }: ManageProviderProps): React.ReactElement => {
    const dispatch = useDispatch()
    const messages = useSelector(messagesSelector)

    // initial states
    const { onboarding } = useSelector(onboardingSelector)
    const { refreshToken } = useSelector((store: any) => store.auth)

    useAuthRoute()

    useEffect(() => {
        dispatch(getMessagesAction())
    }, [refreshToken])

    // request services if user session exists
    useEffect(() => {
        if (refreshToken) {
            dispatch(onboardingActions.getOnboardingAction())
        }
    }, [refreshToken])

    return <ManageInProvider state={{ messages, onboarding }}>{children}</ManageInProvider>
}

export default ManageProvider
