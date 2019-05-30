const getters = {
  authkey: state => state.user.authkey,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  user_routers: state => state.user.routers,
  addRouters: state => state.user.addRouters,
  routersJsonStr: state => state.user.routersJsonStr
}
export default getters
