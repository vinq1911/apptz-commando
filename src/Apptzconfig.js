const ApptzConfig = {
  base: 39,
  endpoint: 'https://api.apptz.app/',
  logoImg: 'https://connect.apptz.app/assets/img/logo.svg',
  allowUserEditFields: {
    userName: true,
    userEmail: true,
    userPhone: true,
    password: true,
  },
  customUserFields: [
    {fieldName: 'Birthday', fieldId: 'userBday', fieldType: 'string', fieldIcon: 'cake'},
    {fieldName: 'Note', fieldId: 'userNote', fieldType: 'string', fieldIcon: 'notes'},
  ],
}

export default ApptzConfig;
