
/**
*
* @export
* @interface ReqBossSkuUpdate
*/
export interface ReqBossSkuUpdate {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqBossSkuUpdate
     */
    id: number | string

    /**
     * 名称
     * @type {string}
     * @memberof ReqBossSkuUpdate
     */
    name: string

    /**
     * code
     * @type {string}
     * @memberof ReqBossSkuUpdate
     */
    code: string

    /**
     * 主SkuId
     * @type {number | string}
     * @memberof ReqBossSkuUpdate
     */
    mainSkuId: number | string

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof ReqBossSkuUpdate
     */
    minSalePrice?: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof ReqBossSkuUpdate
     */
    maxSalePrice?: number | string

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof ReqBossSkuUpdate
     */
    isOnShelf?: number | string

    /**
     * 修改人
     * @type {string}
     * @memberof ReqBossSkuUpdate
     */
    updateBy?: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof ReqBossSkuUpdate
     */
    updatePhone?: string

}

/**
*
* @export
* @interface BrandShopExtendUpdateRequest
*/
export interface BrandShopExtendUpdateRequest {

    /**
     * id
     * @type {number | string}
     * @memberof BrandShopExtendUpdateRequest
     */
    id: number | string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof BrandShopExtendUpdateRequest
     */
    brandId: number | string

    /**
     * 品牌logo
     * @type {string}
     * @memberof BrandShopExtendUpdateRequest
     */
    brandLogoUrl: string

    /**
     * 品牌banner
     * @type {string}
     * @memberof BrandShopExtendUpdateRequest
     */
    brandBannerUrl: string

    /**
     * 品牌描述
     * @type {string}
     * @memberof BrandShopExtendUpdateRequest
     */
    brandRemark: string

}

/**
*
* @export
* @interface ReqBossSpuUpdate
*/
export interface ReqBossSpuUpdate {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ReqBossSpuUpdate
     */
    id?: number | string

    /**
     * 主数据sku id
     * @type {number | string}
     * @memberof ReqBossSpuUpdate
     */
    mainSkuId?: number | string

    /**
     * 编码
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    code?: string

    /**
     * 名称
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    name?: string

    /**
     * 销售名称
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    showName?: string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof ReqBossSpuUpdate
     */
    brandId?: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    brandName?: string

    /**
     * 商品类目
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    categoryContent?: string

    /**
     * 图片集合
     * @type {Array<string>}
     * @memberof ReqBossSpuUpdate
     */
    imageUrls?: Array<string>

    /**
     * 售卖规则
     * @type {Array<ReqSpuProvince>}
     * @memberof ReqBossSpuUpdate
     */
    saleRules?: Array<ReqSpuProvince>

    /**
     * 型号
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    model?: string

    /**
     * 销售价是否可见 0：否 1：是
     * @type {number | string}
     * @memberof ReqBossSpuUpdate
     */
    priceVisible?: number | string

    /**
     * sku列表
     * @type {Array<ReqBossSkuUpdate>}
     * @memberof ReqBossSpuUpdate
     */
    skuList?: Array<ReqBossSkuUpdate>

    /**
     * 修改人
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    updateBy?: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof ReqBossSpuUpdate
     */
    updatePhone?: string

}

/**
* spu市销售列表
* @export
* @interface ReqSpuCity
*/
export interface ReqSpuCity {

    /**
     * 市id
     * @type {string}
     * @memberof ReqSpuCity
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof ReqSpuCity
     */
    cityName?: string

}

/**
* 售卖规则
* @export
* @interface ReqSpuProvince
*/
export interface ReqSpuProvince {

    /**
     * 省id
     * @type {string}
     * @memberof ReqSpuProvince
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof ReqSpuProvince
     */
    provinceName?: string

    /**
     * spu市销售列表
     * @type {Array<ReqSpuCity>}
     * @memberof ReqSpuProvince
     */
    cityList?: Array<ReqSpuCity>

}

/**
* 楼层关联的spu列表
* @export
* @interface ReqBossFloorSpu
*/
export interface ReqBossFloorSpu {

    /**
     * spu商品id
     * @type {number | string}
     * @memberof ReqBossFloorSpu
     */
    id: number | string

    /**
     * spu商品类目id
     * @type {number | string}
     * @memberof ReqBossFloorSpu
     */
    categoryId: number | string

    /**
     * 商品品类id
     * @type {number | string}
     * @memberof ReqBossFloorSpu
     */
    frontCategoryId: number | string

}

/**
*
* @export
* @interface ReqBossFloorUpdate
*/
export interface ReqBossFloorUpdate {

    /**
     * 楼层id
     * @type {number | string}
     * @memberof ReqBossFloorUpdate
     */
    id: number | string

    /**
     * 楼层名称
     * @type {string}
     * @memberof ReqBossFloorUpdate
     */
    floorName: string

    /**
     * 楼层关联的spu列表
     * @type {Array<ReqBossFloorSpu>}
     * @memberof ReqBossFloorUpdate
     */
    reqBossFloorSpuList?: Array<ReqBossFloorSpu>

}

/**
*
* @export
* @interface BossFrontCategoryUpdateReq
*/
export interface BossFrontCategoryUpdateReq {

    /**
     * 品类id
     * @type {number | string}
     * @memberof BossFrontCategoryUpdateReq
     */
    id: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof BossFrontCategoryUpdateReq
     */
    frontCategoryName: string

    /**
     * 关联类目id列表
     * @type {Array<number | string>}
     * @memberof BossFrontCategoryUpdateReq
     */
    categoryIdList: Array<number | string>

}

/**
*
* @export
* @interface ShopBannerUpdateRequest
*/
export interface ShopBannerUpdateRequest {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ShopBannerUpdateRequest
     */
    id: number | string

    /**
     * 名称
     * @type {string}
     * @memberof ShopBannerUpdateRequest
     */
    bannerName: string

    /**
     * banner图url
     * @type {string}
     * @memberof ShopBannerUpdateRequest
     */
    bannerPicUrl: string

    /**
     * 跳转链接
     * @type {string}
     * @memberof ShopBannerUpdateRequest
     */
    linkUrl?: string

    /**
     * bannber位置 1：商城首页
     * @type {number | string}
     * @memberof ShopBannerUpdateRequest
     */
    location: number | string

}

/**
*
* @export
* @interface ReqBatchSkuIds
*/
export interface ReqBatchSkuIds {

    /**
     *
     * @type {Array<number | string>}
     * @memberof ReqBatchSkuIds
     */
    skuIds: Array<number | string>

}

/**
*
* @export
* @interface ReqSkuShelfStatus
*/
export interface ReqSkuShelfStatus {

    /**
     * skuId列表
     * @type {Array<number | string>}
     * @memberof ReqSkuShelfStatus
     */
    skuIdList?: Array<number | string>

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof ReqSkuShelfStatus
     */
    isOnShelf?: number | string

}

/**
*
* @export
* @interface JoinFavoriteRequest
*/
export interface JoinFavoriteRequest {

    /**
     * userId
     * @type {number | string}
     * @memberof JoinFavoriteRequest
     */
    userId: number | string

    /**
     * 商品spuId
     * @type {number | string}
     * @memberof JoinFavoriteRequest
     */
    spuId: number | string

    /**
     * 创建人
     * @type {string}
     * @memberof JoinFavoriteRequest
     */
    createBy: string

}

/**
*
* @export
* @interface ReqSpuShelfStatus
*/
export interface ReqSpuShelfStatus {

    /**
     * spuId
     * @type {number | string}
     * @memberof ReqSpuShelfStatus
     */
    id?: number | string

    /**
     * 1:下架 2:上架
     * @type {number | string}
     * @memberof ReqSpuShelfStatus
     */
    isOnShelf?: number | string

}

/**
*
* @export
* @interface ReqBossFloorAdd
*/
export interface ReqBossFloorAdd {

