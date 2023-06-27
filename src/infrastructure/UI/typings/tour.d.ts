import { StepType, TourProps } from '@reactour/tour'
declare module '@reactour/tour' {
    export type StepTypeExtended = StepType & {
        actionBeforeArrive?: (elem: Element | null) => void
    }

    export function useTour(): Omit<TourProps, 'steps' | 'isOpen'> & {
        steps: StepTypeExtended[]
        isOpen: boolean
    }
}
