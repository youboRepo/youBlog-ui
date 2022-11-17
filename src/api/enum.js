import request from "@/utils/request";

export function getNoticeTypeList() {
    return request({
        url: '/enums/notice/list',
        method: 'get'
    })
}

export function getTaskPublishTypeList() {
    return request({
        url: '/enums/task/list',
        method: 'get'
    })
}

export function getGoodpriceApprovalStateList() {
    return request({
        url: '/enums/goodprice/approval/list',
        method: 'get'
    })
}

export function getSupplierPriceApprovalStateList() {
    return request({
        url: '/enums/supplier/price/approval/list',
        method: 'get'
    })
}

export function getSupplierGradeList() {
    return request({
        url: '/enums/supplier/grade/list',
        method: 'get'
    })
}

export function getSupplierPaymentMethodList() {
    return request({
        url: '/enums/supplier/payment/method/list',
        method: 'get'
    })
}

export function getExceptionFeedbackTypeList() {
    return request({
        url: '/enums/exception/feedback/type/list',
        method: 'get'
    })
}

export function getExceptionFeedbackStateList() {
    return request({
        url: '/enums/exception/feedback/state/list',
        method: 'get'
    })
}

export function getExceptionFeedbackSourceList() {
    return request({
        url: '/enums/exception/feedback/source/list',
        method: 'get'
    })
}

export function getBuyerDisposeResultList() {
    return request({
        url: '/enums/buyer/dispose/result/list',
        method: 'get'
    })
}

export function getProductStateList() {
    return request({
        url: '/enums/product/state/list',
        method: 'get'
    })
}

export function getStatementAccountStateList() {
    return request({
        url: '/enums/statement/account/state/list',
        method: 'get'
    })
}

export function getPurchaseOrderStateList() {
    return request({
        url: '/enums/purchase/order/State/list',
        method: 'get'
    })
}

export function getSupplierPrivateBankList() {
    return request({
        url: '/enums/supplier/private/bank/list',
        method: 'get'
    })
}

export function getSupplierExpressCompanyList() {
    return request({
        url: '/enums/supplier/express/company/list',
        method: 'get'
    })
}

export function getSupplierNewestProductStateList() {
    return request({
        url: '/enums/supplier/newest/product/state/list',
        method: 'get'
    })
}

export function getPackagingMaterialTypeList() {
    return request({
        url: '/enums/packaging/material/type/list',
        method: 'get'
    })
}

export function getSupplierNewestProductFeatureTypeList() {
    return request({
        url: '/enums/supplier/newest/product/feature/type/list',
        method: 'get'
    })
}

export function getBatteryStateList() {
    return request({
        url: '/enums/battery/state/list',
        method: 'get'
    })
}

export function getProductMarkTypeList() {
    return request({
        url: '/enums/product/mark/type/list',
        method: 'get'
    })
}

export function getSupplierFreightList() {
    return request({
        url: '/enums/supplier/freight/list',
        method: 'get'
    })
}