    /**
     * 楼层名称
     * @type {string}
     * @memberof ReqBossFloorAdd
     */
    floorName: string

    /**
     * 楼层商品
     * @type {Array<ReqBossFloorSpu>}
     * @memberof ReqBossFloorAdd
     */
    reqBossFloorSpuList: Array<ReqBossFloorSpu>

}

/**
*
* @export
* @interface BossFrontCategoryRecommendAddRequest
*/
export interface BossFrontCategoryRecommendAddRequest {

    /**
     * 品类id
     * @type {number | string}
     * @memberof BossFrontCategoryRecommendAddRequest
     */
    frontCategoryId: number | string

    /**
     * 品类图标
     * @type {string}
     * @memberof BossFrontCategoryRecommendAddRequest
     */
    imageUrl: string

}

/**
*
* @export
* @interface BossFrontCategoryAddReq
*/
export interface BossFrontCategoryAddReq {

    /**
     * 品类名称
     * @type {string}
     * @memberof BossFrontCategoryAddReq
     */
    frontCategoryName: string

    /**
     * 关联类目id列表
     * @type {Array<number | string>}
     * @memberof BossFrontCategoryAddReq
     */
    categoryIdList: Array<number | string>

}

/**
*
* @export
* @interface ShopBannerAddRequest
*/
export interface ShopBannerAddRequest {

    /**
     * 名称
     * @type {string}
     * @memberof ShopBannerAddRequest
     */
    bannerName: string

    /**
     * banner图url
     * @type {string}
     * @memberof ShopBannerAddRequest
     */
    bannerPicUrl: string

    /**
     * 跳转链接
     * @type {string}
     * @memberof ShopBannerAddRequest
     */
    linkUrl?: string

    /**
     * bannber位置 1：商城首页
     * @type {number | string}
     * @memberof ShopBannerAddRequest
     */
    location: number | string

}

/**
*
* @export
* @interface ShopFloorBrandPromptResponse
*/
export interface ShopFloorBrandPromptResponse {

    /**
     * 品牌id
     * @type {number | string}
     * @memberof ShopFloorBrandPromptResponse
     */
    brandId?: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof ShopFloorBrandPromptResponse
     */
    brandName?: string

    /**
     * 品牌logo
     * @type {string}
     * @memberof ShopFloorBrandPromptResponse
     */
    brandLogoUrl?: string

    /**
     * 品牌banner
     * @type {string}
     * @memberof ShopFloorBrandPromptResponse
     */
    brandBannerUrl?: string

    /**
     * 品牌描述
     * @type {string}
     * @memberof ShopFloorBrandPromptResponse
     */
    brandRemark?: string

}

/**
*
* @export
* @interface BossSkuPageReq
*/
export interface BossSkuPageReq {

    /**
     * 名称
     * @type {string}
     * @memberof BossSkuPageReq
     */
    name?: string

    /**
     * 类目id
     * @type {Array<number | string>}
     * @memberof BossSkuPageReq
     */
    categoryIds?: Array<number | string>

    /**
     * 商品品牌
     * @type {string}
     * @memberof BossSkuPageReq
     */
    brandName?: string

    /**
     * 商品型号
     * @type {string}
     * @memberof BossSkuPageReq
     */
    model?: string

    /**
     * spu编码
     * @type {string}
     * @memberof BossSkuPageReq
     */
    spuCode?: string

    /**
     * sku编码
     * @type {string}
     * @memberof BossSkuPageReq
     */
    skuCode?: string

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof BossSkuPageReq
     */
    isOnShelf?: number | string

    /**
     * 是否待编辑 true :是 false:否
     * @type {boolean}
     * @memberof BossSkuPageReq
     */
    editStatus?: boolean

}

/**
*
* @export
* @interface IPageRespBossSku
*/
export interface IPageRespBossSku {

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossSku
     */
    searchCount: boolean

    /**
     *
     * @type {Array<RespBossSku>}
     * @memberof IPageRespBossSku
     */
    records: Array<RespBossSku>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSku
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossSku
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSku
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSku
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSku
     */
    size: number | string

}

/**
*
* @export
* @interface RespBossSku
*/
export interface RespBossSku {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespBossSku
     */
    id?: number | string

    /**
     * spuId
     * @type {number | string}
     * @memberof RespBossSku
     */
    spuId?: number | string

    /**
     * sku编码
     * @type {string}
     * @memberof RespBossSku
     */
    code?: string

    /**
     * spu编码
     * @type {string}
     * @memberof RespBossSku
     */
    spuCode?: string

    /**
     * 类目1->类目2->类目3
     * @type {string}
     * @memberof RespBossSku
     */
    categoryPath?: string

    /**
     * 名称
     * @type {string}
     * @memberof RespBossSku
     */
    name?: string

    /**
     * 品牌名称
     * @type {string}
     * @memberof RespBossSku
     */
    brandName?: string

    /**
     * 商品型号
     * @type {string}
     * @memberof RespBossSku
     */
    model?: string

    /**
     * 图片
     * @type {string}
     * @memberof RespBossSku
     */
    imageUrls?: string

    /**
     * 销售属性值
     * @type {string}
     * @memberof RespBossSku
     */
    specifications?: string

    /**
     * 该sku规格信息
     * @type {string}
     * @memberof RespBossSku
     */
    optionValues?: string

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof RespBossSku
     */
    minSalePrice?: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof RespBossSku
     */
    maxSalePrice?: number | string

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof RespBossSku
     */
    isOnShelf?: number | string

    /**
     * 推荐位置
     * @type {string}
     * @memberof RespBossSku
     */
    recommendLocation?: string

    /**
     * 是否有可售区域 true：有 false：无
     * @type {boolean}
     * @memberof RespBossSku
     */
    salesAreaStatus?: boolean

    /**
     * 是否可见 0：否 1：是
     * @type {number | string}
     * @memberof RespBossSku
     */
    priceVisible?: number | string

    /**
     * spu是否推荐
     * @type {boolean}
     * @memberof RespBossSku
     */
    recommend?: boolean

    /**
     * spu是否在楼层
     * @type {boolean}
     * @memberof RespBossSku
     */
    existFloor?: boolean

}

/**
*
* @export
* @interface IPageRespBossB2bSkuPage
*/
export interface IPageRespBossB2bSkuPage {

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossB2bSkuPage
     */
    searchCount: boolean

    /**
     *
     * @type {Array<RespBossB2bSkuPage>}
     * @memberof IPageRespBossB2bSkuPage
     */
    records: Array<RespBossB2bSkuPage>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossB2bSkuPage
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossB2bSkuPage
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossB2bSkuPage
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossB2bSkuPage
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossB2bSkuPage
     */
    size: number | string

}

/**
*
* @export
* @interface RespBossB2bSkuPage
*/
export interface RespBossB2bSkuPage {

    /**
     * sku id
     * @type {number | string}
     * @memberof RespBossB2bSkuPage
     */
    id?: number | string

    /**
     * spu id
     * @type {number | string}
     * @memberof RespBossB2bSkuPage
     */
    mainSpuId?: number | string

    /**
     * spu编码
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    spuCode?: string

    /**
     * sku编码
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    skuCode?: string

    /**
     * 商品名称
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    name?: string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof RespBossB2bSkuPage
     */
    brandId?: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    brandName?: string

    /**
     * 类目id
     * @type {number | string}
     * @memberof RespBossB2bSkuPage
     */
    categoryId?: number | string

    /**
     * 类目1->类目2->类目3
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    category?: string

    /**
     * 商品型号
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    model?: string

    /**
     * 规格, 拼接好的字符串
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    optionValues?: string

    /**
     * 是否生效
     * @type {boolean}
     * @memberof RespBossB2bSkuPage
     */
    enabled?: boolean

    /**
     * 审核状态 0：待审核 1审核通过 2审核不通过
     * @type {number | string}
     * @memberof RespBossB2bSkuPage
     */
    auditStatus?: number | string

