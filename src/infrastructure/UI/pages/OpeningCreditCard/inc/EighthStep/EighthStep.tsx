import { ReactElement, useRef } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import { ControlsButtons, HeadStep, CreditCardType, TabsCreditCardType, NavigationStep } from '..'
import { Form, FormCheck, InputGroup, CheckInput } from '../../../../components'

// styles
import {
    EighthStepWrapper,
    EighthStepContent,
    CreditCardsCtr,
    CardsTabsCtr,
    CardsTabsCtrHead,
    ImageTab,
    CardsTabCtrHead,
} from './eighthStep-styles'
import { FormLabel, FormGroup } from '../../openingCreditCard-styles'

// hooks

import { useEighthStepForm, eighthStepSchema, EighthStepType } from '../../hooks/useEighthStepForm'

// selectors
import {
    getCreditCardDataPerStepSelector,
    useSelector,
    validateUserStateSelector,
} from '../../../../../selectors'

const storageUrl = process.env.REACT_APP_STORAGE_URL as string
const urlImage = `${storageUrl}/assets/iconsProductspng/`

const defaultValues = {
    quoteSelected: 'createQuote',
}

const EighthStep = (): ReactElement => {
    // definitions
    const matchMedia = useMediaQuery('(min-width: 1024px)')

    // selectors
    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { seventhStep, eighthStep } = createCreditCard

    const selectQuote = seventhStep.cardQuote

    const values = {
        quoteSelected: eighthStep.checkCardQuote,
    }

    const defaultValuesRef = useRef({
        ...defaultValues,
        ...JSON.parse(JSON.stringify(values, (...kv) => kv[1] ?? undefined)),
    })

    // hooks
    const {
        handleSubmit,
        register,
        watch,
        control,
        getValues,
        preparedToSend,
        preparedToSave,
        isLoadingSave,
        isLoadingContinue,
    } = useEighthStepForm({
        defaultValues: defaultValuesRef.current,
        validationSchema: yupResolver(eighthStepSchema),
    })
    const { isValid } = useFormState({ control })
    watch()

    const onSubmit = ({ quoteSelected }: EighthStepType): void => {
        preparedToSend({ quoteSelected })
    }

    const onSave = (): void => {
        preparedToSave()
    }

    const formatCategoryTypeText = (type: string | undefined | null): string => {
        if (!type) {
            return ''
        }
        const title = type.replace('CreditCardLimit', '')
        return title
    }

    const selectedQuoteParams = (): {
        cardType: string
        image: string
    } => {
        const cardType = validateUser?.creditCardCategory
            ? formatCategoryTypeText(validateUser.creditCardCategory)
            : formatCategoryTypeText(eighthStep.cardImage)
        const image = validateUser?.creditCardCategory
            ? `${urlImage}${validateUser.creditCardCategory}.png`
            : `${urlImage}${eighthStep.cardImage}.png`

        return { cardType, image }
    }

    const alternativeQuoteParams = (): {
        cardType: string
        image: string
        quote: number
    } => {
        const cardType = validateUser?.autoCategory
            ? formatCategoryTypeText(validateUser?.autoCategory)
            : formatCategoryTypeText(eighthStep.cardAlternativeImage)
        const image = validateUser?.autoCategory
            ? `${urlImage}${validateUser?.autoCategory}.png`
            : `${urlImage}${eighthStep.cardAlternativeImage}.png`
        const quote = validateUser?.autoFee ?? eighthStep.autoFee ?? 0

        return { cardType, image, quote }
    }

    return (
        <>
            <NavigationStep saveAndExit onSave={onSave} />
            <EighthStepWrapper>
                <EighthStepContent>
                    <HeadStep
                        title="Solicitud"
                        paragraph="Tenemos dos opciones para ti, elige la opción que mejor se acomode a tus necesidades"
                    />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <CreditCardsCtr>
                            {matchMedia ? (
                                <FormGroup>
                                    <InputGroup>
                                        <FormCheck>
                                            <FormLabel htmlFor="createQuote">
                                                <CreditCardType
                                                    isActive={
                                                        getValues('quoteSelected') === 'createQuote'
                                                    }
                                                    cardProps={{
                                                        cardType: selectedQuoteParams().cardType,
                                                        title: 'Tu cupo supera el monto para una póliza automática',
                                                        text: 'Deberás diligenciar un documento con la aseguradora',
                                                        image: selectedQuoteParams().image,
                                                        quota: selectQuote ?? 0,
                                                    }}
                                                />
                                            </FormLabel>
                                            <CheckInput
                                                value="createQuote"
                                                type="radio"
                                                id="createQuote"
                                                {...register('quoteSelected')}
                                            />
                                            <FormLabel htmlFor="alternativeQuote">
                                                <CreditCardType
                                                    isActive={
                                                        getValues('quoteSelected') ===
                                                        'alternativeQuote'
                                                    }
                                                    cardProps={{
                                                        cardType: alternativeQuoteParams().cardType,
                                                        title: '¡Estás cubierto!',
                                                        text: 'Podrás solicitar tu tarjeta en pocos minutos',
                                                        image: alternativeQuoteParams().image,
                                                        quota: alternativeQuoteParams().quote,
                                                    }}
                                                />
                                            </FormLabel>
                                            <CheckInput
                                                value="alternativeQuote"
                                                type="radio"
                                                id="alternativeQuote"
                                                {...register('quoteSelected')}
                                            />
                                        </FormCheck>
                                    </InputGroup>
                                </FormGroup>
                            ) : (
                                <FormGroup>
                                    <InputGroup>
                                        <FormCheck>
                                            <CardsTabsCtr>
                                                <CardsTabsCtrHead>
                                                    <CardsTabCtrHead
                                                        isLeft
                                                        isActive={
                                                            getValues('quoteSelected') ===
                                                            'createQuote'
                                                        }
                                                    >
                                                        <CheckInput
                                                            value="createQuote"
                                                            type="radio"
                                                            id="createQuote"
                                                            {...register('quoteSelected')}
                                                        />
                                                        <FormLabel htmlFor="createQuote">
                                                            <ImageTab
                                                                isActive={
                                                                    getValues('quoteSelected') ===
                                                                    'createQuote'
                                                                }
                                                                src={
                                                                    validateUser?.creditCardCategory
                                                                        ? `${urlImage}${validateUser?.creditCardCategory}.png`
                                                                        : `${urlImage}${eighthStep.cardImage}.png`
                                                                }
                                                                alt={
                                                                    validateUser?.creditCardCategory ??
                                                                    ''
                                                                }
                                                            />
                                                        </FormLabel>
                                                    </CardsTabCtrHead>
                                                    <CardsTabCtrHead
                                                        isLeft={false}
                                                        isActive={
                                                            getValues('quoteSelected') ===
                                                            'alternativeQuote'
                                                        }
                                                    >
                                                        <CheckInput
                                                            value="alternativeQuote"
                                                            type="radio"
                                                            id="alternativeQuote"
                                                            {...register('quoteSelected')}
                                                        />
                                                        <FormLabel htmlFor="alternativeQuote">
                                                            <ImageTab
                                                                isActive={
                                                                    getValues('quoteSelected') ===
                                                                    'alternativeQuote'
                                                                }
                                                                src={
                                                                    validateUser?.autoCategory
                                                                        ? `${urlImage}${validateUser?.autoCategory}.png`
                                                                        : `${urlImage}${eighthStep.cardAlternativeImage}.png`
                                                                }
                                                                alt={
                                                                    validateUser?.autoCategory ?? ''
                                                                }
                                                            />
                                                        </FormLabel>
                                                    </CardsTabCtrHead>
                                                </CardsTabsCtrHead>
                                                {getValues('quoteSelected') === 'createQuote' ? (
                                                    <TabsCreditCardType
                                                        quote={selectQuote ?? 0}
                                                        title="Tu cupo supera el monto para una póliza automática"
                                                        text="Deberás diligenciar un documento con la aseguradora"
                                                    />
                                                ) : (
                                                    <TabsCreditCardType
                                                        quote={
                                                            validateUser?.autoFee ??
                                                            eighthStep.autoFee ??
                                                            0
                                                        }
                                                        title="¡Estás cubierto!"
                                                        text="Podrás solicitar tu tarjeta en pocos minutos"
                                                    />
                                                )}
                                            </CardsTabsCtr>
                                        </FormCheck>
                                    </InputGroup>
                                </FormGroup>
                            )}
                        </CreditCardsCtr>

                        <ControlsButtons
                            disable={!isValid}
                            isLoadingSave={isLoadingSave}
                            isLoading={isLoadingContinue}
                            onSave={onSave}
                        />
                    </Form>
                </EighthStepContent>
            </EighthStepWrapper>
        </>
    )
}

export default EighthStep
