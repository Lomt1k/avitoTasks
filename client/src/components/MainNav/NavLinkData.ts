export interface NavLinkData {
  text: string;
  path: string;
}

export const NAV_LINK_DATAS: NavLinkData[] = [
  {
    text: 'Все задачи',
    path: '/issues'
  },
  {
    text: 'Проекты',
    path: '/boards'
  },
];