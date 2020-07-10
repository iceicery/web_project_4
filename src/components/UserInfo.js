export default class UserInfo {
    constructor(titleContainer, subtitleContainer) {
        this._titleContainer = titleContainer;
        this._subtitleContainer = subtitleContainer;
    }
    getUserInfo(name,job) {
        const userData = {
            userName: name,
            userJob: job
        }
        return userData;
    }
    setUserInfo(name, job) {
        this._titleContainer.textContent = name;
        this._subtitleContainer.textContent = job;
    }
}