    /**
     *
     * @type {string}
     * @memberof RespBossB2bSkuPage
     */
    createTime?: string

    /**
     * 是否拉取
     * @type {boolean}
     * @memberof RespBossB2bSkuPage
     */
    isPullAble?: boolean

    /**
     * 好橙工spuId
     * @type {number | string}
     * @memberof RespBossB2bSkuPage
     */
    spuId?: number | string

}

/**
*
* @export
* @interface FavoriteResponse
*/
export interface FavoriteResponse {

    /**
     * id
     * @type {number | string}
     * @memberof FavoriteResponse
     */
    id?: number | string

    /**
     * userId
     * @type {number | string}
     * @memberof FavoriteResponse
     */
    userId?: number | string

    /**
     * 商品spuId
     * @type {number | string}
     * @memberof FavoriteResponse
     */
    spuId?: number | string

    /**
     * 商品spuCode
     * @type {string}
     * @memberof FavoriteResponse
     */
    spuCode?: string

    /**
     * 商品spu名称
     * @type {string}
     * @memberof FavoriteResponse
     */
    spuName?: string

    /**
     * 商品图片
     * @type {Array<string>}
     * @memberof FavoriteResponse
     */
    imageUrl?: Array<string>

    /**
     * 商品最小销售价
     * @type {number | string}
     * @memberof FavoriteResponse
     */
    minSalePrice?: number | string

    /**
     * 商品最大销售价
     * @type {number | string}
     * @memberof FavoriteResponse
     */
    maxSalePrice?: number | string

    /**
     * 1:下架 2:上架
     * @type {number | string}
     * @memberof FavoriteResponse
     */
    isOnShelf?: number | string

    /**
     * 是否可见 0：否 1：是
     * @type {boolean}
     * @memberof FavoriteResponse
     */
    priceVisible?: boolean

    /**
     * 创建人
     * @type {string}
     * @memberof FavoriteResponse
     */
    createBy?: string

}

/**
*
* @export
* @interface IPageFavoriteResponse
*/
export interface IPageFavoriteResponse {

    /**
     *
     * @type {boolean}
     * @memberof IPageFavoriteResponse
     */
    searchCount: boolean

    /**
     *
     * @type {Array<FavoriteResponse>}
     * @memberof IPageFavoriteResponse
     */
    records: Array<FavoriteResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageFavoriteResponse
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageFavoriteResponse
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageFavoriteResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageFavoriteResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageFavoriteResponse
     */
    size: number | string

}

/**
*
* @export
* @interface MyStatistics
*/
export interface MyStatistics {

    /**
     * 用户收藏数量
     * @type {number | string}
     * @memberof MyStatistics
     */
    totalFavorite: number | string

    /**
     * 企业账单数量
     * @type {number | string}
     * @memberof MyStatistics
     */
    fundNumber: number | string

    /**
     * 企业员工数量
     * @type {number | string}
     * @memberof MyStatistics
     */
    userNumber: number | string

}

/**
*
* @export
* @interface AppletSpuPageResponse
*/
export interface AppletSpuPageResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof AppletSpuPageResponse
     */
    id?: number | string

    /**
     * 编码
     * @type {string}
     * @memberof AppletSpuPageResponse
     */
    code?: string

    /**
     * 名称
     * @type {string}
     * @memberof AppletSpuPageResponse
     */
    name?: string

    /**
     * 销售名称
     * @type {string}
     * @memberof AppletSpuPageResponse
     */
    showName?: string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof AppletSpuPageResponse
     */
    brandId?: number | string

    /**
     * 类目id
     * @type {number | string}
     * @memberof AppletSpuPageResponse
     */
    categoryId?: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof AppletSpuPageResponse
     */
    brandName?: string

    /**
     * 型号
     * @type {string}
     * @memberof AppletSpuPageResponse
     */
    model?: string

    /**
     * 商品图片链接集合
     * @type {Array<string>}
     * @memberof AppletSpuPageResponse
     */
    imageUrls?: Array<string>

    /**
     * 销售价是否可见 false：否 true：是
     * @type {boolean}
     * @memberof AppletSpuPageResponse
     */
    priceVisible?: boolean

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof AppletSpuPageResponse
     */
    minSalePrice?: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof AppletSpuPageResponse
     */
    maxSalePrice?: number | string

    /**
     * 1:下架 2:上架
     * @type {number | string}
     * @memberof AppletSpuPageResponse
     */
    isOnShelf?: number | string

    /**
     * 是否收藏
     * @type {boolean}
     * @memberof AppletSpuPageResponse
     */
    favorite?: boolean

    /**
     * 类目路径
     * @type {string}
     * @memberof AppletSpuPageResponse
     */
    categoryPath?: string

    /**
     * 是否推荐
     * @type {boolean}
     * @memberof AppletSpuPageResponse
     */
    recommend?: boolean

}

/**
*
* @export
* @interface CategoryTreeResponse
*/
export interface CategoryTreeResponse {

    /**
     * 类目id
     * @type {number | string}
     * @memberof CategoryTreeResponse
     */
    id?: number | string

    /**
     * 类目code
     * @type {string}
     * @memberof CategoryTreeResponse
     */
    code?: string

    /**
     * 类目名称
     * @type {string}
     * @memberof CategoryTreeResponse
     */
    name?: string

    /**
     *
     * @type {number | string}
     * @memberof CategoryTreeResponse
     */
    parentId?: number | string

    /**
     *
     * @type {string}
     * @memberof CategoryTreeResponse
     */
    path?: string

    /**
     *
     * @type {number | string}
     * @memberof CategoryTreeResponse
     */
    sort?: number | string

    /**
     * 类目层级
     * @type {number | string}
     * @memberof CategoryTreeResponse
     */
    level?: number | string

    /**
     *
     * @type {string}
     * @memberof CategoryTreeResponse
     */
    imgUrl?: string

    /**
     *
     * @type {string}
     * @memberof CategoryTreeResponse
     */
    operator?: string

    /**
     *
     * @type {string}
     * @memberof CategoryTreeResponse
     */
    createTime?: string

    /**
     *
     * @type {string}
     * @memberof CategoryTreeResponse
     */
    lastModifyTime?: string

    /**
     * 已关联品类
     * @type {boolean}
     * @memberof CategoryTreeResponse
     */
    relation?: boolean

    /**
     * sup数量
     * @type {number | string}
     * @memberof CategoryTreeResponse
     */
    spuNumber?: number | string

    /**
     *
     * @type {Array<CategoryTreeResponse>}
     * @memberof CategoryTreeResponse
     */
    subCategoryList?: Array<CategoryTreeResponse>

}

/**
*
* @export
* @interface BrandDetailResponse
*/
export interface BrandDetailResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BrandDetailResponse
     */
    id: number | string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof BrandDetailResponse
     */
    brandId: number | string

    /**
     * 品牌编码
     * @type {string}
     * @memberof BrandDetailResponse
     */
    brandCode: string

    /**
     * 品牌名称
     * @type {string}
     * @memberof BrandDetailResponse
     */
    brandName: string

    /**
     * 品牌logo
     * @type {string}
     * @memberof BrandDetailResponse
     */
    brandLogoUrl: string

    /**
     * 品牌banner
     * @type {string}
     * @memberof BrandDetailResponse
     */
    brandBannerUrl: string

    /**
     * 品牌描述
     * @type {string}
     * @memberof BrandDetailResponse
     */
    brandRemark: string

}

