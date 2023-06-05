const GitService = require('../services/GitService')

class GitController{
    async postTokenToDB(req, res){
        try {
            const {user, token} = req.body
            const response = await GitService.postTokenToDB(user, token)
            res.json(response)
        } catch(err){console.log(err)}
    }

    async getGitToken(req, res){
        try {
            const headers = req.rawHeaders
            const refreshToken = headers.filter(item => item.includes('refreshToken'))[0].split('=')[1]
            const gitToken = await GitService.getToken(refreshToken)
            res.json(gitToken)
        } catch(err){console.log(err)}
    }

    async getGitUser(req, res){
        try {
            const {gitToken} = req.body
            const response = await GitService.getGitUser(gitToken)
            return res.json(response)
        } catch(err){console.log(err)}
    }
}

module.exports = new GitController()