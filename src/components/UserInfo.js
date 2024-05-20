class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDesciption = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._userInfo = {
      title: this._profileTitle.textContent,
      description: this._profileDesciption.textContent,
    };

    return this._userInfo;
  }

  setUserInfo({ title, description }) {
    this._profileTitle.textContent = title;
    this._profileDesciption.textContent = description;
  }
}

export default UserInfo;
