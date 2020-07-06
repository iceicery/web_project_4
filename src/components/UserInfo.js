import { titleToChange, subtitleToChange } from "../utils/utils.js";

export default class UserInfo {
    constructor(userName, userJob) {
        this._name = userName;
        this._job = userJob;
    }
    getUserInfo() {
        const userData = {
            userName: this._name,
            userJob: this._job
        }
        return userData;
    }
    setUserInfo() {
        titleToChange.textContent = this._name;
        subtitleToChange.textContent = this._job;
    }
}