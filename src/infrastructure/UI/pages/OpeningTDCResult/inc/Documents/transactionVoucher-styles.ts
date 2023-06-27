import { StyleSheet, Font } from '@react-pdf/renderer'

import FontMontserratRegular from '../../../../assets/sources/Montserrat-Regular.ttf'
import FontHelveticaRegular from '../../../../assets/sources/Helvetica.ttf'
import FontMontserratMedium from '../../../../assets/sources/Montserrat-Medium.ttf'

Font.register({
    family: 'Montserrat-Regular',
    format: 'truetype',
    src: FontMontserratRegular,
    weight: '400',
})
Font.register({
    family: 'Helvetica-Regular',
    format: 'truetype',
    src: FontHelveticaRegular,
    weight: '800',
})
Font.register({
    family: 'Montserrat-Medium',
    format: 'truetype',
    src: FontMontserratMedium,
    weight: '500',
})

export const styles = StyleSheet.create({
    container: {
        margin: '10px',
    },
    detailPayment: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid gray',
        borderRadius: '10px',
        borderTopColor: '#707070',
        padding: '10px',
        marginBottom: '5px',
    },
    textTitle: {
        fontSize: '13px',
        color: '#F5A50B',
        marginTop: '5px',
        marginBottom: '5px',
        // marginLeft: '10px',
        fontFamily: 'Montserrat-Regular',
    },
    textSup: {
        fontSize: '9px',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
    },
    valueContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    paymentHead: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5px',
        marginBottom: '5px',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    paymentHeadImg: {
        width: '45px',
        padding: '5px',
    },
    paymentHeadContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '5px',
    },
    paymentHeadTitle: {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        marginRight: '15px',
        paddingRight: '20px',
        // marginTop: '5px',
        // marginBottom: '5px',
    },
    paymentHeadSubTitle: {
        fontSize: '12px',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
    },
    paymentHeadMessage: {
        fontSize: '10px',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        marginTop: '10px',
    },
    paymentBody: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        width: '100%',
    },
    paymentBodyItem: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '22%',
        marginRight: '10px',
    },
    paymentBodyTitle: {
        fontSize: '11px',
        color: '#707070',
        fontFamily: 'Montserrat-Regular',
        marginBottom: '2px',
    },
    paymentBodySubTitle: {
        fontSize: '13px',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        width: '24%',
    },
    detailProduct: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: '1px solid gray',
        borderRadius: '10px',
        borderTopColor: '#707070',
        marginTop: '5px',
        marginBottom: '5px',
        padding: '10px',
    },
    productHead: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '5px',
    },
    productHeadDescriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5px',
    },
    productHeadImg: {
        width: '47px',
        padding: '5px',
    },
    productHeadDescriptionTDC: {
        fontSize: '16px',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        marginLeft: '5px',
    },
    productHeadDescription: {
        fontSize: '16px',
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        marginLeft: '5px',
        width: '22%',
    },
    productBody: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: '20px',
        flexWrap: 'wrap',
    },
    productBodyItem: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '24.5%',
        marginBottom: '10px',
        marginRight: '10px',
    },
    line: {
        width: '100%',
        marginVertical: '15px',
        borderBottom: '1px solid #707070',
    },
    //cambiar
    itemResultState: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    itemResultStateImg: { marginTop: '13px', width: '5px', height: '5px' },
    textPayResultGreen: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#55B948',
        marginLeft: '5px',
        marginTop: '0px',
    },
    textPayResultYellow: {
        fontSize: '10px',
        fontFamily: 'Montserrat-Medium',
        color: '#F5A50B',
        marginLeft: '5px',
        marginTop: '10px',
    },
})
