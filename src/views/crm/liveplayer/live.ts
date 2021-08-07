
/**
*
* @export
* @interface LiveRoomEnableRequest
*/
export interface LiveRoomEnableRequest {

    /**
     * 品牌logo_url
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    brandLogoUrl?: string

    /**
     * 品牌视频url
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    brandVideoUrl?: string

    /**
     * 产品介绍
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    productIntroduc?: string

    /**
     * 直播间id(微信直播房间id)
     * @type {number | string}
     * @memberof LiveRoomEnableRequest
     */
    roomId?: number | string

    /**
     * 落地页名称(直播房间名称)
     * @type {string}
     * @memberof LiveRoomEnableRequest
     */
    roomName?: string

}

/**
*
* @export
* @interface LiveRoomResponse
*/
export interface LiveRoomResponse {

    /**
     * 主播名
     * @type {string}
     * @memberof LiveRoomResponse
     */
    anchorName?: string

    /**
     * 品牌logo_url
     * @type {string}
     * @memberof LiveRoomResponse
     */
    brandLogoUrl?: string

    /**
     * 品牌视频url
     * @type {string}
     * @memberof LiveRoomResponse
     */
    brandVideoUrl?: string

    /**
     * 是否关闭评论 【0：开启，1：关闭】（若关闭，观众端将隐藏评论入口，直播开始后不允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeComment?: number | string

    /**
     * 是否关闭货架 【0：开启，1：关闭】（若关闭，观众端将隐藏商品货架，直播开始后不允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeGoods?: number | string

    /**
     * 是否关闭客服 【0：开启，1：关闭】 默认关闭客服（直播开始后允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeKf?: number | string

    /**
     * 是否关闭点赞 【0：开启，1：关闭】（若关闭，观众端将隐藏点赞按钮，直播开始后不允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeLike?: number | string

    /**
     * 是否关闭回放 【0：开启，1：关闭】默认关闭回放（直播开始后允许开启）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    closeReplay?: number | string

    /**
     * 直播间背景图链接
     * @type {string}
     * @memberof LiveRoomResponse
     */
    coverImg?: string

    /**
     * 创建人
     * @type {string}
     * @memberof LiveRoomResponse
     */
    createBy?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof LiveRoomResponse
     */
    createTime?: string

    /**
     * 直播计划结束时间
     * @type {string}
     * @memberof LiveRoomResponse
     */
    endTime?: string

    /**
     * 是否放在首页 0 否 1是
     * @type {boolean}
     * @memberof LiveRoomResponse
     */
    homePage?: boolean

    /**
     * id
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    id?: number | string

    /**
     * 是否开启官方收录，1 开启，0 关闭
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    isFeedsPublic?: number | string

    /**
     * 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    liveStatus?: number | string

    /**
     * 直播类型，1 推流 0 手机直播
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    liveType?: number | string

    /**
     * 房间名称
     * @type {string}
     * @memberof LiveRoomResponse
     */
    name?: string

    /**
     * 产品介绍
     * @type {string}
     * @memberof LiveRoomResponse
     */
    productIntroduc?: string

    /**
     * 直播间商品列表
     * @type {Array<RespRoomGoods>}
     * @memberof LiveRoomResponse
     */
    roomGoodsList?: Array<RespRoomGoods>

    /**
     * 直播间id(微信直播房间id)
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    roomId?: number | string

    /**
     * 落地页名称(直播房间名称)
     * @type {string}
     * @memberof LiveRoomResponse
     */
    roomName?: string

    /**
     * 直播间分享图链接
     * @type {string}
     * @memberof LiveRoomResponse
     */
    shareImg?: string

    /**
     * 直播间开始时间，列表按照start_time降序排列
     * @type {string}
     * @memberof LiveRoomResponse
     */
    startTime?: string

    /**
     * 状态1.启用 2.禁用（落地页启用/禁用）
     * @type {number | string}
     * @memberof LiveRoomResponse
     */
    status?: number | string

    /**
     * 更新人
     * @type {string}
     * @memberof LiveRoomResponse
     */
    updateBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof LiveRoomResponse
     */
    updateTime?: string

}

/**
*
* @export
* @interface LiveRoomSaveRequest
*/
export interface LiveRoomSaveRequest {

    /**
     * 品牌logo_url
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    brandLogoUrl?: string

    /**
     * 品牌视频url
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    brandVideoUrl?: string

    /**
     * 产品介绍
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    productIntroduc?: string

    /**
     * 直播间id(微信直播房间id)
     * @type {number | string}
     * @memberof LiveRoomSaveRequest
     */
    roomId?: number | string

    /**
     * 落地页名称(直播房间名称)
     * @type {string}
     * @memberof LiveRoomSaveRequest
     */
    roomName?: string

}

/**
*
* @export
* @interface LocalTime
*/
export interface LocalTime {

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    hour?: number | string

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    minute?: number | string

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    nano?: number | string

    /**
     *
     * @type {number | string}
     * @memberof LocalTime
     */
    second?: number | string

}
/**
*
* @export
* @interface RespRoomGoods
*/
export interface RespRoomGoods {

    /**
     * 商品封面图链接
     * @type {string}
     * @memberof RespRoomGoods
     */
    coverImg?: string

    /**
     * 商品id
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    goodsId?: number | string

    /**
     * 商品名称
     * @type {string}
     * @memberof RespRoomGoods
     */
    name?: string

    /**
     * 商品价格（分）
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    price?: number | string

    /**
     * 商品价格，使用方式看price_type
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    price2?: number | string

    /**
     * 价格类型，1：一口价（只需要传入price，price2不传） 2：价格区间（price字段为左边界，price2字段为右边界，price和price2必传） 3：显示折扣价（price字段为原价，price2字段为现价， price和price2必传）
     * @type {number | string}
     * @memberof RespRoomGoods
     */
    priceType?: number | string

    /**
     * 第三方商品appid ,当前小程序商品则为空
3.获取直播间回放
     * @type {string}
     * @memberof RespRoomGoods
     */
    thirdPartyAppid?: string

    /**
     * 商品小程序路径
     * @type {string}
     * @memberof RespRoomGoods
     */
    url?: string

}