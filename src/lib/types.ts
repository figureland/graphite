import type { InputParams } from '@tweakpane/core'

export type TPencilConfig = {
    maxSpeed: number
    minTheta: number
    maxTheta: number
    minAge: number
    maxAge: number
    minDrag: number
    maxDrag: number
    maxParticles: number
    scale: number
    smooth: number
    spray: number
    color: string
    opacity: number
}

export type TVec2 = [number, number]

export type TControlProp = InputParams & {
    param: keyof TPencilConfig
}
