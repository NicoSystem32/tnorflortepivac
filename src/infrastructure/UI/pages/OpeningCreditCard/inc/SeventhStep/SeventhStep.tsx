import { ReactElement, useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormState } from 'react-hook-form'

// components
import { ControlsButtons, HeadStep, NavigationStep } from '..'
import { Form, Range } from '../../../../components'

// styles
import {
    SeventhStepWrapper,
    SeventhStepContent,
    Amount,
    Sub,
    WrapperTop,
    WrapperTopLeftImage,
    Image,
    WrapperTopRightSlide,
    TextCtr,
    CtrValues,
    RangeCtr,
    TooltipAmount,
} from './seventhStep-styles'
import { TitleStep } from '../../openingCreditCard-styles'

// hooks
import {
    seventhStepSchema,
    SeventhStepType,
    useSeventhStepForm,
} from '../../hooks/useSeventhStepForm'
import { useReducerStep } from '../../hooks'

// utils
import {
    formatDecimalValue,
    formatValue,
} from '../../../../components/GlobalFuntions/globalFunction'

// selectors
import {
    getCreditCardDataPerStepSelector,
    validateUserStateSelector,
} from '../../../../../selectors'

const storageUrl = process.env.REACT_APP_STORAGE_URL as string
const urlImage = `${storageUrl}/assets/iconsProductspng/`

const SeventhStep = (): ReactElement => {
    const [{ feedback }] = useReducerStep()
    const [ranges, setRanges] = useState({
        min: 0,
        max: 10,
    })
    const SLIDER_STEP = 100000

    const { validateUser } = useSelector(validateUserStateSelector)
    const { createCreditCard } = useSelector(getCreditCardDataPerStepSelector)
    const { seventhStep } = createCreditCard

    const setInitialValue = (): number => {
        if (seventhStep.cardQuote) {
            return seventhStep.cardQuote < ranges.min ? ranges.min - 1 : seventhStep.cardQuote
        }
        if (validateUser?.minLimitCredit) {
            return validateUser.minLimitCredit - 1
        }

        return ranges.min - 1
    }

    const defaultValuesRef = useRef({
        cardQuote: setInitialValue(),
    })

    const {
        handleSubmit,
        register,
        watch,
        control,
        getValues,
        setValue,
        initPercentage,
        preparedToSend,
        preparedToSave,
        isLoading,
        isLoadingContinue,
    } = useSeventhStepForm({
        validationSchema: yupResolver(seventhStepSchema),
        defaultValues: defaultValuesRef.current,
        rangeMax: ranges.max,
        rangeMin: ranges.min,
    })

    const { isValid } = useFormState({ control })
    watch()

    // listeners
    useEffect(() => {
        if (validateUser) {
            return onUpdateRanges(
                feedback.minRange ?? validateUser?.minLimitCredit,
                feedback.maxRange ?? validateUser?.maxLimitCredit
            )
        } else if (feedback.minRange && feedback.maxRange) {
            return onUpdateRanges(feedback.minRange, feedback.maxRange)
        }
    }, [validateUser])

    useEffect(() => {
        setValue('cardQuote', setInitialValue(), { shouldValidate: true })
    }, [ranges.min])

    // handlers
    const onSubmit = ({ cardQuote }: SeventhStepType): void => {
        preparedToSend({ cardQuote })
    }

    const onSave = (): void => {
        preparedToSave()
    }

    const onUpdateRanges = (min: number, max: number): void => {
        if (min && max) {
            setRanges((prevState) => ({
                ...prevState,
                min,
                max,
            }))
        }
    }

    const putUrlImageCreditCard = (): string =>
        `${urlImage}${
            validateUser?.creditCardCategory
                ? validateUser?.creditCardCategory
                : seventhStep.cardImage
        }.png`

    return (
        <>
            <NavigationStep saveAndExit onSave={onSave} />
            <SeventhStepWrapper>
                <SeventhStepContent>
                    <HeadStep
                        title="Solicitud"
                        paragraph="Felicidades, esta será tu proxima tarjeta, elige el cupo que deseas tener en tu tarjeta"
                    />

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <WrapperTop>
                            <WrapperTopLeftImage>
                                <Image
                                    src={putUrlImageCreditCard()}
                                    alt={validateUser?.creditCardCategory}
                                />
                            </WrapperTopLeftImage>
                            <WrapperTopRightSlide>
                                <TextCtr>
                                    <TitleStep>Tu cupo será de:</TitleStep>
                                    <Amount txtAlign="start">
                                        ${formatValue(getValues('cardQuote'), 1)}
                                        <Sub>{formatDecimalValue(getValues('cardQuote'), 1)}</Sub>
                                    </Amount>
                                </TextCtr>
                                <RangeCtr>
                                    <CtrValues>
                                        <Amount txtAlign="start">
                                            ${formatValue(ranges.min - 1, 1)}
                                            <Sub>{formatDecimalValue(ranges.min, 1)}</Sub>
                                        </Amount>
                                        <Amount txtAlign="start">
                                            ${formatValue(ranges.max, 1)}
                                            <Sub>{formatDecimalValue(ranges.max, 1)}</Sub>
                                        </Amount>
                                    </CtrValues>
                                    <Range
                                        $bgSize={initPercentage}
                                        step={SLIDER_STEP}
                                        value={getValues('cardQuote')}
                                        min={ranges.min - 1}
                                        max={ranges.max}
                                        {...register('cardQuote')}
                                    />
                                    <TooltipAmount left={initPercentage}>
                                        <Amount txtAlign="start">
                                            ${formatValue(getValues('cardQuote'), 1)}
                                            <Sub>
                                                {formatDecimalValue(getValues('cardQuote'), 1)}
                                            </Sub>
                                        </Amount>
                                    </TooltipAmount>
                                </RangeCtr>
                            </WrapperTopRightSlide>
                        </WrapperTop>
                        <ControlsButtons
                            disable={!isValid || isLoadingContinue}
                            isLoadingSave={isLoading}
                            onSave={onSave}
                            isLoading={isLoadingContinue}
                        />
                    </Form>
                </SeventhStepContent>
            </SeventhStepWrapper>
        </>
    )
}

export default SeventhStep