/**
*
* @export
* @interface BrandShopExtendListResponse
*/
export interface BrandShopExtendListResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BrandShopExtendListResponse
     */
    id?: number | string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof BrandShopExtendListResponse
     */
    brandId?: number | string

    /**
     * 品牌编码
     * @type {string}
     * @memberof BrandShopExtendListResponse
     */
    brandCode?: string

    /**
     * 品牌名称
     * @type {string}
     * @memberof BrandShopExtendListResponse
     */
    brandName?: string

    /**
     *
     * @type {string}
     * @memberof BrandShopExtendListResponse
     */
    initials?: string

    /**
     * 品牌logo
     * @type {string}
     * @memberof BrandShopExtendListResponse
     */
    brandLogoUrl?: string

    /**
     * 品牌banner
     * @type {string}
     * @memberof BrandShopExtendListResponse
     */
    brandBannerUrl?: string

    /**
     * 品牌描述
     * @type {string}
     * @memberof BrandShopExtendListResponse
     */
    brandRemark?: string

}

/**
*
* @export
* @interface BrandShopExtendPageRequest
*/
export interface BrandShopExtendPageRequest {

    /**
     * 品牌编码
     * @type {string}
     * @memberof BrandShopExtendPageRequest
     */
    brandCode?: string

    /**
     * 品牌名称
     * @type {string}
     * @memberof BrandShopExtendPageRequest
     */
    brandName?: string

}

/**
* 品牌类目信息
* @export
* @interface BrandCategoryResponse
*/
export interface BrandCategoryResponse {

    /**
     * 类目id
     * @type {number | string}
     * @memberof BrandCategoryResponse
     */
    categoryId?: number | string

    /**
     * 类目名称
     * @type {string}
     * @memberof BrandCategoryResponse
     */
    categoryName?: string

    /**
     * 类目下SPU商品数量
     * @type {number | string}
     * @memberof BrandCategoryResponse
     */
    categorySpuNumber?: number | string

}

/**
*
* @export
* @interface BrandShopExtendResponse
*/
export interface BrandShopExtendResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BrandShopExtendResponse
     */
    id?: number | string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof BrandShopExtendResponse
     */
    brandId?: number | string

    /**
     * 品牌编码
     * @type {string}
     * @memberof BrandShopExtendResponse
     */
    brandCode?: string

    /**
     * 品牌名称
     * @type {string}
     * @memberof BrandShopExtendResponse
     */
    brandName?: string

    /**
     * 品牌logo
     * @type {string}
     * @memberof BrandShopExtendResponse
     */
    brandLogoUrl?: string

    /**
     * 品牌banner
     * @type {string}
     * @memberof BrandShopExtendResponse
     */
    brandBannerUrl?: string

    /**
     * 品牌描述
     * @type {string}
     * @memberof BrandShopExtendResponse
     */
    brandRemark?: string

    /**
     * 品牌类目信息
     * @type {Array<BrandCategoryResponse>}
     * @memberof BrandShopExtendResponse
     */
    brandCategoryResponseList?: Array<BrandCategoryResponse>

}

/**
*
* @export
* @interface IPageBrandShopExtendResponse
*/
export interface IPageBrandShopExtendResponse {

    /**
     *
     * @type {boolean}
     * @memberof IPageBrandShopExtendResponse
     */
    searchCount: boolean

    /**
     *
     * @type {Array<BrandShopExtendResponse>}
     * @memberof IPageBrandShopExtendResponse
     */
    records: Array<BrandShopExtendResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageBrandShopExtendResponse
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageBrandShopExtendResponse
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageBrandShopExtendResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBrandShopExtendResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBrandShopExtendResponse
     */
    size: number | string

}

/**
*
* @export
* @interface BossSpuPageReq
*/
export interface BossSpuPageReq {

    /**
     * 名称
     * @type {string}
     * @memberof BossSpuPageReq
     */
    name?: string

    /**
     * 类目id
     * @type {number | string}
     * @memberof BossSpuPageReq
     */
    categoryId?: number | string

    /**
     * 类目列表
     * @type {Array<number | string>}
     * @memberof BossSpuPageReq
     */
    categoryIds?: Array<number | string>

    /**
     * 类目内容
     * @type {string}
     * @memberof BossSpuPageReq
     */
    categoryContent?: string

    /**
     * 商品品牌
     * @type {string}
     * @memberof BossSpuPageReq
     */
    brandName?: string

    /**
     * 商品型号
     * @type {string}
     * @memberof BossSpuPageReq
     */
    model?: string

    /**
     * spu编码
     * @type {string}
     * @memberof BossSpuPageReq
     */
    spuCode?: string

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof BossSpuPageReq
     */
    isOnShelf?: number | string

    /**
     * 是否待编辑 true :是 false:否
     * @type {boolean}
     * @memberof BossSpuPageReq
     */
    editStatus?: boolean

    /**
     * 是否推荐 true :是 false:否
     * @type {boolean}
     * @memberof BossSpuPageReq
     */
    recommend?: boolean

}

/**
*
* @export
* @interface IPageRespBossSpuPage
*/
export interface IPageRespBossSpuPage {

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossSpuPage
     */
    searchCount: boolean

    /**
     *
     * @type {Array<RespBossSpuPage>}
     * @memberof IPageRespBossSpuPage
     */
    records: Array<RespBossSpuPage>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSpuPage
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossSpuPage
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSpuPage
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSpuPage
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossSpuPage
     */
    size: number | string

}

/**
*
* @export
* @interface RespBossSpuPage
*/
export interface RespBossSpuPage {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    id?: number | string

    /**
     * 编码
     * @type {string}
     * @memberof RespBossSpuPage
     */
    code?: string

    /**
     * 名称
     * @type {string}
     * @memberof RespBossSpuPage
     */
    name?: string

    /**
     * 销售名称
     * @type {string}
     * @memberof RespBossSpuPage
     */
    showName?: string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    brandId?: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof RespBossSpuPage
     */
    brandName?: string

    /**
     * 品类id
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    frontCategoryId?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof RespBossSpuPage
     */
    frontCategoryName?: string

    /**
     * 类目id
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    categoryId?: number | string

    /**
     * 商品类目
     * @type {string}
     * @memberof RespBossSpuPage
     */
    categoryPath?: string

    /**
     * 型号
     * @type {string}
     * @memberof RespBossSpuPage
     */
    model?: string

    /**
     * 销售价是否可见 0：否 1：是
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    priceVisible?: number | string

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    minSalePrice?: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    maxSalePrice?: number | string

    /**
     * 1:下架 2:上架
     * @type {number | string}
     * @memberof RespBossSpuPage
     */
    isOnShelf?: number | string

    /**
     * true：是 false：否
     * @type {boolean}
     * @memberof RespBossSpuPage
     */
    recommend?: boolean

    /**
     * 创建时间
     * @type {string}
     * @memberof RespBossSpuPage
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespBossSpuPage
     */
    createBy?: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespBossSpuPage
     */
    createPhone?: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespBossSpuPage
     */
    updateTime?: string

    /**
     * 修改人
     * @type {string}
     * @memberof RespBossSpuPage
     */
    updateBy?: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof RespBossSpuPage
     */
    updatePhone?: string

}

/**
*
* @export
* @interface RespBossSpuDetail
*/
export interface RespBossSpuDetail {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespBossSpuDetail
     */
    id: number | string

    /**
     * 编码
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    code: string

    /**
     * 名称
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    name: string

    /**
     * 销售名称
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    showName: string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof RespBossSpuDetail
     */
    brandId: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    brandName: string

    /**
     * 商品类目
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    categoryPath: string

    /**
     * 商品图片链接集合
     * @type {Array<string>}
     * @memberof RespBossSpuDetail
     */
    imageUrls: Array<string>

    /**
     * 售卖规则，省id|市id|区id
     * @type {Array<RespSpuProvince>}
     * @memberof RespBossSpuDetail
     */
    saleRules: Array<RespSpuProvince>

    /**
     * 型号
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    model: string

    /**
     * 销售价是否可见 0：否 1：是
     * @type {number | string}
     * @memberof RespBossSpuDetail
     */
    priceVisible: number | string

    /**
     * 1:下架 2:上架
     * @type {number | string}
     * @memberof RespBossSpuDetail
     */
    isOnShelf: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    createTime: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    createBy: string

