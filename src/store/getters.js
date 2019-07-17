const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  user: state => state.user.user,
  jobTitle: state => state.user.jobTitle,
  home: state => state.user.home,
  auditaction: state => state.user.auditaction,
  last_login_date: state => state.user.last_login_date,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uid: state => state.user.uid,
  email: state => state.user.email,
  auth_type: state => state.user.auth_type,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  accounts: state => state.account.accounts,
  audit_action: state => state.audit_action.audit_action,
  search_list: state => state.search_list.search_list
};
export default getters