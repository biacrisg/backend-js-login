import path from 'path'

module.exports = {
    async controllerApp(req,res) {
        const baseDir = path.join( '../../FRONT/loginUser');
        return res.sendFile('index.html', { root: baseDir })
    }
}