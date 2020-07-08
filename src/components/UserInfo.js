export default class UserInfo {
    constructor(titleContainer, subtitleContainer) {
        this._titleContainer = titleContainer;
        this._subtitleContainer = subtitleContainer;
    }
    getUserInfo() {
        const userData = {
            userName: this._name,
            userJob: this._job
        }
        return userData;
    }
    setUserInfo(name,job) {
        this._titleContainer.textContent = name;
        this._subtitleContainer.textContent = job;
    }
}