    /**
     * 创建人手机号
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    createPhone: string

    /**
     * 修改时间
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    updateTime: string

    /**
     * 修改人
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    updateBy: string

    /**
     * 修改人手机号
     * @type {string}
     * @memberof RespBossSpuDetail
     */
    updatePhone: string

    /**
     * sku列表
     * @type {Array<RespBossSku>}
     * @memberof RespBossSpuDetail
     */
    skuList: Array<RespBossSku>

}

/**
* spu市销售列表
* @export
* @interface RespSpuCity
*/
export interface RespSpuCity {

    /**
     * 市id
     * @type {string}
     * @memberof RespSpuCity
     */
    cityId?: string

    /**
     * 市名称
     * @type {string}
     * @memberof RespSpuCity
     */
    cityName?: string

}

/**
* 售卖规则，省id|市id|区id
* @export
* @interface RespSpuProvince
*/
export interface RespSpuProvince {

    /**
     * 省id
     * @type {string}
     * @memberof RespSpuProvince
     */
    provinceId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof RespSpuProvince
     */
    provinceName?: string

    /**
     * spu市销售列表
     * @type {Array<RespSpuCity>}
     * @memberof RespSpuProvince
     */
    cityList?: Array<RespSpuCity>

}

/**
* 楼层关联的spu列表
* @export
* @interface RespBossFloorSpu
*/
export interface RespBossFloorSpu {

    /**
     * 排序
     * @type {number | string}
     * @memberof RespBossFloorSpu
     */
    sort?: number | string

    /**
     * spuId
     * @type {number | string}
     * @memberof RespBossFloorSpu
     */
    id?: number | string

    /**
     * 编码
     * @type {string}
     * @memberof RespBossFloorSpu
     */
    code?: string

    /**
     * 名称
     * @type {string}
     * @memberof RespBossFloorSpu
     */
    name?: string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof RespBossFloorSpu
     */
    brandId?: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof RespBossFloorSpu
     */
    brandName?: string

    /**
     * 商品类目id
     * @type {number | string}
     * @memberof RespBossFloorSpu
     */
    categoryId?: number | string

    /**
     * 商品类目
     * @type {string}
     * @memberof RespBossFloorSpu
     */
    categoryPath?: string

    /**
     * 关联的品类id
     * @type {number | string}
     * @memberof RespBossFloorSpu
     */
    frontCategoryId?: number | string

    /**
     * 关联的品类名称
     * @type {string}
     * @memberof RespBossFloorSpu
     */
    frontCategoryName?: string

}

/**
*
* @export
* @interface RespBossShopFloorDetail
*/
export interface RespBossShopFloorDetail {

    /**
     * 楼层id
     * @type {number | string}
     * @memberof RespBossShopFloorDetail
     */
    id: number | string

    /**
     * 楼层名称
     * @type {string}
     * @memberof RespBossShopFloorDetail
     */
    floorName: string

    /**
     * 排序
     * @type {number | string}
     * @memberof RespBossShopFloorDetail
     */
    sort: number | string

    /**
     * 状态 1：草稿 2：启用 3：停用
     * @type {number | string}
     * @memberof RespBossShopFloorDetail
     */
    status: number | string

    /**
     * 楼层关联的spu列表
     * @type {Array<RespBossFloorSpu>}
     * @memberof RespBossShopFloorDetail
     */
    respBossFloorSpuList: Array<RespBossFloorSpu>

}

/**
*
* @export
* @interface IPageRespBossShopFloorPage
*/
export interface IPageRespBossShopFloorPage {

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossShopFloorPage
     */
    searchCount: boolean

    /**
     *
     * @type {Array<RespBossShopFloorPage>}
     * @memberof IPageRespBossShopFloorPage
     */
    records: Array<RespBossShopFloorPage>

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossShopFloorPage
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageRespBossShopFloorPage
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossShopFloorPage
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossShopFloorPage
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageRespBossShopFloorPage
     */
    size: number | string

}

/**
*
* @export
* @interface RespBossShopFloorPage
*/
export interface RespBossShopFloorPage {

    /**
     * 主键id
     * @type {number | string}
     * @memberof RespBossShopFloorPage
     */
    id?: number | string

    /**
     * 楼层名称
     * @type {string}
     * @memberof RespBossShopFloorPage
     */
    floorName?: string

    /**
     * 排序
     * @type {number | string}
     * @memberof RespBossShopFloorPage
     */
    sort?: number | string

    /**
     * 状态 1：草稿 2：启用 3：停用
     * @type {number | string}
     * @memberof RespBossShopFloorPage
     */
    status?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof RespBossShopFloorPage
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof RespBossShopFloorPage
     */
    createBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof RespBossShopFloorPage
     */
    updateTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof RespBossShopFloorPage
     */
    updateBy?: string

    /**
     * 品类数量集合
     * @type {Array<RespFrontCategorySpuNum>}
     * @memberof RespBossShopFloorPage
     */
    categorySpuNumList?: Array<RespFrontCategorySpuNum>

}

/**
* 品类数量集合
* @export
* @interface RespFrontCategorySpuNum
*/
export interface RespFrontCategorySpuNum {

    /**
     * 前台品类id
     * @type {number | string}
     * @memberof RespFrontCategorySpuNum
     */
    frontCategoryId?: number | string

    /**
     * 前台品类名称
     * @type {string}
     * @memberof RespFrontCategorySpuNum
     */
    frontCategoryName?: string

    /**
     * 前台品类商品数量
     * @type {number | string}
     * @memberof RespFrontCategorySpuNum
     */
    spuNumber?: number | string

}

/**
*
* @export
* @interface FloorAndBannerEnableNumResponse
*/
export interface FloorAndBannerEnableNumResponse {

    /**
     * 楼层启用数量
     * @type {number | string}
     * @memberof FloorAndBannerEnableNumResponse
     */
    floorNum: number | string

    /**
     * banner启用数量
     * @type {number | string}
     * @memberof FloorAndBannerEnableNumResponse
     */
    bannerNum: number | string

}

/**
*
* @export
* @interface BossFrontCategoryRecommendResponse
*/
export interface BossFrontCategoryRecommendResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BossFrontCategoryRecommendResponse
     */
    id?: number | string

    /**
     * 品类id
     * @type {number | string}
     * @memberof BossFrontCategoryRecommendResponse
     */
    frontCategoryId?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof BossFrontCategoryRecommendResponse
     */
    frontCategoryName?: string

    /**
     * 排序
     * @type {number | string}
     * @memberof BossFrontCategoryRecommendResponse
     */
    sort?: number | string

    /**
     * 品类图标
     * @type {string}
     * @memberof BossFrontCategoryRecommendResponse
     */
    imageUrl?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof BossFrontCategoryRecommendResponse
     */
    updateTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof BossFrontCategoryRecommendResponse
     */
    updateBy?: string

}

/**
*
* @export
* @interface IPageBossFrontCategoryRecommendResponse
*/
export interface IPageBossFrontCategoryRecommendResponse {

    /**
     *
     * @type {boolean}
     * @memberof IPageBossFrontCategoryRecommendResponse
     */
    searchCount: boolean

    /**
     *
     * @type {Array<BossFrontCategoryRecommendResponse>}
     * @memberof IPageBossFrontCategoryRecommendResponse
     */
    records: Array<BossFrontCategoryRecommendResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryRecommendResponse
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageBossFrontCategoryRecommendResponse
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryRecommendResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryRecommendResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryRecommendResponse
     */
    size: number | string

}

/**
* 类目信息
* @export
* @interface BossCategorySpuDetailResponse
*/
export interface BossCategorySpuDetailResponse {

    /**
     * 类目id
     * @type {number | string}
     * @memberof BossCategorySpuDetailResponse
     */
    categoryId?: number | string

    /**
     * 类目编码
     * @type {string}
     * @memberof BossCategorySpuDetailResponse
     */
    code?: string

