'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/list', controller.home.list)
  // 用户注册
  router.post('/reg', controller.user.reg)
  router.post('/login', controller.user.login)
  // 退出登录
  router.post('/logout', controller.user.logout)
  router.post('/upload', controller.file.upload)
  //剩余容量
  router.get('/getsize', controller.user.getSize)

  router.get('/file', controller.file.list)
  //创建文件夹
  router.post('/file/createdir', controller.file.createdir)
  //更改名字
  router.post('/file/rename', controller.file.rename)
  router.post('/file/delete', controller.file.delete)
  router.get('/file/search', controller.file.search)

  router.post('/share/create', controller.share.create)
  router.get('/share/list', controller.share.list)
  router.get('/share/:sharedurl', controller.share.read)
}
