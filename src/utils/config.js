module.exports = {
  siteName: 'Whome loT',
  copyright: 'Copyright © 2019 Shenzhen Wingto Digital Technology Co. Ltd. All Rights Reserved. 粤ICP备20002505号',
  slogon: '看见生活未来的样子',
  logoPath: '/logo.png',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/, /(\/(en|zh))*\/signup/,/(\/(en|zh))*\/resetpwd/,/(\/(en|zh))*\/agreement/],
    },
    {
        name: 'secondary',
        include: [/(\/(en|zh))*\/secondary\/(.*)/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      // {
      //   key: 'pt-br',
      //   title: 'Português',
      //   flag: '/portugal.svg',
      // },
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'en',
  },
}