    /**
     * 类目信息
     * @type {string}
     * @memberof BossCategorySpuDetailResponse
     */
    categoryPath?: string

    /**
     * 类目上架商品数量
     * @type {number | string}
     * @memberof BossCategorySpuDetailResponse
     */
    onShelfSpuNum?: number | string

}

/**
*
* @export
* @interface BossFrontCategoryDetailResp
*/
export interface BossFrontCategoryDetailResp {

    /**
     * 品类id
     * @type {number | string}
     * @memberof BossFrontCategoryDetailResp
     */
    id: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof BossFrontCategoryDetailResp
     */
    frontCategoryName: string

    /**
     * 排序
     * @type {number | string}
     * @memberof BossFrontCategoryDetailResp
     */
    sort: number | string

    /**
     * 类目信息
     * @type {Array<BossCategorySpuDetailResponse>}
     * @memberof BossFrontCategoryDetailResp
     */
    bossCategorySpuDetailResponseList: Array<BossCategorySpuDetailResponse>

}

/**
*
* @export
* @interface BossFrontCategoryFloorSpuResponse
*/
export interface BossFrontCategoryFloorSpuResponse {

    /**
     * spuId
     * @type {number | string}
     * @memberof BossFrontCategoryFloorSpuResponse
     */
    spuId?: number | string

    /**
     * spu商品名称
     * @type {string}
     * @memberof BossFrontCategoryFloorSpuResponse
     */
    spuName?: string

    /**
     * 类目路径
     * @type {string}
     * @memberof BossFrontCategoryFloorSpuResponse
     */
    categoryPath?: string

    /**
     * 楼层id
     * @type {number | string}
     * @memberof BossFrontCategoryFloorSpuResponse
     */
    floorId?: number | string

    /**
     * 楼层名称
     * @type {string}
     * @memberof BossFrontCategoryFloorSpuResponse
     */
    floorName?: string

}

/**
*
* @export
* @interface BossFrontCategoryPageReq
*/
export interface BossFrontCategoryPageReq {

    /**
     * 品类名称
     * @type {string}
     * @memberof BossFrontCategoryPageReq
     */
    frontCategoryName?: string

    /**
     * 类目名称
     * @type {string}
     * @memberof BossFrontCategoryPageReq
     */
    categoryName?: string

}

/**
*
* @export
* @interface BossFrontCategoryPageResponse
*/
export interface BossFrontCategoryPageResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BossFrontCategoryPageResponse
     */
    id?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof BossFrontCategoryPageResponse
     */
    frontCategoryName?: string

    /**
     * 排序
     * @type {number | string}
     * @memberof BossFrontCategoryPageResponse
     */
    sort?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof BossFrontCategoryPageResponse
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof BossFrontCategoryPageResponse
     */
    createBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof BossFrontCategoryPageResponse
     */
    updateTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof BossFrontCategoryPageResponse
     */
    updateBy?: string

    /**
     * 类目关联spu的名称数量
     * @type {string}
     * @memberof BossFrontCategoryPageResponse
     */
    categoryNameAndSpuNum?: string

    /**
     * 品类上架商品数量
     * @type {number | string}
     * @memberof BossFrontCategoryPageResponse
     */
    onShelfSpuNum?: number | string

}

/**
*
* @export
* @interface IPageBossFrontCategoryPageResponse
*/
export interface IPageBossFrontCategoryPageResponse {

    /**
     *
     * @type {boolean}
     * @memberof IPageBossFrontCategoryPageResponse
     */
    searchCount: boolean

    /**
     *
     * @type {Array<BossFrontCategoryPageResponse>}
     * @memberof IPageBossFrontCategoryPageResponse
     */
    records: Array<BossFrontCategoryPageResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryPageResponse
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageBossFrontCategoryPageResponse
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryPageResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryPageResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageBossFrontCategoryPageResponse
     */
    size: number | string

}

/**
*
* @export
* @interface BossFrontCategoryResponse
*/
export interface BossFrontCategoryResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof BossFrontCategoryResponse
     */
    id?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof BossFrontCategoryResponse
     */
    frontCategoryName?: string

    /**
     * 是否推荐
     * @type {boolean}
     * @memberof BossFrontCategoryResponse
     */
    recommend?: boolean

    /**
     * 排序
     * @type {number | string}
     * @memberof BossFrontCategoryResponse
     */
    sort?: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof BossFrontCategoryResponse
     */
    createTime?: string

    /**
     * 创建人
     * @type {string}
     * @memberof BossFrontCategoryResponse
     */
    createBy?: string

    /**
     * 更新时间
     * @type {string}
     * @memberof BossFrontCategoryResponse
     */
    updateTime?: string

    /**
     * 更新人
     * @type {string}
     * @memberof BossFrontCategoryResponse
     */
    updateBy?: string

}

/**
*
* @export
* @interface ShopBannerResponse
*/
export interface ShopBannerResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ShopBannerResponse
     */
    id: number | string

    /**
     * 名称
     * @type {string}
     * @memberof ShopBannerResponse
     */
    bannerName: string

    /**
     * banner图url
     * @type {string}
     * @memberof ShopBannerResponse
     */
    bannerPicUrl: string

    /**
     * 跳转链接
     * @type {string}
     * @memberof ShopBannerResponse
     */
    linkUrl: string

    /**
     * bannber位置 1：商城首页
     * @type {number | string}
     * @memberof ShopBannerResponse
     */
    location: number | string

    /**
     * banner状态 1：启用 2：停用
     * @type {number | string}
     * @memberof ShopBannerResponse
     */
    status: number | string

    /**
     * 排序
     * @type {number | string}
     * @memberof ShopBannerResponse
     */
    sort: number | string

    /**
     * 创建时间
     * @type {string}
     * @memberof ShopBannerResponse
     */
    createTime: string

    /**
     * 创建人
     * @type {string}
     * @memberof ShopBannerResponse
     */
    createBy: string

}

/**
*
* @export
* @interface IPageShopBannerResponse
*/
export interface IPageShopBannerResponse {

    /**
     *
     * @type {boolean}
     * @memberof IPageShopBannerResponse
     */
    searchCount: boolean

    /**
     *
     * @type {Array<ShopBannerResponse>}
     * @memberof IPageShopBannerResponse
     */
    records: Array<ShopBannerResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageShopBannerResponse
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageShopBannerResponse
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageShopBannerResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageShopBannerResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageShopBannerResponse
     */
    size: number | string

}

/**
* 商品sku信息
* @export
* @interface AppletSkuResponse
*/
export interface AppletSkuResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof AppletSkuResponse
     */
    id?: number | string

    /**
     * spuId
     * @type {number | string}
     * @memberof AppletSkuResponse
     */
    spuId?: number | string

    /**
     * 编码
     * @type {number | string}
     * @memberof AppletSkuResponse
     */
    code?: number | string

    /**
     * 名称
     * @type {string}
     * @memberof AppletSkuResponse
     */
    name?: string

    /**
     * 图片
     * @type {string}
     * @memberof AppletSkuResponse
     */
    imageUrls?: string

    /**
     * 销售属性值
     * @type {string}
     * @memberof AppletSkuResponse
     */
    specifications?: string

    /**
     * 该sku规格信息
     * @type {string}
     * @memberof AppletSkuResponse
     */
    optionValues?: string

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof AppletSkuResponse
     */
    minSalePrice?: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof AppletSkuResponse
     */
    maxSalePrice?: number | string

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof AppletSkuResponse
     */
    isOnShelf?: number | string

}

