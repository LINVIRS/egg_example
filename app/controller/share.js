'use strict'
const Controller = require('egg').Controller

class ShareController extends Controller {
  //创建分享
  async create() {
    const { ctx, app, service } = this
    let user_id = ctx.authUser.id

    ctx.validate({
      file_id: {
        type: 'int',
        required: true,
        desc: '文件ID',
      },
    })
    let { file_id } = ctx.request.body
    let f = await app.model.File.findOne({
      where: {
        id: file_id,
        user_id,
      },
    })
    if (!f) {
      return ctx.throw(404, '文件不存在')
    }
    let sharedurl = ctx.genID(15)
    console.log('分享链接是: ' + sharedurl)
    let s = await app.model.Share.create({
      sharedurl,
      file_id,
      iscancel: 0,
      user_id,
    })
    let url = 'http://127.0.0.1:7001/sharepage/' + sharedurl
    ctx.apiSuccess('分享链接： ' + url)
  }

  async list() {
    const { ctx, app } = this
    const user_id = ctx.authUser.id

    let list = await app.model.Share.findAndCountAll({
      where: {
        user_id,
      },
      include: [
        {
          model: app.model.File,
        },
      ],
    })
    ctx.apiSuccess(list)
  }
}

module.exports = ShareController