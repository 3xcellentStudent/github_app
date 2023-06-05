const TokenModel = require('../models/TokenModel')
const {Octokit} = require('octokit')

class GitService{
    async postTokenToDB(user, gitToken){
        try {
            const token = await TokenModel.findOneAndUpdate({user}, {gitToken})
            return token
        } catch(err){console.log(err)}
    }

    async getToken(refreshToken){
        try {
            const token = await TokenModel.findOne({refreshToken})
            return token
        } catch(err){console.log(err)}
    }

    async getGitUser(gitToken){
        try {
            const octokit = new Octokit({auth: gitToken})
            const response = await octokit.request('/user')
            return response
        } catch(err){console.log(err)}

    }
}

module.exports = new GitService()