/**
*
* @export
* @interface AppletSpuDetailResponse
*/
export interface AppletSpuDetailResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof AppletSpuDetailResponse
     */
    id: number | string

    /**
     * 编码
     * @type {string}
     * @memberof AppletSpuDetailResponse
     */
    code: string

    /**
     * 名称
     * @type {string}
     * @memberof AppletSpuDetailResponse
     */
    name: string

    /**
     * 销售名称
     * @type {string}
     * @memberof AppletSpuDetailResponse
     */
    showName: string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof AppletSpuDetailResponse
     */
    brandId: number | string

    /**
     * 品牌名称
     * @type {string}
     * @memberof AppletSpuDetailResponse
     */
    brandName: string

    /**
     * 商品类目
     * @type {string}
     * @memberof AppletSpuDetailResponse
     */
    categoryContent: string

    /**
     * 型号
     * @type {string}
     * @memberof AppletSpuDetailResponse
     */
    model: string

    /**
     * 商品图片链接集合
     * @type {Array<string>}
     * @memberof AppletSpuDetailResponse
     */
    imageUrls: Array<string>

    /**
     * 销售价是否可见 0：否 1：是
     * @type {boolean}
     * @memberof AppletSpuDetailResponse
     */
    priceVisible: boolean

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof AppletSpuDetailResponse
     */
    minSalePrice: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof AppletSpuDetailResponse
     */
    maxSalePrice: number | string

    /**
     * 1:下架 2:上架
     * @type {number | string}
     * @memberof AppletSpuDetailResponse
     */
    isOnShelf: number | string

    /**
     * 售卖区域
     * @type {Array<AppletSpuSalesAreaResponse>}
     * @memberof AppletSpuDetailResponse
     */
    appletSpuSalesAreaResponse: Array<AppletSpuSalesAreaResponse>

    /**
     * 商品sku信息
     * @type {Array<AppletSkuResponse>}
     * @memberof AppletSpuDetailResponse
     */
    appletSkuResponseList: Array<AppletSkuResponse>

}

/**
* 售卖区域
* @export
* @interface AppletSpuSalesAreaResponse
*/
export interface AppletSpuSalesAreaResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof AppletSpuSalesAreaResponse
     */
    id?: number | string

    /**
     * spu_id
     * @type {number | string}
     * @memberof AppletSpuSalesAreaResponse
     */
    spuId?: number | string

    /**
     * 省id
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    provinceId?: string

    /**
     * 市id
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    cityId?: string

    /**
     * 区id
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    areaId?: string

    /**
     * 省名称
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    provinceName?: string

    /**
     * 市名称
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    cityName?: string

    /**
     * 区名称
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    areaName?: string

    /**
     * 售卖规则，省id|市id|区id
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    saleRules?: string

    /**
     * 创建时间
     * @type {string}
     * @memberof AppletSpuSalesAreaResponse
     */
    createTime?: string

}

/**
*
* @export
* @interface AppletSpuPageRequest
*/
export interface AppletSpuPageRequest {

    /**
     * 搜索名称
     * @type {string}
     * @memberof AppletSpuPageRequest
     */
    searchName?: string

    /**
     * 销售名称
     * @type {string}
     * @memberof AppletSpuPageRequest
     */
    showName?: string

    /**
     * 品类id
     * @type {number | string}
     * @memberof AppletSpuPageRequest
     */
    frontCategoryId?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof AppletSpuPageRequest
     */
    frontCategoryName?: string

    /**
     * 类目id
     * @type {number | string}
     * @memberof AppletSpuPageRequest
     */
    categoryId?: number | string

    /**
     * 用户id
     * @type {number | string}
     * @memberof AppletSpuPageRequest
     */
    userId?: number | string

    /**
     * true：是 false：否
     * @type {boolean}
     * @memberof AppletSpuPageRequest
     */
    recommend?: boolean

    /**
     * 三级类目id列表
     * @type {Array<number | string>}
     * @memberof AppletSpuPageRequest
     */
    categoryIds?: Array<number | string>

}

/**
*
* @export
* @interface IPageAppletSpuPageResponse
*/
export interface IPageAppletSpuPageResponse {

    /**
     *
     * @type {boolean}
     * @memberof IPageAppletSpuPageResponse
     */
    searchCount: boolean

    /**
     *
     * @type {Array<AppletSpuPageResponse>}
     * @memberof IPageAppletSpuPageResponse
     */
    records: Array<AppletSpuPageResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletSpuPageResponse
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageAppletSpuPageResponse
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletSpuPageResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletSpuPageResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageAppletSpuPageResponse
     */
    size: number | string

}

/**
*
* @export
* @interface MainSpuOptionTypeResponse
*/
export interface MainSpuOptionTypeResponse {

    /**
     * 规格id
     * @type {number | string}
     * @memberof MainSpuOptionTypeResponse
     */
    id?: number | string

    /**
     * 规格名称
     * @type {string}
     * @memberof MainSpuOptionTypeResponse
     */
    name?: string

    /**
     * 规格值集合
     * @type {Array<MainSpuOptionValueResponse>}
     * @memberof MainSpuOptionTypeResponse
     */
    optionValues?: Array<MainSpuOptionValueResponse>

}

/**
* 规格值集合
* @export
* @interface MainSpuOptionValueResponse
*/
export interface MainSpuOptionValueResponse {

    /**
     * 规格值id
     * @type {number | string}
     * @memberof MainSpuOptionValueResponse
     */
    id?: number | string

    /**
     * 规格值名称
     * @type {string}
     * @memberof MainSpuOptionValueResponse
     */
    name?: string

    /**
     * 规格id
     * @type {number | string}
     * @memberof MainSpuOptionValueResponse
     */
    optionTypeId?: number | string

    /**
     * 规格名称
     * @type {string}
     * @memberof MainSpuOptionValueResponse
     */
    optionTypeName?: string

}

/**
*
* @export
* @interface ShopFloorSalesAreaRequest
*/
export interface ShopFloorSalesAreaRequest {

    /**
     * 省份名称
     * @type {string}
     * @memberof ShopFloorSalesAreaRequest
     */
    provinceName: string

    /**
     * 城市名称
     * @type {string}
     * @memberof ShopFloorSalesAreaRequest
     */
    cityName: string

}

/**
* 楼层主推商品
* @export
* @interface IPageShopFloorSpuResponse
*/
export interface IPageShopFloorSpuResponse {

    /**
     *
     * @type {boolean}
     * @memberof IPageShopFloorSpuResponse
     */
    searchCount: boolean

    /**
     *
     * @type {Array<ShopFloorSpuResponse>}
     * @memberof IPageShopFloorSpuResponse
     */
    records: Array<ShopFloorSpuResponse>

    /**
     *
     * @type {number | string}
     * @memberof IPageShopFloorSpuResponse
     */
    total: number | string

    /**
     *
     * @type {boolean}
     * @memberof IPageShopFloorSpuResponse
     */
    hitCount: boolean

    /**
     *
     * @type {number | string}
     * @memberof IPageShopFloorSpuResponse
     */
    pages: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageShopFloorSpuResponse
     */
    current: number | string

    /**
     *
     * @type {number | string}
     * @memberof IPageShopFloorSpuResponse
     */
    size: number | string

}

/**
* 品牌信息
* @export
* @interface ShopFloorBrandResponse
*/
export interface ShopFloorBrandResponse {

    /**
     * 品牌id
     * @type {number | string}
     * @memberof ShopFloorBrandResponse
     */
    brandId?: number | string

    /**
     * 品牌编码
     * @type {string}
     * @memberof ShopFloorBrandResponse
     */
    brandCode?: string

    /**
     * 品牌名称
     * @type {string}
     * @memberof ShopFloorBrandResponse
     */
    brandName?: string

    /**
     * 品牌logo
     * @type {string}
     * @memberof ShopFloorBrandResponse
     */
    brandLogoUrl?: string

}

