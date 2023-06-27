export { default as PointsPNG } from '../assets/images/points.png'
export { default as PointsSVG } from '../assets/images/points.svg'
export { default as ElipsePNG } from '../assets/images/elipse.png'
export { default as ElipseDeskPNG } from '../assets/images/elipse-desk.png'
export { default as SemiCirclePNG } from '../assets/images/semi-circle.png'
export { default as SemiCircleSVG } from '../assets/images/semi-circle.svg'
export { default as ForgetPasswordSVG } from '../assets/images/forget-password.svg'
export { default as ForgetPasswordPNG } from '../assets/images/forget-password.png'

const storageUrl = process.env.REACT_APP_STORAGE_URL as string
const storage = `${storageUrl}/assets`

export const NetworksPNG = `${storage}/networks.png`
export const WomenPNG = `${storage}/women.png`
export const SuperSolidaria = `${storage}/super2x.png`
export const Cavipetrol = `${storage}/cavipetrol2x.png`
export const Logo = `${storage}/logo.png`
export const UserPhonePNG = `${storage}/user-phone.png`
export const IconPsePNG = `${storage}/Logo-PSE.png`
export const LoginPNG = `${storage}/login-form.png`
