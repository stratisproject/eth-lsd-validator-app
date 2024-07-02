import appConfig from "config/appConf/app.json";

export function getTokenName() {
  return appConfig.token.tokenName;
}

export function getLsdTokenName() {
  return appConfig.token.lsdTokenName;
}

export function getAppTitle() {
  return appConfig.appTitle;
}

export function isSupportRestApi() {
  return appConfig.supportRestApi;
}

export interface IFaqContent {
  type: string;
  content: string;
  link?: string;
}
export interface IFaqItem {
  title: string;
  contents: IFaqContent[];
}

export function getFaqList(): IFaqItem[] {
  return appConfig.faqList;
}

export function isSupportTokenPrice() {
  return true;
}

export function getDefaultApr() {
  return appConfig.apr;
}

export function getTokenPriceUrl() {
  return appConfig.tokenPriceUrl;
}

export function getContactList() {
  return appConfig.contactList;
}

export function getExternalLinkList() {
  return appConfig.externalLinkList;
}

export function getDocLinks() {
  return appConfig.docLinks;
}
