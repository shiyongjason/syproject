export interface ThreadQeuryModel {
    provinceId: string;
    cityId: string;
    companyName: string;
    customer: number;
    deviceBrand: string;
    deviceCategory: number;
    startTime: string;
    endTime: string;
    maxUpdateTime: string,
    minUpdateTime: string,
    origin: number;
    pageNumber: number;
    pageSize: number;
    userMobile: string;
    userName: string;
    removeDuplicate: boolean,
    jobNumber:string,
    authCode:string
}