/**
* 楼层品类
* @export
* @interface ShopFloorFrontCategoryResponse
*/
export interface ShopFloorFrontCategoryResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ShopFloorFrontCategoryResponse
     */
    id?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof ShopFloorFrontCategoryResponse
     */
    frontCategoryName?: string

    /**
     * 排序
     * @type {number | string}
     * @memberof ShopFloorFrontCategoryResponse
     */
    sort?: number | string

    /**
     * 品牌信息
     * @type {Array<ShopFloorBrandResponse>}
     * @memberof ShopFloorFrontCategoryResponse
     */
    shopFloorBrandResponseList?: Array<ShopFloorBrandResponse>

}

/**
*
* @export
* @interface ShopFloorResponse
*/
export interface ShopFloorResponse {

    /**
     * 楼层id
     * @type {number | string}
     * @memberof ShopFloorResponse
     */
    id?: number | string

    /**
     * 楼层名称
     * @type {string}
     * @memberof ShopFloorResponse
     */
    floorName?: string

    /**
     * 排序
     * @type {number | string}
     * @memberof ShopFloorResponse
     */
    sort?: number | string

    /**
     * 楼层品类
     * @type {Array<ShopFloorFrontCategoryResponse>}
     * @memberof ShopFloorResponse
     */
    shopFloorFrontCategoryResponses?: Array<ShopFloorFrontCategoryResponse>

    /**
     *
     * @type {IPageShopFloorSpuResponse}
     * @memberof ShopFloorResponse
     */
    shopFloorSpuResponsePage?: IPageShopFloorSpuResponse

}

/**
*
* @export
* @interface ShopFloorSpuResponse
*/
export interface ShopFloorSpuResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    id?: number | string

    /**
     * 楼层id
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    floorId?: number | string

    /**
     * 排序
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    sort?: number | string

    /**
     * spuId
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    spuId?: number | string

    /**
     * spu编码
     * @type {string}
     * @memberof ShopFloorSpuResponse
     */
    spuCode?: string

    /**
     * spu名称
     * @type {string}
     * @memberof ShopFloorSpuResponse
     */
    spuName?: string

    /**
     * 销售名称
     * @type {string}
     * @memberof ShopFloorSpuResponse
     */
    showName?: string

    /**
     * 图片
     * @type {Array<string>}
     * @memberof ShopFloorSpuResponse
     */
    imageUrls?: Array<string>

    /**
     * 销售属性值
     * @type {string}
     * @memberof ShopFloorSpuResponse
     */
    specifications?: string

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    minSalePrice?: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    maxSalePrice?: number | string

    /**
     * 是否可见
     * @type {boolean}
     * @memberof ShopFloorSpuResponse
     */
    priceVisible?: boolean

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    isOnShelf?: number | string

    /**
     * 类目id
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    categoryId?: number | string

    /**
     * 品类id
     * @type {number | string}
     * @memberof ShopFloorSpuResponse
     */
    frontCategoryId?: number | string

    /**
     *
     * @type {boolean}
     * @memberof ShopFloorSpuResponse
     */
    favorites?: boolean

}

/**
*
* @export
* @interface ShopFloorSpuRequest
*/
export interface ShopFloorSpuRequest {

    /**
     * 楼层id
     * @type {number | string}
     * @memberof ShopFloorSpuRequest
     */
    floorId: number | string

    /**
     * 品类id
     * @type {number | string}
     * @memberof ShopFloorSpuRequest
     */
    frontCategoryId: number | string

    /**
     * 用户id
     * @type {number | string}
     * @memberof ShopFloorSpuRequest
     */
    userId: number | string

    /**
     * 品牌id
     * @type {number | string}
     * @memberof ShopFloorSpuRequest
     */
    brandId?: number | string

    /**
     * 省份名称
     * @type {string}
     * @memberof ShopFloorSpuRequest
     */
    provinceName: string

    /**
     * 城市名称
     * @type {string}
     * @memberof ShopFloorSpuRequest
     */
    cityName: string

}

/**
*
* @export
* @interface AppletFrontCategoryRecommendResponse
*/
export interface AppletFrontCategoryRecommendResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof AppletFrontCategoryRecommendResponse
     */
    id?: number | string

    /**
     * 品类id
     * @type {number | string}
     * @memberof AppletFrontCategoryRecommendResponse
     */
    frontCategoryId?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof AppletFrontCategoryRecommendResponse
     */
    frontCategoryName?: string

    /**
     * 排序
     * @type {number | string}
     * @memberof AppletFrontCategoryRecommendResponse
     */
    sort?: number | string

    /**
     * 品类图标
     * @type {string}
     * @memberof AppletFrontCategoryRecommendResponse
     */
    imageUrl?: string

}

/**
*
* @export
* @interface ShopFrontCategorySalesAreaRequest
*/
export interface ShopFrontCategorySalesAreaRequest {

    /**
     * 省份名称
     * @type {string}
     * @memberof ShopFrontCategorySalesAreaRequest
     */
    provinceName: string

    /**
     * 城市名称
     * @type {string}
     * @memberof ShopFrontCategorySalesAreaRequest
     */
    cityName: string

    /**
     * 用户id
     * @type {number | string}
     * @memberof ShopFrontCategorySalesAreaRequest
     */
    userId: number | string

}

/**
*
* @export
* @interface ShopFrontCategoryResponse
*/
export interface ShopFrontCategoryResponse {

    /**
     * 主键id
     * @type {number | string}
     * @memberof ShopFrontCategoryResponse
     */
    id?: number | string

    /**
     * 品类名称
     * @type {string}
     * @memberof ShopFrontCategoryResponse
     */
    frontCategoryName?: string

    /**
     * 排序
     * @type {number | string}
     * @memberof ShopFrontCategoryResponse
     */
    sort?: number | string

    /**
     * 品类商品信息
     * @type {Array<ShopFrontCategorySpuResponse>}
     * @memberof ShopFrontCategoryResponse
     */
    shopFrontCategorySpuResponseList?: Array<ShopFrontCategorySpuResponse>

}

/**
* 品类商品信息
* @export
* @interface ShopFrontCategorySpuResponse
*/
export interface ShopFrontCategorySpuResponse {

    /**
     * spuId
     * @type {number | string}
     * @memberof ShopFrontCategorySpuResponse
     */
    spuId?: number | string

    /**
     * spu编码
     * @type {string}
     * @memberof ShopFrontCategorySpuResponse
     */
    spuCode?: string

    /**
     * spu名称
     * @type {string}
     * @memberof ShopFrontCategorySpuResponse
     */
    spuName?: string

    /**
     * 销售名称
     * @type {string}
     * @memberof ShopFrontCategorySpuResponse
     */
    showName?: string

    /**
     * 图片
     * @type {Array<string>}
     * @memberof ShopFrontCategorySpuResponse
     */
    imageUrls?: Array<string>

    /**
     * 销售属性值
     * @type {string}
     * @memberof ShopFrontCategorySpuResponse
     */
    specifications?: string

    /**
     * 最小销售价
     * @type {number | string}
     * @memberof ShopFrontCategorySpuResponse
     */
    minSalePrice?: number | string

    /**
     * 最大销售价
     * @type {number | string}
     * @memberof ShopFrontCategorySpuResponse
     */
    maxSalePrice?: number | string

    /**
     * 是否可见
     * @type {boolean}
     * @memberof ShopFrontCategorySpuResponse
     */
    priceVisible?: boolean

    /**
     * 是否上架  1:下架 2:上架
     * @type {number | string}
     * @memberof ShopFrontCategorySpuResponse
     */
    isOnShelf?: number | string

    /**
     * 类目id
     * @type {number | string}
     * @memberof ShopFrontCategorySpuResponse
     */
    categoryId?: number | string

    /**
     *
     * @type {boolean}
     * @memberof ShopFrontCategorySpuResponse
     */
    favorites?: boolean

}

/**
*
* @export
* @interface RespCategory
*/
export interface RespCategory {

    /**
     * 类目id
     * @type {number | string}
     * @memberof RespCategory
     */
    categoryId?: number | string

    /**
     * 类目名称
     * @type {string}
     * @memberof RespCategory
     */
    categoryContent?: string

}
